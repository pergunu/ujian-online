// Admin Panel JavaScript

// DOM Elements
const adminTabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');
const dashboardTab = document.getElementById('dashboard-tab');
const codesTab = document.getElementById('codes-tab');
const questionsTab = document.getElementById('questions-tab');
const settingsTab = document.getElementById('settings-tab');
const participantsTab = document.getElementById('participants-tab');

// Dashboard Elements
const totalParticipantsElement = document.getElementById('total-participants');
const todayExamsElement = document.getElementById('today-exams');
const averageScoreElement = document.getElementById('average-score');
const activityListElement = document.getElementById('activity-list');

// Codes Management Elements
const currentLoginCodeInput = document.getElementById('current-login-code');
const newLoginCodeInput = document.getElementById('new-login-code');
const confirmLoginCodeInput = document.getElementById('confirm-login-code');
const saveLoginCodeBtn = document.getElementById('save-login-code-btn');

const currentCpnsCodeInput = document.getElementById('current-cpns-code');
const newCpnsCodeInput = document.getElementById('new-cpns-code');
const confirmCpnsCodeInput = document.getElementById('confirm-cpns-code');
const saveCpnsCodeBtn = document.getElementById('save-cpns-code-btn');

const currentBankCodeInput = document.getElementById('current-bank-code');
const newBankCodeInput = document.getElementById('new-bank-code');
const confirmBankCodeInput = document.getElementById('confirm-bank-code');
const saveBankCodeBtn = document.getElementById('save-bank-code-btn');

const currentAdminCodeInput = document.getElementById('current-admin-code');
const newAdminCodeInput = document.getElementById('new-admin-code');
const confirmAdminCodeInput = document.getElementById('confirm-admin-code');
const saveAdminCodeBtn = document.getElementById('save-admin-code-btn');

const showCodeBtns = document.querySelectorAll('.show-code-btn');

// Questions Management Elements
const questionTabs = document.querySelectorAll('.question-tab');
const addQuestionBtn = document.getElementById('add-question-btn');
const aiGenerateBtn = document.getElementById('ai-generate-btn');
const questionSearchInput = document.getElementById('question-search');
const searchBtn = document.getElementById('search-btn');
const questionsListElement = document.getElementById('questions-list');

const questionModal = document.getElementById('question-modal');
const questionModalTitle = document.getElementById('question-modal-title');
const questionForm = document.getElementById('question-form');
const questionCategorySelect = document.getElementById('question-category');
const questionTextInput = document.getElementById('question-text');
const questionImageInput = document.getElementById('question-image');
const optionAInput = document.getElementById('option-a');
const optionBInput = document.getElementById('option-b');
const optionCInput = document.getElementById('option-c');
const optionDInput = document.getElementById('option-d');
const optionEInput = document.getElementById('option-e');
const correctOptionA = document.getElementById('correct-option-a');
const correctOptionB = document.getElementById('correct-option-b');
const correctOptionC = document.getElementById('correct-option-c');
const correctOptionD = document.getElementById('correct-option-d');
const correctOptionE = document.getElementById('correct-option-e');
const explanationInput = document.getElementById('explanation');
const questionLevelSelect = document.getElementById('question-level');
const saveQuestionBtn = document.getElementById('save-question-btn');
const cancelQuestionBtn = document.getElementById('cancel-question-btn');

const aiModal = document.getElementById('ai-modal');
const aiApiKeyInput = document.getElementById('ai-api-key');
const aiCategorySelect = document.getElementById('ai-category');
const aiTopicInput = document.getElementById('ai-topic');
const aiDifficultySelect = document.getElementById('ai-difficulty');
const aiCountInput = document.getElementById('ai-count');
const generateQuestionsBtn = document.getElementById('generate-questions-btn');
const cancelAiBtn = document.getElementById('cancel-ai-btn');
const aiLoadingElement = document.getElementById('ai-loading');
const aiResultsElement = document.getElementById('ai-results');
const generatedQuestionsElement = document.getElementById('generated-questions');
const saveGeneratedBtn = document.getElementById('save-generated-btn');

// Settings Elements
const examTimerInput = document.getElementById('exam-timer');
const questionPointSelect = document.getElementById('question-point');
const maxQuestionsSelect = document.getElementById('max-questions');
const randomizeQuestionsCheckbox = document.getElementById('randomize-questions');
const saveExamSettingsBtn = document.getElementById('save-exam-settings-btn');

const welcomeMessageInput = document.getElementById('welcome-message');
const termsTextInput = document.getElementById('terms-text');
const infoTextInput = document.getElementById('info-text');
const chairmanNameInput = document.getElementById('chairman-name');
const saveDisplaySettingsBtn = document.getElementById('save-display-settings-btn');

const motivationalMessagesInput = document.getElementById('motivational-messages');
const certificateTemplateInput = document.getElementById('certificate-template');
const saveCertificateSettingsBtn = document.getElementById('save-certificate-settings-btn');

const toggleAgamaCheckbox = document.getElementById('toggle-agama');
const togglePpknCheckbox = document.getElementById('toggle-ppkn');
const toggleSejarahCheckbox = document.getElementById('toggle-sejarah');
const toggleIpaCheckbox = document.getElementById('toggle-ipa');
const toggleIpsCheckbox = document.getElementById('toggle-ips');
const toggleMatematikaCheckbox = document.getElementById('toggle-matematika');
const toggleBahasaIndonesiaCheckbox = document.getElementById('toggle-bahasa-indonesia');
const toggleBahasaInggrisCheckbox = document.getElementById('toggle-bahasa-inggris');
const toggleMateriExtraCheckbox = document.getElementById('toggle-materi-extra');
const toggleMateriKhususCheckbox = document.getElementById('toggle-materi-khusus');
const toggleLogikaCheckbox = document.getElementById('toggle-logika');
const toggleCpnsCheckbox = document.getElementById('toggle-cpns');
const saveExamToggleBtn = document.getElementById('save-exam-toggle-btn');

// Participants Elements
const participantSearchInput = document.getElementById('participant-search');
const searchParticipantBtn = document.getElementById('search-participant-btn');
const exportParticipantsBtn = document.getElementById('export-participants-btn');
const exportFormatSelect = document.getElementById('export-format');
const filterDateInput = document.getElementById('filter-date');
const filterStatusSelect = document.getElementById('filter-status');
const filterExamSelect = document.getElementById('filter-exam');
const applyFiltersBtn = document.getElementById('apply-filters-btn');
const resetFiltersBtn = document.getElementById('reset-filters-btn');
const participantsTable = document.getElementById('participants-table');
const participantsListElement = document.getElementById('participants-list');
const prevPageBtn = document.getElementById('prev-page-btn');
const nextPageBtn = document.getElementById('next-page-btn');
const pageInfoElement = document.getElementById('page-info');

const participantModal = document.getElementById('participant-modal');
const participantModalTitle = document.getElementById('participant-modal-title');
const detailNameElement = document.getElementById('detail-name');
const detailStatusElement = document.getElementById('detail-status');
const detailSchoolElement = document.getElementById('detail-school');
const detailNisElement = document.getElementById('detail-nis');
const detailStudentPurposeElement = document.getElementById('detail-student-purpose');
const detailSchoolLevelElement = document.getElementById('detail-school-level');
const detailClassElement = document.getElementById('detail-class');
const detailAddressElement = document.getElementById('detail-address');
const detailWhatsappElement = document.getElementById('detail-whatsapp');
const detailEmailElement = document.getElementById('detail-email');
const detailGeneralPurposeElement = document.getElementById('detail-general-purpose');
const detailExamElement = document.getElementById('detail-exam');
const detailDateElement = document.getElementById('detail-date');
const detailStartTimeElement = document.getElementById('detail-start-time');
const detailEndTimeElement = document.getElementById('detail-end-time');
const detailDurationElement = document.getElementById('detail-duration');
const detailTotalQuestionsElement = document.getElementById('detail-total-questions');
const detailCorrectElement = document.getElementById('detail-correct');
const detailWrongElement = document.getElementById('detail-wrong');
const detailUnansweredElement = document.getElementById('detail-unanswered');
const detailScoreElement = document.getElementById('detail-score');
const detailCertificateCodeElement = document.getElementById('detail-certificate-code');
const viewCertificateBtn = document.getElementById('view-certificate-btn');
const closeDetailBtn = document.getElementById('close-detail-btn');

// App State
let currentTab = 'dashboard';
let currentQuestionCategory = 'all';
let questions = [];
let participants = [];
let currentPage = 1;
const itemsPerPage = 10;
let filteredParticipants = [];
let currentEditingQuestionId = null;

// Initialize the admin panel
function initAdmin() {
    // Load data
    loadQuestions();
    loadParticipants();
    loadSettings();
    
    // Set up event listeners
    setupAdminEventListeners();
    
    // Show dashboard by default
    showTab('dashboard');
}

// Load questions
function loadQuestions() {
    // In a real app, this would fetch from a database
    // For now, we'll use the questions from questions.js
    console.log('Questions loaded:', questions.length);
}

// Load participants
function loadParticipants() {
    // In a real app, this would fetch from a database
    // For demo, we'll create some sample data
    participants = [
        {
            id: 1,
            fullname: 'Uswatun Hasanah',
            status: 'pelajar',
            school: 'SMA Negeri 1 Situbondo',
            nis: '12345678',
            purpose: 'tugas-sekolah',
            schoolLevel: 'SMA',
            class: 'XII',
            exam: 'MATEMATIKA',
            date: '2025-05-15',
            startTime: '10:00',
            endTime: '12:00',
            duration: '120 menit',
            totalQuestions: 20,
            correct: 18,
            wrong: 2,
            unanswered: 0,
            score: 90,
            certificateCode: 'USWATUN-HASANAH/PELAJAR/SMA/MATEMATIKA/15052025/T9B3-S6M3/PERGUNU-STB'
        },
        {
            id: 2,
            fullname: 'Ahmad Fauzi',
            status: 'umum',
            address: 'Jl. Raya Situbondo No. 123',
            whatsapp: '6281234567890',
            email: 'ahmad@gmail.com',
            purpose: 'tes-iq',
            exam: 'UJIAN LOGIKA',
            date: '2025-05-16',
            startTime: '14:00',
            endTime: '15:30',
            duration: '90 menit',
            totalQuestions: 15,
            correct: 12,
            wrong: 3,
            unanswered: 0,
            score: 80,
            certificateCode: 'AHMAD-FAUZI/UMUM/LOGIKA/16052025/K8L2-M4N9/PERGUNU-STB'
        }
    ];
    
    filteredParticipants = [...participants];
    renderParticipants();
    updateDashboardStats();
}

// Load settings
function loadSettings() {
    // In a real app, this would load from a database or localStorage
    examTimerInput.value = 120;
    questionPointSelect.value = 1;
    maxQuestionsSelect.value = 20;
    randomizeQuestionsCheckbox.checked = true;
    
    welcomeMessageInput.value = 'Selamat Datang di Ujian Online PERGUNU Situbondo';
    termsTextInput.value = `Dengan mengikuti ujian ini, Anda menyetujui:
1. Tidak melakukan kecurangan selama ujian
2. Tidak membuka aplikasi lain selama ujian
3. Menyelesaikan ujian dalam waktu yang ditentukan
4. Semua jawaban yang sudah dikirim tidak dapat diubah
5. Hasil ujian akan digunakan untuk kepentingan akademik

Ujian ini dikembangkan oleh Cendhanu Tim Kreator PERGUNU Situbondo`;
    infoTextInput.value = 'Silakan pilih tingkat dan mata ujian yang sesuai';
    chairmanNameInput.value = 'Moh. Nuril Hudha, S.Pd., M.Si.';
    
    motivationalMessagesInput.value = `Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.
Hasil yang sangat baik! Teruslah belajar dan berkembang.
Bagus! Tingkatkan lagi pemahaman Anda untuk hasil yang lebih baik.
Anda sudah menunjukkan kemajuan, terus berusaha!
Jangan menyerah, teruslah berlatih untuk hasil yang lebih baik.`;
    
    // Set toggle switches
    const toggles = [
        toggleAgamaCheckbox, togglePpknCheckbox, toggleSejarahCheckbox,
        toggleIpaCheckbox, toggleIpsCheckbox, toggleMatematikaCheckbox,
        toggleBahasaIndonesiaCheckbox, toggleBahasaInggrisCheckbox,
        toggleMateriExtraCheckbox, toggleMateriKhususCheckbox,
        toggleLogikaCheckbox, toggleCpnsCheckbox
    ];
    
    toggles.forEach(toggle => {
        toggle.checked = true;
    });
}

// Set up event listeners
function setupAdminEventListeners() {
    // Tab navigation
    adminTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.id.replace('-tab', '');
            showTab(tabId);
        });
    });
    
    // Show code buttons
    showCodeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);
            
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                input.type = 'password';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });
    
    // Save code buttons
    saveLoginCodeBtn.addEventListener('click', saveLoginCode);
    saveCpnsCodeBtn.addEventListener('click', saveCpnsCode);
    saveBankCodeBtn.addEventListener('click', saveBankCode);
    saveAdminCodeBtn.addEventListener('click', saveAdminCode);
    
    // Question tabs
    questionTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            currentQuestionCategory = this.dataset.category;
            questionTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderQuestions();
        });
    });
    
    // Add question button
    addQuestionBtn.addEventListener('click', showAddQuestionModal);
    
    // AI generate button
    aiGenerateBtn.addEventListener('click', showAiModal);
    
    // Search questions
    searchBtn.addEventListener('click', searchQuestions);
    questionSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchQuestions();
        }
    });
    
    // Question form
    questionForm.addEventListener('submit', saveQuestion);
    cancelQuestionBtn.addEventListener('click', closeQuestionModal);
    
    // AI form
    generateQuestionsBtn.addEventListener('click', generateQuestionsWithAI);
    cancelAiBtn.addEventListener('click', closeAiModal);
    saveGeneratedBtn.addEventListener('click', saveGeneratedQuestions);
    
    // Save settings buttons
    saveExamSettingsBtn.addEventListener('click', saveExamSettings);
    saveDisplaySettingsBtn.addEventListener('click', saveDisplaySettings);
    saveCertificateSettingsBtn.addEventListener('click', saveCertificateSettings);
    saveExamToggleBtn.addEventListener('click', saveExamToggleSettings);
    
    // Participants
    searchParticipantBtn.addEventListener('click', searchParticipants);
    participantSearchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchParticipants();
        }
    });
    
    exportParticipantsBtn.addEventListener('click', exportParticipants);
    applyFiltersBtn.addEventListener('click', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
    prevPageBtn.addEventListener('click', goToPrevPage);
    nextPageBtn.addEventListener('click', goToNextPage);
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            participantModal.style.display = 'none';
        });
    });
    
    closeDetailBtn.addEventListener('click', function() {
        participantModal.style.display = 'none';
    });
}

// Show tab content
function showTab(tabId) {
    currentTab = tabId;
    
    // Update active tab
    adminTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.getElementById(`${tabId}-tab`).classList.add('active');
    
    // Show corresponding content
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    document.getElementById(`${tabId}-content`).classList.add('active');
    
    // Load data if needed
    if (tabId === 'dashboard') {
        updateDashboardStats();
    } else if (tabId === 'questions') {
        renderQuestions();
    } else if (tabId === 'participants') {
        renderParticipants();
    }
}

// Update dashboard statistics
function updateDashboardStats() {
    totalParticipantsElement.textContent = participants.length;
    
    const today = new Date().toISOString().split('T')[0];
    const todayExams = participants.filter(p => p.date === today).length;
    todayExamsElement.textContent = todayExams;
    
    const totalScore = participants.reduce((sum, p) => sum + p.score, 0);
    const averageScore = participants.length > 0 ? Math.round(totalScore / participants.length) : 0;
    averageScoreElement.textContent = averageScore;
    
    // Update recent activity
    renderRecentActivity();
}

// Render recent activity
function renderRecentActivity() {
    activityListElement.innerHTML = '';
    
    // Sort participants by date (newest first)
    const sortedParticipants = [...participants].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    // Show last 5 activities
    const recentActivities = sortedParticipants.slice(0, 5);
    
    recentActivities.forEach(participant => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        activityItem.innerHTML = `
            <div class="activity-info">
                <strong>${participant.fullname}</strong>
                <span>${participant.status === 'pelajar' ? 'Pelajar' : 'Umum'}</span>
            </div>
            <div class="activity-details">
                <span>${participant.exam}</span>
                <span>Skor: ${participant.score}</span>
                <span>${participant.date}</span>
            </div>
        `;
        
        activityListElement.appendChild(activityItem);
    });
}

// Save login code
function saveLoginCode() {
    const newCode = newLoginCodeInput.value.trim();
    const confirmCode = confirmLoginCodeInput.value.trim();
    
    if (!newCode || !confirmCode) {
        alert('Kode baru dan konfirmasi kode harus diisi');
        return;
    }
    
    if (newCode !== confirmCode) {
        alert('Kode baru dan konfirmasi kode tidak cocok');
        return;
    }
    
    // In a real app, this would save to a database
    currentLoginCodeInput.value = newCode;
    newLoginCodeInput.value = '';
    confirmLoginCodeInput.value = '';
    
    alert('Kode login berhasil diperbarui');
}

// Save CPNS code
function saveCpnsCode() {
    const newCode = newCpnsCodeInput.value.trim();
    const confirmCode = confirmCpnsCodeInput.value.trim();
    
    if (!newCode || !confirmCode) {
        alert('Kode baru dan konfirmasi kode harus diisi');
        return;
    }
    
    if (newCode !== confirmCode) {
        alert('Kode baru dan konfirmasi kode tidak cocok');
        return;
    }
    
    // In a real app, this would save to a database
    currentCpnsCodeInput.value = newCode;
    newCpnsCodeInput.value = '';
    confirmCpnsCodeInput.value = '';
    
    alert('Kode ujian CPNS berhasil diperbarui');
}

// Save bank soal code
function saveBankCode() {
    const newCode = newBankCodeInput.value.trim();
    const confirmCode = confirmBankCodeInput.value.trim();
    
    if (!newCode || !confirmCode) {
        alert('Kode baru dan konfirmasi kode harus diisi');
        return;
    }
    
    if (newCode !== confirmCode) {
        alert('Kode baru dan konfirmasi kode tidak cocok');
        return;
    }
    
    // In a real app, this would save to a database
    currentBankCodeInput.value = newCode;
    newBankCodeInput.value = '';
    confirmBankCodeInput.value = '';
    
    alert('Kode bank soal berhasil diperbarui');
}

// Save admin code
function saveAdminCode() {
    const newCode = newAdminCodeInput.value.trim();
    const confirmCode = confirmAdminCodeInput.value.trim();
    
    if (!newCode || !confirmCode) {
        alert('Kode baru dan konfirmasi kode harus diisi');
        return;
    }
    
    if (newCode !== confirmCode) {
        alert('Kode baru dan konfirmasi kode tidak cocok');
        return;
    }
    
    // In a real app, this would save to a database
    currentAdminCodeInput.value = newCode;
    newAdminCodeInput.value = '';
    confirmAdminCodeInput.value = '';
    
    alert('Kode admin berhasil diperbarui');
}

// Render questions
function renderQuestions() {
    questionsListElement.innerHTML = '';
    
    let filteredQuestions = [...questions];
    
    // Filter by category
    if (currentQuestionCategory !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => q.category === currentQuestionCategory);
    }
    
    // Filter by search term if any
    const searchTerm = questionSearchInput.value.trim().toLowerCase();
    if (searchTerm) {
        filteredQuestions = filteredQuestions.filter(q => 
            q.text.toLowerCase().includes(searchTerm) ||
            q.explanation.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filteredQuestions.length === 0) {
        questionsListElement.innerHTML = '<p class="no-results">Tidak ada soal yang ditemukan</p>';
        return;
    }
    
    filteredQuestions.forEach((question, index) => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        
        questionItem.innerHTML = `
            <div class="question-header">
                <h4>${index + 1}. ${question.text}</h4>
                <span class="question-category ${question.category}">${question.category.toUpperCase()}</span>
            </div>
            <div class="question-options">
                <ol type="A">
                    ${question.options.map((opt, i) => `
                        <li class="${i === question.correctAnswer.charCodeAt(0) - 65 ? 'correct' : ''}">${opt}</li>
                    `).join('')}
                </ol>
            </div>
            <div class="question-explanation">
                <p><strong>Penjelasan:</strong> ${question.explanation}</p>
            </div>
            <div class="question-footer">
                <span class="question-difficulty ${question.difficulty}">${getDifficultyLabel(question.difficulty)}</span>
                <div class="question-actions">
                    <button class="edit-question-btn" data-id="${question.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="delete-question-btn" data-id="${question.id}">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            </div>
        `;
        
        questionsListElement.appendChild(questionItem);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-question-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionId = this.dataset.id;
            editQuestion(questionId);
        });
    });
    
    document.querySelectorAll('.delete-question-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionId = this.dataset.id;
            deleteQuestion(questionId);
        });
    });
}

// Get difficulty label
function getDifficultyLabel(difficulty) {
    switch (difficulty) {
        case 'easy': return 'Mudah';
        case 'medium': return 'Sedang';
        case 'hard': return 'Sulit';
        default: return 'Tidak diketahui';
    }
}

// Search questions
function searchQuestions() {
    renderQuestions();
}

// Show add question modal
function showAddQuestionModal() {
    currentEditingQuestionId = null;
    questionModalTitle.textContent = 'Tambah Soal Baru';
    questionForm.reset();
    questionModal.style.display = 'block';
}

// Show edit question modal
function editQuestion(questionId) {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    currentEditingQuestionId = questionId;
    questionModalTitle.textContent = 'Edit Soal';
    
    // Fill form with question data
    questionCategorySelect.value = question.category;
    questionTextInput.value = question.text;
    
    // Set options
    optionAInput.value = question.options[0];
    optionBInput.value = question.options[1];
    optionCInput.value = question.options[2];
    optionDInput.value = question.options[3];
    optionEInput.value = question.options[4] || '';
    
    // Set correct answer
    const correctIndex = question.correctAnswer.charCodeAt(0) - 65;
    document.querySelectorAll('input[name="correct-option"]').forEach((radio, i) => {
        radio.checked = (i === correctIndex);
    });
    
    explanationInput.value = question.explanation;
    questionLevelSelect.value = question.difficulty;
    
    questionModal.style.display = 'block';
}

// Close question modal
function closeQuestionModal() {
    questionModal.style.display = 'none';
}

// Save question
function saveQuestion(e) {
    e.preventDefault();
    
    // Validate form
    if (!questionTextInput.value.trim()) {
        alert('Pertanyaan harus diisi');
        return;
    }
    
    const options = [
        optionAInput.value.trim(),
        optionBInput.value.trim(),
        optionCInput.value.trim(),
        optionDInput.value.trim()
    ];
    
    if (optionEInput.value.trim()) {
        options.push(optionEInput.value.trim());
    }
    
    if (options.some(opt => !opt)) {
        alert('Semua pilihan jawaban harus diisi');
        return;
    }
    
    const selectedCorrect = document.querySelector('input[name="correct-option"]:checked');
    if (!selectedCorrect) {
        alert('Pilih jawaban yang benar');
        return;
    }
    
    if (!explanationInput.value.trim()) {
        alert('Penjelasan jawaban harus diisi');
        return;
    }
    
    // Create or update question
    const questionData = {
        category: questionCategorySelect.value,
        text: questionTextInput.value.trim(),
        options: options,
        correctAnswer: selectedCorrect.value,
        explanation: explanationInput.value.trim(),
        difficulty: questionLevelSelect.value
    };
    
    if (currentEditingQuestionId) {
        // Update existing question
        const questionIndex = questions.findIndex(q => q.id === currentEditingQuestionId);
        if (questionIndex !== -1) {
            questions[questionIndex] = {
                ...questions[questionIndex],
                ...questionData
            };
        }
    } else {
        // Add new question
        const newQuestion = {
            id: Date.now().toString(),
            ...questionData
        };
        questions.push(newQuestion);
    }
    
    // Close modal and refresh list
    closeQuestionModal();
    renderQuestions();
    
    alert('Soal berhasil disimpan');
}

// Delete question
function deleteQuestion(questionId) {
    if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        questions = questions.filter(q => q.id !== questionId);
        renderQuestions();
        alert('Soal berhasil dihapus');
    }
}

// Show AI modal
function showAiModal() {
    aiModal.style.display = 'block';
    aiResultsElement.style.display = 'none';
    aiLoadingElement.style.display = 'none';
}

// Close AI modal
function closeAiModal() {
    aiModal.style.display = 'none';
}

// Generate questions with AI
function generateQuestionsWithAI() {
    const apiKey = aiApiKeyInput.value.trim();
    const category = aiCategorySelect.value;
    const topic = aiTopicInput.value.trim();
    const difficulty = aiDifficultySelect.value;
    const count = parseInt(aiCountInput.value);
    
    if (!apiKey) {
        alert('Masukkan API Key AI terlebih dahulu');
        return;
    }
    
    if (!topic) {
        alert('Masukkan topik soal terlebih dahulu');
        return;
    }
    
    // Show loading
    aiLoadingElement.style.display = 'block';
    generatedQuestionsElement.innerHTML = '';
    
    // In a real app, this would call an AI API
    // For demo, we'll simulate with a timeout
    setTimeout(() => {
        aiLoadingElement.style.display = 'none';
        aiResultsElement.style.display = 'block';
        
        // Generate sample questions (in a real app, these would come from the AI)
        const sampleQuestions = [
            {
                text: `Apa ibukota ${topic}?`,
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'A',
                explanation: `Ibukota ${topic} adalah...`,
                difficulty: difficulty
            },
            {
                text: `Siapa penemu ${topic}?`,
                options: ['Option A', 'Option B', 'Option C', 'Option D'],
                correctAnswer: 'B',
                explanation: `Penemu ${topic} adalah...`,
                difficulty: difficulty
            }
        ];
        
        // Display generated questions
        generatedQuestionsElement.innerHTML = sampleQuestions.map((q, i) => `
            <div class="generated-question">
                <h5>Soal ${i + 1}</h5>
                <p><strong>Pertanyaan:</strong> ${q.text}</p>
                <p><strong>Jawaban benar:</strong> ${q.correctAnswer}</p>
                <p><strong>Penjelasan:</strong> ${q.explanation}</p>
                <p><strong>Tingkat kesulitan:</strong> ${getDifficultyLabel(q.difficulty)}</p>
            </div>
        `).join('');
    }, 2000);
}

// Save generated questions
function saveGeneratedQuestions() {
    // In a real app, this would save the generated questions
    alert('Soal yang digenerate akan disimpan ke bank soal');
    closeAiModal();
    renderQuestions();
}

// Save exam settings
function saveExamSettings() {
    const timer = parseInt(examTimerInput.value);
    const point = parseInt(questionPointSelect.value);
    const maxQuestions = parseInt(maxQuestionsSelect.value);
    const randomize = randomizeQuestionsCheckbox.checked;
    
    // In a real app, this would save to a database
    alert('Pengaturan ujian berhasil disimpan');
}

// Save display settings
function saveDisplaySettings() {
    const welcomeMessage = welcomeMessageInput.value.trim();
    const termsText = termsTextInput.value.trim();
    const infoText = infoTextInput.value.trim();
    const chairmanName = chairmanNameInput.value.trim();
    
    // In a real app, this would save to a database
    alert('Pengaturan tampilan berhasil disimpan');
}

// Save certificate settings
function saveCertificateSettings() {
    const motivationalMessages = motivationalMessagesInput.value.trim();
    
    // In a real app, this would save to a database
    alert('Pengaturan sertifikat berhasil disimpan');
}

// Save exam toggle settings
function saveExamToggleSettings() {
    const enabledExams = {
        agama: toggleAgamaCheckbox.checked,
        ppkn: togglePpknCheckbox.checked,
        sejarah: toggleSejarahCheckbox.checked,
        ipa: toggleIpaCheckbox.checked,
        ips: toggleIpsCheckbox.checked,
        matematika: toggleMatematikaCheckbox.checked,
        bahasa_indonesia: toggleBahasaIndonesiaCheckbox.checked,
        bahasa_inggris: toggleBahasaInggrisCheckbox.checked,
        materi_extra: toggleMateriExtraCheckbox.checked,
        materi_khusus: toggleMateriKhususCheckbox.checked,
        logika: toggleLogikaCheckbox.checked,
        cpns: toggleCpnsCheckbox.checked
    };
    
    // In a real app, this would save to a database
    alert('Pengaturan aktif/nonaktif ujian berhasil disimpan');
}

// Render participants
function renderParticipants() {
    participantsListElement.innerHTML = '';
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredParticipants.length);
    const paginatedParticipants = filteredParticipants.slice(startIndex, endIndex);
    
    if (paginatedParticipants.length === 0) {
        participantsListElement.innerHTML = '<tr><td colspan="8" class="no-results">Tidak ada peserta yang ditemukan</td></tr>';
        return;
    }
    
    paginatedParticipants.forEach((participant, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>${participant.fullname}</td>
            <td>${participant.status === 'pelajar' ? 'Pelajar' : 'Umum'}</td>
            <td>${participant.exam}</td>
            <td>${participant.date}</td>
            <td>${participant.score}</td>
            <td>${participant.certificateCode}</td>
            <td>
                <button class="view-detail-btn" data-id="${participant.id}">
                    <i class="fas fa-eye"></i> Detail
                </button>
            </td>
        `;
        
        participantsListElement.appendChild(row);
    });
    
    // Update pagination
    updatePagination();
    
    // Add event listeners to detail buttons
    document.querySelectorAll('.view-detail-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const participantId = this.dataset.id;
            showParticipantDetail(participantId);
        });
    });
}

// Show participant detail
function showParticipantDetail(participantId) {
    const participant = participants.find(p => p.id === participantId);
    if (!participant) return;
    
    participantModalTitle.textContent = `Detail Peserta: ${participant.fullname}`;
    
    // Set personal info
    detailNameElement.textContent = participant.fullname;
    detailStatusElement.textContent = participant.status === 'pelajar' ? 'Pelajar' : 'Umum';
    
    if (participant.status === 'pelajar') {
        document.getElementById('detail-student-info').style.display = 'block';
        document.getElementById('detail-general-info').style.display = 'none';
        
        detailSchoolElement.textContent = participant.school;
        detailNisElement.textContent = participant.nis;
        detailStudentPurposeElement.textContent = getPurposeLabel(participant.purpose);
        detailSchoolLevelElement.textContent = participant.schoolLevel;
        detailClassElement.textContent = participant.class;
    } else {
        document.getElementById('detail-student-info').style.display = 'none';
        document.getElementById('detail-general-info').style.display = 'block';
        
        detailAddressElement.textContent = participant.address;
        detailWhatsappElement.textContent = participant.whatsapp;
        detailEmailElement.textContent = participant.email;
        detailGeneralPurposeElement.textContent = getPurposeLabel(participant.purpose);
    }
    
    // Set exam info
    detailExamElement.textContent = participant.exam;
    detailDateElement.textContent = participant.date;
    detailStartTimeElement.textContent = participant.startTime;
    detailEndTimeElement.textContent = participant.endTime;
    detailDurationElement.textContent = participant.duration;
    
    // Set results
    detailTotalQuestionsElement.textContent = participant.totalQuestions;
    detailCorrectElement.textContent = participant.correct;
    detailWrongElement.textContent = participant.wrong;
    detailUnansweredElement.textContent = participant.unanswered;
    detailScoreElement.textContent = participant.score;
    detailCertificateCodeElement.textContent = participant.certificateCode;
    
    participantModal.style.display = 'block';
}

// Get purpose label
function getPurposeLabel(purpose) {
    switch (purpose) {
        case 'tugas-sekolah': return 'Tugas Sekolah';
        case 'tugas-ulangan': return 'Tugas Ulangan';
        case 'tes-belajar': return 'Tes dan Belajar';
        case 'tes-iq': return 'Tes IQ';
        case 'ujian-cpns': return 'Ujian CPNS/P3K';
        default: return purpose;
    }
}

// Search participants
function searchParticipants() {
    const searchTerm = participantSearchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        filteredParticipants = [...participants];
    } else {
        filteredParticipants = participants.filter(p => 
            p.fullname.toLowerCase().includes(searchTerm) ||
            (p.status === 'pelajar' && p.school.toLowerCase().includes(searchTerm)) ||
            (p.status === 'pelajar' && p.nis.toLowerCase().includes(searchTerm)) ||
            (p.status === 'umum' && p.whatsapp.toLowerCase().includes(searchTerm)) ||
            (p.status === 'umum' && p.email.toLowerCase().includes(searchTerm)) ||
            p.exam.toLowerCase().includes(searchTerm) ||
            p.certificateCode.toLowerCase().includes(searchTerm)
        );
    }
    
    currentPage = 1;
    renderParticipants();
}

// Apply filters
function applyFilters() {
    const date = filterDateInput.value;
    const status = filterStatusSelect.value;
    const exam = filterExamSelect.value;
    
    filteredParticipants = participants.filter(p => {
        let matches = true;
        
        if (date) {
            matches = matches && (p.date === date);
        }
        
        if (status !== 'all') {
            matches = matches && (p.status === status);
        }
        
        if (exam !== 'all') {
            matches = matches && (p.exam === exam);
        }
        
        return matches;
    });
    
    currentPage = 1;
    renderParticipants();
}

// Reset filters
function resetFilters() {
    filterDateInput.value = '';
    filterStatusSelect.value = 'all';
    filterExamSelect.value = 'all';
    filteredParticipants = [...participants];
    currentPage = 1;
    renderParticipants();
}

// Export participants
function exportParticipants() {
    const format = exportFormatSelect.value;
    
    // In a real app, this would generate and download the file
    alert(`Data peserta akan diexport dalam format ${format.toUpperCase()}`);
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
    
    pageInfoElement.textContent = `Halaman ${currentPage} dari ${totalPages}`;
    
    prevPageBtn.disabled = (currentPage === 1);
    nextPageBtn.disabled = (currentPage === totalPages || totalPages === 0);
}

// Go to previous page
function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderParticipants();
    }
}

// Go to next page
function goToNextPage() {
    const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
    
    if (currentPage < totalPages) {
        currentPage++;
        renderParticipants();
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', initAdmin);
