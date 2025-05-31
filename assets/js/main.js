// DOM Elements
const screens = document.querySelectorAll('.screen');
const welcomeScreen = document.getElementById('welcome-screen');
const termsScreen = document.getElementById('terms-screen');
const participantFormScreen = document.getElementById('participant-form-screen');
const examLevelScreen = document.getElementById('exam-level-screen');
const examScreen = document.getElementById('exam-screen');
const resultsScreen = document.getElementById('results-screen');
const certificateScreen = document.getElementById('certificate-screen');

// Audio Elements
const openingAudio = document.getElementById('openingAudio');
const correctAudio = document.getElementById('correctAudio');
const wrongAudio = document.getElementById('wrongAudio');
const applauseAudio = document.getElementById('applauseAudio');
const buttonAudio = document.getElementById('buttonAudio');

// Buttons
const loginBtn = document.getElementById('login-btn');
const termsAcceptBtn = document.getElementById('terms-accept-btn');
const agreeTermsCheckbox = document.getElementById('agree-terms');
const saveParticipantBtn = document.getElementById('save-participant-btn');
const startExamBtn = document.getElementById('start-exam-btn');
const finishExamBtn = document.getElementById('finish-exam-btn');
const skipQuestionBtn = document.getElementById('skip-question-btn');
const unansweredBtn = document.getElementById('unanswered-btn');
const viewCertificateBtn = document.getElementById('view-certificate-btn');
const retakeExamBtn = document.getElementById('retake-exam-btn');
const printCertificateBtn = document.getElementById('print-certificate-btn');
const backToResultsBtn = document.getElementById('back-to-results-btn');

// Form Elements
const examCodeInput = document.getElementById('exam-code');
const participantForm = document.getElementById('participant-form');
const fullnameInput = document.getElementById('fullname');
const statusRadios = document.querySelectorAll('input[name="status"]');
const studentFields = document.getElementById('student-fields');
const generalFields = document.getElementById('general-fields');
const schoolInput = document.getElementById('school');
const nisInput = document.getElementById('nis');
const studentPurposeSelect = document.getElementById('student-purpose');
const schoolLevelSelect = document.getElementById('school-level');
const addressInput = document.getElementById('address');
const gpsBtn = document.getElementById('gps-btn');
const whatsappInput = document.getElementById('whatsapp');
const emailInput = document.getElementById('email');
const generalPurposeSelect = document.getElementById('general-purpose');
const cpnsLicenseContainer = document.getElementById('cpns-license-container');
const cpnsLicenseInput = document.getElementById('cpns-license');
const verifyLicenseBtn = document.getElementById('verify-license-btn');
const subjectSelection = document.getElementById('subject-selection');
const studentSubjects = document.getElementById('student-subjects');
const generalSubjects = document.getElementById('general-subjects');

// Exam Elements
const examTitle = document.getElementById('exam-title');
const timerElement = document.getElementById('timer');
const currentQuestionElement = document.getElementById('current-question');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const explanationContainer = document.getElementById('explanation-container');
const explanationText = document.getElementById('explanation-text');
const progressText = document.getElementById('progress-text');
const progressFill = document.querySelector('.progress-fill');
const timeWarning = document.getElementById('time-warning');

// Results Elements
const totalQuestionsElement = document.getElementById('total-questions');
const correctAnswersElement = document.getElementById('correct-answers');
const wrongAnswersElement = document.getElementById('wrong-answers');
const unansweredElement = document.getElementById('unanswered');
const scoreElement = document.getElementById('score');

// Certificate Elements
const certificateName = document.getElementById('certificate-name');
const certificateScore = document.getElementById('certificate-score');
const certificateMotivation = document.getElementById('certificate-motivation');
const certificateDate = document.getElementById('certificate-date');
const certificateChairman = document.getElementById('certificate-chairman');
const certificateCode = document.getElementById('certificate-code');

// Floating Buttons
const floatingButtons = document.querySelector('.floating-buttons');
const shareBtn = document.querySelector('.share-btn');
const whatsappBtn = document.querySelector('.whatsapp-btn');
const bankSoalBtn = document.querySelector('.bank-soal-btn');
const adminBtn = document.querySelector('.admin-btn');

// Modals
const shareModal = document.getElementById('share-modal');
const bankSoalModal = document.getElementById('bank-soal-modal');
const adminModal = document.getElementById('admin-modal');
const closeModals = document.querySelectorAll('.close-modal');
const bankCodeInput = document.getElementById('bank-code');
const verifyBankCodeBtn = document.getElementById('verify-bank-code-btn');
const adminCodeInput = document.getElementById('admin-code');
const verifyAdminCodeBtn = document.getElementById('verify-admin-code-btn');

// Text Elements
const greetingText = document.getElementById('greeting-text');
const welcomeText = document.getElementById('welcome-text');
const termsText = document.getElementById('terms-text');
const infoText = document.getElementById('info-text');

// App State
let currentScreen = 'welcome';
let participantData = {};
let examData = {};
let questions = [];
let currentQuestionIndex = 0;
let answeredQuestions = [];
let unansweredQuestions = [];
let timer;
let timeLeft = 120 * 60; // 120 minutes in seconds
let examStarted = false;
let examFinished = false;
let results = {
    total: 0,
    correct: 0,
    wrong: 0,
    unanswered: 0,
    score: 0
};

// Default Codes
const DEFAULT_CODES = {
    login: '12345',
    cpns: 'OPENLOCK-1945',
    bank: 'OPENLOCK-1926',
    admin: '65614222'
};

// Motivational Messages
const MOTIVATIONAL_MESSAGES = [
    "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.",
    "Hasil yang sangat baik! Teruslah belajar dan berkembang.",
    "Bagus! Tingkatkan lagi pemahaman Anda untuk hasil yang lebih baik.",
    "Anda sudah menunjukkan kemajuan, terus berusaha!",
    "Jangan menyerah, teruslah berlatih untuk hasil yang lebih baik."
];

// Initialize the app
function init() {
    // Play opening audio
    openingAudio.play();
    
    // Load questions from questions.js
    loadQuestions();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check if there's saved participant data
    const savedData = localStorage.getItem('participantData');
    if (savedData) {
        participantData = JSON.parse(savedData);
    }
    
    // Check if there's saved exam data
    const savedExam = localStorage.getItem('examData');
    if (savedExam) {
        examData = JSON.parse(savedExam);
    }
}

// Load questions from questions.js
function loadQuestions() {
    // This will be populated from questions.js
    console.log('Questions loaded:', questions.length);
}

// Set up event listeners
function setupEventListeners() {
    // Login button
    loginBtn.addEventListener('click', handleLogin);
    
    // Terms checkbox
    agreeTermsCheckbox.addEventListener('change', function() {
        termsAcceptBtn.disabled = !this.checked;
    });
    
    // Terms accept button
    termsAcceptBtn.addEventListener('click', function() {
        navigateTo('participant-form');
    });
    
    // Status radio buttons
    statusRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'pelajar') {
                studentFields.style.display = 'block';
                generalFields.style.display = 'none';
            } else {
                studentFields.style.display = 'none';
                generalFields.style.display = 'block';
            }
        });
    });
    
    // GPS button
    gpsBtn.addEventListener('click', getLocation);
    
    // Participant form submit
    participantForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveParticipantData();
    });
    
    // School level change
    schoolLevelSelect.addEventListener('change', function() {
        updateLevelOptions();
    });
    
    // General purpose change
    generalPurposeSelect.addEventListener('change', function() {
        if (this.value === 'ujian-cpns') {
            cpnsLicenseContainer.style.display = 'block';
            subjectSelection.style.display = 'none';
            startExamBtn.style.display = 'none';
        } else {
            cpnsLicenseContainer.style.display = 'none';
            subjectSelection.style.display = 'block';
            startExamBtn.style.display = 'block';
        }
    });
    
    // Verify CPNS license
    verifyLicenseBtn.addEventListener('click', function() {
        if (cpnsLicenseInput.value === DEFAULT_CODES.cpns) {
            cpnsLicenseContainer.style.display = 'none';
            subjectSelection.style.display = 'block';
            startExamBtn.style.display = 'block';
        } else {
            alert('Kode lisensi tidak valid. Silakan coba lagi.');
        }
    });
    
    // Level buttons
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            examData.level = this.dataset.level || this.dataset.exam;
            document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (participantData.status === 'pelajar') {
                subjectSelection.style.display = 'block';
            } else {
                if (examData.level === 'cpns') {
                    cpnsLicenseContainer.style.display = 'block';
                    subjectSelection.style.display = 'none';
                } else {
                    subjectSelection.style.display = 'block';
                }
            }
            
            startExamBtn.style.display = 'block';
        });
    });
    
    // Subject buttons
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            examData.subject = this.dataset.subject;
            document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter questions based on subject
            examData.questions = questions.filter(q => q.category === examData.subject);
            examData.totalQuestions = examData.questions.length;
            
            // Update info text
            infoText.textContent = `Anda akan mengerjakan ${examData.questions.length} soal ${examData.subject.toUpperCase()}`;
        });
    });
    
    // Start exam button
    startExamBtn.addEventListener('click', startExam);
    
    // Option buttons (delegated)
    optionsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('option-btn') {
            selectAnswer(e.target);
        }
    });
    
    // Skip question button
    skipQuestionBtn.addEventListener('click', skipQuestion);
    
    // Unanswered questions button
    unansweredBtn.addEventListener('click', showUnansweredQuestions);
    
    // Finish exam button
    finishExamBtn.addEventListener('click', finishExam);
    
    // View certificate button
    viewCertificateBtn.addEventListener('click', viewCertificate);
    
    // Retake exam button
    retakeExamBtn.addEventListener('click', retakeExam);
    
    // Print certificate button
    printCertificateBtn.addEventListener('click', printCertificate);
    
    // Back to results button
    backToResultsBtn.addEventListener('click', function() {
        navigateTo('results');
    });
    
    // Floating buttons
    shareBtn.addEventListener('click', showShareModal);
    whatsappBtn.addEventListener('click', contactAdmin);
    bankSoalBtn.addEventListener('click', showBankSoalModal);
    adminBtn.addEventListener('click', showAdminModal);
    
    // Close modals
    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            shareModal.style.display = 'none';
            bankSoalModal.style.display = 'none';
            adminModal.style.display = 'none';
        });
    });
    
    // Verify bank code
    verifyBankCodeBtn.addEventListener('click', function() {
        if (bankCodeInput.value === DEFAULT_CODES.bank) {
            window.location.href = 'admin.html#questions';
        } else {
            alert('Kode bank soal tidak valid. Silakan coba lagi.');
        }
    });
    
    // Verify admin code
    verifyAdminCodeBtn.addEventListener('click', function() {
        if (adminCodeInput.value === DEFAULT_CODES.admin) {
            window.location.href = 'admin.html';
        } else {
            alert('Kode admin tidak valid. Silakan coba lagi.');
        }
    });
    
    // Share options
    document.querySelectorAll('.share-option').forEach(option => {
        option.addEventListener('click', function() {
            const platform = this.classList[1];
            shareExam(platform);
        });
    });
    
    // Window resize
    window.addEventListener('resize', handleResize);
}

// Handle login
function handleLogin() {
    const code = examCodeInput.value.trim();
    
    if (code === DEFAULT_CODES.login) {
        playButtonSound();
        navigateTo('terms');
    } else {
        alert('Kode ujian tidak valid. Silakan coba lagi.');
    }
}

// Navigate between screens
function navigateTo(screenName) {
    // Hide all screens
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the target screen
    switch (screenName) {
        case 'welcome':
            currentScreen = 'welcome';
            welcomeScreen.classList.add('active');
            break;
        case 'terms':
            currentScreen = 'terms';
            termsScreen.classList.add('active');
            break;
        case 'participant-form':
            currentScreen = 'participant-form';
            participantFormScreen.classList.add('active');
            break;
        case 'exam-level':
            currentScreen = 'exam-level';
            examLevelScreen.classList.add('active');
            
            // Show appropriate levels based on participant status
            if (participantData.status === 'pelajar') {
                document.getElementById('student-levels').style.display = 'block';
                document.getElementById('general-levels').style.display = 'none';
                
                // Show appropriate class levels based on school level
                updateLevelOptions();
            } else {
                document.getElementById('student-levels').style.display = 'none';
                document.getElementById('general-levels').style.display = 'block';
            }
            break;
        case 'exam':
            currentScreen = 'exam';
            examScreen.classList.add('active');
            break;
        case 'results':
            currentScreen = 'results';
            resultsScreen.classList.add('active');
            break;
        case 'certificate':
            currentScreen = 'certificate';
            certificateScreen.classList.add('active');
            break;
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Save participant data
function saveParticipantData() {
    participantData = {
        fullname: fullnameInput.value.trim(),
        status: document.querySelector('input[name="status"]:checked').value,
        timestamp: new Date().toISOString()
    };
    
    if (participantData.status === 'pelajar') {
        participantData.school = schoolInput.value.trim();
        participantData.nis = nisInput.value.trim();
        participantData.purpose = studentPurposeSelect.value;
        participantData.schoolLevel = schoolLevelSelect.value;
    } else {
        participantData.address = addressInput.value.trim();
        participantData.whatsapp = whatsappInput.value.trim();
        participantData.email = emailInput.value.trim();
        participantData.purpose = generalPurposeSelect.value;
    }
    
    // Validate required fields
    if (!participantData.fullname) {
        alert('Nama lengkap harus diisi');
        return;
    }
    
    if (participantData.status === 'pelajar') {
        if (!participantData.school || !participantData.nis) {
            alert('Nama sekolah dan NIS harus diisi');
            return;
        }
    } else {
        if (!participantData.address || !participantData.whatsapp || !participantData.email) {
            alert('Alamat, nomor WhatsApp, dan email harus diisi');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[a-z0-9._%+-]+@(gmail|yahoo|hotmail)\.com$/i;
        if (!emailRegex.test(participantData.email)) {
            alert('Format email tidak valid. Gunakan @gmail.com, @yahoo.com, atau @hotmail.com');
            return;
        }
        
        // Validate WhatsApp number
        const whatsappRegex = /^\d{10,13}$/;
        if (!whatsappRegex.test(participantData.whatsapp)) {
            alert('Nomor WhatsApp harus terdiri dari 10-13 digit angka');
            return;
        }
    }
    
    // Save to localStorage
    localStorage.setItem('participantData', JSON.stringify(participantData));
    
    // Navigate to exam level selection
    navigateTo('exam-level');
}

// Get location using GPS
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // In a real app, you would use a geocoding API to get the address
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // For demo purposes, we'll just show the coordinates
                addressInput.value = `Lokasi: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                
                // In a real app, you would call a geocoding API here
                // Example: getAddressFromCoordinates(latitude, longitude);
            },
            function(error) {
                console.error('Error getting location:', error);
                alert('Tidak dapat mendapatkan lokasi. Silakan masukkan alamat secara manual.');
            }
        );
    } else {
        alert('Geolocation tidak didukung di browser Anda. Silakan masukkan alamat secara manual.');
    }
}

// Update level options based on school level
function updateLevelOptions() {
    const schoolLevel = schoolLevelSelect.value;
    
    // Hide all level groups
    document.querySelectorAll('.level-group').forEach(group => {
        group.style.display = 'none';
    });
    
    // Show the appropriate level group
    if (schoolLevel === 'SD') {
        document.querySelector('.sd-levels').style.display = 'block';
    } else if (schoolLevel === 'SMP') {
        document.querySelector('.smp-levels').style.display = 'block';
    } else if (schoolLevel === 'SMA') {
        document.querySelector('.sma-levels').style.display = 'block';
    }
}

// Start exam
function startExam() {
    if (!examData.questions || examData.questions.length === 0) {
        alert('Silakan pilih mata ujian terlebih dahulu');
        return;
    }
    
    // Initialize exam data
    examData.startTime = new Date().toISOString();
    examData.currentQuestionIndex = 0;
    examData.answeredQuestions = [];
    examData.unansweredQuestions = [...examData.questions];
    
    // Save to localStorage
    localStorage.setItem('examData', JSON.stringify(examData));
    
    // Start timer
    startTimer();
    
    // Navigate to exam screen
    navigateTo('exam');
    
    // Load the first question
    loadQuestion(0);
}

// Start timer
function startTimer() {
    examStarted = true;
    timeLeft = 120 * 60; // 120 minutes in seconds
    
    // Update timer immediately
    updateTimer();
    
    // Start timer interval
    timer = setInterval(function() {
        timeLeft--;
        updateTimer();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            finishExam();
        } else if (timeLeft === 10 * 60) { // 10 minutes left
            showTimeWarning();
        } else if (timeLeft === 1 * 60) { // 1 minute left
            hideTimeWarning();
        }
    }, 1000);
}

// Update timer display
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Make timer bigger when 10 minutes left
    if (timeLeft <= 10 * 60) {
        timerElement.classList.add('timer-warning');
    } else {
        timerElement.classList.remove('timer-warning');
    }
}

// Show time warning
function showTimeWarning() {
    timeWarning.style.display = 'block';
}

// Hide time warning
function hideTimeWarning() {
    timeWarning.style.display = 'none';
}

// Load question
function loadQuestion(index) {
    if (index < 0 || index >= examData.questions.length) {
        return;
    }
    
    currentQuestionIndex = index;
    const question = examData.questions[index];
    
    // Update question number
    currentQuestionElement.textContent = index + 1;
    
    // Update question text
    questionTextElement.textContent = question.text;
    
    // Clear options
    optionsContainer.innerHTML = '';
    
    // Add options
    question.options.forEach((option, i) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = `${String.fromCharCode(65 + i)}. ${option}`;
        optionBtn.dataset.option = String.fromCharCode(65 + i);
        optionsContainer.appendChild(optionBtn);
    });
    
    // Hide explanation
    explanationContainer.style.display = 'none';
    
    // Update progress
    updateProgress();
}

// Select answer
function selectAnswer(selectedOption) {
    if (examFinished) return;
    
    const question = examData.questions[currentQuestionIndex];
    const selectedOptionLetter = selectedOption.dataset.option;
    
    // Check if answer is correct
    const isCorrect = selectedOptionLetter === question.correctAnswer;
    
    // Play sound
    if (isCorrect) {
        correctAudio.play();
    } else {
        wrongAudio.play();
    }
    
    // Mark question as answered
    question.answered = true;
    question.selectedAnswer = selectedOptionLetter;
    question.isCorrect = isCorrect;
    
    // Update answered questions
    const answeredIndex = examData.answeredQuestions.findIndex(q => q.id === question.id);
    if (answeredIndex === -1) {
        examData.answeredQuestions.push(question);
    }
    
    // Remove from unanswered questions
    examData.unansweredQuestions = examData.unansweredQuestions.filter(q => q.id !== question.id);
    
    // Highlight selected option
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected', 'correct', 'wrong');
        
        if (btn.dataset.option === selectedOptionLetter) {
            btn.classList.add('selected');
            btn.classList.add(isCorrect ? 'correct' : 'wrong');
        }
        
        if (btn.dataset.option === question.correctAnswer) {
            btn.classList.add('correct');
        }
    });
    
    // Show explanation
    explanationText.textContent = question.explanation;
    explanationContainer.style.display = 'block';
    
    // Disable all options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Save to localStorage
    localStorage.setItem('examData', JSON.stringify(examData));
    
    // Update progress
    updateProgress();
}

// Skip question
function skipQuestion() {
    if (currentQuestionIndex < examData.questions.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    } else {
        loadQuestion(0);
    }
}

// Show unanswered questions
function showUnansweredQuestions() {
    if (examData.unansweredQuestions.length === 0) {
        alert('Semua soal telah dijawab');
        return;
    }
    
    // Find the first unanswered question
    const nextUnanswered = examData.questions.findIndex(q => 
        !q.answered && q.id === examData.unansweredQuestions[0].id
    );
    
    if (nextUnanswered !== -1) {
        loadQuestion(nextUnanswered);
    }
}

// Update progress
function updateProgress() {
    const total = examData.questions.length;
    const answered = examData.answeredQuestions.length;
    
    progressText.textContent = `${answered}/${total}`;
    progressFill.style.width = `${(answered / total) * 100}%`;
}

// Finish exam
function finishExam() {
    examFinished = true;
    clearInterval(timer);
    
    // Calculate results
    calculateResults();
    
    // Save exam data
    examData.endTime = new Date().toISOString();
    examData.results = results;
    localStorage.setItem('examData', JSON.stringify(examData));
    
    // Navigate to results screen
    navigateTo('results');
}

// Calculate results
function calculateResults() {
    const total = examData.questions.length;
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    
    examData.questions.forEach(question => {
        if (question.answered) {
            if (question.isCorrect) {
                correct++;
            } else {
                wrong++;
            }
        } else {
            unanswered++;
        }
    });
    
    results = {
        total,
        correct,
        wrong,
        unanswered,
        score: Math.round((correct / total) * 100)
    };
    
    // Update results display
    totalQuestionsElement.textContent = total;
    correctAnswersElement.textContent = correct;
    wrongAnswersElement.textContent = wrong;
    unansweredElement.textContent = unanswered;
    scoreElement.textContent = results.score;
}

// View certificate
function viewCertificate() {
    // Hide floating buttons
    floatingButtons.style.display = 'none';
    
    // Set certificate data
    certificateName.textContent = participantData.fullname;
    certificateScore.textContent = results.score;
    
    // Set motivational message based on score
    let motivationIndex = 0;
    if (results.score >= 90) {
        motivationIndex = 0;
    } else if (results.score >= 70) {
        motivationIndex = 1;
    } else if (results.score >= 50) {
        motivationIndex = 2;
    } else if (results.score >= 30) {
        motivationIndex = 3;
    } else {
        motivationIndex = 4;
    }
    
    certificateMotivation.textContent = MOTIVATIONAL_MESSAGES[motivationIndex];
    
    // Format date
    const date = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    certificateDate.textContent = `Ditetapkan di: Situbondo, ${date.toLocaleDateString('id-ID', options)}`;
    
    // Generate certificate code
    const codeParts = [
        participantData.fullname.replace(/\s+/g, '-').toUpperCase(),
        participantData.status.toUpperCase(),
        participantData.schoolLevel ? participantData.schoolLevel.toUpperCase() : 'UMUM',
        examData.subject.toUpperCase(),
        date.toISOString().split('T')[0].replace(/-/g, ''),
        generateRandomCode(8),
        'PERGUNU-STB'
    ];
    
    certificateCode.textContent = codeParts.join('/');
    
    // Navigate to certificate screen
    navigateTo('certificate');
    
    // Play applause sound
    applauseAudio.play();
}

// Generate random code
function generateRandomCode(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
}

// Print certificate
function printCertificate() {
    window.print();
}

// Retake exam
function retakeExam() {
    // Reset exam data
    examData.questions.forEach(q => {
        q.answered = false;
        q.selectedAnswer = null;
        q.isCorrect = false;
    });
    
    examData.answeredQuestions = [];
    examData.unansweredQuestions = [...examData.questions];
    examData.startTime = new Date().toISOString();
    examFinished = false;
    
    // Save to localStorage
    localStorage.setItem('examData', JSON.stringify(examData));
    
    // Navigate to exam screen
    navigateTo('exam');
    
    // Start timer
    startTimer();
    
    // Load first question
    loadQuestion(0);
}

// Show share modal
function showShareModal() {
    shareModal.style.display = 'block';
}

// Contact admin via WhatsApp
function contactAdmin() {
    const message = encodeURIComponent('Assalamualaikum mas admin, saya mau tanya sesuatu nih...');
    window.open(`https://wa.me/6285647709114?text=${message}`, '_blank');
}

// Show bank soal modal
function showBankSoalModal() {
    bankSoalModal.style.display = 'block';
}

// Show admin modal
function showAdminModal() {
    adminModal.style.display = 'block';
}

// Share exam
function shareExam(platform) {
    const url = window.location.href;
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Ikuti%20Ujian%20Online%20PERGUNU%20Situbondo`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=Ikuti%20Ujian%20Online%20PERGUNU%20Situbondo%20${encodeURIComponent(url)}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=Ikuti%20Ujian%20Online%20PERGUNU%20Situbondo`;
            break;
        case 'copy-link':
            navigator.clipboard.writeText(url);
            alert('Tautan telah disalin ke clipboard');
            shareModal.style.display = 'none';
            return;
    }
    
    window.open(shareUrl, '_blank');
    shareModal.style.display = 'none';
}

// Play button sound
function playButtonSound() {
    buttonAudio.currentTime = 0;
    buttonAudio.play();
}

// Handle window resize
function handleResize() {
    // Adjust layout for mobile
    if (window.innerWidth < 768) {
        // Mobile-specific adjustments
    } else {
        // Desktop adjustments
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
