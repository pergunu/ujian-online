document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let currentScreen = 'opening';
    let participantData = {};
    let examData = {};
    let questions = [];
    let currentQuestionIndex = 0;
    let timerInterval;
    let timeLeft = 120 * 60; // 120 minutes in seconds
    let examStarted = false;
    let answers = [];
    let correctAnswers = 0;
    let wrongAnswers = 0;
    
    // Default settings
    const defaultSettings = {
        loginCode: '12345',
        cpnsCode: 'OPENLOCK-1945',
        bankCode: 'OPENLOCK-1926',
        adminCode: '65614222',
        greetingText: 'Selamat Datang di Ujian Online Pergunu Situbondo',
        infoText: 'Sistem ujian online ini memudahkan peserta untuk menguji kemampuan dengan standar nasional.',
        chairmanName: 'Moh. Nuril Hudha, S.Pd., M.Si.',
        examTimer: 120,
        questionCount: 10,
        pointPerQuestion: 1,
        shuffleQuestions: true,
        motivations: [
            { range: '90-100', text: 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.' },
            { range: '80-89', text: 'Hasil yang sangat baik! Anda telah menguasai hampir semua materi dengan baik.' },
            { range: '70-79', text: 'Bagus! Anda memiliki pemahaman yang baik tentang materi ini.' },
            { range: '60-69', text: 'Cukup baik. Masih ada ruang untuk meningkatkan pemahaman Anda.' },
            { range: '0-59', text: 'Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.' }
        ],
        enabledExams: {
            agama: true,
            ppkn: true,
            sejarah: true,
            ipa: true,
            ips: true,
            matematika: true,
            bahasa_indonesia: true,
            bahasa_inggris: true,
            materi_extra: true,
            materi_khusus: true,
            ujian_logika: true,
            ujian_cpns: true
        }
    };
    
    // Sample questions for all categories
    const sampleQuestions = {
        agama: [
            {
                question: "Apa nama kitab suci umat Islam?",
                options: {
                    a: "Injil",
                    b: "Taurat",
                    c: "Al-Qur'an",
                    d: "Zabur",
                    e: "Weda"
                },
                correctAnswer: "c",
                explanation: "Kitab suci umat Islam adalah Al-Qur'an yang diturunkan kepada Nabi Muhammad SAW."
            }
        ],
        ppkn: [
            {
                question: "Pancasila sebagai dasar negara tercantum dalam pembukaan UUD 1945 pada alinea keberapa?",
                options: {
                    a: "Pertama",
                    b: "Kedua",
                    c: "Ketiga",
                    d: "Keempat",
                    e: "Kelima"
                },
                correctAnswer: "d",
                explanation: "Pancasila sebagai dasar negara tercantum dalam alinea keempat Pembukaan UUD 1945."
            }
        ],
        // Add questions for other categories similarly
        ujian_cpns: [
            {
                question: "Negara Kesatuan Republik Indonesia adalah negara yang berdasarkan Pancasila. Hal ini tercantum dalam UUD 1945 pasal berapa?",
                options: {
                    a: "Pasal 1 ayat (1)",
                    b: "Pasal 1 ayat (2)",
                    c: "Pasal 1 ayat (3)",
                    d: "Pasal 2 ayat (1)",
                    e: "Pasal 2 ayat (2)"
                },
                correctAnswer: "a",
                explanation: "Pasal 1 ayat (1) UUD 1945 menyatakan bahwa Negara Indonesia adalah negara kesatuan yang berbentuk republik."
            }
        ]
    };
    
    // Initialize the app
    function initApp() {
        // Load settings from localStorage or use defaults
        loadSettings();
        
        // Set greeting text
        document.getElementById('greeting-text').textContent = defaultSettings.greetingText;
        
        // Set info text
        document.getElementById('info-text').textContent = defaultSettings.infoText;
        
        // Event listeners
        document.getElementById('login-btn').addEventListener('click', handleLogin);
        document.getElementById('agree-checkbox').addEventListener('change', toggleTermsButton);
        document.getElementById('terms-btn').addEventListener('click', showParticipantForm);
        document.getElementById('participant-form').addEventListener('submit', handleParticipantForm);
        
        // Status radio buttons
        document.querySelectorAll('input[name="status"]').forEach(radio => {
            radio.addEventListener('change', toggleStatusFields);
        });
        
        // Level buttons
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', handleLevelSelection);
        });
        
        // Subject buttons
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.addEventListener('click', handleSubjectSelection);
        });
        
        // Verify CPNS code button
        document.getElementById('verify-cpns').addEventListener('click', verifyCpnsCode);
        
        // Start exam button
        document.getElementById('start-exam-btn').addEventListener('click', startExam);
        
        // Exam buttons
        document.getElementById('finish-exam-btn').addEventListener('click', finishExam);
        document.getElementById('skip-question-btn').addEventListener('click', skipQuestion);
        document.getElementById('unanswered-btn').addEventListener('click', showUnanswered);
        
        // Results buttons
        document.getElementById('view-certificate-btn').addEventListener('click', showCertificate);
        document.getElementById('retry-exam-btn').addEventListener('click', retryExam);
        
        // Certificate buttons
        document.getElementById('print-certificate-btn').addEventListener('click', printCertificate);
        document.getElementById('back-to-results-btn').addEventListener('click', backToResults);
        
        // Floating buttons
        document.getElementById('share-btn').addEventListener('click', toggleShareOptions);
        document.getElementById('whatsapp-btn').addEventListener('click', openWhatsApp);
        document.getElementById('question-bank-btn').addEventListener('click', openQuestionBank);
        document.getElementById('admin-btn').addEventListener('click', openAdminPanel);
        
        // Admin login
        document.getElementById('admin-login-btn').addEventListener('click', verifyAdminCode);
        document.getElementById('admin-cancel-btn').addEventListener('click', closeAdminLogin);
        
        // Bank login
        document.getElementById('bank-login-btn').addEventListener('click', verifyBankCode);
        document.getElementById('bank-cancel-btn').addEventListener('click', closeBankLogin);
        
        // GPS button
        document.getElementById('gps-btn').addEventListener('click', getLocation);
        
        // Play opening audio
        playAudio('opening-audio');
    }
    
    // Load settings from localStorage
    function loadSettings() {
        const savedSettings = localStorage.getItem('ujianOnlineSettings');
        if (savedSettings) {
            Object.assign(defaultSettings, JSON.parse(savedSettings));
        }
    }
    
    // Save settings to localStorage
    function saveSettings() {
        localStorage.setItem('ujianOnlineSettings', JSON.stringify(defaultSettings));
    }
    
    // Play audio
    function playAudio(id) {
        const audio = document.getElementById(id);
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play failed:', e));
        }
    }
    
    // Handle login
    function handleLogin() {
        const loginCode = document.getElementById('login-code').value;
        const errorElement = document.getElementById('login-error');
        
        if (loginCode === defaultSettings.loginCode) {
            errorElement.style.display = 'none';
            switchScreen('terms');
        } else {
            errorElement.textContent = 'Kode login salah. Silakan coba lagi.';
            errorElement.style.display = 'block';
        }
    }
    
    // Toggle terms button based on checkbox
    function toggleTermsButton() {
        const checkbox = document.getElementById('agree-checkbox');
        const button = document.getElementById('terms-btn');
        button.disabled = !checkbox.checked;
    }
    
    // Show participant form
    function showParticipantForm() {
        switchScreen('participant');
    }
    
    // Toggle status fields based on selection
    function toggleStatusFields() {
        const isStudent = document.getElementById('student').checked;
        document.getElementById('student-fields').style.display = isStudent ? 'block' : 'none';
        document.getElementById('general-fields').style.display = isStudent ? 'none' : 'block';
    }
    
    // Handle participant form submission
    function handleParticipantForm(e) {
        e.preventDefault();
        
        // Collect participant data
        participantData = {
            fullname: document.getElementById('fullname').value,
            status: document.querySelector('input[name="status"]:checked').value,
            timestamp: new Date().toISOString()
        };
        
        if (participantData.status === 'pelajar') {
            participantData.school = document.getElementById('school').value;
            participantData.nis = document.getElementById('nis').value;
            participantData.purpose = document.getElementById('student-purpose').value;
            participantData.schoolLevel = document.getElementById('school-level').value;
        } else {
            participantData.address = document.getElementById('address').value;
            participantData.whatsapp = document.getElementById('whatsapp').value;
            participantData.email = document.getElementById('email').value;
            participantData.purpose = document.getElementById('general-purpose').value;
        }
        
        // Show level selection screen
        switchScreen('level');
        
        // Configure level options based on participant type
        if (participantData.status === 'pelajar') {
            document.getElementById('student-levels').style.display = 'block';
            document.getElementById('general-levels').style.display = 'none';
            
            // Show appropriate grade levels
            document.getElementById('sd-levels').style.display = participantData.schoolLevel === 'sd' ? 'block' : 'none';
            document.getElementById('smp-levels').style.display = participantData.schoolLevel === 'smp' ? 'block' : 'none';
            document.getElementById('sma-levels').style.display = participantData.schoolLevel === 'sma' ? 'block' : 'none';
        } else {
            document.getElementById('student-levels').style.display = 'none';
            document.getElementById('general-levels').style.display = 'block';
        }
    }
    
    // Handle level selection
    function handleLevelSelection(e) {
        const level = e.target.getAttribute('data-level');
        
        // Remove active class from all buttons
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to selected button
        e.target.classList.add('active');
        
        // Store selected level
        examData.level = level;
        
        // Show subject selection
        document.getElementById('subject-selection').style.display = 'block';
        
        // Configure subject options based on participant type
        if (participantData.status === 'pelajar') {
            document.getElementById('student-subjects').style.display = 'block';
            document.getElementById('general-subjects').style.display = 'none';
        } else {
            document.getElementById('student-subjects').style.display = 'none';
            document.getElementById('general-subjects').style.display = 'block';
            
            // Show CPNS license form if CPNS exam is selected
            if (level === 'ujian-cpns') {
                document.getElementById('cpns-license').style.display = 'block';
            } else {
                document.getElementById('cpns-license').style.display = 'none';
            }
        }
        
        // Show start exam button if subject is already selected
        if (examData.subject) {
            document.getElementById('start-exam-btn').style.display = 'block';
        } else {
            document.getElementById('start-exam-btn').style.display = 'none';
        }
    }
    
    // Handle subject selection
    function handleSubjectSelection(e) {
        const subject = e.target.getAttribute('data-subject');
        
        // Check if exam is enabled
        if (!defaultSettings.enabledExams[subject]) {
            alert('Ujian ini sedang tidak tersedia. Silakan pilih ujian lain.');
            return;
        }
        
        // Remove active class from all buttons
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to selected button
        e.target.classList.add('active');
        
        // Store selected subject
        examData.subject = subject;
        
        // Show start exam button
        document.getElementById('start-exam-btn').style.display = 'block';
    }
    
    // Verify CPNS code
    function verifyCpnsCode() {
        const cpnsCode = document.getElementById('cpns-code').value;
        const errorElement = document.getElementById('cpns-error');
        
        if (cpnsCode === defaultSettings.cpnsCode) {
            errorElement.style.display = 'none';
            document.getElementById('cpns-license').style.display = 'none';
        } else {
            errorElement.textContent = 'Kode lisensi salah. Silakan coba lagi.';
            errorElement.style.display = 'block';
        }
    }
    
    // Start exam
    function startExam() {
        // Load questions for selected subject
        questions = sampleQuestions[examData.subject] || [];
        
        // Shuffle questions if enabled
        if (defaultSettings.shuffleQuestions) {
            questions = shuffleArray(questions);
        }
        
        // Limit number of questions
        questions = questions.slice(0, defaultSettings.questionCount);
        
        // Initialize answers array
        answers = new Array(questions.length).fill(null);
        
        // Reset counters
        currentQuestionIndex = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        examStarted = true;
        
        // Start timer
        timeLeft = defaultSettings.examTimer * 60;
        startTimer();
        
        // Switch to exam screen
        switchScreen('exam');
        
        // Display first question
        displayQuestion();
    }
    
    // Display current question
    function displayQuestion() {
        if (currentQuestionIndex >= questions.length) {
            finishExam();
            return;
        }
        
        const question = questions[currentQuestionIndex];
        const questionText = document.getElementById('question-text');
        const questionOptions = document.getElementById('question-options');
        const explanationText = document.getElementById('explanation-text');
        const answerExplanation = document.getElementById('answer-explanation');
        
        // Update progress
        document.getElementById('current-question').textContent = currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = questions.length;
        
        // Set question text
        questionText.textContent = question.question;
        
        // Clear previous options
        questionOptions.innerHTML = '';
        
        // Add options
        for (const [key, value] of Object.entries(question.options)) {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.setAttribute('data-option', key);
            
            const optionLetter = document.createElement('div');
            optionLetter.className = 'option-letter';
            optionLetter.textContent = key.toUpperCase();
            
            const optionText = document.createElement('div');
            optionText.className = 'option-text';
            optionText.textContent = value;
            
            optionBtn.appendChild(optionLetter);
            optionBtn.appendChild(optionText);
            
            // Mark if already answered
            if (answers[currentQuestionIndex] === key) {
                optionBtn.classList.add('selected');
                
                // Show if correct or wrong
                if (key === question.correctAnswer) {
                    optionBtn.classList.add('correct');
                } else {
                    optionBtn.classList.add('wrong');
                }
            }
            
            optionBtn.addEventListener('click', () => selectAnswer(key));
            questionOptions.appendChild(optionBtn);
        }
        
        // Show explanation if already answered
        if (answers[currentQuestionIndex] !== null) {
            explanationText.textContent = question.explanation;
            answerExplanation.style.display = 'block';
        } else {
            answerExplanation.style.display = 'none';
        }
    }
    
    // Select answer
    function selectAnswer(option) {
        // Don't allow changing answers
        if (answers[currentQuestionIndex] !== null) return;
        
        const question = questions[currentQuestionIndex];
        const optionBtn = document.querySelector(`.option-btn[data-option="${option}"]`);
        const explanationText = document.getElementById('explanation-text');
        const answerExplanation = document.getElementById('answer-explanation');
        
        // Record answer
        answers[currentQuestionIndex] = option;
        
        // Mark selected option
        optionBtn.classList.add('selected');
        
        // Check if correct
        if (option === question.correctAnswer) {
            optionBtn.classList.add('correct');
            correctAnswers++;
            playAudio('correct-audio');
        } else {
            optionBtn.classList.add('wrong');
            wrongAnswers++;
            playAudio('wrong-audio');
        }
        
        // Show explanation
        explanationText.textContent = question.explanation;
        answerExplanation.style.display = 'block';
        
        // Automatically move to next question after delay
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
        }, 2000);
    }
    
    // Skip question
    function skipQuestion() {
        currentQuestionIndex++;
        displayQuestion();
    }
    
    // Show unanswered questions
    function showUnanswered() {
        // Find first unanswered question
        const unansweredIndex = answers.findIndex(answer => answer === null);
        
        if (unansweredIndex !== -1) {
            currentQuestionIndex = unansweredIndex;
            displayQuestion();
        } else {
            alert('Semua soal sudah dijawab.');
        }
    }
    
    // Start timer
    function startTimer() {
        clearInterval(timerInterval);
        
        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('exam-time').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            // Change color when time is running out
            const timerElement = document.getElementById('exam-time');
            timerElement.classList.remove('warning', 'danger');
            
            if (timeLeft <= 10 * 60) { // 10 minutes left
                timerElement.classList.add('warning');
                
                // Show warning banner
                if (timeLeft > 60) {
                    document.getElementById('warning-time').textContent = Math.floor(timeLeft / 60);
                    document.getElementById('time-warning').classList.add('active');
                }
            }
            
            if (timeLeft <= 5 * 60) { // 5 minutes left
                timerElement.classList.remove('warning');
                timerElement.classList.add('danger');
            }
            
            if (timeLeft <= 60) { // 1 minute left
                document.getElementById('time-warning').classList.remove('active');
            }
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                finishExam();
            } else {
                timeLeft--;
            }
        }
        
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }
    
    // Finish exam
    function finishExam() {
        clearInterval(timerInterval);
        examStarted = false;
        
        // Count unanswered questions
        const unanswered = answers.filter(answer => answer === null).length;
        
        // Calculate score (assuming each correct answer is worth 1 point)
        const score = Math.round((correctAnswers / questions.length) * 100);
        
        // Update results screen
        document.getElementById('total-answered').textContent = questions.length;
        document.getElementById('correct-answers').textContent = correctAnswers;
        document.getElementById('wrong-answers').textContent = wrongAnswers + unanswered;
        document.getElementById('exam-score').textContent = score;
        
        // Switch to results screen
        switchScreen('results');
        
        // Hide warning banner if shown
        document.getElementById('time-warning').classList.remove('active');
        
        // Save participant result
        saveParticipantResult(score);
    }
    
    // Save participant result
    function saveParticipantResult(score) {
        const result = {
            participant: participantData,
            exam: examData,
            score: score,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            unanswered: answers.filter(answer => answer === null).length,
            timestamp: new Date().toISOString(),
            certificateCode: generateCertificateCode(score)
        };
        
        // Get existing results or initialize array
        const results = JSON.parse(localStorage.getItem('examResults') || []);
        results.push(result);
        localStorage.setItem('examResults', JSON.stringify(results));
    }
    
    // Generate certificate code
    function generateCertificateCode(score) {
        const now = new Date();
        const dateStr = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + 
                          '-' + 
                          Math.random().toString(36).substring(2, 6).toUpperCase();
        
        return `${participantData.fullname.toUpperCase().replace(/ /g, '')}/` +
               `${participantData.status.toUpperCase()}/` +
               `${participantData.schoolLevel ? participantData.schoolLevel.toUpperCase() : 'UMUM'}/` +
               `${examData.subject.toUpperCase()}/` +
               `${dateStr}/` +
               `${randomCode}/` +
               `PERGUNU-STB`;
    }
    
    // Show certificate
    function showCertificate() {
        // Get the last result (current exam)
        const results = JSON.parse(localStorage.getItem('examResults') || [];
        const result = results[results.length - 1];
        
        if (!result) return;
        
        // Update certificate content
        document.getElementById('cert-name').textContent = result.participant.fullname;
        document.getElementById('cert-score').textContent = result.score;
        document.getElementById('cert-date').textContent = `Ditetapkan di: Situbondo, ${formatDate(new Date(result.timestamp))}`;
        document.getElementById('cert-code').textContent = result.certificateCode;
        document.getElementById('chairman-name').textContent = defaultSettings.chairmanName;
        
        // Set motivation text based on score
        const motivation = getMotivationText(result.score);
        document.getElementById('cert-motivation').textContent = motivation;
        
        // Switch to certificate screen
        switchScreen('certificate');
        
        // Play applause sound
        playAudio('applause-audio');
    }
    
    // Get motivation text based on score
    function getMotivationText(score) {
        for (const motiv of defaultSettings.motivations) {
            const [min, max] = motiv.range.split('-').map(Number);
            if (score >= min && score <= max) {
                return motiv.text;
            }
        }
        return 'Terima kasih telah mengikuti ujian ini.';
    }
    
    // Format date
    function formatDate(date) {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    }
    
    // Print certificate
    function printCertificate() {
        // Hide floating buttons
        document.querySelector('.floating-buttons').style.display = 'none';
        
        // Print the certificate
        window.print();
        
        // Show floating buttons again after a delay
        setTimeout(() => {
            document.querySelector('.floating-buttons').style.display = 'flex';
        }, 1000);
    }
    
    // Back to results from certificate
    function backToResults() {
        switchScreen('results');
    }
    
    // Retry exam
    function retryExam() {
        switchScreen('level');
    }
    
    // Toggle share options
    function toggleShareOptions() {
        const shareOptions = document.querySelector('.share-options');
        shareOptions.style.display = shareOptions.style.display === 'block' ? 'none' : 'block';
    }
    
    // Open WhatsApp chat
    function openWhatsApp() {
        const message = 'Assalamualaikum mas admin, saya mau tanya sesuatu nih...';
        const url = `https://wa.me/6285647709114?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }
    
    // Open question bank
    function openQuestionBank() {
        document.getElementById('bank-code-input').value = '';
        document.getElementById('bank-login-modal').style.display = 'flex';
    }
    
    // Open admin panel
    function openAdminPanel() {
        document.getElementById('admin-code-input').value = '';
        document.getElementById('admin-login-modal').style.display = 'flex';
    }
    
    // Verify admin code
    function verifyAdminCode() {
        const adminCode = document.getElementById('admin-code-input').value;
        const errorElement = document.getElementById('admin-code-error');
        
        if (adminCode === defaultSettings.adminCode) {
            errorElement.style.display = 'none';
            closeAdminLogin();
            switchScreen('admin');
        } else {
            errorElement.textContent = 'Kode admin salah. Silakan coba lagi.';
            errorElement.style.display = 'block';
        }
    }
    
    // Close admin login
    function closeAdminLogin() {
        document.getElementById('admin-login-modal').style.display = 'none';
    }
    
    // Verify bank code
    function verifyBankCode() {
        const bankCode = document.getElementById('bank-code-input').value;
        const errorElement = document.getElementById('bank-code-error');
        
        if (bankCode === defaultSettings.bankCode) {
            errorElement.style.display = 'none';
            closeBankLogin();
            switchScreen('admin');
            document.querySelector('.tab-btn[data-tab="questions"]').click();
        } else {
            errorElement.textContent = 'Kode bank soal salah. Silakan coba lagi.';
            errorElement.style.display = 'block';
        }
    }
    
    // Close bank login
    function closeBankLogin() {
        document.getElementById('bank-login-modal').style.display = 'none';
    }
    
    // Get current location
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    // Reverse geocoding to get address (in a real app, you'd use a geocoding API)
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    
                    // For demo purposes, we'll just show coordinates
                    document.getElementById('address').value = `Lokasi: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                },
                error => {
                    console.error('Error getting location:', error);
                    alert('Tidak dapat mendapatkan lokasi: ' + error.message);
                }
            );
        } else {
            alert('Geolocation tidak didukung oleh browser Anda.');
        }
    }
    
    // Switch between screens
    function switchScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Hide modals
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        
        // Show selected screen
        document.getElementById(`${screenId}-screen`).classList.add('active');
        currentScreen = screenId;
        
        // Scroll to top
        window.scrollTo(0, 0);
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
    
    // Initialize the app
    initApp();
});
