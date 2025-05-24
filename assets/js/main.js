// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Play opening audio
    const openingAudio = document.getElementById('opening-audio');
    openingAudio.volume = 0.5;
    openingAudio.play().catch(e => console.log("Autoplay prevented:", e));

    // Button click sound
    const buttonAudio = document.getElementById('button-audio');
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            buttonAudio.currentTime = 0;
            buttonAudio.play().catch(e => console.log("Audio play prevented:", e));
        });
    });

    // Screen navigation
    const screens = document.querySelectorAll('.screen');
    let currentScreen = 0;

    function showScreen(index) {
        screens.forEach((screen, i) => {
            if (i === index) {
                screen.classList.add('active');
                screen.style.animation = 'slideIn 0.5s ease';
            } else {
                screen.classList.remove('active');
            }
        });
        currentScreen = index;
    }

    // Login functionality
    const loginBtn = document.getElementById('login-btn');
    const loginCode = document.getElementById('login-code');
    const defaultLoginCode = '12345'; // Default login code

    loginBtn.addEventListener('click', () => {
        if (loginCode.value === defaultLoginCode) {
            showScreen(1); // Show terms screen
        } else {
            alert('Kode login salah. Silakan coba lagi.');
        }
    });

    // Terms agreement
    const agreeTerms = document.getElementById('agree-terms');
    const continueBtn = document.getElementById('continue-btn');

    agreeTerms.addEventListener('change', () => {
        continueBtn.disabled = !agreeTerms.checked;
    });

    continueBtn.addEventListener('click', () => {
        showScreen(2); // Show participant form
    });

    // Participant form
    const participantForm = document.getElementById('participant-form');
    const studentFields = document.getElementById('student-fields');
    const generalFields = document.getElementById('general-fields');
    const statusRadios = document.querySelectorAll('input[name="status"]');
    const studentLevel = document.getElementById('student-level');
    const sdClasses = document.getElementById('sd-classes');
    const smpClasses = document.getElementById('smp-classes');
    const smaClasses = document.getElementById('sma-classes');

    // Toggle between student and general fields
    statusRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'pelajar') {
                studentFields.style.display = 'block';
                generalFields.style.display = 'none';
            } else {
                studentFields.style.display = 'none';
                generalFields.style.display = 'block';
            }
        });
    });

    // Show appropriate class options based on school level
    studentLevel.addEventListener('change', () => {
        sdClasses.style.display = 'none';
        smpClasses.style.display = 'none';
        smaClasses.style.display = 'none';
        
        if (studentLevel.value === 'sd') {
            sdClasses.style.display = 'grid';
        } else if (studentLevel.value === 'smp') {
            smpClasses.style.display = 'grid';
        } else if (studentLevel.value === 'sma') {
            smaClasses.style.display = 'grid';
        }
    });

    // Form submission
    participantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        const inputs = participantForm.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value) {
                input.style.borderColor = 'red';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        
        // Validate email format if general
        if (document.getElementById('general').checked) {
            const email = document.getElementById('email');
            const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail)\.com$/;
            
            if (!emailRegex.test(email.value)) {
                email.style.borderColor = 'red';
                isValid = false;
                alert('Format email tidak valid. Harap gunakan @gmail, @yahoo, atau @hotmail.');
            }
        }
        
        if (isValid) {
            // Save participant data (in a real app, this would be sent to a server)
            const participantData = {
                name: document.getElementById('fullname').value,
                status: document.querySelector('input[name="status"]:checked').value,
                purpose: document.getElementById('student-purpose').value || document.getElementById('general-purpose').value,
                level: studentLevel.value || null,
                class: null, // Will be set in exam selection
                subject: null // Will be set in exam selection
            };
            
            localStorage.setItem('participantData', JSON.stringify(participantData));
            showScreen(3); // Show exam selection screen
            
            // Show appropriate exam options
            if (participantData.status === 'pelajar') {
                document.getElementById('student-exam-options').style.display = 'block';
                document.getElementById('general-exam-options').style.display = 'none';
            } else {
                document.getElementById('student-exam-options').style.display = 'none';
                document.getElementById('general-exam-options').style.display = 'block';
            }
        }
    });

    // GPS functionality
    const gpsBtn = document.getElementById('gps-btn');
    const addressInput = document.getElementById('address');
    
    gpsBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            gpsBtn.disabled = true;
            gpsBtn.textContent = 'Mendeteksi...';
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // In a real app, you would reverse geocode the coordinates to get an address
                    // For demo purposes, we'll just show a success message
                    addressInput.value = 'Lokasi terdeteksi: Situbondo, Jawa Timur';
                    gpsBtn.disabled = false;
                    gpsBtn.textContent = 'Gunakan GPS';
                },
                (error) => {
                    alert('Gagal mendapatkan lokasi: ' + error.message);
                    gpsBtn.disabled = false;
                    gpsBtn.textContent = 'Gunakan GPS';
                }
            );
        } else {
            alert('GPS tidak didukung di browser Anda.');
        }
    });

    // Exam selection
    const examOptions = document.querySelectorAll('.btn-exam-option');
    const startExamBtn = document.getElementById('start-exam-btn');
    let selectedSubject = null;
    let selectedClass = null;
    let selectedExam = null;

    examOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            examOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            option.classList.add('selected');
            
            // Determine what was selected
            if (option.dataset.subject) {
                selectedSubject = option.dataset.subject;
                startExamBtn.disabled = false;
            } else if (option.dataset.class) {
                selectedClass = option.dataset.class;
            } else if (option.dataset.exam) {
                selectedExam = option.dataset.exam;
                
                // Show license code input for CPNS exam
                if (selectedExam === 'cpns') {
                    document.getElementById('cpns-license').style.display = 'block';
                    startExamBtn.disabled = true;
                } else {
                    document.getElementById('cpns-license').style.display = 'none';
                    startExamBtn.disabled = false;
                }
            }
        });
    });

    // CPNS license verification
    const verifyLicense = document.getElementById('verify-license');
    const licenseCode = document.getElementById('license-code');
    const defaultLicenseCode = 'OPENLOCK-1945'; // Default CPNS license code

    verifyLicense.addEventListener('click', () => {
        if (licenseCode.value === defaultLicenseCode) {
            startExamBtn.disabled = false;
            alert('Kode lisensi valid. Anda dapat memulai ujian.');
        } else {
            alert('Kode lisensi salah. Silakan coba lagi.');
        }
    });

    // Start exam
    startExamBtn.addEventListener('click', () => {
        // Save exam selection
        const participantData = JSON.parse(localStorage.getItem('participantData'));
        
        if (participantData.status === 'pelajar') {
            participantData.subject = selectedSubject;
            participantData.class = selectedClass;
        } else {
            participantData.exam = selectedExam;
        }
        
        localStorage.setItem('participantData', JSON.stringify(participantData));
        
        // Load questions based on selection
        loadQuestions();
        
        // Start timer
        startTimer();
        
        // Show exam screen
        showScreen(4);
    });

    // Exam functionality
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const currentQuestionEl = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');
    const progressFill = document.querySelector('.progress-fill');
    const answerExplanation = document.getElementById('answer-explanation');
    const explanationText = document.getElementById('explanation-text');
    const correctAudio = document.getElementById('correct-audio');
    const wrongAudio = document.getElementById('wrong-audio');
    
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 120 * 60; // 120 minutes in seconds
    
    function loadQuestions() {
        // In a real app, this would fetch questions from a server based on the selected subject/exam
        // For demo purposes, we'll use sample questions
        
        const participantData = JSON.parse(localStorage.getItem('participantData'));
        
        if (participantData.status === 'pelajar') {
            // Load sample questions based on subject
            questions = getSampleQuestions(participantData.subject);
        } else {
            // Load sample questions for general exams
            questions = participantData.exam === 'logika' ? getLogicQuestions() : getCPNSQuestions();
        }
        
        // Update UI
        totalQuestionsEl.textContent = questions.length;
        showQuestion();
    }
    
    function showQuestion() {
        const question = questions[currentQuestionIndex];
        
        // Update question text
        questionText.textContent = question.text;
        
        // Update question number
        currentQuestionEl.textContent = currentQuestionIndex + 1;
        
        // Update progress bar
        progressFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        answerExplanation.style.display = 'none';
        
        // Add new options
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.textContent = `${String.fromCharCode(65 + index)}. ${option.text}`;
            optionBtn.dataset.index = index;
            
            optionBtn.addEventListener('click', () => {
                checkAnswer(index);
            });
            
            optionsContainer.appendChild(optionBtn);
        });
    }
    
    function checkAnswer(selectedIndex) {
        const question = questions[currentQuestionIndex];
        const optionButtons = document.querySelectorAll('.option-btn');
        
        // Disable all options
        optionButtons.forEach(btn => {
            btn.disabled = true;
        });
        
        // Mark correct and wrong answers
        optionButtons.forEach((btn, index) => {
            if (index === question.correctIndex) {
                btn.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correctIndex) {
                btn.classList.add('wrong');
            }
        });
        
        // Update score
        if (selectedIndex === question.correctIndex) {
            score++;
            correctAudio.play().catch(e => console.log("Audio play prevented:", e));
        } else {
            wrongAudio.play().catch(e => console.log("Audio play prevented:", e));
        }
        
        // Show explanation
        explanationText.textContent = question.explanation;
        answerExplanation.style.display = 'block';
    }
    
    function startTimer() {
        // Clear existing timer
        if (timer) clearInterval(timer);
        
        // Update timer display immediately
        updateTimerDisplay();
        
        // Start countdown
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            // Check if time is up
            if (timeLeft <= 0) {
                clearInterval(timer);
                finishExam();
            }
            
            // Show warning when 10 minutes left
            if (timeLeft === 600) {
                showTimeWarning();
            }
        }, 1000);
    }
    
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        // Format as MM:SS
        document.getElementById('exam-timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Make timer bigger when 10 minutes left
        if (timeLeft <= 600) {
            document.getElementById('exam-timer').style.fontSize = '1.5rem';
            document.getElementById('exam-timer').style.color = 'var(--warning-color)';
        }
    }
    
    function showTimeWarning() {
        if (timeLeft === 600) {
            const warning = document.createElement('div');
            warning.className = 'time-warning';
            warning.textContent = 'Perhatian! Ujian akan berakhir dalam waktu 10 menit. Mohon pastikan semua jawaban telah diselesaikan dan diperiksa sebelum waktu habis. Terima kasih atas partisipasi Anda.';
            warning.style.position = 'fixed';
            warning.style.bottom = '20px';
            warning.style.left = '50%';
            warning.style.transform = 'translateX(-50%)';
            warning.style.backgroundColor = 'var(--warning-color)';
            warning.style.color = 'white';
            warning.style.padding = '10px 20px';
            warning.style.borderRadius = '5px';
            warning.style.zIndex = '1000';
            warning.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
            warning.style.animation = 'fadeIn 0.5s ease';
            
            document.body.appendChild(warning);
            
            // Remove warning after 9 minutes (leaving 1 minute)
            setTimeout(() => {
                warning.style.animation = 'fadeOut 0.5s ease';
                setTimeout(() => warning.remove(), 500);
            }, 9 * 60 * 1000);
        }
    }
    
    // Exam controls
    const finishExamBtn = document.getElementById('finish-exam-btn');
    const skipQuestionBtn = document.getElementById('skip-question-btn');
    const unansweredBtn = document.getElementById('unanswered-btn');
    
    finishExamBtn.addEventListener('click', finishExam);
    
    skipQuestionBtn.addEventListener('click', () => {
        // Move to next question
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            // If last question, finish exam
            finishExam();
        }
    });
    
    unansweredBtn.addEventListener('click', () => {
        // In a real app, this would show a list of unanswered questions
        alert('Fitur ini akan menampilkan daftar soal yang belum dijawab.');
    });
    
    function finishExam() {
        clearInterval(timer);
        
        // Calculate score percentage
        const percentage = Math.round((score / questions.length) * 100);
        
        // Save results
        const participantData = JSON.parse(localStorage.getItem('participantData'));
        const result = {
            participant: participantData,
            score: score,
            totalQuestions: questions.length,
            percentage: percentage,
            date: new Date().toLocaleDateString('id-ID')
        };
        
        localStorage.setItem('examResult', JSON.stringify(result));
        
        // Show results screen
        showResults(result);
        showScreen(5);
    }
    
    function showResults(result) {
        document.getElementById('total-questions-result').textContent = result.totalQuestions;
        document.getElementById('correct-answers').textContent = result.score;
        document.getElementById('wrong-answers').textContent = result.totalQuestions - result.score;
        document.getElementById('exam-score').textContent = result.percentage;
        
        // Show motivational message based on score
        const motivationalMessage = document.getElementById('motivational-message');
        let message = '';
        
        if (result.percentage >= 90) {
            message = 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
        } else if (result.percentage >= 70) {
            message = 'Hasil yang sangat baik! Anda telah menunjukkan pemahaman yang mendalam tentang materi.';
        } else if (result.percentage >= 50) {
            message = 'Hasil yang cukup baik. Masih ada ruang untuk meningkatkan pemahaman Anda.';
        } else {
            message = 'Jangan menyerah! Hasil ini adalah awal yang baik untuk belajar lebih giat lagi.';
        }
        
        motivationalMessage.textContent = message;
    }
    
    // Certificate functionality
    const printCertificateBtn = document.getElementById('print-certificate-btn');
    const retakeExamBtn = document.getElementById('retake-exam-btn');
    const closeCertificateBtn = document.getElementById('close-certificate-btn');
    const downloadCertificateBtn = document.getElementById('download-certificate-btn');
    const certificateScreen = document.getElementById('certificate-screen');
    
    printCertificateBtn.addEventListener('click', showCertificate);
    retakeExamBtn.addEventListener('click', () => {
        // Reset exam
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 120 * 60;
        
        // Show exam selection screen
        showScreen(3);
    });
    
    closeCertificateBtn.addEventListener('click', () => {
        certificateScreen.classList.remove('active');
    });
    
    downloadCertificateBtn.addEventListener('click', () => {
        alert('Fitur download sertifikat akan mengunduh gambar sertifikat.');
    });
    
    function showCertificate() {
        const result = JSON.parse(localStorage.getItem('examResult'));
        const participantData = result.participant;
        
        // Generate certificate code
        const now = new Date();
        const dateStr = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + 
                          Math.random().toString(36).substring(2, 6).toUpperCase();
        
        let certificateCode = '';
        
        if (participantData.status === 'pelajar') {
            certificateCode = `${participantData.name.toUpperCase().replace(/ /g, '_')}/${participantData.status.toUpperCase()}/${participantData.level.toUpperCase()}/${participantData.subject.toUpperCase()}/${dateStr}/${randomCode}/PERGUNU-STB`;
        } else {
            certificateCode = `${participantData.name.toUpperCase().replace(/ /g, '_')}/${participantData.status.toUpperCase()}/${participantData.exam.toUpperCase()}/${dateStr}/${randomCode}/PERGUNU-STB`;
        }
        
        // Update certificate content
        document.getElementById('certificate-name').textContent = participantData.name;
        document.getElementById('certificate-score').textContent = result.percentage;
        document.getElementById('certificate-date').textContent = now.toLocaleDateString('id-ID', { 
            day: 'numeric', month: 'long', year: 'numeric' 
        });
        document.getElementById('certificate-code').textContent = certificateCode;
        
        // Set motivational text based on score
        let motivation = '';
        if (result.percentage >= 90) {
            motivation = 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
        } else if (result.percentage >= 70) {
            motivation = 'Hasil yang sangat baik! Anda telah menunjukkan pemahaman yang mendalam tentang materi.';
        } else if (result.percentage >= 50) {
            motivation = 'Hasil yang cukup baik. Masih ada ruang untuk meningkatkan pemahaman Anda.';
        } else {
            motivation = 'Jangan menyerah! Hasil ini adalah awal yang baik untuk belajar lebih giat lagi.';
        }
        
        document.getElementById('certificate-motivation').textContent = motivation;
        
        // Play applause sound
        const applauseAudio = document.getElementById('applause-audio');
        applauseAudio.play().catch(e => console.log("Audio play prevented:", e));
        
        // Show certificate screen
        certificateScreen.classList.add('active');
        showScreen(6);
    }
    
    // Floating buttons functionality
    const shareBtn = document.querySelector('.share-btn');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const questionBankBtn = document.querySelector('.question-bank-btn');
    const adminBtn = document.querySelector('.admin-btn');
    const shareModal = document.getElementById('share-modal');
    const questionBankModal = document.getElementById('question-bank-modal');
    const adminLoginModal = document.getElementById('admin-login-modal');
    
    shareBtn.addEventListener('click', () => {
        shareModal.classList.add('active');
    });
    
    whatsappBtn.addEventListener('click', () => {
        window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...`, '_blank');
    });
    
    questionBankBtn.addEventListener('click', () => {
        questionBankModal.classList.add('active');
    });
    
    adminBtn.addEventListener('click', () => {
        adminLoginModal.classList.add('active');
    });
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });
    
    // Question bank access
    const verifyQuestionBank = document.getElementById('verify-question-bank');
    const questionBankCode = document.getElementById('question-bank-code');
    const defaultQuestionBankCode = 'OPENLOCK-1926';
    
    verifyQuestionBank.addEventListener('click', () => {
        if (questionBankCode.value === defaultQuestionBankCode) {
            questionBankModal.classList.remove('active');
            showAdminPanel('questions-tab');
        } else {
            alert('Kode bank soal salah. Silakan coba lagi.');
        }
    });
    
    // Admin panel access
    const verifyAdmin = document.getElementById('verify-admin');
    const adminCode = document.getElementById('admin-code');
    const defaultAdminCode = '65614222';
    
    verifyAdmin.addEventListener('click', () => {
        if (adminCode.value === defaultAdminCode) {
            adminLoginModal.classList.remove('active');
            showAdminPanel();
        } else {
            alert('Kode admin salah. Silakan coba lagi.');
        }
    });
    
    // Admin panel functionality
    function showAdminPanel(defaultTab = 'codes-tab') {
        // Show admin panel and activate default tab
        document.getElementById('admin-panel').classList.add('active');
        document.querySelector(`.admin-tab[data-tab="${defaultTab.replace('-tab', '')}"]`).click();
        showScreen(7);
    }
    
    // Tab switching in admin panel
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
        });
    });
    
    // Close admin panel
    document.getElementById('close-admin').addEventListener('click', () => {
        document.getElementById('admin-panel').classList.remove('active');
        showScreen(5); // Go back to results screen
    });
    
    // Sample questions for demo purposes
    function getSampleQuestions(subject) {
        // In a real app, this would fetch from a database
        // These are just sample questions for demonstration
        
        const sampleQuestions = {
            agama: [
                {
                    text: "Apa rukun Islam yang pertama?",
                    options: [
                        { text: "Shalat" },
                        { text: "Puasa" },
                        { text: "Syahadat" },
                        { text: "Zakat" }
                    ],
                    correctIndex: 2,
                    explanation: "Rukun Islam yang pertama adalah mengucapkan dua kalimat syahadat."
                },
                {
                    text: "Berapa jumlah rakaat shalat Subuh?",
                    options: [
                        { text: "2" },
                        { text: "3" },
                        { text: "4" },
                        { text: "5" }
                    ],
                    correctIndex: 0,
                    explanation: "Shalat Subuh terdiri dari 2 rakaat."
                }
            ],
            ppkn: [
                {
                    text: "Apa bunyi sila pertama Pancasila?",
                    options: [
                        { text: "Kemanusiaan yang adil dan beradab" },
                        { text: "Ketuhanan Yang Maha Esa" },
                        { text: "Persatuan Indonesia" },
                        { text: "Keadilan sosial bagi seluruh rakyat Indonesia" }
                    ],
                    correctIndex: 1,
                    explanation: "Sila pertama Pancasila adalah Ketuhanan Yang Maha Esa."
                }
            ],
            // Add more sample questions for other subjects
            matematika: [
                {
                    text: "Berapakah hasil dari 7 × 8?",
                    options: [
                        { text: "48" },
                        { text: "56" },
                        { text: "64" },
                        { text: "72" }
                    ],
                    correctIndex: 1,
                    explanation: "7 dikali 8 sama dengan 56."
                }
            ]
        };
        
        return sampleQuestions[subject] || sampleQuestions.agama; // Default to agama if subject not found
    }
    
    function getLogicQuestions() {
        return [
            {
                text: "Jika semua A adalah B dan beberapa B adalah C, maka:",
                options: [
                    { text: "Semua A adalah C" },
                    { text: "Beberapa A adalah C" },
                    { text: "Tidak ada A yang adalah C" },
                    { text: "Tidak dapat disimpulkan" }
                ],
                correctIndex: 1,
                explanation: "Karena beberapa B adalah C dan semua A adalah B, maka beberapa A pasti adalah C."
            }
        ];
    }
    
    function getCPNSQuestions() {
        return [
            {
                text: "Apa tujuan utama negara Indonesia menurut Pembukaan UUD 1945?",
                options: [
                    { text: "Mencerdaskan kehidupan bangsa" },
                    { text: "Memajukan kesejahteraan umum" },
                    { text: "Melindungi segenap bangsa Indonesia" },
                    { text: "Semua jawaban benar" }
                ],
                correctIndex: 3,
                explanation: "Semua opsi tersebut adalah tujuan negara Indonesia menurut Pembukaan UUD 1945."
            }
        ];
    }
});
