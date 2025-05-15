const ADMIN_PASSWORD = 'PERGUNU2025';

function toggleAdminPanel() {
    const panel = document.getElementById('adminPanel');
    const overlay = document.getElementById('adminOverlay');
    panel.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}

function closeAdminPanels() {
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('adminOverlay').classList.add('hidden');
}

function adminLogin() {
    const passwordInput = document.getElementById('adminPassword');
    const password = passwordInput.value;

    if (password === ADMIN_PASSWORD) {
        document.getElementById('adminContent').style.display = 'block';
        document.getElementById('adminLoginSection').style.display = 'none';
        alert('Login admin berhasil!');
    } else {
        alert('Password salah!');
        passwordInput.focus();
    }
}

function resetAllData() {
    if (confirm('Apakah Anda yakin ingin mereset semua data peserta?')) {
        localStorage.removeItem('quizResults');
        alert('Semua data peserta telah direset.');
    }
}
