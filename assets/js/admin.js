// Admin Panel functionality
function showAdminPanel(activeTab = 'codes') {
    const adminPanel = document.querySelector('.admin-panel');
    adminPanel.classList.remove('hidden');
    
    // Activate the requested tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === activeTab) {
            btn.classList.add('active');
        }
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === `${activeTab}-tab`) {
            content.classList.add('active');
        }
    });
    
    // Load participants data
    loadParticipantsData();
    
    // Load questions data
    loadQuestionsData();
    
    // Handle tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${this.dataset.tab}-tab`).classList.add('active');
        });
    });
    
    // Handle code changes
    document.getElementById('save-login-code').addEventListener('click', function() {
        playButtonSound();
        const newCode = document.getElementById('new-login-code').value;
        const oldCode = document.getElementById('old-login-code').value;
        
        if (oldCode === settings.loginCode) {
            settings.loginCode = newCode;
            saveSettings();
            alert('Kode login berhasil diubah!');
            document.getElementById('new-login-code').value = '';
            document.getElementById('old-login-code').value = '';
        } else {
            alert('Kode login lama salah.');
        }
    });
    
    document.getElementById('save-cpns-code').addEventListener('click', function() {
        playButtonSound();
        const newCode = document.getElementById('new-cpns-code').value;
        const oldCode = document.getElementById('old-cpns-code').value;
        
        if (oldCode === settings.cpnsCode) {
            settings.cpnsCode = newCode;
            saveSettings();
            alert('Kode CPNS/P3K berhasil diubah!');
            document.getElementById('new-cpns-code').value = '';
            document.getElementById('old-cpns-code').value = '';
        } else {
            alert('Kode CPNS/P3K lama salah.');
        }
    });
    
    document.getElementById('save-question-code').addEventListener('click', function() {
        playButtonSound();
        const newCode = document.getElementById('new-question-code').value;
        const oldCode = document.getElementById('old-question-code').value;
        
        if (oldCode === settings.questionBankCode) {
            settings.questionBankCode = newCode;
            saveSettings();
            alert('Kode Bank Soal berhasil diubah!');
            document.getElementById('new-question-code').value = '';
            document.getElementById('old-question-code').value = '';
        } else {
            alert('Kode Bank Soal lama salah.');
        }
    });
    
    document.getElementById('save-admin-code').addEventListener('click', function() {
        playButtonSound();
        const newCode = document.getElementById('new-admin-code').value;
        const oldCode = document.getElementById('old-admin-code').value;
        
        if (oldCode === settings.adminCode) {
            settings.adminCode = newCode;
            saveSettings();
            alert('Kode Admin berhasil diubah!');
            document.getElementById('new-admin-code').value = '';
            document.getElementById('old-admin-code').value = '';
        } else {
            alert('Kode Admin lama salah.');
        }
    });
    
    // Handle question bank
    document.getElementById('add-question').addEventListener('click', function() {
        playButtonSound();
        document.querySelector('.question-form').classList.remove('hidden');
        document.querySelector('.ai-generate-form').classList.add('hidden');
    });
    
    document.getElementById('ai-generate').addEventListener('click', function() {
        playButtonSound();
        document.querySelector('.ai-generate-form').classList.remove('hidden');
        document.querySelector('.question-form').classList.add('hidden');
    });
    
    document.getElementById('cancel-question').addEventListener('click', function() {
        playButtonSound();
        document.querySelector('.question-form').classList.add('hidden');
    });
    
    document.getElementById('cancel-ai').addEventListener('click', function() {
        playButtonSound();
        document.querySelector('.ai-generate-form').classList.add('hidden');
    });
    
    document.getElementById('save-question').addEventListener('click', function() {
        playButtonSound();
        const category = document.getElementById('question-category').value;
        const level = document.getElementById('question-level').value;
        const text = document.getElementById('question-text').value.trim();
        const correctAnswer = document.getElementById('correct-answer').value;
        const explanation = document.getElementById('explanation-text').value.trim();
        
        if (!text) {
            alert('Pertanyaan tidak boleh kosong.');
            return;
        }
        
        // Get options
        const options = {};
        ['A', 'B', 'C', 'D', 'E'].forEach(opt => {
            const optionValue = document.querySelector(`.option[data-option="${opt}"]`).value.trim();
            if (optionValue) {
                options[`option${opt}`] = optionValue;
            }
        });
        
        if (Object.keys(options).length < 2) {
            alert('Minimal harus ada 2 pilihan jawaban.');
            return;
        }
        
        if (!correctAnswer || !options[`option${correctAnswer}`]) {
            alert('Pilih jawaban yang benar dari pilihan yang tersedia.');
            return;
        }
        
        // Create question object
        const question = {
            id: Date.now().toString(),
            category,
            level,
            text,
            ...options,
            correctAnswer,
            explanation,
            createdAt: new Date().toISOString()
        };
        
        // Handle image upload if any
        const imageInput = document.getElementById('question-image');
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                question.image = e.target.result;
                saveQuestion(question);
            };
            
            reader.readAsDataURL(file);
        } else {
            saveQuestion(question);
        }
    });
    
    function saveQuestion(question) {
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions.push(question);
        localStorage.setItem('questions', JSON.stringify(questions));
        
        alert('Soal berhasil disimpan!');
        document.querySelector('.question-form').classList.add('hidden');
        document.getElementById('question-form').reset();
        loadQuestionsData();
    }
    
    document.getElementById('generate-questions').addEventListener('click', function() {
        playButtonSound();
        const prompt = document.getElementById('ai-prompt').value.trim();
        const apiKey = document.getElementById('ai-api-key').value.trim();
        
        if (!prompt) {
            alert('Prompt tidak boleh kosong.');
            return;
        }
        
        if (!apiKey) {
            alert('API Key tidak boleh kosong.');
            return;
        }
        
        // Here you would call your AI API
        // This is just a placeholder - you'll need to replace with actual API call
        alert('Fitur ini membutuhkan integrasi dengan API AI. Silakan hubungi developer untuk implementasi lebih lanjut.');
        
        // Example of how it might work:
        /*
        fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `Buatkan soal pilihan ganda dengan format: Pertanyaan: ...\nA. ...\nB. ...\nC. ...\nD. ...\nJawaban benar: ...\nPenjelasan: ...\n\n${prompt}`,
                max_tokens: 1000,
                temperature: 0.7
            })
        })
        .then(response => response.json())
        .then(data => {
            // Parse the response and extract questions
            // This would require custom parsing based on how the AI formats the response
            console.log(data);
            alert('Soal berhasil digenerate! Silakan review dan simpan.');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menggenerate soal.');
        });
        */
    });
    
    // Handle settings changes
    document.getElementById('save-settings').addEventListener('click', function() {
        playButtonSound();
        settings.greetingText = document.getElementById('greeting-setting').value;
        settings.termsText = document.getElementById('terms-setting').value;
        settings.infoText = document.getElementById('info-setting').value;
        settings.periodicInfo = document.getElementById('periodic-info-setting').value;
        settings.chairmanName = document.getElementById('chairman-setting').value;
        
        saveSettings();
        updateUI();
        alert('Pengaturan berhasil disimpan!');
    });
    
    document.getElementById('save-exam-settings').addEventListener('click', function() {
        playButtonSound();
        settings.examTimer = parseInt(document.getElementById('exam-timer').value);
        settings.questionCount = parseInt(document.getElementById('question-count').value);
        settings.pointValue = parseInt(document.getElementById('point-value').value);
        settings.randomizeQuestions = document.getElementById('randomize-questions').checked;
        
        // Update enabled categories
        for (const category in settings.enabledCategories) {
            const checkbox = document.getElementById(`enable-${category.toLowerCase().replace('_', '-')}`);
            if (checkbox) {
                settings.enabledCategories[category] = checkbox.checked;
            }
        }
        
        saveSettings();
        alert('Pengaturan ujian berhasil disimpan!');
    });
    
    document.getElementById('save-messages').addEventListener('click', function() {
        playButtonSound();
        settings.motivationalMessages.excellent = document.getElementById('excellent-message').value;
        settings.motivationalMessages.good = document.getElementById('good-message').value;
        settings.motivationalMessages.average = document.getElementById('average-message').value;
        settings.motivationalMessages.poor = document.getElementById('poor-message').value;
        
        saveSettings();
        alert('Pesan motivasi berhasil disimpan!');
    });
    
    // Handle participants export
    document.getElementById('export-participants').addEventListener('click', function() {
        playButtonSound();
        const exportOptions = document.querySelector('.export-options');
        exportOptions.classList.toggle('hidden');
    });
    
    document.querySelectorAll('.export-options button').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            const format = this.dataset.format;
            exportParticipantsData(format);
        });
    });
    
    // Close admin panel
    document.getElementById('close-admin').addEventListener('click', function() {
        playButtonSound();
        adminPanel.classList.add('animate__fadeOut');
        setTimeout(() => {
            adminPanel.classList.add('hidden');
        }, 500);
    });
}

function loadParticipantsData() {
    const participants = JSON.parse(localStorage.getItem('participants')) || [];
    const results = JSON.parse(localStorage.getItem('examResults')) || [];
    
    const tableBody = document.querySelector('#participants-table tbody');
    tableBody.innerHTML = '';
    
    participants.forEach((participant, index) => {
        const result = results.find(r => r.participant.fullname === participant.fullname && r.participant.timestamp === participant.timestamp);
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${participant.fullname}</td>
            <td>${participant.status}</td>
            <td>${participant.purpose}</td>
            <td>${new Date(participant.timestamp).toLocaleDateString('id-ID')}</td>
            <td>${result ? result.score + '%' : '-'}</td>
            <td>${result ? '<i class="fas fa-certificate"></i>' : '-'}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

function loadQuestionsData() {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    
    const tableBody = document.querySelector('#questions-table tbody');
    tableBody.innerHTML = '';
    
    questions.forEach((question, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${question.text.length > 50 ? question.text.substring(0, 50) + '...' : question.text}</td>
            <td>${question.category}</td>
            <td>${question.level}</td>
            <td class="action-buttons">
                <button class="action-btn edit-btn" data-id="${question.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete-btn" data-id="${question.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            const questionId = this.dataset.id;
            editQuestion(questionId);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            const questionId = this.dataset.id;
            if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
                deleteQuestion(questionId);
            }
        });
    });
}

function editQuestion(questionId) {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    // Fill the form with question data
    document.getElementById('question-category').value = question.category;
    document.getElementById('question-level').value = question.level;
    document.getElementById('question-text').value = question.text;
    
    ['A', 'B', 'C', 'D', 'E'].forEach(opt => {
        if (question[`option${opt}`]) {
            document.querySelector(`.option[data-option="${opt}"]`).value = question[`option${opt}`];
        }
    });
    
    document.getElementById('correct-answer').value = question.correctAnswer;
    document.getElementById('explanation-text').value = question.explanation || '';
    
    // Show the form
    document.querySelector('.question-form').classList.remove('hidden');
    
    // Change save button behavior to update instead of create
    const saveBtn = document.getElementById('save-question');
    saveBtn.textContent = 'Update Soal';
    saveBtn.onclick = function() {
        playButtonSound();
        
        // Update question data
        question.category = document.getElementById('question-category').value;
        question.level = document.getElementById('question-level').value;
        question.text = document.getElementById('question-text').value.trim();
        question.correctAnswer = document.getElementById('correct-answer').value;
        question.explanation = document.getElementById('explanation-text').value.trim();
        
        // Update options
        ['A', 'B', 'C', 'D', 'E'].forEach(opt => {
            const optionValue = document.querySelector(`.option[data-option="${opt}"]`).value.trim();
            if (optionValue) {
                question[`option${opt}`] = optionValue;
            } else {
                delete question[`option${opt}`];
            }
        });
        
        // Handle image upload if any
        const imageInput = document.getElementById('question-image');
        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                question.image = e.target.result;
                updateQuestion(question);
            };
            
            reader.readAsDataURL(file);
        } else {
            updateQuestion(question);
        }
    };
}

function updateQuestion(updatedQuestion) {
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions = questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q);
    localStorage.setItem('questions', JSON.stringify(questions));
    
    alert('Soal berhasil diperbarui!');
    document.querySelector('.question-form').classList.add('hidden');
    document.getElementById('question-form').reset();
    loadQuestionsData();
    
    // Reset save button behavior
    const saveBtn = document.getElementById('save-question');
    saveBtn.textContent = 'Simpan Soal';
    saveBtn.onclick = function() {
        // Original save functionality
    };
}

function deleteQuestion(questionId) {
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions = questions.filter(q => q.id !== questionId);
    localStorage.setItem('questions', JSON.stringify(questions));
    
    loadQuestionsData();
}

function exportParticipantsData(format) {
    const participants = JSON.parse(localStorage.getItem('participants')) || [];
    const results = JSON.parse(localStorage.getItem('examResults')) || [];
    
    if (participants.length === 0) {
        alert('Tidak ada data peserta yang bisa diexport.');
        return;
    }
    
    // Combine participant data with their results
    const data = participants.map(participant => {
        const result = results.find(r => r.participant.fullname === participant.fullname && r.participant.timestamp === participant.timestamp);
        return {
            ...participant,
            result: result || null
        };
    });
    
    switch (format) {
        case 'excel':
            exportToExcel(data);
            break;
        case 'csv':
            exportToCSV(data);
            break;
        case 'pdf':
            exportToPDF(data);
            break;
        case 'print':
            printData(data);
            break;
    }
}

function exportToExcel(data) {
    // This would require a library like SheetJS
    alert('Fitur export Excel membutuhkan integrasi dengan library SheetJS. Silakan hubungi developer untuk implementasi lebih lanjut.');
}

function exportToCSV(data) {
    let csv = 'Nama,Status,Tujuan,Tanggal,Sekolah/NIS/WA/Email,Score,Jawaban Benar,Jawaban Salah,Tidak Dijawab\n';
    
    data.forEach(item => {
        const row = [
            `"${item.fullname}"`,
            item.status,
            item.purpose,
            new Date(item.timestamp).toLocaleDateString('id-ID'),
            item.status === 'pelajar' ? `${item.school} (${item.studentId})` : `${item.whatsapp} / ${item.email}`,
            item.result ? item.result.score + '%' : '-',
            item.result ? item.result.correctAnswers : '-',
            item.result ? item.result.wrongAnswers : '-',
            item.result ? item.result.unanswered : '-'
        ];
        
        csv += row.join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `peserta-ujian-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
}

function exportToPDF(data) {
    // This would require a library like jsPDF
    alert('Fitur export PDF membutuhkan integrasi dengan library jsPDF. Silakan hubungi developer untuk implementasi lebih lanjut.');
}

function printData(data) {
    let printContent = `
        <h1>Data Peserta Ujian</h1>
        <p>Total: ${data.length} peserta</p>
        <table border="1" cellpadding="5" cellspacing="0" style="width:100%;border-collapse:collapse;">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Status</th>
                    <th>Tujuan</th>
                    <th>Tanggal</th>
                    <th>Detail</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.forEach((item, index) => {
        printContent += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.fullname}</td>
                <td>${item.status}</td>
                <td>${item.purpose}</td>
                <td>${new Date(item.timestamp).toLocaleDateString('id-ID')}</td>
                <td>${item.status === 'pelajar' ? `${item.school} (${item.studentId})` : `${item.whatsapp} / ${item.email}`}</td>
                <td>${item.result ? item.result.score + '%' : '-'}</td>
            </tr>
        `;
    });
    
    printContent += `
            </tbody>
        </table>
        <p style="text-align:right;margin-top:20px;">Dicetak pada: ${new Date().toLocaleString('id-ID')}</p>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Data Peserta Ujian</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                </style>
            </head>
            <body>
                ${printContent}
                <script>
                    window.onload = function() {
                        window.print();
                        window.close();
                    };
                </script>
            </body>
        </html>
    `);
}
