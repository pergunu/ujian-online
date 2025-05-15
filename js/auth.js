import AppConfig from './config.js';

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    initLoginScreen();
    initTermsAgreement();
});

// Fungsi untuk inisialisasi layar login
function initLoginScreen() {
    const loginHTML = `
        <div class="login-container">
            <h2 class="login-title">Selamat Datang di ${AppConfig.appName}</h2>
            <p class="login-description">
                Selamat datang di platform ujian kompetensi ${AppConfig.organization}. 
                Untuk memastikan keamanan dan eksklusivitas ujian, silakan masukkan 
                kode sandi ujian terlebih dahulu sebelum melanjutkan.
            </p>
            <input type="password" id="examCode" class="login-input" placeholder="Masukkan Kode Login Ujian">
            <button class="login-btn" id="loginBtn">Masuk</button>
        </div>
    `;
    
    document.getElementById('loginScreen').innerHTML = loginHTML;
    
    // Event listener untuk tombol login
    document.getElementById('loginBtn').addEventListener('click', handleLogin);
}

// Fungsi untuk menangani login
function handleLogin() {
    const examCode = document.getElementById('examCode').value;
    if (examCode === 'KODEUJIAN12345') {
        document.getElementById('loginScreen').style.display = 'none';
        showOpeningScreen();
    } else {
        alert('Kode ujian salah! Silakan coba lagi.');
    }
}

// Fungsi untuk menampilkan layar opening
function showOpeningScreen() {
    const openingHTML = `
        <img src="assets/images/logo.png" alt="${AppConfig.appName} Logo" class="opening-logo">
        <h1 class="opening-title">${AppConfig.appName}</h1>
        <p class="opening-subtitle">Uji Pengetahuan Anda & Raih Prestasi Terbaik Bersama ${AppConfig.organization}</p>
        
        <div class="terms-container">
            <h2 class="terms-title">Kebijakan & Persyaratan</h2>
            <div class="terms-content">
                <!-- Konten terms akan diisi sesuai kebutuhan -->
            </div>
            
            <div class="terms-checkbox">
                <input type="checkbox" id="agreeTerms" required>
                <label for="agreeTerms">Saya telah membaca dan menyetujui syarat & ketentuan di atas</label>
            </div>
            
            <button class="continue-btn" id="continueBtn" disabled>
                Lanjutkan ke Quiz <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        
        <p class="opening-message">Ilmu Adalah Cahaya, Kecerdasan & Akhlak Adalah Kunci Kesuksesan (By Cendhanu)</p>
    `;
    
    document.getElementById('openingScreen').innerHTML = openingHTML;
    document.getElementById('openingScreen').style.display = 'flex';
}

// Fungsi untuk inisialisasi persetujuan terms
function initTermsAgreement() {
    document.addEventListener('click', function(e) {
        if (e.target.id === 'continueBtn') {
            const agreeCheckbox = document.getElementById('agreeTerms');
            if (!agreeCheckbox.checked) {
                alert('Anda harus menyetujui syarat dan ketentuan terlebih dahulu');
                return;
            }
            
            // Lanjutkan ke quiz
            document.getElementById('openingScreen').style.display = 'none';
            document.querySelector('.main-container').style.display = 'flex';
        }
    });
    
    // Aktifkan tombol continue ketika checkbox dicentang
    document.addEventListener('change', function(e) {
        if (e.target.id === 'agreeTerms') {
            document.getElementById('continueBtn').disabled = !e.target.checked;
        }
    });
}
