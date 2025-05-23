// DOM Elements
const loginModal = document.querySelector('.opening-modal');
const mainContainer = document.querySelector('.main-container');
const loginBtn = document.getElementById('login-btn');
const loginCode = document.getElementById('login-code');
const agreeCheckbox = document.getElementById('agree-rules');
const nextToFormBtn = document.getElementById('next-to-form');
const participantForm = document.querySelector('.participant-form');
const rulesPage = document.querySelector('.rules-page');
const examSelection = document.querySelector('.exam-selection');
const examPage = document.querySelector('.exam-page');
const resultsPage = document.querySelector('.results-page');
const certificatePage = document.querySelector('.certificate-page');
const floatingButtons = document.querySelector('.floating-buttons');
const shareModal = document.querySelector('.share-modal');
const questionBankModal = document.querySelector('.question-bank-modal');
const adminPanelModal = document.querySelector('.admin-panel-modal');
const adminPanel = document.querySelector('.admin-panel');

// Default codes
const DEFAULT_LOGIN_CODE = '12345';
const DEFAULT_CPNS_CODE = 'OPENLOCK-1945';
const DEFAULT_BANK_CODE = 'OPENLOCK-1926';
const DEFAULT_ADMIN_CODE = '65614222';

// Audio elements
const openingAudio = document.getElementById('opening-audio');
const correctAudio = document.getElementById('correct-audio');
const wrongAudio = document.getElementById('wrong-audio');
const buttonAudio = document.getElementById('button-audio');
const applauseAudio = document.getElementById('applause-audio');

// Current state
let currentState = {
    participant: null,
    examType: null,
    examCategory: null,
    examGrade: null,
    selectedOptions: {},
    correctAnswers: 0,
    wrongAnswers: 0,
    unanswered: 0,
    timer: null,
    timeLeft: 120 * 60, // 120 minutes in seconds
    questions: [],
    currentQuestionIndex: 0
};

// Initialize the app
function init() {
    // Play opening audio
    openingAudio.play();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize particles
    initParticles();
    
    // Load questions
    loadQuestions();
}

// Set up event listeners
function setupEventListeners() {
    // Login button
    loginBtn.addEventListener('click', handleLogin);
    
    // Enter key for login
    loginCode.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
    
    // Rules agreement checkbox
    agreeCheckbox.addEventListener('change', (e) => {
        nextToFormBtn.disabled = !e.target.checked;
    });
    
    // Next to form button
    nextToFormBtn.addEventListener('click', () => {
        rulesPage.classList.remove('active-page');
        participantForm.classList.add('active-page');
        playButtonSound();
    });
    
    // Participant form status radio buttons
    document.querySelectorAll('input[name="status"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'pelajar') {
                document.querySelector('.student-fields').style.display = 'block';
                document.querySelector('.general-fields').style.display = 'none';
            } else {
                document.querySelector('.student-fields').style.display = 'none';
                document.querySelector('.general-fields').style.display = 'block';
            }
        });
    });
    
    // Get location button
    document.getElementById('get-location').addEventListener('click', getLocation);
    
    // Participant form submit
    document.getElementById('participant-data').addEventListener('submit', (e) => {
        e.preventDefault();
        saveParticipantData();
    });
    
    // Student level selection
    document.getElementById('student-level').addEventListener('change', (e) => {
        const level = e.target.value;
        document.querySelectorAll('.grade-options').forEach(el => el.style.display = 'none');
        if (level) {
            document.getElementById(`${level}-grades`).style.display = 'flex';
        }
    });
    
    // Grade buttons
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.grade-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentState.examGrade = e.target.dataset.grade;
            checkExamReady();
            playButtonSound();
        });
    });
    
    // Subject buttons
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentState.examCategory = e.target.dataset.subject;
            checkExamReady();
            playButtonSound();
        });
    });
    
    // General exam buttons
    document.querySelectorAll('.general-exam-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.general-exam-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentState.examCategory = e.target.dataset.exam;
            
            if (currentState.examCategory === 'cpns') {
                document.getElementById('cpns-license').style.display = 'block';
            } else {
                document.getElementById('cpns-license').style.display = 'none';
                checkExamReady();
            }
            
            playButtonSound();
        });
    });
    
    // Verify CPNS code
    document.getElementById('verify-cpns').addEventListener('click', verifyCPNSCode);
    
    // Start exam button
    document.getElementById('start-exam-btn').addEventListener('click', startExam);
    
    // Exam options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', selectAnswer);
    });
    
    // Exam controls
    document.getElementById('finish-exam-btn').addEventListener('click', finishExam);
    document.getElementById('skip-question-btn').addEventListener('click', skipQuestion);
    document.getElementById('unanswered-btn').addEventListener('click', showUnanswered);
    
    // Results actions
    document.getElementById('view-certificate-btn').addEventListener('click', viewCertificate);
    document.getElementById('retake-exam-btn').addEventListener('click', retakeExam);
    
    // Certificate actions
    document.getElementById('print-certificate-btn').addEventListener('click', printCertificate);
    document.getElementById('back-to-results-btn').addEventListener('click', backToResults);
    
    // Floating buttons
    document.querySelector('.share-btn').addEventListener('click', () => {
        shareModal.classList.add('active');
        playButtonSound();
    });
    
    document.querySelector('.whatsapp-btn').addEventListener('click', () => {
        window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih…`);
        playButtonSound();
    });
    
    document.querySelector('.question-bank-btn').addEventListener('click', () => {
        questionBankModal.classList.add('active');
        playButtonSound();
    });
    
    document.querySelector('.admin-panel-btn').addEventListener('click', () => {
        adminPanelModal.classList.add('active');
        playButtonSound();
    });
    
    // Close modals
    document.querySelector('.close-share').addEventListener('click', () => {
        shareModal.classList.remove('active');
        playButtonSound();
    });
    
    document.getElementById('verify-question-bank').addEventListener('click', verifyQuestionBankCode);
    document.getElementById('verify-admin-panel').addEventListener('click', verifyAdminPanelCode);
    
    // Close admin panel
    document.getElementById('close-admin-panel').addEventListener('click', () => {
        adminPanel.style.display = 'none';
        playButtonSound();
    });
    
    // Admin tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            
            e.target.classList.add('active');
            document.getElementById(`${e.target.dataset.tab}-tab`).classList.add('active');
            playButtonSound();
        });
    });
}

// Handle login
function handleLogin() {
    const code = loginCode.value.trim();
    
    if (code === DEFAULT_LOGIN_CODE) {
        playButtonSound();
        loginModal.style.display = 'none';
        mainContainer.style.display = 'block';
    } else {
        alert('Kode login salah. Silakan coba lagi.');
        loginCode.value = '';
        loginCode.focus();
    }
}

// Save participant data
function saveParticipantData() {
    const status = document.querySelector('input[name="status"]:checked').value;
    
    const participant = {
        fullname: document.getElementById('fullname').value.trim(),
        status: status,
        purpose: status === 'pelajar' 
            ? document.getElementById('student-purpose').value 
            : document.getElementById('general-purpose').value,
        timestamp: new Date().toISOString()
    };
    
    if (status === 'pelajar') {
        participant.school = document.getElementById('school').value.trim();
        participant.nis = document.getElementById('nis').value.trim();
        participant.level = document.getElementById('student-level').value;
    } else {
        participant.address = document.getElementById('address').value.trim();
        participant.whatsapp = document.getElementById('whatsapp').value.trim();
        participant.email = document.getElementById('email').value.trim();
    }
    
    currentState.participant = participant;
    
    // Save to localStorage (simulating server save)
    saveParticipantToStorage(participant);
    
    // Move to exam selection
    participantForm.classList.remove('active-page');
    examSelection.classList.add('active-page');
    
    // Show appropriate exam options
    if (status === 'pelajar') {
        document.querySelector('.student-exam-options').style.display = 'block';
        document.querySelector('.general-exam-options').style.display = 'none';
    } else {
        document.querySelector('.student-exam-options').style.display = 'none';
        document.querySelector('.general-exam-options').style.display = 'block';
    }
    
    playButtonSound();
}

// Get location
function getLocation() {
    const statusElement = document.getElementById('location-status');
    statusElement.textContent = 'Mendapatkan lokasi...';
    statusElement.style.color = 'yellow';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                document.getElementById('address').value = `${lat}, ${lng}`;
                statusElement.textContent = 'Lokasi berhasil didapatkan';
                statusElement.style.color = 'lightgreen';
                playButtonSound();
            },
            (error) => {
                let message = '';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        message = 'Akses lokasi ditolak oleh pengguna';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message = 'Informasi lokasi tidak tersedia';
                        break;
                    case error.TIMEOUT:
                        message = 'Permintaan lokasi timeout';
                        break;
                    case error.UNKNOWN_ERROR:
                        message = 'Error tidak diketahui';
                        break;
                }
                statusElement.textContent = message;
                statusElement.style.color = 'red';
            }
        );
    } else {
        statusElement.textContent = 'Geolocation tidak didukung oleh browser ini';
        statusElement.style.color = 'red';
    }
}

// Check if exam is ready to start
function checkExamReady() {
    const startBtn = document.getElementById('start-exam-btn');
    
    if (currentState.participant.status === 'pelajar') {
        startBtn.disabled = !(currentState.examGrade && currentState.examCategory);
    } else {
        startBtn.disabled = !currentState.examCategory;
    }
}

// Verify CPNS code
function verifyCPNSCode() {
    const code = document.getElementById('cpns-code').value.trim();
    const statusElement = document.getElementById('cpns-code-status');
    
    if (code === DEFAULT_CPNS_CODE) {
        statusElement.textContent = 'Kode valid!';
        statusElement.style.color = 'lightgreen';
        checkExamReady();
        playButtonSound();
    } else {
        statusElement.textContent = 'Kode tidak valid';
        statusElement.style.color = 'red';
    }
}

// Verify question bank code
function verifyQuestionBankCode() {
    const code = document.getElementById('question-bank-code').value.trim();
    const statusElement = document.getElementById('question-bank-status');
    
    if (code === DEFAULT_BANK_CODE) {
        statusElement.textContent = 'Kode valid! Mengarahkan ke bank soal...';
        statusElement.style.color = 'lightgreen';
        questionBankModal.classList.remove('active');
        // Here you would normally show the question bank interface
        alert('Bank soal akan ditampilkan di sini');
        playButtonSound();
    } else {
        statusElement.textContent = 'Kode tidak valid';
        statusElement.style.color = 'red';
    }
}

// Verify admin panel code
function verifyAdminPanelCode() {
    const code = document.getElementById('admin-panel-code').value.trim();
    const statusElement = document.getElementById('admin-panel-status');
    
    if (code === DEFAULT_ADMIN_CODE) {
        statusElement.textContent = 'Kode valid! Membuka panel admin...';
        statusElement.style.color = 'lightgreen';
        adminPanelModal.classList.remove('active');
        adminPanel.style.display = 'block';
        playButtonSound();
    } else {
        statusElement.textContent = 'Kode tidak valid';
        statusElement.style.color = 'red';
    }
}

// Start exam
function startExam() {
    examSelection.classList.remove('active-page');
    examPage.classList.add('active-page');
    
    // Filter questions based on selection
    filterQuestions();
    
    // Start timer
    startTimer();
    
    // Load first question
    loadQuestion(0);
    
    playButtonSound();
}

// Filter questions based on selection
function filterQuestions() {
    const { participant, examCategory, examGrade } = currentState;
    
    if (participant.status === 'pelajar') {
        currentState.questions = questions.filter(q => 
            q.type === 'pelajar' && 
            q.category === examCategory && 
            q.grade === examGrade
        );
    } else {
        currentState.questions = questions.filter(q => 
            q.type === 'umum' && 
            q.category === examCategory
        );
    }
    
    // Randomize if setting is enabled
    if (localStorage.getItem('randomizeQuestions') === 'true') {
        currentState.questions = shuffleArray(currentState.questions);
    }
    
    // Limit number of questions
    const questionCount = parseInt(localStorage.getItem('questionCount') || '10');
    currentState.questions = currentState.questions.slice(0, questionCount);
    
    document.getElementById('total-questions').textContent = currentState.questions.length;
}

// Load question
function loadQuestion(index) {
    if (index < 0 || index >= currentState.questions.length) return;
    
    currentState.currentQuestionIndex = index;
    const question = currentState.questions[index];
    
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('option-a').textContent = question.options.a;
    document.getElementById('option-b').textContent = question.options.b;
    document.getElementById('option-c').textContent = question.options.c;
    document.getElementById('option-d').textContent = question.options.d;
    document.getElementById('option-e').textContent = question.options.e;
    document.getElementById('current-question').textContent = index + 1;
    
    // Reset option styles
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('correct', 'wrong');
        opt.style.pointerEvents = 'auto';
    });
    
    // Hide explanation
    document.getElementById('answer-explanation').style.display = 'none';
    
    // Disable already answered questions
    if (currentState.selectedOptions[index]) {
        const selectedOption = document.querySelector(`.option[data-option="${currentState.selectedOptions[index]}"]`);
        selectedOption.classList.add('selected');
        selectedOption.style.pointerEvents = 'none';
    }
}

// Select answer
function selectAnswer(e) {
    const option = e.currentTarget.dataset.option;
    const question = currentState.questions[currentState.currentQuestionIndex];
    
    // Mark as selected
    currentState.selectedOptions[currentState.currentQuestionIndex] = option;
    
    // Disable all options
    document.querySelectorAll('.option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    // Show correct/wrong
    if (option === question.correctAnswer) {
        e.currentTarget.classList.add('correct');
        correctAudio.play();
        currentState.correctAnswers++;
    } else {
        e.currentTarget.classList.add('wrong');
        document.querySelector(`.option[data-option="${question.correctAnswer}"]`).classList.add('correct');
        wrongAudio.play();
        currentState.wrongAnswers++;
    }
    
    // Show explanation
    document.getElementById('explanation-text').textContent = question.explanation;
    document.getElementById('answer-explanation').style.display = 'block';
    
    // Auto move to next question after delay
    setTimeout(() => {
        if (currentState.currentQuestionIndex < currentState.questions.length - 1) {
            loadQuestion(currentState.currentQuestionIndex + 1);
        }
    }, 2000);
}

// Skip question
function skipQuestion() {
    if (currentState.currentQuestionIndex < currentState.questions.length - 1) {
        loadQuestion(currentState.currentQuestionIndex + 1);
    }
    playButtonSound();
}

// Show unanswered questions
function showUnanswered() {
    for (let i = 0; i < currentState.questions.length; i++) {
        if (!currentState.selectedOptions[i]) {
            loadQuestion(i);
            return;
        }
    }
    
    alert('Semua soal telah dijawab');
    playButtonSound();
}

// Finish exam
function finishExam() {
    clearInterval(currentState.timer);
    
    // Calculate unanswered questions
    currentState.unanswered = currentState.questions.length - 
                             currentState.correctAnswers - 
                             currentState.wrongAnswers;
    
    // Calculate score (assuming 10 points per correct answer)
    const pointsPerQuestion = parseInt(localStorage.getItem('pointsPerQuestion') || '10');
    const score = Math.round((currentState.correctAnswers / currentState.questions.length) * 100);
    const totalScore = currentState.correctAnswers * pointsPerQuestion;
    
    // Show results
    examPage.classList.remove('active-page');
    resultsPage.classList.add('active-page');
    
    document.getElementById('total-answered').textContent = currentState.questions.length;
    document.getElementById('correct-answers').textContent = currentState.correctAnswers;
    document.getElementById('wrong-answers').textContent = currentState.wrongAnswers;
    document.getElementById('exam-score').textContent = `${score} (${totalScore} poin)`;
    
    // Hide floating buttons on results page
    floatingButtons.style.display = 'none';
    
    playButtonSound();
}

// View certificate
function viewCertificate() {
    resultsPage.classList.remove('active-page');
    certificatePage.classList.add('active-page');
    
    // Set certificate data
    const { participant, correctAnswers, questions } = currentState;
    const score = Math.round((correctAnswers / questions.length) * 100);
    const date = new Date(participant.timestamp);
    const dateStr = date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    // Generate certificate code
    const certCode = generateCertificateCode(participant, date);
    
    // Set certificate content
    document.getElementById('certificate-name').textContent = participant.fullname;
    document.getElementById('certificate-score').textContent = score;
    document.getElementById('certificate-date').textContent = `Ditetapkan di: Situbondo, ${dateStr}`;
    document.getElementById('certificate-code').textContent = `Kode: ${certCode}`;
    
    // Set motivation text based on score
    setMotivationText(score);
    
    // Play applause
    applauseAudio.play();
}

// Print certificate
function printCertificate() {
    const printContent = document.getElementById('certificate-container').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    
    // Reload the current page to restore functionality
    window.location.reload();
}

// Back to results
function backToResults() {
    certificatePage.classList.remove('active-page');
    resultsPage.classList.add('active-page');
    playButtonSound();
}

// Retake exam
function retakeExam() {
    // Reset state
    currentState = {
        ...currentState,
        selectedOptions: {},
        correctAnswers: 0,
        wrongAnswers: 0,
        unanswered: 0,
        timer: null,
        timeLeft: 120 * 60,
        currentQuestionIndex: 0
    };
    
    // Show exam selection
    resultsPage.classList.remove('active-page');
    examSelection.classList.add('active-page');
    
    // Show floating buttons again
    floatingButtons.style.display = 'flex';
    
    playButtonSound();
}

// Start timer
function startTimer() {
    // Get timer setting from localStorage or use default (120 minutes)
    const examTime = parseInt(localStorage.getItem('examTimer') || '120');
    currentState.timeLeft = examTime * 60;
    
    updateTimerDisplay();
    
    currentState.timer = setInterval(() => {
        currentState.timeLeft--;
        updateTimerDisplay();
        
        if (currentState.timeLeft <= 0) {
            clearInterval(currentState.timer);
            finishExam();
        } else if (currentState.timeLeft === 600) { // 10 minutes left
            showTimeWarning();
        } else if (currentState.timeLeft === 60) { // 1 minute left
            hideTimeWarning();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(currentState.timeLeft / 60);
    const seconds = currentState.timeLeft % 60;
    
    // Make timer bigger when 10 minutes left
    if (currentState.timeLeft <= 600) {
        document.getElementById('exam-timer').style.fontSize = '1.5rem';
        document.getElementById('exam-timer').style.color = 'orange';
    } else {
        document.getElementById('exam-timer').style.fontSize = '1.1rem';
        document.getElementById('exam-timer').style.color = 'white';
    }
    
    document.getElementById('exam-timer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Show time warning
function showTimeWarning() {
    document.getElementById('time-warning').style.display = 'block';
}

// Hide time warning
function hideTimeWarning() {
    document.getElementById('time-warning').style.display = 'none';
}

// Generate certificate code
function generateCertificateCode(participant, date) {
    const namePart = participant.fullname.replace(/\s+/g, '-').toUpperCase();
    const statusPart = participant.status.toUpperCase();
    const levelPart = participant.level ? participant.level.toUpperCase() : 'UMUM';
    const categoryPart = currentState.examCategory.toUpperCase().replace('-', '_');
    
    const datePart = date.toISOString().split('T')[0].replace(/-/g, '');
    
    // Generate random 8 char code
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' +
                      Math.random().toString(36).substring(2, 6).toUpperCase();
    
    return `${namePart}/${statusPart}/${levelPart}/${categoryPart}/${datePart}/${randomPart}/PERGUNU-STB`;
}

// Set motivation text based on score
function setMotivationText(score) {
    const motivationElement = document.getElementById('certificate-motivation');
    let motivationText = '';
    
    if (score >= 90) {
        motivationText = 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
    } else if (score >= 80) {
        motivationText = 'Luar biasa! Anda telah menunjukkan pemahaman yang sangat baik terhadap materi ujian.';
    } else if (score >= 70) {
        motivationText = 'Bagus! Anda memiliki pemahaman yang baik, masih bisa ditingkatkan lagi.';
    } else if (score >= 60) {
        motivationText = 'Cukup baik. Pelajari lagi materi yang belum dikuasai untuk hasil yang lebih baik.';
    } else if (score >= 50) {
        motivationText = 'Anda perlu belajar lebih giat lagi untuk meningkatkan pemahaman materi.';
    } else {
        motivationText = 'Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.';
    }
    
    // Override with custom motivation if set
    const customMotivation = localStorage.getItem('motivationText');
    if (customMotivation) {
        motivationText = customMotivation;
    }
    
    motivationElement.textContent = motivationText;
}

// Save participant to storage (simulated)
function saveParticipantToStorage(participant) {
    let participants = JSON.parse(localStorage.getItem('participants') || []);
    participants.push(participant);
    localStorage.setItem('participants', JSON.stringify(participants));
}

// Play button sound
function playButtonSound() {
    buttonAudio.currentTime = 0;
    buttonAudio.play();
}

// Shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
