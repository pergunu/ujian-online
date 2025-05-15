// ui-manager.js

function updateCategoryUI() {
  document.querySelectorAll('.category-tab').forEach(tab => {
    const category = tab.dataset.category;
    tab.style.display = enabledCategories[category] ? 'inline-block' : 'none';
  });

  // Subkategori Pelajar
  document.querySelectorAll('#pelajarSubcategories .subcategory-label').forEach(label => {
    const radio = label.querySelector('input[type="radio"]');
    const subcategory = radio.value;
    label.style.display = enabledCategories.subcategories.pelajar[subcategory] ? 'block' : 'none';
  });

  // Subkategori Umum
  document.querySelectorAll('#umumSubcategories .subcategory-label').forEach(label => {
    const radio = label.querySelector('input[type="radio"]');
    const subcategory = radio.value;
    label.style.display = enabledCategories.subcategories.umum[subcategory] ? 'block' : 'none';
  });
}
