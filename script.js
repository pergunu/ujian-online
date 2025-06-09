// Inisialisasi Variabel Global
let currentPage = 'welcome-page';
let participantData = {};
let examData = {};
let examResults = {};
let questions = [];
let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = 120 * 60; // 120 menit dalam detik
let answeredQuestions = {};
let correctAnswers = 0;
let wrongAnswers = 0;
let unansweredQuestions = 0;
let totalQuestions = 10;

// Default Codes
const defaultCodes = {
    login: '12345',
    cpns: 'OPENLOCK-1945',
    bankSoal: 'OPENLOCK-1926',
    admin: '65614222'
};

// Data Soal Contoh (akan digantikan dengan data dari bank soal)
const sampleQuestions = {
    AGAMA: [
        {
            question: "Apa nama kitab suci agama Islam?",
            options: {
                A: "Injil",
                B: "Taurat",
                C: "Al-Quran",
                D: "Weda",
                E: "Tripitaka"
            },
            correctAnswer: "C",
            explanation: "Kitab suci agama Islam adalah Al-Quran yang diturunkan kepada Nabi Muhammad SAW."
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
                E: "Keputusan MPR"
            },
            correctAnswer: "A",
            explanation: "Pancasila sebagai dasar negara tercantum dalam alinea keempat Pembukaan UUD 1945."
        }
    ],
    SEJARAH: [
        {
            question: "Kapan Indonesia merdeka?",
            options: {
                A: "16 Agustus 1945",
                B: "17 Agustus 1945",
                C: "18 Agustus 1945",
                D: "19 Agustus 1945",
                E: "20 Agustus 1945"
            },
            correctAnswer: "B",
            explanation: "Indonesia merdeka pada tanggal 17 Agustus 1945 yang dibacakan oleh Soekarno-Hatta."
        }
    ],
    IPA: [
        {
            question: "Planet terdekat dengan matahari adalah?",
            options: {
                A: "Venus",
                B: "Bumi",
                C: "Mars",
                D: "Merkurius",
                E: "Jupiter"
            },
            correctAnswer: "D",
            explanation: "Merkurius adalah planet terdekat dengan matahari dalam tata surya kita."
        }
    ],
    IPS: [
        {
            question: "Apa mata uang Jepang?",
            options: {
                A: "Dollar",
                B: "Euro",
                C: "Yen",
                D: "Pound",
                E: "Won"
            },
            correctAnswer: "C",
            explanation: "Mata uang Jepang adalah Yen (¥)."
        }
    ],
    MATEMATIKA: [
        {
            question: "Berapa hasil dari 7 × 8?",
            options: {
                A: "48",
                B: "54",
                C: "56",
                D: "64",
                E: "72"
            },
            correctAnswer: "C",
            explanation: "7 × 8 = 56. Ini adalah hasil perkalian dari 7 dan 8."
        }
    ],
    "BAHASA INDONESIA": [
        {
            question: "Apa sinonim dari kata 'bahagia'?",
            options: {
                A: "Sedih",
                B: "Senang",
                C: "Marah",
                D: "Kecewa",
                E: "Takut"
            },
            correctAnswer: "B",
            explanation: "Sinonim dari kata 'bahagia' adalah 'senang' yang berarti perasaan gembira atau puas."
        }
    ],
    "BAHASA INGGRIS": [
        {
            question: "What is the English word for 'buku'?",
            options: {
                A: "Pen",
                B: "Book",
                C: "Table",
                D: "Chair",
                E: "Bag"
            },
            correctAnswer: "B",
            explanation: "The English word for 'buku' is 'book' which means a written or printed work consisting of pages."
        }
    ],
    "MATERI EXTRA": [
        {
            question: "Siapakah pencipta lagu Indonesia Raya?",
            options: {
                A: "W.R. Supratman",
                B: "C. Simanjuntak",
                C: "Ismail Marzuki",
                D: "Ibu Sud",
                E: "Gesang"
            },
            correctAnswer: "A",
            explanation: "Lagu Indonesia Raya diciptakan oleh Wage Rudolf Supratman dan pertama kali diperdengarkan pada 28 Oktober 1928."
        }
    ],
    "MATERI KHUSUS": [
        {
            question: "Apa ibukota provinsi Jawa Timur?",
            options: {
                A: "Surabaya",
                B: "Malang",
                C: "Kediri",
                D: "Madiun",
                E: "Banyuwangi"
            },
            correctAnswer: "A",
            explanation: "Ibukota provinsi Jawa Timur adalah Surabaya yang merupakan kota terbesar kedua di Indonesia."
        }
    ],
    "UJIAN LOGIKA": [
        {
            question: "Jika semua A adalah B dan semua B adalah C, maka:",
            options: {
                A: "Semua A adalah C",
                B: "Semua C adalah A",
                C: "Beberapa A adalah C",
                D: "Beberapa C adalah A",
                E: "Tidak ada yang benar"
            },
            correctAnswer: "A",
            explanation: "Jika semua A adalah B dan semua B adalah C, maka dapat disimpulkan bahwa semua A adalah C."
        }
    ],
    "UJIAN CPNS/P3K": [
        {
            question: "Menurut UUD 1945, kekuasaan legislatif dilaksanakan oleh:",
            options: {
                A: "Presiden",
                B: "DPR",
                C: "DPR dan Presiden",
                D: "DPR, DPD, dan MPR",
                E: "Mahkamah Agung"
            },
            correctAnswer: "D",
            explanation: "Menurut UUD 1945 Pasal 20A, kekuasaan legislatif dilaksanakan oleh DPR, DPD, dan MPR."
        }
    ]
};

// Data Peserta Contoh
let participants = [];

// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Set halaman awal
    showPage('welcome-page');
    
    // Mainkan audio opening
    document.getElementById('opening-audio').play();
    
    // Inisialisasi partikel
    initParticles();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load data dari localStorage jika ada
    loadFromLocalStorage();
});

// Fungsi untuk Inisialisasi Partikel
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.1
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Gambar partikel
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            // Gambar partikel sebagai bintang
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            
            // Gambar bintang kecil
            for (let j = 0; j < 5; j++) {
                ctx.lineTo(
                    p.x + p.size * Math.cos((j * 2 * Math.PI / 5) - Math.PI / 2),
                    p.y + p.size * Math.sin((j * 2 * Math.PI / 5) - Math.PI / 2)
                );
                ctx.lineTo(
                    p.x + (p.size / 2) * Math.cos((j * 2 * Math.PI / 5 + Math.PI / 5) - Math.PI / 2),
                    p.y + (p.size / 2) * Math.sin((j * 2 * Math.PI / 5 + Math.PI / 5) - Math.PI / 2)
                );
            }
            
            ctx.closePath();
            ctx.fill();
            
            // Animasi partikel
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Reset partikel jika keluar dari layar
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            
            // Efek kerlipan acak
            if (Math.random() < 0.01) {
                p.opacity = Math.random() * 0.5 + 0.1;
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Handle resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Fungsi untuk Setup Event Listeners
function setupEventListeners() {
    // Tombol Login
    document.getElementById('login-btn').addEventListener('click', function() {
        const loginCode = document.getElementById('login-code').value;
        const errorElement = document.getElementById('login-error');
        
        if (loginCode === defaultCodes.login) {
            playButtonSound();
            showPage('terms-page');
        } else {
            errorElement.textContent = "Kode login salah. Silakan coba lagi.";
            errorElement.style.display = 'block';
        }
    });
    
    // Checkbox Persyaratan
    document.getElementById('agree-terms').addEventListener('change', function() {
        document.getElementById('terms-next-btn').disabled = !this.checked;
    });
    
    // Tombol Lanjut dari Persyaratan
    document.getElementById('terms-next-btn').addEventListener('click', function() {
        playButtonSound();
        showPage('participant-page');
    });
    
    // Toggle Form Peserta berdasarkan Status
    document.querySelectorAll('input[name="status"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'pelajar') {
                document.getElementById('student-form').style.display = 'block';
                document.getElementById('general-form').style.display = 'none';
            } else {
                document.getElementById('student-form').style.display = 'none';
                document.getElementById('general-form').style.display = 'block';
            }
        });
    });
    
    // Tombol GPS untuk Alamat
    document.getElementById('gps-btn').addEventListener('click', function() {
        playButtonSound();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                // Gunakan API geocoding untuk mendapatkan alamat dari koordinat
                // Ini adalah contoh, Anda perlu mengganti dengan API yang sebenarnya
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // Contoh: menggunakan Nominatim (OpenStreetMap)
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                    .then(response => response.json())
                    .then(data => {
                        const address = data.display_name || "Alamat tidak ditemukan";
                        document.getElementById('address').value = address;
                    })
                    .catch(error => {
                        console.error("Error getting address:", error);
                        document.getElementById('address').value = "Gagal mendapatkan alamat";
                    });
            }, function(error) {
                alert("Gagal mendapatkan lokasi: " + error.message);
            });
        } else {
            alert("Browser tidak mendukung geolocation");
        }
    });
    
    // Form Data Peserta
    document.getElementById('participant-form').addEventListener('submit', function(e) {
        e.preventDefault();
        playButtonSound();
        
        // Kumpulkan data peserta
        participantData = {
            fullname: document.getElementById('fullname').value,
            status: document.querySelector('input[name="status"]:checked').value,
            purpose: document.querySelector('input[name="status"]:checked').value === 'pelajar' 
                ? document.getElementById('student-purpose').value 
                : document.getElementById('general-purpose').value,
            timestamp: new Date().toISOString()
        };
        
        if (participantData.status === 'pelajar') {
            participantData.school = document.getElementById('school').value;
            participantData.nis = document.getElementById('nis').value;
            participantData.schoolLevel = document.getElementById('school-level').value;
        } else {
            participantData.address = document.getElementById('address').value;
            participantData.whatsapp = document.getElementById('whatsapp').value;
            participantData.email = document.getElementById('email').value;
        }
        
        // Simpan data peserta
        participants.push(participantData);
        saveToLocalStorage('participants', participants);
        
        // Lanjut ke halaman pilihan ujian
        showPage('exam-option-page');
        setupExamOptions();
    });
    
    // Tombol Mulai Ujian
    document.getElementById('start-exam-btn').addEventListener('click', function() {
        playButtonSound();
        startExam();
    });
    
    // Tombol Bank Soal
    document.getElementById('question-bank-btn').addEventListener('click', function() {
        playButtonSound();
        showAccessCodeModal('bankSoal');
    });
    
    // Tombol Kontrol Panel Admin
    document.getElementById('admin-panel-btn').addEventListener('click', function() {
        playButtonSound();
        showAccessCodeModal('admin');
    });
    
    // Tombol Share
    document.getElementById('share-btn').addEventListener('click', function() {
        playButtonSound();
        showShareModal();
    });
    
    // Tombol WhatsApp
    document.getElementById('whatsapp-btn').addEventListener('click', function() {
        playButtonSound();
        window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih…`, '_blank');
    });
    
    // Event listeners untuk modal
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    // Tutup modal saat klik di luar
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
    
    // Tab pada modal
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContainer = this.closest('.modal-content');
            
            // Nonaktifkan semua tab
            tabContainer.querySelectorAll('.tab-btn').forEach(t => {
                t.classList.remove('active');
            });
            
            tabContainer.querySelectorAll('.tab-content').forEach(c => {
                c.classList.remove('active');
            });
            
            // Aktifkan tab yang dipilih
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Event listeners untuk halaman ujian
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected') && !this.classList.contains('correct') && !this.classList.contains('wrong')) {
                selectAnswer(this.getAttribute('data-option'));
            }
        });
    });
    
    document.getElementById('skip-question-btn').addEventListener('click', function() {
        playButtonSound();
        nextQuestion();
    });
    
    document.getElementById('unanswered-btn').addEventListener('click', function() {
        playButtonSound();
        showUnansweredQuestions();
    });
    
    document.getElementById('finish-exam-btn').addEventListener('click', function() {
        playButtonSound();
        finishExam();
    });
    
    // Event listeners untuk halaman hasil
    document.getElementById('print-certificate-btn').addEventListener('click', function() {
        playButtonSound();
        showCertificate();
    });
    
    document.getElementById('retry-exam-btn').addEventListener('click', function() {
        playButtonSound();
        showPage('exam-option-page');
    });
    
    // Event listeners untuk halaman sertifikat
    document.getElementById('close-certificate-btn').addEventListener('click', function() {
        playButtonSound();
        showPage('result-page');
    });
    
    document.getElementById('download-certificate-btn').addEventListener('click', function() {
        playButtonSound();
        downloadCertificate();
    });
    
    // Event listeners untuk modal bank soal
    document.getElementById('question-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveQuestion();
    });
    
    document.getElementById('clear-form-btn').addEventListener('click', function() {
        playButtonSound();
        document.getElementById('question-form').reset();
    });
    
    document.getElementById('generate-ai-btn').addEventListener('click', function() {
        playButtonSound();
        generateQuestionsWithAI();
    });
    
    // Event listeners untuk modal admin
    document.getElementById('save-login-code-btn').addEventListener('click', function() {
        playButtonSound();
        updateCode('login');
    });
    
    document.getElementById('save-cpns-code-btn').addEventListener('click', function() {
        playButtonSound();
        updateCode('cpns');
    });
    
    document.getElementById('save-bank-code-btn').addEventListener('click', function() {
        playButtonSound();
        updateCode('bankSoal');
    });
    
    document.getElementById('save-admin-code-btn').addEventListener('click', function() {
        playButtonSound();
        updateCode('admin');
    });
    
    document.getElementById('save-exam-settings-btn').addEventListener('click', function() {
        playButtonSound();
        saveExamSettings();
    });
    
    document.getElementById('save-text-settings-btn').addEventListener('click', function() {
        playButtonSound();
        saveTextSettings();
    });
    
    document.getElementById('export-participants-btn').addEventListener('click', function() {
        playButtonSound();
        exportParticipants();
    });
    
    // Event listener untuk modal kode akses (diperbaiki)
    document.getElementById('verify-access-code-btn').addEventListener('click', function() {
        const code = document.getElementById('input-access-code').value;
        const type = document.getElementById('access-code-modal').getAttribute('data-type');
        let valid = false;
        
        if (type === 'bankSoal' && (code === defaultCodes.bankSoal || code === localStorage.getItem('bankCode'))) {
            valid = true;
            document.getElementById('question-bank-modal').style.display = 'block';
        } else if (type === 'admin' && (code === defaultCodes.admin || code === localStorage.getItem('adminCode'))) {
            valid = true;
            document.getElementById('admin-panel-modal').style.display = 'block';
            loadAdminPanel();
        }
        
        if (valid) {
            document.getElementById('access-code-modal').style.display = 'none';
        } else {
            document.getElementById('access-code-error').textContent = "Kode akses salah. Silakan coba lagi.";
            document.getElementById('access-code-error').style.display = 'block';
        }
    });
    
    // Event listener untuk tombol back to result (diperbaiki)
    document.getElementById('back-to-result-btn').addEventListener('click', function() {
        showPage('result-page');
    });
}

// Fungsi untuk Menampilkan Halaman
function showPage(pageId) {
    // Sembunyikan semua halaman
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        
        // Tambahkan efek slide out untuk halaman sebelumnya
        if (page.id === currentPage) {
            page.classList.add('slide-out');
            setTimeout(() => {
                page.classList.remove('slide-out');
            }, 500);
        }
    });
    
    // Tampilkan halaman yang dipilih dengan efek slide in
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active', 'slide-in');
    setTimeout(() => {
        targetPage.classList.remove('slide-in');
    }, 500);
    
    currentPage = pageId;
    
    // Sembunyikan tombol mengambang di halaman sertifikat
    if (pageId === 'certificate-page') {
        document.querySelector('.floating-buttons').style.display = 'none';
    } else {
        document.querySelector('.floating-buttons').style.display = 'flex';
    }
    
    // Scroll ke atas
    window.scrollTo(0, 0);
}

// Fungsi untuk Setup Pilihan Ujian
function setupExamOptions() {
    const isStudent = participantData.status === 'pelajar';
    
    // Tampilkan opsi yang sesuai
    document.getElementById('student-exam-options').style.display = isStudent ? 'block' : 'none';
    document.getElementById('general-exam-options').style.display = isStudent ? 'none' : 'block';
    
    // Setup opsi kelas untuk pelajar
    if (isStudent) {
        document.getElementById('sd-options').style.display = participantData.schoolLevel === 'SD' ? 'block' : 'none';
        document.getElementById('smp-options').style.display = participantData.schoolLevel === 'SMP' ? 'block' : 'none';
        document.getElementById('sma-options').style.display = participantData.schoolLevel === 'SMA/SMK' ? 'block' : 'none';
        
        // Reset pilihan kelas
        document.querySelectorAll('.btn-roman').forEach(btn => {
            btn.classList.remove('active');
        });
    } else {
        // Setup untuk umum
        document.getElementById('cpns-license').style.display = 'none';
    }
    
    // Reset pilihan mata pelajaran
    document.querySelectorAll('.btn-subject').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Nonaktifkan tombol mulai ujian
    document.getElementById('start-exam-btn').disabled = true;
    
    // Event listeners untuk pilihan kelas (pelajar)
    document.querySelectorAll('.btn-roman').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            document.querySelectorAll('.btn-roman').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            examData.grade = this.getAttribute('data-grade');
            checkExamReady();
        });
    });
    
    // Event listeners untuk pilihan mata pelajaran
    document.querySelectorAll('.btn-subject').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            const subject = this.getAttribute('data-subject');
            
            // Jika memilih CPNS, tampilkan form kode lisensi
            if (subject === 'UJIAN CPNS/P3K' && participantData.status === 'umum') {
                document.getElementById('cpns-license').style.display = 'block';
                document.getElementById('license-code').value = '';
                document.getElementById('license-error').style.display = 'none';
                
                // Nonaktifkan tombol mulai ujian sampai kode diverifikasi
                document.getElementById('start-exam-btn').disabled = true;
            } else {
                document.getElementById('cpns-license').style.display = 'none';
            }
            
            // Reset pilihan sebelumnya
            document.querySelectorAll('.btn-subject').forEach(b => {
                b.classList.remove('active');
            });
            
            this.classList.add('active');
            examData.subject = subject;
            checkExamReady();
        });
    });
    
    // Event listener untuk verifikasi kode lisensi CPNS
    document.getElementById('verify-license-btn').addEventListener('click', function() {
        playButtonSound();
        const licenseCode = document.getElementById('license-code').value;
        const errorElement = document.getElementById('license-error');
        
        if (licenseCode === defaultCodes.cpns) {
            errorElement.style.display = 'none';
            checkExamReady();
        } else {
            errorElement.textContent = "Kode lisensi salah. Silakan coba lagi.";
            errorElement.style.display = 'block';
            document.getElementById('start-exam-btn').disabled = true;
        }
    });
}

// Fungsi untuk Memeriksa Kesiapan Ujian
function checkExamReady() {
    const isStudent = participantData.status === 'pelajar';
    let ready = false;
    
    if (isStudent) {
        ready = examData.grade && examData.subject;
    } else {
        if (examData.subject === 'UJIAN CPNS/P3K') {
            const licenseCode = document.getElementById('license-code').value;
            ready = licenseCode === defaultCodes.cpns;
        } else {
            ready = !!examData.subject;
        }
    }
    
    document.getElementById('start-exam-btn').disabled = !ready;
}

// Fungsi untuk Memulai Ujian
function startExam() {
    // Setup data ujian
    examData.startTime = new Date().toISOString();
    examData.questions = getQuestionsForSubject(examData.subject);
    totalQuestions = Math.min(examData.questions.length, 10); // Default 10 soal
    
    // Acak urutan soal jika diatur
    if (getSetting('randomizeQuestions') === 'yes') {
        examData.questions = shuffleArray(examData.questions).slice(0, totalQuestions);
    } else {
        examData.questions = examData.questions.slice(0, totalQuestions);
    }
    
    // Reset variabel ujian
    currentQuestionIndex = 0;
    answeredQuestions = {};
    correctAnswers = 0;
    wrongAnswers = 0;
    unansweredQuestions = totalQuestions;
    
    // Setup timer
    timeLeft = (getSetting('examTimer') || 120) * 60; // Dalam detik
    updateTimerDisplay();
    startTimer();
    
    // Tampilkan halaman ujian
    showPage('exam-page');
    showQuestion();
}

// Fungsi untuk Mendapatkan Soal berdasarkan Kategori
function getQuestionsForSubject(subject) {
    // Dalam implementasi nyata, ini akan mengambil dari database/localStorage
    // Untuk demo, kita gunakan sample questions
    return sampleQuestions[subject] || [];
}

// Fungsi untuk Menampilkan Soal
function showQuestion() {
    const question = examData.questions[currentQuestionIndex];
    const questionNumber = currentQuestionIndex + 1;
    
    // Update tampilan
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('option-a').textContent = question.options.A;
    document.getElementById('option-b').textContent = question.options.B;
    document.getElementById('option-c').textContent = question.options.C;
    document.getElementById('option-d').textContent = question.options.D;
    document.getElementById('option-e').textContent = question.options.E;
    
    document.getElementById('current-question').textContent = questionNumber;
    document.getElementById('total-questions').textContent = totalQuestions;
    
    // Reset tampilan opsi
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'wrong');
    });
    
    // Sembunyikan penjelasan
    document.getElementById('answer-explanation').style.display = 'none';
    
    // Tampilkan jawaban jika sudah dijawab sebelumnya
    if (answeredQuestions[currentQuestionIndex]) {
        const selectedOption = answeredQuestions[currentQuestionIndex].answer;
        const isCorrect = answeredQuestions[currentQuestionIndex].isCorrect;
        
        document.querySelector(`.option[data-option="${selectedOption}"]`).classList.add(isCorrect ? 'correct' : 'wrong');
        
        // Tampilkan penjelasan
        document.getElementById('explanation-text').textContent = question.explanation;
        document.getElementById('answer-explanation').style.display = 'block';
    }
}

// Fungsi untuk Memilih Jawaban
function selectAnswer(selectedOption) {
    const question = examData.questions[currentQuestionIndex];
    const isCorrect = selectedOption === question.correctAnswer;
    
    // Tandai opsi yang dipilih
    document.querySelector(`.option[data-option="${selectedOption}"]`).classList.add(isCorrect ? 'correct' : 'wrong');
    
    // Mainkan suara feedback
    if (isCorrect) {
        document.getElementById('correct-answer-audio').play();
        correctAnswers++;
    } else {
        document.getElementById('wrong-answer-audio').play();
        wrongAnswers++;
    }
    
    // Kurangi jumlah soal yang belum dijawab
    if (!answeredQuestions[currentQuestionIndex]) {
        unansweredQuestions--;
    }
    
    // Simpan jawaban
    answeredQuestions[currentQuestionIndex] = {
        answer: selectedOption,
        isCorrect: isCorrect
    };
    
    // Tampilkan penjelasan
    document.getElementById('explanation-text').textContent = question.explanation;
    document.getElementById('answer-explanation').style.display = 'block';
    
    // Auto lanjut ke soal berikutnya setelah 2 detik
    setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
            nextQuestion();
        }
    }, 2000);
}

// Fungsi untuk Soal Berikutnya
function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

// Fungsi untuk Soal Sebelumnya
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

// Fungsi untuk Menampilkan Soal yang Belum Dijawab
function showUnansweredQuestions() {
    const unansweredIndices = [];
    
    for (let i = 0; i < totalQuestions; i++) {
        if (!answeredQuestions[i]) {
            unansweredIndices.push(i);
        }
    }
    
    if (unansweredIndices.length > 0) {
        currentQuestionIndex = unansweredIndices[0];
        showQuestion();
    } else {
        alert("Semua soal sudah dijawab!");
    }
}

// Fungsi untuk Timer
function startTimer() {
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        // Peringatan waktu hampir habis
        if (timeLeft === 10 * 60) { // 10 menit
            showTimeWarning();
        }
        
        // Sembunyikan peringatan saat 1 menit tersisa
        if (timeLeft === 60) {
            document.getElementById('time-warning').style.display = 'none';
        }
        
        // Akhiri ujian jika waktu habis
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishExam();
        }
    }, 1000);
}

// Fungsi untuk Update Tampilan Timer
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // Buat timer lebih besar saat 10 menit terakhir
    if (timeLeft <= 10 * 60) {
        document.getElementById('timer').style.fontSize = '1.5rem';
    } else {
        document.getElementById('timer').style.fontSize = '1.2rem';
    }
    
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Fungsi untuk Menampilkan Peringatan Waktu
function showTimeWarning() {
    const warningElement = document.getElementById('time-warning');
    warningElement.style.display = 'block';
    
    // Sembunyikan setelah beberapa detik
    setTimeout(() => {
        warningElement.style.display = 'none';
    }, 10000);
}

// Fungsi untuk Menyelesaikan Ujian
function finishExam() {
    clearInterval(timerInterval);
    
    // Hitung nilai
    const pointPerQuestion = getSetting('questionPoint') || 1;
    const totalScore = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Simpan hasil ujian
    examResults = {
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        unansweredQuestions: unansweredQuestions,
        totalScore: totalScore,
        endTime: new Date().toISOString()
    };
    
    // Update data peserta dengan hasil ujian
    const participantIndex = participants.findIndex(p => p.timestamp === participantData.timestamp);
    if (participantIndex !== -1) {
        participants[participantIndex].examResults = examResults;
        participants[participantIndex].examSubject = examData.subject;
        saveToLocalStorage('participants', participants);
    }
    
    // Tampilkan halaman hasil
    showResults();
}

// Fungsi untuk Menampilkan Hasil
function showResults() {
    // Update statistik
    document.getElementById('correct-answers').textContent = examResults.correctAnswers;
    document.getElementById('wrong-answers').textContent = examResults.wrongAnswers;
    document.getElementById('unanswered-questions').textContent = examResults.unansweredQuestions;
    document.getElementById('total-score').textContent = examResults.totalScore;
    
    // Tampilkan halaman hasil
    showPage('result-page');
    
    // Mainkan suara applause
    document.getElementById('applause-audio').play();
}

// Fungsi untuk Menampilkan Sertifikat (diperbaiki)
function showCertificate() {
    // Generate kode sertifikat
    const now = new Date();
    const dateStr = `${now.getDate()}${now.getMonth()+1}${now.getFullYear()}`;
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + 
                      Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const certCode = `${participantData.fullname.toUpperCase().replace(/ /g, '')}/${
        participantData.status.toUpperCase()}/${
        participantData.status === 'pelajar' ? participantData.schoolLevel.toUpperCase() : 'UMUM'}/${
        examData.subject.toUpperCase()}/${
        dateStr}/${
        randomCode}/PERGUNU-STB`;
    
    // Update data sertifikat dengan posisi yang benar
    document.getElementById('certificate-name').textContent = participantData.fullname;
    document.getElementById('certificate-score').textContent = examResults.totalScore;
    document.getElementById('certificate-code').textContent = certCode;
    
    // Set tanggal
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateFormatted = now.toLocaleDateString('id-ID', options);
    document.getElementById('certificate-date').textContent = dateFormatted;
    
    // Set pesan motivasi berdasarkan nilai
    let motivation = "";
    if (examResults.totalScore >= 90) {
        motivation = getSetting('motivation90-100') || "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.";
    } else if (examResults.totalScore >= 80) {
        motivation = getSetting('motivation80-89') || "Hasil yang sangat baik! Anda telah menguasai sebagian besar materi dengan baik.";
    } else if (examResults.totalScore >= 70) {
        motivation = getSetting('motivation70-79') || "Kerja bagus! Anda memiliki pemahaman yang baik tentang materi ini.";
    } else if (examResults.totalScore >= 60) {
        motivation = getSetting('motivation60-69') || "Hasil yang cukup baik. Ada ruang untuk perbaikan, terus belajar!";
    } else if (examResults.totalScore >= 50) {
        motivation = getSetting('motivation50-59') || "Anda telah berusaha, tetapi perlu belajar lebih giat lagi untuk hasil yang lebih baik.";
    } else {
        motivation = getSetting('motivationBelow50') || "Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.";
    }
    
    document.getElementById('certificate-motivation').textContent = motivation;
    
    // Set nama ketua
    document.getElementById('certificate-chairman').textContent = getSetting('chairmanName') || "Moh. Nuril Hudha, S.Pd., M.Si.";
    
    // Tampilkan halaman sertifikat
    showPage('certificate-page');
}

// Fungsi untuk Mengunduh Sertifikat
function downloadCertificate() {
    // Dalam implementasi nyata, ini akan menggunakan library seperti html2canvas
    alert("Fungsi download sertifikat akan mengkonversi HTML ke gambar/PDF. Di sini hanya simulasi.");
}

// Fungsi untuk Menampilkan Modal Kode Akses
function showAccessCodeModal(type) {
    const modal = document.getElementById('access-code-modal');
    const title = modal.querySelector('h2');
    const input = document.getElementById('input-access-code');
    const errorElement = document.getElementById('access-code-error');
    
    // Set judul berdasarkan jenis modal
    if (type === 'bankSoal') {
        title.textContent = "Masukkan Kode Bank Soal";
    } else if (type === 'admin') {
        title.textContent = "Masukkan Kode Kontrol Panel Admin";
    }
    
    // Reset form
    input.value = '';
    errorElement.style.display = 'none';
    
    // Tampilkan modal
    modal.style.display = 'block';
    modal.setAttribute('data-type', type);
}

// Fungsi untuk Menampilkan Modal Share
function showShareModal() {
    const modal = document.getElementById('share-modal');
    modal.style.display = 'block';
}

// Fungsi untuk Menambahkan Link Share
function addShareLink() {
    const urlInput = document.getElementById('custom-share-link');
    const nameInput = document.getElementById('custom-share-name');
    
    if (urlInput.value && nameInput.value) {
        const shareLinks = document.querySelector('.share-links');
        const newLink = document.createElement('a');
        newLink.href = urlInput.value;
        newLink.className = 'share-link link';
        newLink.innerHTML = `<i class="fas fa-link"></i> ${nameInput.value}`;
        shareLinks.appendChild(newLink);
        
        // Reset input
        urlInput.value = '';
        nameInput.value = '';
    }
}

// Fungsi untuk Menyimpan Soal
function saveQuestion() {
    const category = document.getElementById('question-category').value;
    const questionText = document.getElementById('question-text').value;
    const options = {
        A: document.getElementById('option-a-input').value,
        B: document.getElementById('option-b-input').value,
        C: document.getElementById('option-c-input').value,
        D: document.getElementById('option-d-input').value,
        E: document.getElementById('option-e-input').value
    };
    const correctAnswer = document.getElementById('correct-answer').value;
    const explanation = document.getElementById('explanation').value;
    
    // Validasi
    if (!category || !questionText || !options.A || !options.B || !options.C || !options.D || !options.E || !correctAnswer) {
        alert("Harap isi semua field yang diperlukan!");
        return;
    }
    
    // Buat objek soal
    const newQuestion = {
        question: questionText,
        options: options,
        correctAnswer: correctAnswer,
        explanation: explanation
    };
    
    // Simpan soal (dalam implementasi nyata, ini akan disimpan ke database)
    if (!sampleQuestions[category]) {
        sampleQuestions[category] = [];
    }
    
    sampleQuestions[category].push(newQuestion);
    saveToLocalStorage('questions', sampleQuestions);
    
    alert("Soal berhasil disimpan!");
    document.getElementById('question-form').reset();
}

// Fungsi untuk Generate Soal dengan AI (diperbaiki)
function generateQuestionsWithAI() {
    const prompt = document.getElementById('ai-prompt').value;
    const category = document.getElementById('ai-category').value;
    const difficulty = document.getElementById('ai-level').value;
    const count = document.getElementById('ai-count').value;
    
    if (!prompt || !category) {
        alert("Harap isi prompt dan kategori!");
        return;
    }
    
    // Simulasi AI (dalam implementasi nyata, ini akan memanggil API AI)
    const aiResult = document.getElementById('ai-result');
    aiResult.innerHTML = '<p>Sedang memproses permintaan AI...</p>';
    
    setTimeout(() => {
        // Contoh hasil AI
        aiResult.innerHTML = `
            <div class="ai-generated-question">
                <h4>Contoh Soal Hasil Generate AI</h4>
                <p><strong>Pertanyaan:</strong> Apa ibukota negara Indonesia?</p>
                <p><strong>Opsi:</strong></p>
                <ul>
                    <li>A. Jakarta</li>
                    <li>B. Bandung</li>
                    <li>C. Surabaya</li>
                    <li>D. Medan</li>
                    <li>E. Bali</li>
                </ul>
                <p><strong>Jawaban Benar:</strong> A</p>
                <p><strong>Penjelasan:</strong> Jakarta adalah ibukota negara Indonesia sejak tahun 1945.</p>
                <button class="btn-small use-ai-question">Gunakan Soal Ini</button>
            </div>
        `;
        
        // Tambahkan event listener untuk tombol gunakan soal
        document.querySelector('.use-ai-question')?.addEventListener('click', function() {
            // Isi form dengan hasil AI
            document.getElementById('question-category').value = category;
            document.getElementById('question-text').value = "Apa ibukota negara Indonesia?";
            document.getElementById('option-a-input').value = "Jakarta";
            document.getElementById('option-b-input').value = "Bandung";
            document.getElementById('option-c-input').value = "Surabaya";
            document.getElementById('option-d-input').value = "Medan";
            document.getElementById('option-e-input').value = "Bali";
            document.getElementById('correct-answer').value = "A";
            document.getElementById('explanation').value = "Jakarta adalah ibukota negara Indonesia sejak tahun 1945.";
            
            // Scroll ke form
            document.getElementById('manual-tab').scrollIntoView();
        });
    }, 2000);
}

// Fungsi untuk Memuat Panel Admin
function loadAdminPanel() {
    // Load data peserta
    loadParticipantsTable();
    
    // Load pengaturan teks
    document.getElementById('welcome-message-text').value = getSetting('welcomeMessage') || "Selamat Datang di Ujian Online Pergunu Situbondo";
    document.getElementById('periodic-info-text').value = getSetting('periodicInfo') || "Informasi berkala akan ditampilkan di sini. Admin dapat mengedit teks ini melalui kontrol panel.";
    document.getElementById('exam-info-text').value = getSetting('examInfo') || "Pilih jenis ujian sesuai dengan kebutuhan Anda. Admin dapat mengedit teks ini melalui kontrol panel.";
    document.getElementById('chairman-name').value = getSetting('chairmanName') || "Moh. Nuril Hudha, S.Pd., M.Si.";
    
    // Load pesan motivasi
    document.getElementById('motivation-90-100').value = getSetting('motivation90-100') || "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.";
    document.getElementById('motivation-80-89').value = getSetting('motivation80-89') || "Hasil yang sangat baik! Anda telah menguasai sebagian besar materi dengan baik.";
    document.getElementById('motivation-70-79').value = getSetting('motivation70-79') || "Kerja bagus! Anda memiliki pemahaman yang baik tentang materi ini.";
    document.getElementById('motivation-60-69').value = getSetting('motivation60-69') || "Hasil yang cukup baik. Ada ruang untuk perbaikan, terus belajar!";
    document.getElementById('motivation-50-59').value = getSetting('motivation50-59') || "Anda telah berusaha, tetapi perlu belajar lebih giat lagi untuk hasil yang lebih baik.";
    document.getElementById('motivation-below-50').value = getSetting('motivationBelow50') || "Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.";
    
    // Load pengaturan ujian
    document.getElementById('exam-timer').value = getSetting('examTimer') || 120;
    document.getElementById('question-point').value = getSetting('questionPoint') || 1;
    document.getElementById('question-count').value = getSetting('questionCount') || 10;
    document.getElementById('randomize-questions').value = getSetting('randomizeQuestions') || 'yes';
    
    // Load status aktif ujian
    document.getElementById('enable-agama').checked = getSetting('enableAgama') !== 'false';
    document.getElementById('enable-ppkn').checked = getSetting('enablePpkn') !== 'false';
    document.getElementById('enable-sejarah').checked = getSetting('enableSejarah') !== 'false';
    document.getElementById('enable-ipa').checked = getSetting('enableIpa') !== 'false';
    document.getElementById('enable-ips').checked = getSetting('enableIps') !== 'false';
    document.getElementById('enable-matematika').checked = getSetting('enableMatematika') !== 'false';
    document.getElementById('enable-bahasa-indonesia').checked = getSetting('enableBahasaIndonesia') !== 'false';
    document.getElementById('enable-bahasa-inggris').checked = getSetting('enableBahasaInggris') !== 'false';
    document.getElementById('enable-materi-extra').checked = getSetting('enableMateriExtra') !== 'false';
    document.getElementById('enable-materi-khusus').checked = getSetting('enableMateriKhusus') !== 'false';
    document.getElementById('enable-logika').checked = getSetting('enableLogika') !== 'false';
    document.getElementById('enable-cpns').checked = getSetting('enableCpns') !== 'false';
}

// Fungsi untuk Memuat Tabel Peserta
function loadParticipantsTable() {
    const tableBody = document.querySelector('#participants-table tbody');
    tableBody.innerHTML = '';
    
    participants.forEach((participant, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${participant.fullname}</td>
            <td>${participant.status}</td>
            <td>${participant.purpose}</td>
            <td>${participant.examSubject || '-'}</td>
            <td>${new Date(participant.timestamp).toLocaleDateString()}</td>
            <td>${participant.examResults?.totalScore || '-'}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Fungsi untuk Memperbarui Kode
function updateCode(type) {
    const newCode = document.getElementById(`new-${type}-code`).value;
    const currentCode = document.getElementById(`current-${type}-code`).value;
    
    if (!newCode || !currentCode) {
        alert("Harap isi kedua field kode!");
        return;
    }
    
    // Verifikasi kode lama
    let valid = false;
    
    if (type === 'login' && currentCode === defaultCodes.login) {
        defaultCodes.login = newCode;
        valid = true;
    } else if (type === 'cpns' && currentCode === defaultCodes.cpns) {
        defaultCodes.cpns = newCode;
        valid = true;
    } else if (type === 'bankSoal' && currentCode === defaultCodes.bankSoal) {
        defaultCodes.bankSoal = newCode;
        valid = true;
    } else if (type === 'admin' && currentCode === defaultCodes.admin) {
        defaultCodes.admin = newCode;
        valid = true;
    }
    
    if (valid) {
        alert(`Kode ${type} berhasil diperbarui!`);
        document.getElementById(`new-${type}-code`).value = '';
        document.getElementById(`current-${type}-code`).value = '';
        
        // Simpan ke localStorage
        saveToLocalStorage('defaultCodes', defaultCodes);
    } else {
        alert("Kode lama salah. Silakan coba lagi.");
    }
}

// Fungsi untuk Menyimpan Pengaturan Ujian
function saveExamSettings() {
    const settings = {
        examTimer: document.getElementById('exam-timer').value,
        questionPoint: document.getElementById('question-point').value,
        questionCount: document.getElementById('question-count').value,
        randomizeQuestions: document.getElementById('randomize-questions').value,
        enableAgama: document.getElementById('enable-agama').checked,
        enablePpkn: document.getElementById('enable-ppkn').checked,
        enableSejarah: document.getElementById('enable-sejarah').checked,
        enableIpa: document.getElementById('enable-ipa').checked,
        enableIps: document.getElementById('enable-ips').checked,
        enableMatematika: document.getElementById('enable-matematika').checked,
        enableBahasaIndonesia: document.getElementById('enable-bahasa-indonesia').checked,
        enableBahasaInggris: document.getElementById('enable-bahasa-inggris').checked,
        enableMateriExtra: document.getElementById('enable-materi-extra').checked,
        enableMateriKhusus: document.getElementById('enable-materi-khusus').checked,
        enableLogika: document.getElementById('enable-logika').checked,
        enableCpns: document.getElementById('enable-cpns').checked
    };
    
    saveToLocalStorage('examSettings', settings);
    alert("Pengaturan ujian berhasil disimpan!");
}

// Fungsi untuk Menyimpan Pengaturan Teks
function saveTextSettings() {
    const settings = {
        welcomeMessage: document.getElementById('welcome-message-text').value,
        periodicInfo: document.getElementById('periodic-info-text').value,
        examInfo: document.getElementById('exam-info-text').value,
        chairmanName: document.getElementById('chairman-name').value,
        motivation90-100: document.getElementById('motivation-90-100').value,
        motivation80-89: document.getElementById('motivation-80-89').value,
        motivation70-79: document.getElementById('motivation-70-79').value,
        motivation60-69: document.getElementById('motivation-60-69').value,
        motivation50-59: document.getElementById('motivation-50-59').value,
        motivationBelow50: document.getElementById('motivation-below-50').value
    };
    
    saveToLocalStorage('textSettings', settings);
    
    // Update teks yang tampil
    document.getElementById('welcome-message').textContent = settings.welcomeMessage;
    document.getElementById('periodic-info').querySelector('p').textContent = settings.periodicInfo;
    document.getElementById('exam-info-text').textContent = settings.examInfo;
    
    alert("Pengaturan teks berhasil disimpan!");
}

// Fungsi untuk Mengekspor Data Peserta
function exportParticipants() {
    const format = document.getElementById('export-format').value;
    
    // Dalam implementasi nyata, ini akan menghasilkan file sesuai format
    // Di sini kita hanya menampilkan alert
    alert(`Data peserta akan diekspor dalam format ${format.toUpperCase()}.`);
    
    // Simulasi ekspor (dalam implementasi nyata, gunakan library seperti SheetJS untuk Excel)
    let content = "No,Nama,Status,Tujuan Ujian,Kategori,Tanggal,Nilai\n";
    
    participants.forEach((p, i) => {
        content += `${i+1},${p.fullname},${p.status},${p.purpose},${p.examSubject || '-'},${
            new Date(p.timestamp).toLocaleDateString()},${p.examResults?.totalScore || '-'}\n`;
    });
    
    // Buat blob dan download (contoh untuk CSV)
    if (format === 'csv') {
        const blob = new Blob([content], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data-peserta-ujian.csv';
        a.click();
    } else {
        alert(`Ekspor format ${format} hanya simulasi. Dalam implementasi nyata akan menghasilkan file.`);
    }
}

// Fungsi untuk Mendapatkan Pengaturan
function getSetting(key) {
    const settings = JSON.parse(localStorage.getItem('examSettings')) || {};
    const textSettings = JSON.parse(localStorage.getItem('textSettings')) || {};
    
    // Cari di pengaturan ujian
    if (settings[key] !== undefined) {
        return settings[key];
    }
    
    // Cari di pengaturan teks
    if (textSettings[key] !== undefined) {
        return textSettings[key];
    }
    
    return null;
}

// Fungsi untuk Menyimpan ke LocalStorage
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error("Gagal menyimpan ke localStorage:", e);
    }
}

// Fungsi untuk Memuat dari LocalStorage
function loadFromLocalStorage() {
    // Load kode default
    const savedCodes = JSON.parse(localStorage.getItem('defaultCodes'));
    if (savedCodes) {
        Object.assign(defaultCodes, savedCodes);
    }
    
    // Load data peserta
    const savedParticipants = JSON.parse(localStorage.getItem('participants'));
    if (savedParticipants) {
        participants = savedParticipants;
    }
    
    // Load soal
    const savedQuestions = JSON.parse(localStorage.getItem('questions'));
    if (savedQuestions) {
        Object.assign(sampleQuestions, savedQuestions);
    }
}

// Fungsi untuk Memainkan Suara Tombol
function playButtonSound() {
    const audio = document.getElementById('button-audio');
    audio.currentTime = 0;
    audio.play();
}

// Fungsi untuk Mengacak Array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
