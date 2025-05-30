// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Play opening audio
    const openingAudio = document.getElementById('opening-audio');
    openingAudio.play().catch(e => console.log("Autoplay prevented: ", e));

    // Load CSS dinamis untuk modul
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

// Pemisahan modul admin dan bank soal
function openAdminPanel() {
    loadCSS('assets/css/admin.css');
    // Load admin.js secara dinamis
    const script = document.createElement('script');
    script.src = 'assets/js/admin.js';
    document.body.appendChild(script);
}

function openQuestionBank() {
    loadCSS('assets/css/questions.css');
    // Load questions.js secara dinamis
    const script = document.createElement('script');
    script.src = 'assets/js/questions.js';
    document.body.appendChild(script);
}

// Event listener untuk tombol
document.querySelector('.admin-btn').addEventListener('click', openAdminPanel);
document.querySelector('.question-bank-btn').addEventListener('click', openQuestionBank);

// Sisanya tetap sama...
    
    // Initialize app state
    const appState = {
        currentScreen: 'opening',
        participantData: {},
        examData: {},
        answers: {},
        currentQuestion: 0,
        timer: null,
        timeLeft: 120 * 60, // 120 minutes in seconds
        questions: [],
        unansweredQuestions: []
    };
    
    // DOM Elements
    const screens = {
        opening: document.querySelector('.opening-screen'),
        terms: document.querySelector('.terms-screen'),
        participantForm: document.querySelector('.participant-form'),
        examLevel: document.querySelector('.exam-level'),
        exam: document.querySelector('.exam-screen'),
        results: document.querySelector('.results-screen')
    };
    
    // Login Screen
    const loginBtn = document.getElementById('login-btn');
    const loginCode = document.getElementById('login-code');
    
    loginBtn.addEventListener('click', function() {
        const buttonAudio = document.getElementById('button-audio');
        buttonAudio.play();
        
        if (loginCode.value === '12345') {
            // Hide current screen and show terms screen
            screens.opening.classList.remove('active');
            screens.terms.classList.add('active');
            appState.currentScreen = 'terms';
            
            // Add animation
            screens.terms.querySelector('.terms-content').classList.add('animate__slideInRight');
        } else {
            alert('Kode login salah! Silakan coba lagi.');
            loginCode.focus();
        }
    });
    
    // Terms Agreement
    const agreeTerms = document.getElementById('agree-terms');
    const termsAgreeBtn = document.getElementById('terms-agree-btn');
    
    agreeTerms.addEventListener('change', function() {
        termsAgreeBtn.disabled = !this.checked;
    });
    
    termsAgreeBtn.addEventListener('click', function() {
        const buttonAudio = document.getElementById('button-audio');
        buttonAudio.play();
        
        screens.terms.classList.remove('active');
        screens.participantForm.classList.add('active');
        appState.currentScreen = 'participantForm';
        
        // Add animation
        screens.participantForm.querySelector('.form-content').classList.add('animate__slideInUp');
    });
    
    // Participant Form
    const participantForm = document.getElementById('participant-form');
    const statusRadios = document.querySelectorAll('input[name="status"]');
    const studentFields = document.querySelectorAll('.student-fields');
    const generalFields = document.querySelectorAll('.general-fields');
    
    // Show/hide fields based on status
    statusRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'pelajar') {
                studentFields.forEach(field => field.style.display = 'block');
                generalFields.forEach(field => field.style.display = 'none');
            } else {
                studentFields.forEach(field => field.style.display = 'none');
                generalFields.forEach(field => field.style.display = 'block');
            }
        });
    });
    
    // GPS Location
    const getLocationBtn = document.getElementById('get-location');
    const addressInput = document.getElementById('address');
    
    getLocationBtn.addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    // Use reverse geocoding to get address (in a real app, you'd use a geocoding API)
                    addressInput.value = "Lokasi Anda telah terdeteksi";
                },
                error => {
                    alert("Tidak dapat mendapatkan lokasi: " + error.message);
                }
            );
        } else {
            alert("Geolocation tidak didukung oleh browser Anda.");
        }
    });
    
    // Form Submission
    participantForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const buttonAudio = document.getElementById('button-audio');
        buttonAudio.play();
        
        // Validate form
        const fullname = document.getElementById('fullname').value.trim();
        if (!fullname) {
            alert('Nama lengkap harus diisi!');
            return;
        }
        
        // Collect participant data
        appState.participantData = {
            fullname: fullname,
            status: document.querySelector('input[name="status"]:checked').value,
            purpose: document.querySelector('input[name="status"]:checked').value === 'pelajar' ? 
                    document.getElementById('student-purpose').value : 
                    document.getElementById('general-purpose').value,
            timestamp: new Date().toISOString()
        };
        
        if (appState.participantData.status === 'pelajar') {
            appState.participantData.school = document.getElementById('school').value;
            appState.participantData.nis = document.getElementById('nis').value;
            appState.participantData.schoolLevel = document.querySelector('input[name="school-level"]:checked').value;
        } else {
            appState.participantData.address = document.getElementById('address').value;
            appState.participantData.whatsapp = document.getElementById('whatsapp').value;
            appState.participantData.email = document.getElementById('email').value;
        }
        
        // Move to exam level selection
        screens.participantForm.classList.remove('active');
        screens.examLevel.classList.add('active');
        appState.currentScreen = 'examLevel';
        
        // Show appropriate levels based on participant status
        if (appState.participantData.status === 'pelajar') {
            document.querySelector('.student-levels').style.display = 'block';
            document.querySelector('.general-levels').style.display = 'none';
            
            // Show appropriate class levels
            const schoolLevel = appState.participantData.schoolLevel;
            document.querySelector('.sd-levels').style.display = schoolLevel === 'SD' ? 'block' : 'none';
            document.querySelector('.smp-levels').style.display = schoolLevel === 'SMP' ? 'block' : 'none';
            document.querySelector('.sma-levels').style.display = schoolLevel === 'SMA/SMK' ? 'block' : 'none';
        } else {
            document.querySelector('.student-levels').style.display = 'none';
            document.querySelector('.general-levels').style.display = 'block';
        }
    });
    
    // Exam Level Selection
    const levelButtons = document.querySelectorAll('.level-btn');
    const subjectButtons = document.querySelectorAll('.subject-btn');
    const startExamBtn = document.getElementById('start-exam-btn');
    
    levelButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonAudio = document.getElementById('button-audio');
            buttonAudio.play();
            
            // Toggle active state
            levelButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            appState.examData.level = this.dataset.level;
            
            // For CPNS exam, show license form
            if (this.dataset.level === 'ujian-cpns') {
                document.querySelector('.license-form').style.display = 'block';
                startExamBtn.disabled = true;
            } else {
                document.querySelector('.license-form').style.display = 'none';
                startExamBtn.disabled = false;
            }
        });
    });
    
    subjectButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonAudio = document.getElementById('button-audio');
            buttonAudio.play();
            
            // Toggle active state
            subjectButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            appState.examData.subject = this.dataset.subject;
            
            // Enable start button if level is also selected
            if (appState.examData.level) {
                startExamBtn.disabled = false;
            }
        });
    });
    
    // Verify CPNS License
    const verifyLicenseBtn = document.getElementById('verify-license');
    const licenseCode = document.getElementById('license-code');
    
    verifyLicenseBtn.addEventListener('click', function() {
        if (licenseCode.value === 'OPENLOCK-1945') {
            startExamBtn.disabled = false;
            alert('Kode lisensi valid! Anda dapat memulai ujian.');
        } else {
            alert('Kode lisensi tidak valid!');
            licenseCode.focus();
        }
    });
    
    // Start Exam
    startExamBtn.addEventListener('click', function() {
        const buttonAudio = document.getElementById('button-audio');
        buttonAudio.play();
        
        // Load questions based on selected exam type
        loadQuestions(appState.examData.subject, appState.examData.level);
        
        // Start timer
        startTimer();
        
        // Show exam screen
        screens.examLevel.classList.remove('active');
        screens.exam.classList.add('active');
        appState.currentScreen = 'exam';
        
        // Display first question
        displayQuestion(0);
    });
    
    // Exam Functions
    function loadQuestions(subject, level) {
        // In a real app, you would fetch questions from a server based on subject and level
        // For demo purposes, we'll use sample questions from questions.js
        appState.questions = getQuestionsByCategoryAndLevel(subject, level);
        appState.unansweredQuestions = [...Array(appState.questions.length).keys()]; // Array of indexes
        
        // If shuffle is enabled, shuffle questions
        if (localStorage.getItem('shuffleQuestions') === 'true') {
            shuffleArray(appState.questions);
        }
        
        // Update question count display
        document.getElementById('total-q').textContent = appState.questions.length;
    }
    
    function displayQuestion(index) {
        if (index < 0 || index >= appState.questions.length) return;
        
        const question = appState.questions[index];
        appState.currentQuestion = index;
        
        // Update question number
        document.getElementById('current-q').textContent = index + 1;
        
        // Set question text
        document.getElementById('question-text').textContent = question.text;
        
        // Set options
        document.getElementById('option-a').textContent = question.options.A;
        document.getElementById('option-b').textContent = question.options.B;
        document.getElementById('option-c').textContent = question.options.C;
        document.getElementById('option-d').textContent = question.options.D;
        document.getElementById('option-e').textContent = question.options.E;
        
        // Reset option styles
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('correct', 'wrong');
            opt.style.pointerEvents = 'auto';
        });
        
        // Hide explanation
        document.getElementById('explanation').style.display = 'none';
        
        // If already answered, show the answer
        if (appState.answers[index] !== undefined) {
            const selectedOption = document.querySelector(`.option[data-option="${appState.answers[index]}"]`);
            const correctOption = document.querySelector(`.option[data-option="${question.correctAnswer}"]`);
            
            if (appState.answers[index] === question.correctAnswer) {
                selectedOption.classList.add('correct');
                
                // Play correct answer sound
                document.getElementById('correct-audio').play();
            } else {
                selectedOption.classList.add('wrong');
                correctOption.classList.add('correct');
                
                // Play wrong answer sound
                document.getElementById('wrong-audio').play();
            }
            
            // Show explanation
            document.getElementById('explanation-text').textContent = question.explanation;
            document.getElementById('explanation').style.display = 'block';
            
            // Disable options
            document.querySelectorAll('.option').forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
        }
    }
    
    // Option selection
    document.querySelectorAll('.option').forEach(opt => {
        opt.addEventListener('click', function() {
            const selectedOption = this.dataset.option;
            const question = appState.questions[appState.currentQuestion];
            
            // Record answer
            appState.answers[appState.currentQuestion] = selectedOption;
            
            // Remove from unanswered
            const unansweredIndex = appState.unansweredQuestions.indexOf(appState.currentQuestion);
            if (unansweredIndex !== -1) {
                appState.unansweredQuestions.splice(unansweredIndex, 1);
            }
            
            // Show if correct or wrong
            if (selectedOption === question.correctAnswer) {
                this.classList.add('correct');
                
                // Play correct answer sound
                document.getElementById('correct-audio').play();
            } else {
                this.classList.add('wrong');
                document.querySelector(`.option[data-option="${question.correctAnswer}"]`).classList.add('correct');
                
                // Play wrong answer sound
                document.getElementById('wrong-audio').play();
            }
            
            // Show explanation
            document.getElementById('explanation-text').textContent = question.explanation;
            document.getElementById('explanation').style.display = 'block';
            
            // Disable all options
            document.querySelectorAll('.option').forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
        });
    });
    
    // Exam Controls
    document.getElementById('skip-question-btn').addEventListener('click', function() {
        const nextQuestion = (appState.currentQuestion + 1) % appState.questions.length;
        displayQuestion(nextQuestion);
    });
    
    document.getElementById('unanswered-btn').addEventListener('click', function() {
        if (appState.unansweredQuestions.length > 0) {
            displayQuestion(appState.unansweredQuestions[0]);
        } else {
            alert('Semua soal telah dijawab!');
        }
    });
    
    document.getElementById('finish-exam-btn').addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin menyelesaikan ujian sekarang? Soal yang belum dijawab akan dianggap salah.')) {
            finishExam();
        }
    });
    
    function finishExam() {
        // Stop timer
        clearInterval(appState.timer);
        
        // Calculate score
        const totalQuestions = appState.questions.length;
        let correctAnswers = 0;
        
        for (let i = 0; i < totalQuestions; i++) {
            if (appState.answers[i] && appState.answers[i] === appState.questions[i].correctAnswer) {
                correctAnswers++;
            }
        }
        
        const score = Math.round((correctAnswers / totalQuestions) * 100);
        
        // Show results screen
        screens.exam.classList.remove('active');
        screens.results.classList.add('active');
        appState.currentScreen = 'results';
        
        // Set results
        document.getElementById('correct-answers').textContent = correctAnswers;
        document.getElementById('wrong-answers').textContent = totalQuestions - correctAnswers;
        document.getElementById('final-score').textContent = score;
        
        // Set certificate data
        document.getElementById('cert-name').textContent = appState.participantData.fullname.toUpperCase();
        document.getElementById('cert-score').textContent = score;
        
        // Format date
        const date = new Date(appState.participantData.timestamp);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        document.getElementById('cert-date').textContent = date.toLocaleDateString('id-ID', options);
        
        // Generate certificate code
        const certCode = generateCertificateCode(appState.participantData, score);
        document.getElementById('cert-code').textContent = certCode;
        
        // Set motivation text based on score
        setMotivationText(score);
        
        // Play applause sound
        document.getElementById('applause-audio').play();
        
        // Save participant results
        saveParticipantResult(appState.participantData, appState.examData, score, certCode);
    }
    
    function generateCertificateCode(participant, score) {
        const date = new Date(participant.timestamp);
        const dateStr = date.getDate().toString().padStart(2, '0') + 
                       (date.getMonth() + 1).toString().padStart(2, '0') + 
                       date.getFullYear().toString();
        
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + 
                          Math.random().toString(36).substring(2, 6).toUpperCase();
        
        let level = participant.status === 'pelajar' ? participant.schoolLevel : 'UMUM';
        let subject = appState.examData.subject.toUpperCase().replace('-', ' ');
        
        return `${participant.fullname.toUpperCase().replace(/ /g, '_')}/${participant.status.toUpperCase()}/${level}/${subject}/${dateStr}/${randomCode}/PERGUNU-STB`;
    }
    
    function setMotivationText(score) {
        const motivationEl = document.getElementById('motivation-text');
        let text = '';
        
        if (score >= 90) {
            text = localStorage.getItem('motivationText90') || 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
        } else if (score >= 75) {
            text = localStorage.getItem('motivationText75') || 'Bagus! Anda telah menunjukkan pemahaman yang baik tentang materi ini.';
        } else if (score >= 60) {
            text = localStorage.getItem('motivationText60') || 'Cukup baik. Teruslah belajar untuk meningkatkan pemahaman Anda.';
        } else {
            text = localStorage.getItem('motivationTextDefault') || 'Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.';
        }
        
        motivationEl.textContent = text;
    }
    
    function saveParticipantResult(participant, exam, score, certCode) {
        // In a real app, you would save this to a database
        // For demo, we'll save to localStorage
        let participants = JSON.parse(localStorage.getItem('participants')) || [];
        
        participants.push({
            participant: participant,
            exam: exam,
            score: score,
            certCode: certCode,
            timestamp: new Date().toISOString()
        });
        
        localStorage.setItem('participants', JSON.stringify(participants));
    }
    
    // Timer Functions
    function startTimer() {
        // Get duration from settings or use default (120 minutes)
        const duration = parseInt(localStorage.getItem('examDuration')) || 120;
        appState.timeLeft = duration * 60;
        
        updateTimerDisplay();
        
        appState.timer = setInterval(function() {
            appState.timeLeft--;
            updateTimerDisplay();
            
            if (appState.timeLeft <= 0) {
                clearInterval(appState.timer);
                finishExam();
            } else if (appState.timeLeft === 10 * 60) {
                // 10 minutes left warning
                document.querySelector('.time-warning').style.display = 'block';
                
                // Make timer bigger
                document.getElementById('timer').style.fontSize = '32px';
                document.getElementById('timer').style.color = 'var(--warning-color)';
            } else if (appState.timeLeft === 1 * 60) {
                // Hide warning at 1 minute left
                document.querySelector('.time-warning').style.display = 'none';
            }
        }, 1000);
    }
    
    function updateTimerDisplay() {
        const minutes = Math.floor(appState.timeLeft / 60);
        const seconds = appState.timeLeft % 60;
        
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Results Screen Actions
    document.getElementById('print-certificate').addEventListener('click', function() {
        // Hide floating buttons
        document.querySelector('.floating-buttons').style.display = 'none';
        
        // Print certificate
        window.print();
        
        // Show floating buttons again after a delay
        setTimeout(() => {
            document.querySelector('.floating-buttons').style.display = 'flex';
        }, 1000);
    });
    
    document.getElementById('retake-exam').addEventListener('click', function() {
        // Reset exam state
        appState.answers = {};
        appState.unansweredQuestions = [...Array(appState.questions.length).keys()];
        appState.currentQuestion = 0;
        
        // Reset timer
        clearInterval(appState.timer);
        
        // Go back to exam level selection
        screens.results.classList.remove('active');
        screens.examLevel.classList.add('active');
        appState.currentScreen = 'examLevel';
    });
    
    // Floating Buttons
    const floatingButtons = document.querySelector('.floating-buttons');
    const adminBtn = document.querySelector('.admin-btn');
    const questionBankBtn = document.querySelector('.question-bank-btn');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    // Admin Panel
    adminBtn.addEventListener('click', function() {
        // Show admin login prompt
        const code = prompt('Masukkan Kode Kontrol Panel Admin:');
        if (code === '65614222') {
            document.querySelector('.admin-panel').classList.add('active');
        } else {
            alert('Kode admin salah!');
        }
    });
    
    // Question Bank
    questionBankBtn.addEventListener('click', function() {
        // Show question bank login prompt
        const code = prompt('Masukkan Kode Bank Soal:');
        if (code === 'OPENLOCK-1926') {
            // Open admin panel and switch to questions tab
            document.querySelector('.admin-panel').classList.add('active');
            document.querySelector('.admin-tab.active').classList.remove('active');
            document.getElementById('questions-tab').classList.add('active');
            document.querySelector('.tab-btn.active').classList.remove('active');
            document.querySelector('.tab-btn[data-tab="questions-tab"]').classList.add('active');
        } else {
            alert('Kode bank soal salah!');
        }
    });
    
    // WhatsApp Button
    whatsappBtn.addEventListener('click', function() {
        window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...`);
    });
    
    // Utility Functions
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Initialize admin panel tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelector('.admin-tab.active').classList.remove('active');
            document.getElementById(this.dataset.tab).classList.add('active');
        });
    });
    
    // Close admin panel
    document.getElementById('close-admin').addEventListener('click', function() {
        document.querySelector('.admin-panel').classList.remove('active');
    });
    
    // Load settings
    loadSettings();
    
    function loadSettings() {
        // Load greeting text
        const greetingText = localStorage.getItem('greetingText');
        if (greetingText) {
            document.getElementById('greeting-text').textContent = greetingText;
            document.getElementById('greeting-text-editor').value = greetingText;
        }
        
        // Load periodic info
        const periodicInfo = localStorage.getItem('periodicInfo');
        if (periodicInfo) {
            document.getElementById('periodic-info').textContent = periodicInfo;
            document.getElementById('periodic-info-editor').value = periodicInfo;
        }
        
        // Load exam info
        const examInfo = localStorage.getItem('examInfo');
        if (examInfo) {
            document.getElementById('exam-info').textContent = examInfo;
            document.getElementById('exam-info-editor').value = examInfo;
        }
        
        // Load chairman name
        const chairmanName = localStorage.getItem('chairmanName');
        if (chairmanName) {
            document.getElementById('chairman-name-editor').value = chairmanName;
        }
        
        // Load motivation texts
        const motivationText90 = localStorage.getItem('motivationText90');
        const motivationText75 = localStorage.getItem('motivationText75');
        const motivationText60 = localStorage.getItem('motivationText60');
        const motivationTextDefault = localStorage.getItem('motivationTextDefault');
        
        if (motivationText90 || motivationText75 || motivationText60 || motivationTextDefault) {
            document.getElementById('motivation-text-editor').value = 
                `90-100: ${motivationText90 || 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.'}\n\n` +
                `75-89: ${motivationText75 || 'Bagus! Anda telah menunjukkan pemahaman yang baik tentang materi ini.'}\n\n` +
                `60-74: ${motivationText60 || 'Cukup baik. Teruslah belajar untuk meningkatkan pemahaman Anda.'}\n\n` +
                `0-59: ${motivationTextDefault || 'Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.'}`;
        }
        
        // Load exam duration
        const examDuration = localStorage.getItem('examDuration');
        if (examDuration) {
            document.getElementById('exam-duration').value = examDuration;
        }
        
        // Load question count
        const questionCount = localStorage.getItem('questionCount');
        if (questionCount) {
            document.getElementById('question-count').value = questionCount;
        }
        
        // Load shuffle setting
        const shuffleQuestions = localStorage.getItem('shuffleQuestions');
        if (shuffleQuestions) {
            document.getElementById(shuffleQuestions === 'true' ? 'shuffle-on' : 'shuffle-off').checked = true;
        }
        
        // Load enabled exams
        const enabledExams = JSON.parse(localStorage.getItem('enabledExams')) || [];
        enabledExams.forEach(exam => {
            const toggle = document.getElementById(`toggle-${exam}`);
            if (toggle) toggle.checked = true;
        });
        
        // Load social links
        const socialLinks = JSON.parse(localStorage.getItem('socialLinks')) || [];
        const socialLinksContainer = document.querySelector('.social-links');
        socialLinksContainer.innerHTML = '';
        
        socialLinks.forEach(link => {
            addSocialLinkInput(link);
        });
    }
    
    // Save content changes
    document.getElementById('save-content').addEventListener('click', function() {
        const greetingText = document.getElementById('greeting-text-editor').value;
        const periodicInfo = document.getElementById('periodic-info-editor').value;
        const examInfo = document.getElementById('exam-info-editor').value;
        const chairmanName = document.getElementById('chairman-name-editor').value;
        const motivationText = document.getElementById('motivation-text-editor').value;
        
        // Save to localStorage
        localStorage.setItem('greetingText', greetingText);
        localStorage.setItem('periodicInfo', periodicInfo);
        localStorage.setItem('examInfo', examInfo);
        localStorage.setItem('chairmanName', chairmanName);
        
        // Update UI
        document.getElementById('greeting-text').textContent = greetingText;
        document.getElementById('periodic-info').textContent = periodicInfo;
        document.getElementById('exam-info').textContent = examInfo;
        
        // Parse motivation texts
        const lines = motivationText.split('\n');
        const texts = {
            '90': lines[0].replace('90-100: ', ''),
            '75': lines[2].replace('75-89: ', ''),
            '60': lines[4].replace('60-74: ', ''),
            'default': lines[6].replace('0-59: ', '')
        };
        
        localStorage.setItem('motivationText90', texts['90']);
        localStorage.setItem('motivationText75', texts['75']);
        localStorage.setItem('motivationText60', texts['60']);
        localStorage.setItem('motivationTextDefault', texts['default']);
        
        alert('Perubahan berhasil disimpan!');
    });
    
    // Save settings
    document.getElementById('save-settings').addEventListener('click', function() {
        const examDuration = document.getElementById('exam-duration').value;
        const questionCount = document.getElementById('question-count').value;
        const shuffleQuestions = document.querySelector('input[name="shuffle"]:checked').value;
        
        // Get enabled exams
        const enabledExams = [];
        document.querySelectorAll('.exam-toggle-grid input[type="checkbox"]:checked').forEach(checkbox => {
            enabledExams.push(checkbox.id.replace('toggle-', ''));
        });
        
        // Get social links
        const socialLinks = [];
        document.querySelectorAll('.social-url').forEach(input => {
            if (input.value.trim() !== '') {
                socialLinks.push(input.value.trim());
            }
        });
        
        // Save to localStorage
        localStorage.setItem('examDuration', examDuration);
        localStorage.setItem('questionCount', questionCount);
        localStorage.setItem('shuffleQuestions', shuffleQuestions);
        localStorage.setItem('enabledExams', JSON.stringify(enabledExams));
        localStorage.setItem('socialLinks', JSON.stringify(socialLinks));
        
        alert('Pengaturan berhasil disimpan!');
    });
    
    // Add social link input
    document.getElementById('add-social-link').addEventListener('click', function() {
        addSocialLinkInput();
    });
    
    function addSocialLinkInput(value = '') {
        const div = document.createElement('div');
        div.className = 'social-link-item';
        div.innerHTML = `
            <input type="text" class="form-control social-url" placeholder="https://example.com" value="${value}">
            <button class="btn-danger remove-link"><i class="fas fa-times"></i></button>
        `;
        
        div.querySelector('.remove-link').addEventListener('click', function() {
            div.remove();
        });
        
        document.querySelector('.social-links').appendChild(div);
    }
    
    // Save code changes
    document.getElementById('save-login-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-login-code').value;
        if (newCode && newCode.length >= 4) {
            localStorage.setItem('loginCode', newCode);
            document.getElementById('current-login-code').value = newCode;
            document.getElementById('new-login-code').value = '';
            alert('Kode login berhasil diubah!');
        } else {
            alert('Kode login harus minimal 4 karakter!');
        }
    });
    
    document.getElementById('save-cpns-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-cpns-code').value;
        if (newCode && newCode.length >= 4) {
            localStorage.setItem('cpnsCode', newCode);
            document.getElementById('current-cpns-code').value = newCode;
            document.getElementById('new-cpns-code').value = '';
            alert('Kode ujian CPNS/P3K berhasil diubah!');
        } else {
            alert('Kode harus minimal 4 karakter!');
        }
    });
    
    document.getElementById('save-question-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-question-code').value;
        if (newCode && newCode.length >= 4) {
            localStorage.setItem('questionCode', newCode);
            document.getElementById('current-question-code').value = newCode;
            document.getElementById('new-question-code').value = '';
            alert('Kode bank soal berhasil diubah!');
        } else {
            alert('Kode harus minimal 4 karakter!');
        }
    });
    
    document.getElementById('save-admin-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-admin-code').value;
        if (newCode && newCode.length >= 4) {
            localStorage.setItem('adminCode', newCode);
            document.getElementById('current-admin-code').value = newCode;
            document.getElementById('new-admin-code').value = '';
            alert('Kode admin berhasil diubah!');
        } else {
            alert('Kode harus minimal 4 karakter!');
        }
    });
    
    // Question Bank Functions
    document.getElementById('add-question').addEventListener('click', function() {
        document.querySelector('.question-form').style.display = 'block';
        document.querySelector('.ai-generator').style.display = 'none';
        document.querySelector('.questions-list').style.display = 'none';
    });
    
    document.getElementById('ai-generate').addEventListener('click', function() {
        document.querySelector('.question-form').style.display = 'none';
        document.querySelector('.ai-generator').style.display = 'block';
        document.querySelector('.questions-list').style.display = 'none';
    });
    
    document.getElementById('cancel-question').addEventListener('click', function() {
        document.querySelector('.question-form').style.display = 'none';
        document.querySelector('.questions-list').style.display = 'block';
    });
    
    document.getElementById('cancel-ai').addEventListener('click', function() {
        document.querySelector('.ai-generator').style.display = 'none';
        document.querySelector('.questions-list').style.display = 'block';
    });
    
    document.getElementById('save-question').addEventListener('click', function() {
        // Get question data from form
        const question = {
            category: document.getElementById('question-category').value,
            level: document.getElementById('question-level').value,
            text: document.getElementById('question-text-editor').value,
            options: {
                A: document.getElementById('option-a-editor').value,
                B: document.getElementById('option-b-editor').value,
                C: document.getElementById('option-c-editor').value,
                D: document.getElementById('option-d-editor').value,
                E: document.getElementById('option-e-editor').value
            },
            correctAnswer: document.getElementById('correct-answer').value,
            explanation: document.getElementById('explanation-editor').value,
            point: parseInt(document.getElementById('question-point').value)
        };
        
        // Handle image upload
        const imageInput = document.getElementById('question-image');
        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                question.image = e.target.result;
                saveQuestionToStorage(question);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            saveQuestionToStorage(question);
        }
    });
    
    function saveQuestionToStorage(question) {
        // Get existing questions
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        
        // Add new question
        questions.push(question);
        
        // Save back to localStorage
        localStorage.setItem('questions', JSON.stringify(questions));
        
        // Reset form
        document.querySelector('.question-form').reset();
        document.querySelector('.question-form').style.display = 'none';
        document.querySelector('.questions-list').style.display = 'block';
        
        // Refresh questions list
        refreshQuestionsList();
        
        alert('Soal berhasil disimpan!');
    }
    
    document.getElementById('generate-questions').addEventListener('click', function() {
        const prompt = document.getElementById('ai-prompt').value;
        const apiKey = document.getElementById('api-key').value;
        
        if (!prompt || !apiKey) {
            alert('Prompt dan API Key harus diisi!');
            return;
        }
        
        // In a real app, you would call the OpenAI API here
        // For demo purposes, we'll simulate a response
        alert('Fitur AI Generation membutuhkan integrasi dengan OpenAI API. Silakan masukkan API Key yang valid.');
        
        // Example of how you might call the API:
        /*
        fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Generate 5 multiple choice questions with 4 options each, correct answers, and explanations based on this topic: ${prompt}`,
                max_tokens: 1000,
                temperature: 0.7
            })
        })
        .then(response => response.json())
        .then(data => {
            // Process the response and save questions
            console.log(data);
            // You would need to parse the response and format it into your question structure
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat memproses permintaan AI.');
        });
        */
    });
    
    function refreshQuestionsList() {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        const categoryFilter = document.getElementById('filter-category').value;
        const levelFilter = document.getElementById('filter-level').value;
        const searchQuery = document.getElementById('search-question').value.toLowerCase();
        
        const tbody = document.getElementById('questions-table-body');
        tbody.innerHTML = '';
        
        questions.forEach((q, index) => {
            // Apply filters
            if (categoryFilter !== 'all' && q.category !== categoryFilter) return;
            if (levelFilter !== 'all' && q.level !== levelFilter) return;
            if (searchQuery && !q.text.toLowerCase().includes(searchQuery)) return;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${q.text.substring(0, 50)}${q.text.length > 50 ? '...' : ''}</td>
                <td>${q.category.toUpperCase()}</td>
                <td>${q.level || 'All'}</td>
                <td>${q.point}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${index}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" data-id="${index}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                editQuestion(id);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                deleteQuestion(id);
            });
        });
    }
    
    function editQuestion(id) {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        const question = questions[id];
        
        if (!question) return;
        
        // Fill the form with question data
        document.getElementById('question-category').value = question.category;
        document.getElementById('question-level').value = question.level;
        document.getElementById('question-text-editor').value = question.text;
        document.getElementById('option-a-editor').value = question.options.A;
        document.getElementById('option-b-editor').value = question.options.B;
        document.getElementById('option-c-editor').value = question.options.C;
        document.getElementById('option-d-editor').value = question.options.D;
        document.getElementById('option-e-editor').value = question.options.E;
        document.getElementById('correct-answer').value = question.correctAnswer;
        document.getElementById('explanation-editor').value = question.explanation;
        document.getElementById('question-point').value = question.point;
        
        // Show the form
        document.querySelector('.question-form').style.display = 'block';
        document.querySelector('.questions-list').style.display = 'none';
        
        // Change save button to update
        const saveBtn = document.getElementById('save-question');
        saveBtn.textContent = 'Update Soal';
        saveBtn.onclick = function() {
            // Get updated question data
            const updatedQuestion = {
                category: document.getElementById('question-category').value,
                level: document.getElementById('question-level').value,
                text: document.getElementById('question-text-editor').value,
                options: {
                    A: document.getElementById('option-a-editor').value,
                    B: document.getElementById('option-b-editor').value,
                    C: document.getElementById('option-c-editor').value,
                    D: document.getElementById('option-d-editor').value,
                    E: document.getElementById('option-e-editor').value
                },
                correctAnswer: document.getElementById('correct-answer').value,
                explanation: document.getElementById('explanation-editor').value,
                point: parseInt(document.getElementById('question-point').value)
            };
            
            // Handle image (if changed)
            const imageInput = document.getElementById('question-image');
            if (imageInput.files.length > 0) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    updatedQuestion.image = e.target.result;
                    updateQuestionInStorage(id, updatedQuestion);
                };
                reader.readAsDataURL(imageInput.files[0]);
            } else {
                updatedQuestion.image = question.image; // Keep existing image
                updateQuestionInStorage(id, updatedQuestion);
            }
        };
    }
    
    function updateQuestionInStorage(id, updatedQuestion) {
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions[id] = updatedQuestion;
        localStorage.setItem('questions', JSON.stringify(questions));
        
        // Reset form
        document.querySelector('.question-form').reset();
        document.querySelector('.question-form').style.display = 'none';
        document.querySelector('.questions-list').style.display = 'block';
        
        // Reset save button
        const saveBtn = document.getElementById('save-question');
        saveBtn.textContent = 'Simpan Soal';
        saveBtn.onclick = function() {
            // Original save functionality
            const question = {
                // ... get question data ...
            };
            saveQuestionToStorage(question);
        };
        
        // Refresh questions list
        refreshQuestionsList();
        
        alert('Soal berhasil diperbarui!');
    }
    
    function deleteQuestion(id) {
        if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            let questions = JSON.parse(localStorage.getItem('questions')) || [];
            questions.splice(id, 1);
            localStorage.setItem('questions', JSON.stringify(questions));
            refreshQuestionsList();
            alert('Soal berhasil dihapus!');
        }
    }
    
    // Participants Tab
    function refreshParticipantsList() {
        const participants = JSON.parse(localStorage.getItem('participants')) || [];
        const searchQuery = document.getElementById('search-participant').value.toLowerCase();
        
        const tbody = document.getElementById('participants-table-body');
        tbody.innerHTML = '';
        
        participants.forEach((p, index) => {
            // Apply search filter
            if (searchQuery && !p.participant.fullname.toLowerCase().includes(searchQuery)) return;
            
            const date = new Date(p.timestamp);
            const dateStr = date.toLocaleDateString('id-ID');
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${p.participant.fullname}</td>
                <td>${p.participant.status === 'pelajar' ? 'Pelajar' : 'Umum'}</td>
                <td>${p.participant.status === 'pelajar' ? p.participant.schoolLevel : '-'}</td>
                <td>${p.exam.subject.toUpperCase().replace('-', ' ')}</td>
                <td>${p.score}</td>
                <td>${dateStr}</td>
                <td>${p.certCode}</td>
            `;
            
            tbody.appendChild(tr);
        });
    }
    
    // Export participants data
    document.getElementById('export-participants').addEventListener('click', function() {
        const participants = JSON.parse(localStorage.getItem('participants')) || [];
        const format = document.getElementById('export-format').value;
        
        if (participants.length === 0) {
            alert('Tidak ada data peserta untuk diexport!');
            return;
        }
        
        if (format === 'excel' || format === 'csv') {
            exportToExcelOrCSV(participants, format);
        } else if (format === 'pdf') {
            exportToPDF(participants);
        }
    });
    
    function exportToExcelOrCSV(data, format) {
        // Prepare data
        const headers = ['No', 'Nama', 'Status', 'Tingkat', 'Ujian', 'Nilai', 'Tanggal', 'Kode Sertifikat'];
        const rows = data.map((p, index) => [
            index + 1,
            p.participant.fullname,
            p.participant.status === 'pelajar' ? 'Pelajar' : 'Umum',
            p.participant.status === 'pelajar' ? p.participant.schoolLevel : '-',
            p.exam.subject.toUpperCase().replace('-', ' '),
            p.score,
            new Date(p.timestamp).toLocaleDateString('id-ID'),
            p.certCode
        ]);
        
        // Create workbook
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        XLSX.utils.book_append_sheet(wb, ws, 'Peserta Ujian');
        
        // Export
        const fileName = `Data_Peserta_Ujian_${new Date().toISOString().slice(0, 10)}.${format}`;
        XLSX.writeFile(wb, fileName);
    }
    
    function exportToPDF(data) {
        alert('Export ke PDF membutuhkan library tambahan seperti jsPDF. Fitur ini akan diimplementasikan pada versi selanjutnya.');
        /*
        // Example using jsPDF (you would need to include the library)
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add title
        doc.text('Data Peserta Ujian', 10, 10);
        
        // Add table
        doc.autoTable({
            head: [['No', 'Nama', 'Status', 'Tingkat', 'Ujian', 'Nilai', 'Tanggal', 'Kode Sertifikat']],
            body: data.map((p, index) => [
                index + 1,
                p.participant.fullname,
                p.participant.status === 'pelajar' ? 'Pelajar' : 'Umum',
                p.participant.status === 'pelajar' ? p.participant.schoolLevel : '-',
                p.exam.subject.toUpperCase().replace('-', ' '),
                p.score,
                new Date(p.timestamp).toLocaleDateString('id-ID'),
                p.certCode
            ])
        });
        
        // Save
        doc.save(`Data_Peserta_Ujian_${new Date().toISOString().slice(0, 10)}.pdf`);
        */
    }
    
    // Initialize questions list and participants list
    refreshQuestionsList();
    refreshParticipantsList();
    
    // Search functionality
    document.getElementById('search-question').addEventListener('input', refreshQuestionsList);
    document.getElementById('filter-category').addEventListener('change', refreshQuestionsList);
    document.getElementById('filter-level').addEventListener('change', refreshQuestionsList);
    document.getElementById('search-participant').addEventListener('input', refreshParticipantsList);
    document.getElementById('search-participant-btn').addEventListener('click', refreshParticipantsList);
    
    // Print styles
    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            body * {
                visibility: hidden;
            }
            #certificate-template, #certificate-template * {
                visibility: visible;
            }
            #certificate-template {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }
    `;
    document.head.appendChild(style);
});
