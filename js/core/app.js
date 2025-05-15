// app.js

document.addEventListener('DOMContentLoaded', () => {
    loadEnabledCategories(); // Dari config.js
    updateCategoryUI();      // Dari ui-manager.js

    // Jika ada inisialisasi lain
    createStars();
    initAudio();
    initEventListeners();
});
