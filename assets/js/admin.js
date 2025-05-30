// Admin panel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check admin code
    const adminCode = localStorage.getItem('adminCode') || '65614222';
    
    // Admin control functions
    function updateLoginCode(newCode) {
        // Update login code in localStorage
        localStorage.setItem('loginCode', newCode);
        alert('Kode login berhasil diperbarui!');
    }
    
    function updateExamCode(newCode) {
        // Update exam code in localStorage
        localStorage.setItem('examCode', newCode);
        alert('Kode ujian CPNS berhasil diperbarui!');
    }
    
    function updateQuestionBankCode(newCode) {
        // Update question bank code in localStorage
        localStorage.setItem('questionBankCode', newCode);
        alert('Kode bank soal berhasil diperbarui!');
    }
    
    function updateAdminCode(newCode) {
        // Update admin code in localStorage
        localStorage.setItem('adminCode', newCode);
        alert('Kode admin berhasil diperbarui!');
    }
    
    // API key configuration
    const apiKey = localStorage.getItem('apiKey') || '';
    
    function saveApiKey() {
        const newApiKey = document.getElementById('api-key-input').value;
        localStorage.setItem('apiKey', newApiKey);
        alert('API Key berhasil disimpan!');
    }
    
    // Initialize admin panel if on admin page
    if (document.getElementById('admin-panel')) {
        // Verify admin code
        const enteredCode = prompt('Masukkan Kode Admin:');
        if (enteredCode !== adminCode) {
            alert('Kode admin salah!');
            window.location.href = 'index.html';
            return;
        }
        
        // Set current values in form
        document.getElementById('login-code-new').value = localStorage.getItem('loginCode') || '12345';
        document.getElementById('exam-code-new').value = localStorage.getItem('examCode') || 'OPENLOCK-1945';
        document.getElementById('question-bank-code-new').value = localStorage.getItem('questionBankCode') || 'OPENLOCK-1926';
        document.getElementById('admin-code-new').value = adminCode;
        document.getElementById('api-key-input').value = apiKey;
        
        // Set up event listeners for save buttons
        document.getElementById('save-login-code').addEventListener('click', function() {
            const newCode = document.getElementById('login-code-new').value;
            updateLoginCode(newCode);
        });
        
        document.getElementById('save-exam-code').addEventListener('click', function() {
            const newCode = document.getElementById('exam-code-new').value;
            updateExamCode(newCode);
        });
        
        document.getElementById('save-question-bank-code').addEventListener('click', function() {
            const newCode = document.getElementById('question-bank-code-new').value;
            updateQuestionBankCode(newCode);
        });
        
        document.getElementById('save-admin-code').addEventListener('click', function() {
            const newCode = document.getElementById('admin-code-new').value;
            updateAdminCode(newCode);
        });
        
        document.getElementById('save-api-key').addEventListener('click', saveApiKey);
    }
});
