// Admin Panel functionality
function initializeAdminPanel() {
    // Setup tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.dataset.tab + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Load current codes
    document.getElementById('current-login-code').value = localStorage.getItem('loginCode') || '12345';
    document.getElementById('current-exam-code').value = localStorage.getItem('examCode') || 'OPENLOCK-1945';
    document.getElementById('current-question-code').value = localStorage.getItem('questionCode') || 'OPENLOCK-1926';
    document.getElementById('current-admin-code').value = localStorage.getItem('adminCode') || '65614222';
    
    // Setup code saving
    document.getElementById('save-login-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-login-code').value.trim();
        if (newCode) {
            localStorage.setItem('loginCode', newCode);
            document.getElementById('current-login-code').value = newCode;
            document.getElementById('new-login-code').value = '';
            alert('Kode login berhasil diperbarui');
        }
    });
    
    document.getElementById('save-exam-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-exam-code').value.trim();
        if (newCode) {
            localStorage.setItem('examCode', newCode);
            document.getElementById('current-exam-code').value = newCode;
            document.getElementById('new-exam-code').value = '';
            alert('Kode ujian CPNS berhasil diperbarui');
        }
    });
    
    document.getElementById('save-question-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-question-code').value.trim();
        if (newCode) {
            localStorage.setItem('questionCode', newCode);
            document.getElementById('current-question-code').value = newCode;
            document.getElementById('new-question-code').value = '';
            alert('Kode bank soal berhasil diperbarui');
        }
    });
    
    document.getElementById('save-admin-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-admin-code').value.trim();
        if (newCode) {
            localStorage.setItem('adminCode', newCode);
            document.getElementById('current-admin-code').value = newCode;
            document.getElementById('new-admin-code').value = '';
            alert('Kode admin berhasil diperbarui');
        }
    });
    
    // Load settings
    document.getElementById('exam-timer').value = localStorage.getItem('examTimer') || '120';
    document.getElementById('chairman-name').value = localStorage.getItem('chairmanName') || 'Moh. Nuril Hudha, S.Pd., M.Si.';
    document.getElementById('greeting-text-input').value = localStorage.getItem('greetingText') || 'Hai Peserta Ujian, silakan masukkan kode login untuk memulai';
    document.getElementById('periodic-info-input').value = localStorage.getItem('periodicInfo') || 'Informasi berkala akan ditampilkan di sini. Admin dapat mengedit informasi ini melalui kontrol panel.';
    document.getElementById('question-point').value = localStorage.getItem('questionPoint') || '1';
    document.getElementById('question-count').value = localStorage.getItem('questionCount') || '10';
    document.getElementById('randomize-questions').checked = localStorage.getItem('randomizeQuestions') !== 'false';
    
    // Load motivation messages
    const motivationMessages = JSON.parse(localStorage.getItem('motivationMessages')) || [
        { minScore: 0, maxScore: 50, message: 'Terus berusaha dan tingkatkan lagi pemahaman Anda. Setiap kegagalan adalah langkah menuju kesuksesan.' },
        { minScore: 51, maxScore: 70, message: 'Hasil yang cukup baik. Pertahankan dan terus tingkatkan kemampuan Anda.' },
        { minScore: 71, maxScore: 85, message: 'Hasil yang sangat baik! Anda telah menguasai sebagian besar materi.' },
        { minScore: 86, maxScore: 100, message: 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.' }
    ];
    
    updateMotivationMessages(motivationMessages);
    
    // Add motivation message button
    document.getElementById('add-motivation-btn').addEventListener('click', function() {
        const minScore = prompt('Masukkan skor minimum:');
        if (!minScore) return;
        
        const maxScore = prompt('Masukkan skor maksimum:');
        if (!maxScore) return;
        
        const message = prompt('Masukkan pesan motivasi:');
        if (!message) return;
        
        motivationMessages.push({
            minScore: parseInt(minScore),
            maxScore: parseInt(maxScore),
            message: message
        });
        
        localStorage.setItem('motivationMessages', JSON.stringify(motivationMessages));
        updateMotivationMessages(motivationMessages);
    });
    
    // Load exam types checkboxes
    const examTypes = [
        { id: 'AGAMA', name: 'AGAMA', enabled: localStorage.getItem('examType_AGAMA') !== 'false' },
        { id: 'PPKN', name: 'PPKN', enabled: localStorage.getItem('examType_PPKN') !== 'false' },
        { id: 'SEJARAH', name: 'SEJARAH', enabled: localStorage.getItem('examType_SEJARAH') !== 'false' },
        { id: 'IPA', name: 'IPA', enabled: localStorage.getItem('examType_IPA') !== 'false' },
        { id: 'IPS', name: 'IPS', enabled: localStorage.getItem('examType_IPS') !== 'false' },
        { id: 'MATEMATIKA', name: 'MATEMATIKA', enabled: localStorage.getItem('examType_MATEMATIKA') !== 'false' },
        { id: 'BAHASA-INDONESIA', name: 'BAHASA INDONESIA', enabled: localStorage.getItem('examType_BAHASA-INDONESIA') !== 'false' },
        { id: 'BAHASA-INGGRIS', name: 'BAHASA INGGRIS', enabled: localStorage.getItem('examType_BAHASA-INGGRIS') !== 'false' },
        { id: 'MATERI-EXTRA', name: 'MATERI EXTRA', enabled: localStorage.getItem('examType_MATERI-EXTRA') !== 'false' },
        { id: 'MATERI-KHUSUS', name: 'MATERI KHUSUS', enabled: localStorage.getItem('examType_MATERI-KHUSUS') !== 'false' },
        { id: 'UJIAN-LOGIKA', name: 'UJIAN LOGIKA', enabled: localStorage.getItem('examType_UJIAN-LOGIKA') !== 'false' },
        { id: 'UJIAN-CPNS', name: 'UJIAN CPNS/P3K', enabled: localStorage.getItem('examType_UJIAN-CPNS') !== 'false' }
    ];
    
    updateExamTypesCheckboxes(examTypes);
    
    // Save settings button
    document.getElementById('save-settings').addEventListener('click', function() {
        localStorage.setItem('examTimer', document.getElementById('exam-timer').value);
        localStorage.setItem('chairmanName', document.getElementById('chairman-name').value);
        localStorage.setItem('greetingText', document.getElementById('greeting-text-input').value);
        localStorage.setItem('periodicInfo', document.getElementById('periodic-info-input').value);
        localStorage.setItem('questionPoint', document.getElementById('question-point').value);
        localStorage.setItem('questionCount', document.getElementById('question-count').value);
        localStorage.setItem('randomizeQuestions', document.getElementById('randomize-questions').checked);
        
        // Save exam types
        examTypes.forEach(type => {
            const checkbox = document.getElementById(`exam-type-${type.id}`);
            localStorage.setItem(`examType_${type.id}`, checkbox.checked);
        });
        
        alert('Pengaturan berhasil disimpan');
    });
    
    // Load participants data
    loadParticipantsData();
    
    // Export participants button
    document.getElementById('export-participants').addEventListener('click', function() {
        exportParticipantsData();
    });
    
    // Exit admin button
    document.getElementById('exit-admin').addEventListener('click', function() {
        showScreen('opening-screen');
    });
}

function updateMotivationMessages(messages) {
    const container = document.getElementById('motivation-messages');
    container.innerHTML = '';
    
    messages.sort((a, b) => a.minScore - b.minScore).forEach((msg, index) => {
        const div = document.createElement('div');
        div.className = 'motivation-message';
        div.innerHTML = `
            <p><strong>${msg.minScore}-${msg.maxScore}:</strong> ${msg.message}</p>
            <button class="btn-small delete-motivation" data-index="${index}">Hapus</button>
        `;
        container.appendChild(div);
    });
    
    // Add delete event listeners
    document.querySelectorAll('.delete-motivation').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const messages = JSON.parse(localStorage.getItem('motivationMessages'));
            
            if (confirm('Apakah Anda yakin ingin menghapus pesan motivasi ini?')) {
                messages.splice(index, 1);
                localStorage.setItem('motivationMessages', JSON.stringify(messages));
                updateMotivationMessages(messages);
            }
        });
    });
}

function updateExamTypesCheckboxes(examTypes) {
    const container = document.querySelector('.exam-types-checkboxes');
    container.innerHTML = '';
    
    examTypes.forEach(type => {
        const div = document.createElement('div');
        div.className = 'exam-type-checkbox';
        div.innerHTML = `
            <input type="checkbox" id="exam-type-${type.id}" ${type.enabled ? 'checked' : ''}>
            <label for="exam-type-${type.id}">${type.name}</label>
        `;
        container.appendChild(div);
    });
}

function loadParticipantsData() {
    const examHistory = JSON.parse(localStorage.getItem('examHistory')) || [];
    const participantsList = document.getElementById('participants-list');
    participantsList.innerHTML = '';
    
    examHistory.forEach((exam, index) => {
        const tr = document.createElement('tr');
        
        let examName = '';
        if (exam.exam.type === 'pelajar') {
            examName = `${exam.exam.subject} (${exam.exam.schoolLevel})`;
        } else {
            examName = exam.exam.examType === 'tes-iq' ? 'Tes IQ' : 'Ujian CPNS/P3K';
        }
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${exam.participant.fullname}</td>
            <td>${exam.participant.status}</td>
            <td>${exam.exam.type === 'pelajar' ? exam.exam.schoolLevel : 'Umum'}</td>
            <td>${examName}</td>
            <td>${exam.results.score}</td>
            <td>${new Date(exam.timestamp).toLocaleDateString('id-ID')}</td>
        `;
        
        participantsList.appendChild(tr);
    });
}

function exportParticipantsData() {
    const examHistory = JSON.parse(localStorage.getItem('examHistory')) || [];
    const format = document.getElementById('export-format').value;
    
    if (examHistory.length === 0) {
        alert('Tidak ada data peserta yang dapat diexport');
        return;
    }
    
    let data, mimeType, fileName;
    
    if (format === 'excel' || format === 'csv') {
        // Convert to CSV
        const headers = ['No', 'Nama', 'Status', 'Kategori', 'Ujian', 'Nilai', 'Tanggal'];
        const rows = examHistory.map((exam, index) => {
            let examName = '';
            if (exam.exam.type === 'pelajar') {
                examName = `${exam.exam.subject} (${exam.exam.schoolLevel})`;
            } else {
                examName = exam.exam.examType === 'tes-iq' ? 'Tes IQ' : 'Ujian CPNS/P3K';
            }
            
            return [
                index + 1,
                exam.participant.fullname,
                exam.participant.status,
                exam.exam.type === 'pelajar' ? exam.exam.schoolLevel : 'Umum',
                examName,
                exam.results.score,
                new Date(exam.timestamp).toLocaleDateString('id-ID')
            ];
        });
        
        // Convert to CSV string
        let csv = headers.join(',') + '\n';
        rows.forEach(row => {
            csv += row.map(field => `"${field}"`).join(',') + '\n';
        });
        
        if (format === 'excel') {
            // For Excel, we can use CSV with .xls extension (simplified)
            data = csv;
            mimeType = 'application/vnd.ms-excel';
            fileName = 'peserta_ujian.xls';
        } else {
            data = csv;
            mimeType = 'text/csv';
            fileName = 'peserta_ujian.csv';
        }
    } else {
        // JSON format
        data = JSON.stringify(examHistory, null, 2);
        mimeType = 'application/json';
        fileName = 'peserta_ujian.json';
    }
    
    // Create download link
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Question Bank functionality
function initializeQuestionBank() {
    // Setup tabs
    const bankTabButtons = document.querySelectorAll('.bank-tab-btn');
    
    bankTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            bankTabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.bank-tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.dataset.bankTab + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Setup methods (manual/AI)
    const methodButtons = document.querySelectorAll('.method-btn');
    
    methodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and forms
            methodButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.add-question-form').forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked button and corresponding form
            this.classList.add('active');
            const method = this.dataset.method;
            document.querySelector(`.${method}-method`).classList.add('active');
        });
    });
    
    // Save question button
    document.getElementById('save-question').addEventListener('click', function() {
        saveQuestion();
    });
    
    // Reset question button
    document.getElementById('reset-question').addEventListener('click', function() {
        document.getElementById('question-form').reset();
    });
    
    // Generate question button (AI)
    document.getElementById('generate-question').addEventListener('click', function() {
        generateAIQuestion();
    });
    
    // Load questions for edit tab
    loadQuestionsForEdit();
    
    // Load questions for preview tab
    loadQuestionsForPreview();
    
    // Exit question bank button
    document.getElementById('exit-question-bank').addEventListener('click', function() {
        showScreen('opening-screen');
    });
}

function saveQuestion() {
    const category = document.getElementById('question-category').value;
    const questionText = document.getElementById('question-text').value.trim();
    const answerA = document.getElementById('answer-a').value.trim();
    const answerB = document.getElementById('answer-b').value.trim();
    const answerC = document.getElementById('answer-c').value.trim();
    const answerD = document.getElementById('answer-d').value.trim();
    const answerE = document.getElementById('answer-e').value.trim();
    const correctAnswer = document.querySelector('input[name="correct-answer"]:checked').value;
    const explanation = document.getElementById('explanation').value.trim();
    
    // Validate inputs
    if (!questionText || !answerA || !answerB || !answerC || !answerD || !answerE || !explanation) {
        alert('Semua field harus diisi');
        return;
    }
    
    // Get image file (simplified - in real app would upload to server)
    const imageFile = document.getElementById('question-image').files[0];
    let imageData = null;
    
    if (imageFile) {
        // In a real app, you would upload the image and save the URL
        // For demo, we'll just store the file name
        imageData = imageFile.name;
    }
    
    // Create question object
    const question = {
        id: Date.now().toString(),
        type: category === 'UJIAN-LOGIKA' || category === 'UJIAN-CPNS' ? 'umum' : 'pelajar',
        category: category,
        examType: category === 'UJIAN-LOGIKA' ? 'tes-iq' : (category === 'UJIAN-CPNS' ? 'ujian-cpns' : null),
        question: questionText,
        options: {
            A: answerA,
            B: answerB,
            C: answerC,
            D: answerD,
            E: answerE
        },
        correctAnswer: correctAnswer,
        explanation: explanation,
        image: imageData
    };
    
    // Save to question bank
    let questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
    questionBank.push(question);
    localStorage.setItem('questionBank', JSON.stringify(questionBank));
    
    alert('Soal berhasil disimpan');
    document.getElementById('question-form').reset();
    
    // Reload questions for edit and preview tabs
    loadQuestionsForEdit();
    loadQuestionsForPreview();
}

function generateAIQuestion() {
    const category = document.getElementById('ai-category').value;
    const prompt = document.getElementById('ai-prompt').value.trim();
    
    if (!prompt) {
        alert('Silakan masukkan prompt untuk AI');
        return;
    }
    
    // In a real app, this would call an AI API
    // For demo, we'll simulate with a timeout
    document.getElementById('generate-question').disabled = true;
    document.getElementById('generate-question').textContent = 'Generating...';
    
    setTimeout(() => {
        // Simulated AI response
        const aiResponse = simulateAIResponse(category, prompt);
        
        // Display in AI result div
        const aiResult = document.getElementById('ai-result');
        aiResult.innerHTML = `
            <h4>Hasil Generate:</h4>
            <p><strong>Soal:</strong> ${aiResponse.question}</p>
            <p><strong>Jawaban:</strong></p>
            <ul>
                <li>A. ${aiResponse.options.A}</li>
                <li>B. ${aiResponse.options.B}</li>
                <li>C. ${aiResponse.options.C}</li>
                <li>D. ${aiResponse.options.D}</li>
                <li>E. ${aiResponse.options.E}</li>
            </ul>
            <p><strong>Jawaban Benar:</strong> ${aiResponse.correctAnswer}</p>
            <p><strong>Penjelasan:</strong> ${aiResponse.explanation}</p>
            <button id="use-ai-question" class="btn-small">Gunakan Soal Ini</button>
        `;
        
        // Add event listener to use this question
        document.getElementById('use-ai-question').addEventListener('click', function() {
            useAIQuestion(aiResponse);
            aiResult.innerHTML = '';
        });
        
        document.getElementById('generate-question').disabled = false;
        document.getElementById('generate-question').textContent = 'Generate Soal';
    }, 2000);
}

function simulateAIResponse(category, prompt) {
    // This is a simplified simulation - in a real app, you would call an AI API
    const responses = {
        AGAMA: {
            question: 'Apa hukum shalat Jumat bagi laki-laki muslim?',
            options: {
                A: 'Sunnah',
                B: 'Wajib',
                C: 'Makruh',
                D: 'Mubah',
                E: 'Haram'
            },
            correctAnswer: 'B',
            explanation: 'Shalat Jumat hukumnya wajib bagi laki-laki muslim yang sudah baligh, berakal, merdeka, dan tidak memiliki uzur syar\'i.'
        },
        PPKN: {
            question: 'Apa bunyi sila pertama Pancasila?',
            options: {
                A: 'Kemanusiaan yang adil dan beradab',
                B: 'Persatuan Indonesia',
                C: 'Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan',
                D: 'Ketuhanan Yang Maha Esa',
                E: 'Keadilan sosial bagi seluruh rakyat Indonesia'
            },
            correctAnswer: 'D',
            explanation: 'Sila pertama Pancasila adalah "Ketuhanan Yang Maha Esa" yang menunjukkan bahwa Indonesia mengakui keberadaan Tuhan dan kebebasan beragama.'
        },
        // Add more sample responses for other categories
    };
    
    // Return specific response if available for category, otherwise generic response
    return responses[category] || {
        question: prompt + ' (Contoh soal hasil generate)',
        options: {
            A: 'Jawaban A',
            B: 'Jawaban B',
            C: 'Jawaban C',
            D: 'Jawaban D',
            E: 'Jawaban E'
        },
        correctAnswer: 'C',
        explanation: 'Ini adalah contoh penjelasan untuk jawaban yang benar.'
    };
}

function useAIQuestion(aiResponse) {
    // Populate manual form with AI generated question
    document.getElementById('question-category').value = document.getElementById('ai-category').value;
    document.getElementById('question-text').value = aiResponse.question;
    document.getElementById('answer-a').value = aiResponse.options.A;
    document.getElementById('answer-b').value = aiResponse.options.B;
    document.getElementById('answer-c').value = aiResponse.options.C;
    document.getElementById('answer-d').value = aiResponse.options.D;
    document.getElementById('answer-e').value = aiResponse.options.E;
    document.querySelector(`input[name="correct-answer"][value="${aiResponse.correctAnswer}"]`).checked = true;
    document.getElementById('explanation').value = aiResponse.explanation;
    
    // Switch to manual method
    document.querySelector('.method-btn[data-method="manual"]').click();
}

function loadQuestionsForEdit() {
    const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
    const editCategory = document.getElementById('edit-category');
    const questionsList = document.getElementById('questions-list');
    
    questionsList.innerHTML = '';
    
    // Filter questions by selected category
    const category = editCategory.value;
    const filteredQuestions = category === 'all' ? questionBank : questionBank.filter(q => q.category === category);
    
    if (filteredQuestions.length === 0) {
        questionsList.innerHTML = '<p>Tidak ada soal yang tersedia untuk kategori ini.</p>';
        return;
    }
    
    filteredQuestions.forEach(question => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.innerHTML = `
            <div class="question-item-header">
                <span class="question-item-category">${question.category}</span>
                <div class="question-item-actions">
                    <button class="edit-question-btn" data-id="${question.id}">Edit</button>
                    <button class="delete-question-btn" data-id="${question.id}">Hapus</button>
                </div>
            </div>
            <p>${question.question}</p>
        `;
        questionsList.appendChild(questionItem);
    });
    
    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-question-btn').forEach(button => {
        button.addEventListener('click', function() {
            const questionId = this.dataset.id;
            editQuestion(questionId);
        });
    });
    
    document.querySelectorAll('.delete-question-btn').forEach(button => {
        button.addEventListener('click', function() {
            const questionId = this.dataset.id;
            deleteQuestion(questionId);
        });
    });
    
    // Handle category filter change
    editCategory.addEventListener('change', loadQuestionsForEdit);
}

function editQuestion(questionId) {
    const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
    const question = questionBank.find(q => q.id === questionId);
    
    if (!question) {
        alert('Soal tidak ditemukan');
        return;
    }
    
    // Populate form with question data
    document.getElementById('question-category').value = question.category;
    document.getElementById('question-text').value = question.question;
    document.getElementById('answer-a').value = question.options.A;
    document.getElementById('answer-b').value = question.options.B;
    document.getElementById('answer-c').value = question.options.C;
    document.getElementById('answer-d').value = question.options.D;
    document.getElementById('answer-e').value = question.options.E;
    document.querySelector(`input[name="correct-answer"][value="${question.correctAnswer}"]`).checked = true;
    document.getElementById('explanation').value = question.explanation;
    
    // Switch to manual method and add question tab
    document.querySelector('.method-btn[data-method="manual"]').click();
    document.querySelector('.bank-tab-btn[data-bank-tab="add-question"]').click();
    
    // Scroll to form
    document.getElementById('question-text').scrollIntoView();
}

function deleteQuestion(questionId) {
    if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        let questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
        questionBank = questionBank.filter(q => q.id !== questionId);
        localStorage.setItem('questionBank', JSON.stringify(questionBank));
        loadQuestionsForEdit();
        loadQuestionsForPreview();
    }
}

function loadQuestionsForPreview() {
    const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
    const previewCategory = document.getElementById('preview-category');
    const previewContainer = document.getElementById('preview-container');
    
    previewContainer.innerHTML = '';
    
    // Filter questions by selected category
    const category = previewCategory.value;
    const filteredQuestions = category === 'all' ? questionBank : questionBank.filter(q => q.category === category);
    
    if (filteredQuestions.length === 0) {
        previewContainer.innerHTML = '<p>Tidak ada soal yang tersedia untuk kategori ini.</p>';
        return;
    }
    
    filteredQuestions.forEach((question, index) => {
        const previewQuestion = document.createElement('div');
        previewQuestion.className = 'preview-question';
        previewQuestion.innerHTML = `
            <h4>Soal #${index + 1} (${question.category})</h4>
            <p>${question.question}</p>
            <ul>
                <li>A. ${question.options.A}</li>
                <li>B. ${question.options.B}</li>
                <li>C. ${question.options.C}</li>
                <li>D. ${question.options.D}</li>
                <li>E. ${question.options.E}</li>
            </ul>
            <p><strong>Jawaban Benar:</strong> ${question.correctAnswer}</p>
            <p><strong>Penjelasan:</strong> ${question.explanation}</p>
            <hr>
        `;
        previewContainer.appendChild(previewQuestion);
    });
    
    // Handle category filter change
    previewCategory.addEventListener('change', loadQuestionsForPreview);
}
