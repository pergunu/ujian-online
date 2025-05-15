// quiz-engine.js

function startQuiz() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (!name || !phone) {
        alert('Silakan isi nama lengkap dan nomor HP terlebih dahulu');
        return;
    }

    const activeTab = document.querySelector('.category-tab.active');
    const selectedRadio = document.querySelector('input[name="subcategory"]:checked');

    if (!activeTab || !selectedRadio) {
        alert("Silakan pilih kategori dan subkategori ujian.");
        return;
    }

    const currentCategory = activeTab.dataset.category;
    const currentSubcategory = selectedRadio.value;

    // Validasi apakah kategori aktif
    if (!enabledCategories[currentCategory]) {
        alert("Kategori ini sedang tidak tersedia!");
        return;
    }

    // Validasi apakah subkategori aktif
    if (!enabledCategories.subcategories[currentCategory]?.[currentSubcategory]) {
        alert("Subkategori ini sedang tidak tersedia!");
        return;
    }

    // Lanjutkan ke ujian...
}
