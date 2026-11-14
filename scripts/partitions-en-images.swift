// Convertit les PDF de la méthode en images, une par page, pour l'app.
//
//   swift scripts/partitions-en-images.swift
//
// Lit   partitions/volume-2.pdf, volume-3.pdf, volume-4.pdf, annexes.pdf
// Écrit partitions/pages/<source>/<numéro sur 3 chiffres>.jpg
//
// Le numéro est celui imprimé sur la page : dans les trois volumes, la page
// imprimée N est la (N + 1)ᵉ du fichier (la couverture porte donc le numéro 0).
// Les annexes n'ont pas de couverture décalée : on garde le rang dans le fichier.
import AppKit
import Foundation
import PDFKit

let largeur = 1500.0
let sources: [(nom: String, decalage: Int)] = [
    ("volume-2", 1), ("volume-3", 1), ("volume-4", 1), ("annexes", 0),
]

for (nom, decalage) in sources {
    let pdf = URL(fileURLWithPath: "partitions/\(nom).pdf")
    guard let doc = PDFDocument(url: pdf) else {
        print("\(nom) : PDF introuvable, ignoré")
        continue
    }
    let dossier = "partitions/pages/\(nom)"
    try! FileManager.default.createDirectory(atPath: dossier, withIntermediateDirectories: true)

    for rang in 1...doc.pageCount {
        autoreleasepool {
            let page = doc.page(at: rang - 1)!
            let cadre = page.bounds(for: .mediaBox)
            let echelle = largeur / Double(cadre.width)
            let w = Int(largeur)
            let h = Int(Double(cadre.height) * echelle)
            let image = NSBitmapImageRep(
                bitmapDataPlanes: nil, pixelsWide: w, pixelsHigh: h, bitsPerSample: 8,
                samplesPerPixel: 4, hasAlpha: true, isPlanar: false,
                colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
            let contexte = NSGraphicsContext(bitmapImageRep: image)!
            NSGraphicsContext.current = contexte
            let cg = contexte.cgContext
            cg.setFillColor(NSColor.white.cgColor)
            cg.fill(CGRect(x: 0, y: 0, width: w, height: h))
            cg.scaleBy(x: CGFloat(echelle), y: CGFloat(echelle))
            page.draw(with: .mediaBox, to: cg)
            contexte.flushGraphics()
            let jpeg = image.representation(using: .jpeg, properties: [.compressionFactor: 0.82])!
            let numero = String(format: "%03d", rang - decalage)
            try! jpeg.write(to: URL(fileURLWithPath: "\(dossier)/\(numero).jpg"))
        }
    }
    print("\(nom) : \(doc.pageCount) pages")
}
