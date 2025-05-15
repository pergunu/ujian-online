// admin.js

document.addEventListener('DOMContentLoaded', () => {
    loadEnabledCategories();
    updateCategoryUI();
});

function enableCategory(category, isChecked) {
    enabledCategories[category] = isChecked;
    updateCategoryUI();
    saveEnabledCategories();
}

function enableSubcategory(category, subcategory, isChecked) {
    enabledCategories.subcategories[category][subcategory] = isChecked;
    updateCategoryUI();
    saveEnabledCategories();
}

function disableAllSubcategories(category) {
    if (confirm(`Nonaktifkan semua subkategori ${category}?`)) {
        Object.keys(enabledCategories.subcategories[category]).forEach(sub => {
            enabledCategories.subcategories[category][sub] = false;
        });
        updateCategoryUI();
        saveEnabledCategories();
        alert(`Semua subkategori ${category} telah dinonaktifkan.`);
    }
}
