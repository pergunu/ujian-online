// Ganti partikel.json dengan konfigurasi langsung
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 1, direction: "none", random: true }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" }
    }
  }
});
// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {
        console.log('Particles.js loaded');
    });

    // Initialize application
    initApp();
});

function initApp() {
    // Set default values
    const defaults = {
        loginCode: '12345',
        cpnsCode: 'OPENLOCK-1945',
        questionBankCode: 'OPENLOCK-1926',
        adminCode: '65614222',
        examTimer: 120, // in minutes
        questionCount: 10,
        pointValue: 1,
        randomizeQuestions: true,
        enabledCategories: {
            AGAMA: true,
            PPKN: true,
            SEJARAH: true,
            IPA: true,
            IPS: true,
            MATEMATIKA: true,
            BAHASA_INDONESIA: true,
            BAHASA_INGGRIS: true,
            MATERI_EXTRA: true,
            MATERI_KHUSUS: true,
            UJIAN_LOGIKA: true,
            UJIAN_CPNS: true
        },
        greetingText: 'Selamat Datang di Ujian Online Pergunu Situbondo',
        termsText: 'Dengan mengikuti ujian ini, Anda menyetujui semua peraturan dan kebijakan yang berlaku. Setiap pelanggaran akan dikenakan sanksi sesuai dengan ketentuan yang berlaku. Ujian ini dikembangkan oleh Cendhanu tim kreator PERGUNU SITUBONDO.',
        infoText: 'Pastikan semua data yang Anda isi adalah benar dan valid. Data yang sudah disubmit tidak dapat diubah dan akan digunakan untuk penerbitan sertifikat.',
        periodicInfo: 'Ujian online ini akan dibuka setiap hari Senin-Jumat pukul 08.00-16.00 WIB. Hasil ujian dapat dilihat langsung setelah menyelesaikan semua soal.',
        chairmanName: 'Moh. Nuril Hudha, S.Pd., M.Si.',
        motivationalMessages: {
            excellent: 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.',
            good: 'Bagus! Anda telah menunjukkan pemahaman yang baik tentang materi ini. Tingkatkan lagi untuk hasil yang lebih baik.',
            average: 'Cukup baik. Anda sudah memahami sebagian materi, tetapi masih perlu belajar lebih giat lagi.',
            poor: 'Anda perlu belajar lebih giat lagi. Jangan menyerah, teruslah berusaha!'
        },
        shareLinks: [
            { name: 'Facebook', url: 'https://facebook.com', icon: 'fab fa-facebook-f', color: '#3b5998' },
            { name: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter', color: '#1da1f2' },
            { name: 'WhatsApp', url: 'https://wa.me/', icon: 'fab fa-whatsapp', color: '#25d366' },
            { name: 'Telegram', url: 'https://t.me/', icon: 'fab fa-telegram-plane', color: '#0088cc' },
            { name: 'Email', url: 'mailto:', icon: 'fas fa-envelope', color: '#dd4b39' }
        ]
    };

    // Load settings from localStorage or set defaults
    let settings = JSON.parse(localStorage.getItem('ujianSettings')) || defaults;
    
    // Save settings to localStorage
    function saveSettings() {
        localStorage.setItem('ujianSettings', JSON.stringify(settings));
    }

    // Update UI with current settings
    function updateUI() {
        document.getElementById('greeting-text').textContent = settings.greetingText;
        document.getElementById('terms-text').innerHTML = settings.termsText.replace(/\n/g, '<br>');
        document.getElementById('info-text').innerHTML = settings.infoText.replace(/\n/g, '<br>');
        document.getElementById('periodic-info').innerHTML = settings.periodicInfo.replace(/\n/g, '<br>');
        document.getElementById('chairman-name').textContent = settings.chairmanName;
        
        // Update admin panel inputs
        if (document.getElementById('greeting-setting')) {
            document.getElementById('greeting-setting').value = settings.greetingText;
            document.getElementById('terms-setting').value = settings.termsText;
            document.getElementById('info-setting').value = settings.infoText;
            document.getElementById('periodic-info-setting').value = settings.periodicInfo;
            document.getElementById('chairman-setting').value = settings.chairmanName;
            document.getElementById('excellent-message').value = settings.motivationalMessages.excellent;
            document.getElementById('good-message').value = settings.motivationalMessages.good;
            document.getElementById('average-message').value = settings.motivationalMessages.average;
            document.getElementById('poor-message').value = settings.motivationalMessages.poor;
            document.getElementById('exam-timer').value = settings.examTimer;
            document.getElementById('question-count').value = settings.questionCount;
            document.getElementById('point-value').value = settings.pointValue;
            document.getElementById('randomize-questions').checked = settings.randomizeQuestions;
            
            // Update enabled categories
            for (const category in settings.enabledCategories) {
                const checkbox = document.getElementById(`enable-${category.toLowerCase().replace('_', '-')}`);
                if (checkbox) {
                    checkbox.checked = settings.enabledCategories[category];
                }
            }
        }
        
        // Update share links
        const shareLinksContainer = document.getElementById('share-links');
        if (shareLinksContainer) {
            shareLinksContainer.innerHTML = '';
            settings.shareLinks.forEach(link => {
                const linkElement = document.createElement('a');
                linkElement.href = link.url;
                linkElement.target = '_blank';
                linkElement.style.backgroundColor = link.color;
                linkElement.innerHTML = `<i class="${link.icon}"></i>`;
                shareLinksContainer.appendChild(linkElement);
            });
        }
    }

    // Initialize UI
    updateUI();

    // Login functionality
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const loginCode = document.getElementById('login-code').value;
            if (loginCode === settings.loginCode) {
                playButtonSound();
                document.querySelector('.opening-notification').classList.add('animate__fadeOut');
                setTimeout(() => {
                    document.querySelector('.opening-notification').classList.add('hidden');
                    showTerms();
                }, 500);
            } else {
                alert('Kode login salah. Silakan coba lagi.');
            }
        });
    }

    // Show terms and conditions
    function showTerms() {
        const termsContainer = document.querySelector('.terms-container');
        termsContainer.classList.remove('hidden');
        termsContainer.classList.add('animate__fadeIn');
    }

    // Terms agreement checkbox
    const agreeCheckbox = document.getElementById('agree-terms');
    if (agreeCheckbox) {
        agreeCheckbox.addEventListener('change', function() {
            document.getElementById('continue-btn').disabled = !this.checked;
        });
    }

    // Continue to participant form
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            playButtonSound();
            document.querySelector('.terms-container').classList.add('animate__fadeOut');
            setTimeout(() => {
                document.querySelector('.terms-container').classList.add('hidden');
                showParticipantForm();
            }, 500);
        });
    }

    // Show participant form
    function showParticipantForm() {
        const formContainer = document.querySelector('.form-container');
        formContainer.classList.remove('hidden');
        formContainer.classList.add('animate__fadeIn');
        
        // Handle status change (pelajar/umum)
        const statusRadios = document.querySelectorAll('input[name="status"]');
        statusRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'pelajar') {
                    document.querySelectorAll('.student-fields').forEach(el => el.classList.remove('hidden'));
                    document.querySelectorAll('.general-fields').forEach(el => el.classList.add('hidden'));
                    document.querySelector('.student-purpose').classList.remove('hidden');
                    document.querySelector('.general-purpose').classList.add('hidden');
                    document.querySelector('.school-level').classList.remove('hidden');
                } else {
                    document.querySelectorAll('.student-fields').forEach(el => el.classList.add('hidden'));
                    document.querySelectorAll('.general-fields').forEach(el => el.classList.remove('hidden'));
                    document.querySelector('.student-purpose').classList.add('hidden');
                    document.querySelector('.general-purpose').classList.remove('hidden');
                    document.querySelector('.school-level').classList.add('hidden');
                }
            });
        });
        
        // Handle CPNS license code
        const generalPurpose = document.getElementById('general-purpose');
        if (generalPurpose) {
            generalPurpose.addEventListener('change', function() {
                if (this.value === 'cpns') {
                    document.querySelector('.cpns-license').classList.remove('hidden');
                } else {
                    document.querySelector('.cpns-license').classList.add('hidden');
                }
            });
        }
        
        // GPS location detection
        const gpsBtn = document.getElementById('gps-btn');
        if (gpsBtn) {
            gpsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                playButtonSound();
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            // Use reverse geocoding to get address
                            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                                .then(response => response.json())
                                .then(data => {
                                    const address = data.display_name || 'Lokasi tidak dapat ditentukan';
                                    document.getElementById('address').value = address;
                                })
                                .catch(error => {
                                    console.error('Error getting address:', error);
                                    alert('Gagal mendapatkan alamat. Silakan isi manual.');
                                });
                        },
                        error => {
                            console.error('Geolocation error:', error);
                            alert('Akses lokasi ditolak. Silakan izinkan akses lokasi atau isi manual.');
                        }
                    );
                } else {
                    alert('Browser tidak mendukung geolocation. Silakan isi manual.');
                }
            });
        }
        
        // Form submission
        const participantForm = document.getElementById('participant-form');
        if (participantForm) {
            participantForm.addEventListener('submit', function(e) {
                e.preventDefault();
                playButtonSound();
                
                // Validate CPNS code if applicable
                const status = document.querySelector('input[name="status"]:checked').value;
                const purpose = status === 'pelajar' ? document.getElementById('student-purpose').value : document.getElementById('general-purpose').value;
                
                if (status === 'umum' && purpose === 'cpns') {
                    const cpnsCode = document.getElementById('cpns-code').value;
                    if (cpnsCode !== settings.cpnsCode) {
                        alert('Kode lisensi CPNS/P3K salah. Silakan coba lagi.');
                        return;
                    }
                }
                
                // Validate all required fields
                let isValid = true;
                const requiredInputs = this.querySelectorAll('input[required], select[required]');
                requiredInputs.forEach(input => {
                    if (!input.value.trim()) {
                        input.style.borderColor = 'red';
                        isValid = false;
                    } else {
                        input.style.borderColor = '';
                    }
                });
                
                if (!isValid) {
                    alert('Silakan isi semua field yang wajib diisi.');
                    return;
                }
                
                // Validate email format
                const email = document.getElementById('email');
                if (email && !email.checkValidity()) {
                    alert('Format email tidak valid. Harap gunakan @gmail.com, @yahoo.com, atau @hotmail.com.');
                    email.style.borderColor = 'red';
                    return;
                }
                
                // Save participant data
                const participantData = {
                    fullname: document.getElementById('fullname').value,
                    status: status,
                    purpose: purpose,
                    timestamp: new Date().toISOString()
                };
                
                if (status === 'pelajar') {
                    participantData.school = document.getElementById('school').value;
                    participantData.studentId = document.getElementById('student-id').value;
                    participantData.schoolLevel = document.querySelector('input[name="school-level"]:checked').value;
                } else {
                    participantData.address = document.getElementById('address').value;
                    participantData.whatsapp = document.getElementById('whatsapp').value;
                    participantData.email = document.getElementById('email').value;
                }
                
                // Save to localStorage
                let participants = JSON.parse(localStorage.getItem('participants')) || [];
                participants.push(participantData);
                localStorage.setItem('participants', JSON.stringify(participants));
                
                // Proceed to level selection
                document.querySelector('.form-container').classList.add('animate__fadeOut');
                setTimeout(() => {
                    document.querySelector('.form-container').classList.add('hidden');
                    showLevelSelection(participantData);
                }, 500);
            });
        }
    }

    // Show level selection
    function showLevelSelection(participantData) {
        const levelContainer = document.querySelector('.level-container');
        levelContainer.classList.remove('hidden');
        levelContainer.classList.add('animate__fadeIn');
        
        // Show appropriate levels based on participant status
        if (participantData.status === 'pelajar') {
            document.querySelector('.student-levels').classList.remove('hidden');
            document.querySelector('.general-levels').classList.add('hidden');
            
            // Populate grade buttons based on school level
            const gradeButtons = document.querySelector('.grade-buttons');
            gradeButtons.innerHTML = '';
            
            let grades = [];
            if (participantData.schoolLevel === 'SD') {
                grades = ['Kelas IV', 'Kelas V', 'Kelas VI'];
            } else if (participantData.schoolLevel === 'SMP') {
                grades = ['Kelas VII', 'Kelas VIII', 'Kelas IX'];
            } else if (participantData.schoolLevel === 'SMA/SMK') {
                grades = ['Kelas X', 'Kelas XI', 'Kelas XII'];
            }
            
            grades.forEach(grade => {
                const button = document.createElement('button');
                button.className = 'btn-gradient';
                button.textContent = grade;
                button.dataset.grade = grade;
                button.addEventListener('click', function() {
                    playButtonSound();
                    participantData.grade = grade;
                    showSubjectSelection(participantData, 'student');
                });
                gradeButtons.appendChild(button);
            });
        } else {
            document.querySelector('.student-levels').classList.add('hidden');
            document.querySelector('.general-levels').classList.remove('hidden');
            
            // Handle general level buttons
            const levelButtons = document.querySelectorAll('.level-btn');
            levelButtons.forEach(button => {
                button.addEventListener('click', function() {
                    playButtonSound();
                    participantData.level = this.dataset.level;
                    showSubjectSelection(participantData, 'general');
                });
            });
        }
    }

    // Show subject selection
    function showSubjectSelection(participantData, type) {
        const subjectContainer = document.querySelector('.subject-container');
        subjectContainer.classList.remove('hidden');
        
        const subjectButtons = document.querySelector('.subject-buttons');
        subjectButtons.innerHTML = '';
        
        let subjects = [];
        if (type === 'student') {
            subjects = [
                'AGAMA', 'PPKN', 'SEJARAH', 'IPA', 'IPS', 
                'MATEMATIKA', 'BAHASA INDONESIA', 'BAHASA INGGRIS', 
                'MATERI EXTRA', 'MATERI KHUSUS'
            ];
        } else {
            if (participantData.level === 'iq') {
                subjects = ['UJIAN LOGIKA'];
            } else if (participantData.level === 'cpns') {
                subjects = ['UJIAN CPNS/P3K'];
            }
        }
        
        // Filter enabled subjects
        subjects = subjects.filter(subject => {
            const key = subject.replace(/ /g, '_');
            return settings.enabledCategories[key];
        });
        
        if (subjects.length === 0) {
            subjectButtons.innerHTML = '<p>Tidak ada ujian yang tersedia saat ini.</p>';
            return;
        }
        
        subjects.forEach(subject => {
            const button = document.createElement('button');
            button.className = 'btn-gradient';
            button.innerHTML = `<i class="fas fa-book-open"></i> ${subject}`;
            button.dataset.subject = subject.replace(/ /g, '_');
            button.addEventListener('click', function() {
                playButtonSound();
                participantData.subject = subject;
                startExam(participantData);
            });
            subjectButtons.appendChild(button);
        });
    }

    // Start exam
    function startExam(participantData) {
        document.querySelector('.level-container').classList.add('animate__fadeOut');
        setTimeout(() => {
            document.querySelector('.level-container').classList.add('hidden');
            
            const examContainer = document.querySelector('.exam-container');
            examContainer.classList.remove('hidden');
            
            // Load questions based on subject
            const questions = loadQuestions(participantData.subject);
            
            // Initialize exam
            initExam(questions, participantData);
        }, 500);
    }

    // Load questions from localStorage
    function loadQuestions(subject) {
        let allQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        
        // Filter by subject
        let filteredQuestions = allQuestions.filter(q => q.category === subject);
        
        // Apply difficulty filter if needed
        // ...
        
        // Randomize if enabled
        if (settings.randomizeQuestions) {
            filteredQuestions = shuffleArray(filteredQuestions);
        }
        
        // Limit to question count
        return filteredQuestions.slice(0, settings.questionCount);
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

    // Initialize exam
    function initExam(questions, participantData) {
        if (questions.length === 0) {
            alert('Tidak ada soal yang tersedia untuk ujian ini.');
            return;
        }
        
        const examData = {
            participant: participantData,
            questions: questions,
            currentQuestionIndex: 0,
            answers: {},
            startTime: new Date().getTime(),
            endTime: new Date().getTime() + (settings.examTimer * 60 * 1000)
        };
        
        // Save exam data
        localStorage.setItem('currentExam', JSON.stringify(examData));
        
        // Start timer
        startTimer(examData.endTime);
        
        // Display first question
        displayQuestion(examData, 0);
    }

    // Start timer
    function startTimer(endTime) {
        const timerElement = document.getElementById('timer');
        
        function updateTimer() {
            const now = new Date().getTime();
            const remaining = endTime - now;
            
            if (remaining <= 0) {
                // Time's up
                clearInterval(timerInterval);
                timerElement.textContent = '00:00';
                finishExam(true);
                return;
            }
            
            // Calculate minutes and seconds
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            
            // Display timer
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Change style when time is running out
            if (remaining <= 10 * 60 * 1000) { // 10 minutes left
                timerElement.parentElement.classList.add('warning');
                if (remaining <= 5 * 60 * 1000) {
                    timerElement.parentElement.classList.add('danger');
                }
                
                // Show time warning
                if (remaining <= 10 * 60 * 1000 && remaining > 1 * 60 * 1000) {
                    document.querySelector('.time-warning').classList.remove('hidden');
                    document.getElementById('remaining-minutes').textContent = Math.ceil(minutes);
                } else if (remaining <= 1 * 60 * 1000) {
                    document.querySelector('.time-warning').classList.add('hidden');
                }
            }
        }
        
        // Update timer immediately and then every second
        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    }

    // Display question
    function displayQuestion(examData, questionIndex) {
        const question = examData.questions[questionIndex];
        if (!question) return;
        
        // Update question counter
        document.getElementById('current-question').textContent = questionIndex + 1;
        document.getElementById('total-questions').textContent = examData.questions.length;
        
        // Display question text
        document.getElementById('question-text').textContent = question.text;
        
        // Display options
        const optionsContainer = document.querySelector('.options-container');
        optionsContainer.innerHTML = '';
        
        ['A', 'B', 'C', 'D', 'E'].forEach(option => {
            if (question[`option${option}`]) {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'option-btn';
                optionBtn.dataset.option = option;
                
                const optionLetter = document.createElement('span');
                optionLetter.className = 'option-letter';
                optionLetter.textContent = option;
                
                const optionText = document.createElement('span');
                optionText.textContent = question[`option${option}`];
                
                optionBtn.appendChild(optionLetter);
                optionBtn.appendChild(optionText);
                
                // Check if this option was already selected
                if (examData.answers[questionIndex] === option) {
                    optionBtn.classList.add('selected');
                    
                    // Show if correct or wrong
                    if (option === question.correctAnswer) {
                        optionBtn.classList.add('correct');
                    } else {
                        optionBtn.classList.add('wrong');
                    }
                    
                    // Show explanation
                    document.getElementById('explanation').textContent = question.explanation || 'Tidak ada penjelasan tersedia.';
                    document.getElementById('explanation').classList.remove('hidden');
                }
                
                optionBtn.addEventListener('click', function() {
                    if (!examData.answers[questionIndex]) {
                        selectAnswer(examData, questionIndex, option);
                    }
                });
                
                optionsContainer.appendChild(optionBtn);
            }
        });
        
        // Hide explanation if not answered
        if (!examData.answers[questionIndex]) {
            document.getElementById('explanation').classList.add('hidden');
        }
        
        // Update navigation buttons
        document.getElementById('prev-question').disabled = questionIndex === 0;
        document.getElementById('next-question').disabled = questionIndex === examData.questions.length - 1;
    }

    // Select answer
    function selectAnswer(examData, questionIndex, option) {
        playButtonSound();
        
        // Save answer
        examData.answers[questionIndex] = option;
        localStorage.setItem('currentExam', JSON.stringify(examData));
        
        // Get question
        const question = examData.questions[questionIndex];
        
        // Highlight selected option
        const options = document.querySelectorAll('.option-btn');
        options.forEach(opt => {
            opt.classList.remove('selected', 'correct', 'wrong');
            if (opt.dataset.option === option) {
                opt.classList.add('selected');
                
                // Play sound and show feedback
                if (option === question.correctAnswer) {
                    opt.classList.add('correct');
                    playCorrectSound();
                } else {
                    opt.classList.add('wrong');
                    playWrongSound();
                }
            }
        });
        
        // Show explanation
        document.getElementById('explanation').textContent = question.explanation || 'Tidak ada penjelasan tersedia.';
        document.getElementById('explanation').classList.remove('hidden');
    }

    // Navigation buttons
    document.getElementById('prev-question').addEventListener('click', function() {
        playButtonSound();
        const examData = JSON.parse(localStorage.getItem('currentExam'));
        if (examData.currentQuestionIndex > 0) {
            examData.currentQuestionIndex--;
            localStorage.setItem('currentExam', JSON.stringify(examData));
            displayQuestion(examData, examData.currentQuestionIndex);
        }
    });
    
    document.getElementById('next-question').addEventListener('click', function() {
        playButtonSound();
        const examData = JSON.parse(localStorage.getItem('currentExam'));
        if (examData.currentQuestionIndex < examData.questions.length - 1) {
            examData.currentQuestionIndex++;
            localStorage.setItem('currentExam', JSON.stringify(examData));
            displayQuestion(examData, examData.currentQuestionIndex);
        }
    });
    
    document.getElementById('unanswered-btn').addEventListener('click', function() {
        playButtonSound();
        const examData = JSON.parse(localStorage.getItem('currentExam'));
        
        // Find first unanswered question
        let unansweredIndex = 0;
        for (let i = 0; i < examData.questions.length; i++) {
            if (!examData.answers[i]) {
                unansweredIndex = i;
                break;
            }
        }
        
        examData.currentQuestionIndex = unansweredIndex;
        localStorage.setItem('currentExam', JSON.stringify(examData));
        displayQuestion(examData, examData.currentQuestionIndex);
    });
    
    document.getElementById('finish-exam').addEventListener('click', function() {
        playButtonSound();
        if (confirm('Apakah Anda yakin ingin menyelesaikan ujian sekarang?')) {
            finishExam(false);
        }
    });

    // Finish exam
    function finishExam(timeout = false) {
        const examData = JSON.parse(localStorage.getItem('currentExam'));
        if (!examData) return;
        
        // Calculate score
        let correct = 0;
        let wrong = 0;
        let unanswered = 0;
        
        examData.questions.forEach((question, index) => {
            if (examData.answers[index]) {
                if (examData.answers[index] === question.correctAnswer) {
                    correct++;
                } else {
                    wrong++;
                }
            } else {
                unanswered++;
            }
        });
        
        const score = Math.round((correct / examData.questions.length) * 100);
        
        // Save result
        const result = {
            participant: examData.participant,
            subject: examData.participant.subject,
            date: new Date().toISOString(),
            totalQuestions: examData.questions.length,
            correctAnswers: correct,
            wrongAnswers: wrong,
            unanswered: unanswered,
            score: score,
            timeout: timeout
        };
        
        let results = JSON.parse(localStorage.getItem('examResults')) || [];
        results.push(result);
        localStorage.setItem('examResults', JSON.stringify(results));
        
        // Clear current exam
        localStorage.removeItem('currentExam');
        
        // Show results
        document.querySelector('.exam-container').classList.add('animate__fadeOut');
        setTimeout(() => {
            document.querySelector('.exam-container').classList.add('hidden');
            showResults(result);
        }, 500);
    }

    // Show results
    function showResults(result) {
        const resultsContainer = document.querySelector('.results-container');
        resultsContainer.classList.remove('hidden');
        
        // Update result details
        document.getElementById('total-questions-result').textContent = result.totalQuestions;
        document.getElementById('correct-answers').textContent = result.correctAnswers;
        document.getElementById('wrong-answers').textContent = result.wrongAnswers;
        document.getElementById('unanswered-questions').textContent = result.unanswered;
        document.getElementById('score-percentage').textContent = result.score;
        
        // Update score circle animation
        const scoreCircle = document.querySelector('.score-circle');
        const percentage = result.score;
        scoreCircle.style.background = `conic-gradient(var(--success-color) 0%, var(--success-color) ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage}%)`;
        
        // Set motivational message based on score
        let message = '';
        if (result.score >= 90) {
            message = settings.motivationalMessages.excellent;
        } else if (result.score >= 70) {
            message = settings.motivationalMessages.good;
        } else if (result.score >= 50) {
            message = settings.motivationalMessages.average;
        } else {
            message = settings.motivationalMessages.poor;
        }
        
        document.getElementById('motivational-message').textContent = message;
        
        // Handle buttons
        document.getElementById('print-certificate').addEventListener('click', function() {
            playButtonSound();
            showCertificate(result);
        });
        
        document.getElementById('retake-exam').addEventListener('click', function() {
            playButtonSound();
            resultsContainer.classList.add('animate__fadeOut');
            setTimeout(() => {
                resultsContainer.classList.add('hidden');
                showLevelSelection(result.participant);
            }, 500);
        });
    }

    // Show certificate
    function showCertificate(result) {
        playApplauseSound();
        
        const certificateContainer = document.querySelector('.certificate-container');
        certificateContainer.classList.remove('hidden');
        
        // Generate certificate code
        const date = new Date(result.date);
        const dateStr = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear()}`;
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
        
        const certificateCode = `${result.participant.fullname.toUpperCase().replace(/ /g, '')}/${result.participant.status.toUpperCase()}/${result.participant.schoolLevel || 'UMUM'}/${result.subject.replace(/ /g, '')}/${dateStr}/${randomCode}/PERGUNU-STB`;
        
        // Update certificate content
        document.getElementById('certificate-name').textContent = result.participant.fullname;
        document.getElementById('certificate-score').textContent = result.score;
        document.getElementById('certificate-date').textContent = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        document.getElementById('certificate-code').textContent = certificateCode;
        
        // Set motivational message
        let message = '';
        if (result.score >= 90) {
            message = settings.motivationalMessages.excellent;
        } else if (result.score >= 70) {
            message = settings.motivationalMessages.good;
        } else if (result.score >= 50) {
            message = settings.motivationalMessages.average;
        } else {
            message = settings.motivationalMessages.poor;
        }
        
        document.getElementById('certificate-motivation').textContent = message;
        
        // Handle buttons
        document.getElementById('close-certificate').addEventListener('click', function() {
            playButtonSound();
            certificateContainer.classList.add('animate__fadeOut');
            setTimeout(() => {
                certificateContainer.classList.add('hidden');
            }, 500);
        });
        
        document.getElementById('print-certificate-btn').addEventListener('click', function() {
            playButtonSound();
            window.print();
        });
    }

    // Floating buttons functionality
    document.getElementById('share-btn').addEventListener('click', function() {
        playButtonSound();
        const shareModal = document.querySelector('.share-modal');
        shareModal.classList.remove('hidden');
        document.getElementById('share-url').value = window.location.href;
        
        document.getElementById('close-share').addEventListener('click', function() {
            playButtonSound();
            shareModal.classList.add('hidden');
        });
        
        document.getElementById('copy-url').addEventListener('click', function() {
            playButtonSound();
            const urlInput = document.getElementById('share-url');
            urlInput.select();
            document.execCommand('copy');
            alert('URL berhasil disalin!');
        });
    });
    
    document.getElementById('whatsapp-btn').addEventListener('click', function() {
        playButtonSound();
        window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...`, '_blank');
    });
    
    document.getElementById('question-bank-btn').addEventListener('click', function() {
        playButtonSound();
        const code = prompt('Masukkan Kode Bank Soal:');
        if (code === settings.questionBankCode) {
            showAdminPanel('questions');
        } else if (code) {
            alert('Kode Bank Soal salah.');
        }
    });
    
    document.getElementById('admin-btn').addEventListener('click', function() {
        playButtonSound();
        const code = prompt('Masukkan Kode Kontrol Panel Admin:');
        if (code === settings.adminCode) {
            showAdminPanel('codes');
        } else if (code) {
            alert('Kode Admin salah.');
        }
    });

    // Show admin panel
    function showAdminPanel(activeTab = 'codes') {
        const adminPanel = document.querySelector('.admin-panel');
        adminPanel.classList.remove('hidden');
        
        // Activate the requested tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === activeTab) {
                btn.classList.add('active');
            }
        });
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
            if (content.id === `${activeTab}-tab`) {
                content.classList.add('active');
            }
        });
        
        // Load participants data
        loadParticipantsData();
        
        // Load questions data
        loadQuestionsData();
        
        // Handle tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                playButtonSound();
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(`${this.dataset.tab}-tab`).classList.add('active');
            });
        });
        
        // Handle code changes
        document.getElementById('save-login-code').addEventListener('click', function() {
            playButtonSound();
            const newCode = document.getElementById('new-login-code').value;
            const oldCode = document.getElementById('old-login-code').value;
            
            if (oldCode === settings.loginCode) {
                settings.loginCode = newCode;
                saveSettings();
                alert('Kode login berhasil diubah!');
                document.getElementById('new-login-code').value = '';
                document.getElementById('old-login-code').value = '';
            } else {
                alert('Kode login lama salah.');
            }
        });
        
        document.getElementById('save-cpns-code').addEventListener('click', function() {
            playButtonSound();
            const newCode = document.getElementById('new-cpns-code').value;
            const oldCode = document.getElementById('old-cpns-code').value;
            
            if (oldCode === settings.cpnsCode) {
                settings.cpnsCode = newCode;
                saveSettings();
                alert('Kode CPNS/P3K berhasil diubah!');
                document.getElementById('new-cpns-code').value = '';
                document.getElementById('old-cpns-code').value = '';
            } else {
                alert('Kode CPNS/P3K lama salah.');
            }
        });
        
        document.getElementById('save-question-code').addEventListener('click', function() {
            playButtonSound();
            const newCode = document.getElementById('new-question-code').value;
            const oldCode = document.getElementById('old-question-code').value;
            
            if (oldCode === settings.questionBankCode) {
                settings.questionBankCode = newCode;
                saveSettings();
                alert('Kode Bank Soal berhasil diubah!');
                document.getElementById('new-question-code').value = '';
                document.getElementById('old-question-code').value = '';
            } else {
                alert('Kode Bank Soal lama salah.');
            }
        });
        
        document.getElementById('save-admin-code').addEventListener('click', function() {
            playButtonSound();
            const newCode = document.getElementById('new-admin-code').value;
            const oldCode = document.getElementById('old-admin-code').value;
            
            if (oldCode === settings.adminCode) {
                settings.adminCode = newCode;
                saveSettings();
                alert('Kode Admin berhasil diubah!');
                document.getElementById('new-admin-code').value = '';
                document.getElementById('old-admin-code').value = '';
            } else {
                alert('Kode Admin lama salah.');
            }
        });
        
        // Handle question bank
        document.getElementById('add-question').addEventListener('click', function() {
            playButtonSound();
            document.querySelector('.question-form').classList.remove('hidden');
            document.querySelector('.ai-generate-form').classList.add('hidden');
        });
        
        document.getElementById('ai-generate').addEventListener('click', function() {
            playButtonSound();
            document.querySelector('.ai-generate-form').classList.remove('hidden');
            document.querySelector('.question-form').classList.add('hidden');
        });
        
        document.getElementById('cancel-question').addEventListener('click', function() {
            playButtonSound();
            document.querySelector('.question-form').classList.add('hidden');
        });
        
        document.getElementById('cancel-ai').addEventListener('click', function() {
            playButtonSound();
            document.querySelector('.ai-generate-form').classList.add('hidden');
        });
        
        document.getElementById('save-question').addEventListener('click', function() {
            playButtonSound();
            const category = document.getElementById('question-category').value;
            const level = document.getElementById('question-level').value;
            const text = document.getElementById('question-text').value.trim();
            const correctAnswer = document.getElementById('correct-answer').value;
            const explanation = document.getElementById('explanation-text').value.trim();
            
            if (!text) {
                alert('Pertanyaan tidak boleh kosong.');
                return;
            }
            
            // Get options
            const options = {};
            ['A', 'B', 'C', 'D', 'E'].forEach(opt => {
                const optionValue = document.querySelector(`.option[data-option="${opt}"]`).value.trim();
                if (optionValue) {
                    options[`option${opt}`] = optionValue;
                }
            });
            
            if (Object.keys(options).length < 2) {
                alert('Minimal harus ada 2 pilihan jawaban.');
                return;
            }
            
            if (!correctAnswer || !options[`option${correctAnswer}`]) {
                alert('Pilih jawaban yang benar dari pilihan yang tersedia.');
                return;
            }
            
            // Create question object
            const question = {
                id: Date.now().toString(),
                category,
                level,
                text,
                ...options,
                correctAnswer,
                explanation,
                createdAt: new Date().toISOString()
            };
            
            // Handle image upload if any
            const imageInput = document.getElementById('question-image');
            if (imageInput.files.length > 0) {
                const file = imageInput.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    question.image = e.target.result;
                    saveQuestion(question);
                };
                
                reader.readAsDataURL(file);
            } else {
                saveQuestion(question);
            }
        });
        
        function saveQuestion(question) {
            let questions = JSON.parse(localStorage.getItem('questions')) || [];
            questions.push(question);
            localStorage.setItem('questions', JSON.stringify(questions));
            
            alert('Soal berhasil disimpan!');
            document.querySelector('.question-form').classList.add('hidden');
            document.getElementById('question-form').reset();
            loadQuestionsData();
        }
        
        document.getElementById('generate-questions').addEventListener('click', function() {
            playButtonSound();
            const prompt = document.getElementById('ai-prompt').value.trim();
            const apiKey = document.getElementById('ai-api-key').value.trim();
            
            if (!prompt) {
                alert('Prompt tidak boleh kosong.');
                return;
            }
            
            if (!apiKey) {
                alert('API Key tidak boleh kosong.');
                return;
            }
            
            // Here you would call your AI API
            // This is just a placeholder - you'll need to replace with actual API call
            alert('Fitur ini membutuhkan integrasi dengan API AI. Silakan hubungi developer untuk implementasi lebih lanjut.');
            
            // Example of how it might work:
            /*
            fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'text-davinci-003',
                    prompt: `Buatkan soal pilihan ganda dengan format: Pertanyaan: ...\nA. ...\nB. ...\nC. ...\nD. ...\nJawaban benar: ...\nPenjelasan: ...\n\n${prompt}`,
                    max_tokens: 1000,
                    temperature: 0.7
                })
            })
            .then(response => response.json())
            .then(data => {
                // Parse the response and extract questions
                // This would require custom parsing based on how the AI formats the response
                console.log(data);
                alert('Soal berhasil digenerate! Silakan review dan simpan.');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat menggenerate soal.');
            });
            */
        });
        
        // Handle settings changes
        document.getElementById('save-settings').addEventListener('click', function() {
            playButtonSound();
            settings.greetingText = document.getElementById('greeting-setting').value;
            settings.termsText = document.getElementById('terms-setting').value;
            settings.infoText = document.getElementById('info-setting').value;
            settings.periodicInfo = document.getElementById('periodic-info-setting').value;
            settings.chairmanName = document.getElementById('chairman-setting').value;
            
            saveSettings();
            updateUI();
            alert('Pengaturan berhasil disimpan!');
        });
        
        document.getElementById('save-exam-settings').addEventListener('click', function() {
            playButtonSound();
            settings.examTimer = parseInt(document.getElementById('exam-timer').value);
            settings.questionCount = parseInt(document.getElementById('question-count').value);
            settings.pointValue = parseInt(document.getElementById('point-value').value);
            settings.randomizeQuestions = document.getElementById('randomize-questions').checked;
            
            // Update enabled categories
            for (const category in settings.enabledCategories) {
                const checkbox = document.getElementById(`enable-${category.toLowerCase().replace('_', '-')}`);
                if (checkbox) {
                    settings.enabledCategories[category] = checkbox.checked;
                }
            }
            
            saveSettings();
            alert('Pengaturan ujian berhasil disimpan!');
        });
        
        document.getElementById('save-messages').addEventListener('click', function() {
            playButtonSound();
            settings.motivationalMessages.excellent = document.getElementById('excellent-message').value;
            settings.motivationalMessages.good = document.getElementById('good-message').value;
            settings.motivationalMessages.average = document.getElementById('average-message').value;
            settings.motivationalMessages.poor = document.getElementById('poor-message').value;
            
            saveSettings();
            alert('Pesan motivasi berhasil disimpan!');
        });
        
        // Handle participants export
        document.getElementById('export-participants').addEventListener('click', function() {
            playButtonSound();
            const exportOptions = document.querySelector('.export-options');
            exportOptions.classList.toggle('hidden');
        });
        
        document.querySelectorAll('.export-options button').forEach(btn => {
            btn.addEventListener('click', function() {
                playButtonSound();
                const format = this.dataset.format;
                exportParticipantsData(format);
            });
        });
        
        // Close admin panel
        document.getElementById('close-admin').addEventListener('click', function() {
            playButtonSound();
            adminPanel.classList.add('animate__fadeOut');
            setTimeout(() => {
                adminPanel.classList.add('hidden');
            }, 500);
        });
    }

    // Load participants data
    function loadParticipantsData() {
        const participants = JSON.parse(localStorage.getItem('participants')) || [];
        const results = JSON.parse(localStorage.getItem('examResults')) || [];
        
        const tableBody = document.querySelector('#participants-table tbody');
        tableBody.innerHTML = '';
        
        participants.forEach((participant, index) => {
            const result = results.find(r => r.participant.fullname === participant.fullname && r.participant.timestamp === participant.timestamp);
            
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${participant.fullname}</td>
                <td>${participant.status}</td>
                <td>${participant.purpose}</td>
                <td>${new Date(participant.timestamp).toLocaleDateString('id-ID')}</td>
                <td>${result ? result.score + '%' : '-'}</td>
                <td>${result ? '<i class="fas fa-certificate"></i>' : '-'}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }

    // Load questions data
    function loadQuestionsData() {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        
        const tableBody = document.querySelector('#questions-table tbody');
        tableBody.innerHTML = '';
        
        questions.forEach((question, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${question.text.length > 50 ? question.text.substring(0, 50) + '...' : question.text}</td>
                <td>${question.category}</td>
                <td>${question.level}</td>
                <td class="action-buttons">
                    <button class="action-btn edit-btn" data-id="${question.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" data-id="${question.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Add event listeners to action buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                playButtonSound();
                const questionId = this.dataset.id;
                editQuestion(questionId);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                playButtonSound();
                const questionId = this.dataset.id;
                if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
                    deleteQuestion(questionId);
                }
            });
        });
    }

    // Edit question
    function editQuestion(questionId) {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        const question = questions.find(q => q.id === questionId);
        if (!question) return;
        
        // Fill the form with question data
        document.getElementById('question-category').value = question.category;
        document.getElementById('question-level').value = question.level;
        document.getElementById('question-text').value = question.text;
        
        ['A', 'B', 'C', 'D', 'E'].forEach(opt => {
            if (question[`option${opt}`]) {
                document.querySelector(`.option[data-option="${opt}"]`).value = question[`option${opt}`];
            }
        });
        
        document.getElementById('correct-answer').value = question.correctAnswer;
        document.getElementById('explanation-text').value = question.explanation || '';
        
        // Show the form
        document.querySelector('.question-form').classList.remove('hidden');
        
        // Change save button behavior to update instead of create
        const saveBtn = document.getElementById('save-question');
        saveBtn.textContent = 'Update Soal';
        saveBtn.onclick = function() {
            playButtonSound();
            
            // Update question data
            question.category = document.getElementById('question-category').value;
            question.level = document.getElementById('question-level').value;
            question.text = document.getElementById('question-text').value.trim();
            question.correctAnswer = document.getElementById('correct-answer').value;
            question.explanation = document.getElementById('explanation-text').value.trim();
            
            // Update options
            ['A', 'B', 'C', 'D', 'E'].forEach(opt => {
                const optionValue = document.querySelector(`.option[data-option="${opt}"]`).value.trim();
                if (optionValue) {
                    question[`option${opt}`] = optionValue;
                } else {
                    delete question[`option${opt}`];
                }
            });
            
            // Handle image upload if any
            const imageInput = document.getElementById('question-image');
            if (imageInput.files.length > 0) {
                const file = imageInput.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    question.image = e.target.result;
                    updateQuestion(question);
                };
                
                reader.readAsDataURL(file);
            } else {
                updateQuestion(question);
            }
        };
    }

    // Update question
    function updateQuestion(updatedQuestion) {
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions = questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q);
        localStorage.setItem('questions', JSON.stringify(questions));
        
        alert('Soal berhasil diperbarui!');
        document.querySelector('.question-form').classList.add('hidden');
        document.getElementById('question-form').reset();
        loadQuestionsData();
        
        // Reset save button behavior
        const saveBtn = document.getElementById('save-question');
        saveBtn.textContent = 'Simpan Soal';
        saveBtn.onclick = function() {
            // Original save functionality
        };
    }

    // Delete question
    function deleteQuestion(questionId) {
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions = questions.filter(q => q.id !== questionId);
        localStorage.setItem('questions', JSON.stringify(questions));
        
        loadQuestionsData();
    }

    // Export participants data
    function exportParticipantsData(format) {
        const participants = JSON.parse(localStorage.getItem('participants')) || [];
        const results = JSON.parse(localStorage.getItem('examResults')) || [];
        
        if (participants.length === 0) {
            alert('Tidak ada data peserta yang bisa diexport.');
            return;
        }
        
        // Combine participant data with their results
        const data = participants.map(participant => {
            const result = results.find(r => r.participant.fullname === participant.fullname && r.participant.timestamp === participant.timestamp);
            return {
                ...participant,
                result: result || null
            };
        });
        
        switch (format) {
            case 'excel':
                exportToExcel(data);
                break;
            case 'csv':
                exportToCSV(data);
                break;
            case 'pdf':
                exportToPDF(data);
                break;
            case 'print':
                printData(data);
                break;
        }
    }

    // Export to Excel
    function exportToExcel(data) {
        // This would require a library like SheetJS
        alert('Fitur export Excel membutuhkan integrasi dengan library SheetJS. Silakan hubungi developer untuk implementasi lebih lanjut.');
    }

    // Export to CSV
    function exportToCSV(data) {
        let csv = 'Nama,Status,Tujuan,Tanggal,Sekolah/NIS/WA/Email,Score,Jawaban Benar,Jawaban Salah,Tidak Dijawab\n';
        
        data.forEach(item => {
            const row = [
                `"${item.fullname}"`,
                item.status,
                item.purpose,
                new Date(item.timestamp).toLocaleDateString('id-ID'),
                item.status === 'pelajar' ? `${item.school} (${item.studentId})` : `${item.whatsapp} / ${item.email}`,
                item.result ? item.result.score + '%' : '-',
                item.result ? item.result.correctAnswers : '-',
                item.result ? item.result.wrongAnswers : '-',
                item.result ? item.result.unanswered : '-'
            ];
            
            csv += row.join(',') + '\n';
        });
        
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `peserta-ujian-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
    }

    // Export to PDF
    function exportToPDF(data) {
        // This would require a library like jsPDF
        alert('Fitur export PDF membutuhkan integrasi dengan library jsPDF. Silakan hubungi developer untuk implementasi lebih lanjut.');
    }

    // Print data
    function printData(data) {
        let printContent = `
            <h1>Data Peserta Ujian</h1>
            <p>Total: ${data.length} peserta</p>
            <table border="1" cellpadding="5" cellspacing="0" style="width:100%;border-collapse:collapse;">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Status</th>
                        <th>Tujuan</th>
                        <th>Tanggal</th>
                        <th>Detail</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        data.forEach((item, index) => {
            printContent += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.fullname}</td>
                    <td>${item.status}</td>
                    <td>${item.purpose}</td>
                    <td>${new Date(item.timestamp).toLocaleDateString('id-ID')}</td>
                    <td>${item.status === 'pelajar' ? `${item.school} (${item.studentId})` : `${item.whatsapp} / ${item.email}`}</td>
                    <td>${item.result ? item.result.score + '%' : '-'}</td>
                </tr>
            `;
        });
        
        printContent += `
                </tbody>
            </table>
            <p style="text-align:right;margin-top:20px;">Dicetak pada: ${new Date().toLocaleString('id-ID')}</p>
        `;
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Data Peserta Ujian</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    ${printContent}
                    <script>
                        window.onload = function() {
                            window.print();
                            window.close();
                        };
                    </script>
                </body>
            </html>
        `);
    }

    // Audio functions
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
        audio.currentTime = 0;
        audio.play();
    }
}
