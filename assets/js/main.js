// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi partikel background
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Main App Logic
    const app = {
        currentScreen: 'opening',
        participantData: {},
        examData: {},
        results: {},
        questions: [],
        currentQuestionIndex: 0,
        answeredQuestions: [],
        unansweredQuestions: [],
        timer: null,
        timeLeft: 120 * 60, // 120 menit dalam detik
        adminSettings: {
            loginCode: '12345',
            cpnsCode: 'OPENLOCK-1945',
            bankCode: 'OPENLOCK-1926',
            adminCode: '65614222',
            timerMinutes: 120,
            pointsPerQuestion: 1,
            questionCount: 10,
            randomizeQuestions: true,
            greetingText: 'Selamat Datang di Ujian Online PERGUNU Situbondo',
            periodicInfoText: 'Informasi penting akan ditampilkan di sini oleh admin.',
            chairmanName: 'Moh. Nuril Hudha, S.Pd., M.Si.',
            motivations: {
                '90-100': 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.',
                '80-89': 'Hasil yang sangat baik! Anda telah menguasai sebagian besar materi dengan baik.',
                '70-79': 'Hasil yang baik! Terus tingkatkan pemahaman Anda untuk hasil yang lebih baik.',
                '60-69': 'Anda sudah cukup baik, tetapi masih perlu meningkatkan pemahaman materi.',
                'below-60': 'Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.'
            }
        },

        init: function() {
            this.loadQuestions();
            this.loadAdminSettings();
            this.setupEventListeners();
            this.playOpeningAudio();
        },

        playOpeningAudio: function() {
            const audio = document.getElementById('opening-audio');
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Autoplay prevented:', e));
        },

        loadQuestions: function() {
    // Contoh soal untuk semua kategori
    this.questions = [
        // Soal Agama SD
        {
            id: 1,
            subject: 'agama',
            level: 'sd',
            question: 'Berapa jumlah Rukun Islam?',
            options: {
                A: '4',
                B: '5',
                C: '6',
                D: '7',
                E: '8'
            },
            correctAnswer: 'B',
            explanation: 'Rukun Islam ada 5 yaitu: Syahadat, Shalat, Zakat, Puasa, dan Haji.'
        },
        
        // Soal PPKN SMP
        {
            id: 2,
            subject: 'ppkn',
            level: 'smp',
            question: 'Pancasila sebagai dasar negara tercantum dalam pembukaan UUD 1945 alinea keberapa?',
            options: {
                A: '1',
                B: '2',
                C: '3',
                D: '4',
                E: 'Tidak tercantum'
            },
            correctAnswer: 'D',
            explanation: 'Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat.'
        },
        
        // Soal IPA SMA
        {
            id: 3,
            subject: 'ipa',
            level: 'sma',
            question: 'Proses fotosintesis pada tumbuhan menghasilkan?',
            options: {
                A: 'Oksigen dan air',
                B: 'Karbondioksida dan glukosa',
                C: 'Oksigen dan glukosa',
                D: 'Air dan karbondioksida',
                E: 'Glukosa dan protein'
            },
            correctAnswer: 'C',
            explanation: 'Fotosintesis mengubah karbondioksida dan air menjadi glukosa dan oksigen dengan bantuan sinar matahari.'
        },
        
        // Soal Matematika SD
        {
            id: 4,
            subject: 'matematika',
            level: 'sd',
            question: 'Hasil dari 125 + 75 adalah?',
            options: {
                A: '175',
                B: '185',
                C: '195',
                D: '200',
                E: '210'
            },
            correctAnswer: 'D',
            explanation: '125 + 75 = 200'
        },
        
        // Soal Ujian Logika Umum
        {
            id: 5,
            subject: 'ujian-logika',
            level: 'umum',
            question: 'Jika semua A adalah B dan beberapa B adalah C, maka:',
            options: {
                A: 'Semua A adalah C',
                B: 'Beberapa A adalah C',
                C: 'Tidak ada A yang C',
                D: 'Beberapa C adalah A',
                E: 'Tidak dapat disimpulkan'
            },
            correctAnswer: 'B',
            explanation: 'Karena beberapa B adalah C dan semua A adalah B, maka beberapa A pasti adalah C.'
        },
        
        // Soal Ujian CPNS
        {
            id: 6,
            subject: 'ujian-cpns',
            level: 'umum',
            question: 'Yang bukan termasuk asas-asas umum pemerintahan yang baik adalah:',
            options: {
                A: 'Asas kepastian hukum',
                B: 'Asas keseimbangan',
                C: 'Asas kesopanan',
                D: 'Asas ketidakberpihakan',
                E: 'Asas kecurangan'
            },
            correctAnswer: 'E',
            explanation: 'Asas kecurangan bukan termasuk asas-asas umum pemerintahan yang baik.'
        }
    ];
    
    // Simpan ke localStorage untuk pertama kali
    if (!localStorage.getItem('questions')) {
        localStorage.setItem('questions', JSON.stringify(this.questions));
    }
},
                // Soal Ujian Logika
                {
                    id: 4,
                    subject: 'ujian-logika',
                    level: 'umum',
                    question: 'Jika semua A adalah B dan beberapa B adalah C, maka:',
                    options: {
                        A: 'Semua A adalah C',
                        B: 'Beberapa A adalah C',
                        C: 'Tidak ada A yang C',
                        D: 'Beberapa C adalah A',
                        E: 'Tidak dapat disimpulkan'
                    },
                    correctAnswer: 'B',
                    explanation: 'Karena beberapa B adalah C dan semua A adalah B, maka beberapa A pasti adalah C.'
                },
                // Soal Ujian CPNS
                {
                    id: 5,
                    subject: 'ujian-cpns',
                    level: 'umum',
                    question: 'Yang bukan termasuk asas-asas umum pemerintahan yang baik adalah:',
                    options: {
                        A: 'Asas kepastian hukum',
                        B: 'Asas keseimbangan',
                        C: 'Asas kesopanan',
                        D: 'Asas ketidakberpihakan',
                        E: 'Asas kecurangan'
                    },
                    correctAnswer: 'E',
                    explanation: 'Asas kecurangan bukan termasuk asas-asas umum pemerintahan yang baik.'
                }
            ];
        },

        loadAdminSettings: function() {
            // Coba muat pengaturan dari localStorage
            const savedSettings = localStorage.getItem('adminSettings');
            if (savedSettings) {
                this.adminSettings = JSON.parse(savedSettings);
            }
            
            // Terapkan pengaturan ke UI
            document.getElementById('greeting-text').textContent = this.adminSettings.greetingText;
            document.getElementById('periodic-info').querySelector('p').textContent = this.adminSettings.periodicInfoText;
        },

        saveAdminSettings: function() {
            localStorage.setItem('adminSettings', JSON.stringify(this.adminSettings));
        },

        setupEventListeners: function() {
            // Login Screen
            document.getElementById('login-btn').addEventListener('click', () => this.handleLogin());
            
            // Terms Screen
            document.getElementById('agree-terms').addEventListener('change', (e) => {
                document.getElementById('continue-btn').disabled = !e.target.checked;
            });
            document.getElementById('continue-btn').addEventListener('click', () => this.showScreen('participant-form'));
            
            // Participant Form
            document.querySelectorAll('input[name="status"]').forEach(radio => {
                radio.addEventListener('change', (e) => this.toggleParticipantFields(e.target.value));
            });
            document.getElementById('general-purpose').addEventListener('change', (e) => {
                this.toggleCPNSLicenseField(e.target.value === 'ujian-cpns');
            });
            document.getElementById('participant-data').addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveParticipantData();
            });
            document.getElementById('get-location').addEventListener('click', () => this.getLocation());
            
            // Exam Selection
            document.getElementById('school-level').addEventListener('change', (e) => {
                this.toggleGradeLevels(e.target.value);
            });
            document.querySelectorAll('.btn-subject').forEach(btn => {
                btn.addEventListener('click', (e) => this.selectSubject(e));
            });
            document.getElementById('start-exam-btn').addEventListener('click', () => this.startExam());
            
            // Exam Screen
            document.querySelectorAll('.option').forEach(option => {
                option.addEventListener('click', (e) => this.selectAnswer(e));
            });
            document.getElementById('finish-exam-btn').addEventListener('click', () => this.finishExam());
            document.getElementById('skip-question-btn').addEventListener('click', () => this.skipQuestion());
            document.getElementById('unanswered-btn').addEventListener('click', () => this.showUnanswered());
            
            // Results Screen
            document.getElementById('view-certificate-btn').addEventListener('click', () => this.showCertificate());
            document.getElementById('retake-exam-btn').addEventListener('click', () => this.retakeExam());
            
            // Certificate Screen
            document.getElementById('print-certificate-btn').addEventListener('click', () => this.printCertificate());
            document.getElementById('back-to-results-btn').addEventListener('click', () => this.showScreen('results-screen'));
            
            // Admin Panel
            document.querySelectorAll('.tab-btn').forEach(tab => {
                tab.addEventListener('click', (e) => this.switchAdminTab(e));
            });
            
            // Save codes
            document.getElementById('save-login-code').addEventListener('click', () => this.saveCode('login'));
            document.getElementById('save-cpns-code').addEventListener('click', () => this.saveCode('cpns'));
            document.getElementById('save-question-code').addEventListener('click', () => this.saveCode('question'));
            document.getElementById('save-admin-code').addEventListener('click', () => this.saveCode('admin'));
            
            // Save settings
            document.getElementById('save-exam-settings').addEventListener('click', () => this.saveExamSettings());
            document.getElementById('save-content-changes').addEventListener('click', () => this.saveContentChanges());
            document.getElementById('save-motivations').addEventListener('click', () => this.saveMotivations());
            
            // Questions Bank
            document.getElementById('add-question-btn').addEventListener('click', () => this.openQuestionModal());
            document.getElementById('ai-question-btn').addEventListener('click', () => this.openAIModal());
            document.getElementById('save-question-btn').addEventListener('click', () => this.saveQuestion());
            document.getElementById('cancel-question-btn').addEventListener('click', () => this.closeModal('question-modal'));
            document.getElementById('generate-questions-btn').addEventListener('click', () => this.generateQuestionsWithAI());
            document.getElementById('cancel-ai-btn').addEventListener('click', () => this.closeModal('ai-modal'));
            
            // Floating buttons
            document.getElementById('share-btn').addEventListener('click', () => this.openModal('share-modal'));
            document.getElementById('whatsapp-btn').addEventListener('click', () => this.openWhatsApp());
            document.getElementById('questions-bank-btn').addEventListener('click', () => this.openBankAccessModal());
            document.getElementById('admin-btn').addEventListener('click', () => this.openAdminAccessModal());
            
            // Modals
            document.querySelectorAll('.close-modal').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const modal = e.target.closest('.modal');
                    this.closeModal(modal.id);
                });
            });
            document.getElementById('copy-link-btn').addEventListener('click', () => this.copyToClipboard());
            document.getElementById('submit-bank-code').addEventListener('click', () => this.accessBankQuestions());
            document.getElementById('cancel-bank-access').addEventListener('click', () => this.closeModal('bank-access-modal'));
            document.getElementById('submit-admin-code').addEventListener('click', () => this.accessAdminPanel());
            document.getElementById('cancel-admin-access').addEventListener('click', () => this.closeModal('admin-access-modal'));
        },

        handleLogin: function() {
            const loginCode = document.getElementById('login-code').value;
            if (loginCode === this.adminSettings.loginCode) {
                this.showScreen('terms-container');
                this.playButtonSound();
            } else {
                alert('Kode login salah! Silakan coba lagi.');
            }
        },

        showScreen: function(screenId) {
            // Sembunyikan semua layar
            document.querySelectorAll('.opening-screen, .terms-container, .participant-form, .exam-selection, .exam-screen, .results-screen, .certificate-screen, .admin-panel').forEach(el => {
                el.classList.add('hidden');
            });
            
            // Tampilkan layar yang diminta
            document.querySelector(`.${screenId}`).classList.remove('hidden');
            
            // Tambahkan animasi
            if (screenId === 'terms-container') {
                document.querySelector('.terms-content').classList.add('animate__slideInRight');
            } else if (screenId === 'participant-form') {
                document.querySelector('.form-container').classList.add('animate__slideInLeft');
            } else if (screenId === 'exam-selection') {
                document.querySelector('.selection-container').classList.add('animate__zoomIn');
            } else if (screenId === 'results-screen') {
                document.querySelector('.results-container').classList.add('animate__fadeIn');
            }
            
            // Update current screen
            this.currentScreen = screenId.replace('-container', '').replace('-form', '').replace('-selection', '').replace('-screen', '');
            
            this.playButtonSound();
        },

        toggleParticipantFields: function(status) {
            if (status === 'pelajar') {
                document.getElementById('student-fields').classList.remove('hidden');
                document.getElementById('general-fields').classList.add('hidden');
                this.toggleCPNSLicenseField(false);
            } else {
                document.getElementById('student-fields').classList.add('hidden');
                document.getElementById('general-fields').classList.remove('hidden');
            }
        },

        toggleCPNSLicenseField: function(show) {
            if (show) {
                document.getElementById('cpns-license-field').classList.remove('hidden');
            } else {
                document.getElementById('cpns-license-field').classList.add('hidden');
            }
        },

        getLocation: function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => this.showAddressFromCoords(position.coords),
                    (error) => alert('Gagal mendapatkan lokasi: ' + error.message)
                );
            } else {
                alert('Geolocation tidak didukung oleh browser Anda.');
            }
        },

        showAddressFromCoords: function(coords) {
            // Ini adalah simulasi - dalam aplikasi nyata, Anda akan menggunakan API seperti Google Maps Geocoding
            const addressInput = document.getElementById('address');
            addressInput.value = 'Jl. Raya Situbondo No. 123, Situbondo, Jawa Timur';
            
            // Simpan koordinat ke data peserta
            this.participantData.coords = coords;
        },

        saveParticipantData: function() {
            // Validasi form
            const form = document.getElementById('participant-data');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            // Validasi khusus untuk CPNS
            if (this.participantData.status === 'umum' && 
                this.participantData.purpose === 'ujian-cpns' && 
                document.getElementById('license-code').value !== this.adminSettings.cpnsCode) {
                alert('Kode lisensi ujian CPNS/P3K salah!');
                return;
            }
            
            // Kumpulkan data peserta
            this.participantData = {
                fullname: document.getElementById('fullname').value,
                status: document.querySelector('input[name="status"]:checked').value,
                purpose: this.participantData.status === 'pelajar' ? 
                    document.getElementById('student-purpose').value : 
                    document.getElementById('general-purpose').value,
                timestamp: new Date().toISOString()
            };
            
            if (this.participantData.status === 'pelajar') {
                this.participantData.school = document.getElementById('school').value;
                this.participantData.nis = document.getElementById('nis').value;
                this.participantData.schoolLevel = document.getElementById('school-level').value;
            } else {
                this.participantData.address = document.getElementById('address').value;
                this.participantData.whatsapp = document.getElementById('whatsapp').value;
                this.participantData.email = document.getElementById('email').value;
            }
            
            // Simpan ke localStorage (simulasi database)
            this.saveParticipantToStorage();
            
            // Lanjut ke pemilihan ujian
            this.showScreen('exam-selection');
            this.setupExamSelection();
        },

        saveParticipantToStorage: function() {
            let participants = JSON.parse(localStorage.getItem('participants')) || [];
            participants.push(this.participantData);
            localStorage.setItem('participants', JSON.stringify(participants));
        },

        setupExamSelection: function() {
            // Tampilkan bidang yang sesuai berdasarkan status peserta
            if (this.participantData.status === 'pelajar') {
                document.getElementById('student-exams').classList.remove('hidden');
                document.getElementById('general-exams').classList.add('hidden');
                this.toggleGradeLevels(this.participantData.schoolLevel);
            } else {
                document.getElementById('student-exams').classList.add('hidden');
                document.getElementById('general-exams').classList.remove('hidden');
            }
            
            // Reset pilihan subject
            document.querySelectorAll('.btn-subject').forEach(btn => {
                btn.classList.remove('selected');
            });
            document.getElementById('start-exam-btn').classList.add('hidden');
        },

        toggleGradeLevels: function(level) {
            document.querySelectorAll('.grade-level').forEach(el => {
                el.classList.add('hidden');
            });
            
            if (level === 'sd') {
                document.getElementById('sd-level').classList.remove('hidden');
            } else if (level === 'smp') {
                document.getElementById('smp-level').classList.remove('hidden');
            } else if (level === 'sma') {
                document.getElementById('sma-level').classList.remove('hidden');
            }
        },

        selectSubject: function(e) {
            // Toggle selected class
            document.querySelectorAll('.btn-subject').forEach(btn => {
                btn.classList.remove('selected');
            });
            e.currentTarget.classList.add('selected');
            
            // Simpan pilihan subject
            this.examData.subject = e.currentTarget.dataset.subject;
            
            // Tampilkan tombol mulai ujian
            document.getElementById('start-exam-btn').classList.remove('hidden');
            
            this.playButtonSound();
        },

        startExam: function() {
            if (!this.examData.subject) {
                alert('Silakan pilih jenis ujian terlebih dahulu!');
                return;
            }
            
            // Siapkan data ujian
            this.examData.startTime = new Date().toISOString();
            this.examData.questions = this.getQuestionsForExam();
            this.examData.totalQuestions = this.examData.questions.length;
            
            // Reset jawaban
            this.answeredQuestions = [];
            this.unansweredQuestions = [...Array(this.examData.questions.length).keys()]; // [0, 1, 2, ...]
            
            // Mulai timer
            this.timeLeft = this.adminSettings.timerMinutes * 60;
            this.startTimer();
            
            // Tampilkan soal pertama
            this.currentQuestionIndex = 0;
            this.showQuestion();
            
            // Tampilkan layar ujian
            this.showScreen('exam-screen');
        },

        getQuestionsForExam: function() {
            // Filter soal berdasarkan subject dan level
            let filteredQuestions = this.questions.filter(q => 
                q.subject === this.examData.subject && 
                (q.level === this.participantData.schoolLevel || q.level === 'umum')
            );
            
            // Acak urutan jika diatur
            if (this.adminSettings.randomizeQuestions) {
                filteredQuestions = this.shuffleArray(filteredQuestions);
            }
            
            // Batasi jumlah soal sesuai pengaturan
            return filteredQuestions.slice(0, this.adminSettings.questionCount);
        },

        shuffleArray: function(array) {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        },

        startTimer: function() {
            // Hentikan timer sebelumnya jika ada
            if (this.timer) {
                clearInterval(this.timer);
            }
            
            // Update timer setiap detik
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateTimerDisplay();
                
                // Cek jika waktu habis
                if (this.timeLeft <= 0) {
                    clearInterval(this.timer);
                    this.finishExam();
                }
                
                // Tampilkan peringatan 10 menit terakhir
                if (this.timeLeft === 10 * 60) {
                    this.showTimeWarning();
                }
                
                // Hilangkan peringatan di menit terakhir
                if (this.timeLeft === 60) {
                    document.querySelector('.time-warning').classList.add('hidden');
                }
            }, 1000);
        },

        updateTimerDisplay: function() {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            document.getElementById('timer').textContent = 
                `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            // Perbesar timer di 10 menit terakhir
            const timerElement = document.getElementById('timer');
            if (this.timeLeft <= 10 * 60) {
                timerElement.style.fontSize = '24px';
                timerElement.style.color = '#ff6b6b';
            } else {
                timerElement.style.fontSize = '16px';
                timerElement.style.color = '';
            }
        },

        showTimeWarning: function() {
            const warningElement = document.querySelector('.time-warning');
            warningElement.classList.remove('hidden');
            
            // Hilangkan warning setelah beberapa detik
            setTimeout(() => {
                warningElement.classList.add('hidden');
            }, 10000);
        },

        showQuestion: function() {
            const question = this.examData.questions[this.currentQuestionIndex];
            if (!question) return;
            
            // Tampilkan teks pertanyaan
            document.getElementById('question-text').textContent = question.question;
            
            // Tampilkan pilihan jawaban
            const optionsContainer = document.querySelector('.options-container');
            optionsContainer.innerHTML = '';
            
            for (const [key, value] of Object.entries(question.options)) {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.dataset.option = key;
                
                optionElement.innerHTML = `
                    <span class="option-letter">${key}</span>
                    <span class="option-text">${value}</span>
                `;
                
                optionElement.addEventListener('click', (e) => this.selectAnswer(e));
                optionsContainer.appendChild(optionElement);
            }
            
            // Sembunyikan penjelasan
            document.querySelector('.answer-explanation').classList.add('hidden');
            
            // Update progress
            this.updateProgress();
        },

        selectAnswer: function(e) {
            const selectedOption = e.currentTarget.dataset.option;
            const question = this.examData.questions[this.currentQuestionIndex];
            
            // Tandai sebagai sudah dijawab
            this.answeredQuestions.push(this.currentQuestionIndex);
            this.unansweredQuestions = this.unansweredQuestions.filter(i => i !== this.currentQuestionIndex);
            
            // Tandai jawaban benar/salah
            const isCorrect = selectedOption === question.correctAnswer;
            
            // Tambahkan class CSS
            e.currentTarget.classList.add(isCorrect ? 'correct' : 'wrong');
            
            // Mainkan suara
            this.playAnswerSound(isCorrect);
            
            // Tampilkan penjelasan
            const explanationElement = document.querySelector('.answer-explanation');
            document.getElementById('explanation-text').textContent = question.explanation;
            explanationElement.classList.remove('hidden');
            
            // Nonaktifkan semua opsi
            document.querySelectorAll('.option').forEach(opt => {
                opt.style.pointerEvents = 'none';
                
                // Tandai jawaban yang benar
                if (opt.dataset.option === question.correctAnswer) {
                    opt.classList.add('correct');
                }
            });
            
            // Simpan jawaban
            question.userAnswer = selectedOption;
            question.isCorrect = isCorrect;
        },

        skipQuestion: function() {
            // Pindah ke soal berikutnya
            this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.examData.questions.length;
            this.showQuestion();
            this.playButtonSound();
        },

        showUnanswered: function() {
            if (this.unansweredQuestions.length === 0) {
                alert('Tidak ada soal yang belum dijawab!');
                return;
            }
            
            // Pindah ke soal yang belum dijawab pertama
            this.currentQuestionIndex = this.unansweredQuestions[0];
            this.showQuestion();
            this.playButtonSound();
        },

        finishExam: function() {
            // Hentikan timer
            clearInterval(this.timer);
            
            // Hitung hasil
            this.calculateResults();
            
            // Tampilkan hasil
            this.showResults();
            
            // Simpan hasil
            this.saveResults();
        },

        calculateResults: function() {
            const totalQuestions = this.examData.questions.length;
            let correctAnswers = 0;
            
            this.examData.questions.forEach(q => {
                if (q.isCorrect) correctAnswers++;
            });
            
            const wrongAnswers = this.answeredQuestions.length - correctAnswers;
            const score = Math.round((correctAnswers / totalQuestions) * 100);
            
            this.results = {
                totalQuestions,
                correctAnswers,
                wrongAnswers,
                unanswered: totalQuestions - this.answeredQuestions.length,
                score,
                endTime: new Date().toISOString()
            };
        },

        showResults: function() {
            // Tampilkan statistik
            document.getElementById('total-questions').textContent = this.results.totalQuestions;
            document.getElementById('correct-answers').textContent = this.results.correctAnswers;
            document.getElementById('wrong-answers').textContent = this.results.wrongAnswers;
            document.getElementById('score').textContent = this.results.score;
            
            // Tampilkan pesan motivasi
            let motivationKey;
            if (this.results.score >= 90) motivationKey = '90-100';
            else if (this.results.score >= 80) motivationKey = '80-89';
            else if (this.results.score >= 70) motivationKey = '70-79';
            else if (this.results.score >= 60) motivationKey = '60-69';
            else motivationKey = 'below-60';
            
            document.getElementById('motivation-text').textContent = 
                this.adminSettings.motivations[motivationKey];
            
            // Tampilkan layar hasil
            this.showScreen('results-screen');
        },

        saveResults: function() {
            // Gabungkan data peserta dan hasil
            const resultData = {
                ...this.participantData,
                ...this.examData,
                ...this.results,
                certificateCode: this.generateCertificateCode()
            };
            
            // Simpan ke localStorage
            let results = JSON.parse(localStorage.getItem('examResults')) || [];
            results.push(resultData);
            localStorage.setItem('examResults', JSON.stringify(results));
        },

        generateCertificateCode: function() {
            const date = new Date();
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
            
            return `${this.participantData.fullname.toUpperCase().replace(/ /g, '')}/${
                this.participantData.status.toUpperCase()}/${
                this.participantData.schoolLevel ? this.participantData.schoolLevel.toUpperCase() : 'UMUM'}/${
                this.examData.subject.toUpperCase()}/${
                day}${month}${year}/${
                randomCode}/PERGUNU-STB`;
        },

        showCertificate: function() {
            // Isi data sertifikat
            document.getElementById('certificate-name').textContent = this.participantData.fullname;
            document.getElementById('certificate-score').textContent = this.results.score;
            document.getElementById('certificate-motivation').textContent = 
                document.getElementById('motivation-text').textContent;
            
            // Format tanggal
            const date = new Date();
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            document.getElementById('certificate-date').textContent = 
                date.toLocaleDateString('id-ID', options);
            
            // Kode sertifikat
            document.getElementById('certificate-code').textContent = this.generateCertificateCode();
            
            // Tampilkan layar sertifikat
            this.showScreen('certificate-screen');
            
            // Mainkan suara applause
            document.getElementById('applause-audio').play();
        },

        printCertificate: function() {
            // Sembunyikan tombol sebelum mencetak
            const buttons = document.querySelector('.certificate-actions');
            buttons.classList.add('hidden');
            
            // Cetak
            window.print();
            
            // Tampilkan kembali tombol setelah mencetak
            setTimeout(() => {
                buttons.classList.remove('hidden');
            }, 500);
        },

        retakeExam: function() {
            // Kembali ke pemilihan ujian
            this.showScreen('exam-selection');
        },

        updateProgress: function() {
            const progress = ((this.currentQuestionIndex + 1) / this.examData.questions.length) * 100;
            document.querySelector('.progress-fill').style.width = `${progress}%`;
            document.getElementById('progress-text').textContent = 
                `Soal ${this.currentQuestionIndex + 1} dari ${this.examData.questions.length}`;
        },

        playButtonSound: function() {
            const audio = document.getElementById('button-audio');
            audio.currentTime = 0;
            audio.play();
        },

        playAnswerSound: function(isCorrect) {
            const audio = document.getElementById(isCorrect ? 'correct-audio' : 'wrong-audio');
            audio.currentTime = 0;
            audio.play();
        },

        // Admin Panel Functions
        switchAdminTab: function(e) {
            const tabId = e.currentTarget.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(tab => {
                tab.classList.remove('active');
            });
            e.currentTarget.classList.add('active');
            
            // Update active content
            document.querySelectorAll('.admin-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        },

        saveCode: function(type) {
            const newCode = document.getElementById(`new-${type}-code`).value;
            const currentCode = document.getElementById(`current-${type}-code`);
            
            if (!newCode) {
                alert('Kode baru tidak boleh kosong!');
                return;
            }
            
            // Update pengaturan
            if (type === 'login') this.adminSettings.loginCode = newCode;
            else if (type === 'cpns') this.adminSettings.cpnsCode = newCode;
            else if (type === 'question') this.adminSettings.bankCode = newCode;
            else if (type === 'admin') this.adminSettings.adminCode = newCode;
            
            // Update tampilan
            currentCode.value = newCode;
            document.getElementById(`new-${type}-code`).value = '';
            
            // Simpan pengaturan
            this.saveAdminSettings();
            
            alert('Kode berhasil diperbarui!');
        },

        saveExamSettings: function() {
            this.adminSettings.timerMinutes = parseInt(document.getElementById('exam-timer').value);
            this.adminSettings.pointsPerQuestion = parseInt(document.getElementById('points-per-question').value);
            this.adminSettings.questionCount = parseInt(document.getElementById('question-count').value);
            this.adminSettings.randomizeQuestions = document.getElementById('randomize-questions').checked;
            
            this.saveAdminSettings();
            alert('Pengaturan ujian berhasil disimpan!');
        },

        saveContentChanges: function() {
            this.adminSettings.greetingText = document.getElementById('edit-greeting-text').value;
            this.adminSettings.periodicInfoText = document.getElementById('edit-periodic-info-text').value;
            this.adminSettings.chairmanName = document.getElementById('edit-chairman-name').value;
            
            // Update tampilan langsung
            document.getElementById('greeting-text').textContent = this.adminSettings.greetingText;
            document.getElementById('periodic-info').querySelector('p').textContent = this.adminSettings.periodicInfoText;
            
            this.saveAdminSettings();
            alert('Perubahan konten berhasil disimpan!');
        },

        saveMotivations: function() {
            this.adminSettings.motivations = {
                '90-100': document.getElementById('motivation-90-100').value,
                '80-89': document.getElementById('motivation-80-89').value,
                '70-79': document.getElementById('motivation-70-79').value,
                '60-69': document.getElementById('motivation-60-69').value,
                'below-60': document.getElementById('motivation-below-60').value
            };
            
            this.saveAdminSettings();
            alert('Pesan motivasi berhasil disimpan!');
        },

        openQuestionModal: function() {
            document.getElementById('modal-title').textContent = 'Tambah Soal Baru';
            document.getElementById('modal-subject').value = '';
            document.getElementById('modal-level').value = '';
            document.getElementById('modal-question').value = '';
            document.getElementById('modal-option-a').value = '';
            document.getElementById('modal-option-b').value = '';
            document.getElementById('modal-option-c').value = '';
            document.getElementById('modal-option-d').value = '';
            document.getElementById('modal-option-e').value = '';
            document.getElementById('modal-correct-answer').value = '';
            document.getElementById('modal-explanation').value = '';
            document.getElementById('modal-image').value = '';
            
            this.openModal('question-modal');
        },

        saveQuestion: function() {
    // Validasi form
    const form = document.getElementById('question-modal');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Buat objek soal baru
    const newQuestion = {
        id: Date.now(), // ID unik
        subject: document.getElementById('modal-subject').value,
        level: document.getElementById('modal-level').value,
        question: document.getElementById('modal-question').value,
        options: {
            A: document.getElementById('modal-option-a').value,
            B: document.getElementById('modal-option-b').value,
            C: document.getElementById('modal-option-c').value,
            D: document.getElementById('modal-option-d').value,
            E: document.getElementById('modal-option-e').value
        },
        correctAnswer: document.getElementById('modal-correct-answer').value,
        explanation: document.getElementById('modal-explanation').value,
        createdAt: new Date().toISOString()
    };
            
            // Handle gambar jika ada
            const imageInput = document.getElementById('modal-image');
            if (imageInput.files.length > 0) {
                // Dalam aplikasi nyata, Anda perlu mengunggah gambar ke server
                newQuestion.image = URL.createObjectURL(imageInput.files[0]);
            }
            
            // Tambahkan ke daftar soal
            this.questions.push(newQuestion);
            let questions = JSON.parse(localStorage.getItem('questions')) || [];

            // Tambahkan soal baru
            questions.push(newQuestion);
            
            // Simpan ke localStorage (simulasi database)
           localStorage.setItem('questions', JSON.stringify(questions));
            
            // Refresh daftar soal
            this.loadQuestionsTable();
            
            // Tutup modal
            this.closeModal('question-modal');
            form.reset();
            
            alert('Soal berhasil disimpan!');
        },

        loadQuestionsTable: function() {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const tableBody = document.querySelector('#bank-questions-table tbody');
    tableBody.innerHTML = '';

    questions.forEach((question, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${question.question.substring(0, 50)}${question.question.length > 50 ? '...' : ''}</td>
            <td>${question.subject.toUpperCase()}</td>
            <td>
                <button class="action-btn edit" data-id="${question.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" data-id="${question.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Tambahkan event listener untuk tombol aksi
    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', (e) => this.editQuestion(e));
    });
    
    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', (e) => this.deleteQuestion(e));
    });
},

        openAIModal: function() {
            this.openModal('ai-modal');
        },

        generateQuestionsWithAI: function() {
            const apiKey = document.getElementById('ai-api-key').value;
            if (!apiKey) {
                alert('Silakan masukkan API Key yang valid!');
                return;
            }
            
            const subject = document.getElementById('ai-subject').value;
            const level = document.getElementById('ai-level').value;
            const topic = document.getElementById('ai-topic').value;
            const difficulty = document.getElementById('ai-difficulty').value;
            const count = document.getElementById('ai-count').value;
            
            // Simulasi generate soal dengan AI
            alert(`Fitur ini akan menggenerate ${count} soal ${subject} tingkat ${level} tentang "${topic}" dengan kesulitan ${difficulty} menggunakan API Key.`);
            
            // Dalam aplikasi nyata, Anda akan melakukan panggilan API ke layanan AI seperti OpenAI
            // Contoh:
            /*
            fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{
                        role: "user",
                        content: `Generate ${count} multiple choice questions about ${topic} for ${level} level with ${difficulty} difficulty. Provide questions, 5 options each, correct answer, and explanation. Format as JSON.`
                    }]
                })
            })
            .then(response => response.json())
            .then(data => {
                // Proses hasil dan tambahkan ke database soal
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            */
            
            // Tutup modal setelah generate
            this.closeModal('ai-modal');
        },

        openModal: function(modalId) {
            document.getElementById(modalId).classList.remove('hidden');
        },

        closeModal: function(modalId) {
            document.getElementById(modalId).classList.add('hidden');
        },

        openWhatsApp: function() {
            const phone = '6285647709114';
            const message = 'Assalamualaikum mas admin, saya mau tanya sesuatu nih…';
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        },

        openBankAccessModal: function() {
            this.openModal('bank-access-modal');
        },

        accessBankQuestions: function() {
            const code = document.getElementById('bank-access-code').value;
            if (code === this.adminSettings.bankCode) {
                this.closeModal('bank-access-modal');
                this.showScreen('admin-panel');
                this.switchToTab('questions-tab');
            } else {
                alert('Kode bank soal salah!');
            }
        },

        openAdminAccessModal: function() {
            this.openModal('admin-access-modal');
        },

        accessAdminPanel: function() {
            const code = document.getElementById('admin-access-code').value;
            if (code === this.adminSettings.adminCode) {
                this.closeModal('admin-access-modal');
                this.showScreen('admin-panel');
            } else {
                alert('Kode admin salah!');
            }
        },

        switchToTab: function(tabId) {
            document.querySelectorAll('.tab-btn').forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.tab === tabId) {
                    tab.classList.add('active');
                }
            });
            
            document.querySelectorAll('.admin-tab-content').forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        },

        copyToClipboard: function() {
            const linkInput = document.getElementById('share-link');
            linkInput.select();
            document.execCommand('copy');
            
            // Beri feedback
            const copyBtn = document.getElementById('copy-link-btn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Tersalin!';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }
    };

    // Jalankan aplikasi
    app.init();
});
