function updateCategoryUI() {
  document.querySelectorAll('.category-tab').forEach(tab => {
    const category = tab.dataset.category;
    tab.style.display = enabledCategories[category] ? 'inline-block' : 'none';
  });

  document.querySelectorAll('#pelajarSubcategories .subcategory-label').forEach(label => {
    const radio = label.querySelector('input[type="radio"]');
    const subcategory = radio.value;
    label.style.display = enabledCategories.subcategories.pelajar[subcategory] ? 'block' : 'none';
  });

  document.querySelectorAll('#umumSubcategories .subcategory-label').forEach(label => {
    const radio = label.querySelector('input[type="radio"]');
    const subcategory = radio.value;
    label.style.display = enabledCategories.subcategories.umum[subcategory] ? 'block' : 'none';
  });
}

document.querySelectorAll('.category-tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    currentCategory = this.dataset.category;
    showSubcategories(currentCategory);
  });
});
