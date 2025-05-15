let enabledCategories = {
    pelajar: true,
    umum: true,
    subcategories: {
        pelajar: {
            ipa: true,
            ips: true,
            matematika: true,
            agama: true,
            ppkn: true,
            sejarah: true,
            bahasa_indonesia: true,
            bahasa_inggris: true
        },
        umum: {
            logika: true
        }
    }
};

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
