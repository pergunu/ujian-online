import AppConfig from './config.js';
import { initQuiz, startQuiz } from './quiz.js';
import { initAdminPanel } from './admin.js';
import { createStars, renderCertificate } from './ui.js';
import { initAudio, playSound, toggleBackgroundMusic } from './audio.js';

// Inisialisasi aplikasi saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi komponen
    createStars();
    initAudio();
    initQuiz();
    initAdminPanel();
    
    // Setup event listeners global
    setupGlobalEventListeners();
    
    // Set tanggal sertifikat
    setCertificateDate();
});

// Setup event listeners global
function setupGlobalEventListeners() {
    // Toggle music
    document.addEventListener('click', function(e) {
        if (e.target.closest('#musicToggle')) {
            toggleBackgroundMusic();
        }
    });
    
    // Tombol cetak sertifikat
    document.addEventListener('click', function(e) {
        if (e.target.closest('#printBtn')) {
            window.print();
        }
    });
    
    // Tombol call center
    document.addEventListener('click', function(e) {
        if (e.target.closest('#callCenterBtn')) {
            window.open('https://wa.me/6285647709114', '_blank');
        }
    });
}

// Set tanggal sertifikat
function setCertificateDate() {
    const now = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    document.getElementById('certificateDate').textContent = 
        `Ditetapkan di: Situbondo, ${now.toLocaleDateString('id-ID', options)}`;
}

// Ekspor fungsi yang diperlukan oleh modul lain
export { playSound, renderCertificate, startQuiz };
