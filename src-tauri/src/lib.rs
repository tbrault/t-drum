use std::fs;
use std::path::PathBuf;
use tauri::Manager;

/// Dossier des vidéos. Surchargé par la variable d'env `TDRUM_VIDEOS_DIR`,
/// sinon `videos/` à la racine du projet.
fn videos_base() -> PathBuf {
    if let Ok(dir) = std::env::var("TDRUM_VIDEOS_DIR") {
        return PathBuf::from(dir);
    }
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .map(|p| p.join("videos"))
        .unwrap_or_else(|| PathBuf::from("videos"))
}

/// Chemin absolu du dossier des vidéos (pour `convertFileSrc` côté front).
#[tauri::command]
fn videos_dir() -> String {
    videos_base().to_string_lossy().to_string()
}

/// Vrai si le fichier (chemin relatif au dossier vidéos) existe.
#[tauri::command]
fn file_exists(rel: String) -> bool {
    videos_base().join(rel).is_file()
}

/// Lit le fichier de progression. Renvoie une chaîne vide si absent.
#[tauri::command]
fn load_progress(app: tauri::AppHandle) -> Result<String, String> {
    let dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
    let file = dir.join("progress.json");
    match fs::read_to_string(&file) {
        Ok(contents) => Ok(contents),
        Err(_) => Ok(String::new()),
    }
}

/// Écrit le fichier de progression (crée le dossier au besoin).
#[tauri::command]
fn save_progress(app: tauri::AppHandle, contents: String) -> Result<(), String> {
    let dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
    fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    let file = dir.join("progress.json");
    fs::write(&file, contents).map_err(|e| e.to_string())?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            load_progress,
            save_progress,
            videos_dir,
            file_exists
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
