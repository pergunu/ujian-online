// admin/admin.js
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

document.getElementById('disableAllPelajarBtn').addEventListener('click', function () {
    if (confirm('Apakah Anda yakin ingin menonaktifkan semua subkategori Pelajar?')) {
        Object.keys(enabledCategories.subcategories.pelajar).forEach(sub => {
            enabledCategories.subcategories.pelajar[sub] = false;
        });
        updateCategoryUI();
        saveEnabledCategories();
        alert("Semua subkategori Pelajar telah dinonaktifkan.");
    }
});

document.getElementById('disableAllUmumBtn').addEventListener('click', function () {
    if (confirm('Apakah Anda yakin ingin menonaktifkan semua subkategori Umum?')) {
        Object.keys(enabledCategories.subcategories.umum).forEach(sub => {
            enabledCategories.subcategories.umum[sub] = false;
        });
        updateCategoryUI();
        saveEnabledCategories();
        alert("Semua subkategori Umum telah dinonaktifkan.");
    }
});
