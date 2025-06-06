// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Initialize particle animation
    initParticles();
    
    // Play opening audio
    playOpeningAudio();
    
    // Set default values
    setDefaultValues();
    
    // Initialize event listeners
    setupEventListeners();
    
    // Load sample questions (for demo purposes)
    loadSampleQuestions();
}

// Particle Animation
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particles array
    const particles = [];
    const particleCount = 100;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.1,
            flickerSpeed: Math.random() * 0.05 + 0.01
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw particles
        particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Reset particles that go off screen
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.x = Math.random() * canvas.width;
            }
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.y = Math.random() * canvas.height;
            }
            
            // Flicker opacity
            particle.opacity += particle.flickerSpeed;
            if (particle.opacity > 0.6 || particle.opacity < 0.1) {
                particle.flickerSpeed = -particle.flickerSpeed;
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Audio Functions
function playOpeningAudio() {
    const audio = document.getElementById('opening-audio');
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Autoplay prevented:', e));
}

function playButtonSound() {
    const audio = document.getElementById('button-audio');
    audio.currentTime = 0;
    audio.play();
}

function playCorrectSound() {
    const audio = document.getElementById('correct-audio');
    audio.currentTime = 0;
    audio.play();
}

function playWrongSound() {
    const audio = document.getElementById('wrong-audio');
    audio.currentTime = 0;
    audio.play();
}

function playApplauseSound() {
    const audio = document.getElementById('applause-audio');
    audio.volume = 0.7;
    audio.play();
}

// Default Values
function setDefaultValues() {
    // Default codes
    localStorage.setItem('loginCode', '12345');
    localStorage.setItem('cpnsLicenseCode', 'OPENLOCK-1945');
    localStorage.setItem('questionBankCode', 'OPENLOCK-1926');
    localStorage.setItem('adminCode', '65614222');
    
    // Default timer (120 minutes)
    localStorage.setItem('examTimer', '120');
    
    // Default chairman name
    localStorage.setItem('chairmanName', 'Moh. Nuril Hudha, S.Pd., M.Si.');
    
    // Default greeting text
    localStorage.setItem('greetingText', 'Selamat Datang di Ujian Online PERGUNU SITUBONDO');
    
    // Default motivation text
    localStorage.setItem('motivationText', 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.');
    
    // Default periodic info
    localStorage.setItem('periodicInfo', 'Informasi berkala akan ditampilkan di sini. Dapat diatur melalui kontrol panel admin.');
    
    // Default question points
    localStorage.setItem('questionPoints', '1');
    
    // Default question count
    localStorage.setItem('questionCount', '10');
    
    // Default exam status (all enabled)
    const examTypes = ['agama', 'ppkn', 'sejarah', 'ipa', 'ips', 'matematika', 
                      'bahasa-indonesia', 'bahasa-inggris', 'materi-extra', 
                      'materi-khusus', 'tes-iq', 'ujian-cpns'];
    
    examTypes.forEach(type => {
        localStorage.setItem(`exam-${type}-enabled`, 'true');
    });
    
    // Initialize UI with stored values
    updateUIWithStoredValues();
}

function updateUIWithStoredValues() {
    // Set greeting text
    document.getElementById('greeting-text').textContent = localStorage.getItem('greetingText') || 'Selamat Datang di Ujian Online PERGUNU SITUBONDO';
    
    // Set periodic info
    document.getElementById('periodic-info').textContent = localStorage.getItem('periodicInfo') || 'Informasi berkala akan ditampilkan di sini. Dapat diatur melalui kontrol panel admin.';
    
    // Set chairman name in admin panel
    document.getElementById('chairman-name-input').value = localStorage.getItem('chairmanName') || 'Moh. Nuril Hudha, S.Pd., M.Si.';
    
    // Set motivation text in admin panel
    document.getElementById('motivation-text-input').value = localStorage.getItem('motivationText') || 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
    
    // Set greeting text in admin panel
    document.getElementById('greeting-text-input').value = localStorage.getItem('greetingText') || 'Selamat Datang di Ujian Online PERGUNU SITUBONDO';
    
    // Set info text in admin panel
    document.getElementById('info-text-input').value = localStorage.getItem('periodicInfo') || 'Informasi berkala akan ditampilkan di sini. Dapat diatur melalui kontrol panel admin.';
    
    // Set question points in admin panel
    document.getElementById('question-points').value = localStorage.getItem('questionPoints') || '1';
    
    // Set question count in admin panel
    document.getElementById('question-count').value = localStorage.getItem('questionCount') || '10';
    
    // Set exam toggles in admin panel
    const examTypes = ['agama', 'ppkn', 'sejarah', 'ipa', 'ips', 'matematika', 
                      'bahasa-indonesia', 'bahasa-inggris', 'materi-extra', 
                      'materi-khusus', 'tes-iq', 'ujian-cpns'];
    
    examTypes.forEach(type => {
        const toggle = document.getElementById(`toggle-${type}`);
        if (toggle) {
            toggle.checked = localStorage.getItem(`exam-${type}-enabled`) === 'true';
        }
    });
}

// Event Listeners
function setupEventListeners() {
    // Login screen
    document.getElementById('login-btn').addEventListener('click', handleLogin);
    document.getElementById('login-code').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleLogin();
    });
    
    // Terms screen
    document.getElementById('agree-terms').addEventListener('change', function() {
        document.getElementById('continue-btn').disabled = !this.checked;
    });
    document.getElementById('continue-btn').addEventListener('click', proceedToParticipantForm);
    
    // Participant form
    document.querySelectorAll('input[name="status"]').forEach(radio => {
        radio.addEventListener('change', toggleParticipantFields);
    });
    document.getElementById('school-level').addEventListener('change', updateClassLevels);
    document.getElementById('gps-btn').addEventListener('click', getLocation);
    document.getElementById('participant-form').addEventListener('submit', saveParticipantData);
    
    // Exam level selection
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectLevel(this.getAttribute('data-level'));
        });
    });
    
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectSubject(this.getAttribute('data-subject'));
        });
    });
    
    document.getElementById('verify-license-btn').addEventListener('click', verifyLicense);
    document.getElementById('license-code').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') verifyLicense();
    });
    
    document.getElementById('start-exam-btn').addEventListener('click', startExam);
    
    // Exam screen
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', selectAnswer);
    });
    
    document.getElementById('finish-exam-btn').addEventListener('click', finishExam);
    document.getElementById('skip-question-btn').addEventListener('click', skipQuestion);
    document.getElementById('unanswered-btn').addEventListener('click', showUnanswered);
    
    // Results screen
    document.getElementById('print-certificate-btn').addEventListener('click', printCertificate);
    document.getElementById('retake-exam-btn').addEventListener('click', retakeExam);
    
    // Admin panel
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchAdminTab(this.getAttribute('data-tab'));
        });
    });
    
    document.getElementById('save-login-code-btn').addEventListener('click', saveLoginCode);
    document.getElementById('save-exam-code-btn').addEventListener('click', saveExamCode);
    document.getElementById('save-question-code-btn').addEventListener('click', saveQuestionCode);
    document.getElementById('save-admin-code-btn').addEventListener('click', saveAdminCode);
    
    document.getElementById('save-timer-btn').addEventListener('click', saveTimer);
    document.getElementById('save-chairman-btn').addEventListener('click', saveChairmanName);
    document.getElementById('save-motivation-btn').addEventListener('click', saveMotivationText);
    document.getElementById('save-greeting-btn').addEventListener('click', saveGreetingText);
    document.getElementById('save-info-btn').addEventListener('click', saveInfoText);
    document.getElementById('save-points-btn').addEventListener('click', saveQuestionPoints);
    document.getElementById('save-count-btn').addEventListener('click', saveQuestionCount);
    document.getElementById('randomize-questions-btn').addEventListener('click', randomizeQuestions);
    
    document.getElementById('view-participants-btn').addEventListener('click', viewParticipants);
    document.getElementById('export-data-btn').addEventListener('click', exportData);
    document.getElementById('close-admin-btn').addEventListener('click', closeAdminPanel);
    
    // Question bank
    document.querySelectorAll('.bank-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchBankTab(this.getAttribute('data-tab'));
        });
    });
    
    document.getElementById('save-question-btn').addEventListener('click', saveQuestion);
    document.getElementById('clear-form-btn').addEventListener('click', clearQuestionForm);
    document.getElementById('generate-questions-btn').addEventListener('click', generateQuestionsWithAI);
    
    document.getElementById('apply-filter-btn').addEventListener('click', applyQuestionFilter);
    document.getElementById('prev-page-btn').addEventListener('click', goToPrevPage);
    document.getElementById('next-page-btn').addEventListener('click', goToNextPage);
    
    document.getElementById('close-bank-btn').addEventListener('click', closeQuestionBank);
    
    // Participants data
    document.getElementById('search-btn').addEventListener('click', searchParticipants);
    document.getElementById('participant-search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') searchParticipants();
    });
    
    document.getElementById('export-excel-btn').addEventListener('click', exportToExcel);
    document.getElementById('export-word-btn').addEventListener('click', exportToWord);
    document.getElementById('export-pdf-btn').addEventListener('click', exportToPDF);
    
    document.getElementById('close-participants-btn').addEventListener('click', closeParticipantsData);
    
    // Floating buttons
    document.getElementById('share-btn').addEventListener('click', openShareModal);
    document.getElementById('whatsapp-btn').addEventListener('click', openWhatsAppChat);
    document.getElementById('question-bank-btn').addEventListener('click', openQuestionBankAccess);
    document.getElementById('admin-panel-btn').addEventListener('click', openAdminAccess);
    
    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

// Screen Navigation
function switchScreen(currentScreenId, nextScreenId) {
    const currentScreen = document.getElementById(currentScreenId);
    const nextScreen = document.getElementById(nextScreenId);
    
    currentScreen.classList.remove('active');
    currentScreen.classList.add('animate__animated', 'animate__fadeOut');
    
    setTimeout(() => {
        currentScreen.classList.remove('animate__fadeOut');
        nextScreen.classList.add('active', 'animate__animated', 'animate__fadeIn');
        
        setTimeout(() => {
            nextScreen.classList.remove('animate__fadeIn');
        }, 500);
    }, 500);
}

// Login Handler
function handleLogin() {
    playButtonSound();
    
    const loginCode = document.getElementById('login-code').value;
    const storedCode = localStorage.getItem('loginCode') || '12345';
    
    if (loginCode === storedCode) {
        switchScreen('welcome-screen', 'terms-screen');
    } else {
        alert('Kode login salah. Silakan coba lagi.');
    }
}

// Terms Agreement
function proceedToParticipantForm() {
    playButtonSound();
    switchScreen('terms-screen', 'participant-form-screen');
}

// Participant Form
function toggleParticipantFields() {
    const isStudent = document.getElementById('student').checked;
    
    document.getElementById('student-fields').style.display = isStudent ? 'block' : 'none';
    document.getElementById('general-fields').style.display = isStudent ? 'none' : 'block';
}

function updateClassLevels() {
    const level = document.getElementById('school-level').value;
    
    document.getElementById('sd-levels').style.display = level === 'SD' ? 'flex' : 'none';
    document.getElementById('smp-levels').style.display = level === 'SMP' ? 'flex' : 'none';
    document.getElementById('sma-levels').style.display = level === 'SMA/SMK' ? 'flex' : 'none';
}

function getLocation() {
    playButtonSound();
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // In a real app, you would use a reverse geocoding API to get the address
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // For demo purposes, we'll just show the coordinates
                document.getElementById('location-display').textContent = 
                    `Lokasi terdeteksi: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                
                document.getElementById('address').value = 
                    `Lokasi GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            },
            function(error) {
                console.error('Error getting location:', error);
                alert('Tidak dapat mendapatkan lokasi. Silakan masukkan alamat secara manual.');
            }
        );
    } else {
        alert('Geolocation tidak didukung oleh browser Anda. Silakan masukkan alamat secara manual.');
    }
}

function saveParticipantData(e) {
    e.preventDefault();
    playButtonSound();
    
    // Validate form
    const fullname = document.getElementById('fullname').value;
    const isStudent = document.getElementById('student').checked;
    
    if (!fullname) {
        alert('Nama lengkap harus diisi');
        return;
    }
    
    if (isStudent) {
        const school = document.getElementById('school').value;
        const nis = document.getElementById('nis').value;
        
        if (!school || !nis) {
            alert('Data sekolah harus lengkap');
            return;
        }
    } else {
        const address = document.getElementById('address').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const email = document.getElementById('email').value;
        
        if (!address || !whatsapp || !email) {
            alert('Data umum harus lengkap');
            return;
        }
        
        // Validate email
        const emailRegex = /^[a-z0-9._%+-]+@(gmail|yahoo|hotmail)\.com$/i;
        if (!emailRegex.test(email)) {
            alert('Email harus menggunakan domain @gmail.com, @yahoo.com, atau @hotmail.com');
            return;
        }
        
        // Validate WhatsApp number
        if (whatsapp.length < 10 || whatsapp.length > 13 || !/^\d+$/.test(whatsapp)) {
            alert('Nomor WhatsApp harus 10-13 digit angka');
            return;
        }
    }
    
    // Save participant data to localStorage
    const participant = {
        id: Date.now(),
        fullname: fullname,
        isStudent: isStudent,
        purpose: isStudent ? 
            document.getElementById('student-purpose').value : 
            document.getElementById('general-purpose').value,
        level: isStudent ? 
            document.getElementById('school-level').value : 
            'umum',
        class: isStudent ? '' : '', // Will be set in next screen
        subject: '', // Will be set in next screen
        timestamp: new Date().toISOString(),
        details: {}
    };
    
    if (isStudent) {
        participant.details = {
            school: document.getElementById('school').value,
            nis: document.getElementById('nis').value
        };
    } else {
        participant.details = {
            address: document.getElementById('address').value,
            whatsapp: document.getElementById('whatsapp').value,
            email: document.getElementById('email').value
        };
    }
    
    localStorage.setItem('currentParticipant', JSON.stringify(participant));
    
    // Proceed to exam level selection
    switchScreen('participant-form-screen', 'exam-level-screen');
    
    // Show appropriate levels based on participant type
    document.getElementById('student-levels').style.display = isStudent ? 'block' : 'none';
    document.getElementById('general-levels').style.display = isStudent ? 'none' : 'block';
    
    // Reset exam selection
    document.getElementById('start-exam-btn').disabled = true;
    document.getElementById('cpns-license').style.display = 'none';
}

// Exam Level Selection
function selectLevel(level) {
    playButtonSound();
    
    const participant = JSON.parse(localStorage.getItem('currentParticipant'));
    participant.class = level;
    
    // For CPNS exam, show license input
    if (level === 'ujian-cpns') {
        document.getElementById('cpns-license').style.display = 'block';
    } else {
        document.getElementById('cpns-license').style.display = 'none';
    }
    
    localStorage.setItem('currentParticipant', JSON.stringify(participant));
    
    // Highlight selected level
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
}

function selectSubject(subject) {
    playButtonSound();
    
    const participant = JSON.parse(localStorage.getItem('currentParticipant'));
    participant.subject = subject;
    localStorage.setItem('currentParticipant', JSON.stringify(participant));
    
    // Check if exam type is enabled
    const isEnabled = localStorage.getItem(`exam-${subject}-enabled`) === 'true';
    
    if (!isEnabled) {
        alert('Jenis ujian ini sedang tidak tersedia. Silakan pilih yang lain.');
        return;
    }
    
    // Highlight selected subject
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // Enable start exam button if all required fields are selected
    const isStudent = participant.isStudent;
    const classSelected = isStudent ? participant.class : true;
    const subjectSelected = participant.subject;
    
    document.getElementById('start-exam-btn').disabled = !(classSelected && subjectSelected);
}

function verifyLicense() {
    playButtonSound();
    
    const licenseCode = document.getElementById('license-code').value;
    const storedCode = localStorage.getItem('cpnsLicenseCode') || 'OPENLOCK-1945';
    
    if (licenseCode === storedCode) {
        document.getElementById('start-exam-btn').disabled = false;
        alert('Kode lisensi valid. Anda dapat memulai ujian.');
    } else {
        alert('Kode lisensi salah. Silakan coba lagi.');
    }
}

// Exam Functions
function startExam() {
    playButtonSound();
    
    const participant = JSON.parse(localStorage.getItem('currentParticipant'));
    const subject = participant.subject;
    const level = participant.isStudent ? participant.level : 'umum';
    
    // Set exam info
    document.getElementById('exam-subject').textContent = `Mata Ujian: ${subject.toUpperCase()}`;
    document.getElementById('exam-level').textContent = participant.isStudent ? 
        `Tingkat: ${participant.level} Kelas ${participant.class}` : 
        `Tingkat: Umum - ${participant.subject === 'ujian-cpns' ? 'CPNS/P3K' : 'Tes IQ'}`;
    
    // Load questions for the selected subject and level
    const questions = getQuestionsForExam(subject, level);
    
    if (questions.length === 0) {
        alert('Tidak ada soal yang tersedia untuk ujian ini. Silakan hubungi admin.');
        return;
    }
    
    // Initialize exam state
    const examState = {
        questions: questions,
        currentQuestionIndex: 0,
        answers: {},
        startTime: new Date().getTime(),
        timer: parseInt(localStorage.getItem('examTimer') || 120) * 60 // Convert minutes to seconds
    };
    
    localStorage.setItem('examState', JSON.stringify(examState));
    
    // Start timer
    startTimer();
    
    // Load first question
    loadQuestion(0);
    
    // Switch to exam screen
    switchScreen('exam-level-screen', 'exam-screen');
}

function getQuestionsForExam(subject, level) {
    // In a real app, this would fetch from a database
    // For demo, we'll use the sample questions loaded earlier
    const allQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    
    // Filter by subject and level
    let filteredQuestions = allQuestions.filter(q => q.subject === subject && q.level === level);
    
    // Randomize if setting is enabled
    if (localStorage.getItem('randomizeQuestions') === 'true') {
        filteredQuestions = shuffleArray(filteredQuestions);
    }
    
    // Limit to the configured question count
    const questionCount = parseInt(localStorage.getItem('questionCount')) || 10;
    return filteredQuestions.slice(0, questionCount);
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    const timeWarningElement = document.getElementById('time-warning');
    
    const timerInterval = setInterval(() => {
        const examState = JSON.parse(localStorage.getItem('examState'));
        
        if (!examState) {
            clearInterval(timerInterval);
            return;
        }
        
        const elapsedSeconds = Math.floor((new Date().getTime() - examState.startTime) / 1000);
        const remainingSeconds = examState.timer - elapsedSeconds;
        
        if (remainingSeconds <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = '00:00';
            timeWarningElement.style.display = 'none';
            finishExam(true);
            return;
        }
        
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Show warning when 10 minutes left
        if (remainingSeconds <= 600) {
            timerElement.classList.add('warning');
            timeWarningElement.style.display = 'block';
        }
        
        // Hide warning when 1 minute left
        if (remainingSeconds <= 60) {
            timeWarningElement.style.display = 'none';
        }
    }, 1000);
    
    localStorage.setItem('timerInterval', timerInterval.toString());
}

function loadQuestion(index) {
    const examState = JSON.parse(localStorage.getItem('examState'));
    
    if (index < 0 || index >= examState.questions.length) {
        return;
    }
    
    const question = examState.questions[index];
    
    // Update question number display
    document.getElementById('current-question').textContent = index + 1;
    document.getElementById('total-questions').textContent = examState.questions.length;
    
    // Set question text
    document.getElementById('question-text').textContent = question.text;
    
    // Set options
    document.getElementById('option-a').textContent = question.options.A;
    document.getElementById('option-b').textContent = question.options.B;
    document.getElementById('option-c').textContent = question.options.C;
    document.getElementById('option-d').textContent = question.options.D;
    document.getElementById('option-e').textContent = question.options.E;
    
    // Reset option styles
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('correct', 'incorrect', 'disabled');
    });
    
    // Hide explanation
    document.getElementById('answer-explanation').style.display = 'none';
    
    // Update current question index
    examState.currentQuestionIndex = index;
    localStorage.setItem('examState', JSON.stringify(examState));
    
    // If already answered, show the answer
    if (examState.answers[index] !== undefined) {
        showAnswer(index, examState.answers[index]);
    }
}

function selectAnswer() {
    const option = this.getAttribute('data-option');
    const examState = JSON.parse(localStorage.getItem('examState'));
    const currentIndex = examState.currentQuestionIndex;
    
    // If already answered, do nothing
    if (examState.answers[currentIndex] !== undefined) {
        return;
    }
    
    // Record answer
    examState.answers[currentIndex] = option;
    localStorage.setItem('examState', JSON.stringify(examState));
    
    // Show answer
    showAnswer(currentIndex, option);
}

function showAnswer(questionIndex, selectedOption) {
    const examState = JSON.parse(localStorage.getItem('examState'));
    const question = examState.questions[questionIndex];
    const correctOption = question.correctAnswer;
    
    // Highlight selected option
    const selectedElement = document.querySelector(`.option[data-option="${selectedOption}"]`);
    
    if (selectedOption === correctOption) {
        selectedElement.classList.add('correct');
        playCorrectSound();
    } else {
        selectedElement.classList.add('incorrect');
        playWrongSound();
        
        // Also highlight correct answer
        document.querySelector(`.option[data-option="${correctOption}"]`).classList.add('correct');
    }
    
    // Disable all options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.add('disabled');
    });
    
    // Show explanation
    document.getElementById('explanation-text').textContent = question.explanation;
    document.getElementById('answer-explanation').style.display = 'block';
}

function skipQuestion() {
    playButtonSound();
    
    const examState = JSON.parse(localStorage.getItem('examState'));
    const nextIndex = examState.currentQuestionIndex + 1;
    
    if (nextIndex < examState.questions.length) {
        loadQuestion(nextIndex);
    } else {
        // If at last question, go to first question
        loadQuestion(0);
    }
}

function showUnanswered() {
    playButtonSound();
    
    const examState = JSON.parse(localStorage.getItem('examState'));
    
    // Find first unanswered question
    for (let i = 0; i < examState.questions.length; i++) {
        if (examState.answers[i] === undefined) {
            loadQuestion(i);
            return;
        }
    }
    
    // If all answered, show message
    alert('Semua soal sudah dijawab.');
}

function finishExam(isTimeUp = false) {
    if (!isTimeUp) {
        playButtonSound();
        
        if (!confirm('Apakah Anda yakin ingin menyelesaikan ujian sekarang? Soal yang belum dijawab akan dianggap salah.')) {
            return;
        }
    }
    
    // Clear timer
    const timerInterval = parseInt(localStorage.getItem('timerInterval'));
    if (timerInterval) {
        clearInterval(timerInterval);
        localStorage.removeItem('timerInterval');
    }
    
    const examState = JSON.parse(localStorage.getItem('examState'));
    const participant = JSON.parse(localStorage.getItem('currentParticipant'));
    
    // Calculate results
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;
    
    for (let i = 0; i < examState.questions.length; i++) {
        const userAnswer = examState.answers[i];
        const correctAnswer = examState.questions[i].correctAnswer;
        
        if (userAnswer === undefined) {
            unansweredCount++;
        } else if (userAnswer === correctAnswer) {
            correctCount++;
        } else {
            wrongCount++;
        }
    }
    
    // Calculate score
    const questionPoints = parseInt(localStorage.getItem('questionPoints')) || 1;
    const totalPossible = examState.questions.length * questionPoints;
    const score = Math.round((correctCount * questionPoints / totalPossible) * 100);
    
    // Save results
    const result = {
        participantId: participant.id,
        subject: participant.subject,
        level: participant.level,
        class: participant.class,
        totalQuestions: examState.questions.length,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        unanswered: unansweredCount,
        score: score,
        timestamp: new Date().toISOString()
    };
    
    // Save to participant's history
    let participantHistory = JSON.parse(localStorage.getItem(`participant-${participant.id}-history`)) || [];
    participantHistory.push(result);
    localStorage.setItem(`participant-${participant.id}-history`, JSON.stringify(participantHistory));
    
    // Save to all results
    let allResults = JSON.parse(localStorage.getItem('examResults')) || [];
    allResults.push({
        participant: participant,
        result: result
    });
    localStorage.setItem('examResults', JSON.stringify(allResults));
    
    // Display results
    displayResults(result, participant);
    
    // Switch to results screen
    switchScreen('exam-screen', 'results-screen');
    
    // Play applause sound
    playApplauseSound();
}

function displayResults(result, participant) {
    // Set result values
    document.getElementById('total-answered').textContent = result.totalQuestions;
    document.getElementById('correct-answers').textContent = result.correctAnswers;
    document.getElementById('wrong-answers').textContent = result.wrongAnswers;
    document.getElementById('unanswered').textContent = result.unanswered;
    document.getElementById('score').textContent = result.score;
    
    // Set certificate values
    document.getElementById('certificate-name').textContent = participant.fullname;
    document.getElementById('certificate-score').textContent = result.score;
    
    // Format date
    const date = new Date(result.timestamp);
    const formattedDate = date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    document.getElementById('certificate-date').textContent = formattedDate;
    
    // Set chairman name
    document.getElementById('chairman-name').textContent = localStorage.getItem('chairmanName') || 'Moh. Nuril Hudha, S.Pd., M.Si.';
    
    // Set motivation text based on score
    let motivationText = localStorage.getItem('motivationText') || 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
    
    if (result.score < 50) {
        motivationText = 'Jangan menyerah! Teruslah berlatih untuk meningkatkan pemahaman Anda.';
    } else if (result.score < 70) {
        motivationText = 'Bagus! Anda sudah memahami sebagian besar materi, tetapi masih ada ruang untuk perbaikan.';
    } else if (result.score < 90) {
        motivationText = 'Hebat! Anda telah menunjukkan pemahaman yang sangat baik terhadap materi.';
    }
    
    document.getElementById('motivation-text').textContent = motivationText;
    
    // Generate certificate code
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + 
                       '-' + 
                       Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const certificateCode = `${participant.fullname.toUpperCase().replace(/ /g, '_')}/` +
                           `${participant.isStudent ? 'PELAJAR' : 'UMUM'}/` +
                           `${participant.level}/` +
                           `${participant.subject}/` +
                           `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}/` +
                           `${randomCode}/` +
                           `PERGUNU-STB`;
    
    document.getElementById('certificate-code').textContent = certificateCode;
}

function printCertificate() {
    playButtonSound();
    
    // Hide buttons before printing
    const buttons = document.querySelectorAll('.results-actions');
    buttons.forEach(btn => {
        btn.style.display = 'none';
    });
    
    // Print the certificate
    window.print();
    
    // Show buttons after printing
    buttons.forEach(btn => {
        btn.style.display = 'flex';
    });
}

function retakeExam() {
    playButtonSound();
    
    if (confirm('Apakah Anda ingin mengulang ujian dengan soal yang sama?')) {
        // Reset exam state but keep the same questions
        const examState = JSON.parse(localStorage.getItem('examState'));
        
        const newExamState = {
            questions: examState.questions,
            currentQuestionIndex: 0,
            answers: {},
            startTime: new Date().getTime(),
            timer: parseInt(localStorage.getItem('examTimer') || 120) * 60
        };
        
        localStorage.setItem('examState', JSON.stringify(newExamState));
        
        // Start timer
        startTimer();
        
        // Load first question
        loadQuestion(0);
        
        // Switch to exam screen
        switchScreen('results-screen', 'exam-screen');
    }
}

// Admin Panel Functions
function switchAdminTab(tabId) {
    playButtonSound();
    
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`.admin-tab[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(`${tabId}-tab`).classList.add('active');
}

function saveLoginCode() {
    playButtonSound();
    
    const newCode = document.getElementById('new-login-code').value;
    const currentCode = document.getElementById('current-login-code').value;
    const storedCode = localStorage.getItem('loginCode') || '12345';
    
    if (!newCode || !currentCode) {
        alert('Kode baru dan kode lama harus diisi');
        return;
    }
    
    if (currentCode !== storedCode) {
        alert('Kode login lama salah');
        return;
    }
    
    localStorage.setItem('loginCode', newCode);
    alert('Kode login berhasil diperbarui');
    
    // Clear fields
    document.getElementById('new-login-code').value = '';
    document.getElementById('current-login-code').value = '';
}

function saveExamCode() {
    playButtonSound();
    
    const newCode = document.getElementById('new-exam-code').value;
    const currentCode = document.getElementById('current-exam-code').value;
    const storedCode = localStorage.getItem('cpnsLicenseCode') || 'OPENLOCK-1945';
    
    if (!newCode || !currentCode) {
        alert('Kode baru dan kode lama harus diisi');
        return;
    }
    
    if (currentCode !== storedCode) {
        alert('Kode ujian lama salah');
        return;
    }
    
    localStorage.setItem('cpnsLicenseCode', newCode);
    alert('Kode ujian CPNS berhasil diperbarui');
    
    // Clear fields
    document.getElementById('new-exam-code').value = '';
    document.getElementById('current-exam-code').value = '';
}

function saveQuestionCode() {
    playButtonSound();
    
    const newCode = document.getElementById('new-question-code').value;
    const currentCode = document.getElementById('current-question-code').value;
    const storedCode = localStorage.getItem('questionBankCode') || 'OPENLOCK-1926';
    
    if (!newCode || !currentCode) {
        alert('Kode baru dan kode lama harus diisi');
        return;
    }
    
    if (currentCode !== storedCode) {
        alert('Kode bank soal lama salah');
        return;
    }
    
    localStorage.setItem('questionBankCode', newCode);
    alert('Kode bank soal berhasil diperbarui');
    
    // Clear fields
    document.getElementById('new-question-code').value = '';
    document.getElementById('current-question-code').value = '';
}

function saveAdminCode() {
    playButtonSound();
    
    const newCode = document.getElementById('new-admin-code').value;
    const currentCode = document.getElementById('current-admin-code').value;
    const storedCode = localStorage.getItem('adminCode') || '65614222';
    
    if (!newCode || !currentCode) {
        alert('Kode baru dan kode lama harus diisi');
        return;
    }
    
    if (currentCode !== storedCode) {
        alert('Kode admin lama salah');
        return;
    }
    
    localStorage.setItem('adminCode', newCode);
    alert('Kode admin berhasil diperbarui');
    
    // Clear fields
    document.getElementById('new-admin-code').value = '';
    document.getElementById('current-admin-code').value = '';
}

function saveTimer() {
    playButtonSound();
    
    const timer = document.getElementById('exam-timer').value;
    
    if (!timer || isNaN(timer) {
        alert('Timer harus berupa angka');
        return;
    }
    
    localStorage.setItem('examTimer', timer);
    alert(`Timer ujian berhasil disetel ke ${timer} menit`);
}

function saveChairmanName() {
    playButtonSound();
    
    const name = document.getElementById('chairman-name-input').value;
    
    if (!name) {
        alert('Nama ketua tidak boleh kosong');
        return;
    }
    
    localStorage.setItem('chairmanName', name);
    alert('Nama ketua berhasil diperbarui');
}

function saveMotivationText() {
    playButtonSound();
    
    const text = document.getElementById('motivation-text-input').value;
    
    if (!text) {
        alert('Teks motivasi tidak boleh kosong');
        return;
    }
    
    localStorage.setItem('motivationText', text);
    alert('Teks motivasi berhasil diperbarui');
}

function saveGreetingText() {
    playButtonSound();
    
    const text = document.getElementById('greeting-text-input').value;
    
    if (!text) {
        alert('Teks pembuka tidak boleh kosong');
        return;
    }
    
    localStorage.setItem('greetingText', text);
    document.getElementById('greeting-text').textContent = text;
    alert('Teks pembuka berhasil diperbarui');
}

function saveInfoText() {
    playButtonSound();
    
    const text = document.getElementById('info-text-input').value;
    
    if (!text) {
        alert('Informasi berkala tidak boleh kosong');
        return;
    }
    
    localStorage.setItem('periodicInfo', text);
    document.getElementById('periodic-info').textContent = text;
    alert('Informasi berkala berhasil diperbarui');
}

function saveQuestionPoints() {
    playButtonSound();
    
    const points = document.getElementById('question-points').value;
    
    if (!points || isNaN(points)) {
        alert('Point harus berupa angka');
        return;
    }
    
    localStorage.setItem('questionPoints', points);
    alert(`Point per soal berhasil disetel ke ${points}`);
}

function saveQuestionCount() {
    playButtonSound();
    
    const count = document.getElementById('question-count').value;
    
    if (!count || isNaN(count)) {
        alert('Jumlah soal harus berupa angka');
        return;
    }
    
    localStorage.setItem('questionCount', count);
    alert(`Jumlah soal berhasil disetel ke ${count}`);
}

function randomizeQuestions() {
    playButtonSound();
    
    const currentSetting = localStorage.getItem('randomizeQuestions') === 'true';
    const newSetting = !currentSetting;
    
    localStorage.setItem('randomizeQuestions', newSetting.toString());
    alert(`Pengacakan soal ${newSetting ? 'diaktifkan' : 'dinonaktifkan'}`);
}

function viewParticipants() {
    playButtonSound();
    
    // Load participants data
    const allResults = JSON.parse(localStorage.getItem('examResults')) || [];
    
    // Clear table
    const tableBody = document.getElementById('participants-table-body');
    tableBody.innerHTML = '';
    
    // Populate table
    allResults.forEach((result, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${result.participant.fullname}</td>
            <td>${result.participant.isStudent ? 'Pelajar' : 'Umum'}</td>
            <td>${result.participant.isStudent ? result.participant.level : 'Umum'}</td>
            <td>${result.result.subject.toUpperCase()}</td>
            <td>${new Date(result.result.timestamp).toLocaleDateString('id-ID')}</td>
            <td>${result.result.score}</td>
            <td>${generateCertificateCode(result.participant, result.result)}</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Switch to participants screen
    switchScreen('admin-panel-screen', 'participants-screen');
}

function generateCertificateCode(participant, result) {
    const date = new Date(result.timestamp);
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + 
                       '-' + 
                       Math.random().toString(36).substring(2, 6).toUpperCase();
    
    return `${participant.fullname.toUpperCase().replace(/ /g, '_')}/` +
           `${participant.isStudent ? 'PELAJAR' : 'UMUM'}/` +
           `${participant.level}/` +
           `${participant.subject}/` +
           `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}/` +
           `${randomCode}/` +
           `PERGUNU-STB`;
}

function exportData() {
    playButtonSound();
    alert('Fitur export data akan mengunduh file dalam format yang dipilih');
}

function closeAdminPanel() {
    playButtonSound();
    switchScreen('admin-panel-screen', 'welcome-screen');
}

// Question Bank Functions
function switchBankTab(tabId) {
    playButtonSound();
    
    document.querySelectorAll('.bank-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.bank-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`.bank-tab[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(`${tabId}-tab`).classList.add('active');
    
    // If review tab, load questions
    if (tabId === 'review-questions') {
        loadQuestionsForReview();
    }
}

function saveQuestion() {
    playButtonSound();
    
    const category = document.getElementById('question-category').value;
    const level = document.getElementById('question-level').value;
    const text = document.getElementById('question-text').value;
    const options = {
        A: document.getElementById('option-a-input').value,
        B: document.getElementById('option-b-input').value,
        C: document.getElementById('option-c-input').value,
        D: document.getElementById('option-d-input').value,
        E: document.getElementById('option-e-input').value
    };
    const correctAnswer = document.getElementById('correct-answer').value;
    const explanation = document.getElementById('explanation-text-input').value;
    
    // Validate
    if (!text || !options.A || !options.B || !options.C || !options.D || !options.E || !explanation) {
        alert('Semua field harus diisi');
        return;
    }
    
    // Create question object
    const question = {
        id: Date.now(),
        subject: category,
        level: level,
        text: text,
        options: options,
        correctAnswer: correctAnswer,
        explanation: explanation,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions.push(question);
    localStorage.setItem('questions', JSON.stringify(questions));
    
    alert('Soal berhasil disimpan');
    clearQuestionForm();
}

function clearQuestionForm() {
    playButtonSound();
    
    document.getElementById('question-text').value = '';
    document.getElementById('option-a-input').value = '';
    document.getElementById('option-b-input').value = '';
    document.getElementById('option-c-input').value = '';
    document.getElementById('option-d-input').value = '';
    document.getElementById('option-e-input').value = '';
    document.getElementById('correct-answer').value = 'A';
    document.getElementById('explanation-text-input').value = '';
}

function generateQuestionsWithAI() {
    playButtonSound();
    
    const category = document.getElementById('ai-category').value;
    const level = document.getElementById('ai-level').value;
    const prompt = document.getElementById('ai-prompt').value;
    const apiKey = document.getElementById('api-key').value;
    
    if (!prompt) {
        alert('Prompt AI tidak boleh kosong');
        return;
    }
    
    if (!apiKey) {
        alert('API Key harus diisi');
        return;
    }
    
    // Show loading state
    const generateBtn = document.getElementById('generate-questions-btn');
    generateBtn.disabled = true;
    generateBtn.textContent = 'Memproses...';
    
    // In a real app, this would call an actual AI API
    // For demo purposes, we'll simulate a response after a delay
    setTimeout(() => {
        // Simulate AI response
        const aiResponse = simulateAIResponse(category, level, prompt);
        
        // Display results
        const aiResultsContainer = document.getElementById('ai-results');
        aiResultsContainer.innerHTML = '';
        
        aiResponse.questions.forEach((q, i) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'ai-question';
            questionElement.innerHTML = `
                <h4>Soal ${i + 1}:</h4>
                <p>${q.text}</p>
                <ul>
                    <li>A. ${q.options.A}</li>
                    <li>B. ${q.options.B}</li>
                    <li>C. ${q.options.C}</li>
                    <li>D. ${q.options.D}</li>
                    <li>E. ${q.options.E}</li>
                </ul>
                <p><strong>Jawaban benar: ${q.correctAnswer}</strong></p>
                <p>Penjelasan: ${q.explanation}</p>
                <button class="btn-secondary save-ai-question" data-index="${i}">Simpan Soal Ini</button>
                <hr>
            `;
            
            aiResultsContainer.appendChild(questionElement);
        });
        
        // Add event listeners to save buttons
        document.querySelectorAll('.save-ai-question').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                saveAIQuestion(aiResponse.questions[index]);
            });
        });
        
        // Reset button
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate Soal';
    }, 2000);
}

function simulateAIResponse(category, level, prompt) {
    // This is just for demo - in a real app, you would call an actual AI API
    const questions = [];
    
    for (let i = 0; i < 3; i++) {
        questions.push({
            subject: category,
            level: level,
            text: `Contoh soal ${i + 1} tentang ${category} untuk tingkat ${level} (dihasilkan dari prompt: "${prompt}")`,
            options: {
                A: `Opsi A untuk soal ${i + 1}`,
                B: `Opsi B untuk soal ${i + 1}`,
                C: `Opsi C untuk soal ${i + 1}`,
                D: `Opsi D untuk soal ${i + 1}`,
                E: `Opsi E untuk soal ${i + 1}`
            },
            correctAnswer: ['A', 'B', 'C', 'D', 'E'][Math.floor(Math.random() * 5)],
            explanation: `Ini adalah penjelasan untuk jawaban soal ${i + 1} yang dihasilkan oleh AI.`
        });
    }
    
    return { questions };
}

function saveAIQuestion(question) {
    playButtonSound();
    
    // Save to localStorage
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    question.id = Date.now();
    question.timestamp = new Date().toISOString();
    questions.push(question);
    localStorage.setItem('questions', JSON.stringify(questions));
    
    alert('Soal berhasil disimpan ke bank soal');
}

function loadQuestionsForReview() {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const questionsList = document.getElementById('questions-list');
    
    questionsList.innerHTML = '';
    
    if (questions.length === 0) {
        questionsList.innerHTML = '<p>Tidak ada soal yang tersedia.</p>';
        return;
    }
    
    // Apply filters
    const categoryFilter = document.getElementById('filter-category').value;
    const levelFilter = document.getElementById('filter-level').value;
    
    let filteredQuestions = questions;
    
    if (categoryFilter !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => q.subject === categoryFilter);
    }
    
    if (levelFilter !== 'all') {
        filteredQuestions = filteredQuestions.filter(q => q.level === levelFilter);
    }
    
    // Pagination
    const pageSize = 5;
    let currentPage = 1;
    const totalPages = Math.ceil(filteredQuestions.length / pageSize);
    
    // Display current page info
    document.getElementById('page-info').textContent = `Halaman ${currentPage} dari ${totalPages}`;
    
    // Enable/disable pagination buttons
    document.getElementById('prev-page-btn').disabled = currentPage <= 1;
    document.getElementById('next-page-btn').disabled = currentPage >= totalPages;
    
    // Display questions for current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredQuestions.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const q = filteredQuestions[i];
        
        const questionElement = document.createElement('div');
        questionElement.className = 'question-item';
        questionElement.innerHTML = `
            <div class="question-item-header">
                <span class="question-category">${q.subject.toUpperCase()}</span>
                <span class="question-level">${q.level}</span>
            </div>
            <div class="question-text-item">${q.text}</div>
            <div class="options-list">
                <div class="option-item ${q.correctAnswer === 'A' ? 'correct' : ''}">A. ${q.options.A}</div>
                <div class="option-item ${q.correctAnswer === 'B' ? 'correct' : ''}">B. ${q.options.B}</div>
                <div class="option-item ${q.correctAnswer === 'C' ? 'correct' : ''}">C. ${q.options.C}</div>
                <div class="option-item ${q.correctAnswer === 'D' ? 'correct' : ''}">D. ${q.options.D}</div>
                <div class="option-item ${q.correctAnswer === 'E' ? 'correct' : ''}">E. ${q.options.E}</div>
            </div>
            <div class="explanation-item">
                <strong>Penjelasan:</strong> ${q.explanation}
            </div>
            <div class="question-actions">
                <button class="btn-secondary edit-question" data-id="${q.id}">Edit</button>
                <button class="btn-warning delete-question" data-id="${q.id}">Hapus</button>
            </div>
        `;
        
        questionsList.appendChild(questionElement);
    }
    
    // Add event listeners to action buttons
    document.querySelectorAll('.edit-question').forEach(btn => {
        btn.addEventListener('click', function() {
            editQuestion(this.getAttribute('data-id'));
        });
    });
    
    document.querySelectorAll('.delete-question').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteQuestion(this.getAttribute('data-id'));
        });
    });
}

function applyQuestionFilter() {
    playButtonSound();
    loadQuestionsForReview();
}

function goToPrevPage() {
    playButtonSound();
    // Implementation would decrement currentPage and reload questions
    alert('Fitur pagination akan menampilkan halaman sebelumnya');
}

function goToNextPage() {
    playButtonSound();
    // Implementation would increment currentPage and reload questions
    alert('Fitur pagination akan menampilkan halaman berikutnya');
}

function editQuestion(questionId) {
    playButtonSound();
    
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const question = questions.find(q => q.id == questionId);
    
    if (!question) {
        alert('Soal tidak ditemukan');
        return;
    }
    
    // Switch to manual entry tab
    switchBankTab('manual-entry');
    
    // Fill form with question data
    document.getElementById('question-category').value = question.subject;
    document.getElementById('question-level').value = question.level;
    document.getElementById('question-text').value = question.text;
    document.getElementById('option-a-input').value = question.options.A;
    document.getElementById('option-b-input').value = question.options.B;
    document.getElementById('option-c-input').value = question.options.C;
    document.getElementById('option-d-input').value = question.options.D;
    document.getElementById('option-e-input').value = question.options.E;
    document.getElementById('correct-answer').value = question.correctAnswer;
    document.getElementById('explanation-text-input').value = question.explanation;
    
    // Scroll to form
    document.getElementById('manual-entry-tab').scrollIntoView();
}

function deleteQuestion(questionId) {
    playButtonSound();
    
    if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions = questions.filter(q => q.id != questionId);
        localStorage.setItem('questions', JSON.stringify(questions));
        
        // Reload questions
        loadQuestionsForReview();
        alert('Soal berhasil dihapus');
    }
}

function closeQuestionBank() {
    playButtonSound();
    switchScreen('question-bank-screen', 'welcome-screen');
}

// Participants Data Functions
function searchParticipants() {
    playButtonSound();
    alert('Fitur pencarian peserta akan menampilkan hasil berdasarkan kata kunci');
}

function exportToExcel() {
    playButtonSound();
    alert('Data akan diunduh dalam format Excel');
}

function exportToWord() {
    playButtonSound();
    alert('Data akan diunduh dalam format Word');
}

function exportToPDF() {
    playButtonSound();
    alert('Data akan diunduh dalam format PDF');
}

function closeParticipantsData() {
    playButtonSound();
    switchScreen('participants-screen', 'admin-panel-screen');
}

// Floating Button Functions
function openShareModal() {
    playButtonSound();
    
    // Load social links
    const socialLinks = [
        { name: 'Facebook', url: 'https://facebook.com' },
        { name: 'Twitter', url: 'https://twitter.com' },
        { name: 'WhatsApp', url: 'https://web.whatsapp.com' },
        { name: 'Telegram', url: 'https://telegram.org' }
    ];
    
    const linksContainer = document.getElementById('social-links');
    linksContainer.innerHTML = '';
    
    socialLinks.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.className = 'social-link';
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.innerHTML = `
            <i class="icon-${link.name.toLowerCase()}"></i>
            <span>${link.name}</span>
        `;
        
        linksContainer.appendChild(linkElement);
    });
    
    // Show modal
    document.getElementById('share-modal').style.display = 'flex';
}

function openWhatsAppChat() {
    playButtonSound();
    window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...`, '_blank');
}

function openQuestionBankAccess() {
    playButtonSound();
    document.getElementById('bank-access-modal').style.display = 'flex';
}

function openAdminAccess() {
    playButtonSound();
    document.getElementById('admin-access-modal').style.display = 'flex';
}

// Verification Functions
function verifyBankCode() {
    playButtonSound();
    
    const code = document.getElementById('bank-access-code').value;
    const storedCode = localStorage.getItem('questionBankCode') || 'OPENLOCK-1926';
    
    if (code === storedCode) {
        document.getElementById('bank-access-modal').style.display = 'none';
        switchScreen('welcome-screen', 'question-bank-screen');
    } else {
        alert('Kode bank soal salah. Silakan coba lagi.');
    }
}

function verifyAdminCode() {
    playButtonSound();
    
    const code = document.getElementById('admin-access-code').value;
    const storedCode = localStorage.getItem('adminCode') || '65614222';
    
    if (code === storedCode) {
        document.getElementById('admin-access-modal').style.display = 'none';
        switchScreen('welcome-screen', 'admin-panel-screen');
    } else {
        alert('Kode admin salah. Silakan coba lagi.');
    }
}

// Sample Questions (for demo purposes)
function loadSampleQuestions() {
    // Only load if no questions exist
    if (localStorage.getItem('questions')) return;
    
    const sampleQuestions = [
        // Agama - SD
        {
            id: 1,
            subject: 'agama',
            level: 'SD',
            text: 'Apa nama kitab suci umat Islam?',
            options: {
                A: 'Al-Quran',
                B: 'Injil',
                C: 'Taurat',
                D: 'Weda',
                E: 'Tripitaka'
            },
            correctAnswer: 'A',
            explanation: 'Kitab suci umat Islam adalah Al-Quran yang diturunkan kepada Nabi Muhammad SAW.',
            timestamp: new Date().toISOString()
        },
        // PPKN - SMP
        {
            id: 2,
            subject: 'ppkn',
            level: 'SMP',
            text: 'Lambang negara Indonesia adalah?',
            options: {
                A: 'Garuda Pancasila',
                B: 'Burung Elang',
                C: 'Harimau',
                D: 'Singa',
                E: 'Rajawali'
            },
            correctAnswer: 'A',
            explanation: 'Lambang negara Indonesia adalah Garuda Pancasila dengan semboyan Bhinneka Tunggal Ika.',
            timestamp: new Date().toISOString()
        },
        // Matematika - SMA
        {
            id: 3,
            subject: 'matematika',
            level: 'SMA',
            text: 'Berapakah hasil dari 2 + 2 × 2?',
            options: {
                A: '6',
                B: '8',
                C: '4',
                D: '10',
                E: '2'
            },
            correctAnswer: 'A',
            explanation: 'Menurut aturan operasi matematika, perkalian dilakukan sebelum penjumlahan. Jadi 2 × 2 = 4, kemudian 2 + 4 = 6.',
            timestamp: new Date().toISOString()
        },
        // Tes IQ - Umum
        {
            id: 4,
            subject: 'tes-iq',
            level: 'umum',
            text: 'Jika A = 1, B = 2, ..., Z = 26, berapa jumlah dari A + B + C?',
            options: {
                A: '6',
                B: '5',
                C: '7',
                D: '8',
                E: '9'
            },
            correctAnswer: 'A',
            explanation: 'A=1, B=2, C=3. Jadi 1+2+3=6.',
            timestamp: new Date().toISOString()
        },
        // Ujian CPNS - Umum
        {
            id: 5,
            subject: 'ujian-cpns',
            level: 'umum',
            text: 'Pancasila sebagai dasar negara tercantum dalam?',
            options: {
                A: 'Pembukaan UUD 1945',
                B: 'Batang Tubuh UUD 1945',
                C: 'Penjelasan UUD 1945',
                D: 'Keputusan Presiden',
                E: 'Ketetapan MPR'
            },
            correctAnswer: 'A',
            explanation: 'Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat.',
            timestamp: new Date().toISOString()
        }
    ];
    
    localStorage.setItem('questions', JSON.stringify(sampleQuestions));
}

// Initialize event listeners for verification buttons
document.getElementById('verify-bank-code-btn').addEventListener('click', verifyBankCode);
document.getElementById('bank-access-code').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') verifyBankCode();
});

document.getElementById('verify-admin-code-btn').addEventListener('click', verifyAdminCode);
document.getElementById('admin-access-code').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') verifyAdminCode();
});