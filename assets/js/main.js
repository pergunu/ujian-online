// Global Variables
let currentScreen = 'opening';
let participantData = {};
let examData = {};
let examResults = {};
let questions = [];
let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = 120 * 60; // 120 minutes in seconds
let unansweredQuestions = [];
let answeredQuestions = [];

// DOM Elements
const openingScreen = document.querySelector('.opening-screen');
const termsScreen = document.querySelector('.terms-screen');
const participantForm = document.querySelector('.participant-form');
const examLevelScreen = document.querySelector('.exam-level-screen');
const examScreen = document.querySelector('.exam-screen');
const resultsScreen = document.querySelector('.results-screen');
const certificateScreen = document.querySelector('.certificate-screen');
const adminPanel = document.querySelector('.admin-panel');

// Login Elements
const loginCodeInput = document.getElementById('login-code');
const loginBtn = document.getElementById('login-btn');
const greetingText = document.getElementById('greeting-text');

// Terms Elements
const agreeCheckbox = document.getElementById('agree-checkbox');
const termsAgreeBtn = document.getElementById('terms-agree-btn');

// Participant Form Elements
const studentRadio = document.getElementById('student');
const generalRadio = document.getElementById('general');
const studentFields = document.getElementById('student-fields');
const generalFields = document.getElementById('general-fields');
const participantDataForm = document.getElementById('participant-data');
const getLocationBtn = document.getElementById('get-location');
const locationDetails = document.getElementById('location-details');
const periodicInfo = document.getElementById('periodic-info');

// Exam Level Elements
const studentLevels = document.getElementById('student-levels');
const generalLevels = document.getElementById('general-levels');
const sdLevels = document.getElementById('sd-levels');
const smpLevels = document.getElementById('smp-levels');
const smaLevels = document.getElementById('sma-levels');
const cpnsLicense = document.getElementById('cpns-license');
const verifyLicenseBtn = document.getElementById('verify-license');
const startExamBtn = document.getElementById('start-exam-btn');
const periodicInfo2 = document.getElementById('periodic-info-2');

// Exam Elements
const examTimer = document.getElementById('timer');
const examProgress = document.querySelector('.progress-fill');
const examProgressText = document.querySelector('.progress-text');
const questionContainer = document.querySelector('.question-container');
const optionsContainer = document.querySelector('.options-container');
const answerExplanation = document.querySelector('.answer-explanation');
const finishExamBtn = document.getElementById('finish-exam-btn');
const skipQuestionBtn = document.getElementById('skip-question-btn');
const unansweredBtn = document.getElementById('unanswered-btn');
const timeWarning = document.querySelector('.time-warning');

// Results Elements
const correctAnswersSpan = document.getElementById('correct-answers');
const wrongAnswersSpan = document.getElementById('wrong-answers');
const finalScoreSpan = document.getElementById('final-score');
const answersList = document.querySelector('.answers-list');
const printCertificateBtn = document.getElementById('print-certificate-btn');
const retryExamBtn = document.getElementById('retry-exam-btn');

// Certificate Elements
const certName = document.getElementById('cert-name');
const certScore = document.getElementById('cert-score');
const certMotivation = document.getElementById('cert-motivation');
const certPeriod = document.getElementById('cert-period');
const certCode = document.getElementById('cert-code');
const certSigner = document.getElementById('cert-signer');
const downloadCertificateBtn = document.getElementById('download-certificate-btn');
const backToResultsBtn = document.getElementById('back-to-results-btn');
const applauseAudio = document.getElementById('applause-audio');

// Admin Elements
const adminTabs = document.querySelectorAll('.tab-btn');
const adminTabContents = document.querySelectorAll('.admin-tab-content');
const saveLoginCodeBtn = document.getElementById('save-login-code');
const saveCpnsCodeBtn = document.getElementById('save-cpns-code');
const saveQuestionCodeBtn = document.getElementById('save-question-code');
const saveAdminCodeBtn = document.getElementById('save-admin-code');
const addQuestionBtn = document.getElementById('add-question-btn');
const aiQuestionBtn = document.getElementById('ai-question-btn');
const questionForm = document.querySelector('.question-form');
const aiPrompt = document.querySelector('.ai-prompt');
const saveQuestionBtn = document.getElementById('save-question-btn');
const cancelQuestionBtn = document.getElementById('cancel-question-btn');
const generateAiBtn = document.getElementById('generate-ai-btn');
const exportParticipantsBtn = document.getElementById('export-participants-btn');
const saveTimerBtn = document.getElementById('save-timer-btn');
const saveQuestionCountBtn = document.getElementById('save-question-count');
const saveRandomizeBtn = document.getElementById('save-randomize-btn');
const savePointsBtn = document.getElementById('save-points-btn');
const saveExamTypesBtn = document.getElementById('save-exam-types-btn');
const saveGreetingBtn = document.getElementById('save-greeting-btn');
const savePeriodicBtn = document.getElementById('save-periodic-btn');
const saveChairmanBtn = document.getElementById('save-chairman-btn');
const saveMotivationBtn = document.getElementById('save-motivation-btn');

// Floating Buttons
const floatingButtons = document.querySelector('.floating-buttons');
const shareBtn = document.getElementById('share-btn');
const whatsappBtn = document.getElementById('whatsapp-btn');
const questionBankBtn = document.getElementById('question-bank-btn');
const adminBtn = document.getElementById('admin-btn');

// Modals
const shareModal = document.querySelector('.share-modal');
const accessModal = document.querySelector('.access-modal');
const closeShareModal = document.getElementById('close-share-modal');
const copyLinkBtn = document.getElementById('copy-link-btn');
const verifyAccessBtn = document.getElementById('verify-access-btn');
const cancelAccessBtn = document.getElementById('cancel-access-btn');
const accessTitle = document.getElementById('access-title');

// Audio Elements
const openingAudio = document.getElementById('opening-audio');
const correctAudio = document.getElementById('correct-audio');
const wrongAudio = document.getElementById('wrong-audio');
const buttonAudio = document.getElementById('button-audio');

// Default Codes
const DEFAULT_LOGIN_CODE = '12345';
const DEFAULT_CPNS_CODE = 'OPENLOCK-1945';
const DEFAULT_QUESTION_CODE = 'OPENLOCK-1926';
const DEFAULT_ADMIN_CODE = '65614222';

// Sample Questions (In a real app, these would come from a database)
const SAMPLE_QUESTIONS = {
    agama: [
        {
            question: "Apa rukun Islam yang pertama?",
            options: {
                A: "Shalat",
                B: "Zakat",
                C: "Syahadat",
                D: "Puasa",
                E: "Haji"
            },
            correctAnswer: "C",
            explanation: "Rukun Islam yang pertama adalah mengucapkan dua kalimat syahadat."
        }
    ],
    ppkn: [
        {
            question: "Apa dasar negara Indonesia?",
            options: {
                A: "UUD 1945",
                B: "Pancasila",
                C: "Bhineka Tunggal Ika",
                D: "NKRI",
                E: "Bhinneka Tunggal Ika"
            },
            correctAnswer: "B",
            explanation: "Pancasila adalah dasar negara Indonesia seperti tercantum dalam pembukaan UUD 1945."
        }
    ],
    sejarah: [
        {
            question: "Kapan Indonesia merdeka?",
            options: {
                A: "16 Agustus 1945",
                B: "17 Agustus 1945",
                C: "18 Agustus 1945",
                D: "19 Agustus 1945",
                E: "20 Agustus 1945"
            },
            correctAnswer: "B",
            explanation: "Indonesia merdeka pada tanggal 17 Agustus 1945 yang dibacakan oleh Soekarno-Hatta."
        }
    ],
    ipa: [
        {
            question: "Apa rumus kimia air?",
            options: {
                A: "CO2",
                B: "H2O",
                C: "NaCl",
                D: "O2",
                E: "H2SO4"
            },
            correctAnswer: "B",
            explanation: "Rumus kimia air adalah H2O yang terdiri dari 2 atom Hidrogen dan 1 atom Oksigen."
        }
    ],
    ips: [
        {
            question: "Apa ibukota Jawa Timur?",
            options: {
                A: "Surabaya",
                B: "Malang",
                C: "Sidoarjo",
                D: "Kediri",
                E: "Madiun"
            },
            correctAnswer: "A",
            explanation: "Ibukota provinsi Jawa Timur adalah Surabaya."
        }
    ],
    matematika: [
        {
            question: "Berapa hasil dari 7 x 8?",
            options: {
                A: "48",
                B: "54",
                C: "56",
                D: "64",
                E: "72"
            },
            correctAnswer: "C",
            explanation: "Hasil perkalian 7 x 8 adalah 56."
        }
    ],
    "bahasa-indonesia": [
        {
            question: "Apa sinonim dari kata 'bahagia'?",
            options: {
                A: "Sedih",
                B: "Senang",
                C: "Marah",
                D: "Kecewa",
                E: "Takut"
            },
            correctAnswer: "B",
            explanation: "Sinonim dari bahagia adalah senang, gembira, atau sukacita."
        }
    ],
    "bahasa-inggris": [
        {
            question: "What is the English word for 'buku'?",
            options: {
                A: "Pen",
                B: "Book",
                C: "Table",
                D: "Chair",
                E: "Bag"
            },
            correctAnswer: "B",
            explanation: "The English word for 'buku' is 'book'."
        }
    ],
    "materi-extra": [
        {
            question: "Apa warna bendera Jepang?",
            options: {
                A: "Merah dan putih",
                B: "Biru dan putih",
                C: "Merah dan kuning",
                D: "Hijau dan putih",
                E: "Hitam dan putih"
            },
            correctAnswer: "A",
            explanation: "Bendera Jepang berwarna merah (lingkaran) dan putih (latar belakang)."
        }
    ],
    "materi-khusus": [
        {
            question: "Siapa pencipta lagu Indonesia Raya?",
            options: {
                A: "W.R. Supratman",
                B: "Ismail Marzuki",
                C: "C. Simanjuntak",
                D: "H. Mutahar",
                E: "Ibu Sud"
            },
            correctAnswer: "A",
            explanation: "Lagu Indonesia Raya diciptakan oleh Wage Rudolf Supratman."
        }
    ],
    "iq-test": [
        {
            question: "Jika 2, 4, 8, 16, ... berapa angka berikutnya?",
            options: {
                A: "18",
                B: "20",
                C: "24",
                D: "32",
                E: "64"
            },
            correctAnswer: "D",
            explanation: "Pola ini adalah perkalian 2 setiap angka, jadi 16 x 2 = 32."
        }
    ],
    cpns: [
        {
            question: "Apa yang dimaksud dengan ASN?",
            options: {
                A: "Angkatan Senjata Negara",
                B: "Aparatur Sipil Negara",
                C: "Asosiasi Sarjana Nasional",
                D: "Angkatan Sistem Nasional",
                E: "Asuransi Sosial Nasional"
            },
            correctAnswer: "B",
            explanation: "ASN adalah singkatan dari Aparatur Sipil Negara yaitu pegawai negeri sipil."
        }
    ]
};

// Motivation Messages
const MOTIVATION_MESSAGES = [
    { minScore: 90, message: "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini." },
    { minScore: 75, message: "Bagus! Anda telah menunjukkan pemahaman yang baik. Tingkatkan terus kemampuan Anda." },
    { minScore: 60, message: "Cukup baik. Masih ada ruang untuk perbaikan. Terus belajar dan berlatih." },
    { minScore: 0, message: "Anda perlu lebih banyak belajar lagi. Jangan menyerah, terus berusaha!" }
];

// Initialize the app
function initApp() {
    // Load any saved settings from localStorage
    loadSettings();
    
    // Set up event listeners
    setupEventListeners();
    
    // Play opening audio
    openingAudio.play();
    
    // Initialize particles
    initParticles();
}

// Load settings from localStorage
function loadSettings() {
    // Load greeting text
    const savedGreeting = localStorage.getItem('greetingText');
    if (savedGreeting) {
        greetingText.textContent = savedGreeting;
    }
    
    // Load periodic info
    const savedPeriodicInfo = localStorage.getItem('periodicInfo');
    if (savedPeriodicInfo) {
        periodicInfo.innerHTML = savedPeriodicInfo;
        periodicInfo2.innerHTML = savedPeriodicInfo;
    }
    
    // Load chairman name
    const savedChairman = localStorage.getItem('chairmanName');
    if (savedChairman) {
        certSigner.textContent = savedChairman;
    }
    
    // Load motivation messages
    const savedMotivation = localStorage.getItem('motivationMessages');
    if (savedMotivation) {
        try {
            const parsed = JSON.parse(savedMotivation);
            if (Array.isArray(parsed) {
                MOTIVATION_MESSAGES = parsed;
            }
        } catch (e) {
            console.error('Error parsing motivation messages:', e);
        }
    }
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('greetingText', greetingText.textContent);
    localStorage.setItem('periodicInfo', periodicInfo.innerHTML);
    localStorage.setItem('chairmanName', certSigner.textContent);
    localStorage.setItem('motivationMessages', JSON.stringify(MOTIVATION_MESSAGES));
}

// Set up all event listeners
function setupEventListeners() {
    // Login screen
    loginBtn.addEventListener('click', handleLogin);
    loginCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    
    // Terms screen
    agreeCheckbox.addEventListener('change', () => {
        termsAgreeBtn.disabled = !agreeCheckbox.checked;
    });
    termsAgreeBtn.addEventListener('click', () => {
        animateTransition(termsScreen, participantForm);
    });
    
    // Participant form
    studentRadio.addEventListener('change', () => {
        studentFields.classList.remove('hidden');
        generalFields.classList.add('hidden');
    });
    generalRadio.addEventListener('change', () => {
        studentFields.classList.add('hidden');
        generalFields.classList.remove('hidden');
    });
    getLocationBtn.addEventListener('click', getLocation);
    participantDataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveParticipantData();
    });
    
    // Exam level screen
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            examData.level = btn.dataset.level;
            
            // Show appropriate subject buttons
            if (btn.dataset.level === 'iq-test' || btn.dataset.level === 'cpns') {
                examData.type = btn.dataset.level;
                
                if (btn.dataset.level === 'cpns') {
                    cpnsLicense.classList.remove('hidden');
                } else {
                    startExamBtn.classList.remove('hidden');
                }
            } else {
                document.querySelectorAll('.subject-btn').forEach(subjectBtn => {
                    subjectBtn.classList.remove('active');
                });
            }
        });
    });
    
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.subject-btn').forEach(subjectBtn => {
                subjectBtn.classList.remove('active');
            });
            btn.classList.add('active');
            examData.subject = btn.dataset.subject;
            startExamBtn.classList.remove('hidden');
        });
    });
    
    verifyLicenseBtn.addEventListener('click', () => {
        const licenseCode = document.getElementById('license-code').value;
        if (licenseCode === DEFAULT_CPNS_CODE) {
            startExamBtn.classList.remove('hidden');
            showAlert('Kode lisensi valid!', 'success');
        } else {
            showAlert('Kode lisensi tidak valid!', 'error');
        }
    });
    
    startExamBtn.addEventListener('click', startExam);
    
    // Exam screen
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            selectAnswer(option.dataset.option);
        });
    });
    
    finishExamBtn.addEventListener('click', finishExam);
    skipQuestionBtn.addEventListener('click', skipQuestion);
    unansweredBtn.addEventListener('click', showUnanswered);
    
    // Results screen
    printCertificateBtn.addEventListener('click', showCertificate);
    retryExamBtn.addEventListener('click', retryExam);
    
    // Certificate screen
    downloadCertificateBtn.addEventListener('click', downloadCertificate);
    backToResultsBtn.addEventListener('click', () => {
        certificateScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
    });
    
    // Admin panel
    adminTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            adminTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            adminTabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
        });
    });
    
    saveLoginCodeBtn.addEventListener('click', () => saveCode('login'));
    saveCpnsCodeBtn.addEventListener('click', () => saveCode('cpns'));
    saveQuestionCodeBtn.addEventListener('click', () => saveCode('question'));
    saveAdminCodeBtn.addEventListener('click', () => saveCode('admin'));
    
    addQuestionBtn.addEventListener('click', () => {
        questionForm.classList.remove('hidden');
        aiPrompt.classList.add('hidden');
    });
    
    aiQuestionBtn.addEventListener('click', () => {
        questionForm.classList.add('hidden');
        aiPrompt.classList.remove('hidden');
    });
    
    cancelQuestionBtn.addEventListener('click', () => {
        questionForm.classList.add('hidden');
    });
    
    saveQuestionBtn.addEventListener('click', saveQuestion);
    generateAiBtn.addEventListener('click', generateQuestionsWithAI);
    exportParticipantsBtn.addEventListener('click', exportParticipants);
    
    saveTimerBtn.addEventListener('click', saveTimer);
    saveQuestionCountBtn.addEventListener('click', saveQuestionCount);
    saveRandomizeBtn.addEventListener('click', saveRandomize);
    savePointsBtn.addEventListener('click', savePoints);
    saveExamTypesBtn.addEventListener('click', saveExamTypes);
    
    saveGreetingBtn.addEventListener('click', saveGreeting);
    savePeriodicBtn.addEventListener('click', savePeriodic);
    saveChairmanBtn.addEventListener('click', saveChairman);
    saveMotivationBtn.addEventListener('click', saveMotivation);
    
    // Floating buttons
    shareBtn.addEventListener('click', showShareModal);
    whatsappBtn.addEventListener('click', () => {
        window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...`, '_blank');
    });
    questionBankBtn.addEventListener('click', () => {
        accessTitle.textContent = 'Akses Bank Soal';
        accessModal.classList.remove('hidden');
    });
    adminBtn.addEventListener('click', () => {
        accessTitle.textContent = 'Akses Kontrol Panel Admin';
        accessModal.classList.remove('hidden');
    });
    
    // Modals
    closeShareModal.addEventListener('click', () => {
        shareModal.classList.add('hidden');
    });
    copyLinkBtn.addEventListener('click', () => {
        const linkInput = document.getElementById('custom-link');
        linkInput.select();
        document.execCommand('copy');
        showAlert('Tautan berhasil disalin!', 'success');
    });
    verifyAccessBtn.addEventListener('click', verifyAccess);
    cancelAccessBtn.addEventListener('click', () => {
        accessModal.classList.add('hidden');
    });
    
    // Audio
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            buttonAudio.currentTime = 0;
            buttonAudio.play();
        });
    });
}

// Handle login
function handleLogin() {
    const code = loginCodeInput.value;
    
    if (code === DEFAULT_LOGIN_CODE) {
        animateTransition(openingScreen, termsScreen);
    } else {
        showAlert('Kode login tidak valid!', 'error');
    }
}

// Animate transition between screens
function animateTransition(fromScreen, toScreen) {
    fromScreen.classList.add('animate__animated', 'animate__fadeOut');
    setTimeout(() => {
        fromScreen.classList.add('hidden');
        fromScreen.classList.remove('animate__animated', 'animate__fadeOut');
        
        toScreen.classList.remove('hidden');
        toScreen.classList.add('animate__animated', 'animate__fadeIn');
        
        setTimeout(() => {
            toScreen.classList.remove('animate__animated', 'animate__fadeIn');
        }, 500);
    }, 500);
}

// Show alert message
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('fade-out');
        setTimeout(() => {
            alert.remove();
        }, 500);
    }, 3000);
}

// Get user location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getAddressFromCoords(latitude, longitude);
            },
            (error) => {
                showAlert('Gagal mendapatkan lokasi: ' + error.message, 'error');
            }
        );
    } else {
        showAlert('Browser tidak mendukung geolokasi', 'error');
    }
}

// Get address from coordinates
function getAddressFromCoords(lat, lng) {
    // In a real app, you would use a geocoding API like Google Maps or OpenStreetMap
    // For this example, we'll just display the coordinates
    locationDetails.textContent = `Lokasi: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    locationDetails.classList.remove('hidden');
    
    participantData.location = { lat, lng };
}

// Save participant data
function saveParticipantData() {
    participantData = {
        fullName: document.getElementById('fullname').value,
        status: document.querySelector('input[name="status"]:checked').value,
        purpose: document.getElementById(studentRadio.checked ? 'student-purpose' : 'general-purpose').value,
        timestamp: new Date().toISOString()
    };
    
    if (studentRadio.checked) {
        participantData.school = document.getElementById('school').value;
        participantData.nis = document.getElementById('nis').value;
        participantData.schoolLevel = document.getElementById('school-level').value;
    } else {
        participantData.address = document.getElementById('address').value;
        participantData.whatsapp = document.getElementById('whatsapp').value;
        participantData.email = document.getElementById('email').value;
    }
    
    // Save to localStorage (in a real app, you would send this to a server)
    const participants = JSON.parse(localStorage.getItem('participants') || [];
    participants.push(participantData);
    localStorage.setItem('participants', JSON.stringify(participants));
    
    // Proceed to exam level selection
    animateTransition(participantForm, examLevelScreen);
    
    // Show appropriate levels based on participant type
    if (participantData.status === 'pelajar') {
        studentLevels.classList.remove('hidden');
        generalLevels.classList.add('hidden');
        
        // Show appropriate class levels
        if (participantData.schoolLevel === 'SD') {
            sdLevels.classList.remove('hidden');
            smpLevels.classList.add('hidden');
            smaLevels.classList.add('hidden');
        } else if (participantData.schoolLevel === 'SMP') {
            sdLevels.classList.add('hidden');
            smpLevels.classList.remove('hidden');
            smaLevels.classList.add('hidden');
        } else if (participantData.schoolLevel === 'SMA') {
            sdLevels.classList.add('hidden');
            smpLevels.classList.add('hidden');
            smaLevels.classList.remove('hidden');
        }
    } else {
        studentLevels.classList.add('hidden');
        generalLevels.classList.remove('hidden');
    }
}

// Start exam
function startExam() {
    animateTransition(examLevelScreen, examScreen);
    
    // Initialize exam data
    examData.startTime = new Date().toISOString();
    examData.questions = [];
    examResults = {
        correct: 0,
        wrong: 0,
        unanswered: 0
    };
    
    // Load questions based on exam type
    if (examData.type === 'iq-test' || examData.type === 'cpns') {
        questions = SAMPLE_QUESTIONS[examData.type];
    } else {
        questions = SAMPLE_QUESTIONS[examData.subject];
    }
    
    // Start timer
    startTimer();
    
    // Display first question
    displayQuestion(0);
}

// Start exam timer
function startTimer() {
    timeLeft = 120 * 60; // 120 minutes in seconds
    
    timerInterval = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        examTimer.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        // Show warning when 10 minutes left
        if (timeLeft === 10 * 60) {
            timeWarning.classList.remove('hidden');
        }
        
        // Hide warning when 1 minute left
        if (timeLeft === 60) {
            timeWarning.classList.add('hidden');
        }
        
        // Make timer bigger when 10 minutes left
        if (timeLeft <= 10 * 60) {
            examTimer.style.fontSize = '24px';
            examTimer.style.color = 'var(--danger-color)';
        }
        
        // End exam when time is up
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishExam();
        }
    }, 1000);
}

// Display question
function displayQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    
    currentQuestionIndex = index;
    const question = questions[index];
    
    // Update question number and text
    questionContainer.querySelector('.question-number').textContent = `Soal #${index + 1}`;
    questionContainer.querySelector('.question-text').textContent = question.question;
    
    // Update options
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(option => {
        const optionLetter = option.dataset.option;
        option.querySelector('.option-text').textContent = question.options[optionLetter];
        
        // Reset option styles
        option.classList.remove('correct', 'wrong', 'selected');
    });
    
    // Hide answer explanation
    answerExplanation.classList.add('hidden');
    
    // Update progress
    examProgress.style.width = `${((index + 1) / questions.length) * 100}%`;
    examProgressText.textContent = `Soal ${index + 1} dari ${questions.length}`;
    
    // Check if this question was already answered
    if (examData.questions[index]) {
        const selectedOption = examData.questions[index].selectedAnswer;
        const correctAnswer = questions[index].correctAnswer;
        
        options.forEach(option => {
            if (option.dataset.option === selectedOption) {
                option.classList.add('selected');
                
                if (selectedOption === correctAnswer) {
                    option.classList.add('correct');
                } else {
                    option.classList.add('wrong');
                    
                    // Also highlight the correct answer
                    options.forEach(opt => {
                        if (opt.dataset.option === correctAnswer) {
                            opt.classList.add('correct');
                        }
                    });
                }
                
                // Show explanation
                answerExplanation.querySelector('p').textContent = questions[index].explanation;
                answerExplanation.classList.remove('hidden');
            }
        });
    }
}

// Select answer
function selectAnswer(option) {
    // Check if already answered
    if (examData.questions[currentQuestionIndex]) return;
    
    const question = questions[currentQuestionIndex];
    const isCorrect = option === question.correctAnswer;
    
    // Save answer
    examData.questions[currentQuestionIndex] = {
        selectedAnswer: option,
        isCorrect,
        timestamp: new Date().toISOString()
    };
    
    // Update results
    if (isCorrect) {
        examResults.correct++;
        correctAudio.play();
    } else {
        examResults.wrong++;
        wrongAudio.play();
    }
    
    // Highlight selected option
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(opt => {
        if (opt.dataset.option === option) {
            opt.classList.add(isCorrect ? 'correct' : 'wrong', 'selected');
        }
        
        // Also highlight correct answer if wrong
        if (!isCorrect && opt.dataset.option === question.correctAnswer) {
            opt.classList.add('correct');
        }
    });
    
    // Show explanation
    answerExplanation.querySelector('p').textContent = question.explanation;
    answerExplanation.classList.remove('hidden');
    
    // Automatically go to next question after delay
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            displayQuestion(currentQuestionIndex + 1);
        }
    }, 2000);
}

// Skip question
function skipQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        displayQuestion(currentQuestionIndex + 1);
    }
}

// Show unanswered questions
function showUnanswered() {
    const unanswered = [];
    
    for (let i = 0; i < questions.length; i++) {
        if (!examData.questions[i]) {
            unanswered.push(i);
        }
    }
    
    if (unanswered.length > 0) {
        displayQuestion(unanswered[0]);
    } else {
        showAlert('Tidak ada soal yang belum dijawab', 'info');
    }
}

// Finish exam
function finishExam() {
    clearInterval(timerInterval);
    
    // Calculate results
    examResults.unanswered = questions.length - examResults.correct - examResults.wrong;
    const score = Math.round((examResults.correct / questions.length) * 100);
    
    // Update results screen
    correctAnswersSpan.textContent = examResults.correct;
    wrongAnswersSpan.textContent = examResults.wrong;
    finalScoreSpan.textContent = score;
    
    // Populate answers list
    answersList.innerHTML = '';
    questions.forEach((question, index) => {
        const answerItem = document.createElement('div');
        answerItem.className = 'answer-item';
        
        const answerStatus = document.createElement('div');
        answerStatus.className = 'answer-status';
        
        if (examData.questions[index]) {
            if (examData.questions[index].isCorrect) {
                answerStatus.classList.add('correct');
                answerStatus.textContent = '✓';
            } else {
                answerStatus.classList.add('wrong');
                answerStatus.textContent = '✗';
            }
        } else {
            answerStatus.textContent = '?';
        }
        
        const answerText = document.createElement('div');
        answerText.className = 'answer-text';
        answerText.textContent = `${index + 1}. ${question.question}`;
        
        answerItem.appendChild(answerStatus);
        answerItem.appendChild(answerText);
        answersList.appendChild(answerItem);
    });
    
    // Show results screen
    animateTransition(examScreen, resultsScreen);
}

// Show certificate
function showCertificate() {
    // Calculate score
    const score = Math.round((examResults.correct / questions.length) * 100);
    
    // Update certificate data
    certName.textContent = participantData.fullName.toUpperCase();
    certScore.textContent = score;
    
    // Set motivation message based on score
    const motivation = MOTIVATION_MESSAGES.find(m => score >= m.minScore);
    certMotivation.textContent = motivation ? motivation.message : '';
    
    // Set period
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    certPeriod.textContent = `Ditetapkan di: Situbondo, ${now.toLocaleDateString('id-ID', options)}`;
    
    // Generate certificate code
    const codeParts = [
        participantData.fullName.replace(/\s+/g, '-'),
        participantData.status.toUpperCase(),
        participantData.schoolLevel ? participantData.schoolLevel.toUpperCase() : 'UMUM',
        examData.subject ? examData.subject.toUpperCase().replace('-', ' ') : examData.type.toUpperCase(),
        now.toISOString().split('T')[0].replace(/-/g, ''),
        generateRandomCode(8),
        'PERGUNU-STB'
    ];
    
    certCode.textContent = codeParts.join('/');
    
    // Show certificate screen
    resultsScreen.classList.add('hidden');
    certificateScreen.classList.remove('hidden');
    
    // Play applause
    applauseAudio.play();
}

// Generate random code
function generateRandomCode(length) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
}

// Download certificate
function downloadCertificate() {
    // Use html2canvas to capture the certificate
    html2canvas(document.getElementById('certificate')).then(canvas => {
        const link = document.createElement('a');
        link.download = `Sertifikat-${participantData.fullName.replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// Retry exam
function retryExam() {
    animateTransition(resultsScreen, examLevelScreen);
}

// Show share modal
function showShareModal() {
    shareModal.classList.remove('hidden');
    
    // Populate social links
    const socialLinks = document.querySelector('.social-links');
    socialLinks.innerHTML = '';
    
    const platforms = [
        { name: 'facebook', icon: 'fab fa-facebook-f' },
        { name: 'twitter', icon: 'fab fa-twitter' },
        { name: 'whatsapp', icon: 'fab fa-whatsapp' },
        { name: 'telegram', icon: 'fab fa-telegram-plane' }
    ];
    
    platforms.forEach(platform => {
        const link = document.createElement('a');
        link.href = `https://www.example.com/share?platform=${platform.name}`; // Replace with actual share URLs
        link.className = `social-link ${platform.name}`;
        link.target = '_blank';
        
        const icon = document.createElement('i');
        icon.className = platform.icon;
        
        link.appendChild(icon);
        socialLinks.appendChild(link);
    });
}

// Verify access code
function verifyAccess() {
    const code = document.getElementById('access-code').value;
    const isQuestionBank = accessTitle.textContent.includes('Bank Soal');
    
    if ((isQuestionBank && code === DEFAULT_QUESTION_CODE) || (!isQuestionBank && code === DEFAULT_ADMIN_CODE)) {
        accessModal.classList.add('hidden');
        
        if (isQuestionBank) {
            // Show question bank tab in admin panel
            adminPanel.classList.remove('hidden');
            document.querySelector('.tab-btn[data-tab="questions"]').click();
        } else {
            // Show admin panel
            adminPanel.classList.remove('hidden');
        }
    } else {
        showAlert('Kode akses tidak valid!', 'error');
    }
}

// Save code (login, cpns, question, admin)
function saveCode(type) {
    const newCode = document.getElementById(`new-${type}-code`).value;
    
    if (newCode.trim() === '') {
        showAlert('Kode tidak boleh kosong!', 'error');
        return;
    }
    
    // In a real app, you would save this to a server
    showAlert(`Kode ${type} berhasil diperbarui!`, 'success');
    document.getElementById(`current-${type}-code`).value = newCode;
    document.getElementById(`new-${type}-code`).value = '';
}

// Save question
function saveQuestion() {
    const questionText = document.getElementById('question-text').value.trim();
    const options = {
        A: document.querySelector('.option-text[data-option="A"]').value.trim(),
        B: document.querySelector('.option-text[data-option="B"]').value.trim(),
        C: document.querySelector('.option-text[data-option="C"]').value.trim(),
        D: document.querySelector('.option-text[data-option="D"]').value.trim(),
        E: document.querySelector('.option-text[data-option="E"]').value.trim()
    };
    const correctAnswer = document.getElementById('correct-answer').value;
    const explanation = document.getElementById('explanation').value.trim();
    const subject = document.getElementById('question-subject').value;
    
    // Validate inputs
    if (!questionText || Object.values(options).some(opt => !opt) || !explanation) {
        showAlert('Semua field harus diisi!', 'error');
        return;
    }
    
    // Create question object
    const question = {
        question: questionText,
        options,
        correctAnswer,
        explanation,
        subject
    };
    
    // In a real app, you would save this to a database
    // For this example, we'll add it to our sample questions
    if (!SAMPLE_QUESTIONS[subject]) {
        SAMPLE_QUESTIONS[subject] = [];
    }
    
    SAMPLE_QUESTIONS[subject].push(question);
    showAlert('Soal berhasil disimpan!', 'success');
    
    // Reset form
    document.getElementById('question-text').value = '';
    document.querySelectorAll('.option-text').forEach(input => input.value = '');
    document.getElementById('explanation').value = '';
    questionForm.classList.add('hidden');
}

// Generate questions with AI
function generateQuestionsWithAI() {
    const prompt = document.getElementById('ai-prompt-input').value.trim();
    const subject = document.getElementById('ai-subject').value;
    
    if (!prompt) {
        showAlert('Prompt tidak boleh kosong!', 'error');
        return;
    }
    
    // In a real app, you would call an AI API here
    // For this example, we'll simulate it with a timeout
    
    showAlert('Membuat soal dengan AI...', 'info');
    
    setTimeout(() => {
        // Simulate AI response
        const generatedQuestion = {
            question: `Contoh soal yang dihasilkan oleh AI untuk prompt: "${prompt}"`,
            options: {
                A: "Pilihan A",
                B: "Pilihan B",
                C: "Pilihan C",
                D: "Pilihan D",
                E: "Pilihan E"
            },
            correctAnswer: "B",
            explanation: "Ini adalah penjelasan untuk jawaban yang benar yang dihasilkan oleh AI.",
            subject
        };
        
        // Add to sample questions
        if (!SAMPLE_QUESTIONS[subject]) {
            SAMPLE_QUESTIONS[subject] = [];
        }
        
        SAMPLE_QUESTIONS[subject].push(generatedQuestion);
        showAlert('Soal berhasil dibuat dengan AI!', 'success');
        
        // Clear prompt
        document.getElementById('ai-prompt-input').value = '';
    }, 2000);
}

// Export participants data
function exportParticipants() {
    const format = document.getElementById('export-format').value;
    const participants = JSON.parse(localStorage.getItem('participants') || [];
    
    if (participants.length === 0) {
        showAlert('Tidak ada data peserta untuk diexport!', 'error');
        return;
    }
    
    // In a real app, you would implement proper export for each format
    // For this example, we'll just show a success message
    showAlert(`Data peserta berhasil diexport dalam format ${format.toUpperCase()}!`, 'success');
}

// Save timer setting
function saveTimer() {
    const minutes = parseInt(document.getElementById('exam-timer').value);
    
    if (isNaN(minutes) {
        showAlert('Timer harus berupa angka!', 'error');
        return;
    }
    
    // In a real app, you would save this to a database
    showAlert('Pengaturan timer berhasil disimpan!', 'success');
}

// Save question count
function saveQuestionCount() {
    const count = document.getElementById('question-count').value;
    // In a real app, you would save this to a database
    showAlert('Jumlah soal berhasil disimpan!', 'success');
}

// Save randomize setting
function saveRandomize() {
    const randomize = document.getElementById('randomize-questions').checked;
    // In a real app, you would save this to a database
    showAlert('Pengaturan acak soal berhasil disimpan!', 'success');
}

// Save points setting
function savePoints() {
    const points = document.getElementById('point-value').value;
    // In a real app, you would save this to a database
    showAlert('Nilai per soal berhasil disimpan!', 'success');
}

// Save exam types setting
function saveExamTypes() {
    // In a real app, you would save this to a database
    showAlert('Pengaturan jenis ujian berhasil disimpan!', 'success');
}

// Save greeting text
function saveGreeting() {
    const text = document.getElementById('greeting-text-input').value;
    greetingText.textContent = text;
    localStorage.setItem('greetingText', text);
    showAlert('Teks sambutan berhasil disimpan!', 'success');
}

// Save periodic info
function savePeriodic() {
    const text = document.getElementById('periodic-info-input').value;
    periodicInfo.innerHTML = text;
    periodicInfo2.innerHTML = text;
    localStorage.setItem('periodicInfo', text);
    showAlert('Informasi berkala berhasil disimpan!', 'success');
}

// Save chairman name
function saveChairman() {
    const name = document.getElementById('chairman-name-input').value;
    certSigner.textContent = name;
    localStorage.setItem('chairmanName', name);
    showAlert('Nama ketua berhasil disimpan!', 'success');
}

// Save motivation messages
function saveMotivation() {
    const text = document.getElementById('motivation-text-input').value;
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    const newMotivations = lines.map(line => {
        // Simple parsing - in a real app you'd have a better format
        return {
            minScore: line.includes('Sempurna') ? 90 : 
                     line.includes('Bagus') ? 75 : 
                     line.includes('Cukup') ? 60 : 0,
            message: line.trim()
        };
    });
    
    MOTIVATION_MESSAGES = newMotivations;
    localStorage.setItem('motivationMessages', JSON.stringify(newMotivations));
    showAlert('Teks motivasi berhasil disimpan!', 'success');
}

// Initialize particles
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
