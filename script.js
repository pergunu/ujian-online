// Inisialisasi Variabel Global
let currentUser = {};
let examData = {};
let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let unansweredQuestions = 0;
let timerInterval;
let examDuration = 120; // dalam menit
let examTimeLeft = examDuration * 60; // dalam detik
let pointValue = 1; // Nilai per jawaban benar

// Data Default
const defaultSettings = {
    loginCode: "12345",
    bankCode: "OPENLOCK-1926",
    adminCode: "65614222",
    greetingText: "Selamat Datang di Ujian Online PERGUNU Situbondo",
    chairmanName: "Moh. Nuril Hudha, S.Pd., M.Si.",
    infoText: "Informasi penting akan ditampilkan di sini oleh admin.",
    motivationMessages: [
        "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.",
        "Sangat baik! Hampir sempurna, terus tingkatkan kemampuan Anda.",
        "Baik! Anda sudah menguasai sebagian besar materi, tapi masih ada ruang untuk perbaikan.",
        "Cukup! Anda perlu belajar lebih giat lagi untuk meningkatkan pemahaman.",
        "Kurang! Jangan menyerah, pelajari kembali materi dan coba lagi."
    ],
    enabledExams: {
        agama: true,
        ppkn: true,
        sejarah: true,
        ipa: true,
        ips: true,
        matematika: true,
        indonesia: true,
        inggris: true,
        extra: true,
        khusus: true
    },
    socialLinks: [
        { name: "Facebook", url: "https://facebook.com" },
        { name: "Twitter", url: "https://twitter.com" },
        { name: "Instagram", url: "https://instagram.com" }
    ]
};

// Data Soal Contoh (Dalam aplikasi nyata, ini akan diambil dari database)
const sampleQuestions = {
    agama: [
        {
            question: "Apa nama kitab suci agama Islam?",
            options: {
                a: "Injil",
                b: "Taurat",
                c: "Al-Quran",
                d: "Zabur",
                e: "Weda"
            },
            correctAnswer: "c",
            explanation: "Kitab suci agama Islam adalah Al-Quran yang diturunkan kepada Nabi Muhammad SAW."
        }
    ],
    ppkn: [
        {
            question: "Pancasila sebagai dasar negara tercantum dalam?",
            options: {
                a: "Pembukaan UUD 1945",
                b: "Batang Tubuh UUD 1945",
                c: "Penjelasan UUD 1945",
                d: "Keputusan Presiden",
                e: "Ketetapan MPR"
            },
            correctAnswer: "a",
            explanation: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat."
        }
    ],
    sejarah: [
        {
            question: "Kapan Indonesia merdeka?",
            options: {
                a: "16 Agustus 1945",
                b: "17 Agustus 1945",
                c: "18 Agustus 1945",
                d: "19 Agustus 1945",
                e: "20 Agustus 1945"
            },
            correctAnswer: "b",
            explanation: "Indonesia merdeka pada tanggal 17 Agustus 1945 yang dibacakan oleh Soekarno-Hatta."
        }
    ],
    ipa: [
        {
            question: "Planet terdekat dari matahari adalah?",
            options: {
                a: "Venus",
                b: "Bumi",
                c: "Mars",
                d: "Merkurius",
                e: "Jupiter"
            },
            correctAnswer: "d",
            explanation: "Merkurius adalah planet terdekat dari matahari dalam tata surya kita."
        }
    ],
    ips: [
        {
            question: "Ibu kota provinsi Jawa Timur adalah?",
            options: {
                a: "Surabaya",
                b: "Malang",
                c: "Sidoarjo",
                d: "Kediri",
                e: "Madiun"
            },
            correctAnswer: "a",
            explanation: "Ibu kota provinsi Jawa Timur adalah Surabaya, yang juga merupakan kota terbesar kedua di Indonesia."
        }
    ],
    matematika: [
        {
            question: "Berapakah hasil dari 7 x 8?",
            options: {
                a: "48",
                b: "54",
                c: "56",
                d: "64",
                e: "72"
            },
            correctAnswer: "c",
            explanation: "Hasil dari 7 dikali 8 adalah 56."
        }
    ],
    indonesia: [
        {
            question: "Apa yang dimaksud dengan puisi?",
            options: {
                a: "Karya sastra yang bersifat faktual",
                b: "Karya sastra yang mengutamakan keindahan bahasa",
                c: "Karya sastra yang panjang dan berisi cerita",
                d: "Karya sastra yang bersifat ilmiah",
                e: "Karya sastra yang hanya terdiri dari dialog"
            },
            correctAnswer: "b",
            explanation: "Puisi adalah karya sastra yang mengutamakan keindahan bahasa, pemadatan makna, dan pengungkapan perasaan."
        }
    ],
    inggris: [
        {
            question: "What is the meaning of 'book' in Indonesian?",
            options: {
                a: "Pensil",
                b: "Buku",
                c: "Meja",
                d: "Papan tulis",
                e: "Pulpen"
            },
            correctAnswer: "b",
            explanation: "Kata 'book' dalam bahasa Indonesia berarti 'buku'."
        }
    ],
    extra: [
        {
            question: "Apa warna hasil pencampuran merah dan biru?",
            options: {
                a: "Hijau",
                b: "Kuning",
                c: "Ungu",
                d: "Oranye",
                e: "Coklat"
            },
            correctAnswer: "c",
            explanation: "Pencampuran warna merah dan biru akan menghasilkan warna ungu."
        }
    ],
    khusus: [
        {
            question: "Siapakah pendiri PERGUNU?",
            options: {
                a: "KH. Hasyim Asy'ari",
                b: "KH. Wahab Hasbullah",
                c: "KH. Ahmad Dahlan",
                d: "KH. Abdurrahman Wahid",
                e: "KH. Ali Maksum"
            },
            correctAnswer: "b",
            explanation: "PERGUNU (Perguruan Tinggi Nahdlatul Ulama) didirikan oleh KH. Wahab Hasbullah."
        }
    ]
};

// Data Peserta (Simpan di localStorage)
let participants = JSON.parse(localStorage.getItem('participants')) || [];

// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Load settings from localStorage or use defaults
    loadSettings();
    
    // Set greeting text
    document.getElementById('greeting-text').textContent = defaultSettings.greetingText;
    document.getElementById('info-text').textContent = defaultSettings.infoText;
    
    // Play opening audio
    const openingAudio = document.getElementById('opening-audio');
    openingAudio.play().catch(e => console.log("Autoplay prevented: ", e));
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize particle animation
    initParticleAnimation();
});

// Fungsi untuk Load Settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    
    // Update UI dengan settings yang ada
    document.getElementById('greeting-text-edit').value = settings.greetingText;
    document.getElementById('chairman-name').value = settings.chairmanName;
    document.getElementById('info-text-edit').value = settings.infoText;
    document.getElementById('motivation-text-edit').value = settings.motivationMessages.join('\n---\n');
    document.getElementById('exam-time').value = examDuration;
    document.getElementById('point-value').value = pointValue;
    
    // Update toggle switches untuk ujian yang dienable
    const toggleContainer = document.querySelector('.toggle-container');
    toggleContainer.innerHTML = '';
    
    for (const [subject, enabled] of Object.entries(settings.enabledExams)) {
        const toggleDiv = document.createElement('div');
        toggleDiv.className = 'form-group toggle-group';
        toggleDiv.innerHTML = `
            <label>${subject.toUpperCase()}:</label>
            <label class="switch">
                <input type="checkbox" id="toggle-${subject}" ${enabled ? 'checked' : ''}>
                <span class="slider round"></span>
            </label>
        `;
        toggleContainer.appendChild(toggleDiv);
    }
    
    // Update social links
    const socialLinksContainer = document.querySelector('.social-links');
    socialLinksContainer.innerHTML = '';
    
    settings.socialLinks.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.textContent = link.name;
        linkElement.className = 'social-link';
        linkElement.target = '_blank';
        socialLinksContainer.appendChild(linkElement);
    });
}

// Fungsi untuk Setup Event Listeners
function setupEventListeners() {
    // Login Form
    document.getElementById('login-btn').addEventListener('click', handleLogin);
    
    // Terms Form
    document.getElementById('agree-terms').addEventListener('change', function() {
        document.getElementById('next-to-data').disabled = !this.checked;
    });
    document.getElementById('next-to-data').addEventListener('click', function() {
        document.getElementById('terms-form').classList.add('hidden');
        document.getElementById('data-form').classList.remove('hidden');
    });
    
    // Data Form
    document.querySelectorAll('input[name="status"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'pelajar') {
                document.getElementById('pelajar-form').classList.remove('hidden');
                document.getElementById('umum-form').classList.add('hidden');
            } else {
                document.getElementById('pelajar-form').classList.add('hidden');
                document.getElementById('umum-form').classList.remove('hidden');
            }
        });
    });
    
    document.getElementById('save-data').addEventListener('click', saveParticipantData);
    
    // Exam Options
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!defaultSettings.enabledExams[this.dataset.subject]) {
                alert('Ujian ini sedang tidak tersedia. Silakan pilih ujian lain.');
                return;
            }
            
            document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('start-exam').disabled = false;
            examData.subject = this.dataset.subject;
        });
    });
    
    document.getElementById('start-exam').addEventListener('click', startExam);
    
    // Exam Page
    document.getElementById('finish-exam').addEventListener('click', finishExam);
    document.getElementById('skip-question').addEventListener('click', skipQuestion);
    document.getElementById('unanswered-questions').addEventListener('click', showUnansweredQuestions);
    
    // Result Page
    document.getElementById('view-certificate').addEventListener('click', showCertificate);
    document.getElementById('retake-exam').addEventListener('click', retakeExam);
    
    // Certificate Page
    document.getElementById('print-certificate').addEventListener('click', printCertificate);
    document.getElementById('back-to-result').addEventListener('click', function() {
        document.getElementById('certificate-page').classList.add('hidden');
        document.getElementById('result-page').classList.remove('hidden');
    });
    
    // Floating Buttons
    document.getElementById('share-btn').addEventListener('click', showShareModal);
    document.getElementById('whatsapp-btn').addEventListener('click', function() {
        window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih…`, '_blank');
    });
    document.getElementById('bank-soal-btn').addEventListener('click', showBankSoalModal);
    document.getElementById('admin-btn').addEventListener('click', showAdminModal);
    
    // Bank Soal Modal
    document.getElementById('access-bank').addEventListener('click', accessBankSoal);
    document.getElementById('save-question').addEventListener('click', saveQuestion);
    document.getElementById('generate-questions').addEventListener('click', generateQuestionsWithAI);
    document.querySelectorAll('.bank-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.bank-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('#bank-content .tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            document.getElementById(`${this.dataset.tab}-tab`).classList.add('active');
        });
    });
    
    // Admin Modal
    document.getElementById('access-admin').addEventListener('click', accessAdminPanel);
    document.querySelectorAll('.admin-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.admin-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('#admin-content .tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            document.getElementById(`${this.dataset.tab}-tab`).classList.add('active');
        });
    });
    
    // Admin Save Buttons
    document.getElementById('save-login-code').addEventListener('click', saveLoginCode);
    document.getElementById('save-bank-code').addEventListener('click', saveBankCode);
    document.getElementById('save-admin-code').addEventListener('click', saveAdminCode);
    document.getElementById('save-exam-time').addEventListener('click', saveExamTime);
    document.getElementById('save-question-count').addEventListener('click', saveQuestionCount);
    document.getElementById('randomize-questions').addEventListener('click', randomizeQuestions);
    document.getElementById('save-point-value').addEventListener('click', savePointValue);
    document.getElementById('save-greeting-text').addEventListener('click', saveGreetingText);
    document.getElementById('save-chairman-name').addEventListener('click', saveChairmanName);
    document.getElementById('save-info-text').addEventListener('click', saveInfoText);
    document.getElementById('save-motivation-text').addEventListener('click', saveMotivationText);
    document.getElementById('export-data').addEventListener('click', exportParticipantData);
    document.getElementById('add-link').addEventListener('click', addSocialLink);
    
    // Close Modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.add('hidden');
        });
    });
    
    // Close modals ketika klik di luar area konten
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    });
}

// Fungsi untuk Handle Login
function handleLogin() {
    const loginCode = document.getElementById('login-code').value;
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    
    if (loginCode === settings.loginCode) {
        document.getElementById('opening-notification').classList.add('hidden');
        document.getElementById('terms-form').classList.remove('hidden');
        
        // Play audio tombol
        playButtonSound();
    } else {
        alert('Kode login salah. Silakan coba lagi.');
    }
}

// Fungsi untuk Simpan Data Peserta
function saveParticipantData() {
    const fullname = document.getElementById('fullname').value.trim();
    const status = document.querySelector('input[name="status"]:checked').value;
    
    if (!fullname) {
        alert('Nama lengkap harus diisi!');
        return;
    }
    
    currentUser = {
        fullname,
        status,
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, ''),
        timestamp: new Date().getTime()
    };
    
    if (status === 'pelajar') {
        const school = document.getElementById('school').value.trim();
        const nis = document.getElementById('nis').value.trim();
        const tujuan = document.getElementById('tujuan-pelajar').value;
        const tingkat = document.querySelector('input[name="tingkat"]:checked').value;
        
        if (!school || !nis) {
            alert('Data sekolah dan NIS harus diisi untuk peserta pelajar!');
            return;
        }
        
        currentUser = {
            ...currentUser,
            school,
            nis,
            tujuan,
            tingkat
        };
        
        // Tampilkan opsi kelas berdasarkan tingkat sekolah
        showClassOptions(tingkat);
    } else {
        const tujuan = document.getElementById('tujuan-umum').value;
        currentUser = {
            ...currentUser,
            tujuan
        };
        
        // Untuk umum, langsung tampilkan pilihan ujian
        document.getElementById('kelas-options').classList.add('hidden');
    }
    
    // Simpan data peserta sementara
    document.getElementById('data-form').classList.add('hidden');
    document.getElementById('exam-options').classList.remove('hidden');
    
    // Play audio tombol
    playButtonSound();
}

// Fungsi untuk Tampilkan Opsi Kelas
function showClassOptions(tingkat) {
    const kelasOptions = document.getElementById('kelas-options');
    const buttonGroup = kelasOptions.querySelector('.button-group');
    
    buttonGroup.innerHTML = '';
    
    let classes = [];
    if (tingkat === 'SD') {
        classes = ['Kelas IV', 'Kelas V', 'Kelas VI'];
    } else if (tingkat === 'SMP') {
        classes = ['Kelas VII', 'Kelas VIII', 'Kelas IX'];
    } else if (tingkat === 'SMA/SMK') {
        classes = ['Kelas X', 'Kelas XI', 'Kelas XII'];
    }
    
    classes.forEach(kls => {
        const btn = document.createElement('button');
        btn.textContent = kls;
        btn.className = 'class-btn';
        btn.dataset.class = kls.split(' ')[1].toLowerCase();
        btn.addEventListener('click', function() {
            document.querySelectorAll('.class-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            examData.class = this.dataset.class;
        });
        buttonGroup.appendChild(btn);
    });
    
    kelasOptions.classList.remove('hidden');
}

// Fungsi untuk Mulai Ujian
function startExam() {
    // Set data ujian
    examData = {
        ...examData,
        startTime: new Date().getTime(),
        selectedSubject: examData.subject
    };
    
    // Ambil soal berdasarkan kategori
    questions = sampleQuestions[examData.subject] || [];
    
    // Acak urutan soal jika diatur
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    if (settings.randomizeQuestions) {
        questions = shuffleArray(questions);
    }
    
    // Batasi jumlah soal sesuai setting
    const questionCount = settings.questionCount || 10;
    questions = questions.slice(0, questionCount);
    
    // Reset variabel ujian
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    unansweredQuestions = questions.length;
    examTimeLeft = examDuration * 60;
    
    // Update UI
    document.getElementById('exam-options').classList.add('hidden');
    document.getElementById('exam-page').classList.remove('hidden');
    document.getElementById('total-questions').textContent = questions.length;
    
    // Mulai timer
    startTimer();
    
    // Tampilkan soal pertama
    displayQuestion();
    
    // Play audio tombol
    playButtonSound();
}

// Fungsi untuk Tampilkan Soal
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        finishExam();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    const questionText = document.querySelector('.question-text');
    const optionsContainer = document.querySelector('.options-container');
    
    // Update nomor soal
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    
    // Set teks pertanyaan
    questionText.innerHTML = `<p>${question.question}</p>`;
    
    // Kosongkan opsi jawaban sebelumnya
    optionsContainer.innerHTML = '';
    
    // Tambahkan opsi jawaban
    for (const [key, value] of Object.entries(question.options)) {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.dataset.option = key;
        optionBtn.innerHTML = `<strong>${key.toUpperCase()}.</strong> ${value}`;
        
        optionBtn.addEventListener('click', function() {
            checkAnswer(this, key);
        });
        
        optionsContainer.appendChild(optionBtn);
    }
}

// Fungsi untuk Cek Jawaban
function checkAnswer(button, selectedOption) {
    const question = questions[currentQuestionIndex];
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');
    
    // Nonaktifkan semua tombol opsi
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Tandai jawaban yang dipilih
    if (selectedOption === question.correctAnswer) {
        button.classList.add('correct');
        correctAnswers++;
        correctSound.play();
        
        // Tampilkan penjelasan
        const explanation = document.createElement('div');
        explanation.className = 'explanation';
        explanation.innerHTML = `<p><strong>Penjelasan:</strong> ${question.explanation}</p>`;
        button.parentNode.appendChild(explanation);
    } else {
        button.classList.add('wrong');
        wrongSound.play();
        
        // Tandai juga jawaban yang benar
        document.querySelector(`.option-btn[data-option="${question.correctAnswer}"]`).classList.add('correct');
        
        // Tampilkan penjelasan
        const explanation = document.createElement('div');
        explanation.className = 'explanation';
        explanation.innerHTML = `<p><strong>Penjelasan:</strong> ${question.explanation}</p>`;
        button.parentNode.appendChild(explanation);
    }
    
    unansweredQuestions--;
    
    // Set timeout untuk pindah ke soal berikutnya
    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 2000);
}

// Fungsi untuk Skip Soal
function skipQuestion() {
    currentQuestionIndex++;
    displayQuestion();
    
    // Play audio tombol
    playButtonSound();
}

// Fungsi untuk Tampilkan Soal yang Belum Dijawab
function showUnansweredQuestions() {
    // Cari indeks soal yang belum dijawab
    const unansweredIndices = [];
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if (!question.answered) {
            unansweredIndices.push(i);
        }
    }
    
    if (unansweredIndices.length > 0) {
        currentQuestionIndex = unansweredIndices[0];
        displayQuestion();
    } else {
        alert('Semua soal sudah dijawab.');
    }
    
    // Play audio tombol
    playButtonSound();
}

// Fungsi untuk Selesaikan Ujian
function finishExam() {
    // Hentikan timer
    clearInterval(timerInterval);
    
    // Hitung nilai
    const totalQuestions = questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Update data peserta
    currentUser = {
        ...currentUser,
        examSubject: examData.selectedSubject,
        score,
        correctAnswers,
        wrongAnswers,
        unanswered: totalQuestions - (correctAnswers + wrongAnswers),
        completionDate: new Date().toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    };
    
    // Simpan data peserta
    participants.push(currentUser);
    localStorage.setItem('participants', JSON.stringify(participants));
    
    // Tampilkan hasil
    showExamResult();
    
    // Play applause audio
    const applauseAudio = new Audio('https://github.com/pergunu/ujian-online/tree/main/assets/audio/applause.mp3');
    applauseAudio.play().catch(e => console.log("Audio error: ", e));
    
    // Play audio tombol
    playButtonSound();
}

// Fungsi untuk Tampilkan Hasil Ujian
function showExamResult() {
    document.getElementById('exam-page').classList.add('hidden');
    document.getElementById('result-page').classList.remove('hidden');
    
    // Update hasil
    document.getElementById('total-answered').textContent = questions.length;
    document.getElementById('correct-answers').textContent = correctAnswers;
    document.getElementById('wrong-answers').textContent = wrongAnswers;
    document.getElementById('final-score').textContent = Math.round((correctAnswers / questions.length) * 100);
    
    // Tampilkan pesan motivasi berdasarkan nilai
    const score = Math.round((correctAnswers / questions.length) * 100);
    const motivationMessages = (JSON.parse(localStorage.getItem('examSettings')) || defaultSettings).motivationMessages;
    
    let motivationIndex;
    if (score >= 90) motivationIndex = 0;
    else if (score >= 75) motivationIndex = 1;
    else if (score >= 60) motivationIndex = 2;
    else if (score >= 40) motivationIndex = 3;
    else motivationIndex = 4;
    
    document.getElementById('motivation-message').textContent = motivationMessages[motivationIndex];
}

// Fungsi untuk Tampilkan Sertifikat
function showCertificate() {
    document.getElementById('result-page').classList.add('hidden');
    document.getElementById('certificate-page').classList.remove('hidden');
    
    // Generate kode sertifikat
    const certCode = generateCertificateCode();
    
    // Update data sertifikat
    document.getElementById('cert-name').textContent = currentUser.fullname;
    document.getElementById('cert-score').textContent = Math.round((correctAnswers / questions.length) * 100);
    document.getElementById('cert-date').textContent = new Date().toLocaleDateString('id-ID', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });
    document.getElementById('cert-code').textContent = certCode;
    
    // Update pesan motivasi
    const score = Math.round((correctAnswers / questions.length) * 100);
    const motivationMessages = (JSON.parse(localStorage.getItem('examSettings')) || defaultSettings).motivationMessages;
    
    let motivationIndex;
    if (score >= 90) motivationIndex = 0;
    else if (score >= 75) motivationIndex = 1;
    else if (score >= 60) motivationIndex = 2;
    else if (score >= 40) motivationIndex = 3;
    else motivationIndex = 4;
    
    document.getElementById('cert-motivation').textContent = motivationMessages[motivationIndex];
    
    // Update nama ketua
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    document.querySelector('.certificate-chairman').textContent = settings.chairmanName;
    
    // Play audio tombol
    playButtonSound();
}

// Fungsi untuk Generate Kode Sertifikat
function generateCertificateCode() {
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + 
                       Math.random().toString(36).substring(2, 6).toUpperCase();
    
    return `${currentUser.fullname.toUpperCase().replace(/ /g, '')}/${currentUser.status.toUpperCase()}/${currentUser.tingkat || 'UMUM'}/${examData.selectedSubject.toUpperCase()}/${currentUser.date}/${randomCode}/PERGUNU-STB`;
}

// Fungsi untuk Cetak Sertifikat
function printCertificate() {
    window.print();
}

// Fungsi untuk Ulangi Ujian
function retakeExam() {
    document.getElementById('result-page').classList.add('hidden');
    document.getElementById('exam-options').classList.remove('hidden');
    
    // Play audio tombol
    playButtonSound();
}

// Fungsi untuk Timer Ujian
function startTimer() {
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        examTimeLeft--;
        updateTimerDisplay();
        
        if (examTimeLeft <= 0) {
            clearInterval(timerInterval);
            finishExam();
        } else if (examTimeLeft === 600) { // 10 menit = 600 detik
            // Tampilkan peringatan waktu hampir habis
            document.getElementById('time-warning').classList.remove('hidden');
            
            // Perbesar ukuran timer
            document.getElementById('timer').style.fontSize = '32px';
            document.getElementById('timer').style.color = '#ff4757';
            
            // Tambahkan animasi
            document.getElementById('timer').classList.add('pulse');
        } else if (examTimeLeft === 60) { // 1 menit = 60 detik
            // Sembunyikan peringatan
            document.getElementById('time-warning').classList.add('hidden');
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(examTimeLeft / 60);
    const seconds = examTimeLeft % 60;
    document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Fungsi untuk Bank Soal
function accessBankSoal() {
    const bankCode = document.getElementById('bank-code').value;
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    
    if (bankCode === settings.bankCode) {
        document.querySelector('.access-form').classList.add('hidden');
        document.getElementById('bank-content').classList.remove('hidden');
        
        // Load questions list
        loadQuestionsList();
    } else {
        alert('Kode bank soal salah. Silakan coba lagi.');
    }
    
    // Play audio tombol
    playButtonSound();
}

function saveQuestion() {
    const category = document.getElementById('subject-category').value;
    const questionText = document.getElementById('question-text').value.trim();
    const options = {
        a: document.querySelector('.option-input[data-option="a"]').value.trim(),
        b: document.querySelector('.option-input[data-option="b"]').value.trim(),
        c: document.querySelector('.option-input[data-option="c"]').value.trim(),
        d: document.querySelector('.option-input[data-option="d"]').value.trim(),
        e: document.querySelector('.option-input[data-option="e"]').value.trim()
    };
    const correctAnswer = document.getElementById('correct-answer').value;
    const explanation = document.getElementById('explanation').value.trim();
    
    if (!questionText || !options.a || !options.b || !options.c || !options.d || !options.e || !explanation) {
        alert('Semua field harus diisi!');
        return;
    }
    
    // Buat objek soal baru
    const newQuestion = {
        question: questionText,
        options,
        correctAnswer,
        explanation
    };
    
    // Tambahkan ke sampleQuestions
    if (!sampleQuestions[category]) {
        sampleQuestions[category] = [];
    }
    sampleQuestions[category].push(newQuestion);
    
    // Simpan ke localStorage (dalam aplikasi nyata, ini akan disimpan ke database)
    localStorage.setItem('sampleQuestions', JSON.stringify(sampleQuestions));
    
    // Reset form
    document.getElementById('question-text').value = '';
    document.querySelectorAll('.option-input').forEach(input => input.value = '');
    document.getElementById('explanation').value = '';
    
    // Reload daftar soal
    loadQuestionsList();
    
    alert('Soal berhasil disimpan!');
    
    // Play audio tombol
    playButtonSound();
}

function loadQuestionsList() {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';
    
    for (const [category, questions] of Object.entries(sampleQuestions)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'question-category';
        categoryDiv.innerHTML = `<h4>${category.toUpperCase()} (${questions.length} soal)</h4>`;
        
        const questionList = document.createElement('div');
        questionList.className = 'question-list';
        
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';
            questionDiv.innerHTML = `
                <p><strong>Soal ${index + 1}:</strong> ${q.question}</p>
                <p><strong>Jawaban benar:</strong> ${q.correctAnswer.toUpperCase()}</p>
                <button class="edit-question" data-category="${category}" data-index="${index}">Edit</button>
                <button class="delete-question" data-category="${category}" data-index="${index}">Hapus</button>
            `;
            questionList.appendChild(questionDiv);
        });
        
        categoryDiv.appendChild(questionList);
        questionsContainer.appendChild(categoryDiv);
    }
    
    // Tambahkan event listener untuk tombol edit dan hapus
    document.querySelectorAll('.edit-question').forEach(btn => {
        btn.addEventListener('click', function() {
            editQuestion(this.dataset.category, parseInt(this.dataset.index));
        });
    });
    
    document.querySelectorAll('.delete-question').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteQuestion(this.dataset.category, parseInt(this.dataset.index));
        });
    });
}

function editQuestion(category, index) {
    const question = sampleQuestions[category][index];
    
    // Isi form dengan data soal
    document.getElementById('subject-category').value = category;
    document.getElementById('question-text').value = question.question;
    document.querySelector('.option-input[data-option="a"]').value = question.options.a;
    document.querySelector('.option-input[data-option="b"]').value = question.options.b;
    document.querySelector('.option-input[data-option="c"]').value = question.options.c;
    document.querySelector('.option-input[data-option="d"]').value = question.options.d;
    document.querySelector('.option-input[data-option="e"]').value = question.options.e;
    document.getElementById('correct-answer').value = question.correctAnswer;
    document.getElementById('explanation').value = question.explanation;
    
    // Hapus soal dari array
    sampleQuestions[category].splice(index, 1);
    
    // Simpan perubahan
    localStorage.setItem('sampleQuestions', JSON.stringify(sampleQuestions));
    
    // Reload daftar soal
    loadQuestionsList();
    
    // Play audio tombol
    playButtonSound();
}

function deleteQuestion(category, index) {
    if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        sampleQuestions[category].splice(index, 1);
        localStorage.setItem('sampleQuestions', JSON.stringify(sampleQuestions));
        loadQuestionsList();
        
        // Play audio tombol
        playButtonSound();
    }
}

async function generateQuestionsWithAI() {
    const prompt = document.getElementById('ai-prompt').value.trim();
    const apiKey = document.getElementById('api-key').value.trim();
    
    if (!prompt) {
        alert('Silakan masukkan prompt untuk menghasilkan soal!');
        return;
    }
    
    if (!apiKey) {
        alert('Silakan masukkan API Key!');
        return;
    }
    
    // Tampilkan loading
    const generateBtn = document.getElementById('generate-questions');
    generateBtn.disabled = true;
    generateBtn.textContent = 'Membuat soal...';
    
    try {
        // TEMPAT UNTUK MEMASUKKAN API KEY DAN MEMANGGIL API AI
        // Contoh implementasi dengan OpenAI API (harus diganti dengan API yang sesuai)
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "Anda adalah seorang ahli pembuat soal ujian. Buatkan soal pilihan ganda dengan format: Pertanyaan, Opsi A, Opsi B, Opsi C, Opsi D, Opsi E, Jawaban benar (huruf saja), dan Penjelasan."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        
        if (data.choices && data.choices[0].message.content) {
            const result = data.choices[0].message.content;
            document.getElementById('ai-results').innerHTML = `<pre>${result}</pre>`;
            document.getElementById('ai-results').classList.remove('hidden');
            
            // Parsing hasil (sederhana, bisa disesuaikan dengan format output AI)
            const lines = result.split('\n').filter(line => line.trim());
            if (lines.length >= 8) {
                const question = {
                    question: lines[0].replace('Pertanyaan:', '').trim(),
                    options: {
                        a: lines[1].replace('Opsi A:', '').trim(),
                        b: lines[2].replace('Opsi B:', '').trim(),
                        c: lines[3].replace('Opsi C:', '').trim(),
                        d: lines[4].replace('Opsi D:', '').trim(),
                        e: lines[5].replace('Opsi E:', '').trim()
                    },
                    correctAnswer: lines[6].replace('Jawaban benar:', '').trim().toLowerCase(),
                    explanation: lines[7].replace('Penjelasan:', '').trim()
                };
                
                // Isi form dengan hasil parsing
                document.getElementById('question-text').value = question.question;
                document.querySelector('.option-input[data-option="a"]').value = question.options.a;
                document.querySelector('.option-input[data-option="b"]').value = question.options.b;
                document.querySelector('.option-input[data-option="c"]').value = question.options.c;
                document.querySelector('.option-input[data-option="d"]').value = question.options.d;
                document.querySelector('.option-input[data-option="e"]').value = question.options.e;
                document.getElementById('correct-answer').value = question.correctAnswer;
                document.getElementById('explanation').value = question.explanation;
            }
        } else {
            alert('Gagal menghasilkan soal. Silakan coba lagi dengan prompt yang lebih jelas.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menghubungi API. Pastikan API Key valid dan koneksi internet stabil.');
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate Soal';
    }
    
    // Play audio tombol
    playButtonSound();
}

// Fungsi untuk Admin Panel
function accessAdminPanel() {
    const adminCode = document.getElementById('admin-code').value;
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    
    if (adminCode === settings.adminCode) {
        document.querySelector('.access-form').classList.add('hidden');
        document.getElementById('admin-content').classList.remove('hidden');
        
        // Load participants data
        loadParticipantsData();
    } else {
        alert('Kode admin salah. Silakan coba lagi.');
    }
    
    // Play audio tombol
    playButtonSound();
}

function saveLoginCode() {
    const newCode = document.getElementById('new-login-code').value.trim();
    const currentCode = document.getElementById('current-login-code').value.trim();
    
    if (!newCode || !currentCode) {
        alert('Kode baru dan kode lama harus diisi!');
        return;
    }
    
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    
    if (currentCode !== settings.loginCode) {
        alert('Kode login lama tidak sesuai!');
        return;
    }
    
    settings.loginCode = newCode;
    localStorage.setItem('examSettings', JSON.stringify(settings));
    
    alert('Kode login berhasil diubah!');
    
    // Play audio tombol
    playButtonSound();
}

function saveBankCode() {
    const newCode = document.getElementById('new-bank-code').value.trim();
    const currentCode = document.getElementById('current-bank-code').value.trim();
    
    if (!newCode || !currentCode) {
        alert('Kode baru dan kode lama harus diisi!');
        return;
    }
    
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    
    if (currentCode !== settings.bankCode) {
        alert('Kode bank soal lama tidak sesuai!');
        return;
    }
    
    settings.bankCode = newCode;
    localStorage.setItem('examSettings', JSON.stringify(settings));
    
    alert('Kode bank soal berhasil diubah!');
    
    // Play audio tombol
    playButtonSound();
}

function saveAdminCode() {
    const newCode = document.getElementById('new-admin-code').value.trim();
    const currentCode = document.getElementById('current-admin-code').value.trim();
    
    if (!newCode || !currentCode) {
        alert('Kode baru dan kode lama harus diisi!');
        return;
    }
    
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    
    if (currentCode !== settings.adminCode) {
        alert('Kode admin lama tidak sesuai!');
        return;
    }
    
    settings.adminCode = newCode;
    localStorage.setItem('examSettings', JSON.stringify(settings));
    
    alert('Kode admin berhasil diubah!');
    
    // Play audio tombol
    playButtonSound();
}

function saveExamTime() {
    const time = parseInt(document.getElementById('exam-time').value);
    
    if (isNaN(time) || time < 1 || time > 300) {
        alert('Waktu ujian harus antara 1-300 menit!');
        return;
    }
    
    examDuration = time;
    alert('Waktu ujian berhasil diubah!');
    
    // Play audio tombol
    playButtonSound();
}

function saveQuestionCount() {
    const count = parseInt(document.getElementById('question-count').value);
    
    if (isNaN(count) || count < 5 || count > 150) {
        alert('Jumlah soal harus antara 5-150 dan kelipatan 5!');
        return;
    }
    
    alert(`Jumlah soal berhasil diubah menjadi ${count}!`);
    
    // Play audio tombol
    playButtonSound();
}

function randomizeQuestions() {
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    settings.randomizeQuestions = !settings.randomizeQuestions;
    localStorage.setItem('examSettings', JSON.stringify(settings));
    
    alert(`Acak soal ${settings.randomizeQuestions ? 'diaktifkan' : 'dinonaktifkan'}!`);
    
    // Play audio tombol
    playButtonSound();
}

function savePointValue() {
    const point = parseInt(document.getElementById('point-value').value);
    
    if (isNaN(point) || point < 1 || point > 10) {
        alert('Nilai point harus antara 1-10!');
        return;
    }
    
    pointValue = point;
    alert(`Nilai point berhasil diubah menjadi ${point}!`);
    
    // Play audio tombol
    playButtonSound();
}

function saveGreetingText() {
    const text = document.getElementById('greeting-text-edit').value.trim();
    
    if (!text) {
        alert('Teks sapa tidak boleh kosong!');
        return;
    }
    
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    settings.greetingText = text;
    localStorage.setItem('examSettings', JSON.stringify(settings));
    
    document.getElementById('greeting-text').textContent = text;
    alert('Teks sapa berhasil diubah!');
    
    // Play audio tombol
    playButtonSound();
}

function saveChairmanName() {
    const name = document.getElementById('chairman-name').value.trim();
    
    if (!name) {
        alert('Nama ketua tidak boleh kosong!');
        return;
    }
    
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    settings.chairmanName = name;
    localStorage.setItem('examSettings', JSON.stringify(settings));
    
    alert('Nama ketua berhasil diubah!');
    
    // Play audio tombol
    playButtonSound();
}

function saveInfoText() {
    const text = document.getElementById('info-text-edit').value.trim();
    
    if (!text) {
        alert('Teks informasi tidak boleh kosong!');
        return;
    }
    
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    settings.infoText = text;
    localStorage.setItem('examSettings', JSON.stringify(settings));
    
    document.getElementById('info-text').textContent = text;
    alert('Teks informasi berhasil diubah!');
    
    // Play audio tombol
    playButtonSound();
}

function saveMotivationText() {
    const text = document.getElementById('motivation-text-edit').value.trim();
    
    if (!text) {
        alert('Teks motivasi tidak boleh kosong!');
        return;
    }
    
    const messages = text.split('\n---\n').filter(msg => msg.trim());
    
    if (messages.length < 5) {
        alert('Harap masukkan minimal 5 pesan motivasi untuk berbagai tingkat nilai, dipisahkan oleh "---"');
        return;
    }
    
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    settings.motivationMessages = messages;
    localStorage.setItem('examSettings', JSON.stringify(settings));
    
    alert('Pesan motivasi berhasil diubah!');
    
    // Play audio tombol
    playButtonSound();
}

function loadParticipantsData() {
    const tableBody = document.querySelector('#participants-table tbody');
    tableBody.innerHTML = '';
    
    participants.forEach((participant, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${participant.fullname}</td>
            <td>${participant.status}</td>
            <td>${participant.tingkat || '-'}</td>
            <td>${participant.examSubject || '-'}</td>
            <td>${participant.score || '-'}</td>
            <td>${participant.completionDate || '-'}</td>
        `;
        tableBody.appendChild(row);
    });
}

function exportParticipantData() {
    let csv = 'No,Nama Lengkap,Status,Tingkat,Ujian,Nilai,Tanggal\n';
    
    participants.forEach((participant, index) => {
        csv += `${index + 1},${participant.fullname},${participant.status},${participant.tingkat || '-'},${participant.examSubject || '-'},${participant.score || '-'},${participant.completionDate || '-'}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data_peserta_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Play audio tombol
    playButtonSound();
}

function addSocialLink() {
    const name = document.getElementById('new-link-name').value.trim();
    const url = document.getElementById('new-link-url').value.trim();
    
    if (!name || !url) {
        alert('Nama platform dan URL harus diisi!');
        return;
    }
    
    const settings = JSON.parse(localStorage.getItem('examSettings')) || defaultSettings;
    settings.socialLinks.push({ name, url });
    localStorage.setItem('examSettings', JSON.stringify(settings));
    
    // Update UI
    const socialLinksContainer = document.querySelector('.social-links');
    const linkElement = document.createElement('a');
    linkElement.href = url;
    linkElement.textContent = name;
    linkElement.className = 'social-link';
    linkElement.target = '_blank';
    socialLinksContainer.appendChild(linkElement);
    
    // Reset form
    document.getElementById('new-link-name').value = '';
    document.getElementById('new-link-url').value = '';
    
    alert('Link berhasil ditambahkan!');
    
    // Play audio tombol
    playButtonSound();
}

// Fungsi untuk Modal Share
function showShareModal() {
    document.getElementById('share-modal').classList.remove('hidden');
    
    // Play audio tombol
    playButtonSound();
}

// Fungsi untuk Modal Bank Soal
function showBankSoalModal() {
    document.getElementById('bank-soal-modal').classList.remove('hidden');
    
    // Reset form akses
    document.querySelector('.access-form').classList.remove('hidden');
    document.getElementById('bank-content').classList.add('hidden');
    document.getElementById('bank-code').value = '';
    
    // Play audio tombol
    playButtonSound();
}

// Fungsi untuk Modal Admin
function showAdminModal() {
    document.getElementById('admin-modal').classList.remove('hidden');
    
    // Reset form akses
    document.querySelector('.access-form').classList.remove('hidden');
    document.getElementById('admin-content').classList.add('hidden');
    document.getElementById('admin-code').value = '';
    
    // Play audio tombol
    playButtonSound();
}

// Fungsi untuk Animasi Partikel
function initParticleAnimation() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            blinkSpeed: Math.random() * 0.02 + 0.01,
            blinkDirection: Math.random() > 0.5 ? 1 : -1
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw particles
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            
            // Gradient fill for particles
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Update particle position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            // Blinking effect
            particle.opacity += particle.blinkSpeed * particle.blinkDirection;
            if (particle.opacity > 0.6 || particle.opacity < 0.1) {
                particle.blinkDirection *= -1;
            }
        });
        
        // Draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Fungsi Bantu
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function playButtonSound() {
    const audio = new Audio('https://voca.ro/16oVT0NTCKF0');
    audio.play().catch(e => console.log("Audio error: ", e));
}
