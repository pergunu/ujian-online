document.addEventListener('DOMContentLoaded', function() {
    // Only run this script on the admin panel
    if (!document.getElementById('admin-screen')) return;
    
    // Initialize admin panel
    function initAdminPanel() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                document.querySelectorAll('.tab-btn').forEach(t => {
                    t.classList.remove('active');
                });
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all tab contents
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show selected tab content
                const tabId = tab.getAttribute('data-tab');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
        
        // Code saving
        document.getElementById('save-login-code').addEventListener('click', () => {
            const newCode = document.getElementById('new-login-code').value;
            const oldCode = document.getElementById('current-login-code').value;
            
            if (newCode && oldCode === defaultSettings.loginCode) {
                defaultSettings.loginCode = newCode;
                saveSettings();
                alert('Kode login berhasil diubah!');
                document.getElementById('current-login-code').value = newCode;
                document.getElementById('new-login-code').value = '';
            } else {
                alert('Kode lama salah atau kode baru kosong!');
            }
        });
        
        document.getElementById('save-cpns-code').addEventListener('click', () => {
            const newCode = document.getElementById('new-cpns-code').value;
            const oldCode = document.getElementById('current-cpns-code').value;
            
            if (newCode && oldCode === defaultSettings.cpnsCode) {
                defaultSettings.cpnsCode = newCode;
                saveSettings();
                alert('Kode ujian CPNS/P3K berhasil diubah!');
                document.getElementById('current-cpns-code').value = newCode;
                document.getElementById('new-cpns-code').value = '';
            } else {
                alert('Kode lama salah atau kode baru kosong!');
            }
        });
        
        document.getElementById('save-bank-code').addEventListener('click', () => {
            const newCode = document.getElementById('new-bank-code').value;
            const oldCode = document.getElementById('current-bank-code').value;
            
            if (newCode && oldCode === defaultSettings.bankCode) {
                defaultSettings.bankCode = newCode;
                saveSettings();
                alert('Kode bank soal berhasil diubah!');
                document.getElementById('current-bank-code').value = newCode;
                document.getElementById('new-bank-code').value = '';
            } else {
                alert('Kode lama salah atau kode baru kosong!');
            }
        });
        
        document.getElementById('save-admin-code').addEventListener('click', () => {
            const newCode = document.getElementById('new-admin-code').value;
            const oldCode = document.getElementById('current-admin-code').value;
            
            if (newCode && oldCode === defaultSettings.adminCode) {
                defaultSettings.adminCode = newCode;
                saveSettings();
                alert('Kode admin berhasil diubah!');
                document.getElementById('current-admin-code').value = newCode;
                document.getElementById('new-admin-code').value = '';
            } else {
                alert('Kode lama salah atau kode baru kosong!');
            }
        });
        
        // Question bank
        document.getElementById('add-question-btn').addEventListener('click', () => {
            document.getElementById('question-form').style.display = 'block';
            document.getElementById('ai-form').style.display = 'none';
            clearQuestionForm();
        });
        
        document.getElementById('ai-question-btn').addEventListener('click', () => {
            document.getElementById('question-form').style.display = 'none';
            document.getElementById('ai-form').style.display = 'block';
            clearQuestionForm();
        });
        
        document.getElementById('save-question-btn').addEventListener('click', saveQuestion);
        document.getElementById('clear-question-btn').addEventListener('click', clearQuestionForm);
        document.getElementById('generate-ai-btn').addEventListener('click', generateAIQuestion);
        document.getElementById('cancel-ai-btn').addEventListener('click', () => {
            document.getElementById('ai-form').style.display = 'none';
        });
        
        // Settings
        document.querySelectorAll('.save-setting').forEach(btn => {
            btn.addEventListener('click', saveSetting);
        });
        
        document.getElementById('save-motivations-btn').addEventListener('click', saveMotivations);
        document.getElementById('add-motivation-btn').addEventListener('click', addMotivation);
        
        document.querySelectorAll('.delete-motivation').forEach(btn => {
            btn.addEventListener('click', deleteMotivation);
        });
        
        document.getElementById('save-exam-toggles').addEventListener('click', saveExamToggles);
        
        // Participants
        document.getElementById('export-participants-btn').addEventListener('click', exportParticipants);
        
        // Load initial data
        loadQuestions();
        loadParticipants();
        loadSettingsForm();
    }
    
    // Clear question form
    function clearQuestionForm() {
        document.getElementById('question-text').value = '';
        document.getElementById('question-image').value = '';
        document.getElementById('explanation').value = '';
        
        document.querySelectorAll('.option-text').forEach(input => {
            input.value = '';
        });
        
        document.querySelector('input[name="correct-answer"][value="a"]').checked = true;
    }
    
    // Save question
    function saveQuestion() {
        const subject = document.getElementById('question-subject').value;
        const questionText = document.getElementById('question-text').value.trim();
        const explanation = document.getElementById('explanation').value.trim();
        
        // Get options
        const options = {};
        document.querySelectorAll('.option-text').forEach(input => {
            const option = input.getAttribute('data-option');
            options[option] = input.value.trim();
        });
        
        // Get correct answer
        const correctAnswer = document.querySelector('input[name="correct-answer"]:checked').value;
        
        // Validate
        if (!questionText) {
            alert('Teks soal tidak boleh kosong!');
            return;
        }
        
        for (const [key, value] of Object.entries(options)) {
            if (!value) {
                alert(`Pilihan ${key.toUpperCase()} tidak boleh kosong!`);
                return;
            }
        }
        
        if (!explanation) {
            alert('Penjelasan jawaban tidak boleh kosong!');
            return;
        }
        
        // Create question object
        const question = {
            question: questionText,
            options: options,
            correctAnswer: correctAnswer,
            explanation: explanation
        };
        
        // Handle image if uploaded
        const imageInput = document.getElementById('question-image');
        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                question.image = e.target.result;
                saveQuestionToStorage(subject, question);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            saveQuestionToStorage(subject, question);
        }
    }
    
    // Save question to storage
    function saveQuestionToStorage(subject, question) {
        // Get existing questions or initialize object
        const questions = JSON.parse(localStorage.getItem('questions')) || {};
        
        // Initialize subject array if not exists
        if (!questions[subject]) {
            questions[subject] = [];
        }
        
        // Add new question
        questions[subject].push(question);
        
        // Save to localStorage
        localStorage.setItem('questions', JSON.stringify(questions));
        
        // Reload questions
        loadQuestions();
        
        // Clear form
        clearQuestionForm();
        
        alert('Soal berhasil disimpan!');
    }
    
    // Generate question with AI
    function generateAIQuestion() {
        const prompt = document.getElementById('ai-prompt').value.trim();
        const count = parseInt(document.getElementById('ai-count').value);
        
        if (!prompt) {
            alert('Prompt tidak boleh kosong!');
            return;
        }
        
        if (count < 1 || count > 10) {
            alert('Jumlah soal harus antara 1-10!');
            return;
        }
        
        // In a real implementation, you would call an AI API here
        // For demo purposes, we'll simulate a response
        alert('Fitur AI membutuhkan API Key yang valid. Silakan hubungi developer untuk mengaktifkan fitur ini.');
        
        // Example of how you would call an AI API (uncomment and replace with your API key)
        /*
        const apiKey = 'YOUR_OPENAI_API_KEY'; // You would insert your API key here
        fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'Anda adalah seorang pembuat soal ujian profesional. Buatkan soal pilihan ganda dengan 5 pilihan (A-E) beserta jawaban yang benar dan penjelasannya.'
                    },
                    {
                        role: 'user',
                        content: `Buatkan ${count} soal tentang: ${prompt}`
                    }
                ],
                temperature: 0.7
            })
        })
        .then(response => response.json())
        .then(data => {
            // Process the AI response and save questions
            console.log(data);
            // You would need to parse the response and extract questions
            alert('Soal berhasil dibuat dengan AI!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal membuat soal dengan AI: ' + error.message);
        });
        */
    }
    
    // Load questions
    function loadQuestions() {
        const questions = JSON.parse(localStorage.getItem('questions')) || {};
        const questionsList = document.getElementById('questions-list');
        
        // Clear existing list
        questionsList.innerHTML = '';
        
        // Add questions for each subject
        for (const [subject, subjectQuestions] of Object.entries(questions)) {
            const subjectHeader = document.createElement('h3');
            subjectHeader.textContent = subject.toUpperCase();
            questionsList.appendChild(subjectHeader);
            
            subjectQuestions.forEach((question, index) => {
                const questionItem = document.createElement('div');
                questionItem.className = 'question-item';
                
                const questionHeader = document.createElement('div');
                questionHeader.className = 'question-item-header';
                
                const questionTitle = document.createElement('h4');
                questionTitle.textContent = `Soal #${index + 1}: ${question.question.substring(0, 50)}${question.question.length > 50 ? '...' : ''}`;
                
                const questionActions = document.createElement('div');
                questionActions.className = 'question-item-actions';
                
                const editBtn = document.createElement('button');
                editBtn.innerHTML = '<i class="fas fa-edit"></i>';
                editBtn.title = 'Edit';
                editBtn.addEventListener('click', () => editQuestion(subject, index));
                
                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
                deleteBtn.title = 'Hapus';
                deleteBtn.addEventListener('click', () => deleteQuestion(subject, index));
                
                questionActions.appendChild(editBtn);
                questionActions.appendChild(deleteBtn);
                questionHeader.appendChild(questionTitle);
                questionHeader.appendChild(questionActions);
                
                const questionContent = document.createElement('div');
                questionContent.className = 'question-item-content';
                
                const optionsList = document.createElement('ul');
                for (const [key, value] of Object.entries(question.options)) {
                    const optionItem = document.createElement('li');
                    optionItem.innerHTML = `<strong>${key.toUpperCase()}:</strong> ${value}`;
                    
                    if (key === question.correctAnswer) {
                        optionItem.style.color = 'var(--success-color)';
                        optionItem.innerHTML += ' <i class="fas fa-check"></i>';
                    }
                    
                    optionsList.appendChild(optionItem);
                }
                
                const explanation = document.createElement('p');
                explanation.innerHTML = `<strong>Penjelasan:</strong> ${question.explanation}`;
                
                questionContent.appendChild(optionsList);
                questionContent.appendChild(explanation);
                questionItem.appendChild(questionHeader);
                questionItem.appendChild(questionContent);
                questionsList.appendChild(questionItem);
            });
        }
        
        if (questionsList.children.length === 0) {
            questionsList.innerHTML = '<p>Belum ada soal yang tersimpan.</p>';
        }
    }
    
    // Edit question
    function editQuestion(subject, index) {
        const questions = JSON.parse(localStorage.getItem('questions')) || {};
        const question = questions[subject][index];
        
        // Set form values
        document.getElementById('question-subject').value = subject;
        document.getElementById('question-text').value = question.question;
        document.getElementById('explanation').value = question.explanation;
        
        // Set options
        for (const [key, value] of Object.entries(question.options)) {
            document.querySelector(`.option-text[data-option="${key}"]`).value = value;
        }
        
        // Set correct answer
        document.querySelector(`input[name="correct-answer"][value="${question.correctAnswer}"]`).checked = true;
        
        // Show form
        document.getElementById('question-form').style.display = 'block';
        document.getElementById('ai-form').style.display = 'none';
        
        // Scroll to form
        document.getElementById('question-form').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Delete question
    function deleteQuestion(subject, index) {
        if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            const questions = JSON.parse(localStorage.getItem('questions')) || {};
            
            if (questions[subject] && questions[subject][index]) {
                questions[subject].splice(index, 1);
                
                // Remove subject if no more questions
                if (questions[subject].length === 0) {
                    delete questions[subject];
                }
                
                // Save to localStorage
                localStorage.setItem('questions', JSON.stringify(questions));
                
                // Reload questions
                loadQuestions();
                
                alert('Soal berhasil dihapus!');
            }
        }
    }
    
    // Save setting
    function saveSetting(e) {
        const setting = e.target.getAttribute('data-setting');
        let value;
        
        switch (setting) {
            case 'greeting':
                value = document.getElementById('greeting-setting').value;
                defaultSettings.greetingText = value;
                break;
            case 'info':
                value = document.getElementById('info-setting').value;
                defaultSettings.infoText = value;
                break;
            case 'chairman':
                value = document.getElementById('chairman-setting').value;
                defaultSettings.chairmanName = value;
                break;
            case 'timer':
                value = parseInt(document.getElementById('timer-setting').value);
                if (value >= 5 && value <= 300) {
                    defaultSettings.examTimer = value;
                } else {
                    alert('Timer harus antara 5-300 menit!');
                    return;
                }
                break;
            case 'question-count':
                value = parseInt(document.getElementById('question-count').value);
                if ([5, 10, 15, 20, 25, 30, 50, 100, 150].includes(value)) {
                    defaultSettings.questionCount = value;
                } else {
                    alert('Jumlah soal tidak valid!');
                    return;
                }
                break;
            case 'point':
                value = parseInt(document.getElementById('point-setting').value);
                if (value >= 1 && value <= 10) {
                    defaultSettings.pointPerQuestion = value;
                } else {
                    alert('Point harus antara 1-10!');
                    return;
                }
                break;
            case 'shuffle':
                value = document.querySelector('input[name="shuffle"]:checked').value;
                defaultSettings.shuffleQuestions = value === 'on';
                break;
        }
        
        saveSettings();
        alert('Pengaturan berhasil disimpan!');
    }
    
    // Add motivation range
    function addMotivation() {
        const motivationsContainer = document.getElementById('motivation-settings');
        
        const motivationItem = document.createElement('div');
        motivationItem.className = 'motivation-item';
        
        const rangeInput = document.createElement('input');
        rangeInput.type = 'text';
        rangeInput.className = 'motivation-range';
        rangeInput.placeholder = '0-100';
        
        const textarea = document.createElement('textarea');
        textarea.className = 'motivation-text';
        textarea.placeholder = 'Teks motivasi...';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-small delete-motivation';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', deleteMotivation);
        
        motivationItem.appendChild(rangeInput);
        motivationItem.appendChild(textarea);
        motivationItem.appendChild(deleteBtn);
        motivationsContainer.appendChild(motivationItem);
    }
    
    // Delete motivation range
    function deleteMotivation(e) {
        if (document.querySelectorAll('.motivation-item').length > 1) {
            e.target.closest('.motivation-item').remove();
        } else {
            alert('Minimal harus ada satu range motivasi!');
        }
    }
    
    // Save motivations
    function saveMotivations() {
        const motivationItems = document.querySelectorAll('.motivation-item');
        const motivations = [];
        
        for (const item of motivationItems) {
            const range = item.querySelector('.motivation-range').value;
            const text = item.querySelector('.motivation-text').value;
            
            if (range && text) {
                motivations.push({ range, text });
            }
        }
        
        if (motivations.length > 0) {
            defaultSettings.motivations = motivations;
            saveSettings();
            alert('Motivasi berhasil disimpan!');
        } else {
            alert('Tidak ada motivasi yang valid untuk disimpan!');
        }
    }
    
    // Save exam toggles
    function saveExamToggles() {
        const toggles = document.querySelectorAll('.exam-toggle-list input[type="checkbox"]');
        
        toggles.forEach(toggle => {
            const exam = toggle.getAttribute('data-exam');
            defaultSettings.enabledExams[exam] = toggle.checked;
        });
        
        saveSettings();
        alert('Pengaturan ujian berhasil disimpan!');
    }
    
    // Load settings form
    function loadSettingsForm() {
        // Greeting text
        document.getElementById('greeting-setting').value = defaultSettings.greetingText;
        
        // Info text
        document.getElementById('info-setting').value = defaultSettings.infoText;
        
        // Chairman name
        document.getElementById('chairman-setting').value = defaultSettings.chairmanName;
        
        // Timer
        document.getElementById('timer-setting').value = defaultSettings.examTimer;
        
        // Question count
        document.getElementById('question-count').value = defaultSettings.questionCount;
        
        // Point per question
        document.getElementById('point-setting').value = defaultSettings.pointPerQuestion;
        
        // Shuffle questions
        if (defaultSettings.shuffleQuestions) {
            document.getElementById('shuffle-on').checked = true;
        } else {
            document.getElementById('shuffle-off').checked = true;
        }
        
        // Motivations
        const motivationsContainer = document.getElementById('motivation-settings');
        motivationsContainer.innerHTML = '';
        
        defaultSettings.motivations.forEach(motiv => {
            const motivationItem = document.createElement('div');
            motivationItem.className = 'motivation-item';
            
            const rangeInput = document.createElement('input');
            rangeInput.type = 'text';
            rangeInput.className = 'motivation-range';
            rangeInput.value = motiv.range;
            rangeInput.readOnly = true;
            
            const textarea = document.createElement('textarea');
            textarea.className = 'motivation-text';
            textarea.value = motiv.text;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-small delete-motivation';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.addEventListener('click', deleteMotivation);
            
            motivationItem.appendChild(rangeInput);
            motivationItem.appendChild(textarea);
            motivationItem.appendChild(deleteBtn);
            motivationsContainer.appendChild(motivationItem);
        });
        
        // Exam toggles
        const toggles = document.querySelectorAll('.exam-toggle-list input[type="checkbox"]');
        
        toggles.forEach(toggle => {
            const exam = toggle.getAttribute('data-exam');
            toggle.checked = defaultSettings.enabledExams[exam];
        });
    }
    
    // Load participants
    function loadParticipants() {
        const results = JSON.parse(localStorage.getItem('examResults')) || [];
        const participantsTable = document.getElementById('participants-table').querySelector('tbody');
        
        // Clear existing rows
        participantsTable.innerHTML = '';
        
        if (results.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="8" style="text-align:center;">Belum ada data peserta</td>';
            participantsTable.appendChild(row);
            return;
        }
        
        // Add participants
        results.forEach((result, index) => {
            const row = document.createElement('tr');
            
            const participant = result.participant;
            const exam = result.exam;
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${participant.fullname}</td>
                <td>${participant.status === 'pelajar' ? 'Pelajar' : 'Umum'}</td>
                <td>${participant.schoolLevel ? participant.schoolLevel.toUpperCase() : '-'}</td>
                <td>${exam.subject.toUpperCase()}</td>
                <td>${result.score}</td>
                <td>${new Date(result.timestamp).toLocaleDateString('id-ID')}</td>
                <td><button class="btn-small view-certificate" data-index="${index}"><i class="fas fa-eye"></i></button></td>
            `;
            
            participantsTable.appendChild(row);
        });
        
        // Add event listeners to view certificate buttons
        document.querySelectorAll('.view-certificate').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('button').getAttribute('data-index'));
                viewParticipantCertificate(index);
            });
        });
    }
    
    // View participant certificate
    function viewParticipantCertificate(index) {
        const results = JSON.parse(localStorage.getItem('examResults')) || [];
        const result = results[index];
        
        if (!result) return;
        
        // Update certificate content
        document.getElementById('cert-name').textContent = result.participant.fullname;
        document.getElementById('cert-score').textContent = result.score;
        document.getElementById('cert-date').textContent = `Ditetapkan di: Situbondo, ${formatDate(new Date(result.timestamp))}`;
        document.getElementById('cert-code').textContent = result.certificateCode;
        document.getElementById('chairman-name').textContent = defaultSettings.chairmanName;
        
        // Set motivation text based on score
        const motivation = getMotivationText(result.score);
        document.getElementById('cert-motivation').textContent = motivation;
        
        // Switch to certificate screen
        switchScreen('certificate');
    }
    
    // Export participants
    function exportParticipants() {
        const format = document.getElementById('export-format').value;
        const results = JSON.parse(localStorage.getItem('examResults')) || [];
        
        if (results.length === 0) {
            alert('Tidak ada data peserta untuk diexport!');
            return;
        }
        
        // Prepare data
        const data = results.map(result => {
            return {
                'Nama': result.participant.fullname,
                'Status': result.participant.status === 'pelajar' ? 'Pelajar' : 'Umum',
                'Tingkat': result.participant.schoolLevel ? result.participant.schoolLevel.toUpperCase() : '-',
                'Ujian': result.exam.subject.toUpperCase(),
                'Nilai': result.score,
                'Tanggal': new Date(result.timestamp).toLocaleDateString('id-ID'),
                'Kode Sertifikat': result.certificateCode
            };
        });
        
        // In a real implementation, you would use a library like SheetJS for Excel,
        // pdf-lib for PDF, or docx for Word documents
        // For demo purposes, we'll just show a message
        alert(`Data peserta akan diexport dalam format ${format.toUpperCase()}. Dalam implementasi nyata, ini akan mengunduh file.`);
        
        // Example of how you might implement Excel export with SheetJS:
        /*
        if (format === 'excel') {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, 'Peserta Ujian');
            XLSX.writeFile(wb, 'peserta-ujian.xlsx');
        }
        */
    }
    
    // Format date
    function formatDate(date) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    }
    
    // Get motivation text based on score
    function getMotivationText(score) {
        for (const motiv of defaultSettings.motivations) {
            const [min, max] = motiv.range.split('-').map(Number);
            if (score >= min && score <= max) {
                return motiv.text;
            }
        }
        return 'Terima kasih telah mengikuti ujian ini.';
    }
    
    // Initialize admin panel
    initAdminPanel();
});
