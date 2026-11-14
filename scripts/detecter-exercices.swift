// Repère les exercices sur chaque page de partition et écrit leurs cadres.
//
//   swiftc -O scripts/detecter-exercices.swift -o /tmp/detecter && /tmp/detecter
//   (option : --apercu <dossier> <source> <page>… dessine les cadres trouvés)
//
// Lit   partitions/pages/<source>/<page>.jpg (voir partitions-en-images.swift)
// Écrit src/content/partitions-zones.json : pour chaque page, la liste des
//       cadres [x, y, largeur, hauteur], en fraction de la page (0 à 1).
//
// Principe : la page est coupée en bandes horizontales séparées par un vrai
// blanc, puis chaque bande en morceaux séparés par un blanc vertical (deux
// exercices côte à côte). Un morceau qui contient des lignes de portée est un
// exercice ; le reste (titres, consignes) est ignoré.
//
// Un binaire ou un solo (morceau titré « BINAIRE 9 », « SOLO 4 ») est un seul
// exercice, même sur plusieurs lignes : les titres de la page sont lus par la
// reconnaissance de texte de macOS, et les lignes du morceau, jusqu'au titre
// suivant, sont réunies en un cadre qui garde le titre. Les mesures de chaque
// exercice sont comptées (barres de mesure), pour caler l'accompagnement sur
// la longueur du morceau. Les cadres ne contiennent que des nombres et ces
// titres, aucune partition.
import AppKit
import Foundation
import Vision

let sources = ["volume-2", "volume-3", "volume-4", "annexes"]

/// Page en niveaux de gris : `encre(x, y)` est vrai pour un pixel sombre.
struct Page {
    let w: Int
    let h: Int
    let pixels: [UInt8]
    let bitmap: CGImage

    init?(chemin: String) {
        guard let image = NSImage(contentsOfFile: chemin),
            let cg = image.cgImage(forProposedRect: nil, context: nil, hints: nil)
        else { return nil }
        bitmap = cg
        w = cg.width
        h = cg.height
        var buffer = [UInt8](repeating: 255, count: w * h)
        let ctx = CGContext(
            data: &buffer, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w,
            space: CGColorSpaceCreateDeviceGray(), bitmapInfo: CGImageAlphaInfo.none.rawValue)!
        ctx.draw(cg, in: CGRect(x: 0, y: 0, width: w, height: h))
        pixels = buffer
    }

    @inline(__always) func encre(_ x: Int, _ y: Int) -> Bool { pixels[y * w + x] < 150 }
}

struct Cadre {
    var x0, y0, x1, y1: Int
    /// Titre du morceau (« Binaire 9 », « Solo 4 »), pour un binaire ou un solo.
    var nom: String? = nil
    /// Nombre de mesures (barres de mesure comptées), si la portée est lisible.
    var mesures: Int? = nil
    /// Structure d'après l'encre de chaque mesure : G (groove), % (mesure
    /// répétée), F (mesure bien plus chargée), | entre deux lignes.
    var densite: String? = nil
    /// Charleston de chaque mesure : 1 (joué tout du long), 0 (interrompu :
    /// le batteur fait un break), % (mesure répétée), | entre deux lignes.
    var charleston: String? = nil

    /// Structure retenue, une lettre par mesure : G, % ou F (break).
    var plan: String? {
        guard let densite else { return nil }
        guard let charleston else { return densite }
        // Un groove au charleston (les binaires) : chaque mesure où il
        // s'interrompt est un break. Sinon (solos), on s'en tient à l'encre.
        let jouees = charleston.filter { $0 == "1" || $0 == "0" }
        let pleines = charleston.filter { $0 == "1" }
        guard !jouees.isEmpty, Double(pleines.count) >= 0.5 * Double(jouees.count) else { return densite }
        return String(charleston.map { $0 == "1" ? "G" : $0 == "0" ? "F" : $0 })
    }
}

/// Compte les mesures d'une portée à cinq lignes : une barre de mesure est
/// un trait vertical qui couvre exactement la portée, de la ligne du haut à
/// celle du bas, sans dépasser (une hampe de note, elle, dépasse).
/// Barres trouvées (pour l'aperçu) : abscisse, haut et bas de la portée.
var barresVues: [(x: Int, haut: Int, bas: Int)] = []

func compterMesures(_ p: Page, _ c: Cadre) -> (mesures: Int, densite: String, charleston: String)? {
    let W = p.w, H = p.h
    let largeur = c.x1 - c.x0
    guard largeur > 0 else { return nil }
    // Lignes de la portée : rangées traversées par un long trait fin.
    var lignes: [(debut: Int, fin: Int)] = []
    var y = c.y0
    while y <= c.y1 {
        var suite = 0, meilleure = 0
        for x in c.x0...c.x1 {
            if p.encre(x, y) { suite += 1; meilleure = max(meilleure, suite) } else { suite = 0 }
        }
        if Double(meilleure) >= 0.3 * Double(largeur) {
            let debut = y
            while y + 1 <= c.y1 {
                var s2 = 0, m2 = 0
                for x in c.x0...c.x1 {
                    if p.encre(x, y + 1) { s2 += 1; m2 = max(m2, s2) } else { s2 = 0 }
                }
                if Double(m2) < 0.3 * Double(largeur) { break }
                y += 1
            }
            if y - debut <= 6 { lignes.append((debut, y)) }
        }
        y += 1
    }
    // Les cinq lignes d'une même portée sont rapprochées.
    var groupes: [[(debut: Int, fin: Int)]] = []
    for l in lignes {
        if let d = groupes.last?.last, l.debut - d.fin <= Int(0.02 * Double(H)) {
            groupes[groupes.count - 1].append(l)
        } else {
            groupes.append([l])
        }
    }
    guard let portee = groupes.max(by: { $0.count < $1.count }), portee.count >= 4 else { return nil }
    let haut = portee.first!.debut, bas = portee.last!.fin
    let marge = 4, hors = 10
    guard haut - hors >= 0, bas + hors < H else { return nil }

    func estBarre(_ x: Int) -> Bool {
        var dedans = 0
        for y in haut...bas where p.encre(x, y) { dedans += 1 }
        guard Double(dedans) >= 0.92 * Double(bas - haut + 1) else { return false }
        var dessus = 0, dessous = 0
        for y in (haut - hors)...(haut - marge) where p.encre(x, y) { dessus += 1 }
        for y in (bas + marge)...(bas + hors) where p.encre(x, y) { dessous += 1 }
        guard dessus <= 2 && dessous <= 2 else { return false }
        // Une barre est entourée de blanc entre les lignes ; une hampe touche
        // la tête de sa note, juste à côté.
        let interieur = (haut...bas).filter { y in !portee.contains { ($0.debut - 1...$0.fin + 1).contains(y) } }
        func voisinage(_ dx: ClosedRange<Int>) -> Double {
            var n = 0, total = 0
            for y in interieur {
                for d in dx where x + d >= 0 && x + d < W {
                    total += 1
                    if p.encre(x + d, y) { n += 1 }
                }
            }
            return total == 0 ? 0 : Double(n) / Double(total)
        }
        guard voisinage(4...8) < 0.15 else { return false }
        if voisinage(-8 ... -4) < 0.15 { return true }
        // Double barre de fin, collée à la dernière note : la portée s'arrête
        // juste après.
        let apres = (x + 12)...min(W - 1, x + 20)
        return !portee.contains { l in apres.contains { xx in (l.debut...l.fin).contains { p.encre(xx, $0) } } }
    }
    // Colonnes voisines (trait épais, double barre de fin) = une seule barre.
    let barres = plages(largeur + 1, blancMin: Int(0.012 * Double(W))) { estBarre(c.x0 + $0) }
    // Début de la portée : une barre collée au début ne ferme pas de mesure.
    var debutPortee = c.x1
    for x in c.x0...c.x1 where portee.contains(where: { l in (l.debut...l.fin).contains { p.encre(x, $0) } }) {
        debutPortee = x
        break
    }
    var utiles = barres.filter { c.x0 + $0.debut - debutPortee > Int(0.03 * Double(W)) }
    // Coup final : une toute petite mesure après la dernière (une seule note
    // avant la double barre) n'est pas comptée, l'accord de fin tombe dessus.
    if utiles.count >= 3 {
        var largeurs: [Int] = []
        var precedente = debutPortee
        for b in utiles {
            largeurs.append(c.x0 + b.debut - precedente)
            precedente = c.x0 + b.fin
        }
        let mediane = largeurs.dropLast().sorted()[(largeurs.count - 1) / 2]
        if Double(largeurs.last!) < 0.35 * Double(mediane) { utiles.removeLast() }
    }
    for b in utiles { barresVues.append((c.x0 + b.debut, haut, bas)) }
    guard !utiles.isEmpty else { return nil }

    // Structure : densité d'encre de chaque mesure, hors lignes de portée.
    // Une mesure presque vide est un « % » (mesure répétée) ; une mesure bien
    // plus chargée que les autres est un break (le batteur fait un fill).
    let lignesPortee = Set(portee.flatMap { ($0.debut - 1)...($0.fin + 1) })
    var densites: [Double] = []
    var gauche = debutPortee
    for b in utiles {
        let droite = c.x0 + b.debut
        let a = gauche + 4, z = droite - 4
        var n = 0, total = 0
        if z > a {
            for y in c.y0...c.y1 where !lignesPortee.contains(y) {
                for x in a...z {
                    total += 1
                    if p.encre(x, y) { n += 1 }
                }
            }
        }
        densites.append(total == 0 ? 0 : Double(n) / Double(total))
        gauche = c.x0 + b.fin
    }
    let triees = densites.sorted()
    let mediane = triees[triees.count / 2]
    let plan = densites.enumerated().map { i, d -> String in
        if d < 0.4 * mediane { return "%" }
        let derniere = i == densites.count - 1
        if (derniere && d > 1.15 * mediane) || d > 1.5 * mediane { return "F" }
        return "G"
    }.joined()

    // Charleston : dans un groove, ses croches liées par des barres forment
    // une rangée de traits horizontaux au-dessus de la portée, d'un bout à
    // l'autre de la mesure. Un trou dans cette rangée = un break.
    let hauteur = Double(bas - haut)
    let bandeHaut = max(c.y0, haut - Int(1.15 * hauteur))
    let bandeBas = haut - Int(0.5 * hauteur)
    // Ces traits sont tous à la même hauteur sur la ligne : la rangée la plus
    // encrée de la bande. Les barres penchées d'un break ne font que la croiser.
    var rangee = bandeHaut, record = 0
    if bandeBas > bandeHaut {
        for y in bandeHaut...bandeBas {
            var n = 0
            for x in debutPortee...c.x1 where p.encre(x, y) { n += 1 }
            if n > record { record = n; rangee = y }
        }
    }
    func trait(_ x: Int) -> Bool {
        guard record > 0, x - 3 >= 0, x + 3 < W else { return false }
        for y in max(0, rangee - 2)...(rangee + 2) where p.encre(x, y) && p.encre(x - 3, y) && p.encre(x + 3, y) {
            return true
        }
        return false
    }
    // La clé (et la mesure, en début de morceau) ouvre chaque ligne.
    let cle = Int(0.035 * Double(W))
    var charleston = ""
    gauche = debutPortee + cle
    for (i, b) in utiles.enumerated() {
        let droite = c.x0 + b.debut
        defer { gauche = c.x0 + b.fin }
        if Array(plan)[i] == "%" { charleston += "%"; continue }
        let a = gauche + 4, z = droite - 4
        guard z - a > 20 else { charleston += "0"; continue }
        // Plus grand trou sans trait, bords compris.
        var trou = 0, courant = 0
        for x in a...z {
            if trait(x) { courant = 0 } else { courant += 1; trou = max(trou, courant) }
        }
        charleston += Double(trou) > 0.3 * Double(z - a) ? "0" : "1"
    }
    return (utiles.count, plan, charleston)
}

/// Plages consécutives où `encre(i)` est vrai, séparées par des blancs d'au
/// moins `blancMin` (un blanc plus court ne coupe pas).
func plages(_ n: Int, blancMin: Int, _ encre: (Int) -> Bool) -> [(debut: Int, fin: Int)] {
    var res: [(debut: Int, fin: Int)] = []
    var debut = -1, fin = -1
    for i in 0..<n where encre(i) {
        if debut >= 0 && i - fin - 1 < blancMin {
            fin = i
        } else {
            if debut >= 0 { res.append((debut, fin)) }
            debut = i
            fin = i
        }
    }
    if debut >= 0 { res.append((debut, fin)) }
    return res
}

func detecter(_ p: Page) -> [Cadre] {
    let W = p.w, H = p.h
    // Zone utile : sans le numéro de page en haut ni la mention en bas.
    let hautUtile = Int(0.015 * Double(H)), basUtile = Int(0.945 * Double(H))
    let hu = basUtile - hautUtile

    // Bords du scan : une colonne encrée sur plus de la moitié de la hauteur
    // est un trait de bord de page, pas de la musique.
    var ignoree = [Bool](repeating: false, count: W)
    for x in 0..<W {
        var n = 0
        for y in hautUtile..<basUtile where p.encre(x, y) { n += 1 }
        ignoree[x] = Double(n) > 0.5 * Double(hu)
    }
    @inline(__always) func encre(_ x: Int, _ y: Int) -> Bool { !ignoree[x] && p.encre(x, y) }

    // Vrai si la zone contient une portée : au moins 3 rangées avec un long
    // trait horizontal (portée à 5 lignes), ou un très long trait (portée à
    // une ligne, pour la lecture rythmique). Un texte n'en a jamais.
    func contientPortee(_ x0: Int, _ x1: Int, _ y0: Int, _ y1: Int) -> Bool {
        let longueurMin = Int(0.06 * Double(W))
        var rangees = 0
        for y in y0...y1 {
            var suite = 0, meilleure = 0
            for x in x0...x1 {
                if encre(x, y) { suite += 1; meilleure = max(meilleure, suite) } else { suite = 0 }
            }
            if Double(meilleure) >= 0.25 * Double(W) { return true }
            if meilleure >= longueurMin { rangees += 1; if rangees >= 3 { return true } }
        }
        return false
    }

    // 1. Bandes horizontales séparées par un vrai blanc.
    let bandes = plages(hu, blancMin: Int(0.016 * Double(H))) { i in
        let y = hautUtile + i
        var n = 0
        for x in 0..<W where encre(x, y) { n += 1; if n > 3 { return true } }
        return false
    }.map { (debut: $0.debut + hautUtile, fin: $0.fin + hautUtile) }

    // Rangées qui portent une ligne de portée (long trait horizontal).
    func rangeePortee(_ y: Int, _ x0: Int, _ x1: Int) -> Bool {
        let longueurMin = Int(0.06 * Double(W))
        var suite = 0
        for x in x0...x1 {
            if encre(x, y) { suite += 1; if suite >= longueurMin { return true } } else { suite = 0 }
        }
        return false
    }
    func encreRangee(_ y: Int) -> Int {
        var n = 0
        for x in 0..<W where encre(x, y) { n += 1 }
        return n
    }

    // 2. Une bande peut contenir plusieurs portées empilées, trop serrées
    //    pour être séparées par un vrai blanc : on la recoupe entre deux
    //    portées, sur la rangée la moins encrée.
    var sousBandes: [(debut: Int, fin: Int)] = []
    for bande in bandes {
        let portees = plages(bande.fin - bande.debut + 1, blancMin: Int(0.03 * Double(H))) {
            rangeePortee(bande.debut + $0, 0, W - 1)
        }.map { (debut: $0.debut + bande.debut, fin: $0.fin + bande.debut) }
            // Une portée fait plusieurs lignes de haut ; une ligature isolée
            // (notes de grosse caisse sous la portée) n'est qu'un trait.
            .filter { Double($0.fin - $0.debut) >= 0.02 * Double(H) }
        guard portees.count >= 2 else {
            sousBandes.append(bande)
            continue
        }
        var debut = bande.debut
        for k in 0..<(portees.count - 1) {
            var coupe = portees[k].fin + 1, minimum = Int.max
            for y in (portees[k].fin + 1)..<portees[k + 1].debut {
                let n = encreRangee(y)
                if n < minimum { minimum = n; coupe = y }
            }
            sousBandes.append((debut, coupe))
            debut = coupe + 1
        }
        sousBandes.append((debut, bande.fin))
    }

    var cadres: [Cadre] = []
    for bande in sousBandes {
        // Hauteur de la portée dans la bande.
        var hautPortee = -1, basPortee = -1
        for y in bande.debut...bande.fin where rangeePortee(y, 0, W - 1) {
            if hautPortee < 0 { hautPortee = y }
            basPortee = y
        }
        guard hautPortee >= 0, contientPortee(0, W - 1, hautPortee, basPortee) else { continue }

        // 3. Morceaux séparés par un blanc vertical (exercices côte à côte),
        //    mesurés seulement autour de la portée : un titre centré au-dessus
        //    relierait sinon deux exercices voisins. Dans une portée, les
        //    lignes passent partout : un exercice ne se coupe jamais en deux.
        let fenetreHaut = max(bande.debut, hautPortee - Int(0.03 * Double(H)))
        let fenetreBas = min(bande.fin, basPortee + Int(0.04 * Double(H)))
        let morceaux = plages(W, blancMin: Int(0.03 * Double(W))) { x in
            var n = 0
            for y in fenetreHaut...fenetreBas where encre(x, y) { n += 1; if n >= 2 { return true } }
            return false
        }
        for m in morceaux where contientPortee(m.debut, m.fin, hautPortee, basPortee) {
            // 4. Hauteur : depuis la portée, on s'étend vers le haut et le bas
            //    tant que l'encre continue (notes, numéro, libellé).
            func encree(_ y: Int) -> Bool {
                var n = 0
                for x in m.debut...m.fin where encre(x, y) { n += 1; if n >= 2 { return true } }
                return false
            }
            let blancMax = Int(0.01 * Double(H))
            var y0 = hautPortee, blanc = 0, y = hautPortee - 1
            while y >= bande.debut && blanc < blancMax {
                if encree(y) { y0 = y; blanc = 0 } else { blanc += 1 }
                y -= 1
            }
            var y1 = basPortee
            blanc = 0
            y = basPortee + 1
            while y <= bande.fin && blanc < blancMax {
                if encree(y) { y1 = y; blanc = 0 } else { blanc += 1 }
                y += 1
            }
            let marge = Int(0.008 * Double(W))
            cadres.append(
                Cadre(
                    x0: max(0, m.debut - marge), y0: max(0, y0 - marge),
                    x1: min(W - 1, m.fin + marge), y1: min(H - 1, y1 + marge)))
        }
    }
    return cadres.map { c in
        var c = c
        if let compte = compterMesures(p, c) {
            c.mesures = compte.mesures
            c.densite = compte.densite
            c.charleston = compte.charleston
        }
        return c
    }
}

/// Titre lu sur la page, en fraction de la page (origine en haut à gauche).
struct Titre {
    let texte: String
    let haut: Double
    let bas: Double
}

/// Titres de la page : lignes de texte centrées, de taille titre, faites de
/// lettres. Les notes mal lues par la reconnaissance (« XXXLXX », « % »…)
/// sont écartées par leur confiance, leur hauteur, leur position ou leur
/// alphabet. Le haut de la page est relu à part : un titre y échappe parfois
/// à la lecture de la page entière.
func titres(_ p: Page) -> [Titre] {
    var res: [Titre] = []
    // Zone lue (repère de Vision : origine en bas à gauche) : page entière,
    // puis bande du haut.
    for zone in [CGRect(x: 0, y: 0, width: 1, height: 1), CGRect(x: 0, y: 0.82, width: 1, height: 0.18)] {
        let requete = VNRecognizeTextRequest()
        requete.recognitionLevel = .accurate
        requete.recognitionLanguages = ["fr-FR"]
        requete.usesLanguageCorrection = false
        requete.regionOfInterest = zone
        try? VNImageRequestHandler(cgImage: p.bitmap).perform([requete])
        for o in requete.results ?? [] {
            // Les notes mal lues sortent avec une confiance faible (0,3).
            guard let lu = o.topCandidates(1).first, lu.confidence >= 0.5 else { continue }
            let texte = lu.string.trimmingCharacters(in: .whitespaces)
            let b = o.boundingBox
            let hauteur = b.height * zone.height
            let gauche = zone.minX + b.minX * zone.width
            let lettres = texte.unicodeScalars.filter {
                CharacterSet.letters.contains($0) && $0.value < 0x0250
            }.count
            // Un sous-titre entre parenthèses (« (solo rythmique) ») n'ouvre
            // pas de nouvelle section.
            guard hauteur <= 0.03, gauche >= 0.1, gauche <= 0.6, lettres >= 4, !texte.hasPrefix("(")
            else { continue }
            let haut = 1 - (zone.minY + b.maxY * zone.height)
            let bas = 1 - (zone.minY + b.minY * zone.height)
            if res.contains(where: { $0.texte == texte && abs($0.haut - haut) < 0.02 }) { continue }
            res.append(Titre(texte: texte, haut: haut, bas: bas))
        }
    }
    return res.sorted { $0.haut < $1.haut }
}

/// Vrai pour le titre d'un morceau joué d'un bout à l'autre : binaire ou solo.
func estMorceau(_ t: Titre) -> Bool {
    t.texte.count <= 25
        && t.texte.range(of: "^(binaire|solo)\\b", options: [.regularExpression, .caseInsensitive])
            != nil
}

/// « BINAIRE  9 » → « Binaire 9 », « SOLO DE BILLY COBHAM » → « Solo de
/// Billy Cobham » (les petits mots restent en minuscules).
func nomMorceau(_ t: Titre) -> String {
    // Les guillemets du titre (« SOLO 16 "BLUE SKY" ») sont retirés.
    let mots = t.texte.replacingOccurrences(of: "\"", with: "").split(separator: " ").map { String($0) }
    return mots.enumerated().map { i, m in
        i > 0 && m.count <= 3 ? m.lowercased() : m.prefix(1).uppercased() + m.dropFirst().lowercased()
    }.joined(separator: " ")
}

/// Réunit en un seul cadre les lignes de chaque binaire ou solo : celles
/// placées entre son titre et le titre suivant (ou le bas de la page).
/// `suite` : nom du morceau sur lequel finissait la page précédente ; il
/// continue en haut de celle-ci jusqu'au premier titre. Renvoie aussi le
/// morceau sur lequel cette page finit à son tour.
func fusionnerMorceaux(_ cadres: [Cadre], _ p: Page, suite: String?)
    -> (cadres: [Cadre], morceaux: Int, suiteSuivante: String?)
{
    let liste = titres(p)
    var sections: [(debut: Double, fin: Double, nom: String)] = []
    if let suite {
        sections.append((0, liste.first?.haut ?? 1.0, suite.hasSuffix("(suite)") ? suite : "\(suite) (suite)"))
    }
    for t in liste where estMorceau(t) {
        // Le texte de présentation placé entre le titre et la première ligne
        // de musique (« Texte écrit en hommage à… ») ne clôt pas le morceau :
        // seul compte un titre situé après le début de la musique.
        let debutMusique = cadres
            .map { Double($0.y0) / Double(p.h) }
            .filter { $0 > t.bas }
            .min() ?? 1.0
        let fin = liste.first { $0.haut > max(t.bas, debutMusique) }?.haut ?? 1.0
        sections.append((t.bas, fin, nomMorceau(t)))
    }
    let suiteSuivante: String?
    // La page finit sur un morceau si aucun titre ne suit le dernier morceau
    // (sa section va jusqu'en bas de la page).
    if let derniere = sections.last, derniere.fin >= 1.0 {
        suiteSuivante = derniere.nom.replacingOccurrences(of: " (suite)", with: "")
    } else if liste.isEmpty {
        suiteSuivante = suite
    } else {
        suiteSuivante = nil
    }

    var res = cadres
    var morceaux = 0
    for section in sections {
        let debut = section.debut * Double(p.h), fin = section.fin * Double(p.h)
        let dedans = res.indices.filter {
            let milieu = Double(res[$0].y0 + res[$0].y1) / 2
            return milieu > debut && milieu < fin
        }
        guard let premier = dedans.first else { continue }
        var union = res[premier]
        for i in dedans {
            union.x0 = min(union.x0, res[i].x0)
            union.y0 = min(union.y0, res[i].y0)
            union.x1 = max(union.x1, res[i].x1)
            union.y1 = max(union.y1, res[i].y1)
        }
        union.nom = section.nom
        // Un morceau compte les mesures de toutes ses lignes. Une ligne
        // illisible est estimée d'après la moyenne des autres, tant qu'au
        // moins la moitié des lignes a pu être comptée.
        let comptes = dedans.compactMap { res[$0].mesures }
        if !comptes.isEmpty && comptes.count * 2 >= dedans.count {
            let moyenne = Double(comptes.reduce(0, +)) / Double(comptes.count)
            union.mesures = Int((moyenne * Double(dedans.count)).rounded())
        } else {
            union.mesures = nil
        }
        // La structure n'est sûre que si chaque ligne a été lue.
        let densites = dedans.compactMap { res[$0].densite }
        let charlestons = dedans.compactMap { res[$0].charleston }
        let complet = densites.count == dedans.count && charlestons.count == dedans.count
        union.densite = complet ? densites.joined(separator: "|") : nil
        union.charleston = complet ? charlestons.joined(separator: "|") : nil
        res = res.enumerated().compactMap { i, c in
            i == premier ? union : (dedans.contains(i) ? nil : c)
        }
        morceaux += 1
    }
    return (res, morceaux, suiteSuivante)
}

func numero(_ fichier: String) -> Int? { Int(fichier.replacingOccurrences(of: ".jpg", with: "")) }

func arrondi(_ v: Double) -> Double { (v * 10000).rounded() / 10000 }

let args = CommandLine.arguments
if args.count >= 5 && args[1] == "--apercu" {
    // Aperçu : la page avec ses cadres en rouge, pour vérifier à l'œil.
    let sortie = args[2], source = args[3]
    var suite: String? = nil
    for pageTxt in args[4...] {
        let nom = String(format: "%03d", Int(pageTxt)!)
        let chemin = "partitions/pages/\(source)/\(nom).jpg"
        guard let page = Page(chemin: chemin), let image = NSImage(contentsOfFile: chemin) else { continue }
        let fusion = fusionnerMorceaux(detecter(page), page, suite: suite)
        let cadres = fusion.cadres
        suite = fusion.suiteSuivante
        let rep = NSBitmapImageRep(data: image.tiffRepresentation!)!
        let ctx = NSGraphicsContext(bitmapImageRep: rep)!
        NSGraphicsContext.current = ctx
        ctx.cgContext.setStrokeColor(NSColor.red.cgColor)
        ctx.cgContext.setLineWidth(6)
        for c in cadres {
            // Repère de Core Graphics : origine en bas à gauche.
            ctx.cgContext.stroke(
                CGRect(x: c.x0, y: page.h - c.y1, width: c.x1 - c.x0, height: c.y1 - c.y0))
        }
        ctx.cgContext.setStrokeColor(NSColor.blue.cgColor)
        ctx.cgContext.setLineWidth(5)
        for b in barresVues {
            ctx.cgContext.stroke(CGRect(x: b.x - 6, y: page.h - b.bas - 12, width: 12, height: b.bas - b.haut + 24))
        }
        barresVues = []
        ctx.flushGraphics()
        let jpeg = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.6])!
        try! jpeg.write(to: URL(fileURLWithPath: "\(sortie)/\(source)-\(nom).jpg"))
        let resume: [String] = cadres.map { c in
            let nom = c.nom ?? "·"
            let compte = c.mesures.map { "\($0) mes." } ?? "?"
            return "\(nom) \(compte) \(c.plan ?? "")"
        }
        print("\(source) p.\(pageTxt) : \(cadres.count) exercices \(resume)")
    }
    exit(0)
}

var resultat: [String: Any] = [:]
for source in sources {
    let dossier = "partitions/pages/\(source)"
    guard let fichiers = try? FileManager.default.contentsOfDirectory(atPath: dossier) else {
        print("\(source) : pages absentes, ignoré")
        continue
    }
    var pages: [String: [[Double]]] = [:]
    var ratio = 0.0
    var total = 0
    var pagesMorceaux: [Int] = []
    var noms: [String: [String?]] = [:]
    var mesures: [String: [Int?]] = [:]
    var plans: [String: [String?]] = [:]
    var suite: String? = nil
    for f in fichiers.sorted() {
        guard let n = numero(f), let page = Page(chemin: "\(dossier)/\(f)") else { continue }
        ratio = Double(page.h) / Double(page.w)
        let (cadres, morceaux, suiteSuivante) = fusionnerMorceaux(detecter(page), page, suite: suite)
        suite = suiteSuivante
        if morceaux > 0 { pagesMorceaux.append(n) }
        if cadres.contains(where: { $0.nom != nil }) { noms[String(n)] = cadres.map(\.nom) }
        if cadres.contains(where: { $0.mesures != nil }) { mesures[String(n)] = cadres.map(\.mesures) }
        if cadres.contains(where: { $0.plan != nil }) { plans[String(n)] = cadres.map(\.plan) }
        total += cadres.count
        if cadres.isEmpty { continue }
        pages[String(n)] = cadres.map { c in
            [
                arrondi(Double(c.x0) / Double(page.w)), arrondi(Double(c.y0) / Double(page.h)),
                arrondi(Double(c.x1 - c.x0) / Double(page.w)),
                arrondi(Double(c.y1 - c.y0) / Double(page.h)),
            ]
        }
    }
    resultat[source] = [
        "ratio": arrondi(ratio), "pages": pages, "noms": noms, "mesures": mesures, "plans": plans,
    ]
    print("\(source) : \(total) exercices sur \(pages.count) pages")
    print("  binaires et solos réunis, pages : \(pagesMorceaux.map(String.init).joined(separator: " "))")
}
// JSON écrit à la main : nombres à 4 décimales, une page par ligne (le
// sérialiseur de Foundation écrit 0.075999999999999998 au lieu de 0.076).
func nombre(_ v: Double) -> String {
    var t = String(format: "%.4f", v)
    while t.hasSuffix("0") { t.removeLast() }
    if t.hasSuffix(".") { t.removeLast() }
    return t
}
var lignes: [String] = []
for source in sources {
    guard let entree = resultat[source] as? [String: Any],
        let pages = entree["pages"] as? [String: [[Double]]], let ratio = entree["ratio"] as? Double,
        let noms = entree["noms"] as? [String: [String?]],
        let mesures = entree["mesures"] as? [String: [Int?]],
        let plans = entree["plans"] as? [String: [String?]]
    else { continue }
    let corps = pages.keys.sorted { Int($0)! < Int($1)! }.map { page in
        let cadres = pages[page]!.map { "[" + $0.map(nombre).joined(separator: ",") + "]" }
        return "      \"\(page)\": [" + cadres.joined(separator: ",") + "]"
    }
    let corpsNoms = noms.keys.sorted { Int($0)! < Int($1)! }.map { page in
        let liste = noms[page]!.map { nom in
            nom.map {
                let echappe = $0.replacingOccurrences(of: "\\", with: "\\\\")
                    .replacingOccurrences(of: "\"", with: "\\\"")
                return "\"\(echappe)\""
            } ?? "null"
        }
        return "      \"\(page)\": [" + liste.joined(separator: ",") + "]"
    }
    let corpsMesures = mesures.keys.sorted { Int($0)! < Int($1)! }.map { page in
        "      \"\(page)\": [" + mesures[page]!.map { $0.map(String.init) ?? "null" }.joined(separator: ",") + "]"
    }
    // Assemblé en plusieurs morceaux : une seule expression est trop lourde
    // pour le compilateur Swift.
    var bloc = "  \"\(source)\": {\n"
    bloc += "    \"ratio\": \(nombre(ratio)),\n"
    bloc += "    \"pages\": {\n" + corps.joined(separator: ",\n") + "\n    },\n"
    bloc += "    \"noms\": {\n" + corpsNoms.joined(separator: ",\n") + "\n    },\n"
    let corpsPlans = plans.keys.sorted { Int($0)! < Int($1)! }.map { page in
        "      \"\(page)\": [" + plans[page]!.map { $0.map { "\"\($0)\"" } ?? "null" }.joined(separator: ",") + "]"
    }
    bloc += "    \"mesures\": {\n" + corpsMesures.joined(separator: ",\n") + "\n    },\n"
    bloc += "    \"plans\": {\n" + corpsPlans.joined(separator: ",\n") + "\n    }\n"
    bloc += "  }"
    lignes.append(bloc)
}
let json = "{\n" + lignes.joined(separator: ",\n") + "\n}\n"
try! json.write(toFile: "src/content/partitions-zones.json", atomically: true, encoding: .utf8)
print("écrit : src/content/partitions-zones.json (\(json.utf8.count / 1024) Ko)")
