// Event listener untuk toggle kategori utama
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

// Event listener untuk toggle subkategori
document.querySelectorAll('.toggle-subcategory').forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    const category = this.dataset.category;
    const subcategory = this.dataset.subcategory;
    enabledCategories.subcategories[category][subcategory] = this.checked;
    updateCategoryUI();
    saveEnabledCategories();
  });
});

// Tombol disable semua subkategori pelajar
document.getElementById('disableAllPelajarBtn').addEventListener('click', () => {
  if (confirm('Apakah Anda yakin ingin menonaktifkan semua subkategori pelajar?')) {
    Object.keys(enabledCategories.subcategories.pelajar).forEach(sub => {
      enabledCategories.subcategories.pelajar[sub] = false;
    });
    updateCategoryUI();
    saveEnabledCategories();
    alert("Semua subkategori pelajar telah dinonaktifkan.");
  }
});

// Tombol disable semua subkategori umum
document.getElementById('disableAllUmumBtn').addEventListener('click', () => {
  if (confirm('Apakah Anda yakin ingin menonaktifkan semua subkategori umum?')) {
    Object.keys(enabledCategories.subcategories.umum).forEach(sub => {
      enabledCategories.subcategories.umum[sub] = false;
    });
    updateCategoryUI();
    saveEnabledCategories();
    alert("Semua subkategori umum telah dinonaktifkan.");
  }
});
