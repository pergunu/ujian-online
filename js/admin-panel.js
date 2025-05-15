// admin-panel.js

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
