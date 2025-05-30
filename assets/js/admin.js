document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const tabs = document.querySelectorAll('.admin-tab');
    const tabContents = document.querySelectorAll('.admin-tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.dataset.tab + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Code Settings
    document.getElementById('save-login-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-login-code').value;
        const confirmCode = document.getElementById('confirm-login-code').value;
        
        if (newCode && newCode === confirmCode) {
            alert('Kode login berhasil diperbarui!');
            document.getElementById('current-login-code').value = newCode;
        } else {
            alert('Kode tidak cocok atau kosong!');
        }
    });
    
    // Add similar event listeners for other code settings...
    
    // Question Bank
    document.getElementById('ai-generate').addEventListener('click', function() {
        document.getElementById('ai-prompt-modal').classList.add('active');
    });
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
        });
    });
    
    // Generate Questions with AI
    document.getElementById('generate-questions').addEventListener('click', function() {
        const apiKey = document.getElementById('ai-api-key').value;
        const prompt = document.getElementById('ai-prompt').value;
        const category = document.getElementById('ai-category').value;
        const count = document.getElementById('ai-count').value;
        
        if (!apiKey) {
            alert('API Key harus diisi!');
            return;
        }
        
        // In a real app, you would call the AI API here
        alert(`[Simulasi] Akan generate ${count} soal ${category} dengan prompt: ${prompt}\n\nAPI Key: ${apiKey.substring(0, 5)}...`);
        
        // Close modal after generation
        document.getElementById('ai-prompt-modal').classList.remove('active');
    });
});
