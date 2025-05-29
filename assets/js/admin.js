// Admin Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin panel
    initAdminPanel();
});

function initAdminPanel() {
    // Admin variables
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminMenuItems = document.querySelectorAll('.admin-menu li');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Code management elements
    const saveLoginCodeBtn = document.getElementById('save-login-code');
    const saveCpnsCodeBtn = document.getElementById('save-cpns-code');
    const saveBankCodeBtn = document.getElementById('save-bank-code');
    const saveAdminCodeBtn = document.getElementById('save-admin-code');
    
    // Exam settings elements
    const saveExamTimeBtn = document.getElementById('save-exam-time');
    const savePointsBtn = document.getElementById('save-points');
    const saveQuestionCountBtn = document.getElementById('save-question-count');
    const saveRandomizeBtn = document.getElementById('save-randomize');
    
    // Question management elements
    const addStudentQuestionBtn = document.getElementById('add-student-question');
    const addGeneralQuestionBtn = document.getElementById('add-general-question');
    const saveQuestionBtn = document.getElementById('save-question');
    const cancelEditBtn = document.getElementById('cancel-edit');
    const generateWithAiBtn = document.getElementById('generate-with-ai');
    
    // Content management elements
    const saveGreetingBtn = document.getElementById('save-greeting');
    const savePeriodicInfoBtn = document.getElementById('save-periodic-info');
    const saveMotivationsBtn = document.getElementById('save-motivations');
    const saveChairmanBtn = document.getElementById('save-chairman');
    
    // Participant data elements
    const exportDataBtn = document.getElementById('export-data');
    const searchBtn = document.getElementById('search-btn');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    
    // Question editor modal
    const questionEditorModal = document.getElementById('question-editor-modal');
    
    // Default codes
    const defaultCodes = {
        login: '12345',
        cpns: 'OPENLOCK-1945',
        questionBank: 'OPENLOCK-1926',
        admin: '65614222'
    };
    
    // Current settings
    let currentSettings = {
        examTime: 120,
        pointsPerQuestion: 1,
        questionCount: 10,
        randomizeQuestions: true,
        greetingTitle: 'Selamat Datang di Ujian Online PERGUNU Situbondo',
        greetingSubtitle: 'Silakan masukkan kode ujian untuk melanjutkan',
        periodicInfo: 'Informasi berkala akan ditampilkan di sini. Dapat diatur melalui panel admin.',
        motivations: {
            '90-100': 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.',
            '80-89': 'Hasil yang sangat baik! Anda telah menunjukkan pemahaman yang mendalam tentang materi ujian.',
            '70-79': 'Kerja bagus! Anda memiliki pemahaman yang baik tentang materi, masih ada ruang untuk peningkatan.',
            '60-69': 'Anda telah menyelesaikan ujian dengan baik. Teruslah belajar untuk meningkatkan pemahaman.',
            '0-59': 'Jangan menyerah! Setiap tantangan adalah kesempatan untuk belajar dan berkembang.'
        },
        chairmanName: 'Moh. Nuril Hudha, S.Pd., M.Si.'
    };
    
    // Exam toggles
    const examToggles = {
        'AGAMA': true,
        'PPKN': true,
        'SEJARAH': true,
        'IPA': true,
        'IPS': true,
        'MATEMATIKA': true,
        'BAHASA INDONESIA': true,
        'BAHASA INGGRIS': true,
        'MATERI EXTRA': true,
        'MATERI KHUSUS': true,
        'UJIAN LOGIKA': true,
        'UJIAN CPNS/P3K': true
    };
    
    // Questions data
    let questionsData = {
        pelajar: {
            AGAMA: [],
            PPKN: [],
            SEJARAH: [],
            IPA: [],
            IPS: [],
            MATEMATIKA: [],
            'BAHASA INDONESIA': [],
            'BAHASA INGGRIS': [],
            'MATERI EXTRA': [],
            'MATERI KHUSUS': []
        },
        umum: {
            'UJIAN LOGIKA': [],
            'UJIAN CPNS/P3K': []
        }
    };
    
    // Participant data
    let participantsData = [];
    
    // Current page for participant data
    let currentPage = 1;
    const itemsPerPage = 10;
    
    // Initialize admin panel
    function setupAdminPanel() {
        // Load saved settings from localStorage
        loadSettings();
        
        // Set up tab switching
        adminMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                switchTab(tabId);
            });
        });
        
        // Set up logout button
        logoutBtn.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
        
        // Code management
        saveLoginCodeBtn.addEventListener('click', saveCode.bind(null, 'login'));
        saveCpnsCodeBtn.addEventListener('click', saveCode.bind(null, 'cpns'));
        saveBankCodeBtn.addEventListener('click', saveCode.bind(null, 'questionBank'));
        saveAdminCodeBtn.addEventListener('click', saveCode.bind(null, 'admin'));
        
        // Exam settings
        saveExamTimeBtn.addEventListener('click', saveExamTime);
        savePointsBtn.addEventListener('click', savePoints);
        saveQuestionCountBtn.addEventListener('click', saveQuestionCount);
        saveRandomizeBtn.addEventListener('click', saveRandomize);
        
        // Question management
        addStudentQuestionBtn.addEventListener('click', () => openQuestionEditor('pelajar'));
        addGeneralQuestionBtn.addEventListener('click', () => openQuestionEditor('umum'));
        saveQuestionBtn.addEventListener('click', saveQuestion);
        cancelEditBtn.addEventListener('click', closeQuestionEditor);
        generateWithAiBtn.addEventListener('click', generateQuestionWithAI);
        
        // Content management
        saveGreetingBtn.addEventListener('click', saveGreeting);
        savePeriodicInfoBtn.addEventListener('click', savePeriodicInfo);
        saveMotivationsBtn.addEventListener('click', saveMotivations);
        saveChairmanBtn.addEventListener('click', saveChairman);
        
        // Participant data
        exportDataBtn.addEventListener('click', exportData);
        searchBtn.addEventListener('click', searchParticipants);
        prevPageBtn.addEventListener('click', goToPrevPage);
        nextPageBtn.addEventListener('click', goToNextPage);
        
        // Load initial data
        loadQuestions();
        loadParticipants();
        renderExamToggles();
        updatePageInfo();
    }
    
    // Switch between admin tabs
    function switchTab(tabId) {
        adminTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        adminMenuItems.forEach(item => {
            item.classList.remove('active');
        });
        
        document.getElementById(tabId).classList.add('active');
        document.querySelector(`.admin-menu li[data-tab="${tabId}"]`).classList.add('active');
    }
    
    // Load settings from localStorage
    function loadSettings() {
        const savedSettings = localStorage.getItem('adminSettings');
        if (savedSettings) {
            currentSettings = JSON.parse(savedSettings);
        }
        
        // Apply loaded settings to form fields
        document.getElementById('exam-time').value = currentSettings.examTime;
        document.getElementById('points-per-question').value = currentSettings.pointsPerQuestion;
        document.getElementById('question-count').value = currentSettings.questionCount;
        document.getElementById('randomize-questions').value = currentSettings.randomizeQuestions ? 'yes' : 'no';
        
        document.getElementById('greeting-title').value = currentSettings.greetingTitle;
        document.getElementById('greeting-subtitle').value = currentSettings.greetingSubtitle;
        document.getElementById('periodic-info').value = currentSettings.periodicInfo;
        
        document.querySelector('.motivation-text[data-range="90-100"]').value = currentSettings.motivations['90-100'];
        document.querySelector('.motivation-text[data-range="80-89"]').value = currentSettings.motivations['80-89'];
        document.querySelector('.motivation-text[data-range="70-79"]').value = currentSettings.motivations['70-79'];
        document.querySelector('.motivation-text[data-range="60-69"]').value = currentSettings.motivations['60-69'];
        document.querySelector('.motivation-text[data-range="0-59"]').value = currentSettings.motivations['0-59'];
        
        document.getElementById('chairman-name').value = currentSettings.chairmanName;
    }
    
    // Save settings to localStorage
    function saveSettings() {
        localStorage.setItem('adminSettings', JSON.stringify(currentSettings));
    }
    
    // Code management functions
    function saveCode(codeType) {
        const newCodeInput = document.getElementById(`new-${codeType}-code`);
        const currentCodeInput = document.getElementById(`current-${codeType}-code`);
        
        if (newCodeInput.value.trim() === '') {
            alert('Kode baru tidak boleh kosong');
            return;
        }
        
        // In a real app, you would save this to a server
        currentCodeInput.value = newCodeInput.value;
        alert(`Kode ${codeType} berhasil diperbarui`);
        
        // Reset new code input
        newCodeInput.value = '';
    }
    
    // Exam settings functions
    function saveExamTime() {
        const examTime = parseInt(document.getElementById('exam-time').value);
        
        if (isNaN(examTime) || examTime < 5 || examTime > 300) {
            alert('Waktu ujian harus antara 5-300 menit');
            return;
        }
        
        currentSettings.examTime = examTime;
        saveSettings();
        alert('Waktu ujian berhasil diperbarui');
    }
    
    function savePoints() {
        const points = parseInt(document.getElementById('points-per-question').value);
        
        if (isNaN(points) || points < 1 || points > 10) {
            alert('Poin per soal harus antara 1-10');
            return;
        }
        
        currentSettings.pointsPerQuestion = points;
        saveSettings();
        alert('Poin per soal berhasil diperbarui');
    }
    
    function saveQuestionCount() {
        const count = parseInt(document.getElementById('question-count').value);
        
        if (isNaN(count) || count < 5 || count > 150 || count % 5 !== 0) {
            alert('Jumlah soal harus kelipatan 5, minimal 5 dan maksimal 150');
            return;
        }
        
        currentSettings.questionCount = count;
        saveSettings();
        alert('Jumlah soal berhasil diperbarui');
    }
    
    function saveRandomize() {
        const randomize = document.getElementById('randomize-questions').value === 'yes';
        currentSettings.randomizeQuestions = randomize;
        saveSettings();
        alert('Pengaturan pengacakan soal berhasil diperbarui');
    }
    
    // Question management functions
    function loadQuestions() {
        // In a real app, you would fetch from an API
        const savedQuestions = localStorage.getItem('questionsData');
        if (savedQuestions) {
            questionsData = JSON.parse(savedQuestions);
        }
        
        renderQuestions('pelajar');
        renderQuestions('umum');
    }
    
    function saveQuestions() {
        localStorage.setItem('questionsData', JSON.stringify(questionsData));
    }
    
    function renderQuestions(category) {
        const subjectSelect = document.getElementById(`${category}-subject-select`);
        const questionList = document.querySelector(`.question-category[data-category="${category}"] .question-list`);
        
        // Clear existing questions
        questionList.innerHTML = '';
        
        // Get selected subject
        const subject = subjectSelect.value;
        
        // Get questions for this subject
        const questions = questionsData[category][subject] || [];
        
        if (questions.length === 0) {
            questionList.innerHTML = '<p class="no-questions">Belum ada soal untuk mata ujian ini</p>';
            return;
        }
        
        // Render each question
        questions.forEach((question, index) => {
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            questionItem.innerHTML = `
                <div class="question-text">${index + 1}. ${question.text}</div>
                <div class="question-options">
                    ${question.options.map(opt => 
                        `<div class="${opt.id === question.correctAnswer ? 'correct-option' : ''}">
                            ${opt.id}. ${opt.text}
                        </div>`
                    ).join('')}
                </div>
                <div class="question-actions">
                    <button class="edit-btn" data-id="${question.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-btn" data-id="${question.id}">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            `;
            
            questionList.appendChild(questionItem);
            
            // Add event listeners to action buttons
            questionItem.querySelector('.edit-btn').addEventListener('click', () => {
                editQuestion(category, subject, question.id);
            });
            
            questionItem.querySelector('.delete-btn').addEventListener('click', () => {
                deleteQuestion(category, subject, question.id);
            });
        });
    }
    
    function openQuestionEditor(category) {
        // Reset form
        document.getElementById('question-text').value = '';
        document.getElementById('question-image').value = '';
        document.getElementById('option-a').value = '';
        document.getElementById('option-b').value = '';
        document.getElementById('option-c').value = '';
        document.getElementById('option-d').value = '';
        document.getElementById('option-e').value = '';
        document.getElementById('explanation-text').value = '';
        
        // Set editor title
        const subjectSelect = document.getElementById(`${category}-subject-select`);
        const subject = subjectSelect.options[subjectSelect.selectedIndex].text;
        document.getElementById('editor-title').textContent = `Tambah Soal Baru - ${subject}`;
        
        // Show modal
        questionEditorModal.classList.add('active');
    }
    
    function closeQuestionEditor() {
        questionEditorModal.classList.remove('active');
    }
    
    function saveQuestion() {
        const category = document.querySelector('.question-tab-btn.active').getAttribute('data-category');
        const subjectSelect = document.getElementById(`${category}-subject-select`);
        const subject = subjectSelect.value;
        
        const questionText = document.getElementById('question-text').value.trim();
        const optionA = document.getElementById('option-a').value.trim();
        const optionB = document.getElementById('option-b').value.trim();
        const optionC = document.getElementById('option-c').value.trim();
        const optionD = document.getElementById('option-d').value.trim();
        const optionE = document.getElementById('option-e').value.trim();
        const correctOption = document.querySelector('input[name="correct-option"]:checked').value;
        const explanation = document.getElementById('explanation-text').value.trim();
        
        // Validate inputs
        if (!questionText) {
            alert('Pertanyaan tidak boleh kosong');
            return;
        }
        
        if (!optionA || !optionB || !optionC || !optionD) {
            alert('Minimal 4 pilihan jawaban harus diisi (A-D)');
            return;
        }
        
        // Create question object
        const newQuestion = {
            id: Date.now(), // Use timestamp as ID
            text: questionText,
            options: [
                { id: 'A', text: optionA },
                { id: 'B', text: optionB },
                { id: 'C', text: optionC },
                { id: 'D', text: optionD }
            ],
            correctAnswer: correctOption,
            explanation: explanation
        };
        
        // Add option E if provided
        if (optionE) {
            newQuestion.options.push({ id: 'E', text: optionE });
        }
        
        // Handle image upload if any
        const imageInput = document.getElementById('question-image');
        if (imageInput.files.length > 0) {
            // In a real app, you would upload the image to a server
            const file = imageInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                newQuestion.image = e.target.result;
                finishSavingQuestion(category, subject, newQuestion);
            };
            
            reader.readAsDataURL(file);
        } else {
            finishSavingQuestion(category, subject, newQuestion);
        }
    }
    
    function finishSavingQuestion(category, subject, question) {
        // Initialize subject array if not exists
        if (!questionsData[category][subject]) {
            questionsData[category][subject] = [];
        }
        
        // Add question
        questionsData[category][subject].push(question);
        saveQuestions();
        
        // Close editor and refresh list
        closeQuestionEditor();
        renderQuestions(category);
        
        alert('Soal berhasil disimpan');
    }
    
    function editQuestion(category, subject, questionId) {
        // Find the question
        const question = questionsData[category][subject].find(q => q.id === questionId);
        if (!question) return;
        
        // Fill the form
        document.getElementById('question-text').value = question.text;
        document.getElementById('option-a').value = question.options.find(o => o.id === 'A').text;
        document.getElementById('option-b').value = question.options.find(o => o.id === 'B').text;
        document.getElementById('option-c').value = question.options.find(o => o.id === 'C').text;
        document.getElementById('option-d').value = question.options.find(o => o.id === 'D').text;
        
        const optionE = question.options.find(o => o.id === 'E');
        document.getElementById('option-e').value = optionE ? optionE.text : '';
        
        document.querySelector(`input[name="correct-option"][value="${question.correctAnswer}"]`).checked = true;
        document.getElementById('explanation-text').value = question.explanation;
        
        // Set editor title
        const subjectName = document.getElementById(`${category}-subject-select`)
            .options[document.getElementById(`${category}-subject-select`).selectedIndex].text;
        document.getElementById('editor-title').textContent = `Edit Soal - ${subjectName}`;
        
        // Show modal
        questionEditorModal.classList.add('active');
        
        // TODO: Handle editing (currently just adds as new)
    }
    
    function deleteQuestion(category, subject, questionId) {
        if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            questionsData[category][subject] = questionsData[category][subject].filter(q => q.id !== questionId);
            saveQuestions();
            renderQuestions(category);
            alert('Soal berhasil dihapus');
        }
    }
    
    function generateQuestionWithAI() {
        const prompt = document.getElementById('ai-prompt').value.trim();
        
        if (!prompt) {
            alert('Silakan masukkan prompt untuk menghasilkan soal');
            return;
        }
        
        // In a real app, you would call an AI API here
        // This is just a simulation
        
        alert('Fitur AI akan membutuhkan API Key yang valid. Silakan masukkan API Key AI Anda di bagian kode yang ditandai.');
        
        /* 
        // Example of how to implement with OpenAI API:
        // YOU NEED TO INSERT YOUR API KEY HERE
        const apiKey = 'YOUR_OPENAI_API_KEY';
        
        fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `Buatkan soal pilihan ganda dengan 4 pilihan jawaban dan 1 jawaban benar tentang: ${prompt}`,
                max_tokens: 200,
                temperature: 0.7
            })
        })
        .then(response => response.json())
        .then(data => {
            // Process the AI response and populate the form
            console.log(data);
            // You would need to parse the response and extract the question and options
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal menghasilkan soal. Silakan coba lagi.');
        });
        */
    }
    
    // Content management functions
    function saveGreeting() {
        currentSettings.greetingTitle = document.getElementById('greeting-title').value;
        currentSettings.greetingSubtitle = document.getElementById('greeting-subtitle').value;
        saveSettings();
        alert('Teks sambutan berhasil diperbarui');
    }
    
    function savePeriodicInfo() {
        currentSettings.periodicInfo = document.getElementById('periodic-info').value;
        saveSettings();
        alert('Informasi berkala berhasil diperbarui');
    }
    
    function saveMotivations() {
        currentSettings.motivations['90-100'] = document.querySelector('.motivation-text[data-range="90-100"]').value;
        currentSettings.motivations['80-89'] = document.querySelector('.motivation-text[data-range="80-89"]').value;
        currentSettings.motivations['70-79'] = document.querySelector('.motivation-text[data-range="70-79"]').value;
        currentSettings.motivations['60-69'] = document.querySelector('.motivation-text[data-range="60-69"]').value;
        currentSettings.motivations['0-59'] = document.querySelector('.motivation-text[data-range="0-59"]').value;
        saveSettings();
        alert('Kalimat motivasi berhasil diperbarui');
    }
    
    function saveChairman() {
        currentSettings.chairmanName = document.getElementById('chairman-name').value;
        saveSettings();
        alert('Nama ketua berhasil diperbarui');
    }
    
    // Participant data functions
    function loadParticipants() {
        // In a real app, you would fetch from an API
        const savedParticipants = localStorage.getItem('participantsData');
        if (savedParticipants) {
            participantsData = JSON.parse(savedParticipants);
        }
        
        renderParticipants();
    }
    
    function renderParticipants() {
        const tableBody = document.querySelector('.data-table tbody');
        tableBody.innerHTML = '';
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, participantsData.length);
        
        if (participantsData.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="8" class="no-data">Belum ada data peserta</td></tr>';
            return;
        }
        
        for (let i = startIndex; i < endIndex; i++) {
            const participant = participantsData[i];
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${participant.name}</td>
                <td>${participant.status}</td>
                <td>${participant.studentPurpose || participant.generalPurpose}</td>
                <td>${participant.subject}</td>
                <td>${participant.score || '-'}</td>
                <td>${new Date(participant.timestamp).toLocaleDateString()}</td>
                <td>
                    <button class="view-btn" data-id="${i}">
                        <i class="fas fa-eye"></i> Lihat
                    </button>
                </td>
            `;
            
            tableBody.appendChild(row);
            
            // Add event listener to view button
            row.querySelector('.view-btn').addEventListener('click', () => {
                viewParticipantDetails(i);
            });
        }
    }
    
    function viewParticipantDetails(index) {
        const participant = participantsData[index];
        let details = `Nama: ${participant.name}\n`;
        details += `Status: ${participant.status}\n`;
        
        if (participant.status === 'pelajar') {
            details += `Sekolah: ${participant.school}\n`;
            details += `NIS: ${participant.nis}\n`;
            details += `Tujuan: ${participant.studentPurpose}\n`;
            details += `Tingkat: ${participant.schoolLevel}\n`;
        } else {
            details += `Alamat: ${participant.address}\n`;
            details += `WhatsApp: ${participant.whatsapp}\n`;
            details += `Email: ${participant.email}\n`;
            details += `Tujuan: ${participant.generalPurpose}\n`;
        }
        
        details += `Mata Ujian: ${participant.subject}\n`;
        details += `Nilai: ${participant.score || '-'}\n`;
        details += `Tanggal: ${new Date(participant.timestamp).toLocaleString()}\n`;
        
        alert(details);
    }
    
    function searchParticipants() {
        const searchTerm = document.getElementById('participant-search').value.toLowerCase();
        
        if (searchTerm.trim() === '') {
            renderParticipants();
            return;
        }
        
        const filtered = participantsData.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            (p.status === 'pelajar' && p.school.toLowerCase().includes(searchTerm)) ||
            (p.status === 'umum' && p.address.toLowerCase().includes(searchTerm)) ||
            p.subject.toLowerCase().includes(searchTerm)
        );
        
        // Render filtered results
        const tableBody = document.querySelector('.data-table tbody');
        tableBody.innerHTML = '';
        
        if (filtered.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="8" class="no-data">Tidak ditemukan data yang sesuai</td></tr>';
            return;
        }
        
        filtered.forEach((participant, i) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${participant.name}</td>
                <td>${participant.status}</td>
                <td>${participant.studentPurpose || participant.generalPurpose}</td>
                <td>${participant.subject}</td>
                <td>${participant.score || '-'}</td>
                <td>${new Date(participant.timestamp).toLocaleDateString()}</td>
                <td>
                    <button class="view-btn" data-id="${i}">
                        <i class="fas fa-eye"></i> Lihat
                    </button>
                </td>
            `;
            
            tableBody.appendChild(row);
            
            // Add event listener to view button
            row.querySelector('.view-btn').addEventListener('click', () => {
                viewParticipantDetails(participantsData.indexOf(participant));
            });
        });
    }
    
    function exportData() {
        // In a real app, you would generate a proper Excel/CSV file
        // This is just a simulation
        
        let csvContent = "Nama,Status,Sekolah/NIS/Alamat,WhatsApp/Email,Tujuan,Mata Ujian,Nilai,Tanggal\n";
        
        participantsData.forEach(p => {
            if (p.status === 'pelajar') {
                csvContent += `${p.name},Pelajar,${p.school}/${p.nis},-,${p.studentPurpose},${p.subject},${p.score || '-'},${new Date(p.timestamp).toLocaleString()}\n`;
            } else {
                csvContent += `${p.name},Umum,${p.address},${p.whatsapp}/${p.email},${p.generalPurpose},${p.subject},${p.score || '-'},${new Date(p.timestamp).toLocaleString()}\n`;
            }
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `data_peserta_${new Date().toISOString().slice(0,10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    function goToPrevPage() {
        if (currentPage > 1) {
            currentPage--;
            renderParticipants();
            updatePageInfo();
        }
    }
    
    function goToNextPage() {
        if (currentPage * itemsPerPage < participantsData.length) {
            currentPage++;
            renderParticipants();
            updatePageInfo();
        }
    }
    
    function updatePageInfo() {
        const totalPages = Math.ceil(participantsData.length / itemsPerPage);
        document.getElementById('page-info').textContent = `Halaman ${currentPage} dari ${totalPages}`;
    }
    
    // Exam toggle functions
    function renderExamToggles() {
        const tableBody = document.querySelector('.exam-toggle-table tbody');
        tableBody.innerHTML = '';
        
        Object.entries(examToggles).forEach(([exam, isEnabled]) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${exam}</td>
                <td>${isEnabled ? 'Aktif' : 'Nonaktif'}</td>
                <td>
                    <label class="toggle-switch">
                        <input type="checkbox" ${isEnabled ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </td>
            `;
            
            tableBody.appendChild(row);
            
            // Add event listener to toggle switch
            row.querySelector('input').addEventListener('change', function() {
                examToggles[exam] = this.checked;
                // In a real app, you would save this to the server
                alert(`Ujian ${exam} telah ${this.checked ? 'diaktifkan' : 'dinonaktifkan'}`);
            });
        });
    }
    
    // Initialize the admin panel
    setupAdminPanel();
    
    // Set up subject select change listeners
    document.getElementById('student-subject-select').addEventListener('change', function() {
        renderQuestions('pelajar');
    });
    
    document.getElementById('general-subject-select').addEventListener('change', function() {
        renderQuestions('umum');
    });
    
    // Set up question tab switching
    document.querySelectorAll('.question-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.question-tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.question-category').forEach(cat => {
                cat.classList.remove('active');
            });
            
            document.querySelector(`.question-category[data-category="${this.getAttribute('data-category')}"]`).classList.add('active');
        });
    });
}
