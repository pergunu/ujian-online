// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Load partikel
    particlesJS.load('particles-js', 'assets/js/particles-config.json', function() {
        console.log('Partikel berhasil dimuat');
    });
    
    // Inisialisasi screen manager
    initScreens();
    
    // Inisialisasi form validasi
    initFormValidation();
});

// Screen Manager
function initScreens() {
    const screens = {
        welcome: document.getElementById('welcome-screen'),
        terms: document.getElementById('terms-screen'),
        // Tambahkan screen lainnya
    };
    
    // Login handler
    document.getElementById('login-btn').addEventListener('click', function() {
        const code = document.getElementById('login-code').value;
        if (code === '12345') {
            switchScreen(screens.welcome, screens.terms);
        } else {
            alert('Kode login salah!');
        }
    });
    
    // Fungsi beralih screen
    function switchScreen(from, to) {
        from.classList.remove('active');
        to.classList.add('active');
    }
}
