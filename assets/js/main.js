document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const loginCode = document.getElementById('login-code');
    
    // Default login code
    const DEFAULT_CODE = "12345";
    
    loginBtn.addEventListener('click', function() {
        if(loginCode.value.trim() === DEFAULT_CODE) {
            // Simulate successful login
            alert("Login berhasil! Akan dialihkan ke halaman ujian.");
            // window.location.href = "exam.html"; // Uncomment ini di production
        } else {
            alert("Kode ujian salah. Silakan coba lagi.");
            loginCode.focus();
        }
    });
    
    // Press Enter to login
    loginCode.addEventListener('keypress', function(e) {
        if(e.key === "Enter") {
            loginBtn.click();
        }
    });
});
    // Initialize particles.js
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {
        console.log('Particles.js loaded');
    });
    
    // Global Variables
    let participantData = {};
    let examData = {};
    let currentQuestion = 0;
    let timerInterval;
    let timeLeft = 120 * 60; // 120 minutes in seconds
    let answeredQuestions = [];
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let totalQuestions = 10; // Default, will be updated from settings
    
    // DOM Elements
    const loginCodeInput = document.getElementById('login-code');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');
    const termsCheckbox = document.getElementById('agree-terms');
    const continueBtn = document.getElementById('continue-btn');
    const participantForm = document.getElementById('participant-data');
    const studentFields = document.querySelectorAll('.student-fields');
    const generalFields = document.querySelectorAll('.general-fields');
    const cpnsField = document.querySelector('.cpns-field');
    const licenseCodeInput = document.getElementById('license-code');
    const licenseError = document.getElementById('license-error');
    const studentRadio = document.getElementById('student');
    const generalRadio = document.getElementById('general');
    const studentPurposeSelect = document.getElementById('student-purpose');
    const generalPurposeSelect = document.getElementById('general-purpose');
    const schoolLevelSelect = document.getElementById('school-level');
    const startExamBtn = document.getElementById('start-exam-btn');
    const levelButtons = document.querySelectorAll('.level-btn');
    const subjectButtons = document.querySelectorAll('.subject-btn');
    const studentLevels = document.querySelector('.student-levels');
    const generalLevels = document.querySelector('.general-levels');
    const studentSubjects = document.querySelector('.student-subjects');
    const generalSubjects = document.querySelector('.general-subjects');
    const subjectSelection = document.querySelector('.subject-selection');
    const examTimer = document.getElementById('timer');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const answerExplanation = document.getElementById('answer-explanation');
    const explanationText = document.getElementById('explanation-text');
    const progressFill = document.getElementById('progress-fill');
    const questionCount = document.getElementById('question-count');
    const finishExamBtn = document.getElementById('finish-exam-btn');
    const skipQuestionBtn = document.getElementById('skip-question-btn');
    const unansweredBtn = document.getElementById('unanswered-btn');
    const timeWarning = document.getElementById('time-warning');
    const correctAnswersSpan = document.getElementById('correct-answers');
    const wrongAnswersSpan = document.getElementById('wrong-answers');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const examScoreSpan = document.getElementById('exam-score');
    const viewCertificateBtn = document.getElementById('view-certificate-btn');
    const retakeExamBtn = document.getElementById('retake-exam-btn');
    const resultsDetails = document.getElementById('results-details');
    const answersList = document.getElementById('answers-list');
    const certificateName = document.getElementById('certificate-name');
    const certificateScore = document.getElementById('certificate-score');
    const certificateMotivation = document.getElementById('certificate-motivation');
    const certificateDate = document.getElementById('certificate-date');
    const certificateCode = document.getElementById('certificate-code');
    const printCertificateBtn = document.getElementById('print-certificate-btn');
    const backToResultsBtn = document.getElementById('back-to-results-btn');
    const floatingButtons = document.querySelectorAll('.floating-btn');
    const shareBtn = document.querySelector('.share-btn');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const questionBankBtn = document.querySelector('.question-bank-btn');
    const adminPanelBtn = document.querySelector('.admin-panel-btn');
    const shareModal = document.querySelector('.share-modal');
    const questionBankModal = document.querySelector('.question-bank-modal');
    const adminModal = document.querySelector('.admin-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const copyLinkBtn = document.getElementById('copy-link');
    const addLinkBtn = document.getElementById('add-link-btn');
    const linkList = document.getElementById('link-list');
    const bankCodeInput = document.getElementById('bank-code');
    const accessBankBtn = document.getElementById('access-bank-btn');
    const bankError = document.getElementById('bank-error');
    const bankContent = document.querySelector('.bank-content');
    const bankTabs = document.querySelectorAll('.bank-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const addMethodBtns = document.querySelectorAll('.method-btn');
    const manualForm = document.querySelector('.manual-form');
    const aiForm = document.querySelector('.ai-form');
    const apiKeyInput = document.getElementById('api-key');
    const aiPromptInput = document.getElementById('ai-prompt');
    const generateQuestionBtn = document.querySelector('.ai-form .btn-primary');
    const aiResult = document.querySelector('.ai-result');
    const generatedQuestion = document.querySelector('.generated-question');
    const saveAiQuestionBtn = document.querySelector('.save-ai-question');
    const searchQuestionInput = document.getElementById('search-question');
    const searchBtn = document.getElementById('search-btn');
    const filterCategory = document.getElementById('filter-category');
    const filterSubject = document.getElementById('filter-subject');
    const filterDifficulty = document.getElementById('filter-difficulty');
    const questionsList = document.getElementById('questions-list');
    const totalQuestionsStat = document.getElementById('total-questions-stat');
    const studentQuestionsStat = document.getElementById('student-questions-stat');
    const generalQuestionsStat = document.getElementById('general-questions-stat');
    const questionsTableBody = document.getElementById('questions-table-body');
    const exportBtns = document.querySelectorAll('.export-btn');
    const adminCodeInput = document.getElementById('admin-code');
    const accessAdminBtn = document.getElementById('access-admin-btn');
    const adminError = document.getElementById('admin-error');
    const adminContent = document.querySelector('.admin-content');
    const adminTabs = document.querySelectorAll('.admin-tabs .tab-btn');
    const adminTabContents = document.querySelectorAll('.admin-content .tab-content');
    const newLoginCode = document.getElementById('new-login-code');
    const currentLoginCode = document.getElementById('current-login-code');
    const newCpnsCode = document.getElementById('new-cpns-code');
    const currentCpnsCode = document.getElementById('current-cpns-code');
    const newBankCode = document.getElementById('new-bank-code');
    const currentBankCode = document.getElementById('current-bank-code');
    const newAdminCode = document.getElementById('new-admin-code');
    const currentAdminCode = document.getElementById('current-admin-code');
    const saveCodeBtns = document.querySelectorAll('.save-code');
    const examTimeInput = document.getElementById('exam-time');
    const pointValueSelect = document.getElementById('point-value');
    const questionCountSetting = document.getElementById('question-count-setting');
    const randomizeQuestions = document.getElementById('randomize-questions');
    const saveSettingBtns = document.querySelectorAll('.save-setting');
    const examToggleContainer = document.querySelector('.exam-toggle-container');
    const greetingTextSetting = document.getElementById('greeting-text-setting');
    const infoTextSetting = document.getElementById('info-text-setting');
    const chairmanTextSetting = document.getElementById('chairman-text-setting');
    const saveTextBtns = document.querySelectorAll('.save-text');
    const motivationMessages = document.querySelector('.motivation-messages');
    const addMotivationBtn = document.getElementById('add-motivation-btn');
    const dataCategory = document.getElementById('data-category');
    const dataSubject = document.getElementById('data-subject');
    const dataSearch = document.getElementById('data-search');
    const refreshData = document.getElementById('refresh-data');
    const participantsTableBody = document.getElementById('participants-table-body');
    const exportDataBtns = document.querySelectorAll('.export-data');
    const loadingScreen = document.querySelector('.loading-screen');
    const correctAudio = document.getElementById('correct-audio');
    const wrongAudio = document.getElementById('wrong-audio');
    const buttonAudio = document.getElementById('button-audio');
    const applauseAudio = document.getElementById('applause-audio');
    const openingAudio = document.getElementById('opening-audio');
    
    // Sample Questions Data (Replace with actual data from backend)
    const questionsData = {
        pelajar: {
            agama: [
                {
                    question: "Apa nama kitab suci agama Islam?",
                    options: ["A. Al-Quran", "B. Injil", "C. Weda", "D. Tripitaka"],
                    correctAnswer: "A",
                    explanation: "Kitab suci agama Islam adalah Al-Quran yang diturunkan kepada Nabi Muhammad SAW."
                }
            ],
            ppkn: [
                {
                    question: "Pancasila sebagai dasar negara tercantum dalam pembukaan UUD 1945 alinea keberapa?",
                    options: ["A. Pertama", "B. Kedua", "C. Ketiga", "D. Keempat"],
                    correctAnswer: "D",
                    explanation: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat."
                }
            ],
            sejarah: [
                {
                    question: "Kapan Indonesia merdeka?",
                    options: ["A. 17 Agustus 1945", "B. 27 Desember 1949", "C. 1 Juni 1945", "D. 28 Oktober 1928"],
                    correctAnswer: "A",
                    explanation: "Indonesia merdeka pada tanggal 17 Agustus 1945 yang dibacakan oleh Soekarno-Hatta."
                }
            ],
            ipa: [
                {
                    question: "Planet terdekat dengan matahari adalah?",
                    options: ["A. Venus", "B. Bumi", "C. Mars", "D. Merkurius"],
                    correctAnswer: "D",
                    explanation: "Merkurius adalah planet terdekat dengan matahari dalam tata surya kita."
                }
            ],
            ips: [
                {
                    question: "Ibu kota provinsi Jawa Timur adalah?",
                    options: ["A. Surabaya", "B. Malang", "C. Kediri", "D. Madiun"],
                    correctAnswer: "A",
                    explanation: "Surabaya adalah ibu kota provinsi Jawa Timur sejak tahun 1950."
                }
            ],
            matematika: [
                {
                    question: "Berapakah hasil dari 7 x 8?",
                    options: ["A. 48", "B. 56", "C. 64", "D. 72"],
                    correctAnswer: "B",
                    explanation: "Perkalian 7 x 8 menghasilkan 56 sesuai dengan tabel perkalian."
                }
            ],
            "bahasa-indonesia": [
                {
                    question: "Kata 'membaca' termasuk jenis kata apa?",
                    options: ["A. Kata benda", "B. Kata kerja", "C. Kata sifat", "D. Kata keterangan"],
                    correctAnswer: "B",
                    explanation: "Kata 'membaca' adalah kata kerja karena menunjukkan suatu aktivitas."
                }
            ],
            "bahasa-inggris": [
                {
                    question: "What is the English word for 'buku'?",
                    options: ["A. Book", "B. Pen", "C. Table", "D. Chair"],
                    correctAnswer: "A",
                    explanation: "The English translation for 'buku' is 'book'."
                }
            ],
            "materi-extra": [
                {
                    question: "Apa warna hasil pencampuran merah dan biru?",
                    options: ["A. Hijau", "B. Ungu", "C. Oranye", "D. Kuning"],
                    correctAnswer: "B",
                    explanation: "Pencampuran warna merah dan biru akan menghasilkan warna ungu."
                }
            ],
            "materi-khusus": [
                {
                    question: "Siapa pencipta lagu Indonesia Raya?",
                    options: ["A. W.R. Supratman", "B. Ismail Marzuki", "C. C. Simanjuntak", "D. Kusbini"],
                    correctAnswer: "A",
                    explanation: "Lagu Indonesia Raya diciptakan oleh Wage Rudolf Supratman dan pertama kali diperdengarkan pada 28 Oktober 1928."
                }
            ]
        },
        umum: {
            "ujian-logika": [
                {
                    question: "Jika semua A adalah B dan beberapa B adalah C, maka:",
                    options: ["A. Beberapa A adalah C", "B. Semua A adalah C", "C. Tidak ada A yang C", "D. Beberapa C adalah A"],
                    correctAnswer: "A",
                    explanation: "Karena beberapa B adalah C dan semua A adalah B, maka beberapa A pasti adalah C."
                }
            ],
            "cpns": [
                {
                    question: "Menurut UUD 1945, kekuasaan yudikatif dilaksanakan oleh:",
                    options: ["A. Presiden", "B. DPR", "C. MA dan MK", "D. BPK"],
                    correctAnswer: "C",
                    explanation: "Kekuasaan yudikatif menurut UUD 1945 dilaksanakan oleh Mahkamah Agung dan Mahkamah Konstitusi."
                }
            ]
        }
    };
    
    // Sample Participants Data
    let participantsData = [];
    
    // Sample Admin Settings
    const adminSettings = {
        loginCode: "12345",
        cpnsCode: "OPENLOCK-1945",
        bankCode: "OPENLOCK-1926",
        adminCode: "65614222",
        examTime: 120,
        pointValue: 1,
        questionCount: 10,
        randomize: "yes",
        greetingText: "Selamat Datang di Ujian Online Pergunu Situbondo",
        infoText: "Pastikan semua data diisi dengan benar. Data ini akan digunakan untuk sertifikat dan tidak dapat diubah setelah disimpan.",
        chairmanName: "Moh. Nuril Hudha, S.Pd., M.Si.",
        motivationMessages: [
            "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.",
            "Hasil yang sangat baik! Teruslah belajar untuk mencapai yang terbaik.",
            "Bagus! Anda sudah memahami materi dengan baik, tapi masih ada ruang untuk peningkatan.",
            "Cukup baik. Tinjau kembali materi yang belum dikuasai untuk hasil yang lebih baik.",
            "Anda perlu belajar lebih giat lagi. Jangan menyerah dan terus berusaha!"
        ],
        enabledExams: {
            "pelajar": {
                "agama": true,
                "ppkn": true,
                "sejarah": true,
                "ipa": true,
                "ips": true,
                "matematika": true,
                "bahasa-indonesia": true,
                "bahasa-inggris": true,
                "materi-extra": true,
                "materi-khusus": true
            },
            "umum": {
                "ujian-logika": true,
                "cpns": true
            }
        },
        customLinks: [
            "https://pergunu.github.io/ujian-online/",
            "https://pergunu.org"
        ]
    };
    
    // Load opening audio
    openingAudio.play().catch(e => console.log("Autoplay prevented:", e));
    
    // Event Listeners
    loginBtn.addEventListener('click', handleLogin);
    termsCheckbox.addEventListener('change', toggleContinueButton);
    continueBtn.addEventListener('click', showParticipantForm);
    studentRadio.addEventListener('change', toggleParticipantFields);
    generalRadio.addEventListener('change', toggleParticipantFields);
    studentPurposeSelect.addEventListener('change', handleStudentPurpose);
    generalPurposeSelect.addEventListener('change', handleGeneralPurpose);
    participantForm.addEventListener('submit', saveParticipantData);
    levelButtons.forEach(btn => btn.addEventListener('click', handleLevelSelection));
    subjectButtons.forEach(btn => btn.addEventListener('click', handleSubjectSelection));
    startExamBtn.addEventListener('click', startExam);
    finishExamBtn.addEventListener('click', finishExam);
    skipQuestionBtn.addEventListener('click', skipQuestion);
    unansweredBtn.addEventListener('click', showUnansweredQuestions);
    viewCertificateBtn.addEventListener('click', showCertificate);
    retakeExamBtn.addEventListener('click', retakeExam);
    backToResultsBtn.addEventListener('click', backToResults);
    printCertificateBtn.addEventListener('click', printCertificate);
    floatingButtons.forEach(btn => btn.addEventListener('click', handleFloatingButton));
    shareBtn.addEventListener('click', () => toggleModal(shareModal));
    whatsappBtn.addEventListener('click', openWhatsappChat);
    questionBankBtn.addEventListener('click', () => toggleModal(questionBankModal));
    adminPanelBtn.addEventListener('click', () => toggleModal(adminModal));
    closeModalButtons.forEach(btn => btn.addEventListener('click', closeAllModals));
    copyLinkBtn.addEventListener('click', copyCurrentLink);
    addLinkBtn.addEventListener('click', addCustomLink);
    accessBankBtn.addEventListener('click', accessQuestionBank);
    bankTabs.forEach(tab => tab.addEventListener('click', switchBankTab));
    addMethodBtns.forEach(btn => btn.addEventListener('click', switchAddMethod));
    generateQuestionBtn.addEventListener('click', generateAiQuestion);
    saveAiQuestionBtn.addEventListener('click', saveAiQuestion);
    searchBtn.addEventListener('click', searchQuestions);
    exportBtns.forEach(btn => btn.addEventListener('click', exportQuestions));
    accessAdminBtn.addEventListener('click', accessAdminPanel);
    adminTabs.forEach(tab => tab.addEventListener('click', switchAdminTab));
    saveCodeBtns.forEach(btn => btn.addEventListener('click', saveCodeSettings));
    saveSettingBtns.forEach(btn => btn.addEventListener('click', saveExamSettings));
    saveTextBtns.forEach(btn => btn.addEventListener('click', saveTextSettings));
    addMotivationBtn.addEventListener('click', addMotivationMessage);
    refreshData.addEventListener('click', loadParticipantsData);
    exportDataBtns.forEach(btn => btn.addEventListener('click', exportParticipantsData));
    
    // Functions
    function handleLogin() {
        playButtonSound();
        const code = loginCodeInput.value.trim();
        
        if (code === adminSettings.loginCode) {
            loginError.textContent = "";
            animateTransition('.opening-screen', '.terms-container');
        } else {
            loginError.textContent = "Kode login salah. Silakan coba lagi.";
        }
    }
    
    function toggleContinueButton() {
        continueBtn.disabled = !termsCheckbox.checked;
    }
    
    function showParticipantForm() {
        playButtonSound();
        animateTransition('.terms-container', '.participant-form');
    }
    
    function toggleParticipantFields() {
        if (studentRadio.checked) {
            studentFields.forEach(field => field.classList.remove('hidden'));
            generalFields.forEach(field => field.classList.add('hidden'));
            cpnsField.classList.add('hidden');
        } else {
            studentFields.forEach(field => field.classList.add('hidden'));
            generalFields.forEach(field => field.classList.remove('hidden'));
            if (generalPurposeSelect.value === "cpns") {
                cpnsField.classList.remove('hidden');
            }
        }
    }
    
    function handleStudentPurpose() {
        // Additional logic for student purpose if needed
    }
    
    function handleGeneralPurpose() {
        if (generalPurposeSelect.value === "cpns") {
            cpnsField.classList.remove('hidden');
        } else {
            cpnsField.classList.add('hidden');
        }
    }
    
    function saveParticipantData(e) {
        e.preventDefault();
        playButtonSound();
        
        // Validate CPNS license code if applicable
        if (generalRadio.checked && generalPurposeSelect.value === "cpns") {
            const licenseCode = licenseCodeInput.value.trim();
            if (licenseCode !== adminSettings.cpnsCode) {
                licenseError.textContent = "Kode lisensi ujian CPNS/P3K salah.";
                return;
            }
            licenseError.textContent = "";
        }
        
        // Collect participant data
        participantData = {
            fullname: document.getElementById('fullname').value.trim(),
            status: document.querySelector('input[name="status"]:checked').value,
            purpose: studentRadio.checked ? studentPurposeSelect.value : generalPurposeSelect.value,
            timestamp: new Date().toISOString()
        };
        
        if (studentRadio.checked) {
            participantData.school = document.getElementById('school').value.trim();
            participantData.nis = document.getElementById('nis').value.trim();
            participantData.schoolLevel = schoolLevelSelect.value;
        } else {
            participantData.address = document.getElementById('address').value.trim();
            participantData.whatsapp = document.getElementById('whatsapp').value.trim();
            participantData.email = document.getElementById('email').value.trim();
        }
        
        // Validate all fields are filled
        for (const key in participantData) {
            if (!participantData[key]) {
                alert("Harap isi semua data dengan lengkap!");
                return;
            }
        }
        
        // Show exam level selection
        animateTransition('.participant-form', '.exam-level-container');
        
        // Show appropriate levels based on participant status
        if (participantData.status === "pelajar") {
            studentLevels.classList.remove('hidden');
            generalLevels.classList.add('hidden');
            
            // Show appropriate school level buttons
            document.querySelector('.sd-levels').classList.add('hidden');
            document.querySelector('.smp-levels').classList.add('hidden');
            document.querySelector('.sma-levels').classList.add('hidden');
            
            switch (participantData.schoolLevel) {
                case "sd":
                    document.querySelector('.sd-levels').classList.remove('hidden');
                    break;
                case "smp":
                    document.querySelector('.smp-levels').classList.remove('hidden');
                    break;
                case "sma":
                    document.querySelector('.sma-levels').classList.remove('hidden');
                    break;
            }
        } else {
            studentLevels.classList.add('hidden');
            generalLevels.classList.remove('hidden');
        }
    }
    
    function handleLevelSelection(e) {
        playButtonSound();
        const level = e.currentTarget.dataset.level;
        examData.level = level;
        
        // Show subject selection
        subjectSelection.classList.remove('hidden');
        startExamBtn.classList.remove('hidden');
        
        // Show appropriate subjects based on participant status
        if (participantData.status === "pelajar") {
            studentSubjects.classList.remove('hidden');
            generalSubjects.classList.add('hidden');
            
            // Enable/disable subjects based on admin settings
            const subjectBtns = studentSubjects.querySelectorAll('.subject-btn');
            subjectBtns.forEach(btn => {
                const subject = btn.dataset.subject;
                btn.disabled = !adminSettings.enabledExams.pelajar[subject];
                if (btn.disabled) {
                    btn.style.opacity = "0.5";
                    btn.style.cursor = "not-allowed";
                } else {
                    btn.style.opacity = "1";
                    btn.style.cursor = "pointer";
                }
            });
        } else {
            studentSubjects.classList.add('hidden');
            generalSubjects.classList.remove('hidden');
            
            // Enable/disable subjects based on admin settings
            const subjectBtns = generalSubjects.querySelectorAll('.subject-btn');
            subjectBtns.forEach(btn => {
                const subject = btn.dataset.subject;
                btn.disabled = !adminSettings.enabledExams.umum[subject];
                if (btn.disabled) {
                    btn.style.opacity = "0.5";
                    btn.style.cursor = "not-allowed";
                } else {
                    btn.style.opacity = "1";
                    btn.style.cursor = "pointer";
                }
            });
        }
    }
    
    function handleSubjectSelection(e) {
        playButtonSound();
        const subject = e.currentTarget.dataset.subject;
        examData.subject = subject;
        
        // Highlight selected subject
        subjectButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
    }
    
    function startExam() {
        playButtonSound();
        
        // Check if subject is selected
        if (!examData.subject) {
            alert("Pilih mata ujian terlebih dahulu!");
            return;
        }
        
        // Initialize exam data
        examData.questions = [];
        examData.answers = [];
        currentQuestion = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        
        // Get questions based on participant status and selected subject
        const category = participantData.status === "pelajar" ? "pelajar" : "umum";
        const subject = examData.subject;
        
        if (questionsData[category] && questionsData[category][subject]) {
            examData.questions = [...questionsData[category][subject]];
            totalQuestions = Math.min(adminSettings.questionCount, examData.questions.length);
            
            // Randomize questions if setting is enabled
            if (adminSettings.randomize === "yes") {
                examData.questions = shuffleArray(examData.questions).slice(0, totalQuestions);
            } else {
                examData.questions = examData.questions.slice(0, totalQuestions);
            }
            
            // Initialize answered questions array
            answeredQuestions = Array(totalQuestions).fill(false);
            
            // Start timer
            timeLeft = adminSettings.examTime * 60;
            startTimer();
            
            // Show exam screen
            animateTransition('.exam-level-container', '.exam-container');
            showQuestion();
        } else {
            alert("Tidak ada soal yang tersedia untuk ujian ini.");
        }
    }
    
    function showQuestion() {
        if (currentQuestion >= examData.questions.length) {
            finishExam();
            return;
        }
        
        const question = examData.questions[currentQuestion];
        questionText.textContent = question.question;
        
        // Clear previous options
        optionsContainer.innerHTML = "";
        answerExplanation.classList.add('hidden');
        
        // Add options
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option}</span>
            `;
            
            optionBtn.addEventListener('click', () => selectAnswer(String.fromCharCode(65 + index)));
            optionsContainer.appendChild(optionBtn);
        });
        
        // Update progress
        questionCount.textContent = `${currentQuestion + 1}/${totalQuestions}`;
        progressFill.style.width = `${((currentQuestion + 1) / totalQuestions) * 100}%`;
    }
    
    function selectAnswer(answer) {
        playButtonSound();
        
        const question = examData.questions[currentQuestion];
        const isCorrect = answer === question.correctAnswer;
        
        // Record answer
        examData.answers[currentQuestion] = {
            question: question.question,
            selected: answer,
            correct: question.correctAnswer,
            isCorrect: isCorrect,
            explanation: question.explanation
        };
        
        // Update score
        if (isCorrect) {
            correctAnswers++;
            correctAudio.play().catch(e => console.log("Audio play prevented:", e));
        } else {
            wrongAnswers++;
            wrongAudio.play().catch(e => console.log("Audio play prevented:", e));
        }
        
        // Mark as answered
        answeredQuestions[currentQuestion] = true;
        
        // Highlight selected answer
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            const optionLetter = btn.querySelector('.option-letter').textContent;
            
            if (optionLetter === answer) {
                btn.classList.add(isCorrect ? 'correct' : 'wrong');
            } else if (optionLetter === question.correctAnswer) {
                btn.classList.add('correct');
            }
            
            btn.disabled = true;
        });
        
        // Show explanation
        explanationText.textContent = question.explanation;
        answerExplanation.classList.remove('hidden');
    }
    
    function skipQuestion() {
        playButtonSound();
        currentQuestion++;
        showQuestion();
    }
    
    function showUnansweredQuestions() {
        playButtonSound();
        
        // Find first unanswered question
        const unansweredIndex = answeredQuestions.findIndex(answered => !answered);
        if (unansweredIndex !== -1) {
            currentQuestion = unansweredIndex;
            showQuestion();
        } else {
            alert("Semua soal telah dijawab.");
        }
    }
    
    function startTimer() {
        clearInterval(timerInterval);
        
        timerInterval = setInterval(() => {
            timeLeft--;
            
            // Update timer display
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            examTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Change color when time is running out
            if (timeLeft <= 600) { // 10 minutes
                examTimer.style.color = "#d63031";
                
                // Show warning when 10 minutes left
                if (timeLeft === 600) {
                    timeWarning.classList.remove('hidden');
                }
                
                // Hide warning when 1 minute left
                if (timeLeft === 60) {
                    timeWarning.classList.add('hidden');
                }
            }
            
            // End exam when time is up
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                finishExam();
            }
        }, 1000);
    }
    
    function finishExam() {
        playButtonSound();
        clearInterval(timerInterval);
        
        // Calculate score
        const score = Math.round((correctAnswers / totalQuestions) * 100);
        
        // Save participant data with results
        participantData.examResults = {
            subject: examData.subject,
            level: examData.level,
            totalQuestions: totalQuestions,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            score: score,
            timestamp: new Date().toISOString()
        };
        
        participantsData.push(participantData);
        
        // Show results
        showResults();
    }
    
    function showResults() {
        const results = participantData.examResults;
        
        correctAnswersSpan.textContent = results.correctAnswers;
        wrongAnswersSpan.textContent = results.wrongAnswers;
        totalQuestionsSpan.textContent = results.totalQuestions;
        examScoreSpan.textContent = results.score;
        
        // Generate answers list for details
        answersList.innerHTML = "";
        examData.answers.forEach((answer, index) => {
            const answerItem = document.createElement('div');
            answerItem.className = `answer-item ${answer.isCorrect ? 'correct' : 'wrong'}`;
            
            answerItem.innerHTML = `
                <div class="answer-question">${index + 1}. ${answer.question}</div>
                <div class="answer-choice">
                    <span>Jawaban Anda:</span>
                    <span class="${answer.isCorrect ? 'correct' : 'wrong'}">${answer.selected}</span>
                </div>
                <div class="answer-choice">
                    <span>Jawaban Benar:</span>
                    <span class="correct">${answer.correct}</span>
                </div>
                <div class="answer-explanation">${answer.explanation}</div>
            `;
            
            answersList.appendChild(answerItem);
        });
        
        animateTransition('.exam-container', '.results-container');
    }
    
    function showCertificate() {
        playButtonSound();
        applauseAudio.play().catch(e => console.log("Audio play prevented:", e));
        
        const results = participantData.examResults;
        const now = new Date();
        const dateString = now.toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
        
        // Generate certificate code
        const codeParts = [
            participantData.fullname.replace(/\s+/g, '').toUpperCase(),
            participantData.status.toUpperCase(),
            participantData.status === "pelajar" ? participantData.schoolLevel.toUpperCase() : "UMUM",
            examData.subject.toUpperCase(),
            now.getDate().toString().padStart(2, '0') + 
            (now.getMonth() + 1).toString().padStart(2, '0') + 
            now.getFullYear().toString(),
            generateRandomCode(8),
            "PERGUNU-STB"
        ];
        
        // Set certificate data
        certificateName.textContent = participantData.fullname;
        certificateScore.textContent = results.score;
        certificateDate.textContent = dateString;
        certificateCode.textContent = codeParts.join('/');
        
        // Set motivation message based on score
        let motivationIndex = 0;
        if (results.score >= 90) motivationIndex = 0;
        else if (results.score >= 75) motivationIndex = 1;
        else if (results.score >= 60) motivationIndex = 2;
        else if (results.score >= 40) motivationIndex = 3;
        else motivationIndex = 4;
        
        certificateMotivation.textContent = adminSettings.motivationMessages[motivationIndex];
        
        // Hide floating buttons during certificate view
        document.querySelector('.floating-buttons').classList.add('hidden');
        
        animateTransition('.results-container', '.certificate-container');
    }
    
    function backToResults() {
        playButtonSound();
        
        // Show floating buttons again
        document.querySelector('.floating-buttons').classList.remove('hidden');
        
        animateTransition('.certificate-container', '.results-container');
    }
    
    function retakeExam() {
        playButtonSound();
        
        // Show floating buttons again
        document.querySelector('.floating-buttons').classList.remove('hidden');
        
        // Go back to exam level selection
        animateTransition('.results-container', '.exam-level-container');
    }
    
    function printCertificate() {
        playButtonSound();
        
        // Hide elements that shouldn't be printed
        const certificateActions = document.querySelector('.certificate-actions');
        certificateActions.classList.add('hidden');
        
        // Trigger print
        window.print();
        
        // Show elements again after printing
        setTimeout(() => {
            certificateActions.classList.remove('hidden');
        }, 500);
    }
    
    function handleFloatingButton(e) {
        playButtonSound();
        const btn = e.currentTarget;
        
        if (btn.classList.contains('share-btn')) {
            toggleModal(shareModal);
        } else if (btn.classList.contains('whatsapp-btn')) {
            openWhatsappChat();
        } else if (btn.classList.contains('question-bank-btn')) {
            toggleModal(questionBankModal);
        } else if (btn.classList.contains('admin-panel-btn')) {
            toggleModal(adminModal);
        }
    }
    
    function toggleModal(modal) {
        playButtonSound();
        modal.classList.toggle('hidden');
        
        if (!modal.classList.contains('hidden')) {
            modal.querySelector('.modal-content').classList.add('animate__fadeInUp');
            
            // Load data if needed
            if (modal === questionBankModal) {
                loadQuestionBank();
            } else if (modal === adminModal) {
                loadAdminPanel();
            } else if (modal === shareModal) {
                loadShareLinks();
            }
        }
    }
    
    function closeAllModals() {
        playButtonSound();
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
    
    function openWhatsappChat() {
        playButtonSound();
        const phone = "6285647709114";
        const message = "Assalamualaikum mas admin, saya mau tanya sesuatu nih...";
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    }
    
    function copyCurrentLink() {
        playButtonSound();
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert("Tautan berhasil disalin!"))
            .catch(() => alert("Gagal menyalin tautan."));
    }
    
    function addCustomLink() {
        playButtonSound();
        const link = prompt("Masukkan tautan yang ingin ditambahkan:");
        if (link) {
            adminSettings.customLinks.push(link);
            loadShareLinks();
        }
    }
    
    function loadShareLinks() {
        linkList.innerHTML = "";
        adminSettings.customLinks.forEach((link, index) => {
            const linkItem = document.createElement('div');
            linkItem.className = 'link-item';
            linkItem.innerHTML = `
                <span>${link}</span>
                <button data-index="${index}"><i class="fas fa-trash"></i></button>
            `;
            
            linkItem.querySelector('button').addEventListener('click', (e) => {
                e.stopPropagation();
                playButtonSound();
                adminSettings.customLinks.splice(index, 1);
                loadShareLinks();
            });
            
            linkList.appendChild(linkItem);
        });
    }
    
    function accessQuestionBank() {
        playButtonSound();
        const code = bankCodeInput.value.trim();
        
        if (code === adminSettings.bankCode) {
            bankError.textContent = "";
            bankContent.classList.remove('hidden');
        } else {
            bankError.textContent = "Kode bank soal salah. Silakan coba lagi.";
        }
    }
    
    function switchBankTab(e) {
        playButtonSound();
        const tab = e.currentTarget.dataset.tab;
        
        bankTabs.forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.dataset.tab === tab) {
                content.classList.add('active');
            }
        });
    }
    
    function switchAddMethod(e) {
        playButtonSound();
        const method = e.currentTarget.dataset.method;
        
        addMethodBtns.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        manualForm.classList.add('hidden');
        aiForm.classList.add('hidden');
        
        if (method === "manual") {
            manualForm.classList.remove('hidden');
        } else {
            aiForm.classList.remove('hidden');
        }
    }
    
    function loadQuestionBank() {
        // Load question bank data
        // In a real app, this would come from a database
        console.log("Loading question bank data...");
        
        // Update stats
        let total = 0;
        let studentCount = 0;
        let generalCount = 0;
        
        for (const category in questionsData) {
            for (const subject in questionsData[category]) {
                const count = questionsData[category][subject].length;
                total += count;
                
                if (category === "pelajar") {
                    studentCount += count;
                } else {
                    generalCount += count;
                }
            }
        }
        
        totalQuestionsStat.textContent = total;
        studentQuestionsStat.textContent = studentCount;
        generalQuestionsStat.textContent = generalCount;
        
        // Load questions for edit tab
        loadQuestionsForEdit();
    }
    
    function loadQuestionsForEdit() {
        questionsList.innerHTML = "";
        questionsTableBody.innerHTML = "";
        
        let questionIndex = 0;
        
        for (const category in questionsData) {
            for (const subject in questionsData[category]) {
                questionsData[category][subject].forEach((question, index) => {
                    questionIndex++;
                    
                    // Add to cards view
                    const questionCard = document.createElement('div');
                    questionCard.className = 'question-card';
                    questionCard.dataset.category = category;
                    questionCard.dataset.subject = subject;
                    questionCard.dataset.index = index;
                    
                    questionCard.innerHTML = `
                        <h4>${questionIndex}. ${question.question}</h4>
                        <p><span class="category">${category}</span> <span class="category">${subject}</span></p>
                        <p>Jawaban benar: ${question.correctAnswer}</p>
                    `;
                    
                    questionCard.addEventListener('click', () => editQuestion(category, subject, index));
                    questionsList.appendChild(questionCard);
                    
                    // Add to table view
                    const tableRow = document.createElement('tr');
                    tableRow.innerHTML = `
                        <td>${questionIndex}</td>
                        <td>${question.question}</td>
                        <td>${category}</td>
                        <td>${subject}</td>
                        <td>${question.difficulty || '-'}</td>
                        <td>
                            <button class="btn-small edit-btn" data-category="${category}" data-subject="${subject}" data-index="${index}">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-small delete-btn" data-category="${category}" data-subject="${subject}" data-index="${index}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    `;
                    
                    tableRow.querySelector('.edit-btn').addEventListener('click', (e) => {
                        e.stopPropagation();
                        editQuestion(category, subject, index);
                    });
                    
                    tableRow.querySelector('.delete-btn').addEventListener('click', (e) => {
                        e.stopPropagation();
                        deleteQuestion(category, subject, index);
                    });
                    
                    questionsTableBody.appendChild(tableRow);
                });
            }
        }
    }
    
    function editQuestion(category, subject, index) {
        playButtonSound();
        const question = questionsData[category][subject][index];
        
        // Fill the manual form with question data
        document.getElementById('question-category').value = category;
        document.getElementById('question-subject').value = subject;
        document.getElementById('question-difficulty').value = question.difficulty || 'mudah';
        document.getElementById('question-text').value = question.question;
        
        // Fill options
        const optionItems = document.querySelectorAll('.option-item');
        question.options.forEach((option, i) => {
            if (i < optionItems.length) {
                const optionText = optionItems[i].querySelector('.option-text');
                optionText.value = option.substring(3); // Remove "A. ", "B. ", etc.
                
                const radio = optionItems[i].querySelector('input[type="radio"]');
                radio.checked = (String.fromCharCode(65 + i) === question.correctAnswer);
            }
        });
        
        document.getElementById('explanation').value = question.explanation;
        
        // Switch to manual form and add question tab
        addMethodBtns[0].click();
        bankTabs[0].click();
        
        // Scroll to form
        document.querySelector('.manual-form').scrollIntoView({ behavior: 'smooth' });
    }
    
    function deleteQuestion(category, subject, index) {
        playButtonSound();
        if (confirm("Apakah Anda yakin ingin menghapus soal ini?")) {
            questionsData[category][subject].splice(index, 1);
            loadQuestionsForEdit();
        }
    }
    
    function searchQuestions() {
        playButtonSound();
        const searchTerm = searchQuestionInput.value.toLowerCase();
        const category = filterCategory.value;
        const subject = filterSubject.value;
        const difficulty = filterDifficulty.value;
        
        const questionCards = document.querySelectorAll('.question-card');
        questionCards.forEach(card => {
            const matchesCategory = !category || card.dataset.category === category;
            const matchesSubject = !subject || card.dataset.subject === subject;
            const matchesSearch = !searchTerm || 
                card.textContent.toLowerCase().includes(searchTerm);
            
            // Difficulty filtering would require adding difficulty data to questions
            
            if (matchesCategory && matchesSubject && matchesSearch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    function generateAiQuestion() {
        playButtonSound();
        const apiKey = apiKeyInput.value.trim();
        const prompt = aiPromptInput.value.trim();
        const category = document.getElementById('ai-category').value;
        const subject = document.getElementById('ai-subject').value;
        const difficulty = document.getElementById('ai-difficulty').value;
        
        if (!apiKey) {
            alert("Masukkan API Key AI Anda terlebih dahulu.");
            return;
        }
        
        if (!prompt) {
            alert("Masukkan prompt untuk menghasilkan soal.");
            return;
        }
        
        // Show loading
        generatedQuestion.innerHTML = "<p>Membuat soal...</p>";
        aiResult.classList.remove('hidden');
        
        // In a real app, this would call an AI API
        // For demo purposes, we'll simulate with a timeout
        setTimeout(() => {
            // Simulated AI response
            const sampleQuestion = {
                question: "Contoh soal yang dihasilkan oleh AI berdasarkan prompt: " + prompt,
                options: [
                    "A. Pilihan jawaban A",
                    "B. Pilihan jawaban B",
                    "C. Pilihan jawaban C",
                    "D. Pilihan jawaban D"
                ],
                correctAnswer: "B",
                explanation: "Ini adalah penjelasan untuk jawaban yang benar.",
                difficulty: difficulty
            };
            
            // Display generated question
            generatedQuestion.innerHTML = `
                <div class="generated-question-text">
                    <h5>${sampleQuestion.question}</h5>
                    <ul>
                        ${sampleQuestion.options.map(opt => `<li>${opt}</li>`).join('')}
                    </ul>
                    <p><strong>Jawaban benar:</strong> ${sampleQuestion.correctAnswer}</p>
                    <p><strong>Penjelasan:</strong> ${sampleQuestion.explanation}</p>
                    <p><strong>Tingkat kesulitan:</strong> ${sampleQuestion.difficulty}</p>
                </div>
            `;
        }, 2000);
    }
    
    function saveAiQuestion() {
        playButtonSound();
        // In a real app, this would save the generated question to the database
        alert("Soal berhasil disimpan (simulasi)");
        aiResult.classList.add('hidden');
    }
    
    function exportQuestions() {
        playButtonSound();
        // In a real app, this would export questions to the selected format
        alert("Fitur ekspor akan mengunduh data soal dalam format yang dipilih");
    }
    
    function accessAdminPanel() {
        playButtonSound();
        const code = adminCodeInput.value.trim();
        
        if (code === adminSettings.adminCode) {
            adminError.textContent = "";
            adminContent.classList.remove('hidden');
        } else {
            adminError.textContent = "Kode admin salah. Silakan coba lagi.";
        }
    }
    
    function switchAdminTab(e) {
        playButtonSound();
        const tab = e.currentTarget.dataset.tab;
        
        adminTabs.forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        adminTabContents.forEach(content => {
            content.classList.remove('active');
            if (content.dataset.tab === tab) {
                content.classList.add('active');
            }
        });
    }
    
    function loadAdminPanel() {
        // Load current settings
        currentLoginCode.value = adminSettings.loginCode;
        currentCpnsCode.value = adminSettings.cpnsCode;
        currentBankCode.value = adminSettings.bankCode;
        currentAdminCode.value = adminSettings.adminCode;
        
        examTimeInput.value = adminSettings.examTime;
        pointValueSelect.value = adminSettings.pointValue;
        questionCountSetting.value = adminSettings.questionCount;
        randomizeQuestions.value = adminSettings.randomize;
        
        greetingTextSetting.value = adminSettings.greetingText;
        infoTextSetting.value = adminSettings.infoText;
        chairmanTextSetting.value = adminSettings.chairmanName;
        
        // Load motivation messages
        motivationMessages.innerHTML = "";
        adminSettings.motivationMessages.forEach((msg, index) => {
            const msgItem = document.createElement('div');
            msgItem.className = 'motivation-item';
            msgItem.innerHTML = `
                <input type="text" value="${msg}">
                <button data-index="${index}"><i class="fas fa-trash"></i></button>
            `;
            
            msgItem.querySelector('button').addEventListener('click', (e) => {
                e.stopPropagation();
                playButtonSound();
                adminSettings.motivationMessages.splice(index, 1);
                loadAdminPanel();
            });
            
            motivationMessages.appendChild(msgItem);
        });
        
        // Load exam toggles
        examToggleContainer.innerHTML = "";
        
        for (const category in adminSettings.enabledExams) {
            for (const subject in adminSettings.enabledExams[category]) {
                const toggle = document.createElement('div');
                toggle.className = 'exam-toggle';
                
                const label = category === "pelajar" ? 
                    `Pelajar: ${subject}` : `Umum: ${subject}`;
                
                toggle.innerHTML = `
                    <span>${label}</span>
                    <label class="toggle-switch">
                        <input type="checkbox" ${adminSettings.enabledExams[category][subject] ? 'checked' : ''} 
                            data-category="${category}" data-subject="${subject}">
                        <span class="toggle-slider"></span>
                    </label>
                `;
                
                toggle.querySelector('input').addEventListener('change', (e) => {
                    const isEnabled = e.target.checked;
                    const category = e.target.dataset.category;
                    const subject = e.target.dataset.subject;
                    adminSettings.enabledExams[category][subject] = isEnabled;
                });
                
                examToggleContainer.appendChild(toggle);
            }
        }
        
        // Load participants data
        loadParticipantsData();
    }
    
    function loadParticipantsData() {
        playButtonSound();
        participantsTableBody.innerHTML = "";
        
        participantsData.forEach((participant, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${participant.fullname}</td>
                <td>${participant.status}</td>
                <td>${participant.examResults?.subject || '-'}</td>
                <td>${participant.examResults?.score || '-'}</td>
                <td>${new Date(participant.timestamp).toLocaleDateString()}</td>
                <td>
                    <button class="btn-small view-btn" data-index="${index}">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            
            row.querySelector('.view-btn').addEventListener('click', () => {
                viewParticipantDetails(index);
            });
            
            participantsTableBody.appendChild(row);
        });
    }
    
    function viewParticipantDetails(index) {
        playButtonSound();
        const participant = participantsData[index];
        
        let details = `Nama: ${participant.fullname}\n`;
        details += `Status: ${participant.status}\n`;
        
        if (participant.status === "pelajar") {
            details += `Sekolah: ${participant.school}\n`;
            details += `NIS: ${participant.nis}\n`;
            details += `Tingkat: ${participant.schoolLevel}\n`;
        } else {
            details += `Alamat: ${participant.address}\n`;
            details += `WhatsApp: ${participant.whatsapp}\n`;
            details += `Email: ${participant.email}\n`;
        }
        
        if (participant.examResults) {
            details += `\nHasil Ujian:\n`;
            details += `Mata Ujian: ${participant.examResults.subject}\n`;
            details += `Tingkat: ${participant.examResults.level}\n`;
            details += `Total Soal: ${participant.examResults.totalQuestions}\n`;
            details += `Jawaban Benar: ${participant.examResults.correctAnswers}\n`;
            details += `Jawaban Salah: ${participant.examResults.wrongAnswers}\n`;
            details += `Nilai: ${participant.examResults.score}\n`;
        }
        
        alert(details);
    }
    
    function saveCodeSettings(e) {
        playButtonSound();
        const type = e.currentTarget.dataset.type;
        
        let newCode, currentCode;
        
        switch (type) {
            case "login":
                newCode = newLoginCode.value.trim();
                currentCode = currentLoginCode.value.trim();
                break;
            case "cpns":
                newCode = newCpnsCode.value.trim();
                currentCode = currentCpnsCode.value.trim();
                break;
            case "bank":
                newCode = newBankCode.value.trim();
                currentCode = currentBankCode.value.trim();
                break;
            case "admin":
                newCode = newAdminCode.value.trim();
                currentCode = currentAdminCode.value.trim();
                break;
        }
        
        if (!newCode) {
            alert("Kode baru tidak boleh kosong!");
            return;
        }
        
        if (newCode === currentCode) {
            alert("Kode baru harus berbeda dengan kode lama!");
            return;
        }
        
        // In a real app, this would save to database
        switch (type) {
            case "login":
                adminSettings.loginCode = newCode;
                currentLoginCode.value = newCode;
                break;
            case "cpns":
                adminSettings.cpnsCode = newCode;
                currentCpnsCode.value = newCode;
                break;
            case "bank":
                adminSettings.bankCode = newCode;
                currentBankCode.value = newCode;
                break;
            case "admin":
                adminSettings.adminCode = newCode;
                currentAdminCode.value = newCode;
                break;
        }
        
        alert(`Kode ${type} berhasil diperbarui!`);
    }
    
    function saveExamSettings(e) {
        playButtonSound();
        const setting = e.currentTarget.dataset.setting;
        let value;
        
        switch (setting) {
            case "exam-time":
                value = parseInt(examTimeInput.value);
                if (isNaN(value) {
                    alert("Waktu ujian harus berupa angka!");
                    return;
                }
                adminSettings.examTime = value;
                break;
            case "point-value":
                value = pointValueSelect.value;
                adminSettings.pointValue = value;
                break;
            case "question-count":
                value = questionCountSetting.value;
                adminSettings.questionCount = value;
                break;
            case "randomize":
                value = randomizeQuestions.value;
                adminSettings.randomize = value;
                break;
        }
        
        alert("Pengaturan ujian berhasil disimpan!");
    }
    
    function saveTextSettings(e) {
        playButtonSound();
        const type = e.currentTarget.dataset.text;
        let value;
        
        switch (type) {
            case "greeting":
                value = greetingTextSetting.value;
                adminSettings.greetingText = value;
                document.getElementById('greeting-text').textContent = value;
                break;
            case "info":
                value = infoTextSetting.value;
                adminSettings.infoText = value;
                document.getElementById('info-text').textContent = value;
                break;
            case "chairman":
                value = chairmanTextSetting.value;
                adminSettings.chairmanName = value;
                document.getElementById('chairman-name').textContent = value;
                break;
        }
        
        alert("Teks berhasil diperbarui!");
    }
    
    function addMotivationMessage() {
        playButtonSound();
        const message = prompt("Masukkan pesan motivasi baru:");
        if (message) {
            adminSettings.motivationMessages.push(message);
            loadAdminPanel();
        }
    }
    
    function exportParticipantsData(e) {
        playButtonSound();
        const format = e.currentTarget.dataset.format;
        // In a real app, this would export data to the selected format
        alert(`Data peserta akan diekspor dalam format ${format.toUpperCase()}`);
    }
    
    function animateTransition(hideSelector, showSelector) {
        const hideElement = document.querySelector(hideSelector);
        const showElement = document.querySelector(showSelector);
        
        if (hideElement) {
            hideElement.classList.add('animate__fadeOut');
            setTimeout(() => {
                hideElement.classList.add('hidden');
                hideElement.classList.remove('animate__fadeOut');
            }, 500);
        }
        
        if (showElement) {
            showElement.classList.remove('hidden');
            showElement.classList.add('animate__fadeIn');
            setTimeout(() => {
                showElement.classList.remove('animate__fadeIn');
            }, 500);
        }
    }
    
    function playButtonSound() {
        buttonAudio.currentTime = 0;
        buttonAudio.play().catch(e => console.log("Audio play prevented:", e));
    }
    
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    function generateRandomCode(length) {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    // Initialize form fields
    toggleParticipantFields();
});
