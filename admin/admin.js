document.addEventListener('DOMContentLoaded', () => {
    loadEnabledCategories();
    updateCategoryUI();

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

    document.querySelectorAll('.toggle-subcategory').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const category = this.dataset.category;
            const subcategory = this.dataset.subcategory;
            enabledCategories.subcategories[category][subcategory] = this.checked;
            updateCategoryUI();
            saveEnabledCategories();
        });
    });

    document.getElementById('disableAllPelajarBtn').addEventListener('click', () => {
        if (confirm('Nonaktifkan semua subkategori pelajar?')) {
            Object.keys(enabledCategories.subcategories.pelajar).forEach(sub => {
                enabledCategories.subcategories.pelajar[sub] = false;
            });
            updateCategoryUI();
            saveEnabledCategories();
            alert("Semua subkategori pelajar telah dinonaktifkan.");
        }
    });
});
