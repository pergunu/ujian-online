// Fungsi-fungsi untuk panel admin
// (Dalam aplikasi lengkap, ini akan berisi lebih banyak fungsi)

// Fungsi untuk login admin
function adminLogin(code) {
    if (code === appState.adminCodes.adminPanel) {
        // Tampilkan panel admin
        showAdminPanel();
        return true;
    }
    return false;
}

// Fungsi untuk menampilkan panel admin
function showAdminPanel() {
    // Di aplikasi lengkap, ini akan menampilkan antarmuka admin
    console.log('Admin panel shown');
    
    // Contoh: Update greeting text
    document.getElementById('greeting-text').textContent = appState.settings.greetingText;
}

// Fungsi untuk update kode admin
function updateAdminCode(newCode, oldCode) {
    if (oldCode === appState.adminCodes.adminPanel) {
        appState.adminCodes.adminPanel = newCode;
        saveAppState();
        return true;
    }
    return false;
}

// Fungsi untuk update kode login
function updateLoginCode(newCode, oldCode) {
    if (oldCode === appState.adminCodes.login) {
        appState.adminCodes.login = newCode;
        saveAppState();
        return true;
    }
    return false;
}

// Fungsi untuk update kode CPNS
function updateCPNSCode(newCode, oldCode) {
    if (oldCode === appState.adminCodes.cpns) {
        appState.adminCodes.cpns = newCode;
        saveAppState();
        return true;
    }
    return false;
}

// Fungsi untuk update kode bank soal
function updateBankSoalCode(newCode, oldCode) {
    if (oldCode === appState.adminCodes.bankSoal) {
        appState.adminCodes.bankSoal = newCode;
        saveAppState();
        return true;
    }
    return false;
}
