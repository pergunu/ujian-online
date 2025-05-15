// quiz-engine.js
function startQuiz() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (!name || !phone) {
        alert('Silakan isi nama lengkap dan nomor HP terlebih dahulu');
        return;
    }

    // Validasi apakah kategori aktif
    if (!enabledCategories[currentCategory]) {
        alert('Kategori ini sedang tidak tersedia!');
        return;
    }

    // Validasi apakah subkategori aktif
    if (!enabledCategories.subcategories[currentCategory]?.[currentSubcategory]) {
        alert('Subkategori ini sedang tidak tersedia!');
        return;
    }

    // Lanjutkan ke ujian...
}
