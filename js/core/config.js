// config.js

let enabledCategories = {
  pelajar: true,
  umum: true,
  subcategories: {
    pelajar: {
      ipa: true,
      ips: true,
      matematika: true,
      agama: true,
      ppkn: true,
      sejarah: true,
      bahasa_indonesia: true,
      bahasa_inggris: true
    },
    umum: {
      logika: true
    }
  }
};

function saveEnabledCategories() {
  localStorage.setItem('enabledCategories', JSON.stringify(enabledCategories));
}

function loadEnabledCategories() {
  const saved = localStorage.getItem('enabledCategories');
  if (saved) {
    try {
      enabledCategories = JSON.parse(saved);
    } catch (e) {
      console.error("Gagal memuat data kategori");
    }
  }
}

let enabledCategories = {
  pelajar: true,
  umum: true,
  subcategories: {
    pelajar: {
      ipa: true,
      ips: true,
      matematika: true,
      agama: true,
      ppkn: true,
      sejarah: true,
      bahasa_indonesia: true,
      bahasa_inggris: true
    },
    umum: {
      logika: true
    }
  }
};

function saveEnabledCategories() {
  localStorage.setItem('enabledCategories', JSON.stringify(enabledCategories));
}

function loadEnabledCategories() {
  const saved = localStorage.getItem('enabledCategories');
  if (saved) {
    try {
      enabledCategories = JSON.parse(saved);
    } catch (e) {
      console.error("Gagal memuat data kategori");
    }
  }
}

function updateCategoryUI() {
  document.querySelectorAll('.category-tab').forEach(tab => {
    const category = tab.dataset.category;
    const isEnabled = enabledCategories[category];
    tab.classList.toggle('disabled', !isEnabled);

    if (!isEnabled && tab.classList.contains('active')) {
      tab.classList.remove('active');
    }
  });

  document.querySelectorAll('.subcategory-label').forEach(label => {
    const radio = label.querySelector('input[type="radio"]');
    const category = radio.closest('[id]').id.replace('Subcategories', '').toLowerCase();
    const subcategory = radio.value;

    label.style.display = enabledCategories.subcategories[category]?.[subcategory] ? 'block' : 'none';
  });
}
