// Admin Panel Functions

// Initialize admin panel
function initAdminPanel() {
    // Load settings
    loadAdminSettings();
    
    // Setup event listeners
    setupAdminEventListeners();
}

// Load admin settings from localStorage
function loadAdminSettings() {
    const savedSettings = localStorage.getItem('adminSettings');
    if(savedSettings) {
        adminSettings = JSON.parse(savedSettings);
    }
    
    // Update UI with loaded settings
    updateAdminUI();
}

// Save admin settings to localStorage
function saveAdminSettings() {
    localStorage.setItem('adminSettings', JSON.stringify(adminSettings));
    alert('Pengaturan berhasil disimpan.');
}

// Update UI with current admin settings
function updateAdminUI() {
    // Code settings
    document.getElementById('currentLoginCode').placeholder = `Current: ${adminSettings.loginCode}`;
    document.getElementById('currentCPNSCode').placeholder = `Current: ${adminSettings.cpnsCode}`;
    document.getElementById('currentQuestionCode').placeholder = `Current: ${adminSettings.questionBankCode}`;
    document.getElementById('currentAdminCode').placeholder = `Current: ${adminSettings.adminCode}`;
    
    // Exam settings
    document.getElementById('examTimerSetting').value = adminSettings.examTimer;
    document.getElementById('questionCountSetting').value = adminSettings.questionCount;
    document.getElementById('pointSystemSetting').value = adminSettings.pointSystem;
    document.getElementById('randomizeQuestions').checked = adminSettings.randomizeQuestions;
    document.getElementById('randomizeStatus').textContent = 
        adminSettings.randomizeQuestions ? 'Aktif' : 'Nonaktif';
    
    // Update exam toggles
    const toggleContainer = document.getElementById('examToggleContainer');
    toggleContainer.innerHTML = '';
    
    Object.entries(adminSettings.activeExams).forEach(([exam, isActive]) => {
        const toggleDiv = document.createElement('div');
        toggleDiv.className = 'exam-toggle';
        
        const toggle = document.createElement('input');
        toggle.type = 'checkbox';
        toggle.id = `toggle_${exam}`;
        toggle.checked = isActive;
        
        const label = document.createElement('label');
        label.htmlFor = `toggle_${exam}`;
        label.textContent = exam.replace(/_/g, ' ');
        
        toggleDiv.appendChild(toggle);
        toggleDiv.appendChild(label);
        toggleContainer.appendChild(toggleDiv);
    });
    
    // Content settings
    document.getElementById('greetingTextSetting').value = adminSettings.greetingText;
    document.getElementById('chairmanNameSetting').value = adminSettings.chairmanName;
    document.getElementById('motivationTextSetting').value = adminSettings.motivationText;
    document.getElementById('periodicInfoSetting').value = adminSettings.periodicInfo;
    
    // Social links
    const socialContainer = document.getElementById('socialLinksContainer');
    socialContainer.innerHTML = '';
    
    adminSettings.socialLinks.forEach((link, index) => {
        const linkItem = document.createElement('div');
        linkItem.className = 'social-link-item';
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Nama Platform';
        nameInput.value = link.name;
        nameInput.dataset.index = index;
        nameInput.dataset.field = 'name';
        
        const urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.placeholder = 'URL';
        urlInput.value = link.url;
        urlInput.dataset.index = index;
        urlInput.dataset.field = 'url';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.dataset.index = index;
        deleteBtn.addEventListener('click', removeSocialLink);
        
        linkItem.appendChild(nameInput);
        linkItem.appendChild(urlInput);
        linkItem.appendChild(deleteBtn);
        socialContainer.appendChild(linkItem);
    });
}

// Setup admin panel event listeners
function setupAdminEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', switchAdminTab);
    });
    
    // Save buttons
    document.querySelectorAll('.save-code').forEach(btn => {
        btn.addEventListener('click', saveCode);
    });
    
    document.querySelectorAll('.save-setting').forEach(btn => {
        btn.addEventListener('click', saveSetting);
    });
    
    // Randomize toggle
    document.getElementById('randomizeQuestions').addEventListener('change', function() {
        document.getElementById('randomizeStatus').textContent = 
            this.checked ? 'Aktif' : 'Nonaktif';
    });
    
    // Social links
    document.getElementById('addSocialLinkBtn').addEventListener('click', addSocialLink);
    
    // Question bank
    document.getElementById('addQuestionBtn').addEventListener('click', openQuestionModal);
    document.getElementById('aiGenerateBtn').addEventListener('click', openAIModal);
    document.getElementById('generateQuestionsBtn').addEventListener('click', generateQuestionsWithAI);
    document.getElementById('saveGeneratedBtn').addEventListener('click', saveGeneratedQuestions);
    
    // Data export
    document.getElementById('exportDataBtn').addEventListener('click', exportParticipantData);
    document.getElementById('viewParticipantsBtn').addEventListener('click', viewParticipants);
    
    // Logout
    document.getElementById('logoutAdminBtn').addEventListener('click', logoutAdmin);
    
    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
}

// Switch admin tabs
function switchAdminTab(e) {
    const tabName = e.target.dataset.tab;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

// Save code settings
function saveCode(e) {
    const codeType = e.target.dataset.codeType;
    let newCode, currentCode;
    
    switch(codeType) {
        case 'login':
            newCode = document.getElementById('newLoginCode').value;
            currentCode = document.getElementById('currentLoginCode').value;
            if(currentCode === adminSettings.loginCode) {
                adminSettings.loginCode = newCode;
                alert('Kode login berhasil diubah.');
            } else {
                alert('Kode login lama salah.');
            }
            break;
            
        case 'cpns':
            newCode = document.getElementById('newCPNSCode').value;
            currentCode = document.getElementById('currentCPNSCode').value;
            if(currentCode === adminSettings.cpnsCode) {
                adminSettings.cpnsCode = newCode;
                alert('Kode ujian CPNS berhasil diubah.');
            } else {
                alert('Kode ujian CPNS lama salah.');
            }
            break;
            
        case 'question':
            newCode = document.getElementById('newQuestionCode').value;
            currentCode = document.getElementById('currentQuestionCode').value;
            if(currentCode === adminSettings.questionBankCode) {
                adminSettings.questionBankCode = newCode;
                alert('Kode bank soal berhasil diubah.');
            } else {
                alert('Kode bank soal lama salah.');
            }
            break;
            
        case 'admin':
            newCode = document.getElementById('newAdminCode').value;
            currentCode = document.getElementById('currentAdminCode').value;
            if(currentCode === adminSettings.adminCode) {
                adminSettings.adminCode = newCode;
                alert('Kode admin berhasil diubah.');
            } else {
                alert('Kode admin lama salah.');
            }
            break;
    }
    
    // Save settings
    saveAdminSettings();
    
    // Clear fields
    document.getElementById(`new${codeType.charAt(0).toUpperCase() + codeType.slice(1)}Code`).value = '';
    document.getElementById(`current${codeType.charAt(0).toUpperCase() + codeType.slice(1)}Code`).value = '';
}

// Save admin settings
function saveSetting(e) {
    const settingType = e.target.dataset.setting;
    
    switch(settingType) {
        case 'timer':
            adminSettings.examTimer = parseInt(document.getElementById('examTimerSetting').value) || 120;
            break;
            
        case 'questionCount':
            adminSettings.questionCount = parseInt(document.getElementById('questionCountSetting').value) || 10;
            break;
            
        case 'pointSystem':
            adminSettings.pointSystem = parseInt(document.getElementById('pointSystemSetting').value) || 1;
            break;
            
        case 'randomize':
            adminSettings.randomizeQuestions = document.getElementById('randomizeQuestions').checked;
            break;
            
        case 'examToggles':
            const toggles = document.querySelectorAll('#examToggleContainer input[type="checkbox"]');
            toggles.forEach(toggle => {
                const examName = toggle.id.replace('toggle_', '');
                adminSettings.activeExams[examName] = toggle.checked;
            });
            break;
            
        case 'greetingText':
            adminSettings.greetingText = document.getElementById('greetingTextSetting').value;
            break;
            
        case 'chairmanName':
            adminSettings.chairmanName = document.getElementById('chairmanNameSetting').value;
            break;
            
        case 'motivationText':
            adminSettings.motivationText = document.getElementById('motivationTextSetting').value;
            break;
            
        case 'periodicInfo':
            adminSettings.periodicInfo = document.getElementById('periodicInfoSetting').value;
            break;
            
        case 'socialLinks':
            const linkItems = document.querySelectorAll('.social-link-item');
            adminSettings.socialLinks = [];
            
            linkItems.forEach(item => {
                const nameInput = item.querySelector('input[data-field="name"]');
                const urlInput = item.querySelector('input[data-field="url"]');
                
                if(nameInput.value && urlInput.value) {
                    adminSettings.socialLinks.push({
                        name: nameInput.value,
                        url: urlInput.value
                    });
                }
            });
            break;
    }
    
    saveAdminSettings();
}

// Social links management
function addSocialLink() {
    const socialContainer = document.getElementById('socialLinksContainer');
    
    const linkItem = document.createElement('div');
    linkItem.className = 'social-link-item';
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Nama Platform';
    nameInput.dataset.field = 'name';
    
    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.placeholder = 'URL';
    urlInput.dataset.field = 'url';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', removeSocialLink);
    
    linkItem.appendChild(nameInput);
    linkItem.appendChild(urlInput);
    linkItem.appendChild(deleteBtn);
    socialContainer.appendChild(linkItem);
}

function removeSocialLink(e) {
    e.target.parentElement.remove();
}

// Question bank management
function openQuestionModal() {
    const modal = document.getElementById('questionModal');
    modal.style.display = 'block';
    
    // Reset form
    document.getElementById('modalTitle').textContent = 'Tambah Soal Baru';
    document.getElementById('questionForm').reset();
    document.getElementById('modalQuestionId').value = '';
}

function editQuestion(id) {
    const question = examQuestions[id];
    if(!question) return;
    
    const modal = document.getElementById('questionModal');
    modal.style.display = 'block';
    
    // Set form values
    document.getElementById('modalTitle').textContent = 'Edit Soal';
    document.getElementById('modalQuestionId').value = id;
    document.getElementById('modalCategory').value = question.category;
    document.getElementById('modalQuestion').value = question.question;
    
    // Set options
    document.getElementById('optionA').value = question.optionA || '';
    document.getElementById('optionB').value = question.optionB || '';
    document.getElementById('optionC').value = question.optionC || '';
    document.getElementById('optionD').value = question.optionD || '';
    document.getElementById('optionE').value = question.optionE || '';
    
    // Set correct answer
    document.querySelector(`input[name="correctOption"][value="${question.correctAnswer}"]`).checked = true;
    
    // Set explanation
    document.getElementById('modalExplanation').value = question.explanation || '';
    
    // Set difficulty
    document.getElementById('modalDifficulty').value = question.difficulty || 'medium';
}

function deleteQuestion(id) {
    if(confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        examQuestions.splice(id, 1);
        saveAdminSettings();
        loadQuestionBank();
    }
}

function openAIModal() {
    const modal = document.getElementById('aiModal');
    modal.style.display = 'block';
    
    // Reset form
    document.getElementById('aiTopic').value = '';
    document.getElementById('aiCount').value = 5;
    document.getElementById('aiLoading').style.display = 'none';
    document.getElementById('aiResults').style.display = 'none';
    document.getElementById('generatedQuestions').innerHTML = '';
}

function generateQuestionsWithAI() {
    const topic = document.getElementById('aiTopic').value.trim();
    const category = document.getElementById('aiCategory').value;
    const count = parseInt(document.getElementById('aiCount').value);
    const difficulty = document.getElementById('aiDifficulty').value;
    const apiKey = document.getElementById('aiApiKey').value.trim();
    
    if(!topic) {
        alert('Silakan masukkan topik/materi untuk generate soal.');
        return;
    }
    
    if(!apiKey || apiKey === 'GANTI_DENGAN_API_KEY_ANDA') {
        alert('Silakan masukkan API Key AI yang valid.');
        return;
    }
    
    // Show loading
    document.getElementById('aiLoading').style.display = 'block';
    
    // In a real implementation, you would call your AI API here
    // This is a mock implementation that returns sample questions after a delay
    setTimeout(() => {
        // Mock AI response
        const mockQuestions = generateMockAIQuestions(topic, category, count, difficulty);
        
        // Display results
        document.getElementById('aiLoading').style.display = 'none';
        document.getElementById('aiResults').style.display = 'block';
        
        const resultsContainer = document.getElementById('generatedQuestions');
        resultsContainer.innerHTML = '';
        
        mockQuestions.forEach((q, i) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'generated-question';
            questionDiv.innerHTML = `
                <p><strong>Soal ${i + 1}:</strong> ${q.question}</p>
                <p><strong>Jawaban benar:</strong> ${q.correctAnswer}. ${q[q.correctAnswer]}</p>
                <p><strong>Penjelasan:</strong> ${q.explanation}</p>
            `;
            resultsContainer.appendChild(questionDiv);
        });
    }, 2000);
}

function generateMockAIQuestions(topic, category, count, difficulty) {
    const mockQuestions = [];
    
    for(let i = 0; i < count; i++) {
        mockQuestions.push({
            question: `Contoh soal tentang ${topic} (${difficulty}) - ${i + 1}`,
            optionA: `Pilihan A untuk soal ${i + 1}`,
            optionB: `Pilihan B untuk soal ${i + 1}`,
            optionC: `Pilihan C untuk soal ${i + 1}`,
            optionD: `Pilihan D untuk soal ${i + 1}`,
            correctAnswer: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
            explanation: `Ini adalah penjelasan untuk soal tentang ${topic} (${difficulty}) - ${i + 1}`,
            category: category,
            difficulty: difficulty
        });
    }
    
    return mockQuestions;
}

function saveGeneratedQuestions() {
    const questions = document.querySelectorAll('.generated-question');
    
    questions.forEach(q => {
        // In a real implementation, you would parse the generated questions
        // and add them to the examQuestions array
        // This is just a mock implementation
        examQuestions.push({
            question: `Soal baru ${examQuestions.length + 1}`,
            optionA: 'Pilihan A',
            optionB: 'Pilihan B',
            optionC: 'Pilihan C',
            optionD: 'Pilihan D',
            correctAnswer: 'A',
            explanation: 'Penjelasan soal baru',
            category: document.getElementById('aiCategory').value,
            difficulty: document.getElementById('aiDifficulty').value
        });
    });
    
    saveAdminSettings();
    loadQuestionBank();
    closeModal();
    alert(`${questions.length} soal baru berhasil ditambahkan ke bank soal.`);
}

// Participant data management
function exportParticipantData() {
    // In a real implementation, you would generate Excel/PDF here
    alert('Fitur export data peserta akan menghasilkan file Excel/PDF dengan semua data peserta.');
}

function viewParticipants() {
    const modal = document.getElementById('participantsModal');
    modal.style.display = 'block';
    
    // Load participants data
    const tableBody = document.getElementById('participantTableBody');
    tableBody.innerHTML = '';
    
    participants.forEach((participant, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${participant.fullName}</td>
            <td>${participant.status}</td>
            <td>${participant.isStudent ? participant.schoolLevel || '-' : 'Umum'}</td>
            <td>${participant.examCategory ? participant.examCategory.replace(/_/g, ' ') : '-'}</td>
            <td>${participant.score || '-'}</td>
            <td>${new Date(participant.completedAt || participant.date).toLocaleDateString('id-ID')}</td>
            <td>
                <button class="btn-secondary small" data-id="${index}"><i class="fas fa-eye"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Utility functions
function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

function logoutAdmin() {
    if(confirm('Apakah Anda yakin ingin keluar dari kontrol panel admin?')) {
        showScreen('opening');
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', initAdminPanel);
