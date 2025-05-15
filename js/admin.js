import AppConfig from './config.js';

// Variabel state admin
let adminState = {
    isLoggedIn: false,
    currentFilter: '',
    editingQuestion: null
};

// Inisialisasi panel admin
export function initAdminPanel() {
    renderAdminLogin();
    setupAdminEventListeners();
}

// Render login admin
function renderAdminLogin() {
    const adminLoginHTML = `
        <div class="admin-header">
            <h2 class="admin-title"><i class="fas fa-lock"></i> Admin Login</h2>
            <button class="admin-close" id="adminClose">&times;</button>
        </div>
        
        <div class="form-group">
            <label for="adminPassword" class="form-label">Password Admin</label>
            <input type="password" id="adminPassword" class="form-control" placeholder="Masukkan password admin">
        </div>
        <button class="btn btn-primary" id="adminLoginBtn">
            <i class="fas fa-sign-in-alt"></i> Login
        </button>
    `;
    
    document.getElementById('adminLogin').innerHTML = adminLoginHTML;
}

// Setup event listeners admin
function setupAdminEventListeners() {
    // Login admin
    document.addEventListener('click', function(e) {
        if (e.target.id === 'adminLoginBtn') {
            const password = document.getElementById('adminPassword').value;
            if (password === AppConfig.defaultPassword) {
                adminState.isLoggedIn = true;
                renderAdminDashboard();
            } else {
                alert('Password admin salah!');
            }
        }
        
        // Tombol close
        if (e.target.id === 'adminClose' || e.target.id === 'adminPanelClose') {
            closeAdminPanel();
        }
    });
}

// Render dashboard admin
function renderAdminDashboard() {
    const adminPanelHTML = `
        <div class="admin-header">
            <h2 class="admin-title"><i class="fas fa-cog"></i> Panel Admin</h2>
            <button class="admin-close" id="adminPanelClose">&times;</button>
        </div>
        
        <div class="admin-content" id="adminContent">
            <!-- Konten admin akan diisi dinamis -->
        </div>
    `;
    
    document.getElementById('adminPanel').innerHTML = adminPanelHTML;
    renderQuestionManagement();
    renderCategoryManagement();
}

// Render manajemen pertanyaan
function renderQuestionManagement() {
    const questionsHTML = `
        <div class="form-group">
            <label for="adminCategoryFilter" class="form-label">Filter Kategori</label>
            <select id="adminCategoryFilter" class="form-control">
                <option value="">Semua Kategori</option>
                <option value="pelajar">Pelajar</option>
                <option value="umum">Umum</option>
            </select>
        </div>
        
        <div class="question-list" id="questionList">
            <!-- Daftar pertanyaan akan diisi dinamis -->
        </div>
        
        <h3 class="admin-title"><i class="fas fa-plus-circle"></i> Tambah Soal Baru</h3>
        <form id="addQuestionForm">
            <!-- Form tambah soal akan diisi dinamis -->
        </form>
    `;
    
    document.getElementById('adminContent').innerHTML = questionsHTML;
    loadQuestionsForAdmin();
}

// Render manajemen kategori
function renderCategoryManagement() {
    const categoryHTML = `
        <div class="ai-prompt-section">
            <div class="ai-prompt-title">
                <i class="fas fa-toggle-on"></i> Aktifkan/Nonaktifkan Kategori Ujian
            </div>
            
            <!-- Konten toggle kategori akan diisi dinamis -->
        </div>
    `;
    
    document.getElementById('adminContent').insertAdjacentHTML('beforeend', categoryHTML);
    renderCategoryToggles();
}

// Tutup panel admin
function closeAdminPanel() {
    document.getElementById('adminOverlay').style.display = 'none';
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'none';
    adminState.isLoggedIn = false;
}
