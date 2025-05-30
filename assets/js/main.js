// Default Configuration
const config = {
    loginCode: "12345",
    cpnsLicenseCode: "OPENLOCK-1945",
    questionBankCode: "OPENLOCK-1926",
    adminPanelCode: "65614222",
    examDuration: 120, // in minutes
    greetingText: "Selamat Datang di Ujian Online PERGUNU SITUBONDO",
    periodicInfo: "Informasi berkala akan ditampilkan di sini. Dapat diatur melalui kontrol panel admin.",
    chairmanName: "Moh. Nuril Hudha, S.Pd., M.Si.",
    motivationTexts: {
        perfect: "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.",
        excellent: "Luar biasa! Hasil yang sangat memuaskan. Teruslah belajar dan berkembang.",
        good: "Bagus! Anda telah memahami materi dengan cukup baik. Tingkatkan lagi pemahaman Anda.",
        average: "Cukup baik. Masih ada ruang untuk meningkatkan pemahaman Anda. Terus berlatih!",
        poor: "Anda perlu belajar lebih giat lagi. Jangan menyerah, teruslah berusaha!"
    },
    socialLinks: [
        { name: "Facebook", url: "https://facebook.com", icon: "fab fa-facebook-f" },
        { name: "Twitter", url: "https://twitter.com", icon: "fab fa-twitter" },
        { name: "WhatsApp", url: "https://wa.me/6285647709114", icon: "fab fa-whatsapp" },
        { name: "Email", url: "mailto:info@pergunu-situbondo.com", icon: "fas fa-envelope" }
    ]
};

// DOM Elements
const elements = {
    // Opening Screen
    greetingText: document.getElementById('greeting-text'),
    loginCode: document.getElementById('login-code'),
    loginBtn: document.getElementById('login-btn'),
    openingAudio: document.getElementById('opening-audio'),
    
    // Terms and Conditions
    termsContainer: document.querySelector('.terms-container'),
    agreeTerms: document.getElementById('agree-terms'),
    continueBtn: document.getElementById('continue-btn'),
    
    // Participant Form
    participantForm: document.querySelector('.participant-form'),
    participantData: document.getElementById('participant-data'),
    statusRadios: document.querySelectorAll('input[name="status"]'),
    studentFields: document.getElementById('student-fields'),
    generalFields: document.getElementById('general-fields'),
    fullname: document.getElementById('fullname'),
    school: document.getElementById('school'),
    nis: document.getElementById('nis'),
    studentPurpose: document.getElementById('student-purpose'),
    schoolLevel: document.getElementById('school-level'),
    address: document.getElementById('address'),
    getLocation: document.getElementById('get-location'),
    whatsapp: document.getElementById('whatsapp'),
    email: document.getElementById('email'),
    generalPurpose: document.getElementById('general-purpose'),
    
    // Exam Level Selection
    examLevelContainer: document.querySelector('.exam-level-container'),
    studentLevels: document.getElementById('student-levels'),
    generalLevels: document.getElementById('general-levels'),
    sdLevels: document.getElementById('sd-levels'),
    smpLevels: document.getElementById('smp-levels'),
    smaLevels: document.getElementById('sma-levels'),
    cpnsLicense: document.getElementById('cpns-license'),
    licenseCode: document.getElementById('license-code'),
    verifyLicense: document.getElementById('verify-license'),
    subjectSelection: document.getElementById('subject-selection'),
    studentSubjects: document.getElementById('student-subjects'),
    generalSubjects: document.getElementById('general-subjects'),
    periodicInfoText: document.getElementById('periodic-info'),
    
    // Exam Interface
    examContainer: document.querySelector('.exam-container'),
    timer: document.getElementById('timer'),
    currentQuestion: document.getElementById('current-question'),
    totalQuestions: document.getElementById('total-questions'),
    questionText: document.getElementById('question-text'),
    options: document.querySelectorAll('.option'),
    optionTexts: {
        a: document.getElementById('option-a'),
        b: document.getElementById('option-b'),
        c: document.getElementById('option-c'),
        d: document.getElementById('option-d'),
        e: document.getElementById('option-e')
    },
    explanation: document.getElementById('explanation'),
    explanationText: document.getElementById('explanation-text'),
    finishExam: document.getElementById('finish-exam'),
    skipQuestion: document.getElementById('skip-question'),
    unansweredQuestions: document.getElementById('unanswered-questions'),
    timeWarning: document.getElementById('time-warning'),
    
    // Results Page
    resultsContainer: document.querySelector('.results-container'),
    scorePercentage: document.getElementById('score-percentage'),
    totalAnswered: document.getElementById('total-answered'),
    correctAnswers: document.getElementById('correct-answers'),
    wrongAnswers: document.getElementById('wrong-answers'),
    certPreview: document.getElementById('cert-preview'),
    viewCertificate: document.getElementById('view-certificate'),
    printCertificate: document.getElementById('print-certificate'),
    retakeExam: document.getElementById('retake-exam'),
    
    // Certificate Page
    certificateContainer: document.querySelector('.certificate-container'),
    certName: document.getElementById('cert-name'),
    certScore: document.getElementById('cert-score'),
    motivationText: document.getElementById('motivation-text'),
    certDate: document.getElementById('cert-date'),
    chairmanName: document.getElementById('chairman-name'),
    certCode: document.getElementById('cert-code'),
    printCert: document.getElementById('print-cert'),
    backToResults: document.getElementById('back-to-results'),
    
    // Floating Buttons
    floatingButtons: document.querySelector('.floating-buttons'),
    shareBtn: document.getElementById('share-btn'),
    whatsappBtn: document.getElementById('whatsapp-btn'),
    questionBankBtn: document.getElementById('question-bank-btn'),
    adminPanelBtn: document.getElementById('admin-panel-btn'),
    
    // Modals
    shareModal: document.getElementById('share-modal'),
    questionBankModal: document.getElementById('question-bank-modal'),
    adminPanelModal: document.getElementById('admin-panel-modal'),
    closeModals: document.querySelectorAll('.close-modal'),
    socialLinks: document.querySelector('.social-links'),
    shareLink: document.getElementById('share-link'),
    copyLink: document.getElementById('copy-link'),
    bankCode: document.getElementById('bank-code'),
    bankLoginBtn: document.getElementById('bank-login-btn'),
    adminCode: document.getElementById('admin-code'),
    adminLoginBtn: document.getElementById('admin-login-btn'),
    
    // Audio
    correctSound: document.getElementById('correct-sound'),
    wrongSound: document.getElementById('wrong-sound'),
    applauseSound: document.getElementById('applause-sound'),
    buttonSound: document.getElementById('button-sound')
};

// Application State
let state = {
    currentScreen: 'opening',
    participantData: null,
    examConfig: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    timerInterval: null,
    timeLeft: config.examDuration * 60, // in seconds
    examStarted: false
};

// Sample Questions Data (In a real app, this would come from a database)
const sampleQuestions = {
    agama: [
        {
            question: "Apa nama kitab suci umat Islam?",
            options: {
                a: "Injil",
                b: "Taurat",
                c: "Al-Quran",
                d: "Zabur",
                e: "Weda"
            },
            correctAnswer: "c",
            explanation: "Al-Quran adalah kitab suci umat Islam yang diturunkan kepada Nabi Muhammad SAW."
        }
    ],
    ppkn: [
        {
            question: "Pancasila sebagai dasar negara tercantum dalam?",
            options: {
                a: "Pembukaan UUD 1945",
                b: "Batang Tubuh UUD 1945",
                c: "Penjelasan UUD 1945",
                d: "Keputusan Presiden",
                e: "Keputusan MPR"
            },
            correctAnswer: "a",
            explanation: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat."
        }
    ],
    sejarah: [
        {
            question: "Kapan Indonesia merdeka?",
            options: {
                a: "16 Agustus 1945",
                b: "17 Agustus 1945",
                c: "18 Agustus 1945",
                d: "19 Agustus 1945",
                e: "20 Agustus 1945"
            },
            correctAnswer: "b",
            explanation: "Indonesia merdeka pada tanggal 17 Agustus 1945 yang dibacakan oleh Soekarno-Hatta."
        }
    ],
    ipa: [
        {
            question: "Planet terdekat dari matahari adalah?",
            options: {
                a: "Venus",
                b: "Bumi",
                c: "Mars",
                d: "Merkurius",
                e: "Jupiter"
            },
            correctAnswer: "d",
            explanation: "Merkurius adalah planet terdekat dari matahari dalam tata surya kita."
        }
    ],
    ips: [
        {
            question: "Mata uang Jepang adalah?",
            options: {
                a: "Dollar",
                b: "Euro",
                c: "Yen",
                d: "Won",
                e: "Ringgit"
            },
            correctAnswer: "c",
            explanation: "Mata uang resmi Jepang adalah Yen (¥)."
        }
    ],
    matematika: [
        {
            question: "Berapa hasil dari 7 × 8?",
            options: {
                a: "48",
                b: "54",
                c: "56",
                d: "64",
                e: "72"
            },
            correctAnswer: "c",
            explanation: "Hasil dari perkalian 7 × 8 adalah 56."
        }
    ],
    "bahasa-indonesia": [
        {
            question: "Apa sinonim dari kata 'cerdas'?",
            options: {
                a: "Bodoh",
                b: "Pintar",
                c: "Malas",
                d: "Lambat",
                e: "Lemah"
            },
            correctAnswer: "b",
            explanation: "Sinonim dari kata 'cerdas' adalah 'pintar'."
        }
    ],
    "bahasa-inggris": [
        {
            question: "What is the English word for 'buku'?",
            options: {
                a: "Pen",
                b: "Book",
                c: "Table",
                d: "Chair",
                e: "Door"
            },
            correctAnswer: "b",
            explanation: "The English word for 'buku' is 'book'."
        }
    ],
    "materi-extra": [
        {
            question: "Siapa pencipta lagu Indonesia Raya?",
            options: {
                a: "W.R. Supratman",
                b: "C. Simanjuntak",
                c: "Ismail Marzuki",
                d: "Ibu Sud",
                e: "Gesang"
            },
            correctAnswer: "a",
            explanation: "Lagu Indonesia Raya diciptakan oleh Wage Rudolf Supratman."
        }
    ],
    "materi-khusus": [
        {
            question: "Apa nama ibukota provinsi Jawa Timur?",
            options: {
                a: "Semarang",
                b: "Bandung",
                c: "Surabaya",
                d: "Malang",
                e: "Yogyakarta"
            },
            correctAnswer: "c",
            explanation: "Ibukota provinsi Jawa Timur adalah Surabaya."
        }
    ],
    logika: [
        {
            question: "Jika semua A adalah B dan semua B adalah C, maka:",
            options: {
                a: "Semua A adalah C",
                b: "Semua C adalah A",
                c: "Beberapa A adalah C",
                d: "Beberapa C adalah A",
                e: "Tidak ada yang benar"
            },
            correctAnswer: "a",
            explanation: "Jika semua A adalah B dan semua B adalah C, maka semua A pasti adalah C."
        }
    ],
    cpns: [
        {
            question: "Tujuan negara Indonesia tercantum dalam Pembukaan UUD 1945 alinea ke:",
            options: {
                a: "Pertama",
                b: "Kedua",
                c: "Ketiga",
                d: "Keempat",
                e: "Kelima"
            },
            correctAnswer: "d",
            explanation: "Tujuan negara Indonesia tercantum dalam Pembukaan UUD 1945 alinea keempat."
        }
    ]
};

// Initialize the application
function init() {
    // Set initial content
    elements.greetingText.textContent = config.greetingText;
    elements.periodicInfoText.textContent = config.periodicInfo;
    elements.chairmanName.textContent = config.chairmanName;
    
    // Initialize particles.js
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {
        console.log('Particles.js loaded');
    });
    
    // Event Listeners
    setupEventListeners();
    
    // Play opening audio
    elements.openingAudio.play().catch(e => console.log("Autoplay prevented:", e));
}

// Set up all event listeners
function setupEventListeners() {
    // Opening Screen
    elements.loginBtn.addEventListener('click', handleLogin);
    elements.loginCode.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    
    // Terms and Conditions
    elements.agreeTerms.addEventListener('change', function() {
        elements.continueBtn.disabled = !this.checked;
    });
    elements.continueBtn.addEventListener('click', showParticipantForm);
    
    // Participant Form
    elements.statusRadios.forEach(radio => {
        radio.addEventListener('change', toggleParticipantFields);
    });
    elements.getLocation.addEventListener('click', getCurrentLocation);
    elements.participantData.addEventListener('submit', handleParticipantSubmit);
    
    // Exam Level Selection
    elements.schoolLevel.addEventListener('change', toggleSchoolLevels);
    elements.generalPurpose.addEventListener('change', toggleGeneralPurpose);
    elements.verifyLicense.addEventListener('click', verifyLicenseCode);
    
    // Subject Buttons
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            startExam(this.dataset.subject);
        });
    });
    
    // Exam Interface
    elements.options.forEach(option => {
        option.addEventListener('click', selectAnswer);
    });
    elements.finishExam.addEventListener('click', finishExam);
    elements.skipQuestion.addEventListener('click', skipQuestion);
    elements.unansweredQuestions.addEventListener('click', showUnansweredQuestions);
    
    // Results Page
    elements.viewCertificate.addEventListener('click', showCertificate);
    elements.printCertificate.addEventListener('click', printCertificate);
    elements.retakeExam.addEventListener('click', retakeExam);
    
    // Certificate Page
    elements.printCert.addEventListener('click', printCertificate);
    elements.backToResults.addEventListener('click', backToResults);
    
    // Floating Buttons
    elements.shareBtn.addEventListener('click', showShareModal);
    elements.whatsappBtn.addEventListener('click', contactAdmin);
    elements.questionBankBtn.addEventListener('click', showQuestionBankModal);
    elements.adminPanelBtn.addEventListener('click', showAdminPanelModal);
    
    // Modals
    elements.closeModals.forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    elements.copyLink.addEventListener('click', copyShareLink);
    elements.bankLoginBtn.addEventListener('click', accessQuestionBank);
    elements.adminLoginBtn.addEventListener('click', accessAdminPanel);
    
    // Populate social links
    populateSocialLinks();
}

// Handle login
function handleLogin() {
    playButtonSound();
    
    if (elements.loginCode.value === config.loginCode) {
        // Hide opening screen
        elements.openingNotification.classList.add('animate__fadeOut');
        
        // Show terms and conditions after animation
        setTimeout(() => {
            elements.openingNotification.classList.add('hidden');
            elements.termsContainer.classList.remove('hidden');
            elements.termsContainer.classList.add('animate__fadeIn');
        }, 500);
    } else {
        alert('Kode login salah. Silakan coba lagi.');
    }
}

// Show participant form
function showParticipantForm() {
    playButtonSound();
    
    elements.termsContainer.classList.add('animate__fadeOut');
    
    setTimeout(() => {
        elements.termsContainer.classList.add('hidden');
        elements.participantForm.classList.remove('hidden');
        elements.participantForm.classList.add('animate__fadeIn');
    }, 500);
}

// Toggle participant fields based on status
function toggleParticipantFields() {
    const isStudent = elements.statusRadios[0].checked;
    
    if (isStudent) {
        elements.studentFields.classList.remove('hidden');
        elements.generalFields.classList.add('hidden');
    } else {
        elements.studentFields.classList.add('hidden');
        elements.generalFields.classList.remove('hidden');
    }
}

// Toggle school levels based on selection
function toggleSchoolLevels() {
    const level = elements.schoolLevel.value;
    
    elements.sdLevels.classList.add('hidden');
    elements.smpLevels.classList.add('hidden');
    elements.smaLevels.classList.add('hidden');
    
    if (level === 'sd') {
        elements.sdLevels.classList.remove('hidden');
    } else if (level === 'smp') {
        elements.smpLevels.classList.remove('hidden');
    } else if (level === 'sma') {
        elements.smaLevels.classList.remove('hidden');
    }
}

// Toggle general purpose fields
function toggleGeneralPurpose() {
    const purpose = elements.generalPurpose.value;
    
    if (purpose === 'cpns') {
        elements.cpnsLicense.classList.remove('hidden');
    } else {
        elements.cpnsLicense.classList.add('hidden');
    }
}

// Get current location using GPS
function getCurrentLocation() {
    playButtonSound();
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                // Reverse geocoding to get address (in a real app, you'd use a geocoding API)
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // Simulate getting address from coordinates
                setTimeout(() => {
                    elements.address.value = "Jl. Raya Situbondo No. 123, Situbondo, Jawa Timur";
                }, 1000);
            },
            error => {
                alert('Gagal mendapatkan lokasi: ' + error.message);
            }
        );
    } else {
        alert('Geolocation tidak didukung oleh browser Anda.');
    }
}

// Verify CPNS license code
function verifyLicenseCode() {
    playButtonSound();
    
    if (elements.licenseCode.value === config.cpnsLicenseCode) {
        elements.cpnsLicense.classList.add('hidden');
        elements.subjectSelection.classList.remove('hidden');
        elements.generalSubjects.classList.remove('hidden');
    } else {
        alert('Kode lisensi salah. Silakan coba lagi.');
    }
}

// Handle participant form submission
function handleParticipantSubmit(e) {
    e.preventDefault();
    playButtonSound();
    
    // Collect participant data
    const isStudent = elements.statusRadios[0].checked;
    
    state.participantData = {
        fullname: elements.fullname.value,
        status: isStudent ? 'pelajar' : 'umum',
        purpose: isStudent ? elements.studentPurpose.value : elements.generalPurpose.value,
        level: isStudent ? elements.schoolLevel.value : null,
        class: null, // Will be set when level is selected
        school: isStudent ? elements.school.value : null,
        nis: isStudent ? elements.nis.value : null,
        address: !isStudent ? elements.address.value : null,
        whatsapp: !isStudent ? elements.whatsapp.value : null,
        email: !isStudent ? elements.email.value : null,
        timestamp: new Date().toISOString()
    };
    
    // Hide participant form
    elements.participantForm.classList.add('animate__fadeOut');
    
    // Show exam level selection
    setTimeout(() => {
        elements.participantForm.classList.add('hidden');
        elements.examLevelContainer.classList.remove('hidden');
        elements.examLevelContainer.classList.add('animate__fadeIn');
        
        // Show appropriate levels based on participant status
        if (isStudent) {
            elements.studentLevels.classList.remove('hidden');
            elements.generalLevels.classList.add('hidden');
            toggleSchoolLevels();
        } else {
            elements.studentLevels.classList.add('hidden');
            elements.generalLevels.classList.remove('hidden');
            
            if (state.participantData.purpose === 'cpns') {
                elements.cpnsLicense.classList.remove('hidden');
                elements.subjectSelection.classList.add('hidden');
            } else {
                elements.cpnsLicense.classList.add('hidden');
                elements.subjectSelection.classList.remove('hidden');
                elements.generalSubjects.classList.remove('hidden');
            }
        }
    }, 500);
}

// Start exam with selected subject
function startExam(subject) {
    playButtonSound();
    
    // Set exam configuration
    state.examConfig = {
        subject: subject,
        duration: config.examDuration,
        startTime: new Date(),
        totalQuestions: sampleQuestions[subject].length
    };
    
    // Load questions for the selected subject
    state.questions = [...sampleQuestions[subject]];
    state.currentQuestionIndex = 0;
    state.answers = Array(state.questions.length).fill(null);
    
    // Hide exam level selection
    elements.examLevelContainer.classList.add('animate__fadeOut');
    
    // Show exam interface
    setTimeout(() => {
        elements.examLevelContainer.classList.add('hidden');
        elements.examContainer.classList.remove('hidden');
        elements.examContainer.classList.add('animate__fadeIn');
        
        // Start timer
        startTimer();
        
        // Display first question
        displayQuestion();
    }, 500);
}

// Display current question
function displayQuestion() {
    const question = state.questions[state.currentQuestionIndex];
    
    // Update question counter
    elements.currentQuestion.textContent = state.currentQuestionIndex + 1;
    elements.totalQuestions.textContent = state.questions.length;
    
    // Set question text
    elements.questionText.textContent = question.question;
    
    // Set options
    for (const [key, value] of Object.entries(question.options)) {
        elements.optionTexts[key].textContent = value;
    }
    
    // Reset option styles
    elements.options.forEach(option => {
        option.classList.remove('correct', 'wrong');
        option.style.pointerEvents = 'auto';
    });
    
    // Hide explanation
    elements.explanation.classList.add('hidden');
    
    // If already answered, show the result
    if (state.answers[state.currentQuestionIndex] !== null) {
        const answer = state.answers[state.currentQuestionIndex];
        const correct = answer === question.correctAnswer;
        
        if (correct) {
            elements.options[question.correctAnswer.charCodeAt(0) - 97].classList.add('correct');
        } else {
            elements.options[answer.charCodeAt(0) - 97].classList.add('wrong');
            elements.options[question.correctAnswer.charCodeAt(0) - 97].classList.add('correct');
        }
        
        // Show explanation
        elements.explanationText.textContent = question.explanation;
        elements.explanation.classList.remove('hidden');
        
        // Disable selecting again
        elements.options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
    }
}

// Select answer
function selectAnswer() {
    playButtonSound();
    
    const selectedOption = this.dataset.option;
    const question = state.questions[state.currentQuestionIndex];
    const isCorrect = selectedOption === question.correctAnswer;
    
    // Save answer
    state.answers[state.currentQuestionIndex] = selectedOption;
    
    // Show result
    if (isCorrect) {
        this.classList.add('correct');
        elements.correctSound.play();
    } else {
        this.classList.add('wrong');
        elements.options[question.correctAnswer.charCodeAt(0) - 97].classList.add('correct');
        elements.wrongSound.play();
    }
    
    // Show explanation
    elements.explanationText.textContent = question.explanation;
    elements.explanation.classList.remove('hidden');
    
    // Disable all options
    elements.options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Auto-advance to next question after delay if not last question
    if (state.currentQuestionIndex < state.questions.length - 1) {
        setTimeout(() => {
            state.currentQuestionIndex++;
            displayQuestion();
        }, 2000);
    }
}

// Skip question
function skipQuestion() {
    playButtonSound();
    
    if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex++;
        displayQuestion();
    } else {
        alert('Ini adalah soal terakhir. Tidak bisa melewati soal ini.');
    }
}

// Show unanswered questions
function showUnansweredQuestions() {
    playButtonSound();
    
    const unansweredIndices = state.answers.map((answer, index) => answer === null ? index : null).filter(val => val !== null);
    
    if (unansweredIndices.length > 0) {
        state.currentQuestionIndex = unansweredIndices[0];
        displayQuestion();
    } else {
        alert('Semua soal sudah dijawab.');
    }
}

// Start exam timer
function startTimer() {
    state.timeLeft = config.examDuration * 60;
    updateTimerDisplay();
    
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        updateTimerDisplay();
        
        if (state.timeLeft <= 0) {
            finishExam();
        } else if (state.timeLeft === 600) { // 10 minutes left
            showTimeWarning();
        } else if (state.timeLeft === 60) { // 1 minute left
            hideTimeWarning();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    
    elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Make timer bigger when 10 minutes left
    if (state.timeLeft <= 600) {
        elements.timer.style.fontSize = '2rem';
        elements.timer.style.color = 'var(--warning-color)';
    }
}

// Show time warning
function showTimeWarning() {
    elements.timeWarning.classList.remove('hidden');
}

// Hide time warning
function hideTimeWarning() {
    elements.timeWarning.classList.add('hidden');
}

// Finish exam
function finishExam() {
    playButtonSound();
    
    // Stop timer
    clearInterval(state.timerInterval);
    
    // Calculate results
    const totalQuestions = state.questions.length;
    const correctAnswers = state.questions.reduce((count, question, index) => {
        return count + (state.answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
    const wrongAnswers = totalQuestions - correctAnswers;
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Update results display
    elements.scorePercentage.textContent = scorePercentage;
    elements.totalAnswered.textContent = totalQuestions;
    elements.correctAnswers.textContent = correctAnswers;
    elements.wrongAnswers.textContent = wrongAnswers;
    
    // Update certificate data
    updateCertificateData(scorePercentage);
    
    // Hide exam interface
    elements.examContainer.classList.add('animate__fadeOut');
    
    // Show results
    setTimeout(() => {
        elements.examContainer.classList.add('hidden');
        elements.resultsContainer.classList.remove('hidden');
        elements.resultsContainer.classList.add('animate__fadeIn');
        
        // Play applause sound
        elements.applauseSound.play();
    }, 500);
}

// Update certificate data
function updateCertificateData(scorePercentage) {
    // Format current date
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('id-ID', options);
    
    // Generate certificate code
    const participant = state.participantData;
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + 
                      '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    
    let certCode = `${participant.fullname.toUpperCase().replace(/ /g, '_')}/`;
    certCode += `${participant.status.toUpperCase()}/`;
    certCode += participant.level ? `${participant.level.toUpperCase()}/` : 'UMUM/';
    certCode += `${state.examConfig.subject.toUpperCase()}/`;
    certCode += `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}/`;
    certCode += `${randomCode}/`;
    certCode += 'PERGUNU-STB';
    
    // Set motivation text based on score
    let motivationText;
    if (scorePercentage >= 90) {
        motivationText = config.motivationTexts.perfect;
    } else if (scorePercentage >= 75) {
        motivationText = config.motivationTexts.excellent;
    } else if (scorePercentage >= 60) {
        motivationText = config.motivationTexts.good;
    } else if (scorePercentage >= 40) {
        motivationText = config.motivationTexts.average;
    } else {
        motivationText = config.motivationTexts.poor;
    }
    
    // Update certificate elements
    elements.certName.textContent = participant.fullname;
    elements.certScore.textContent = scorePercentage;
    elements.motivationText.textContent = motivationText;
    elements.certDate.textContent = formattedDate;
    elements.certCode.textContent = certCode;
}

// Show certificate
function showCertificate() {
    playButtonSound();
    
    elements.resultsContainer.classList.add('animate__fadeOut');
    
    setTimeout(() => {
        elements.resultsContainer.classList.add('hidden');
        elements.certificateContainer.classList.remove('hidden');
        elements.certificateContainer.classList.add('animate__fadeIn');
        
        // Hide floating buttons when viewing certificate
        elements.floatingButtons.classList.add('hidden');
    }, 500);
}

// Print certificate
function printCertificate() {
    playButtonSound();
    
    // Hide elements not needed in print
    elements.floatingButtons.classList.add('hidden');
    elements.certificateActions.classList.add('hidden');
    
    // Trigger print
    setTimeout(() => {
        window.print();
        
        // Restore elements after print
        setTimeout(() => {
            elements.floatingButtons.classList.remove('hidden');
            elements.certificateActions.classList.remove('hidden');
        }, 500);
    }, 500);
}

// Back to results from certificate
function backToResults() {
    playButtonSound();
    
    elements.certificateContainer.classList.add('animate__fadeOut');
    
    setTimeout(() => {
        elements.certificateContainer.classList.add('hidden');
        elements.resultsContainer.classList.remove('hidden');
        elements.resultsContainer.classList.add('animate__fadeIn');
        
        // Show floating buttons again
        elements.floatingButtons.classList.remove('hidden');
    }, 500);
}

// Retake exam
function retakeExam() {
    playButtonSound();
    
    elements.resultsContainer.classList.add('animate__fadeOut');
    
    setTimeout(() => {
        elements.resultsContainer.classList.add('hidden');
        elements.examLevelContainer.classList.remove('hidden');
        elements.examLevelContainer.classList.add('animate__fadeIn');
        
        // Reset exam state
        state.examConfig = null;
        state.questions = [];
        state.currentQuestionIndex = 0;
        state.answers = [];
        state.timerInterval = null;
        state.timeLeft = config.examDuration * 60;
        state.examStarted = false;
    }, 500);
}

// Show share modal
function showShareModal() {
    playButtonSound();
    elements.shareModal.classList.add('active');
    elements.shareLink.value = window.location.href;
}

// Contact admin via WhatsApp
function contactAdmin() {
    playButtonSound();
    window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...`, '_blank');
}

// Show question bank modal
function showQuestionBankModal() {
    playButtonSound();
    elements.questionBankModal.classList.add('active');
}

// Show admin panel modal
function showAdminPanelModal() {
    playButtonSound();
    elements.adminPanelModal.classList.add('active');
}

// Close all modals
function closeAllModals() {
    playButtonSound();
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// Copy share link
function copyShareLink() {
    playButtonSound();
    elements.shareLink.select();
    document.execCommand('copy');
    alert('Link berhasil disalin!');
}

// Access question bank
function accessQuestionBank() {
    playButtonSound();
    
    if (elements.bankCode.value === config.questionBankCode) {
        alert('Anda berhasil masuk ke Bank Soal. (Dalam aplikasi nyata, ini akan membuka panel admin)');
        closeAllModals();
    } else {
        alert('Kode Bank Soal salah. Silakan coba lagi.');
    }
}

// Access admin panel
function accessAdminPanel() {
    playButtonSound();
    
    if (elements.adminCode.value === config.adminPanelCode) {
        alert('Anda berhasil masuk ke Kontrol Panel Admin. (Dalam aplikasi nyata, ini akan membuka panel admin)');
        closeAllModals();
    } else {
        alert('Kode Admin salah. Silakan coba lagi.');
    }
}

// Populate social links
function populateSocialLinks() {
    elements.socialLinks.innerHTML = '';
    
    config.socialLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.title = link.name;
        a.target = '_blank';
        
        const i = document.createElement('i');
        i.className = link.icon;
        
        a.appendChild(i);
        elements.socialLinks.appendChild(a);
    });
}

// Play button sound
function playButtonSound() {
    elements.buttonSound.currentTime = 0;
    elements.buttonSound.play().catch(e => console.log("Audio play prevented:", e));
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
