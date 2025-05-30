// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Variabel global
    let currentScreen = 0;
    const screens = document.querySelectorAll('.screen');
    const examCode = '12345'; // Kode default
    const cpnsCode = 'OPENLOCK-1945';
    const questionBankCode = 'OPENLOCK-1926';
    const adminCode = '65614222';
    
    // Data peserta
    let participantData = {
        name: '',
        status: '',
        school: '',
        nis: '',
        address: '',
        phone: '',
        email: '',
        purpose: '',
        level: '',
        examType: '',
        examCategory: ''
    };
    
    // Data ujian
    let examData = {
        selectedExam: '',
        selectedLevel: '',
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        startTime: null,
        timerInterval: null,
        timeLeft: 120 * 60 // 120 menit dalam detik
    };
    
    // Contoh data soal (dalam implementasi nyata, ini akan diambil dari database)
    const sampleQuestions = {
        agama: [
            {
                question: "Apa rukun Islam yang pertama?",
                options: ["Shalat", "Puasa", "Syahadat", "Zakat", "Haji"],
                answer: 2, // Index option yang benar (0-based)
                explanation: "Rukun Islam yang pertama adalah mengucapkan dua kalimat syahadat."
            }
        ],
        ppkn: [
            {
                question: "Apa dasar negara Indonesia?",
                options: ["UUD 1945", "Pancasila", "Bhineka Tunggal Ika", "NKRI", "Gotong Royong"],
                answer: 1,
                explanation: "Pancasila adalah dasar negara Indonesia seperti tercantum dalam Pembukaan UUD 1945."
            }
        ],
        // Tambahkan soal untuk kategori lainnya...
    };
    
    // Inisialisasi partikel background
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
                    "enable": false,
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
    
    // Event listener untuk tombol masuk
    document.getElementById('enter-exam').addEventListener('click', function() {
        const enteredCode = document.getElementById('exam-code').value;
        if (enteredCode === examCode) {
            goToScreen(1); // Pindah ke screen persyaratan
        } else {
            alert('Kode ujian salah! Silakan coba lagi.');
        }
    });
    
    // Event listener untuk checkbox persyaratan
    document.getElementById('agree-terms').addEventListener('change', function() {
        document.getElementById('continue-exam').disabled = !this.checked;
    });
    
    // Event listener untuk tombol lanjut ujian
    document.getElementById('continue-exam').addEventListener('click', function() {
        goToScreen(2); // Pindah ke screen pendaftaran
    });
    
    // Event listener untuk radio button status
    document.querySelectorAll('input[name="status"]').forEach(radio => {
        radio.addEventListener('change', function() {
            participantData.status = this.value;
            if (this.value === 'pelajar') {
                document.getElementById('student-fields').style.display = 'block';
                document.getElementById('general-fields').style.display = 'none';
                document.getElementById('cpns-field').style.display = 'none';
            } else {
                document.getElementById('student-fields').style.display = 'none';
                document.getElementById('general-fields').style.display = 'block';
                
                // Tampilkan field CPNS jika dipilih
                if (document.getElementById('general-purpose').value === 'ujian-cpns') {
                    document.getElementById('cpns-field').style.display = 'block';
                }
            }
        });
    });
    
    // Event listener untuk tujuan ujian umum
    document.getElementById('general-purpose').addEventListener('change', function() {
        if (this.value === 'ujian-cpns') {
            document.getElementById('cpns-field').style.display = 'block';
        } else {
            document.getElementById('cpns-field').style.display = 'none';
        }
    });
    
    // Event listener untuk form pendaftaran
    document.getElementById('participant-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validasi data
        if (!validateParticipantData()) {
            return;
        }
        
        // Simpan data peserta
        participantData.name = document.getElementById('full-name').value;
        
        if (participantData.status === 'pelajar') {
            participantData.school = document.getElementById('school-name').value;
            participantData.nis = document.getElementById('nis').value;
            participantData.purpose = document.getElementById('student-purpose').value;
            participantData.level = document.getElementById('student-level').value;
        } else {
            participantData.address = document.getElementById('address').value;
            participantData.phone = document.getElementById('phone').value;
            participantData.email = document.getElementById('email').value;
            participantData.purpose = document.getElementById('general-purpose').value;
            
            // Validasi khusus CPNS
            if (participantData.purpose === 'ujian-cpns') {
                const licenseCode = document.getElementById('license-code').value;
                if (licenseCode !== cpnsCode) {
                    alert('Kode Lisensi Ujian CPNS/P3K salah!');
                    return;
                }
            }
        }
        
        // Pindah ke screen pemilihan ujian
        goToScreen(3);
        
        // Siapkan tampilan berdasarkan status peserta
        if (participantData.status === 'pelajar') {
            document.getElementById('student-exams').style.display = 'block';
            document.getElementById('general-exams').style.display = 'none';
            
            // Isi tombol tingkat kelas
            const levelButtons = document.getElementById('student-level-buttons');
            levelButtons.innerHTML = '';
            
            let levels = [];
            if (participantData.level === 'SD') {
                levels = ['Kelas IV', 'Kelas V', 'Kelas VI'];
            } else if (participantData.level === 'SMP') {
                levels = ['Kelas VII', 'Kelas VIII', 'Kelas IX'];
            } else if (participantData.level === 'SMA') {
                levels = ['Kelas X', 'Kelas XI', 'Kelas XII'];
            }
            
            levels.forEach(level => {
                const button = document.createElement('button');
                button.className = 'level-btn';
                button.textContent = level;
                button.dataset.level = level.toLowerCase().replace(' ', '-');
                button.addEventListener('click', function() {
                    document.querySelectorAll('.level-btn').forEach(btn => {
                        btn.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    examData.selectedLevel = this.dataset.level;
                    checkExamReady();
                });
                levelButtons.appendChild(button);
            });
        } else {
            document.getElementById('student-exams').style.display = 'none';
            document.getElementById('general-exams').style.display = 'block';
        }
    });
    
    // Event listener untuk tombol jenis ujian
    document.querySelectorAll('.exam-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.exam-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');
            examData.selectedExam = this.dataset.exam;
            checkExamReady();
        });
    });
    
    // Event listener untuk tombol mulai ujian
    document.getElementById('start-exam').addEventListener('click', function() {
        // Set data ujian
        examData.questions = sampleQuestions[examData.selectedExam] || [];
        examData.currentQuestionIndex = 0;
        examData.answers = [];
        examData.startTime = new Date();
        examData.timeLeft = 120 * 60; // Reset timer
        
        // Mulai timer
        startTimer(examData.timeLeft, document.getElementById('time'));
        
        // Tampilkan soal pertama
        showQuestion();
        
        // Pindah ke screen ujian
        goToScreen(4);
    });
    
    // Event listener untuk tombol jawaban
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('option')) {
            const optionIndex = parseInt(e.target.dataset.option);
            const question = examData.questions[examData.currentQuestionIndex];
            
            // Simpan jawaban
            examData.answers[examData.currentQuestionIndex] = optionIndex;
            
            // Tampilkan feedback
            if (optionIndex === question.answer) {
                e.target.classList.add('correct');
                playSound('jawabanbenar.mp3');
            } else {
                e.target.classList.add('wrong');
                playSound('jawabansalah.mp3');
                
                // Tandai jawaban yang benar
                const options = document.querySelectorAll('.option');
                options[question.answer].classList.add('correct');
            }
            
            // Tampilkan penjelasan
            document.getElementById('explanation-text').textContent = question.explanation;
            document.getElementById('explanation-container').style.display = 'block';
            
            // Nonaktifkan semua opsi
            document.querySelectorAll('.option').forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
            
            // Auto lanjut ke soal berikutnya setelah 3 detik
            setTimeout(() => {
                nextQuestion();
            }, 3000);
        }
    });
    
    // Event listener untuk tombol lewati soal
    document.getElementById('skip-question').addEventListener('click', function() {
        nextQuestion();
    });
    
    // Event listener untuk tombol soal belum dijawab
    document.getElementById('unanswered-questions').addEventListener('click', function() {
        // Cari soal yang belum dijawab
        const unanswered = examData.answers.findIndex((ans, idx) => ans === undefined && idx !== examData.currentQuestionIndex);
        if (unanswered !== -1) {
            examData.currentQuestionIndex = unanswered;
            showQuestion();
        } else {
            alert('Tidak ada soal lain yang belum dijawab.');
        }
    });
    
    // Event listener untuk tombol selesaikan ujian
    document.getElementById('finish-exam').addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin menyelesaikan ujian sekarang? Soal yang belum dijawab akan dianggap salah.')) {
            finishExam();
        }
    });
    
    // Event listener untuk tombol lihat sertifikat
    document.getElementById('view-certificate').addEventListener('click', function() {
        document.getElementById('result-summary').style.display = 'none';
        document.getElementById('certificate-container').style.display = 'block';
        
        // Isi data sertifikat
        document.getElementById('certificate-name').textContent = participantData.name;
        document.getElementById('certificate-exam').textContent = `Ujian ${examData.selectedExam.toUpperCase()} Pergunu Situbondo`;
        document.getElementById('certificate-score').textContent = calculateScore();
        document.getElementById('certificate-date').textContent = `Ditetapkan di: Situbondo, ${formatDate(new Date())}`;
        document.getElementById('certificate-message').textContent = getMotivationalMessage(calculateScore());
        document.getElementById('certificate-code').textContent = generateCertificateCode();
        
        // Putar suara applause
        playSound('applause.mp3');
    });
    
    // Event listener untuk tombol kembali ke hasil
    document.getElementById('back-to-results').addEventListener('click', function() {
        document.getElementById('result-summary').style.display = 'block';
        document.getElementById('certificate-container').style.display = 'none';
    });
    
    // Event listener untuk tombol cetak sertifikat
    document.getElementById('print-certificate').addEventListener('click', function() {
        window.print();
    });
    
    // Event listener untuk tombol ulangi ujian
    document.getElementById('retake-exam').addEventListener('click', function() {
        if (confirm('Apakah Anda ingin mengulang ujian?')) {
            goToScreen(3); // Kembali ke pemilihan ujian
        }
    });
    
    // Event listener untuk tombol mengambang
    document.querySelector('.share-btn').addEventListener('click', showShareModal);
    document.querySelector('.whatsapp-btn').addEventListener('click', openWhatsApp);
    document.querySelector('.question-bank-btn').addEventListener('click', showQuestionBankModal);
    document.querySelector('.admin-btn').addEventListener('click', showAdminModal);
    
    // Event listener untuk tutup modal
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Event listener untuk masuk ke bank soal
    document.getElementById('enter-question-bank').addEventListener('click', function() {
        const enteredCode = document.getElementById('question-bank-code').value;
        if (enteredCode === questionBankCode) {
            alert('Bank soal akan dibuka di tab baru (dalam implementasi nyata).');
            // window.open('question-bank.html', '_blank');
            document.getElementById('question-bank-modal').style.display = 'none';
        } else {
            alert('Kode bank soal salah!');
        }
    });
    
    // Event listener untuk masuk ke panel admin
    document.getElementById('enter-admin').addEventListener('click', function() {
        const enteredCode = document.getElementById('admin-code').value;
        if (enteredCode === adminCode) {
            alert('Panel admin akan dibuka di tab baru (dalam implementasi nyata).');
            // window.open('admin.html', '_blank');
            document.getElementById('admin-modal').style.display = 'none';
        } else {
            alert('Kode admin salah!');
        }
    });
    
    // Fungsi untuk berpindah screen
    function goToScreen(index) {
        // Animasi keluar untuk screen saat ini
        if (screens[currentScreen]) {
            screens[currentScreen].style.animation = 'slideOutLeft 0.5s forwards';
        }
        
        // Set timeout untuk memungkinkan animasi keluar selesai
        setTimeout(() => {
            screens.forEach((screen, i) => {
                if (i === index) {
                    screen.classList.add('active');
                    screen.style.animation = 'slideInRight 0.5s forwards';
                } else {
                    screen.classList.remove('active');
                    screen.style.animation = '';
                }
            });
            currentScreen = index;
            
            // Scroll ke atas
            window.scrollTo(0, 0);
            
            // Jika pindah ke hasil ujian, hitung skor
            if (index === 5) {
                showResults();
            }
        }, 500);
    }
    
    // Fungsi validasi data peserta
    function validateParticipantData() {
        // Validasi nama
        if (document.getElementById('full-name').value.trim() === '') {
            alert('Nama lengkap harus diisi!');
            return false;
        }
        
        // Validasi untuk pelajar
        if (participantData.status === 'pelajar') {
            if (document.getElementById('school-name').value.trim() === '') {
                alert('Nama sekolah harus diisi!');
                return false;
            }
            
            if (document.getElementById('nis').value.trim() === '') {
                alert('NIS harus diisi!');
                return false;
            }
            
            if (document.getElementById('student-purpose').value === '') {
                alert('Tujuan ikut ujian harus dipilih!');
                return false;
            }
            
            if (document.getElementById('student-level').value === '') {
                alert('Tingkat sekolah harus dipilih!');
                return false;
            }
        } 
        // Validasi untuk umum
        else {
            if (document.getElementById('address').value.trim() === '') {
                alert('Alamat harus diisi!');
                return false;
            }
            
            const phone = document.getElementById('phone').value.trim();
            if (phone === '' || !/^\d{10,13}$/.test(phone)) {
                alert('Nomor WhatsApp harus diisi dengan 10-13 digit angka!');
                return false;
            }
            
            const email = document.getElementById('email').value.trim();
            if (email === '' || !validateEmail(email)) {
                alert('Email harus diisi dengan format yang valid (@gmail, @yahoo, atau @hotmail)!');
                return false;
            }
            
            if (document.getElementById('general-purpose').value === '') {
                alert('Tujuan ikut ujian harus dipilih!');
                return false;
            }
        }
        
        return true;
    }
    
    // Fungsi validasi email
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+(gmail|yahoo|hotmail)\.(com|co\.id))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Fungsi untuk memeriksa apakah ujian siap dimulai
    function checkExamReady() {
        const startBtn = document.getElementById('start-exam');
        if (examData.selectedExam && 
            (participantData.status === 'umum' || 
             (participantData.status === 'pelajar' && examData.selectedLevel))) {
            startBtn.disabled = false;
        } else {
            startBtn.disabled = true;
        }
    }
    
    // Fungsi untuk memulai timer
    function startTimer(duration, display) {
        // Hentikan timer sebelumnya jika ada
        if (examData.timerInterval) {
            clearInterval(examData.timerInterval);
        }
        
        let timer = duration, minutes, seconds;
        examData.timerInterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
            examData.timeLeft = timer;
    
            // Notifikasi 10 menit terakhir
            if (timer === 600) {
                showNotification('Perhatian! Ujian akan berakhir dalam waktu 10 menit. Mohon pastikan semua jawaban telah diselesaikan dan diperiksa sebelum waktu habis.');
                display.classList.add('warning');
            }
    
            if (--timer < 0) {
                clearInterval(examData.timerInterval);
                finishExam();
            }
        }, 1000);
    }
    
    // Fungsi untuk menampilkan soal
    function showQuestion() {
        const question = examData.questions[examData.currentQuestionIndex];
        const optionsContainer = document.getElementById('options-container');
        
        // Update teks soal
        document.getElementById('question-text').textContent = question.question;
        
        // Update progress
        document.getElementById('current-question').textContent = examData.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = examData.questions.length;
        
        // Kosongkan opsi sebelumnya
        optionsContainer.innerHTML = '';
        
        // Tambahkan opsi jawaban
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.dataset.option = index;
            
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = 'question-option';
            optionInput.id = `option-${index}`;
            
            const optionLabel = document.createElement('label');
            optionLabel.htmlFor = `option-${index}`;
            optionLabel.textContent = option;
            
            optionElement.appendChild(optionInput);
            optionElement.appendChild(optionLabel);
            optionsContainer.appendChild(optionElement);
        });
        
        // Sembunyikan penjelasan
        document.getElementById('explanation-container').style.display = 'none';
        
        // Aktifkan opsi jika sudah pernah dijawab
        if (examData.answers[examData.currentQuestionIndex] !== undefined) {
            const selectedOption = examData.answers[examData.currentQuestionIndex];
            const correctAnswer = question.answer;
            
            document.querySelectorAll('.option').forEach((opt, idx) => {
                if (idx === selectedOption) {
                    opt.classList.add(selectedOption === correctAnswer ? 'correct' : 'wrong');
                }
                if (idx === correctAnswer && selectedOption !== correctAnswer) {
                    opt.classList.add('correct');
                }
                opt.style.pointerEvents = 'none';
            });
            
            // Tampilkan penjelasan
            document.getElementById('explanation-text').textContent = question.explanation;
            document.getElementById('explanation-container').style.display = 'block';
        } else {
            // Aktifkan semua opsi
            document.querySelectorAll('.option').forEach(opt => {
                opt.style.pointerEvents = 'auto';
            });
        }
    }
    
    // Fungsi untuk pindah ke soal berikutnya
    function nextQuestion() {
        if (examData.currentQuestionIndex < examData.questions.length - 1) {
            examData.currentQuestionIndex++;
            showQuestion();
        } else {
            // Jika sudah di soal terakhir, tanya apakah ingin menyelesaikan
            if (confirm('Ini adalah soal terakhir. Apakah Anda ingin menyelesaikan ujian?')) {
                finishExam();
            } else {
                // Kembali ke soal pertama
                examData.currentQuestionIndex = 0;
                showQuestion();
            }
        }
    }
    
    // Fungsi untuk menyelesaikan ujian
    function finishExam() {
        // Hentikan timer
        clearInterval(examData.timerInterval);
        
        // Hitung jawaban yang belum diisi sebagai salah
        for (let i = 0; i < examData.questions.length; i++) {
            if (examData.answers[i] === undefined) {
                examData.answers[i] = -1; // Tandai sebagai tidak dijawab
            }
        }
        
        // Pindah ke screen hasil
        goToScreen(5);
    }
    
    // Fungsi untuk menampilkan hasil ujian
    function showResults() {
        const totalQuestions = examData.questions.length;
        const correctAnswers = examData.answers.reduce((count, answer, index) => {
            return answer === examData.questions[index].answer ? count + 1 : count;
        }, 0);
        const wrongAnswers = totalQuestions - correctAnswers;
        const score = Math.round((correctAnswers / totalQuestions) * 100);
        
        // Update tampilan hasil
        document.getElementById('total-answered').textContent = totalQuestions;
        document.getElementById('correct-answers').textContent = correctAnswers;
        document.getElementById('wrong-answers').textContent = wrongAnswers;
        document.getElementById('final-score').textContent = score;
        
        // Tampilkan pesan motivasi
        document.getElementById('motivational-message').textContent = getMotivationalMessage(score);
        document.getElementById('certificate-message').textContent = getMotivationalMessage(score);
    }
    
    // Fungsi untuk menghitung skor
    function calculateScore() {
        const totalQuestions = examData.questions.length;
        const correctAnswers = examData.answers.reduce((count, answer, index) => {
            return answer === examData.questions[index].answer ? count + 1 : count;
        }, 0);
        return Math.round((correctAnswers / totalQuestions) * 100);
    }
    
    // Fungsi untuk mendapatkan pesan motivasi berdasarkan skor
    function getMotivationalMessage(score) {
        if (score >= 90) {
            return "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.";
        } else if (score >= 75) {
            return "Hasil yang sangat baik! Anda telah memahami sebagian besar materi dengan baik.";
        } else if (score >= 60) {
            return "Hasil yang baik. Teruslah belajar dan tingkatkan pemahaman Anda.";
        } else if (score >= 40) {
            return "Anda sudah memulai dengan baik. Perbanyak latihan untuk meningkatkan pemahaman.";
        } else {
            return "Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.";
        }
    }
    
    // Fungsi untuk menghasilkan kode sertifikat
    function generateCertificateCode() {
        const nameCode = participantData.name.toUpperCase().replace(/ /g, '_').substring(0, 5);
        const statusCode = participantData.status === 'pelajar' ? 'PLJ' : 'UMM';
        const levelCode = participantData.level ? participantData.level.toUpperCase() : 'UM';
        const examCode = examData.selectedExam.toUpperCase().substring(0, 3);
        const dateCode = formatDate(new Date()).replace(/\//g, '');
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
        
        return `${nameCode}/${statusCode}/${levelCode}/${examCode}/${dateCode}/${randomCode}/PERGUNU-STB`;
    }
    
    // Fungsi untuk memformat tanggal
    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}${month}${year}`;
    }
    
    // Fungsi untuk menampilkan notifikasi
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Tampilkan notifikasi
        setTimeout(() => {
            notification.style.display = 'block';
        }, 100);
        
        // Sembunyikan setelah 5 detik
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Fungsi untuk memutar suara
    function playSound(filename) {
        const audio = new Audio(`assets/audio/${filename}`);
        audio.play().catch(e => console.log('Autoplay prevented:', e));
    }
    
    // Fungsi untuk menampilkan modal share
    function showShareModal() {
        document.getElementById('share-modal').style.display = 'flex';
        
        // Isi link sosial media (dalam implementasi nyata akan diambil dari database)
        const socialLinks = [
            { name: 'Facebook', url: 'https://facebook.com', icon: 'fab fa-facebook-f' },
            { name: 'Twitter', url: 'https://twitter.com', icon: 'fab fa-twitter' },
            { name: 'WhatsApp', url: 'https://wa.me/', icon: 'fab fa-whatsapp' },
            { name: 'Telegram', url: 'https://t.me/', icon: 'fab fa-telegram' },
            { name: 'Email', url: 'mailto:', icon: 'fas fa-envelope' }
        ];
        
        const container = document.querySelector('.social-links');
        container.innerHTML = '';
        
        socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.className = 'social-link';
            a.href = link.url;
            a.target = '_blank';
            a.innerHTML = `<i class="${link.icon}"></i> ${link.name}`;
            container.appendChild(a);
        });
    }
    
    // Fungsi untuk membuka WhatsApp
    function openWhatsApp() {
        const phone = '6285647709114';
        const message = 'Assalamualaikum mas admin, saya mau tanya sesuatu nih...';
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    }
    
    // Fungsi untuk menampilkan modal bank soal
    function showQuestionBankModal() {
        document.getElementById('question-bank-modal').style.display = 'flex';
    }
    
    // Fungsi untuk menampilkan modal admin
    function showAdminModal() {
        document.getElementById('admin-modal').style.display = 'flex';
    }
    
    // Fungsi untuk mendapatkan lokasi
    document.getElementById('get-location').addEventListener('click', function() {
        if (navigator.geolocation) {
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendeteksi...';
            
            navigator.geolocation.getCurrentPosition(
                position => {
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
                                if (data.address.city_district) address += data.address.city_district + ', ';
                                if (data.address.city) address += data.address.city;
                            }
                            
                            if (address) {
                                document.getElementById('address').value = address;
                            } else {
                                document.getElementById('address').value = `Lokasi: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                            }
                            
                            this.disabled = false;
                            this.innerHTML = '<i class="fas fa-map-marker-alt"></i> Gunakan Lokasi Saya';
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            document.getElementById('address').value = `Lokasi: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                            this.disabled = false;
                            this.innerHTML = '<i class="fas fa-map-marker-alt"></i> Gunakan Lokasi Saya';
                        });
                },
                error => {
                    console.error('Error getting location:', error);
                    alert('Tidak dapat mendapatkan lokasi. Pastikan Anda mengizinkan akses lokasi.');
                    this.disabled = false;
                    this.innerHTML = '<i class="fas fa-map-marker-alt"></i> Gunakan Lokasi Saya';
                }
            );
        } else {
            alert('Browser Anda tidak mendukung geolocation.');
        }
    });
    
    // Tutup modal ketika klik di luar konten modal
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});
