// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi particles.js
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
                    enable: false,
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
        settings: {
            loginCode: '12345',
            cpnsCode: 'OPENLOCK-1945',
            bankSoalCode: 'OPENLOCK-1926',
            adminCode: '65614222',
            greetingText: 'Selamat Datang di Ujian Online Pergunu Situbondo',
            chairmanName: 'Moh. Nuril Hudha, S.Pd., M.Si.',
            motivationTexts: [
                { minScore: 90, text: 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.' },
                { minScore: 80, text: 'Hebat! Anda memiliki pemahaman yang sangat baik tentang materi ini.' },
                { minScore: 70, text: 'Baik! Anda memiliki pemahaman yang cukup tentang materi ini.' },
                { minScore: 60, text: 'Cukup! Anda bisa lebih baik lagi dengan belajar lebih giat.' },
                { minScore: 0, text: 'Jangan menyerah! Teruslah belajar dan tingkatkan kemampuan Anda.' }
            ],
            periodicInfo: 'Informasi berkala akan ditampilkan di sini. Admin dapat mengedit teks ini melalui panel kontrol.',
            examTimer: 120, // menit
            questionPoints: 1,
            questionCount: 10,
            randomizeQuestions: true,
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
        },
        participants: [],

        // Inisialisasi aplikasi
        init: function() {
            this.loadSampleQuestions();
            this.setupEventListeners();
            this.updateGreetingText();
            this.playOpeningAudio();
        },

        // Memuat contoh soal
        loadSampleQuestions: function() {
            // Contoh soal untuk berbagai kategori
            this.questions = {
                agama: [
                    {
                        question: "Siapakah nabi terakhir dalam Islam?",
                        options: ["A. Nabi Musa", "B. Nabi Isa", "C. Nabi Muhammad", "D. Nabi Ibrahim"],
                        correctAnswer: "C",
                        explanation: "Nabi Muhammad SAW adalah nabi terakhir yang diutus Allah SWT."
                    }
                ],
                ppkn: [
                    {
                        question: "Pancasila sebagai dasar negara tercantum dalam?",
                        options: ["A. Pembukaan UUD 1945", "B. Batang Tubuh UUD 1945", "C. Penjelasan UUD 1945", "D. Keputusan Presiden"],
                        correctAnswer: "A",
                        explanation: "Pancasila sebagai dasar negara tercantum dalam alinea keempat Pembukaan UUD 1945."
                    }
                ],
                // Tambahkan contoh soal untuk kategori lainnya...
                ujian_cpns: [
                    {
                        question: "Tes Wawasan Kebangsaan biasanya menguji pengetahuan tentang?",
                        options: ["A. Pancasila", "B. UUD 1945", "C. Bhinneka Tunggal Ika", "D. Semua benar"],
                        correctAnswer: "D",
                        explanation: "Tes Wawasan Kebangsaan menguji pengetahuan tentang Pancasila, UUD 1945, Bhinneka Tunggal Ika, dan NKRI."
                    }
                ]
            };
        },

        // Setup event listeners
        setupEventListeners: function() {
            // Login screen
            document.getElementById('login-btn').addEventListener('click', this.handleLogin.bind(this));
            
            // Terms screen
            document.getElementById('agree-terms').addEventListener('change', function() {
                document.getElementById('continue-btn').disabled = !this.checked;
            });
            document.getElementById('continue-btn').addEventListener('click', this.goToDataForm.bind(this));
            
            // Participant form
            document.querySelectorAll('input[name="status"]').forEach(radio => {
                radio.addEventListener('change', this.toggleParticipantFields.bind(this));
            });
            document.getElementById('participant-form').addEventListener('submit', this.saveParticipantData.bind(this));
            document.getElementById('get-location').addEventListener('click', this.getLocation.bind(this));
            
            // Level selection
            document.querySelectorAll('.level-btn').forEach(btn => {
                btn.addEventListener('click', this.selectLevel.bind(this));
            });
            document.querySelectorAll('.subject-btn').forEach(btn => {
                btn.addEventListener('click', this.selectSubject.bind(this));
            });
            document.getElementById('verify-license').addEventListener('click', this.verifyLicense.bind(this));
            document.getElementById('start-exam-btn').addEventListener('click', this.startExam.bind(this));
            
            // Exam screen
            document.getElementById('finish-exam-btn').addEventListener('click', this.finishExam.bind(this));
            document.getElementById('skip-question-btn').addEventListener('click', this.skipQuestion.bind(this));
            document.getElementById('unanswered-btn').addEventListener('click', this.showUnanswered.bind(this));
            
            // Results screen
            document.getElementById('print-certificate-btn').addEventListener('click', this.showCertificate.bind(this));
            document.getElementById('retake-exam-btn').addEventListener('click', this.retakeExam.bind(this));
            
            // Certificate screen
            document.getElementById('back-to-results-btn').addEventListener('click', this.backToResults.bind(this));
            document.getElementById('print-btn').addEventListener('click', this.printCertificate.bind(this));
            
            // Floating buttons
            document.getElementById('share-btn').addEventListener('click', this.showShareModal.bind(this));
            document.getElementById('whatsapp-btn').addEventListener('click', this.openWhatsApp.bind(this));
            document.getElementById('bank-soal-btn').addEventListener('click', this.showBankSoalModal.bind(this));
            document.getElementById('admin-btn').addEventListener('click', this.showAdminModal.bind(this));
            
            // Modals
            document.querySelectorAll('.close-modal').forEach(btn => {
                btn.addEventListener('click', this.closeModal.bind(this));
            });
            document.getElementById('copy-url').addEventListener('click', this.copyUrl.bind(this));
            
            // Bank Soal
            document.getElementById('bank-soal-login-btn').addEventListener('click', this.loginBankSoal.bind(this));
            document.querySelectorAll('.bank-soal-tabs .tab-btn').forEach(btn => {
                btn.addEventListener('click', this.switchBankSoalTab.bind(this));
            });
            document.getElementById('save-question-btn').addEventListener('click', this.saveQuestion.bind(this));
            document.getElementById('clear-form-btn').addEventListener('click', this.clearQuestionForm.bind(this));
            document.getElementById('generate-questions-btn').addEventListener('click', this.generateQuestions.bind(this));
            
            // Admin Panel
            document.getElementById('admin-login-btn').addEventListener('click', this.loginAdmin.bind(this));
            document.querySelectorAll('.admin-tabs .tab-btn').forEach(btn => {
                btn.addEventListener('click', this.switchAdminTab.bind(this));
            });
            document.getElementById('save-login-code').addEventListener('click', this.saveLoginCode.bind(this));
            document.getElementById('save-cpns-code').addEventListener('click', this.saveCpnsCode.bind(this));
            document.getElementById('save-bank-code').addEventListener('click', this.saveBankCode.bind(this));
            document.getElementById('save-admin-code').addEventListener('click', this.saveAdminCode.bind(this));
            document.getElementById('save-exam-settings').addEventListener('click', this.saveExamSettings.bind(this));
            document.getElementById('save-text-settings').addEventListener('click', this.saveTextSettings.bind(this));
            document.getElementById('export-data-btn').addEventListener('click', this.exportData.bind(this));
            
            // Play button sound on all buttons
            document.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', this.playButtonSound.bind(this));
            });
        },

        // Fungsi untuk memainkan suara tombol
        playButtonSound: function() {
            const audio = document.getElementById('button-audio');
            audio.currentTime = 0;
            audio.play();
        },

        // Fungsi untuk memainkan audio pembuka
        playOpeningAudio: function() {
            const audio = document.getElementById('opening-audio');
            audio.play().catch(e => console.log('Autoplay prevented:', e));
        },

        // Update teks sambutan
        updateGreetingText: function() {
            document.getElementById('greeting-text').textContent = this.settings.greetingText;
            document.getElementById('edit-greeting-text').value = this.settings.greetingText;
            document.getElementById('edit-chairman-name').value = this.settings.chairmanName;
            document.getElementById('edit-motivation-text').value = JSON.stringify(this.settings.motivationTexts);
            document.getElementById('edit-periodic-info').value = this.settings.periodicInfo;
            document.getElementById('periodic-info').innerHTML = `<p>${this.settings.periodicInfo}</p>`;
        },

        // Handle login
        handleLogin: function() {
            const loginCode = document.getElementById('login-code').value;
            if (loginCode === this.settings.loginCode) {
                this.goToScreen('terms');
            } else {
                alert('Kode login salah. Silakan coba lagi.');
            }
        },

        // Navigasi antar layar
        goToScreen: function(screenName) {
            // Animasi keluar untuk layar saat ini
            const currentScreen = document.getElementById(`${this.currentScreen}-screen`);
            currentScreen.classList.add('slide-out');
            
            // Set timeout untuk animasi
            setTimeout(() => {
                currentScreen.classList.remove('active', 'slide-out');
                
                // Animasi masuk untuk layar baru
                const newScreen = document.getElementById(`${screenName}-screen`);
                newScreen.classList.add('active', 'slide-in');
                
                // Hapus class animasi setelah selesai
                setTimeout(() => {
                    newScreen.classList.remove('slide-in');
                }, 500);
                
                this.currentScreen = screenName;
                
                // Scroll ke atas
                window.scrollTo(0, 0);
            }, 500);
        },

        // Ke form data peserta
        goToDataForm: function() {
            this.goToScreen('data-form');
        },

        // Toggle form berdasarkan status peserta
        toggleParticipantFields: function() {
            const isStudent = document.getElementById('student').checked;
            document.getElementById('student-fields').style.display = isStudent ? 'block' : 'none';
            document.getElementById('general-fields').style.display = isStudent ? 'none' : 'block';
        },

        // Dapatkan lokasi GPS
        getLocation: function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        
                        // Gunakan API geocoding untuk mendapatkan alamat
                        this.reverseGeocode(latitude, longitude);
                    },
                    error => {
                        console.error('Error getting location:', error);
                        alert('Tidak dapat mendapatkan lokasi. Silakan masukkan alamat secara manual.');
                    }
                );
            } else {
                alert('Geolocation tidak didukung oleh browser Anda.');
            }
        },

        // Reverse geocoding untuk mendapatkan alamat dari koordinat
        reverseGeocode: async function(lat, lng) {
            // NOTE: Di sini Anda perlu mengganti dengan API Key Geocoding yang sebenarnya
            const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Ganti dengan API key Anda
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.results && data.results.length > 0) {
                    document.getElementById('address').value = data.results[0].formatted_address;
                } else {
                    alert('Alamat tidak ditemukan. Silakan masukkan secara manual.');
                }
            } catch (error) {
                console.error('Error fetching geocode:', error);
                alert('Gagal mendapatkan alamat. Silakan masukkan secara manual.');
            }
        },

        // Simpan data peserta
        saveParticipantData: function(e) {
            e.preventDefault();
            
            const isStudent = document.getElementById('student').checked;
            this.participantData = {
                fullname: document.getElementById('fullname').value,
                status: isStudent ? 'pelajar' : 'umum',
                timestamp: new Date().toISOString()
            };
            
            if (isStudent) {
                this.participantData.school = document.getElementById('school').value;
                this.participantData.nis = document.getElementById('nis').value;
                this.participantData.purpose = document.getElementById('student-purpose').value;
                this.participantData.level = document.getElementById('student-level').value;
            } else {
                this.participantData.address = document.getElementById('address').value;
                this.participantData.whatsapp = document.getElementById('whatsapp').value;
                this.participantData.email = document.getElementById('email').value;
                this.participantData.purpose = document.getElementById('general-purpose').value;
            }
            
            // Simpan ke daftar peserta
            this.participants.push({...this.participantData});
            this.updateParticipantsTable();
            
            this.goToScreen('level-selection');
            
            // Siapkan pilihan level berdasarkan status
            this.prepareLevelSelection();
        },

        // Siapkan pilihan level
        prepareLevelSelection: function() {
            const isStudent = this.participantData.status === 'pelajar';
            document.getElementById('student-level-selection').style.display = isStudent ? 'block' : 'none';
            document.getElementById('general-level-selection').style.display = isStudent ? 'none' : 'block';
            
            // Siapkan tombol level untuk pelajar
            if (isStudent) {
                const levelButtons = document.querySelectorAll('.level-btn');
                levelButtons.forEach(btn => btn.style.display = 'none');
                
                const selectedLevel = this.participantData.level;
                let levels = [];
                
                if (selectedLevel === 'sd') {
                    levels = [4, 5, 6];
                } else if (selectedLevel === 'smp') {
                    levels = [7, 8, 9];
                } else if (selectedLevel === 'sma') {
                    levels = [10, 11, 12];
                }
                
                levelButtons.forEach(btn => {
                    if (levels.includes(parseInt(btn.dataset.level))) {
                        btn.style.display = 'inline-block';
                    }
                });
            }
            
            // Reset pilihan
            this.examData = {};
            document.getElementById('start-exam-btn').disabled = true;
        },

        // Pilih level
        selectLevel: function(e) {
            document.querySelectorAll('.level-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            e.target.classList.add('active');
            this.examData.level = e.target.dataset.level;
            
            this.checkExamReady();
        },

        // Pilih subjek/mata ujian
        selectSubject: function(e) {
            document.querySelectorAll('.subject-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            e.target.classList.add('active');
            this.examData.subject = e.target.dataset.subject;
            
            // Tampilkan form lisensi jika CPNS
            document.getElementById('cpns-license-container').style.display = 
                this.examData.subject === 'ujian-cpns' ? 'block' : 'none';
            
            this.checkExamReady();
        },

        // Verifikasi lisensi CPNS
        verifyLicense: function() {
            const licenseCode = document.getElementById('license-code').value;
            if (licenseCode === this.settings.cpnsCode) {
                this.examData.licenseVerified = true;
                this.checkExamReady();
            } else {
                alert('Kode lisensi salah. Silakan coba lagi.');
            }
        },

        // Cek apakah ujian siap dimulai
        checkExamReady: function() {
            let ready = false;
            
            if (this.participantData.status === 'pelajar') {
                ready = this.examData.level && this.examData.subject;
            } else {
                if (this.examData.subject === 'ujian-cpns') {
                    ready = this.examData.subject && this.examData.licenseVerified;
                } else {
                    ready = !!this.examData.subject;
                }
            }
            
            document.getElementById('start-exam-btn').disabled = !ready;
        },

        // Mulai ujian
        startExam: function() {
            this.goToScreen('exam');
            
            // Siapkan soal
            this.prepareQuestions();
            
            // Mulai timer
            this.startTimer();
            
            // Tampilkan soal pertama
            this.showQuestion(0);
        },

        // Siapkan soal untuk ujian
        prepareQuestions: function() {
            // Ambil soal dari bank soal berdasarkan kategori
            const categoryQuestions = this.questions[this.examData.subject] || [];
            
            // Acak urutan soal jika diatur
            if (this.settings.randomizeQuestions) {
                this.shuffleArray(categoryQuestions);
            }
            
            // Batasi jumlah soal sesuai setting
            this.questionsForExam = categoryQuestions.slice(0, this.settings.questionCount);
            
            // Inisialisasi array untuk melacak jawaban
            this.answeredQuestions = [];
            this.unansweredQuestions = [...Array(this.questionsForExam.length).keys()]; // [0, 1, 2, ...]
            
            // Reset indeks soal saat ini
            this.currentQuestionIndex = 0;
        },

        // Fungsi untuk mengacak array
        shuffleArray: function(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },

        // Tampilkan soal
        showQuestion: function(index) {
            if (index < 0 || index >= this.questionsForExam.length) return;
            
            this.currentQuestionIndex = index;
            const question = this.questionsForExam[index];
            
            // Update tampilan
            document.getElementById('current-question').textContent = index + 1;
            document.getElementById('total-questions').textContent = this.questionsForExam.length;
            document.getElementById('question-text').textContent = question.question;
            
            // Kosongkan container opsi
            const optionsContainer = document.getElementById('options-container');
            optionsContainer.innerHTML = '';
            
            // Tambahkan opsi jawaban
            question.options.forEach((option, i) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.innerHTML = `
                    <input type="radio" id="option-${i}" name="answer" value="${option.charAt(0)}">
                    <label for="option-${i}">${option}</label>
                `;
                
                // Tambahkan event listener untuk memeriksa jawaban
                optionElement.querySelector('input').addEventListener('change', (e) => {
                    this.checkAnswer(e.target.value, question.correctAnswer, optionElement);
                });
                
                optionsContainer.appendChild(optionElement);
            });
            
            // Periksa apakah soal sudah dijawab
            const answeredQuestion = this.answeredQuestions.find(q => q.index === index);
            if (answeredQuestion) {
                const selectedOption = document.querySelector(`input[value="${answeredQuestion.answer}"]`);
                if (selectedOption) {
                    selectedOption.checked = true;
                    
                    // Tampilkan penjelasan
                    this.showExplanation(question.explanation);
                }
            }
        },

        // Periksa jawaban
        checkAnswer: function(selectedAnswer, correctAnswer, optionElement) {
            const isCorrect = selectedAnswer === correctAnswer;
            
            // Mainkan suara feedback
            const audio = document.getElementById(isCorrect ? 'correct-audio' : 'wrong-audio');
            audio.currentTime = 0;
            audio.play();
            
            // Tampilkan feedback visual
            optionElement.classList.add(isCorrect ? 'correct' : 'wrong');
            
            // Jika benar, tampilkan penjelasan
            if (isCorrect) {
                const question = this.questionsForExam[this.currentQuestionIndex];
                this.showExplanation(question.explanation);
            }
            
            // Simpan jawaban
            this.saveAnswer(this.currentQuestionIndex, selectedAnswer, isCorrect);
        },

        // Tampilkan penjelasan jawaban
        showExplanation: function(explanation) {
            // Hapus penjelasan sebelumnya jika ada
            const oldExplanation = document.querySelector('.explanation');
            if (oldExplanation) oldExplanation.remove();
            
            // Tambahkan penjelasan baru
            const explanationElement = document.createElement('div');
            explanationElement.className = 'explanation';
            explanationElement.textContent = explanation;
            
            document.getElementById('options-container').appendChild(explanationElement);
        },

        // Simpan jawaban
        saveAnswer: function(questionIndex, answer, isCorrect) {
            // Hapus dari unanswered jika ada
            this.unansweredQuestions = this.unansweredQuestions.filter(i => i !== questionIndex);
            
            // Tambahkan ke answered atau update jika sudah ada
            const existingAnswerIndex = this.answeredQuestions.findIndex(q => q.index === questionIndex);
            
            if (existingAnswerIndex >= 0) {
                this.answeredQuestions[existingAnswerIndex] = { index: questionIndex, answer, isCorrect };
            } else {
                this.answeredQuestions.push({ index: questionIndex, answer, isCorrect });
            }
        },

        // Mulai timer
        startTimer: function() {
            // Set waktu ujian dalam detik
            this.timeLeft = this.settings.examTimer * 60;
            
            // Hapus timer sebelumnya jika ada
            if (this.timer) clearInterval(this.timer);
            
            // Update timer setiap detik
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateTimerDisplay();
                
                // Cek jika waktu habis
                if (this.timeLeft <= 0) {
                    clearInterval(this.timer);
                    this.finishExam(true);
                }
                
                // Tampilkan peringatan jika sisa 10 menit
                if (this.timeLeft === 10 * 60) {
                    this.showTimeWarning();
                }
                
                // Hilangkan peringatan jika sisa 1 menit
                if (this.timeLeft === 1 * 60) {
                    this.hideTimeWarning();
                }
            }, 1000);
            
            this.updateTimerDisplay();
        },

        // Update tampilan timer
        updateTimerDisplay: function() {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            
            document.getElementById('timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Ubah style jika sisa 10 menit
            const timerContainer = document.querySelector('.timer-container');
            if (this.timeLeft <= 10 * 60) {
                timerContainer.classList.add('warning');
            } else {
                timerContainer.classList.remove('warning');
            }
        },

        // Tampilkan peringatan waktu
        showTimeWarning: function() {
            const warningElement = document.getElementById('time-warning');
            warningElement.style.display = 'block';
            
            // Sembunyikan setelah beberapa detik
            setTimeout(() => {
                warningElement.style.display = 'none';
            }, 5 * 60 * 1000); // Sembunyikan setelah 5 menit
        },

        // Sembunyikan peringatan waktu
        hideTimeWarning: function() {
            document.getElementById('time-warning').style.display = 'none';
        },

        // Lewati soal
        skipQuestion: function() {
            const nextIndex = (this.currentQuestionIndex + 1) % this.questionsForExam.length;
            this.showQuestion(nextIndex);
        },

        // Tampilkan soal yang belum dijawab
        showUnanswered: function() {
            if (this.unansweredQuestions.length > 0) {
                this.showQuestion(this.unansweredQuestions[0]);
            } else {
                alert('Semua soal sudah dijawab.');
            }
        },

        // Selesaikan ujian
        finishExam: function(timeout = false) {
            // Hentikan timer
            clearInterval(this.timer);
            
            // Hitung hasil
            this.calculateResults();
            
            // Tampilkan hasil
            this.showResults();
            
            // Jika timeout, tampilkan pesan
            if (timeout) {
                alert('Waktu ujian telah habis. Jawaban yang sudah dikirim akan diperiksa.');
            }
        },

        // Hitung hasil ujian
        calculateResults: function() {
            const totalQuestions = this.questionsForExam.length;
            let correctAnswers = 0;
            
            // Hitung jawaban benar
            this.answeredQuestions.forEach(q => {
                if (q.isCorrect) correctAnswers++;
            });
            
            // Simpan hasil
            this.results = {
                totalQuestions,
                correctAnswers,
                wrongAnswers: this.answeredQuestions.length - correctAnswers,
                unanswered: totalQuestions - this.answeredQuestions.length,
                score: Math.round((correctAnswers / totalQuestions) * 100),
                timestamp: new Date().toISOString()
            };
            
            // Tambahkan ke data peserta
            const participantIndex = this.participants.findIndex(p => 
                p.fullname === this.participantData.fullname && 
                p.timestamp === this.participantData.timestamp
            );
            
            if (participantIndex >= 0) {
                this.participants[participantIndex].examResults = this.results;
                this.updateParticipantsTable();
            }
        },

        // Tampilkan hasil ujian
        showResults: function() {
            this.goToScreen('results');
            
            // Update tampilan hasil
            document.getElementById('total-questions-result').textContent = this.results.totalQuestions;
            document.getElementById('correct-answers').textContent = this.results.correctAnswers;
            document.getElementById('wrong-answers').textContent = this.results.wrongAnswers;
            document.getElementById('unanswered-questions').textContent = this.results.unanswered;
            document.getElementById('final-score').textContent = this.results.score;
        },

        // Tampilkan sertifikat
        showCertificate: function() {
            this.goToScreen('certificate');
            
            // Sembunyikan tombol floating saat cetak sertifikat
            document.querySelector('.floating-buttons').style.display = 'none';
            
            // Update data sertifikat
            document.getElementById('certificate-name').textContent = this.participantData.fullname;
            document.getElementById('certificate-score').textContent = this.results.score;
            
            // Generate kode sertifikat
            const certCode = this.generateCertificateCode();
            document.getElementById('certificate-code').textContent = certCode;
            
            // Set periode
            const date = new Date();
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth()+1).toString().padStart(2, '0')}${date.getFullYear()}`;
            document.getElementById('certificate-period').textContent = `Ditetapkan di: Situbondo, ${formattedDate}`;
            
            // Set teks motivasi berdasarkan skor
            const motivation = this.getMotivationText(this.results.score);
            document.getElementById('certificate-motivation').textContent = motivation;
            
            // Mainkan suara applause
            const audio = document.getElementById('applause-audio');
            audio.currentTime = 0;
            audio.play();
        },

        // Generate kode sertifikat
        generateCertificateCode: function() {
            const date = new Date();
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth()+1).toString().padStart(2, '0')}${date.getFullYear()}`;
            
            // Generate kode unik 8 digit
            const uniqueCode = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + 
                              Math.random().toString(36).substring(2, 6).toUpperCase();
            
            return `${this.participantData.fullname.replace(/\s+/g, '-').toUpperCase()}/${this.participantData.status.toUpperCase()}/${this.examData.level || 'UMUM'}/${this.examData.subject.toUpperCase()}/${formattedDate}/${uniqueCode}/PERGUNU-STB`;
        },

        // Dapatkan teks motivasi berdasarkan skor
        getMotivationText: function(score) {
            for (const item of this.settings.motivationTexts) {
                if (score >= item.minScore) {
                    return item.text.replace('{score}', score);
                }
            }
            return this.settings.motivationTexts[this.settings.motivationTexts.length - 1].text.replace('{score}', score);
        },

        // Kembali ke hasil ujian dari sertifikat
        backToResults: function() {
            // Tampilkan kembali tombol floating
            document.querySelector('.floating-buttons').style.display = 'flex';
            
            this.goToScreen('results');
        },

        // Cetak sertifikat
        printCertificate: function() {
            const printContent = document.getElementById('certificate-print').innerHTML;
            const originalContent = document.body.innerHTML;
            
            document.body.innerHTML = printContent;
            window.print();
            document.body.innerHTML = originalContent;
            
            // Perbarui tampilan setelah cetak
            this.showCertificate();
        },

        // Ulangi ujian
        retakeExam: function() {
            // Kembali ke pemilihan level
            this.goToScreen('level-selection');
        },

        // Tampilkan modal share
        showShareModal: function() {
            document.getElementById('share-modal').style.display = 'block';
            
            // Update social links
            const socialLinksContainer = document.getElementById('social-links');
            socialLinksContainer.innerHTML = `
                <a href="https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank"><i class="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}" target="_blank"><i class="fab fa-twitter"></i></a>
                <a href="https://wa.me/?text=${encodeURIComponent('Ikuti ujian online di: ' + window.location.href)}" target="_blank"><i class="fab fa-whatsapp"></i></a>
                <a href="mailto:?body=${encodeURIComponent('Ikuti ujian online di: ' + window.location.href)}" target="_blank"><i class="fas fa-envelope"></i></a>
            `;
            
            // Update share URL
            document.getElementById('share-url').value = window.location.href;
        },

        // Buka WhatsApp admin
        openWhatsApp: function() {
            window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...`, '_blank');
        },

        // Tampilkan modal bank soal
        showBankSoalModal: function() {
            document.getElementById('bank-soal-modal').style.display = 'block';
            document.getElementById('bank-soal-content').style.display = 'none';
            document.getElementById('bank-soal-code').value = '';
        },

        // Login ke bank soal
        loginBankSoal: function() {
            const code = document.getElementById('bank-soal-code').value;
            if (code === this.settings.bankSoalCode) {
                document.getElementById('bank-soal-content').style.display = 'block';
            } else {
                alert('Kode bank soal salah. Silakan coba lagi.');
            }
        },

        // Ganti tab bank soal
        switchBankSoalTab: function(e) {
            const tabName = e.target.dataset.tab;
            
            // Update active tab button
            document.querySelectorAll('.bank-soal-tabs .tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Update active tab content
            document.querySelectorAll('.bank-soal-modal .tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(tabName).classList.add('active');
        },

        // Simpan soal ke bank soal
        saveQuestion: function() {
            const category = document.getElementById('question-category').value;
            const level = document.getElementById('question-level').value;
            const questionText = document.getElementById('question-text').value;
            
            // Validasi input
            if (!questionText) {
                alert('Pertanyaan tidak boleh kosong');
                return;
            }
            
            // Ambil opsi jawaban
            const options = [
                document.getElementById('option-a').value,
                document.getElementById('option-b').value,
                document.getElementById('option-c').value,
                document.getElementById('option-d').value,
                document.getElementById('option-e').value
            ].filter(opt => opt.trim() !== '');
            
            if (options.length < 2) {
                alert('Minimal harus ada 2 pilihan jawaban');
                return;
            }
            
            // Ambil jawaban yang benar
            const correctAnswer = document.querySelector('input[name="correct-answer"]:checked').value;
            
            // Ambil penjelasan
            const explanation = document.getElementById('explanation').value;
            
            // Buat objek soal
            const question = {
                question: questionText,
                options: options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`),
                correctAnswer: correctAnswer.toUpperCase(),
                explanation: explanation || 'Tidak ada penjelasan',
                category,
                level
            };
            
            // Tambahkan ke bank soal
            if (!this.questions[category]) {
                this.questions[category] = [];
            }
            
            this.questions[category].push(question);
            
            alert('Soal berhasil disimpan!');
            this.clearQuestionForm();
        },

        // Bersihkan form soal
        clearQuestionForm: function() {
            document.getElementById('question-text').value = '';
            document.getElementById('option-a').value = '';
            document.getElementById('option-b').value = '';
            document.getElementById('option-c').value = '';
            document.getElementById('option-d').value = '';
            document.getElementById('option-e').value = '';
            document.getElementById('explanation').value = '';
            document.querySelector('input[name="correct-answer"][value="a"]').checked = true;
        },

        // Generate soal menggunakan AI
        generateQuestions: async function() {
            const prompt = document.getElementById('ai-prompt').value;
            const category = document.getElementById('ai-category').value;
            const level = document.getElementById('ai-level').value;
            const apiKey = document.getElementById('api-key').value;
            
            if (!prompt) {
                alert('Prompt tidak boleh kosong');
                return;
            }
            
            if (!apiKey) {
                alert('API Key tidak boleh kosong');
                return;
            }
            
            // NOTE: Di sini Anda perlu mengganti dengan API Key AI yang sebenarnya
            // Ini adalah contoh implementasi menggunakan OpenAI API
            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [{
                            role: "user",
                            content: `Buatkan 5 soal pilihan ganda tentang ${prompt} untuk tingkat ${level}. Format setiap soal harus memiliki: pertanyaan, 4 pilihan jawaban (A-D), jawaban benar (huruf saja), dan penjelasan singkat. Format dalam JSON array.`
                        }],
                        temperature: 0.7
                    })
                });
                
                const data = await response.json();
                const content = data.choices[0].message.content;
                
                // Coba parse hasil
                try {
                    // Ini adalah contoh parsing sederhana, mungkin perlu disesuaikan
                    const questions = JSON.parse(content);
                    this.displayGeneratedQuestions(questions, category, level);
                } catch (e) {
                    console.error('Error parsing AI response:', e);
                    document.getElementById('ai-results').innerHTML = `<p>Hasil dari AI:</p><pre>${content}</pre>`;
                }
            } catch (error) {
                console.error('Error calling AI API:', error);
                alert('Gagal memproses permintaan AI. Silakan coba lagi.');
            }
        },

        // Tampilkan hasil generate soal dari AI
        displayGeneratedQuestions: function(questions, category, level) {
            const resultsContainer = document.getElementById('ai-results');
            resultsContainer.innerHTML = '<h4>Hasil Generate Soal:</h4>';
            
            questions.forEach((q, i) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'ai-question';
                questionDiv.innerHTML = `
                    <p><strong>Soal ${i+1}:</strong> ${q.question}</p>
                    <p><strong>Pilihan:</strong> ${q.options.join(', ')}</p>
                    <p><strong>Jawaban benar:</strong> ${q.correctAnswer}</p>
                    <p><strong>Penjelasan:</strong> ${q.explanation}</p>
                    <button class="btn-small save-ai-question" data-index="${i}">Simpan Soal Ini</button>
                    <hr>
                `;
                
                resultsContainer.appendChild(questionDiv);
            });
            
            // Tambahkan event listener untuk tombol simpan
            document.querySelectorAll('.save-ai-question').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = e.target.dataset.index;
                    this.saveAiQuestion(questions[index], category, level);
                    e.target.textContent = 'Tersimpan!';
                    e.target.disabled = true;
                });
            });
        },

        // Simpan soal dari AI ke bank soal
        saveAiQuestion: function(question, category, level) {
            // Format ulang soal untuk disimpan
            const formattedQuestion = {
                question: question.question,
                options: question.options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`),
                correctAnswer: question.correctAnswer.toUpperCase(),
                explanation: question.explanation || 'Tidak ada penjelasan',
                category,
                level
            };
            
            // Tambahkan ke bank soal
            if (!this.questions[category]) {
                this.questions[category] = [];
            }
            
            this.questions[category].push(formattedQuestion);
        },

        // Tampilkan modal admin
        showAdminModal: function() {
            document.getElementById('admin-modal').style.display = 'block';
            document.getElementById('admin-content').style.display = 'none';
            document.getElementById('admin-code').value = '';
        },

        // Login ke admin panel
        loginAdmin: function() {
            const code = document.getElementById('admin-code').value;
            if (code === this.settings.adminCode) {
                document.getElementById('admin-content').style.display = 'block';
                
                // Update toggle status
                Object.keys(this.settings.enabledExams).forEach(key => {
                    document.getElementById(`toggle-${key}`).checked = this.settings.enabledExams[key];
                });
                
                // Update other settings
                document.getElementById('exam-timer').value = this.settings.examTimer;
                document.getElementById('question-point').value = this.settings.questionPoints;
                document.getElementById('question-count').value = this.settings.questionCount;
                document.getElementById('randomize-questions').checked = this.settings.randomizeQuestions;
            } else {
                alert('Kode admin salah. Silakan coba lagi.');
            }
        },

        // Ganti tab admin
        switchAdminTab: function(e) {
            const tabName = e.target.dataset.tab;
            
            // Update active tab button
            document.querySelectorAll('.admin-tabs .tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Update active tab content
            document.querySelectorAll('.admin-modal .tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(tabName).classList.add('active');
        },

        // Simpan kode login
        saveLoginCode: function() {
            const newCode = document.getElementById('new-login-code').value;
            if (newCode) {
                this.settings.loginCode = newCode;
                document.getElementById('current-login-code').value = newCode;
                alert('Kode login berhasil diubah!');
            } else {
                alert('Kode login baru tidak boleh kosong');
            }
        },

        // Simpan kode CPNS
        saveCpnsCode: function() {
            const newCode = document.getElementById('new-cpns-code').value;
            if (newCode) {
                this.settings.cpnsCode = newCode;
                document.getElementById('current-cpns-code').value = newCode;
                alert('Kode ujian CPNS berhasil diubah!');
            } else {
                alert('Kode ujian CPNS baru tidak boleh kosong');
            }
        },

        // Simpan kode bank soal
        saveBankCode: function() {
            const newCode = document.getElementById('new-bank-code').value;
            if (newCode) {
                this.settings.bankSoalCode = newCode;
                document.getElementById('current-bank-code').value = newCode;
                alert('Kode bank soal berhasil diubah!');
            } else {
                alert('Kode bank soal baru tidak boleh kosong');
            }
        },

        // Simpan kode admin
        saveAdminCode: function() {
            const newCode = document.getElementById('new-admin-code').value;
            if (newCode) {
                this.settings.adminCode = newCode;
                document.getElementById('current-admin-code').value = newCode;
                alert('Kode admin berhasil diubah!');
            } else {
                alert('Kode admin baru tidak boleh kosong');
            }
        },

        // Simpan pengaturan ujian
        saveExamSettings: function() {
            this.settings.examTimer = parseInt(document.getElementById('exam-timer').value) || 120;
            this.settings.questionPoints = parseInt(document.getElementById('question-point').value) || 1;
            this.settings.questionCount = parseInt(document.getElementById('question-count').value) || 10;
            this.settings.randomizeQuestions = document.getElementById('randomize-questions').checked;
            
            // Update status enabled exams
            Object.keys(this.settings.enabledExams).forEach(key => {
                this.settings.enabledExams[key] = document.getElementById(`toggle-${key}`).checked;
            });
            
            alert('Pengaturan ujian berhasil disimpan!');
        },

        // Simpan pengaturan teks
        saveTextSettings: function() {
            this.settings.greetingText = document.getElementById('edit-greeting-text').value;
            this.settings.chairmanName = document.getElementById('edit-chairman-name').value;
            
            try {
                this.settings.motivationTexts = JSON.parse(document.getElementById('edit-motivation-text').value);
            } catch (e) {
                console.error('Error parsing motivation texts:', e);
                alert('Format teks motivasi tidak valid. Harus dalam format JSON array.');
                return;
            }
            
            this.settings.periodicInfo = document.getElementById('edit-periodic-info').value;
            
            // Update tampilan
            this.updateGreetingText();
            
            alert('Pengaturan teks berhasil disimpan!');
        },

        // Update tabel peserta
        updateParticipantsTable: function() {
            const tableBody = document.querySelector('#participants-table tbody');
            tableBody.innerHTML = '';
            
            this.participants.forEach((participant, index) => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${participant.fullname}</td>
                    <td>${participant.status === 'pelajar' ? 'Pelajar' : 'Umum'}</td>
                    <td>${participant.examResults ? participant.examResults.score + '%' : '-'}</td>
                    <td>${new Date(participant.timestamp).toLocaleDateString()}</td>
                `;
                
                tableBody.appendChild(row);
            });
        },

        // Export data peserta
        exportData: function() {
            const format = document.getElementById('export-format').value;
            
            // Format data untuk export
            let exportData;
            
            if (format === 'excel' || format === 'csv') {
                // Header CSV/Excel
                let csv = 'No,Nama Lengkap,Status,Sekolah/Instansi,NIS/Nomor HP,Email,Tujuan Ujian,Tingkat/Kelas,Jenis Ujian,Skor,Tanggal\n';
                
                this.participants.forEach((p, i) => {
                    csv += `${i + 1},"${p.fullname}",${p.status === 'pelajar' ? 'Pelajar' : 'Umum'},`;
                    csv += p.status === 'pelajar' ? `"${p.school}","${p.nis}",-` : `-,"${p.whatsapp}","${p.email}"`;
                    csv += `,"${p.purpose}",`;
                    csv += p.status === 'pelajar' ? `Kelas ${p.level}` : 'Umum';
                    csv += `,${p.examResults ? p.examResults.subject : '-'},`;
                    csv += p.examResults ? `${p.examResults.score}%` : '-';
                    csv += `,${new Date(p.timestamp).toLocaleDateString()}\n`;
                });
                
                if (format === 'excel') {
                    // Untuk Excel, kita bisa membuat file CSV dengan .xls extension
                    exportData = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
                } else {
                    exportData = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
                }
            } else if (format === 'pdf') {
                // Untuk PDF, kita bisa menggunakan library jsPDF
                // Ini adalah contoh sederhana, mungkin perlu disesuaikan
                alert('Export PDF akan dibuka di jendela baru. Harap izinkan pop-up.');
                
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                
                doc.text('Daftar Peserta Ujian Online', 10, 10);
                
                let y = 20;
                this.participants.forEach((p, i) => {
                    doc.text(`${i + 1}. ${p.fullname} (${p.status === 'pelajar' ? 'Pelajar' : 'Umum'})`, 10, y);
                    y += 7;
                    
                    if (p.status === 'pelajar') {
                        doc.text(`   Sekolah: ${p.school}, NIS: ${p.nis}`, 10, y);
                    } else {
                        doc.text(`   WhatsApp: ${p.whatsapp}, Email: ${p.email}`, 10, y);
                    }
                    y += 7;
                    
                    doc.text(`   Ujian: ${p.examResults ? p.examResults.subject : '-'}, Skor: ${p.examResults ? p.examResults.score + '%' : '-'}`, 10, y);
                    y += 7;
                    
                    doc.text(`   Tanggal: ${new Date(p.timestamp).toLocaleDateString()}`, 10, y);
                    y += 10;
                    
                    if (y > 280) {
                        doc.addPage();
                        y = 20;
                    }
                });
                
                doc.save('daftar_peserta_ujian.pdf');
                return;
            }
            
            // Buat link download
            const link = document.createElement('a');
            link.setAttribute('href', exportData);
            link.setAttribute('download', `daftar_peserta_ujian.${format === 'excel' ? 'xls' : format}`);
            document.body.appendChild(link);
            
            // Trigger download
            link.click();
            document.body.removeChild(link);
        },

        // Tutup modal
        closeModal: function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        },

        // Salin URL
        copyUrl: function() {
            const urlInput = document.getElementById('share-url');
            urlInput.select();
            document.execCommand('copy');
            
            alert('URL berhasil disalin!');
        }
    };

    // Jalankan aplikasi
    app.init();
});