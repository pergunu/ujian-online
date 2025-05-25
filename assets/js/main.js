// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi partikel background
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {
        console.log('Particles.js loaded');
    });
    
    // Main App State
    const appState = {
        currentScreen: 'welcome',
        participantData: {},
        examData: {},
        results: {
            correct: 0,
            wrong: 0,
            skipped: 0,
            score: 0
        },
        adminCodes: {
            login: '12345',
            cpns: 'OPENLOCK-1945',
            bankSoal: 'OPENLOCK-1926',
            adminPanel: '65614222'
        },
        settings: {
            greetingText: 'Selamat Datang di Ujian Online Pergunu Situbondo',
            subGreetingText: 'Silakan masukkan kode login untuk melanjutkan',
            termsText: [
                '1. Peserta wajib mengisi data diri dengan benar dan valid.',
                '2. Dilarang keras melakukan kecurangan selama ujian berlangsung.',
                '3. Waktu ujian tidak dapat diperpanjang setelah habis.',
                '4. Jawaban yang sudah dikirim tidak dapat diubah.',
                '5. Sertifikat hanya diberikan kepada peserta yang menyelesaikan ujian.',
                '6. Sistem ini dikembangkan oleh Cendhanu Tim Kreator PERGUNU SITUBONDO.'
            ],
            periodicInfo: 'Informasi berkala akan ditampilkan di sini. Admin dapat mengedit teks ini melalui panel kontrol.',
            motivationMessages: {
                perfect: 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.',
                excellent: 'Luar biasa! Hasil yang sangat memuaskan. Terus tingkatkan kemampuan Anda.',
                good: 'Bagus! Anda telah memahami materi dengan baik. Tingkatkan lagi untuk hasil yang lebih baik.',
                average: 'Cukup baik. Masih ada ruang untuk meningkatkan pemahaman Anda.',
                poor: 'Perlu peningkatan. Pelajari lagi materinya dan coba lagi.'
            },
            chairmanName: 'Moh. Nuril Hudha, S.Pd., M.Si.',
            examDuration: 120, // dalam menit
            pointPerQuestion: 1
        }
    };
    
    // Simpan state ke localStorage
    function saveAppState() {
        localStorage.setItem('pergunuExamAppState', JSON.stringify(appState));
    }
    
    // Load state dari localStorage
    function loadAppState() {
        const savedState = localStorage.getItem('pergunuExamAppState');
        if (savedState) {
            Object.assign(appState, JSON.parse(savedState));
        }
    }
    
    // Panggil load state saat awal
    loadAppState();
    
    // Main Navigation
    function showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            appState.currentScreen = screenName;
            
            // Tambahkan efek animasi
            targetScreen.classList.add('animate__animated', 'animate__fadeIn');
            
            // Hapus class animasi setelah selesai
            setTimeout(() => {
                targetScreen.classList.remove('animate__animated', 'animate__fadeIn');
            }, 500);
        }
    }
    
    // Event Listeners
    document.getElementById('login-btn').addEventListener('click', function() {
        const loginCode = document.getElementById('login-code').value;
        if (loginCode === appState.adminCodes.login) {
            // Play audio tombol
            playButtonSound();
            
            // Simpan timestamp login
            appState.loginTime = new Date().toISOString();
            saveAppState();
            
            // Lanjut ke terms screen
            showScreen('terms');
        } else {
            alert('Kode login salah. Silakan coba lagi.');
        }
    });
    
    document.getElementById('agree-terms').addEventListener('change', function() {
        document.getElementById('continue-btn').disabled = !this.checked;
    });
    
    document.getElementById('continue-btn').addEventListener('click', function() {
        playButtonSound();
        showScreen('participant-form');
    });
    
    // Status radio button change
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
    
    // GPS Location
    document.getElementById('get-location').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    // Gunakan reverse geocoding untuk mendapatkan alamat
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // Gunakan Nominatim API untuk reverse geocoding
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                        .then(response => response.json())
                        .then(data => {
                            let address = '';
                            if (data.address) {
                                if (data.address.road) address += data.address.road + ', ';
                                if (data.address.village) address += data.address.village + ', ';
                                if (data.address.suburb) address += data.address.suburb + ', ';
                                if (data.address.city) address += data.address.city + ', ';
                                if (data.address.state) address += data.address.state;
                            }
                            
                            if (address) {
                                document.getElementById('address').value = address;
                            } else {
                                document.getElementById('address').value = 'Lokasi tidak dapat ditentukan';
                            }
                        })
                        .catch(error => {
                            console.error('Error getting address:', error);
                            document.getElementById('address').value = 'Lokasi tidak dapat ditentukan';
                        });
                },
                error => {
                    console.error('Error getting location:', error);
                    alert('Tidak dapat mendapatkan lokasi. Pastikan izin lokasi diberikan.');
                }
            );
        } else {
            alert('Browser tidak mendukung geolocation.');
        }
    });
    
    // Form Participant Submit
    document.getElementById('participant-form').addEventListener('submit', function(e) {
        e.preventDefault();
        playButtonSound();
        
        // Kumpulkan data peserta
        const formData = new FormData(this);
        const participantData = {};
        
        formData.forEach((value, key) => {
            participantData[key] = value;
        });
        
        // Tambahkan timestamp
        participantData.timestamp = new Date().toISOString();
        
        // Simpan ke state
        appState.participantData = participantData;
        saveAppState();
        
        // Lanjut ke exam level screen
        showScreen('exam-level');
        
        // Tampilkan level sesuai status
        if (participantData.status === 'pelajar') {
            document.getElementById('student-levels').style.display = 'block';
            document.getElementById('general-levels').style.display = 'none';
            
            // Tampilkan grade sesuai tingkat sekolah
            const schoolLevel = document.getElementById('school-level').value;
            document.querySelectorAll('.grade-buttons').forEach(div => {
                div.style.display = 'none';
            });
            document.getElementById(`${schoolLevel}-grades`).style.display = 'grid';
        } else {
            document.getElementById('student-levels').style.display = 'none';
            document.getElementById('general-levels').style.display = 'block';
        }
    });
    
    // Grade Buttons
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            document.querySelectorAll('.grade-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Simpan grade yang dipilih
            appState.examData.grade = this.dataset.grade;
            saveAppState();
            
            checkExamReady();
        });
    });
    
    // Subject Buttons
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Simpan subject yang dipilih
            appState.examData.subject = this.dataset.subject;
            saveAppState();
            
            checkExamReady();
        });
    });
    
    // General Exam Buttons
    document.querySelectorAll('.general-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            document.querySelectorAll('.general-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Simpan exam type yang dipilih
            appState.examData.examType = this.dataset.exam;
            saveAppState();
            
            // Jika CPNS, tampilkan form lisensi
            if (this.dataset.exam === 'cpns') {
                document.getElementById('cpns-license').style.display = 'block';
            } else {
                document.getElementById('cpns-license').style.display = 'none';
                checkExamReady();
            }
        });
    });
    
    // Verify License Code
    document.getElementById('verify-license').addEventListener('click', function() {
        const licenseCode = document.getElementById('license-code').value;
        if (licenseCode === appState.adminCodes.cpns) {
            playButtonSound();
            alert('Kode lisensi valid. Anda dapat melanjutkan ujian CPNS/P3K.');
            checkExamReady();
        } else {
            alert('Kode lisensi salah. Silakan coba lagi.');
        }
    });
    
    // Check if exam is ready to start
    function checkExamReady() {
        const startBtn = document.getElementById('start-exam-btn');
        
        if (appState.participantData.status === 'pelajar') {
            // Untuk pelajar, perlu grade dan subject
            if (appState.examData.grade && appState.examData.subject) {
                startBtn.disabled = false;
            } else {
                startBtn.disabled = true;
            }
        } else {
            // Untuk umum, perlu examType
            if (appState.examData.examType) {
                if (appState.examData.examType === 'cpns') {
                    // Untuk CPNS, perlu verifikasi lisensi
                    const licenseCode = document.getElementById('license-code').value;
                    startBtn.disabled = !(licenseCode === appState.adminCodes.cpns);
                } else {
                    startBtn.disabled = false;
                }
            } else {
                startBtn.disabled = true;
            }
        }
    }
    
    // Start Exam
    document.getElementById('start-exam-btn').addEventListener('click', function() {
        playButtonSound();
        
        // Simpan timestamp mulai ujian
        appState.examStartTime = new Date().toISOString();
        saveAppState();
        
        // Load questions berdasarkan jenis ujian
        loadQuestions();
        
        // Tampilkan exam screen
        showScreen('exam');
        
        // Mulai timer
        startTimer();
    });
    
    // Load Questions
    function loadQuestions() {
        // Untuk demo, kita buat soal sederhana
        // Di aplikasi sebenarnya, ini akan load dari file JSON atau database
        let questions = [];
        const subject = appState.examData.subject || appState.examData.examType;
        
        // Buat contoh soal berdasarkan subject
        switch(subject) {
            case 'agama':
                questions = [
                    {
                        question: "Apa nama kitab suci umat Islam?",
                        options: ["Injil", "Taurat", "Al-Quran", "Zabur", "Wedha"],
                        answer: 2,
                        explanation: "Kitab suci umat Islam adalah Al-Quran yang diturunkan kepada Nabi Muhammad SAW."
                    }
                ];
                break;
            case 'ppkn':
                questions = [
                    {
                        question: "Apa dasar negara Indonesia?",
                        options: ["UUD 1945", "Pancasila", "Bhineka Tunggal Ika", "NKRI", "Konstitusi"],
                        answer: 1,
                        explanation: "Pancasila adalah dasar negara Indonesia yang terdiri dari 5 sila."
                    }
                ];
                break;
            // Tambahkan case untuk subject lainnya...
            default:
                questions = [
                    {
                        question: "Ini adalah contoh soal untuk " + subject,
                        options: ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D", "Pilihan E"],
                        answer: 0,
                        explanation: "Ini adalah penjelasan untuk contoh soal."
                    }
                ];
        }
        
        appState.questions = questions;
        appState.currentQuestionIndex = 0;
        appState.results = {
            correct: 0,
            wrong: 0,
            skipped: 0,
            score: 0
        };
        
        saveAppState();
        displayQuestion();
    }
    
    // Display Question
    function displayQuestion() {
        const question = appState.questions[appState.currentQuestionIndex];
        const optionsContainer = document.getElementById('options-container');
        
        // Tampilkan pertanyaan
        document.getElementById('question-text').textContent = question.question;
        
        // Tampilkan progress
        document.getElementById('current-question').textContent = appState.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = appState.questions.length;
        
        // Kosongkan options
        optionsContainer.innerHTML = '';
        
        // Tampilkan pilihan jawaban
        const letters = ['A', 'B', 'C', 'D', 'E'];
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.innerHTML = `<span class="option-letter">${letters[index]}</span> ${option}`;
            optionBtn.dataset.index = index;
            
            optionBtn.addEventListener('click', function() {
                checkAnswer(index);
            });
            
            optionsContainer.appendChild(optionBtn);
        });
        
        // Sembunyikan penjelasan
        document.getElementById('explanation-container').style.display = 'none';
    }
    
    // Check Answer
    function checkAnswer(selectedIndex) {
        const question = appState.questions[appState.currentQuestionIndex];
        const optionButtons = document.querySelectorAll('.option-btn');
        
        // Nonaktifkan semua tombol
        optionButtons.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('disabled');
        });
        
        // Tandai jawaban yang benar
        optionButtons[question.answer].classList.add('correct');
        
        // Periksa jawaban
        if (selectedIndex === question.answer) {
            // Jawaban benar
            optionButtons[selectedIndex].classList.add('correct');
            playCorrectSound();
            appState.results.correct++;
            appState.results.score += appState.settings.pointPerQuestion;
        } else {
            // Jawaban salah
            optionButtons[selectedIndex].classList.add('wrong');
            playWrongSound();
            appState.results.wrong++;
        }
        
        // Tampilkan penjelasan
        document.getElementById('explanation-text').textContent = question.explanation;
        document.getElementById('explanation-container').style.display = 'block';
        
        saveAppState();
        
        // Auto lanjut ke soal berikutnya setelah 3 detik
        setTimeout(() => {
            nextQuestion();
        }, 3000);
    }
    
    // Next Question
    function nextQuestion() {
        if (appState.currentQuestionIndex < appState.questions.length - 1) {
            appState.currentQuestionIndex++;
            saveAppState();
            displayQuestion();
        } else {
            // Jika sudah soal terakhir, tampilkan hasil
            showResults();
        }
    }
    
    // Skip Question
    document.getElementById('skip-question-btn').addEventListener('click', function() {
        playButtonSound();
        appState.results.skipped++;
        saveAppState();
        nextQuestion();
    });
    
    // Show Unanswered Questions
    document.getElementById('unanswered-btn').addEventListener('click', function() {
        playButtonSound();
        // Di aplikasi lengkap, ini akan menampilkan daftar soal yang belum dijawab
        alert('Fitur ini akan menampilkan daftar soal yang belum dijawab.');
    });
    
    // Finish Exam
    document.getElementById('finish-exam-btn').addEventListener('click', function() {
        playButtonSound();
        if (confirm('Apakah Anda yakin ingin menyelesaikan ujian sekarang?')) {
            // Hitung soal yang belum dijawab sebagai salah
            const remainingQuestions = appState.questions.length - (appState.currentQuestionIndex + 1);
            appState.results.skipped += remainingQuestions;
            
            // Simpan timestamp selesai ujian
            appState.examEndTime = new Date().toISOString();
            saveAppState();
            
            // Tampilkan hasil
            showResults();
        }
    });
    
    // Show Results
    function showResults() {
        // Hitung nilai akhir (dalam persen)
        const totalQuestions = appState.questions.length;
        const percentage = Math.round((appState.results.correct / totalQuestions) * 100);
        appState.results.score = percentage;
        saveAppState();
        
        // Tampilkan hasil
        document.getElementById('correct-answers').textContent = appState.results.correct;
        document.getElementById('wrong-answers').textContent = appState.results.wrong;
        document.getElementById('skipped-answers').textContent = appState.results.skipped;
        document.getElementById('final-score').textContent = `${percentage}%`;
        
        // Hentikan timer
        clearInterval(appState.timerInterval);
        
        // Tampilkan results screen
        showScreen('results');
    }
    
    // View Certificate
    document.getElementById('view-certificate-btn').addEventListener('click', function() {
        playButtonSound();
        
        // Generate certificate data
        const participant = appState.participantData;
        const results = appState.results;
        
        // Format nama (kapital di awal setiap kata)
        const formattedName = participant['full-name'].split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
        
        // Set certificate data
        document.getElementById('certificate-name').textContent = formattedName;
        document.getElementById('certificate-score').textContent = `${results.score}%`;
        
        // Set motivational message based on score
        let motivation = '';
        if (results.score >= 90) {
            motivation = appState.settings.motivationMessages.perfect;
        } else if (results.score >= 75) {
            motivation = appState.settings.motivationMessages.excellent;
        } else if (results.score >= 60) {
            motivation = appState.settings.motivationMessages.good;
        } else if (results.score >= 40) {
            motivation = appState.settings.motivationMessages.average;
        } else {
            motivation = appState.settings.motivationMessages.poor;
        }
        document.getElementById('certificate-motivation').textContent = motivation;
        
        // Set date
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        document.getElementById('certificate-date').textContent = now.toLocaleDateString('id-ID', options);
        
        // Generate certificate code
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + 
                           Math.random().toString(36).substring(2, 6).toUpperCase();
        
        let certificateCode = '';
        if (participant.status === 'pelajar') {
            certificateCode = `${formattedName.replace(/\s/g, '')}/${participant.status.toUpperCase()}/${participant['school-level'].toUpperCase()}/${appState.examData.subject.toUpperCase()}/${now.getDate()}${now.getMonth()+1}${now.getFullYear()}/${randomCode}/PERGUNU-STB`;
        } else {
            certificateCode = `${formattedName.replace(/\s/g, '')}/${participant.status.toUpperCase()}/${appState.examData.examType.toUpperCase()}/${now.getDate()}${now.getMonth()+1}${now.getFullYear()}/${randomCode}/PERGUNU-STB`;
        }
        document.getElementById('certificate-code').textContent = certificateCode;
        
        // Play applause sound
        playApplauseSound();
        
        // Tampilkan certificate screen
        showScreen('certificate');
    });
    
    // Print Certificate
    document.getElementById('print-certificate-btn').addEventListener('click', function() {
        playButtonSound();
        window.print();
    });
    
    // Back to Results
    document.getElementById('back-to-results-btn').addEventListener('click', function() {
        playButtonSound();
        showScreen('results');
    });
    
    // Retake Exam
    document.getElementById('retake-exam-btn').addEventListener('click', function() {
        playButtonSound();
        if (confirm('Apakah Anda ingin mengulang ujian?')) {
            // Reset exam data
            appState.examData = {};
            appState.questions = [];
            appState.currentQuestionIndex = 0;
            appState.results = {
                correct: 0,
                wrong: 0,
                skipped: 0,
                score: 0
            };
            saveAppState();
            
            // Kembali ke exam level screen
            showScreen('exam-level');
        }
    });
    
    // Floating Buttons
    document.querySelector('.share-btn').addEventListener('click', function() {
        playButtonSound();
        document.getElementById('share-modal').style.display = 'flex';
    });
    
    document.querySelector('.whatsapp-btn').addEventListener('click', function() {
        playButtonSound();
        window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...`, '_blank');
    });
    
    document.querySelector('.bank-soal-btn').addEventListener('click', function() {
        playButtonSound();
        document.getElementById('bank-soal-modal').style.display = 'flex';
    });
    
    document.querySelector('.admin-btn').addEventListener('click', function() {
        playButtonSound();
        document.getElementById('admin-modal').style.display = 'flex';
    });
    
    // Close Modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Click outside modal to close
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            playButtonSound();
            e.target.style.display = 'none';
        }
    });
    
    // Bank Soal Login
    document.getElementById('bank-login-btn').addEventListener('click', function() {
        const bankCode = document.getElementById('bank-code').value;
        if (bankCode === appState.adminCodes.bankSoal) {
            playButtonSound();
            alert('Bank soal akan dibuka di panel admin.');
            document.getElementById('bank-soal-modal').style.display = 'none';
            // Di aplikasi lengkap, ini akan membuka bank soal
        } else {
            alert('Kode bank soal salah. Silakan coba lagi.');
        }
    });
    
    // Admin Panel Login
    document.getElementById('admin-login-btn').addEventListener('click', function() {
        const adminCode = document.getElementById('admin-code').value;
        if (adminCode === appState.adminCodes.adminPanel) {
            playButtonSound();
            alert('Panel admin akan dibuka.');
            document.getElementById('admin-modal').style.display = 'none';
            // Di aplikasi lengkap, ini akan membuka panel admin
        } else {
            alert('Kode admin salah. Silakan coba lagi.');
        }
    });
    
    // Copy Link
    document.getElementById('copy-link').addEventListener('click', function() {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                playButtonSound();
                alert('Tautan berhasil disalin!');
                document.getElementById('share-modal').style.display = 'none';
            })
            .catch(err => {
                console.error('Gagal menyalin tautan:', err);
            });
    });
    
    // Timer Functions
    function startTimer() {
        let timeLeft = appState.settings.examDuration * 60; // dalam detik
        
        // Update timer setiap detik
        appState.timerInterval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            document.getElementById('timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Jika sisa 10 menit, tampilkan peringatan
            if (timeLeft === 600) {
                showTimeWarning();
            }
            
            // Jika sisa 1 menit, sembunyikan peringatan
            if (timeLeft === 60) {
                hideTimeWarning();
            }
            
            // Jika waktu habis
            if (timeLeft <= 0) {
                clearInterval(appState.timerInterval);
                timeUp();
                return;
            }
            
            timeLeft--;
        }, 1000);
    }
    
    function showTimeWarning() {
        const warningElement = document.getElementById('time-warning');
        warningElement.style.display = 'block';
        
        // Perbesar timer
        document.getElementById('timer').style.fontSize = '1.5rem';
        document.getElementById('timer').style.color = 'var(--warning-color)';
    }
    
    function hideTimeWarning() {
        document.getElementById('time-warning').style.display = 'none';
    }
    
    function timeUp() {
        // Hitung soal yang belum dijawab sebagai salah
        const remainingQuestions = appState.questions.length - (appState.currentQuestionIndex + 1);
        appState.results.skipped += remainingQuestions;
        
        // Simpan timestamp selesai ujian
        appState.examEndTime = new Date().toISOString();
        saveAppState();
        
        // Tampilkan hasil
        showResults();
    }
    
    // Audio Functions
    function playButtonSound() {
        const audio = new Audio('assets/audio/audiotombol.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
    function playCorrectSound() {
        const audio = new Audio('assets/audio/jawabanbenar.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
    function playWrongSound() {
        const audio = new Audio('assets/audio/jawbansalah.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
    function playApplauseSound() {
        const audio = new Audio('assets/audio/applause.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Play opening audio once
    const openingAudio = document.getElementById('openingAudio');
    document.addEventListener('click', function playOnce() {
        openingAudio.play().catch(e => console.log('Audio play failed:', e));
        document.removeEventListener('click', playOnce);
    }, { once: true });
    
    // Inisialisasi tampilan awal
    showScreen('welcome');
    
    // Set greeting text
    document.getElementById('greeting-text').textContent = appState.settings.greetingText;
    document.getElementById('sub-greeting-text').textContent = appState.settings.subGreetingText;
    
    // Set terms text
    const termsContent = document.getElementById('terms-text');
    termsContent.innerHTML = '';
    appState.settings.termsText.forEach(term => {
        const p = document.createElement('p');
        p.textContent = term;
        termsContent.appendChild(p);
    });
    
    // Set periodic info
    document.getElementById('periodic-info').textContent = appState.settings.periodicInfo;
});
