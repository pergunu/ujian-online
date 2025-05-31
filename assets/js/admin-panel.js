// Admin Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Login to Admin Panel
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const adminCode = document.getElementById('admin-code-input').value;
            if (adminCode === '65614222') {
                window.location.href = 'admin.html';
            } else {
                alert('Kode admin salah!');
            }
        });
    }

    // Admin Panel Functions
    if (document.getElementById('admin-panel')) {
        // Load current settings
        loadAdminSettings();

        // Save settings
        document.getElementById('save-settings-btn').addEventListener('click', saveAdminSettings);

        // Question Bank Management
        document.getElementById('add-question-btn').addEventListener('click', addNewQuestion);
    }
});

function loadAdminSettings() {
    // Load from localStorage or default values
    const settings = JSON.parse(localStorage.getItem('adminSettings')) || {
        loginCode: '12345',
        cpnsCode: 'OPENLOCK-1945',
        bankCode: 'OPENLOCK-1926',
        adminCode: '65614222',
        greetingText: 'Selamat Datang di Ujian Online Pergunu Situbondo',
        motivationTexts: [
            'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.',
            'Bagus! Anda telah menunjukkan pemahaman yang baik terhadap materi ujian.',
            'Cukup baik! Teruslah belajar untuk meningkatkan pemahaman Anda.',
            'Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.'
        ],
        infoText: 'Informasi berkala akan ditampilkan di sini. Konten ini dapat diubah melalui kontrol panel admin.'
    };

    // Populate form fields
    document.getElementById('login-code').value = settings.loginCode;
    document.getElementById('cpns-code').value = settings.cpnsCode;
    document.getElementById('bank-code').value = settings.bankCode;
    document.getElementById('new-admin-code').value = settings.adminCode;
    document.getElementById('greeting-text').value = settings.greetingText;
    document.getElementById('info-text').value = settings.infoText;
    
    // Populate motivation texts
    const motivationContainer = document.getElementById('motivation-texts-container');
    motivationContainer.innerHTML = '';
    settings.motivationTexts.forEach((text, index) => {
        const div = document.createElement('div');
        div.className = 'motivation-text-item';
        div.innerHTML = `
            <textarea class="motivation-textarea">${text}</textarea>
            <button class="remove-motivation-btn" data-index="${index}">Hapus</button>
        `;
        motivationContainer.appendChild(div);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-motivation-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
}

function saveAdminSettings() {
    const settings = {
        loginCode: document.getElementById('login-code').value,
        cpnsCode: document.getElementById('cpns-code').value,
        bankCode: document.getElementById('bank-code').value,
        adminCode: document.getElementById('new-admin-code').value,
        greetingText: document.getElementById('greeting-text').value,
        infoText: document.getElementById('info-text').value,
        motivationTexts: []
    };

    // Collect motivation texts
    document.querySelectorAll('.motivation-textarea').forEach(textarea => {
        settings.motivationTexts.push(textarea.value);
    });

    // Save to localStorage
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert('Pengaturan berhasil disimpan!');
}

function addNewQuestion() {
    const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
    
    const newQuestion = {
        id: Date.now(),
        category: document.getElementById('question-category').value,
        type: document.getElementById('question-type').value,
        level: document.getElementById('question-level').value,
        text: document.getElementById('question-text').value,
        options: [
            { text: document.getElementById('option-a').value, correct: document.getElementById('correct-a').checked },
            { text: document.getElementById('option-b').value, correct: document.getElementById('correct-b').checked },
            { text: document.getElementById('option-c').value, correct: document.getElementById('correct-c').checked },
            { text: document.getElementById('option-d').value, correct: document.getElementById('correct-d').checked }
        ],
        explanation: document.getElementById('question-explanation').value
    };

    questionBank.push(newQuestion);
    localStorage.setItem('questionBank', JSON.stringify(questionBank));
    alert('Pertanyaan baru berhasil ditambahkan!');
    document.getElementById('question-form').reset();
}
