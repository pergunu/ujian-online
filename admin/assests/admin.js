import { Auth } from '../../js/auth.js';

class AdminApp {
    constructor() {
        // Cek autentikasi
        if (!Auth.isAdminAuthenticated()) {
            const password = prompt('Masukkan Password Admin:');
            if (!Auth.authenticate(password)) {
                alert('Password salah!');
                window.location.href = '../../';
            }
        }

        // Inisialisasi admin panel
        this.initAdminPanel();
    }

    initAdminPanel() {
        // Event listeners untuk navigasi
        document.querySelectorAll('.admin-sidebar a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(link.dataset.section);
            });
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            Auth.logout();
            window.location.href = '../../';
        });

        // Tampilkan section dashboard secara default
        this.showSection('dashboard');
    }

    showSection(sectionId) {
        // Sembunyikan semua section
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.add('hidden');
        });

        // Tampilkan section yang dipilih
        document.getElementById(`${sectionId}Section`).classList.remove('hidden');

        // Update active nav link
        document.querySelectorAll('.admin-sidebar a').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });

        // Load data section jika diperlukan
        if (sectionId === 'questionBank') {
            this.loadQuestionBank();
        }
    }

    loadQuestionBank() {
        // Implementasi loading question bank
        console.log('Loading question bank...');
        // Ini akan diimplementasikan lebih lanjut dengan fetch API
    }
}

// Jalankan aplikasi admin saat dokumen siap
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('admin')) {
        new AdminApp();
    }
});
