// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi partikel background
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

    // Main Variables
    const screens = document.querySelectorAll('.screen');
    let currentScreen = 0;
    let participantData = {};
    let examData = {};
    let questions = [];
    let currentQuestion = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let timer;
    let timeLeft = 120 * 60; // 120 menit dalam detik
    let unansweredQuestions = [];
    let selectedOptions = {};
    
    // Default Codes
    const defaultCodes = {
        login: '12345',
        exam: 'OPENLOCK-1945',
        bank: 'OPENLOCK-1926',
        admin: '65614222'
    };
    
    // Sample Questions (in a real app, this would come from a database)
    const sampleQuestions = {
        AGAMA: [
            {
                question: "Apa rukun Islam yang pertama?",
                options: {
                    A: "Shalat",
                    B: "Puasa",
                    C: "Syahadat",
                    D: "Zakat",
                    E: "Haji"
                },
                correctAnswer: "C",
                explanation: "Rukun Islam yang pertama adalah mengucapkan dua kalimat syahadat."
            }
        ],
        PPKN: [
            {
                question: "Pancasila sebagai dasar negara tercantum dalam?",
                options: {
                    A: "Pembukaan UUD 1945",
                    B: "Batang Tubuh UUD 1945",
                    C: "Penjelasan UUD 1945",
                    D: "Keputusan Presiden",
                    E: "Peraturan Pemerintah"
                },
                correctAnswer: "A",
                explanation: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat."
            }
        ],
        // Add other subjects similarly...
    };
    
    // Motivational Messages
    const motivationalMessages = {
        perfect: "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.",
        excellent: "Luar biasa! Hasil yang sangat memuaskan. Teruslah belajar dan berkembang.",
        good: "Bagus! Anda sudah menguasai sebagian besar materi. Tingkatkan lagi pemahaman Anda.",
        average: "Cukup baik. Masih ada ruang untuk perbaikan. Pelajari lagi materi yang kurang dikuasai.",
        poor: "Hasil Anda masih di bawah rata-rata. Jangan menyerah, pelajari lagi materinya dan coba lagi."
    };
    
    // Load questions from localStorage or use sample questions
    function loadQuestions() {
        const savedQuestions = localStorage.getItem('examQuestions');
        if (savedQuestions) {
            questions = JSON.parse(savedQuestions);
        } else {
            // Initialize with sample questions
            questions = [];
            for (const subject in sampleQuestions) {
                questions = questions.concat(sampleQuestions[subject]);
            }
            localStorage.setItem('examQuestions', JSON.stringify(questions));
        }
    }
    
    // Load participant data from localStorage
    function loadParticipantData() {
        const savedData = localStorage.getItem('participantRecords');
        if (savedData) {
            return JSON.parse(savedData);
        }
        return [];
    }
    
    // Save participant data to localStorage
    function saveParticipantData(data) {
        const allData = loadParticipantData();
        allData.push(data);
        localStorage.setItem('participantRecords', JSON.stringify(allData));
    }
    
    // Play audio
    function playAudio(audioId) {
        const audio = document.getElementById(audioId);
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    }
    
    // Show notification
    function showNotification(message, duration = 3000) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, duration);
    }
    
    // Show warning notification
    function showWarningNotification(show) {
        const warning = document.getElementById('warning-notification');
        warning.style.display = show ? 'block' : 'none';
    }
    
    // Change screen with animation
    function changeScreen(newIndex) {
        if (newIndex < 0 || newIndex >= screens.length) return;
        
        // Animate out current screen
        screens[currentScreen].style.animation = 'slideOutLeft 0.5s ease forwards';
        
        setTimeout(() => {
            screens[currentScreen].classList.remove('active');
            screens[currentScreen].style.animation = '';
            
            // Animate in new screen
            screens[newIndex].classList.add('active');
            screens[newIndex].style.animation = 'slideInRight 0.5s ease forwards';
            
            currentScreen = newIndex;
            
            // Special actions for certain screens
            if (newIndex === 0) {
                // Opening screen - play audio
                playAudio('opening-audio');
            } else if (newIndex === 4) {
                // Exam screen - start timer
                startTimer();
                loadQuestion(currentQuestion);
            } else if (newIndex === 5) {
                // Results screen - show results
                showResults();
                playAudio('applause-audio');
            }
        }, 500);
    }
    
    // Start exam timer
    function startTimer() {
        // Convert minutes to seconds
        const savedTimer = localStorage.getItem('examTimer');
        timeLeft = savedTimer ? parseInt(savedTimer) * 60 : 120 * 60;
        
        updateTimerDisplay();
        
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                finishExam();
            } else if (timeLeft === 10 * 60) {
                // 10 minutes left - show warning
                showWarningNotification(true);
                document.getElementById('exam-timer').classList.add('warning');
            } else if (timeLeft === 1 * 60) {
                // 1 minute left - hide warning
                showWarningNotification(false);
            }
        }, 1000);
    }
    
    // Update timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('exam-timer').textContent = 
            `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        // Update progress bar
        const totalTime = localStorage.getItem('examTimer') ? parseInt(localStorage.getItem('examTimer')) * 60 : 120 * 60;
        const progressPercent = ((totalTime - timeLeft) / totalTime) * 100;
        document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    }
    
    // Load question
    function loadQuestion(index) {
        if (index < 0 || index >= questions.length) return;
        
        currentQuestion = index;
        const question = questions[index];
        
        document.getElementById('question-text').textContent = `${index + 1}. ${question.question}`;
        
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        for (const [key, value] of Object.entries(question.options)) {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.textContent = `${key}. ${value}`;
            optionBtn.dataset.option = key;
            
            // Check if this option was previously selected
            if (selectedOptions[index] === key) {
                optionBtn.classList.add('selected');
                if (question.correctAnswer === key) {
                    optionBtn.classList.add('correct');
                } else {
                    optionBtn.classList.add('wrong');
                }
                
                // Show feedback
                showFeedback(question.correctAnswer, key, question.explanation);
            }
            
            optionBtn.addEventListener('click', () => selectOption(key));
            optionsContainer.appendChild(optionBtn);
        }
        
        // Update progress text
        document.getElementById('progress-text').textContent = `${index + 1}/${questions.length}`;
        
        // Hide feedback for new question
        document.getElementById('answer-feedback').style.display = 'none';
    }
    
    // Select option
    function selectOption(option) {
        // Check if already answered
        if (selectedOptions[currentQuestion] !== undefined) return;
        
        const question = questions[currentQuestion];
        const isCorrect = option === question.correctAnswer;
        
        // Mark as selected
        selectedOptions[currentQuestion] = option;
        
        // Update counters
        if (isCorrect) {
            correctAnswers++;
            playAudio('correct-audio');
        } else {
            wrongAnswers++;
            playAudio('wrong-audio');
        }
        
        // Update UI
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            if (btn.dataset.option === option) {
                btn.classList.add('selected');
                btn.classList.add(isCorrect ? 'correct' : 'wrong');
            }
            
            // Disable all buttons after selection
            btn.disabled = true;
        });
        
        // Show feedback
        showFeedback(question.correctAnswer, option, question.explanation);
    }
    
    // Show feedback
    function showFeedback(correctAnswer, selectedAnswer, explanation) {
        const feedbackDiv = document.getElementById('answer-feedback');
        feedbackDiv.style.display = 'block';
        
        if (correctAnswer === selectedAnswer) {
            feedbackDiv.innerHTML = `
                <p class="feedback-correct"><i class="fas fa-check-circle"></i> Jawaban Anda benar!</p>
                <p>${explanation}</p>
            `;
        } else {
            feedbackDiv.innerHTML = `
                <p class="feedback-wrong"><i class="fas fa-times-circle"></i> Jawaban Anda salah.</p>
                <p>Jawaban yang benar adalah <strong>${correctAnswer}</strong>.</p>
                <p>${explanation}</p>
            `;
        }
    }
    
    // Skip question
    function skipQuestion() {
        if (currentQuestion < questions.length - 1) {
            loadQuestion(currentQuestion + 1);
        } else {
            // If last question, go to first
            loadQuestion(0);
        }
    }
    
    // Show unanswered questions
    function showUnanswered() {
        const unanswered = [];
        for (let i = 0; i < questions.length; i++) {
            if (selectedOptions[i] === undefined) {
                unanswered.push(i);
            }
        }
        
        if (unanswered.length > 0) {
            // Go to first unanswered question
            loadQuestion(unanswered[0]);
        } else {
            showNotification('Semua soal telah dijawab');
        }
    }
    
    // Finish exam
    function finishExam() {
        clearInterval(timer);
        
        // Calculate unanswered questions
        const totalQuestions = questions.length;
        const unanswered = totalQuestions - correctAnswers - wrongAnswers;
        
        // Update participant data
        participantData.examResult = {
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            unanswered,
            score: Math.round((correctAnswers / totalQuestions) * 100)
        };
        participantData.completionDate = new Date().toLocaleString();
        
        // Save to records
        saveParticipantData(participantData);
        
        // Go to results screen
        changeScreen(5);
    }
    
    // Show results
    function showResults() {
        const result = participantData.examResult;
        
        document.getElementById('total-questions').textContent = result.totalQuestions;
        document.getElementById('correct-answers').textContent = result.correctAnswers;
        document.getElementById('wrong-answers').textContent = result.wrongAnswers;
        document.getElementById('exam-score').textContent = result.score;
        
        // Generate certificate
        generateCertificate();
    }
    
    // Generate certificate
    function generateCertificate() {
        const result = participantData.examResult;
        const certDiv = document.getElementById('certificate-preview');
        
        // Generate certificate code
        const date = new Date();
        const dateStr = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`;
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + 
                          '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
        
        const certCode = `${participantData.fullname.toUpperCase().replace(/ /g, '')}/` +
                        `${participantData.status.toUpperCase()}/` +
                        `${participantData.level ? participantData.level.toUpperCase() : 'UMUM'}/` +
                        `${examData.subject ? examData.subject.toUpperCase() : examData.examType.toUpperCase()}/` +
                        `${dateStr}/` +
                        `${randomCode}/` +
                        `PERGUNU-STB`;
        
        // Get motivational message based on score
        let motivation;
        if (result.score >= 90) {
            motivation = motivationalMessages.perfect;
        } else if (result.score >= 75) {
            motivation = motivationalMessages.excellent;
        } else if (result.score >= 60) {
            motivation = motivationalMessages.good;
        } else if (result.score >= 40) {
            motivation = motivationalMessages.average;
        } else {
            motivation = motivationalMessages.poor;
        }
        
        // Get chairman name from localStorage or use default
        const chairmanName = localStorage.getItem('chairmanName') || "Moh. Nuril Hudha, S.Pd., M.Si.";
        
        certDiv.innerHTML = `
            <div class="certificate-content">
                <h2 class="certificate-title">SERTIFIKAT PRESTASI</h2>
                <p>Diberikan Kepada</p>
                <h3 class="certificate-recipient">${participantData.fullname}</h3>
                <p class="certificate-text">Atas Partisipasi & Pencapaian Luar Biasa dalam <strong>${examData.subject ? examData.subject : examData.examType}</strong></p>
                <p class="certificate-text">Sebagai penghargaan atas dedikasi dalam memahami materi ujian dan mengasah logika, sertifikat ini diberikan sebagai motivasi untuk terus berkembang.</p>
                <div class="certificate-score">Nilai: ${result.score}</div>
                <p class="certificate-motivation">${motivation}</p>
                <div class="certificate-footer">
                    <div class="certificate-date">
                        <p>Ditetapkan di: Situbondo</p>
                        <p>${date.toLocaleDateString()}</p>
                    </div>
                    <div class="certificate-signature">
                        <p>Ketua Pergunu Situbondo</p>
                        <p>${chairmanName}</p>
                    </div>
                </div>
                <div class="certificate-barcode"></div>
                <p style="font-size: 0.8rem; margin-top: 10px;">Kode Sertifikat: ${certCode}</p>
            </div>
        `;
    }
    
    // Print certificate
    function printCertificate() {
        const certDiv = document.getElementById('certificate-preview');
        
        // Hide floating buttons during print
        document.querySelector('.floating-buttons').style.display = 'none';
        
        // Use html2canvas to capture the certificate
        html2canvas(certDiv).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF('l', 'mm', 'a4');
            
            // Add image to PDF
            pdf.addImage(imgData, 'PNG', 0, 0, 297, 210); // A4 dimensions in mm (landscape)
            
            // Save the PDF
            pdf.save(`Sertifikat_${participantData.fullname.replace(/ /g, '_')}.pdf`);
            
            // Show floating buttons again
            document.querySelector('.floating-buttons').style.display = 'flex';
        });
    }
    
    // Event Listeners
    
    // Login button
    document.getElementById('login-btn').addEventListener('click', function() {
        const loginCode = document.getElementById('login-code').value;
        const savedLoginCode = localStorage.getItem('loginCode') || defaultCodes.login;
        
        if (loginCode === savedLoginCode) {
            // Play opening audio
            playAudio('opening-audio');
            
            // Change to terms screen
            changeScreen(1);
        } else {
            showNotification('Kode login salah');
        }
    });
    
    // Terms checkbox
    document.getElementById('agree-terms').addEventListener('change', function() {
        document.getElementById('continue-btn').disabled = !this.checked;
    });
    
    // Continue to participant form
    document.getElementById('continue-btn').addEventListener('click', function() {
        changeScreen(2);
    });
    
    // Status radio buttons
    document.querySelectorAll('input[name="status"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'pelajar') {
                document.getElementById('student-fields').style.display = 'block';
                document.getElementById('general-fields').style.display = 'none';
            } else {
                document.getElementById('student-fields').style.display = 'none';
                document.getElementById('general-fields').style.display = 'block';
            }
        });
    });
    
    // Get location button
    document.getElementById('get-location').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    // In a real app, you would reverse geocode the coordinates to get an address
                    // For demo purposes, we'll just show a mock address
                    document.getElementById('address').value = "Jl. Raya Situbondo No. 123, Situbondo, Jawa Timur";
                    showNotification('Lokasi berhasil ditemukan');
                },
                error => {
                    showNotification('Gagal mendapatkan lokasi: ' + error.message);
                }
            );
        } else {
            showNotification('Geolocation tidak didukung di browser ini');
        }
    });
    
    // Participant form submit
    document.getElementById('participant-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Gather participant data
        participantData = {
            fullname: document.getElementById('fullname').value,
            status: document.querySelector('input[name="status"]:checked').value,
            level: document.getElementById('student-level') ? document.getElementById('student-level').value : null,
            purpose: document.getElementById('student-purpose') ? document.getElementById('student-purpose').value : document.getElementById('general-purpose').value,
            completionDate: null,
            examResult: null
        };
        
        if (participantData.status === 'pelajar') {
            participantData.school = document.getElementById('school-name').value;
            participantData.studentId = document.getElementById('student-id').value;
        } else {
            participantData.address = document.getElementById('address').value;
            participantData.whatsapp = document.getElementById('whatsapp').value;
            participantData.email = document.getElementById('email').value;
        }
        
        // Set exam data based on participant's status
        examData = {
            isStudent: participantData.status === 'pelajar',
            subject: participantData.status === 'pelajar' ? null : participantData.purpose,
            examType: participantData.status === 'pelajar' ? participantData.level : participantData.purpose
        };
        
        // Change to level selection screen
        changeScreen(3);
        
        // Show appropriate options based on status
        if (participantData.status === 'pelajar') {
            document.getElementById('student-level-options').style.display = 'block';
            document.getElementById('general-level-options').style.display = 'none';
            
            // Show appropriate grade options
            const level = participantData.level;
            document.getElementById('sd-options').style.display = level === 'SD' ? 'block' : 'none';
            document.getElementById('smp-options').style.display = level === 'SMP' ? 'block' : 'none';
            document.getElementById('sma-options').style.display = level === 'SMA/SMK' ? 'block' : 'none';
        } else {
            document.getElementById('student-level-options').style.display = 'none';
            document.getElementById('general-level-options').style.display = 'block';
            
            // Show CPNS license input if selected
            if (participantData.purpose === 'Ujian CPNS/P3K') {
                document.getElementById('cpns-license').style.display = 'block';
            } else {
                document.getElementById('cpns-license').style.display = 'none';
            }
        }
    });
    
    // Level selection buttons
    document.querySelectorAll('.btn-level').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selected class from all buttons
            document.querySelectorAll('.btn-level').forEach(b => b.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Enable start exam button if subject is also selected
            const subjectSelected = document.querySelector('.btn-subject.selected');
            document.getElementById('start-exam-btn').disabled = !subjectSelected;
        });
    });
    
    // Subject selection buttons
    document.querySelectorAll('.btn-subject').forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove selected class from all buttons
            document.querySelectorAll('.btn-subject').forEach(b => b.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Enable start exam button if level is also selected
            const levelSelected = document.querySelector('.btn-level.selected');
            document.getElementById('start-exam-btn').disabled = !levelSelected;
            
            // Set exam subject
            examData.subject = this.dataset.subject;
        });
    });
    
    // Verify CPNS license
    document.getElementById('verify-license').addEventListener('click', function() {
        const licenseCode = document.getElementById('license-code').value;
        const savedExamCode = localStorage.getItem('examCode') || defaultCodes.exam;
        
        if (licenseCode === savedExamCode) {
            showNotification('Kode lisensi valid');
            document.getElementById('start-exam-btn').disabled = false;
        } else {
            showNotification('Kode lisensi salah');
        }
    });
    
    // Start exam button
    document.getElementById('start-exam-btn').addEventListener('click', function() {
        // Load questions for the selected subject
        loadQuestions();
        
        // Reset exam variables
        currentQuestion = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        selectedOptions = {};
        
        // Change to exam screen
        changeScreen(4);
    });
    
    // Exam control buttons
    document.getElementById('finish-exam-btn').addEventListener('click', finishExam);
    document.getElementById('skip-question-btn').addEventListener('click', skipQuestion);
    document.getElementById('unanswered-btn').addEventListener('click', showUnanswered);
    
    // Results screen buttons
    document.getElementById('print-certificate-btn').addEventListener('click', printCertificate);
    document.getElementById('retake-exam-btn').addEventListener('click', function() {
        // Go back to level selection
        changeScreen(3);
    });
    
    // Floating buttons
    document.getElementById('share-btn').addEventListener('click', function() {
        document.getElementById('share-modal').style.display = 'block';
        
        // Load social links from localStorage
        const socialLinks = JSON.parse(localStorage.getItem('socialLinks')) || [];
        const socialLinksContainer = document.getElementById('social-links');
        socialLinksContainer.innerHTML = '';
        
        socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'social-link';
            a.innerHTML = `<i class="fab fa-${link.icon}"></i> ${link.name}`;
            socialLinksContainer.appendChild(a);
        });
        
        // Set share URL
        document.getElementById('share-url').value = window.location.href;
    });
    
    document.getElementById('whatsapp-btn').addEventListener('click', function() {
        const phone = '6285647709114';
        const message = 'Assalamualaikum mas admin, saya mau tanya sesuatu nih...';
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });
    
    document.getElementById('bank-soal-btn').addEventListener('click', function() {
        document.getElementById('bank-soal-modal').style.display = 'block';
        document.getElementById('bank-soal-login').style.display = 'block';
        document.getElementById('bank-soal-content').style.display = 'none';
    });
    
    document.getElementById('admin-panel-btn').addEventListener('click', function() {
        document.getElementById('admin-panel-modal').style.display = 'block';
        document.getElementById('admin-login').style.display = 'block';
        document.getElementById('admin-content').style.display = 'none';
    });
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Click outside modal to close
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Copy link button
    document.getElementById('copy-link-btn').addEventListener('click', function() {
        const urlInput = document.getElementById('share-url');
        urlInput.select();
        document.execCommand('copy');
        showNotification('Link berhasil disalin');
    });
    
    // Verify bank soal code
    document.getElementById('verify-bank-code').addEventListener('click', function() {
        const bankCode = document.getElementById('bank-code').value;
        const savedBankCode = localStorage.getItem('bankCode') || defaultCodes.bank;
        
        if (bankCode === savedBankCode) {
            document.getElementById('bank-soal-login').style.display = 'none';
            document.getElementById('bank-soal-content').style.display = 'block';
        } else {
            showNotification('Kode bank soal salah');
        }
    });
    
    // Tab buttons in bank soal
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remove active class from all tabs and buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Save question button
    document.getElementById('save-question-btn').addEventListener('click', function() {
        const category = document.getElementById('question-category').value;
        const questionText = document.getElementById('question-text').value;
        const options = {
            A: document.querySelector('.option[data-option="A"]').value,
            B: document.querySelector('.option[data-option="B"]').value,
            C: document.querySelector('.option[data-option="C"]').value,
            D: document.querySelector('.option[data-option="D"]').value,
            E: document.querySelector('.option[data-option="E"]').value
        };
        const correctAnswer = document.querySelector('input[name="correct-answer"]:checked').value;
        const explanation = document.getElementById('explanation').value;
        
        // Validate inputs
        if (!questionText || !options.A || !options.B || !correctAnswer) {
            showNotification('Harap isi pertanyaan, minimal 2 pilihan, dan jawaban benar');
            return;
        }
        
        // Create question object
        const question = {
            question: questionText,
            options: options,
            correctAnswer: correctAnswer,
            explanation: explanation,
            category: category
        };
        
        // Load existing questions
        const savedQuestions = localStorage.getItem('examQuestions');
        let questions = savedQuestions ? JSON.parse(savedQuestions) : [];
        
        // Add new question
        questions.push(question);
        
        // Save back to localStorage
        localStorage.setItem('examQuestions', JSON.stringify(questions));
        
        showNotification('Soal berhasil disimpan');
        
        // Reset form
        document.getElementById('question-text').value = '';
        document.querySelectorAll('.option').forEach(input => input.value = '');
        document.getElementById('explanation').value = '';
    });
    
    // Generate question with AI
    document.getElementById('generate-question-btn').addEventListener('click', function() {
        const prompt = document.getElementById('ai-prompt').value;
        const category = document.getElementById('ai-category').value;
        const apiKey = document.getElementById('ai-api-key').value;
        
        if (!prompt) {
            showNotification('Harap isi prompt untuk AI');
            return;
        }
        
        if (!apiKey) {
            showNotification('Harap masukkan API Key AI');
            return;
        }
        
        // In a real implementation, you would call an AI API here
        // This is just a mock implementation
        showNotification('Memproses permintaan AI...');
        
        // Mock AI response after delay
        setTimeout(() => {
            const aiResult = document.getElementById('ai-result');
            aiResult.innerHTML = `
                <h4>Hasil Generasi AI</h4>
                <p><strong>Pertanyaan:</strong> Apa ibukota Indonesia?</p>
                <p><strong>Pilihan:</strong></p>
                <ul>
                    <li>A. Jakarta</li>
                    <li>B. Bandung</li>
                    <li>C. Surabaya</li>
                    <li>D. Medan</li>
                </ul>
                <p><strong>Jawaban Benar:</strong> A</p>
                <p><strong>Penjelasan:</strong> Jakarta adalah ibukota Indonesia sejak tahun 1945.</p>
                <button id="use-ai-result" class="btn-grad">Gunakan Soal Ini</button>
            `;
            aiResult.style.display = 'block';
            
            // Button to use the AI generated question
            document.getElementById('use-ai-result').addEventListener('click', function() {
                // Auto-fill the manual form
                document.getElementById('question-category').value = category;
                document.getElementById('question-text').value = 'Apa ibukota Indonesia?';
                document.querySelector('.option[data-option="A"]').value = 'Jakarta';
                document.querySelector('.option[data-option="B"]').value = 'Bandung';
                document.querySelector('.option[data-option="C"]').value = 'Surabaya';
                document.querySelector('.option[data-option="D"]').value = 'Medan';
                document.querySelector('input[name="correct-answer"][value="A"]').checked = true;
                document.getElementById('explanation').value = 'Jakarta adalah ibukota Indonesia sejak tahun 1945.';
                
                // Switch to manual tab
                document.querySelector('.tab-btn[data-tab="manual-tab"]').click();
                
                showNotification('Hasil AI telah dimasukkan ke form');
            });
        }, 2000);
    });
    
    // Verify admin code
    document.getElementById('verify-admin-code').addEventListener('click', function() {
        const adminCode = document.getElementById('admin-code').value;
        const savedAdminCode = localStorage.getItem('adminCode') || defaultCodes.admin;
        
        if (adminCode === savedAdminCode) {
            document.getElementById('admin-login').style.display = 'none';
            document.getElementById('admin-content').style.display = 'block';
            
            // Load participant data
            loadParticipantTable();
        } else {
            showNotification('Kode admin salah');
        }
    });
    
    // Load participant data into table
    function loadParticipantTable() {
        const participants = loadParticipantData();
        const tableBody = document.getElementById('participant-data');
        tableBody.innerHTML = '';
        
        participants.forEach((p, i) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${i + 1}</td>
                <td>${p.fullname}</td>
                <td>${p.status}</td>
                <td>${p.level || '-'}</td>
                <td>${p.examResult ? p.examResult.score : '-'}</td>
                <td>${p.completionDate || '-'}</td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // Save login code
    document.getElementById('save-login-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-login-code').value;
        const currentCode = document.getElementById('current-login-code').value;
        
        if (!newCode) {
            showNotification('Harap masukkan kode baru');
            return;
        }
        
        localStorage.setItem('loginCode', newCode);
        document.getElementById('current-login-code').value = newCode;
        document.getElementById('new-login-code').value = '';
        
        showNotification('Kode login berhasil diperbarui');
    });
    
    // Save exam code
    document.getElementById('save-exam-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-exam-code').value;
        const currentCode = document.getElementById('current-exam-code').value;
        
        if (!newCode) {
            showNotification('Harap masukkan kode baru');
            return;
        }
        
        localStorage.setItem('examCode', newCode);
        document.getElementById('current-exam-code').value = newCode;
        document.getElementById('new-exam-code').value = '';
        
        showNotification('Kode ujian berhasil diperbarui');
    });
    
    // Save bank soal code
    document.getElementById('save-bank-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-bank-code').value;
        const currentCode = document.getElementById('current-bank-code').value;
        
        if (!newCode) {
            showNotification('Harap masukkan kode baru');
            return;
        }
        
        localStorage.setItem('bankCode', newCode);
        document.getElementById('current-bank-code').value = newCode;
        document.getElementById('new-bank-code').value = '';
        
        showNotification('Kode bank soal berhasil diperbarui');
    });
    
    // Save admin code
    document.getElementById('save-admin-code').addEventListener('click', function() {
        const newCode = document.getElementById('new-admin-code').value;
        const currentCode = document.getElementById('current-admin-code').value;
        
        if (!newCode) {
            showNotification('Harap masukkan kode baru');
            return;
        }
        
        localStorage.setItem('adminCode', newCode);
        document.getElementById('current-admin-code').value = newCode;
        document.getElementById('new-admin-code').value = '';
        
        showNotification('Kode admin berhasil diperbarui');
    });
    
    // Save timer setting
    document.getElementById('save-timer-btn').addEventListener('click', function() {
        const timerValue = document.getElementById('exam-timer-setting').value;
        
        if (!timerValue || timerValue < 5 || timerValue > 300) {
            showNotification('Harap masukkan waktu antara 5-300 menit');
            return;
        }
        
        localStorage.setItem('examTimer', timerValue);
        showNotification('Pengaturan timer berhasil disimpan');
    });
    
    // Save question count
    document.getElementById('save-question-count').addEventListener('click', function() {
        const count = document.getElementById('question-count').value;
        
        if (!count || count < 5 || count > 150 || count % 5 !== 0) {
            showNotification('Harap masukkan jumlah soal kelipatan 5 (5-150)');
            return;
        }
        
        localStorage.setItem('questionCount', count);
        showNotification('Pengaturan jumlah soal berhasil disimpan');
    });
    
    // Save points setting
    document.getElementById('save-points-btn').addEventListener('click', function() {
        const points = document.getElementById('point-setting').value;
        
        if (!points || points < 1 || points > 10) {
            showNotification('Harap masukkan poin antara 1-10');
            return;
        }
        
        localStorage.setItem('pointsPerQuestion', points);
        showNotification('Pengaturan poin berhasil disimpan');
    });
    
    // Randomize questions
    document.getElementById('randomize-questions').addEventListener('click', function() {
        const questions = JSON.parse(localStorage.getItem('examQuestions')) || [];
        
        // Shuffle array
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        
        localStorage.setItem('examQuestions', JSON.stringify(questions));
        showNotification('Urutan soal berhasil diacak');
    });
    
    // Save greeting text
    document.getElementById('save-greeting-text').addEventListener('click', function() {
        const text = document.getElementById('greeting-text-editor').value;
        
        if (!text) {
            showNotification('Harap masukkan teks pembuka');
            return;
        }
        
        localStorage.setItem('greetingText', text);
        document.getElementById('greeting-text').textContent = text;
        showNotification('Teks pembuka berhasil disimpan');
    });
    
    // Save periodic info
    document.getElementById('save-periodic-info').addEventListener('click', function() {
        const text = document.getElementById('periodic-info-editor').value;
        localStorage.setItem('periodicInfo', text);
        document.getElementById('periodic-info').textContent = text;
        showNotification('Informasi berkala berhasil disimpan');
    });
    
    // Save chairman name
    document.getElementById('save-chairman-name').addEventListener('click', function() {
        const name = document.getElementById('chairman-name').value;
        
        if (!name) {
            showNotification('Harap masukkan nama ketua');
            return;
        }
        
        localStorage.setItem('chairmanName', name);
        showNotification('Nama ketua berhasil disimpan');
    });
    
    // Save motivation text
    document.getElementById('save-motivation-text').addEventListener('click', function() {
        const text = document.getElementById('motivation-text-editor').value;
        
        if (!text) {
            showNotification('Harap masukkan teks motivasi');
            return;
        }
        
        localStorage.setItem('motivationText', text);
        showNotification('Teks motivasi berhasil disimpan');
    });
    
    // Export data
    document.getElementById('export-data-btn').addEventListener('click', function() {
        const format = document.getElementById('export-format').value;
        const participants = loadParticipantData();
        
        if (participants.length === 0) {
            showNotification('Tidak ada data peserta untuk diexport');
            return;
        }
        
        // Prepare data
        const data = participants.map(p => ({
            'Nama': p.fullname,
            'Status': p.status,
            'Tingkat': p.level || '-',
            'Tujuan': p.purpose,
            'Nilai': p.examResult ? p.examResult.score : '-',
            'Tanggal': p.completionDate || '-'
        }));
        
        if (format === 'excel' || format === 'csv') {
            // Create worksheet
            const ws = XLSX.utils.json_to_sheet(data);
            
            // Create workbook
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Peserta");
            
            // Export to file
            XLSX.writeFile(wb, `Data_Peserta_Ujian.${format}`);
        } else if (format === 'pdf') {
            // In a real implementation, you would use a PDF library
            showNotification('Export PDF akan diimplementasikan');
        } else if (format === 'word') {
            // In a real implementation, you would use a Word library
            showNotification('Export Word akan diimplementasikan');
        }
    });
    
    // Load saved settings on startup
    function loadSettings() {
        // Greeting text
        const greetingText = localStorage.getItem('greetingText');
        if (greetingText) {
            document.getElementById('greeting-text').textContent = greetingText;
            document.getElementById('greeting-text-editor').value = greetingText;
        }
        
        // Periodic info
        const periodicInfo = localStorage.getItem('periodicInfo');
        if (periodicInfo) {
            document.getElementById('periodic-info').textContent = periodicInfo;
            document.getElementById('periodic-info-editor').value = periodicInfo;
        }
        
        // Chairman name
        const chairmanName = localStorage.getItem('chairmanName');
        if (chairmanName) {
            document.getElementById('chairman-name').value = chairmanName;
        }
        
        // Motivation text
        const motivationText = localStorage.getItem('motivationText');
        if (motivationText) {
            document.getElementById('motivation-text-editor').value = motivationText;
        }
        
        // Exam timer
        const examTimer = localStorage.getItem('examTimer');
        if (examTimer) {
            document.getElementById('exam-timer-setting').value = examTimer;
        }
        
        // Question count
        const questionCount = localStorage.getItem('questionCount');
        if (questionCount) {
            document.getElementById('question-count').value = questionCount;
        }
        
        // Points per question
        const pointsPerQuestion = localStorage.getItem('pointsPerQuestion');
        if (pointsPerQuestion) {
            document.getElementById('point-setting').value = pointsPerQuestion;
        }
    }
    
    // Initialize the app
    loadSettings();
    loadQuestions();
    
    // Show opening screen
    changeScreen(0);
});