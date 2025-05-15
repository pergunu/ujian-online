// ui-manager.js
function updateCategoryUI() {
    // Update tab kategori utama
    document.querySelectorAll('.category-tab').forEach(tab => {
        const category = tab.dataset.category;
        tab.style.display = enabledCategories[category] ? 'inline-block' : 'none';
    });

    // Update subkategori pelajar
    document.querySelectorAll('#pelajarSubcategories .subcategory-label').forEach(label => {
        const radio = label.querySelector('input[type="radio"]');
        const subcategory = radio.value;
        label.style.display = enabledCategories.subcategories.pelajar[subcategory] ? 'block' : 'none';
    });

    // Update subkategori umum
    document.querySelectorAll('#umumSubcategories .subcategory-label').forEach(label => {
        const radio = label.querySelector('input[type="radio"]');
        const subcategory = radio.value;
        label.style.display = enabledCategories.subcategories.umum[subcategory] ? 'block' : 'none';
    });
}
