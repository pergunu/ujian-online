import { getQuestionsByCategory } from './questions.js';

// DOM Elements
const loginCodeInput = document.getElementById('login-code');
const loginBtn = document.getElementById('login-btn');
const termsCheckbox = document.getElementById('agree-terms');
const continueBtn = document.getElementById('continue-btn');
const participantForm = document.getElementById('participant-form');
const studentRadio = document.getElementById('student');
const generalRadio = document.getElementById('general');
const studentFields = document.getElementById('student-fields');
const generalFields = document.getElementById('general-fields');
const generalPurposeSelect = document.getElementById('general-purpose');
const cpnsLicense = document.getElementById('cpns-license');
const startExamBtn = document.getElementById('start-exam-btn');
const examTimer = document.getElementById('timer');
const questionText = document.getElementById('question-text');
const optionElements = {
    A: document.getElementById('option-a'),
    B: document.getElementById('option-b'),
    C: document.getElementById('option-c'),
    D: document.getElementById('option-d'),
    E: document.getElementById('option-e')
};
const explanationDiv = document.getElementById('explanation');
const finishExamBtn = document.getElementById('finish-exam-btn');
const skipQuestionBtn = document.getElementById('skip-question-btn');
const unansweredBtn = document.getElementById('unanswered-btn');
const timeWarning = document.querySelector('.time-warning');
const totalQuestionsSpan = document.getElementById('total-questions');
const correctAnswersSpan = document.getElementById('correct-answers');
const wrongAnswersSpan = document.getElementById('wrong-answers');
const finalScoreSpan = document.getElementById('final-score');
const viewCertificateBtn = document.getElementById('view-certificate-btn');
const retakeExamBtn = document.getElementById('retake-exam-btn');
const certName = document.getElementById('cert-name');
const certScore = document.getElementById('cert-score');
const certMotivation = document.getElementById('cert-motivation');
const certPeriod = document.getElementById('cert-period');
const certCode = document.getElementById('cert-code');
const printCertificateBtn = document.getElementById('print-certificate-btn');
const backToResultsBtn = document.getElementById('back-to-results-btn');
const floatBtns = document.querySelectorAll('.float-btn');
const shareModal = document.getElementById('share-modal');
const questionBankModal = document.getElementById('question-bank-modal');
const adminModal = document.getElementById('admin-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const openingAudio = document.getElementById('opening-audio');
const correctAudio = document.getElementById('correct-audio');
const wrongAudio = document.getElementById('wrong-audio');
const buttonAudio = document.getElementById('button-audio');
const applauseAudio = document.getElementById('applause-audio');

// Application State
let currentScreen = 'opening';
let participantData = {};
let examData = {
    category: '',
    level: '',
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    startTime: null,
    endTime: null,
    timerInterval: null
};
let resultsData = {
    totalQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    score: 0
};

// Default codes
const DEFAULT_CODES = {
    login: '12345',
    cpns: 'OPENLOCK-1945',
    questionBank: 'OPENLOCK-1926',
    admin: '65614222'
};

// Motivational messages based on score
const MOTIVATION_MESSAGES = {
    '90-100': 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.',
    '80-89': 'Luar biasa! Anda memiliki pemahaman yang sangat baik tentang materi ini.',
    '70-79': 'Bagus! Anda memiliki pemahaman yang baik, masih ada ruang untuk sedikit perbaikan.',
    '60-69': 'Cukup baik. Tinjau kembali materi untuk meningkatkan pemahaman Anda.',
    '50-59': 'Anda perlu lebih banyak belajar dan berlatih untuk meningkatkan pemahaman.',
    '0-49': 'Jangan menyerah! Pelajari kembali materinya dan coba lagi.'
};

// Initialize the application
function init() {
    // Set event listeners
    loginBtn.addEventListener('click', handleLogin);
    termsCheckbox.addEventListener('change', toggleContinueButton);
    continueBtn.addEventListener('click', showParticipantForm);
    studentRadio.addEventListener('change', toggleParticipantFields);
    generalRadio.addEventListener('change', toggleParticipantFields);
    generalPurposeSelect.addEventListener('change', toggleCPNSLicense);
    participantForm.addEventListener('submit', handleParticipantFormSubmit);
    startExamBtn.addEventListener('click', startExam);
    finishExamBtn.addEventListener('click', finishExam);
    skipQuestionBtn.addEventListener('click', skipQuestion);
    unansweredBtn.addEventListener('click', showUnansweredQuestions);
    viewCertificateBtn.addEventListener('click', showCertificate);
    retakeExamBtn.addEventListener('click', retakeExam);
    printCertificateBtn.addEventListener('click', printCertificate);
    backToResultsBtn.addEventListener('click', backToResults);
    
    // Floating buttons
    floatBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            playAudio(buttonAudio);
            const type = this.classList.contains('share-btn') ? 'share' : 
                         this.classList.contains('whatsapp-btn') ? 'whatsapp' :
                         this.classList.contains('question-bank-btn') ? 'questionBank' : 'admin';
            handleFloatButtonClick(type);
        });
    });
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.add('hidden');
        });
    });
    
    // Play opening audio
    openingAudio.play();
}

// Handle login
function handleLogin() {
    const code = loginCodeInput.value.trim();
    
    if (code === DEFAULT_CODES.login) {
        playAudio(buttonAudio);
        document.querySelector('.opening-notification').classList.add('animate__fadeOut');
        setTimeout(() => {
            document.querySelector('.opening-notification').classList.add('hidden');
            showTermsAndConditions();
        }, 500);
    } else {
        alert('Kode login salah! Silakan coba lagi.');
        loginCodeInput.value = '';
        loginCodeInput.focus();
    }
}

// Toggle continue button based on terms agreement
function toggleContinueButton() {
    continueBtn.disabled = !termsCheckbox.checked;
}

// Show terms and conditions
function showTermsAndConditions() {
    currentScreen = 'terms';
    const termsContainer = document.querySelector('.terms-container');
    termsContainer.classList.remove('hidden');
    termsContainer.classList.add('animate__fadeIn');
}

// Show participant form
function showParticipantForm() {
    currentScreen = 'participantForm';
    document.querySelector('.terms-container').classList.add('animate__fadeOut');
    setTimeout(() => {
        document.querySelector('.terms-container').classList.add('hidden');
        const formContainer = document.querySelector('.form-container');
        formContainer.classList.remove('hidden');
        formContainer.classList.add('animate__fadeIn');
    }, 500);
}

// Toggle participant fields based on student/general selection
function toggleParticipantFields() {
    if (studentRadio.checked) {
        studentFields.classList.remove('hidden');
        generalFields.classList.add('hidden');
        cpnsLicense.classList.add('hidden');
    } else {
        studentFields.classList.add('hidden');
        generalFields.classList.remove('hidden');
        toggleCPNSLicense();
    }
}

// Toggle CPNS license field
function toggleCPNSLicense() {
    if (generalPurposeSelect.value === 'ujian-cpns') {
        cpnsLicense.classList.remove('hidden');
    } else {
        cpnsLicense.classList.add('hidden');
    }
}

// Handle participant form submission
function handleParticipantFormSubmit(e) {
    e.preventDefault();
    playAudio(buttonAudio);
    
    // Validate CPNS license if applicable
    if (generalPurposeSelect.value === 'ujian-cpns') {
        const licenseCode = document.getElementById('license-code').value.trim();
        if (licenseCode !== DEFAULT_CODES.cpns) {
            alert('Kode lisensi CPNS/P3K salah!');
            return;
        }
    }
    
    // Gather participant data
    participantData = {
        fullName: document.getElementById('fullname').value.trim(),
        status: document.querySelector('input[name="status"]:checked').value,
        purpose: '',
        level: '',
        contact: {}
    };
    
    if (participantData.status === 'pelajar') {
        participantData.school = document.getElementById('school').value.trim();
        participantData.nis = document.getElementById('nis').value.trim();
        participantData.purpose = document.getElementById('student-purpose').value;
        participantData.level = document.getElementById('student-level').value;
    } else {
        participantData.address = document.getElementById('address').value.trim();
        participantData.contact.whatsapp = document.getElementById('whatsapp').value.trim();
        participantData.contact.email = document.getElementById('email').value.trim();
        participantData.purpose = document.getElementById('general-purpose').value;
        
        if (participantData.purpose === 'tes-iq') {
            participantData.level = 'Tes IQ';
        } else {
            participantData.level = 'Ujian CPNS/P3K';
        }
    }
    
    // Save participant data (in a real app, this would be sent to a server)
    console.log('Participant data:', participantData);
    
    // Show exam level selection
    showExamLevelSelection();
}

// Show exam level selection
function showExamLevelSelection() {
    currentScreen = 'levelSelection';
    document.querySelector('.form-container').classList.add('animate__fadeOut');
    setTimeout(() => {
        document.querySelector('.form-container').classList.add('hidden');
        const levelContainer = document.querySelector('.level-container');
        levelContainer.classList.remove('hidden');
        levelContainer.classList.add('animate__fadeIn');
        
        // Show appropriate levels based on participant type
        if (participantData.status === 'pelajar') {
            document.getElementById('student-levels').classList.remove('hidden');
            document.getElementById('general-levels').classList.add('hidden');
            
            // Show appropriate class levels
            document.getElementById('sd-levels').style.display = participantData.level === 'SD' ? 'flex' : 'none';
            document.getElementById('smp-levels').style.display = participantData.level === 'SMP' ? 'flex' : 'none';
            document.getElementById('sma-levels').style.display = participantData.level === 'SMA/SMK' ? 'flex' : 'none';
        } else {
            document.getElementById('student-levels').classList.add('hidden');
            document.getElementById('general-levels').classList.remove('hidden');
        }
        
        // Set up level buttons
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                playAudio(buttonAudio);
                participantData.examLevel = this.dataset.level;
                showSubjectSelection();
            });
        });
    }, 500);
}

// Show subject selection
function showSubjectSelection() {
    currentScreen = 'subjectSelection';
    document.getElementById('subject-selection').classList.remove('hidden');
    
    // Show appropriate subjects based on participant type
    if (participantData.status === 'pelajar') {
        document.getElementById('student-subjects').classList.remove('hidden');
        document.getElementById('general-subjects').style.display = 'none';
    } else {
        document.getElementById('student-subjects').style.display = 'none';
        document.getElementById('general-subjects').classList.remove('hidden');
    }
    
    // Set up subject buttons
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playAudio(buttonAudio);
            examData.category = this.dataset.subject;
            startExamBtn.classList.remove('hidden');
        });
    });
}

// Start the exam
function startExam() {
    playAudio(buttonAudio);
    currentScreen = 'exam';
    
    // Hide level selection
    document.querySelector('.level-container').classList.add('animate__fadeOut');
    setTimeout(() => {
        document.querySelector('.level-container').classList.add('hidden');
        
        // Show exam interface
        document.querySelector('.exam-container').classList.remove('hidden');
        
        // Load questions
        examData.questions = getQuestionsByCategory(examData.category, 5); // Get 5 questions for demo
        examData.totalQuestions = examData.questions.length;
        examData.currentQuestionIndex = 0;
        examData.answers = {};
        examData.startTime = new Date();
        
        // Start timer (120 minutes by default)
        startTimer(120);
        
        // Display first question
        displayQuestion();
    }, 500);
}

// Start the exam timer
function startTimer(minutes) {
    let time = minutes * 60;
    examData.timerInterval = setInterval(() => {
        const mins = Math.floor(time / 60);
        const secs = time % 60;
        examTimer.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        
        // Show warning when 10 minutes left
        if (time === 600) {
            timeWarning.classList.remove('hidden');
        }
        
        // Hide warning when 1 minute left
        if (time === 60) {
            timeWarning.classList.add('hidden');
        }
        
        // Make timer bigger when 10 minutes left
        if (time <= 600) {
            examTimer.style.fontSize = '24px';
            examTimer.style.color = 'var(--error-color)';
        }
        
        if (time <= 0) {
            clearInterval(examData.timerInterval);
            finishExam(true);
        }
        
        time--;
    }, 1000);
}

// Display current question
function displayQuestion() {
    const question = examData.questions[examData.currentQuestionIndex];
    const progress = (examData.currentQuestionIndex / examData.questions.length) * 100;
    
    // Update progress
    document.querySelector('.progress-fill').style.width = `${progress}%`;
    document.querySelector('.progress-text').textContent = `Soal ${examData.currentQuestionIndex + 1} dari ${examData.questions.length}`;
    
    // Display question
    questionText.textContent = question.question;
    
    // Display options
    for (const [key, value] of Object.entries(question.options)) {
        optionElements[key].textContent = value;
    }
    
    // Reset option styles
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('correct', 'wrong');
        option.onclick = function() {
            selectAnswer(this.dataset.option);
        };
    });
    
    // Hide explanation
    explanationDiv.classList.add('hidden');
    explanationDiv.innerHTML = '';
    
    // Show answer if already answered
    if (examData.answers[examData.currentQuestionIndex]) {
        const selectedOption = examData.answers[examData.currentQuestionIndex];
        const correctAnswer = question.correctAnswer;
        
        // Mark correct answer
        document.querySelector(`.option[data-option="${correctAnswer}"]`).classList.add('correct');
        
        // Mark wrong answer if applicable
        if (selectedOption !== correctAnswer) {
            document.querySelector(`.option[data-option="${selectedOption}"]`).classList.add('wrong');
        }
        
        // Show explanation
        explanationDiv.classList.remove('hidden');
        explanationDiv.innerHTML = `<strong>Penjelasan:</strong> ${question.explanation}`;
        
        // Disable options
        document.querySelectorAll('.option').forEach(option => {
            option.onclick = null;
            option.style.cursor = 'default';
        });
    }
}

// Select an answer
function selectAnswer(option) {
    const question = examData.questions[examData.currentQuestionIndex];
    examData.answers[examData.currentQuestionIndex] = option;
    
    // Mark correct/wrong
    if (option === question.correctAnswer) {
        document.querySelector(`.option[data-option="${option}"]`).classList.add('correct');
        playAudio(correctAudio);
    } else {
        document.querySelector(`.option[data-option="${option}"]`).classList.add('wrong');
        document.querySelector(`.option[data-option="${question.correctAnswer}"]`).classList.add('correct');
        playAudio(wrongAudio);
    }
    
    // Show explanation
    explanationDiv.classList.remove('hidden');
    explanationDiv.innerHTML = `<strong>Penjelasan:</strong> ${question.explanation}`;
    
    // Disable options
    document.querySelectorAll('.option').forEach(opt => {
        opt.onclick = null;
        opt.style.cursor = 'default';
    });
    
    // Update results
    updateResults();
}

// Skip to next question
function skipQuestion() {
    playAudio(buttonAudio);
    if (examData.currentQuestionIndex < examData.questions.length - 1) {
        examData.currentQuestionIndex++;
        displayQuestion();
    } else {
        // If last question, go to first unanswered question
        const unansweredIndex = findUnansweredQuestion();
        if (unansweredIndex !== -1) {
            examData.currentQuestionIndex = unansweredIndex;
            displayQuestion();
        } else {
            finishExam();
        }
    }
}

// Find first unanswered question
function findUnansweredQuestion() {
    for (let i = 0; i < examData.questions.length; i++) {
        if (!examData.answers[i]) {
            return i;
        }
    }
    return -1;
}

// Show unanswered questions
function showUnansweredQuestions() {
    playAudio(buttonAudio);
    const unansweredIndex = findUnansweredQuestion();
    if (unansweredIndex !== -1) {
        examData.currentQuestionIndex = unansweredIndex;
        displayQuestion();
    } else {
        alert('Semua soal sudah dijawab!');
    }
}

// Update results
function updateResults() {
    let correct = 0;
    let wrong = 0;
    
    for (let i = 0; i < examData.questions.length; i++) {
        if (examData.answers[i]) {
            if (examData.answers[i] === examData.questions[i].correctAnswer) {
                correct++;
            } else {
                wrong++;
            }
        }
    }
    
    resultsData.correctAnswers = correct;
    resultsData.wrongAnswers = wrong;
    resultsData.totalQuestions = examData.questions.length;
    resultsData.score = Math.round((correct / examData.questions.length) * 100);
}

// Finish the exam
function finishExam(timeout = false) {
    playAudio(buttonAudio);
    clearInterval(examData.timerInterval);
    examData.endTime = new Date();
    
    // Mark unanswered questions as wrong
    for (let i = 0; i < examData.questions.length; i++) {
        if (!examData.answers[i]) {
            examData.answers[i] = ''; // Mark as unanswered
            resultsData.wrongAnswers++;
        }
    }
    
    // Recalculate score
    resultsData.score = Math.round((resultsData.correctAnswers / examData.questions.length) * 100);
    
    // Show results
    showResults(timeout);
}

// Show results
function showResults(timeout) {
    currentScreen = 'results';
    document.querySelector('.exam-container').classList.add('hidden');
    
    // Update results display
    totalQuestionsSpan.textContent = resultsData.totalQuestions;
    correctAnswersSpan.textContent = resultsData.correctAnswers;
    wrongAnswersSpan.textContent = resultsData.wrongAnswers;
    finalScoreSpan.textContent = resultsData.score;
    
    // Show results container
    document.querySelector('.results-container').classList.remove('hidden');
    
    // Show timeout message if applicable
    if (timeout) {
        alert('Waktu ujian telah habis! Sistem akan menampilkan hasil ujian Anda.');
    }
}

// Show certificate
function showCertificate() {
    playAudio(buttonAudio);
    currentScreen = 'certificate';
    document.querySelector('.results-container').classList.add('hidden');
    
    // Set certificate data
    certName.textContent = participantData.fullName;
    certScore.textContent = resultsData.score;
    
    // Set motivation based on score
    let motivationKey = '0-49';
    if (resultsData.score >= 90) motivationKey = '90-100';
    else if (resultsData.score >= 80) motivationKey = '80-89';
    else if (resultsData.score >= 70) motivationKey = '70-79';
    else if (resultsData.score >= 60) motivationKey = '60-69';
    else if (resultsData.score >= 50) motivationKey = '50-59';
    
    certMotivation.textContent = MOTIVATION_MESSAGES[motivationKey];
    
    // Set period
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    certPeriod.textContent = `Ditetapkan di: Situbondo, ${now.toLocaleDateString('id-ID', options)}`;
    
    // Generate certificate code
    const codeParts = [
        participantData.fullName.toUpperCase().replace(/\s+/g, '_'),
        participantData.status.toUpperCase(),
        participantData.level.toUpperCase(),
        examData.category.toUpperCase(),
        now.toISOString().split('T')[0].replace(/-/g, ''),
        generateRandomCode(8),
        'PERGUNU-STB'
    ];
    certCode.textContent = `Kode: ${codeParts.join('/')}`;
    
    // Show certificate container and play applause
    document.querySelector('.certificate-container').classList.remove('hidden');
    playAudio(applauseAudio);
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

// Retake exam
function retakeExam() {
    playAudio(buttonAudio);
    document.querySelector('.results-container').classList.add('hidden');
    showExamLevelSelection();
}

// Print certificate
function printCertificate() {
    playAudio(buttonAudio);
    window.print();
}

// Back to results from certificate
function backToResults() {
    playAudio(buttonAudio);
    document.querySelector('.certificate-container').classList.add('hidden');
    document.querySelector('.results-container').classList.remove('hidden');
}

// Handle floating button clicks
function handleFloatButtonClick(type) {
    switch (type) {
        case 'share':
            showShareModal();
            break;
        case 'whatsapp':
            window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...`, '_blank');
            break;
        case 'questionBank':
            showQuestionBankModal();
            break;
        case 'admin':
            showAdminModal();
            break;
    }
}

// Show share modal
function showShareModal() {
    shareModal.classList.remove('hidden');
    
    // In a real app, you would populate with actual share links
    document.getElementById('share-link').value = window.location.href;
}

// Show question bank modal
function showQuestionBankModal() {
    questionBankModal.classList.remove('hidden');
    
    // Set up access button
    document.getElementById('access-bank-btn').addEventListener('click', function() {
        const code = document.getElementById('question-bank-code').value.trim();
        if (code === DEFAULT_CODES.questionBank) {
            playAudio(buttonAudio);
            document.querySelector('.access-form').classList.add('hidden');
            document.querySelector('.question-bank-content').classList.remove('hidden');
            
            // Initialize question bank tabs
            initQuestionBank();
        } else {
            alert('Kode bank soal salah!');
        }
    });
}

// Initialize question bank
function initQuestionBank() {
    // Set up tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playAudio(buttonAudio);
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
                if (content.id === this.dataset.tab) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Set up method switching
    document.querySelectorAll('.method-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playAudio(buttonAudio);
            document.querySelectorAll('.method-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.method-content').forEach(content => {
                content.classList.remove('active');
                if (content.classList.contains(`${this.dataset.method}-method`)) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Set up manual question form
    document.getElementById('manual-question-form').addEventListener('submit', function(e) {
        e.preventDefault();
        playAudio(buttonAudio);
        
        const category = document.getElementById('question-category').value;
        const question = document.getElementById('question-text').value;
        const options = {
            A: document.getElementById('option-a-input').value,
            B: document.getElementById('option-b-input').value,
            C: document.getElementById('option-c-input').value,
            D: document.getElementById('option-d-input').value,
            E: document.getElementById('option-e-input').value
        };
        const correctAnswer = document.getElementById('correct-answer').value;
        const explanation = document.getElementById('explanation-text').value;
        
        // Add question to database
        addQuestion(category, {
            question,
            options,
            correctAnswer,
            explanation
        });
        
        alert('Soal berhasil ditambahkan!');
        this.reset();
    });
    
    // Set up AI question form
    document.getElementById('ai-question-form').addEventListener('submit', function(e) {
        e.preventDefault();
        playAudio(buttonAudio);
        
        const apiKey = document.getElementById('ai-api-key').value;
        const category = document.getElementById('ai-category').value;
        const prompt = document.getElementById('ai-prompt').value;
        const difficulty = document.getElementById('ai-difficulty').value;
        
        // In a real app, you would call an AI API here
        // For demo purposes, we'll simulate a response
        simulateAIQuestionGeneration(apiKey, category, prompt, difficulty);
    });
    
    // Set up save AI question button
    document.getElementById('save-ai-question').addEventListener('click', function() {
        playAudio(buttonAudio);
        
        // Get the generated question from the preview
        const preview = document.querySelector('.ai-question-preview');
        const category = preview.dataset.category;
        
        // In a real app, you would parse the generated question and add it to the database
        alert('Soal berhasil disimpan!');
        document.querySelector('.ai-result').classList.add('hidden');
        document.getElementById('ai-question-form').reset();
    });
}

// Simulate AI question generation (for demo)
function simulateAIQuestionGeneration(apiKey, category, prompt, difficulty) {
    if (!apiKey) {
        alert('Masukkan API Key AI terlebih dahulu!');
        return;
    }
    
    // Show loading state
    const aiResult = document.querySelector('.ai-result');
    aiResult.classList.remove('hidden');
    aiResult.innerHTML = '<p>Membuat soal...</p>';
    
    // Simulate API call delay
    setTimeout(() => {
        // Generate a sample question based on inputs
        const sampleQuestion = {
            question: `Contoh soal tentang ${prompt} (${difficulty})`,
            options: {
                A: 'Pilihan A',
                B: 'Pilihan B',
                C: 'Pilihan C',
                D: 'Pilihan D',
                E: 'Pilihan E'
            },
            correctAnswer: 'B',
            explanation: `Ini adalah contoh penjelasan untuk soal tentang ${prompt}`
        };
        
        // Display the generated question
        const preview = document.querySelector('.ai-question-preview');
        preview.dataset.category = category;
        preview.innerHTML = `
            <p><strong>Pertanyaan:</strong> ${sampleQuestion.question}</p>
            <p><strong>Pilihan:</strong></p>
            <ul>
                <li>A. ${sampleQuestion.options.A}</li>
                <li>B. ${sampleQuestion.options.B}</li>
                <li>C. ${sampleQuestion.options.C}</li>
                <li>D. ${sampleQuestion.options.D}</li>
                <li>E. ${sampleQuestion.options.E}</li>
            </ul>
            <p><strong>Jawaban benar:</strong> ${sampleQuestion.correctAnswer}</p>
            <p><strong>Penjelasan:</strong> ${sampleQuestion.explanation}</p>
        `;
        
        // Show save button
        document.getElementById('save-ai-question').style.display = 'block';
    }, 2000);
}

// Show admin modal
function showAdminModal() {
    adminModal.classList.remove('hidden');
    
    // Set up access button
    document.getElementById('access-admin-btn').addEventListener('click', function() {
        const code = document.getElementById('admin-code').value.trim();
        if (code === DEFAULT_CODES.admin) {
            playAudio(buttonAudio);
            document.querySelector('.access-form').classList.add('hidden');
            document.querySelector('.admin-content').classList.remove('hidden');
            
            // Initialize admin panel
            initAdminPanel();
        } else {
            alert('Kode admin salah!');
        }
    });
}

// Initialize admin panel
function initAdminPanel() {
    // Set up tab switching
    document.querySelectorAll('.admin-tab').forEach(btn => {
        btn.addEventListener('click', function() {
            playAudio(buttonAudio);
            document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.admin-tab-content').forEach(content => {
                content.classList.remove('active');
                if (content.id === this.dataset.tab) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Set up code saving
    document.getElementById('save-login-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-login-code').value;
        const currentCode = document.getElementById('current-login-code').value;
        
        if (currentCode !== DEFAULT_CODES.login) {
            alert('Kode login lama salah!');
            return;
        }
        
        DEFAULT_CODES.login = newCode;
        alert('Kode login berhasil diubah!');
        document.getElementById('new-login-code').value = '';
        document.getElementById('current-login-code').value = '';
    });
    
    document.getElementById('save-cpns-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-cpns-code').value;
        const currentCode = document.getElementById('current-cpns-code').value;
        
        if (currentCode !== DEFAULT_CODES.cpns) {
            alert('Kode ujian CPNS lama salah!');
            return;
        }
        
        DEFAULT_CODES.cpns = newCode;
        alert('Kode ujian CPNS berhasil diubah!');
        document.getElementById('new-cpns-code').value = '';
        document.getElementById('current-cpns-code').value = '';
    });
    
    document.getElementById('save-bank-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-bank-code').value;
        const currentCode = document.getElementById('current-bank-code').value;
        
        if (currentCode !== DEFAULT_CODES.questionBank) {
            alert('Kode bank soal lama salah!');
            return;
        }
        
        DEFAULT_CODES.questionBank = newCode;
        alert('Kode bank soal berhasil diubah!');
        document.getElementById('new-bank-code').value = '';
        document.getElementById('current-bank-code').value = '';
    });
    
    document.getElementById('save-admin-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-admin-code').value;
        const currentCode = document.getElementById('current-admin-code').value;
        
        if (currentCode !== DEFAULT_CODES.admin) {
            alert('Kode admin lama salah!');
            return;
        }
        
        DEFAULT_CODES.admin = newCode;
        alert('Kode admin berhasil diubah!');
        document.getElementById('new-admin-code').value = '';
        document.getElementById('current-admin-code').value = '';
    });
    
    // Set up exam settings
    document.getElementById('save-exam-duration').addEventListener('click', function() {
        const duration = document.getElementById('exam-duration').value;
        alert(`Durasi ujian disetel menjadi ${duration} menit`);
    });
    
    document.getElementById('save-point-value').addEventListener('click', function() {
        const points = document.getElementById('point-value').value;
        alert(`Poin per jawaban benar disetel menjadi ${points}`);
    });
    
    document.getElementById('save-question-count').addEventListener('click', function() {
        const count = document.getElementById('question-count').value;
        alert(`Jumlah soal per ujian disetel menjadi ${count}`);
    });
    
    document.getElementById('save-randomize').addEventListener('click', function() {
        const randomize = document.getElementById('randomize-questions').checked;
        alert(`Pengacakan soal ${randomize ? 'diaktifkan' : 'dinonaktifkan'}`);
    });
    
    // Set up text settings
    document.getElementById('save-greeting-text').addEventListener('click', function() {
        const text = document.getElementById('greeting-text-input').value;
        document.getElementById('greeting-text').textContent = text;
        alert('Teks sambutan berhasil diubah!');
    });
    
    document.getElementById('save-chairman-name').addEventListener('click', function() {
        const name = document.getElementById('chairman-name-input').value;
        document.getElementById('chairman-name').textContent = name;
        alert('Nama ketua berhasil diubah!');
    });
    
    document.getElementById('save-motivation-texts').addEventListener('click', function() {
        document.querySelectorAll('.motivation-text').forEach(el => {
            const range = el.dataset.range;
            MOTIVATION_MESSAGES[range] = el.value;
        });
        alert('Teks motivasi berhasil diubah!');
    });
    
    document.getElementById('save-period-info').addEventListener('click', function() {
        const text = document.getElementById('period-info-input').value;
        document.getElementById('period-info').innerHTML = text;
        alert('Informasi berkala berhasil diubah!');
    });
    
    // Set up social links
    document.getElementById('add-social-link').addEventListener('click', function() {
        const container = document.querySelector('.social-inputs');
        const div = document.createElement('div');
        div.className = 'social-input';
        div.innerHTML = `
            <select>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
            </select>
            <input type="text" placeholder="URL">
            <button type="button" class="btn-small remove-social">Hapus</button>
        `;
        container.appendChild(div);
        
        // Add remove event
        div.querySelector('.remove-social').addEventListener('click', function() {
            div.remove();
        });
    });
    
    document.getElementById('save-social-links').addEventListener('click', function() {
        alert('Link sosial media berhasil disimpan!');
    });
    
    // Set up participant data export
    document.getElementById('export-participants').addEventListener('click', function() {
        document.querySelector('.export-options').classList.remove('hidden');
    });
    
    document.querySelectorAll('.export-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.dataset.format;
            alert(`Data peserta berhasil diexport dalam format ${format.toUpperCase()}!`);
        });
    });
}

// Play audio
function playAudio(audioElement) {
    audioElement.currentTime = 0;
    audioElement.play();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
