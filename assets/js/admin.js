// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi partikel background
    particlesJS.load('particles-js', 'assets/js/particles-config.json', function() {
        console.log('Particles.js loaded');
    });
    
    // Main App Logic
    initApp();
});

function initApp() {
    // Main Variables
    const screens = {
        welcome: document.getElementById('welcome-screen'),
        terms: document.getElementById('terms-screen'),
        participantForm: document.getElementById('participant-form-screen'),
        examLevel: document.getElementById('exam-level-screen'),
        subject: document.getElementById('subject-screen'),
        exam: document.getElementById('exam-screen'),
        results: document.getElementById('results-screen')
    };
    
    const buttons = {
        enter: document.getElementById('enter-btn'),
        continue: document.getElementById('continue-btn'),
        saveParticipant: document.getElementById('save-participant-btn'),
        startExam: document.getElementById('start-exam-btn'),
        finishExam: document.getElementById('finish-exam-btn'),
        skipQuestion: document.getElementById('skip-question-btn'),
        unanswered: document.getElementById('unanswered-btn'),
        printCertificate: document.getElementById('print-certificate-btn'),
        retryExam: document.getElementById('retry-exam-btn'),
        share: document.querySelector('.share-btn'),
        whatsapp: document.querySelector('.whatsapp-btn'),
        admin: document.querySelector('.admin-btn'),
        questionBank: document.querySelector('.question-bank-btn'),
        verifyCpnsCode: document.getElementById('verify-cpns-code')
    };
    
    const inputs = {
        examCode: document.getElementById('exam-code'),
        agreeTerms: document.getElementById('agree-terms'),
        fullname: document.getElementById('fullname'),
        student: document.getElementById('student'),
        general: document.getElementById('general'),
        school: document.getElementById('school'),
        nis: document.getElementById('nis'),
        studentPurpose: document.getElementById('student-purpose'),
        schoolLevel: document.querySelectorAll('input[name="school-level"]'),
        address: document.getElementById('address'),
        whatsapp: document.getElementById('whatsapp'),
        email: document.getElementById('email'),
        generalPurpose: document.getElementById('general-purpose'),
        cpnsCode: document.getElementById('cpns-code')
    };
    
    const modals = {
        share: document.getElementById('share-modal'),
        admin: document.getElementById('admin-modal'),
        questionBank: document.getElementById('question-bank-modal')
    };
    
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Default codes
    const defaultCodes = {
        login: '12345',
        cpns: 'OPENLOCK-1945',
        questionBank: 'OPENLOCK-1926',
        admin: '65614222'
    };
    
    // Participant data
    let participantData = {
        name: '',
        status: 'pelajar',
        school: '',
        nis: '',
        studentPurpose: '',
        schoolLevel: 'SMA/SMK',
        address: '',
        whatsapp: '',
        email: '',
        generalPurpose: '',
        examLevel: '',
        subject: '',
        answers: [],
        score: 0,
        timestamp: ''
    };
    
    // Exam data
    let examData = {
        questions: [],
        currentQuestion: 0,
        timer: null,
        timeLeft: 120 * 60, // 120 minutes in seconds
        unansweredQuestions: []
    };
    
    // Audio elements
    const audioElements = {
        opening: document.getElementById('opening-audio'),
        correct: document.getElementById('correct-audio'),
        wrong: document.getElementById('wrong-audio'),
        applause: document.getElementById('applause-audio'),
        button: document.getElementById('button-audio')
    };
    
    // Play opening audio once
    audioElements.opening.play().catch(e => console.log('Audio play prevented:', e));
    
    // Event Listeners
    buttons.enter.addEventListener('click', validateExamCode);
    inputs.examCode.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') validateExamCode();
    });
    
    inputs.agreeTerms.addEventListener('change', function() {
        buttons.continue.disabled = !this.checked;
    });
    
    buttons.continue.addEventListener('click', function() {
        navigateToScreen(screens.welcome, screens.participantForm);
    });
    
    // Status radio buttons
    inputs.student.addEventListener('change', updateStatusFields);
    inputs.general.addEventListener('change', updateStatusFields);
    
    // School level radio buttons
    inputs.schoolLevel.forEach(radio => {
        radio.addEventListener('change', function() {
            participantData.schoolLevel = this.value;
        });
    });
    
    // GPS button
    document.getElementById('gps-btn').addEventListener('click', getLocation);
    
    // Form submission
    document.getElementById('participant-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveParticipantData();
    });
    
    // Level buttons
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectExamLevel(this);
        });
    });
    
    // CPNS code verification
    buttons.verifyCpnsCode.addEventListener('click', verifyCpnsCode);
    
    // Subject buttons
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectSubject(this);
        });
    });
    
    // Start exam button
    buttons.startExam.addEventListener('click', startExam);
    
    // Exam navigation buttons
    buttons.finishExam.addEventListener('click', finishExam);
    buttons.skipQuestion.addEventListener('click', skipQuestion);
    buttons.unanswered.addEventListener('click', showUnanswered);
    
    // Results buttons
    buttons.printCertificate.addEventListener('click', printCertificate);
    buttons.retryExam.addEventListener('click', retryExam);
    
    // Floating buttons
    buttons.share.addEventListener('click', () => toggleModal(modals.share));
    buttons.whatsapp.addEventListener('click', contactAdmin);
    buttons.admin.addEventListener('click', () => toggleModal(modals.admin));
    buttons.questionBank.addEventListener('click', () => toggleModal(modals.questionBank));
    
    // Close modal buttons
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Modal background click
    modals.share.addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('active');
    });
    
    modals.admin.addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('active');
    });
    
    modals.questionBank.addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('active');
    });
    
    // Social share buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            shareOnSocial(this.classList[1]);
        });
    });
    
    // Functions
    function validateExamCode() {
        playButtonSound();
        
        if (inputs.examCode.value === defaultCodes.login) {
            navigateToScreen(screens.welcome, screens.terms);
        } else {
            alert('Kode ujian tidak valid. Silakan coba lagi.');
            inputs.examCode.focus();
        }
    }
    
    function navigateToScreen(fromScreen, toScreen) {
        playButtonSound();
        
        fromScreen.classList.remove('active');
        fromScreen.classList.add('fade-out');
        
        setTimeout(() => {
            fromScreen.classList.remove('fade-out');
            toScreen.classList.add('active');
            toScreen.classList.add('fade-in');
            
            setTimeout(() => {
                toScreen.classList.remove('fade-in');
            }, 500);
        }, 300);
    }
    
    function updateStatusFields() {
        playButtonSound();
        
        const studentFields = document.getElementById('student-fields');
        const generalFields = document.getElementById('general-fields');
        const studentLevels = document.getElementById('student-levels');
        const generalLevels = document.getElementById('general-levels');
        
        if (inputs.student.checked) {
            participantData.status = 'pelajar';
            studentFields.style.display = 'block';
            generalFields.style.display = 'none';
            studentLevels.style.display = 'block';
            generalLevels.style.display = 'none';
        } else {
            participantData.status = 'umum';
            studentFields.style.display = 'none';
            generalFields.style.display = 'block';
            studentLevels.style.display = 'none';
            generalLevels.style.display = 'block';
        }
    }
    
    function getLocation() {
        playButtonSound();
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    // In a real app, you would use a reverse geocoding API
                    // For demo purposes, we'll just show coordinates
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // Simulate getting address from coordinates
                    setTimeout(() => {
                        inputs.address.value = `Alamat terdeteksi (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
                    }, 1000);
                },
                error => {
                    alert('Tidak dapat mengakses lokasi: ' + error.message);
                }
            );
        } else {
            alert('Geolocation tidak didukung oleh browser Anda.');
        }
    }
    
    function saveParticipantData() {
        playButtonSound();
        
        // Validate required fields
        if (!inputs.fullname.value.trim()) {
            alert('Nama lengkap wajib diisi');
            return;
        }
        
        participantData.name = inputs.fullname.value.trim();
        
        if (inputs.student.checked) {
            if (!inputs.school.value.trim()) {
                alert('Nama sekolah wajib diisi');
                return;
            }
            
            if (!inputs.nis.value.trim()) {
                alert('NIS wajib diisi');
                return;
            }
            
            participantData.school = inputs.school.value.trim();
            participantData.nis = inputs.nis.value.trim();
            participantData.studentPurpose = inputs.studentPurpose.value;
        } else {
            if (!inputs.address.value.trim()) {
                alert('Alamat wajib diisi');
                return;
            }
            
            if (!inputs.whatsapp.value.trim()) {
                alert('Nomor WhatsApp wajib diisi');
                return;
            }
            
            if (!inputs.email.value.trim()) {
                alert('Email wajib diisi');
                return;
            }
            
            if (!inputs.email.value.match(/@(gmail|yahoo|hotmail)\.com$/)) {
                alert('Email harus menggunakan domain @gmail.com, @yahoo.com, atau @hotmail.com');
                return;
            }
            
            participantData.address = inputs.address.value.trim();
            participantData.whatsapp = inputs.whatsapp.value.trim();
            participantData.email = inputs.email.value.trim();
            participantData.generalPurpose = inputs.generalPurpose.value;
        }
        
        // Save to localStorage (simulated)
        localStorage.setItem('participantData', JSON.stringify(participantData));
        
        navigateToScreen(screens.participantForm, screens.examLevel);
    }
    
    function selectExamLevel(button) {
        playButtonSound();
        
        if (button.dataset.exam === 'cpns-test') {
            document.getElementById('cpns-code-container').style.display = 'block';
            buttons.startExam.disabled = true;
        } else {
            document.getElementById('cpns-code-container').style.display = 'none';
            buttons.startExam.disabled = false;
            
            if (button.dataset.grade) {
                participantData.examLevel = `Kelas ${button.dataset.grade}`;
            } else {
                participantData.examLevel = button.textContent;
            }
        }
        
        // Highlight selected button
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        button.classList.add('selected');
    }
    
    function verifyCpnsCode() {
        playButtonSound();
        
        if (inputs.cpnsCode.value === defaultCodes.cpns) {
            participantData.examLevel = 'Ujian CPNS/P3K';
            document.getElementById('cpns-code-container').style.display = 'none';
            buttons.startExam.disabled = false;
        } else {
            alert('Kode lisensi tidak valid. Silakan coba lagi.');
            inputs.cpnsCode.focus();
        }
    }
    
    function selectSubject(button) {
        playButtonSound();
        
        participantData.subject = button.textContent;
        
        // Highlight selected button
        document.querySelectorAll('.subject-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        button.classList.add('selected');
        
        buttons.startExam.disabled = false;
    }
    
    function startExam() {
        playButtonSound();
        
        // Load questions based on participant's selection
        loadQuestions().then(() => {
            navigateToScreen(screens.subject, screens.exam);
            startTimer();
            displayQuestion();
        });
    }
    
    function loadQuestions() {
        return new Promise((resolve) => {
            // In a real app, you would fetch questions from a server
            // For demo purposes, we'll use sample questions
            
            examData.questions = [
                {
                    id: 1,
                    text: "Ini adalah contoh pertanyaan untuk mata ujian " + participantData.subject,
                    options: [
                        { id: 'A', text: "Pilihan jawaban A" },
                        { id: 'B', text: "Pilihan jawaban B" },
                        { id: 'C', text: "Pilihan jawaban C (benar)" },
                        { id: 'D', text: "Pilihan jawaban D" },
                        { id: 'E', text: "Pilihan jawaban E" }
                    ],
                    correctAnswer: 'C',
                    explanation: "Ini adalah penjelasan mengapa jawaban C adalah yang benar."
                },
                // Add more sample questions as needed
            ];
            
            document.getElementById('total-questions').textContent = examData.questions.length;
            resolve();
        });
    }
    
    function startTimer() {
        // Convert minutes to seconds
        examData.timeLeft = 120 * 60;
        
        examData.timer = setInterval(() => {
            examData.timeLeft--;
            
            const minutes = Math.floor(examData.timeLeft / 60);
            const seconds = examData.timeLeft % 60;
            
            document.getElementById('timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Show warning when 10 minutes left
            if (examData.timeLeft === 10 * 60) {
                showTimeWarning(10);
            }
            
            // Hide warning when 1 minute left
            if (examData.timeLeft === 1 * 60) {
                document.getElementById('time-warning').style.display = 'none';
            }
            
            // Auto submit when time is up
            if (examData.timeLeft <= 0) {
                clearInterval(examData.timer);
                finishExam();
            }
        }, 1000);
    }
    
    function showTimeWarning(minutes) {
        document.getElementById('remaining-minutes').textContent = minutes;
        document.getElementById('time-warning').style.display = 'block';
        
        // Make timer bigger
        document.getElementById('timer').style.fontSize = '2rem';
        document.getElementById('timer').style.color = 'var(--danger-color)';
    }
    
    function displayQuestion() {
        const currentQuestion = examData.questions[examData.currentQuestion];
        document.getElementById('question-text').textContent = currentQuestion.text;
        document.getElementById('current-question').textContent = examData.currentQuestion + 1;
        
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        currentQuestion.options.forEach(option => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.innerHTML = `
                <span class="option-label">${option.id}</span>
                ${option.text}
            `;
            
            optionBtn.addEventListener('click', () => selectAnswer(option.id));
            optionsContainer.appendChild(optionBtn);
        });
        
        // Hide explanation for new question
        document.getElementById('explanation-container').style.display = 'none';
    }
    
    function selectAnswer(selectedOption) {
        playButtonSound();
        
        const currentQuestion = examData.questions[examData.currentQuestion];
        const options = document.querySelectorAll('.option-btn');
        
        // Disable all options
        options.forEach(option => {
            option.disabled = true;
        });
        
        // Mark selected option
        const selectedBtn = Array.from(options).find(btn => 
            btn.querySelector('.option-label').textContent === selectedOption);
        
        selectedBtn.classList.add('selected');
        
        // Check if answer is correct
        if (selectedOption === currentQuestion.correctAnswer) {
            selectedBtn.classList.add('correct');
            audioElements.correct.play().catch(e => console.log('Audio play prevented:', e));
            
            // Record correct answer
            examData.questions[examData.currentQuestion].userAnswer = {
                option: selectedOption,
                isCorrect: true
            };
        } else {
            selectedBtn.classList.add('wrong');
            audioElements.wrong.play().catch(e => console.log('Audio play prevented:', e));
            
            // Highlight correct answer
            const correctBtn = Array.from(options).find(btn => 
                btn.querySelector('.option-label').textContent === currentQuestion.correctAnswer);
            correctBtn.classList.add('correct');
            
            // Record wrong answer
            examData.questions[examData.currentQuestion].userAnswer = {
                option: selectedOption,
                isCorrect: false
            };
        }
        
        // Show explanation
        document.getElementById('explanation-text').textContent = currentQuestion.explanation;
        document.getElementById('explanation-container').style.display = 'block';
        
        // Record if question was unanswered
        if (!examData.unansweredQuestions.includes(examData.currentQuestion)) {
            examData.unansweredQuestions.push(examData.currentQuestion);
        }
    }
    
    function skipQuestion() {
        playButtonSound();
        
        // Record as unanswered if not already answered
        if (!examData.questions[examData.currentQuestion].userAnswer && 
            !examData.unansweredQuestions.includes(examData.currentQuestion)) {
            examData.unansweredQuestions.push(examData.currentQuestion);
        }
        
        // Move to next question
        examData.currentQuestion++;
        
        if (examData.currentQuestion >= examData.questions.length) {
            examData.currentQuestion = 0;
        }
        
        displayQuestion();
    }
    
    function showUnanswered() {
        playButtonSound();
        
        if (examData.unansweredQuestions.length > 0) {
            examData.currentQuestion = examData.unansweredQuestions[0];
            examData.unansweredQuestions.shift();
            displayQuestion();
        } else {
            alert('Tidak ada soal yang belum dijawab.');
        }
    }
    
    function finishExam() {
        playButtonSound();
        
        clearInterval(examData.timer);
        
        // Calculate score
        let correctAnswers = 0;
        examData.questions.forEach(question => {
            if (question.userAnswer && question.userAnswer.isCorrect) {
                correctAnswers++;
            }
        });
        
        const score = Math.round((correctAnswers / examData.questions.length) * 100);
        
        // Save results
        participantData.score = score;
        participantData.timestamp = new Date().toISOString();
        
        // Save to localStorage (simulated)
        localStorage.setItem('participantData', JSON.stringify(participantData));
        
        // Display results
        displayResults(correctAnswers, examData.questions.length - correctAnswers, examData.questions.length);
        
        navigateToScreen(screens.exam, screens.results);
    }
    
    function displayResults(correct, wrong, total) {
        document.getElementById('correct-answers').textContent = correct;
        document.getElementById('wrong-answers').textContent = wrong;
        document.getElementById('total-questions-result').textContent = total;
        document.getElementById('final-score').textContent = participantData.score;
        document.getElementById('score-percentage').textContent = participantData.score;
        
        // Animate score circle
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.style.setProperty('--percentage', `${participantData.score}%`);
        
        // Play applause sound
        audioElements.applause.play().catch(e => console.log('Audio play prevented:', e));
        
        // Generate certificate
        generateCertificate();
    }
    
    function generateCertificate() {
        const canvas = document.getElementById('certificate-canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = 1000;
        canvas.height = 700;
        
        // Load certificate image
        const img = new Image();
        img.src = 'assets/images/certificate.png';
        
        img.onload = function() {
            // Draw certificate background
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Add text to certificate
            ctx.font = 'bold 40px "Times New Roman", serif';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.fillText('SERTIFIKAT PRESTASI', canvas.width / 2, 120);
            
            ctx.font = '24px "Times New Roman", serif';
            ctx.fillText('Diberikan Kepada', canvas.width / 2, 170);
            
            ctx.font = 'bold 36px "Times New Roman", serif';
            ctx.fillText(participantData.name, canvas.width / 2, 220);
            
            ctx.font = '20px "Times New Roman", serif';
            ctx.fillText('Atas Partisipasi & Pencapaian Luar Biasa dalam', canvas.width / 2, 260);
            
            ctx.font = 'bold 22px "Times New Roman", serif';
            ctx.fillText(`Ujian ${participantData.subject} PERGUNU Situbondo`, canvas.width / 2, 290);
            
            ctx.font = '18px "Times New Roman", serif';
            const motivationText = getMotivationText(participantData.score);
            drawMultilineText(ctx, motivationText, canvas.width / 2, 340, 500, 24);
            
            ctx.font = 'bold 28px "Times New Roman", serif';
            ctx.fillText(`Nilai: ${participantData.score}`, canvas.width / 2, 420);
            
            ctx.font = '16px "Times New Roman", serif';
            const date = new Date(participantData.timestamp);
            ctx.fillText(`Ditetapkan di: Situbondo, ${formatDate(date)}`, canvas.width / 2, 580);
            
            ctx.font = 'bold 20px "Times New Roman", serif';
            ctx.fillText('Ketua PERGUNU Situbondo', canvas.width / 2, 630);
            
            // Load and draw barcode
            const barcodeImg = new Image();
            barcodeImg.src = 'assets/images/BARCODE.png';
            
            barcodeImg.onload = function() {
                ctx.drawImage(barcodeImg, canvas.width / 2 - 50, 450, 100, 50);
            };
        };
    }
    
    function drawMultilineText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let testLine = '';
        let lineCount = 0;
        
        for (let i = 0; i < words.length; i++) {
            testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            
            if (testWidth > maxWidth && i > 0) {
                ctx.fillText(line, x, y);
                line = words[i] + ' ';
                y += lineHeight;
                lineCount++;
            } else {
                line = testLine;
            }
        }
        
        ctx.fillText(line, x, y);
    }
    
    function getMotivationText(score) {
        if (score >= 90) {
            return "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.";
        } else if (score >= 80) {
            return "Hasil yang sangat baik! Anda telah menunjukkan pemahaman yang mendalam tentang materi ujian.";
        } else if (score >= 70) {
            return "Kerja bagus! Anda memiliki pemahaman yang baik tentang materi, masih ada ruang untuk peningkatan.";
        } else if (score >= 60) {
            return "Anda telah menyelesaikan ujian dengan baik. Teruslah belajar untuk meningkatkan pemahaman.";
        } else {
            return "Jangan menyerah! Setiap tantangan adalah kesempatan untuk belajar dan berkembang.";
        }
    }
    
    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    }
    
    function printCertificate() {
        playButtonSound();
        
        const canvas = document.getElementById('certificate-canvas');
        const dataUrl = canvas.toDataURL('image/png');
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Cetak Sertifikat</title>
                <style>
                    body { margin: 0; padding: 0; }
                    img { width: 100%; height: auto; }
                </style>
            </head>
            <body>
                <img src="${dataUrl}" alt="Sertifikat">
                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                            window.close();
                        }, 500);
                    };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }
    
    function retryExam() {
        playButtonSound();
        
        // Reset exam data
        examData = {
            questions: [],
            currentQuestion: 0,
            timer: null,
            timeLeft: 120 * 60,
            unansweredQuestions: []
        };
        
        navigateToScreen(screens.results, screens.subject);
    }
    
    function toggleModal(modal) {
        playButtonSound();
        modal.classList.toggle('active');
    }
    
    function contactAdmin() {
        playButtonSound();
        
        const message = "Assalamualaikum mas admin, saya mau tanya sesuatu nih...";
        const url = `https://wa.me/6285647709114?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }
    
    function shareOnSocial(platform) {
        playButtonSound();
        
        const url = window.location.href;
        const text = `Saya baru saja menyelesaikan ujian ${participantData.subject} di PERGUNU Situbondo dengan nilai ${participantData.score}!`;
        
        let shareUrl = '';
        
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'copy-link':
                navigator.clipboard.writeText(url + '\n' + text)
                    .then(() => alert('Tautan berhasil disalin'))
                    .catch(() => alert('Gagal menyalin tautan'));
                return;
        }
        
        window.open(shareUrl, '_blank');
    }
    
    function playButtonSound() {
        audioElements.button.currentTime = 0;
        audioElements.button.play().catch(e => console.log('Audio play prevented:', e));
    }
}
