// Admin Panel Script
class AdminPanel {
    constructor() {
        this.adminCode = '65614222';
        this.loginCode = '12345';
        this.cpnsCode = 'OPENLOCK-1945';
        this.bankCode = 'OPENLOCK-1926';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadSettings();
    }
    
    setupEventListeners() {
        // Code saving
        document.getElementById('save-login-code').addEventListener('click', () => this.saveCode('login'));
        document.getElementById('save-cpns-code').addEventListener('click', () => this.saveCode('cpns'));
        document.getElementById('save-bank-code').addEventListener('click', () => this.saveCode('bank'));
        document.getElementById('save-admin-code').addEventListener('click', () => this.saveCode('admin'));
        
        // Question management
        document.getElementById('add-question').addEventListener('click', () => this.showQuestionForm());
        document.getElementById('cancel-question').addEventListener('click', () => this.hideQuestionForm());
        document.getElementById('save-question').addEventListener('click', () => this.saveQuestion());
        document.getElementById('ai-generate').addEventListener('click', () => this.toggleAIForm());
        
        // Settings
        document.getElementById('save-settings').addEventListener('click', () => this.saveSettings());
        document.getElementById('save-texts').addEventListener('click', () => this.saveTexts());
        
        // Export
        document.getElementById('export-excel').addEventListener('click', () => this.exportData('excel'));
        document.getElementById('export-word').addEventListener('click', () => this.exportData('word'));
        document.getElementById('export-pdf').addEventListener('click', () => this.exportData('pdf'));
    }
    
    loadSettings() {
        // Load greeting text
        document.getElementById('greeting-text-editor').value = 
            localStorage.getItem('greetingText') || 'Selamat Datang di Ujian Online Pergunu Situbondo';
        
        // Load terms text
        document.getElementById('terms-text-editor').value = 
            localStorage.getItem('termsText') || `1. Peserta wajib mengisi data diri dengan benar.
2. Dilarang keras melakukan kecurangan selama ujian.
3. Waktu ujian tidak dapat diperpanjang setelah habis.
4. Hasil ujian bersifat final dan tidak dapat diganggu gugat.
5. Sertifikat hanya diberikan kepada peserta yang menyelesaikan ujian.`;
        
        // Load periodic info
        document.getElementById('periodic-text-editor').value = 
            localStorage.getItem('periodicText') || 'Ujian online ini diselenggarakan oleh Pergunu Situbondo. Pastikan data yang Anda isi benar.';
        
        // Load chairman name
        document.getElementById('chairman-text').value = 
            localStorage.getItem('chairmanName') || 'Moh. Nuril Hudha, S.Pd., M.Si.';
        
        // Load motivation texts
        document.getElementById('motivation-texts').value = 
            localStorage.getItem('motivationTexts') || `Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.;
Bagus! Anda memiliki pemahaman yang baik tentang materi ini. Terus tingkatkan kemampuan Anda.;
Cukup baik. Masih ada ruang untuk meningkatkan pemahaman Anda. Terus belajar!;
Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.`;
    }
    
    saveCode(type) {
        let newCode, currentCode;
        
        switch(type) {
            case 'login':
                newCode = document.getElementById('new-login-code').value;
                currentCode = document.getElementById('current-login-code').value;
                
                if (currentCode !== this.loginCode) {
                    alert('Kode login lama tidak valid!');
                    return;
                }
                
                this.loginCode = newCode;
                break;
                
            case 'cpns':
                newCode = document.getElementById('new-cpns-code').value;
                currentCode = document.getElementById('current-cpns-code').value;
                
                if (currentCode !== this.cpnsCode) {
                    alert('Kode CPNS lama tidak valid!');
                    return;
                }
                
                this.cpnsCode = newCode;
                break;
                
            case 'bank':
                newCode = document.getElementById('new-bank-code').value;
                currentCode = document.getElementById('current-bank-code').value;
                
                if (currentCode !== this.bankCode) {
                    alert('Kode bank soal lama tidak valid!');
                    return;
                }
                
                this.bankCode = newCode;
                break;
                
            case 'admin':
                newCode = document.getElementById('new-admin-code').value;
                currentCode = document.getElementById('current-admin-code').value;
                
                if (currentCode !== this.adminCode) {
                    alert('Kode admin lama tidak valid!');
                    return;
                }
                
                this.adminCode = newCode;
                break;
        }
        
        alert(`Kode ${type} berhasil diperbarui!`);
        
        // Clear input fields
        document.getElementById(`new-${type}-code`).value = '';
        document.getElementById(`current-${type}-code`).value = '';
    }
    
    showQuestionForm() {
        const category = document.getElementById('question-category').value;
        const subject = document.getElementById('question-subject').value;
        
        if (!category || !subject) {
            alert('Pilih kategori dan jenis ujian terlebih dahulu!');
            return;
        }
        
        document.getElementById('question-form').classList.remove('hidden');
    }
    
    hideQuestionForm() {
        document.getElementById('question-form').classList.add('hidden');
    }
    
    saveQuestion() {
        const questionText = document.getElementById('question-text-editor').value.trim();
        const options = Array.from(document.querySelectorAll('.option')).map(opt => opt.value.trim());
        const correctAnswer = document.getElementById('correct-answer').value;
        const explanation = document.getElementById('explanation-text').value.trim();
        const category = document.getElementById('question-category').value;
        const subject = document.getElementById('question-subject').value;
        
        if (!questionText || options.some(opt => !opt) || !correctAnswer) {
            alert('Harap isi semua field yang diperlukan!');
            return;
        }
        
        // Create question object
        const question = {
            id: Date.now(),
            category,
            subject,
            question: questionText,
            options,
            correctAnswer,
            explanation
        };
        
        // Save to localStorage (in a real app, you would save to a database)
        let questions = JSON.parse(localStorage.getItem('questions') || []);
        questions.push(question);
        localStorage.setItem('questions', JSON.stringify(questions));
        
        // Add to UI
        this.addQuestionToUI(question);
        
        // Hide form and reset fields
        this.hideQuestionForm();
        document.getElementById('question-text-editor').value = '';
        document.querySelectorAll('.option').forEach(opt => opt.value = '');
        document.getElementById('correct-answer').value = '';
        document.getElementById('explanation-text').value = '';
        
        alert('Soal berhasil disimpan!');
    }
    
    addQuestionToUI(question) {
        const questionsList = document.getElementById('questions-list');
        
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.dataset.id = question.id;
        
        questionItem.innerHTML = `
            <h4>${question.question}</h4>
            <div class="options">
                ${question.options.map((opt, i) => 
                    `<p class="${String.fromCharCode(97 + i) === question.correctAnswer ? 'correct-option' : ''}">
                        ${String.fromCharCode(65 + i)}. ${opt}
                    </p>`
                ).join('')}
            </div>
            <div class="explanation">
                <strong>Penjelasan:</strong> ${question.explanation || 'Tidak ada penjelasan'}
            </div>
            <div class="actions">
                <button class="btn-small edit-btn">Edit</button>
                <button class="btn-small delete-btn">Hapus</button>
            </div>
        `;
        
        questionsList.appendChild(questionItem);
        
        // Add event listeners to new buttons
        questionItem.querySelector('.edit-btn').addEventListener('click', () => this.editQuestion(question.id));
        questionItem.querySelector('.delete-btn').addEventListener('click', () => this.deleteQuestion(question.id));
    }
    
    editQuestion(id) {
        // In a real implementation, you would load the question and populate the form
        alert(`Edit question with ID: ${id}`);
    }
    
    deleteQuestion(id) {
        if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            // Remove from localStorage
            let questions = JSON.parse(localStorage.getItem('questions') || '[]');
            questions = questions.filter(q => q.id !== id);
            localStorage.setItem('questions', JSON.stringify(questions));
            
            // Remove from UI
            document.querySelector(`.question-item[data-id="${id}"]`).remove();
            alert('Soal berhasil dihapus!');
        }
    }
    
    toggleAIForm() {
        const apiKeySection = document.getElementById('ai-key-section');
        apiKeySection.classList.toggle('hidden');
        
        if (!apiKeySection.classList.contains('hidden')) {
            // Focus on API key input
            document.getElementById('api-key').focus();
        }
    }
    
    saveSettings() {
        const timer = document.getElementById('exam-timer').value;
        const questionCount = document.getElementById('question-count').value;
        const pointValue = document.getElementById('point-value').value;
        const randomize = document.getElementById('randomize-questions').checked;
        
        // Save to localStorage
        localStorage.setItem('examTimer', timer);
        localStorage.setItem('questionCount', questionCount);
        localStorage.setItem('pointValue', pointValue);
        localStorage.setItem('randomizeQuestions', randomize);
        
        alert('Pengaturan ujian berhasil disimpan!');
    }
    
    saveTexts() {
        const greetingText = document.getElementById('greeting-text-editor').value;
        const termsText = document.getElementById('terms-text-editor').value;
        const periodicText = document.getElementById('periodic-text-editor').value;
        const chairmanName = document.getElementById('chairman-text').value;
        const motivationTexts = document.getElementById('motivation-texts').value;
        
        // Save to localStorage
        localStorage.setItem('greetingText', greetingText);
        localStorage.setItem('termsText', termsText);
        localStorage.setItem('periodicText', periodicText);
        localStorage.setItem('chairmanName', chairmanName);
        localStorage.setItem('motivationTexts', motivationTexts);
        
        // Update UI
        document.getElementById('greeting-text').textContent = greetingText;
        document.getElementById('terms-text').innerHTML = termsText.split('\n').map(p => `<p>${p}</p>`).join('');
        document.getElementById('periodic-text').textContent = periodicText;
        document.getElementById('periodic-text-bottom').textContent = periodicText;
        
        alert('Teks berhasil diperbarui!');
    }
    
    exportData(format) {
        // In a real implementation, you would generate and download the file
        alert(`Data peserta akan diekspor ke format ${format.toUpperCase()}`);
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const adminPanel = new AdminPanel();
});
