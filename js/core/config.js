function saveEnabledCategories() {
    localStorage.setItem('enabledCategories', JSON.stringify(enabledCategories));
}

function loadEnabledCategories() {
    const saved = localStorage.getItem('enabledCategories');
    if (saved) {
        try {
            enabledCategories = JSON.parse(saved);
        } catch (e) {
            console.error("Gagal memuat data kategori");
        }
    }
}
