// admin.js

document.addEventListener('DOMContentLoaded', () => {
    loadEnabledCategories();
    updateCategoryUI();

    // Toggle kategori utama
    document.getElementById('togglePelajar').addEventListener('change', function () {
        enabledCategories.pelajar = this.checked;
        updateCategoryUI();
        saveEnabledCategories();
    });

    document.getElementById('toggleUmum').addEventListener('change', function () {
        enabledCategories.umum = this.checked;
        updateCategoryUI();
        saveEnabledCategories();
    });

    // Toggle subkategori
    document.querySelectorAll('.toggle-subcategory').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const category = this.dataset.category;
            const subcategory = this.dataset.subcategory;
            enabledCategories.subcategories[category][subcategory] = this.checked;
            updateCategoryUI();
            saveEnabledCategories();
        });
    });

    // Tombol nonaktifkan semua subkategori pelajar
    document.getElementById('disableAllPelajarBtn').addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin menonaktifkan semua subkategori Pelajar?')) {
            Object.keys(enabledCategories.subcategories.pelajar).forEach(sub => {
                enabledCategories.subcategories.pelajar[sub] = false;
            });
            updateCategoryUI();
            saveEnabledCategories();
            alert("Semua subkategori pelajar telah dinonaktifkan.");
        }
    });
});
