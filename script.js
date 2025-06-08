// KODE DEFAULT (JANGAN DITAMPILKAN KE PUBLIK)
const DEFAULT_LOGIN_CODE = "12345";
const DEFAULT_EXAM_CODE = "OPENLOCK-1945";
const DEFAULT_BANK_CODE = "OPENLOCK-1926";
const DEFAULT_ADMIN_CODE = "65614222";

// Inisialisasi variabel
let currentPage = "login";
let participantData = {};
let examData = {};
let questions = [];
let currentQuestionIndex = 0;
let answeredQuestions = {};
let timerInterval;
let timeLeft = 120 * 60; // 120 menit dalam detik
let examStarted = false;

// Data contoh soal
const sampleQuestions = {
    "AGAMA": [
        {
            question: "Apa kitab suci agama Islam?",
            options: ["A. Alkitab", "B. Tripitaka", "C. Al-Quran", "D. Weda", "E. Talmud"],
            correctAnswer: "C",
            explanation: "Kitab suci agama Islam adalah Al-Quran yang diturunkan kepada Nabi Muhammad SAW."
        }
    ],
    "PPKN": [
        {
            question: "Pancasila sebagai dasar negara tercantum dalam?",
            options: ["A. Pembukaan UUD 1945", "B. Batang Tubuh UUD 1945", "C. Penjelasan UUD 1945", "D. Keputusan Presiden", "E. Tap MPR"],
            correctAnswer: "A",
            explanation: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat."
        }
    ],
    "SEJARAH": [
        {
            question: "Kapan Indonesia merdeka?",
            options: ["A. 16 Agustus 1945", "B. 17 Agustus 1945", "C. 18 Agustus 1945", "D. 19 Agustus 1945", "E. 20 Agustus 1945"],
            correctAnswer: "B",
            explanation: "Indonesia merdeka pada tanggal 17 Agustus 1945 yang dibacakan oleh Soekarno-Hatta."
        }
    ],
    "IPA": [
        {
            question: "Planet terdekat dari matahari adalah?",
            options: ["A. Venus", "B. Bumi", "C. Mars", "D. Merkurius", "E. Jupiter"],
            correctAnswer: "D",
            explanation: "Merkurius adalah planet terdekat dari matahari dalam tata surya kita."
        }
    ],
    "IPS": [
        {
            question: "Ibu kota negara Jepang adalah?",
            options: ["A. Beijing", "B. Seoul", "C. Bangkok", "D. Tokyo", "E. Jakarta"],
            correctAnswer: "D",
            explanation: "Ibu kota negara Jepang adalah Tokyo yang merupakan salah satu kota terpadat di dunia."
        }
    ],
    "MATEMATIKA": [
        {
            question: "Berapa hasil dari 7 x 8?",
            options: ["A. 48", "B. 54", "C. 56", "D. 64", "E. 72"],
            correctAnswer: "C",
            explanation: "Hasil dari 7 dikali 8 adalah 56."
        }
    ],
    "BAHASA INDONESIA": [
        {
            question: "Kata 'membaca' termasuk jenis kata apa?",
            options: ["A. Kata benda", "B. Kata sifat", "C. Kata kerja", "D. Kata keterangan", "E. Kata ganti"],
            correctAnswer: "C",
            explanation: "Kata 'membaca' termasuk jenis kata kerja karena menunjukkan suatu aktivitas."
        }
    ],
    "BAHASA INGGRIS": [
        {
            question: "What is the past tense of 'go'?",
            options: ["A. Goed", "B. Went", "C. Gone", "D. Going", "E. Goes"],
            correctAnswer: "B",
            explanation: "The past tense of 'go' is 'went'. Example: 'I went to school yesterday.'"
        }
    ],
    "MATERI EXTRA": [
        {
            question: "Siapa pencipta lagu Indonesia Raya?",
            options: ["A. W.R. Supratman", "B. Ismail Marzuki", "C. C. Simanjuntak", "D. Kusbini", "E. Ibu Sud"],
            correctAnswer: "A",
            explanation: "Lagu Indonesia Raya diciptakan oleh Wage Rudolf Supratman dan pertama kali diperdengarkan pada 28 Oktober 1928."
        }
    ],
    "MATERI KHUSUS": [
        {
            question: "Apa nama organisasi kepanduan di Indonesia?",
            options: ["A. Pramuka", "B. Pandu", "C. Scout", "D. Kepanduan", "E. Gerakan Pemuda"],
            correctAnswer: "A",
            explanation: "Organisasi kepanduan di Indonesia bernama Pramuka (Praja Muda Karana)."
        }
    ],
    "UJIAN LOGIKA": [
        {
            question: "Jika semua manusia adalah makhluk hidup, dan Budi adalah manusia, maka:",
            options: ["A. Budi adalah makhluk hidup", "B. Budi bukan makhluk hidup", "C. Beberapa manusia bukan makhluk hidup", "D. Tidak dapat disimpulkan", "E. Semua makhluk hidup adalah Budi"],
            correctAnswer: "A",
            explanation: "Dari premis yang diberikan, dapat disimpulkan bahwa Budi adalah makhluk hidup."
        }
    ],
    "UJIAN CPNS/P3K": [
        {
            question: "Negara Indonesia adalah negara hukum, hal ini tercantum dalam UUD 1945 pasal:",
            options: ["A. Pasal 1 ayat (1)", "B. Pasal 1 ayat (2)", "C. Pasal 1 ayat (3)", "D. Pasal 2 ayat (1)", "E. Pasal 3 ayat (1)"],
            correctAnswer: "C",
            explanation: "Pasal 1 ayat (3) UUD 1945 menyatakan bahwa 'Negara Indonesia adalah negara hukum'."
        }
    ]
};

// Inisialisasi aplikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi particles.js
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

    // Set halaman awal
    showPage('login');

    // Event listeners
    document.getElementById('login-btn').addEventListener('click', handleLogin);
    document.getElementById('agree-rules').addEventListener('change', function() {
        document.getElementById('continue-btn').disabled = !this.checked;
    });
    document.getElementById('continue-btn').addEventListener('click', function() {
        showPage('participant');
    });
    
    // Toggle form peserta berdasarkan status
    document.querySelectorAll('input[name="status"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'pelajar') {
                document.getElementById('student-form').classList.remove('hidden');
                document.getElementById('general-form').classList.add('hidden');
            } else {
                document.getElementById('student-form').classList.add('hidden');
                document.getElementById('general-form').classList.remove('hidden');
            }
        });
    });
    
    // Form peserta
    document.getElementById('participant-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveParticipantData();
    });
    
    // GPS button
    document.getElementById('gps-btn').addEventListener('click', getLocation);
    
    // Tombol pilihan ujian
    document.querySelectorAll('.exam-option').forEach(btn => {
        btn.addEventListener('click', function() {
            selectExamOption(this);
        });
    });
    
    // Verifikasi kode lisensi
    document.getElementById('verify-license').addEventListener('click', verifyLicense);
    
    // Mulai ujian
    document.getElementById('start-exam-btn').addEventListener('click', startExam);
    
    // Navigasi ujian
    document.getElementById('finish-exam-btn').addEventListener('click', finishExam);
    document.getElementById('skip-question-btn').addEventListener('click', skipQuestion);
    document.getElementById('unanswered-btn').addEventListener('click', showUnanswered);
    
    // Hasil ujian
    document.getElementById('view-certificate-btn').addEventListener('click', function() {
        showPage('certificate');
    });
    document.getElementById('retake-exam-btn').addEventListener('click', function() {
        showPage('exam-options');
    });
    
    // Sertifikat
    document.getElementById('print-certificate-btn').addEventListener('click', printCertificate);
    document.getElementById('back-to-result-btn').addEventListener('click', function() {
        showPage('result');
    });
    
    // Tombol mengambang
    document.getElementById('share-btn').addEventListener('click', showShareModal);
    document.getElementById('whatsapp-btn').addEventListener('click', openWhatsApp);
    document.getElementById('question-bank-btn').addEventListener('click', showQuestionBankModal);
    document.getElementById('admin-btn').addEventListener('click', showAdminModal);
    
    // Panel admin
    setupAdminTabs();
    document.getElementById('save-login-code').addEventListener('click', saveLoginCode);
    document.getElementById('save-exam-code').addEventListener('click', saveExamCode);
    document.getElementById('save-question-code').addEventListener('click', saveQuestionCode);
    document.getElementById('save-admin-code').addEventListener('click', saveAdminCode);
    document.getElementById('save-settings').addEventListener('click', saveSettings);
    
    // Bank soal
    document.getElementById('filter-subject').addEventListener('change', filterQuestions);
    document.getElementById('save-question').addEventListener('click', saveQuestion);
    document.getElementById('generate-questions').addEventListener('click', generateQuestionsWithAI);
    document.getElementById('save-generated-questions').addEventListener('click', saveGeneratedQuestions);
    
    // Modal
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.add('hidden');
        });
    });
    
    document.getElementById('submit-bank-code').addEventListener('click', function() {
        const code = document.getElementById('bank-code-input').value;
        if (code === DEFAULT_BANK_CODE || code === localStorage.getItem('bankCode')) {
            document.getElementById('question-bank-modal').classList.add('hidden');
            showPage('question-bank');
        } else {
            showNotification('Kode bank soal salah!', 'error');
        }
    });
    
    document.getElementById('submit-admin-code').addEventListener('click', function() {
        const code = document.getElementById('admin-code-input').value;
        if (code === DEFAULT_ADMIN_CODE || code === localStorage.getItem('adminCode')) {
            document.getElementById('admin-modal').classList.add('hidden');
            showPage('admin');
        } else {
            showNotification('Kode admin salah!', 'error');
        }
    });
    
    // Load settings
    loadSettings();
    
    // Play opening sound
    const buttonSound = document.getElementById('button-sound');
    buttonSound.play().catch(e => console.log('Autoplay prevented:', e));
});

// Fungsi untuk menampilkan halaman tertentu
function showPage(page) {
    // Sembunyikan semua halaman
    document.querySelectorAll('.page').forEach(p => {
        p.classList.add('hidden');
    });
    
    // Tampilkan halaman yang diminta
    document.getElementById(`${page}-page`).classList.remove('hidden');
    
    // Sembunyikan tombol mengambang di halaman sertifikat
    const floatingButtons = document.querySelector('.floating-buttons');
    if (page === 'certificate') {
        floatingButtons.style.display = 'none';
    } else {
        floatingButtons.style.display = 'flex';
    }
    
    // Lakukan inisialisasi khusus halaman
    switch(page) {
        case 'participant':
            initParticipantPage();
            break;
        case 'exam-options':
            initExamOptionsPage();
            break;
        case 'exam':
            // Inisialisasi sudah dilakukan di startExam()
            break;
        case 'result':
            showExamResult();
            break;
        case 'certificate':
            generateCertificate();
            break;
        case 'admin':
            initAdminPage();
            break;
        case 'question-bank':
            initQuestionBankPage();
            break;
    }
    
    // Perbarui currentPage
    currentPage = page;
}

// Fungsi untuk menangani login
function handleLogin() {
    const loginCode = document.getElementById('login-code').value;
    const savedCode = localStorage.getItem('loginCode') || DEFAULT_LOGIN_CODE;
    
    if (loginCode === savedCode) {
        playButtonSound();
        showPage('rules');
    } else {
        showNotification('Kode login salah!', 'error');
    }
}

// Fungsi untuk inisialisasi halaman peserta
function initParticipantPage() {
    // Reset form
    document.getElementById('participant-form').reset();
    document.getElementById('student-form').classList.remove('hidden');
    document.getElementById('general-form').classList.add('hidden');
}

// Fungsi untuk menyimpan data peserta
function saveParticipantData() {
    const status = document.querySelector('input[name="status"]:checked').value;
    
    participantData = {
        fullName: document.getElementById('full-name').value,
        status: status,
        purpose: status === 'pelajar' ? document.getElementById('student-purpose').value : document.getElementById('general-purpose').value,
        timestamp: new Date().toISOString()
    };
    
    if (status === 'pelajar') {
        participantData.schoolName = document.getElementById('school-name').value;
        participantData.studentId = document.getElementById('student-id').value;
        participantData.schoolLevel = document.getElementById('student-level').value;
    } else {
        participantData.address = document.getElementById('address').value;
        participantData.phone = document.getElementById('phone').value;
        participantData.email = document.getElementById('email').value;
    }
    
    // Simpan data peserta ke localStorage (simulasi database)
    saveParticipantToDatabase(participantData);
    
    playButtonSound();
    showPage('exam-options');
}

// Fungsi untuk inisialisasi halaman pilihan ujian
function initExamOptionsPage() {
    const isStudent = participantData.status === 'pelajar';
    
    document.getElementById('student-options').classList.toggle('hidden', !isStudent);
    document.getElementById('general-options').classList.toggle('hidden', isStudent);
    document.getElementById('license-form').classList.add('hidden');
    document.getElementById('start-exam-btn').classList.add('hidden');
    
    // Isi opsi kelas untuk pelajar
    if (isStudent) {
        const gradeSelect = document.getElementById('student-grade');
        gradeSelect.innerHTML = '';
        
        let grades = [];
        if (participantData.schoolLevel === 'SD') {
            grades = ['Kelas IV', 'Kelas V', 'Kelas VI'];
        } else if (participantData.schoolLevel === 'SMP') {
            grades = ['Kelas VII', 'Kelas VIII', 'Kelas IX'];
        } else {
            grades = ['Kelas X', 'Kelas XI', 'Kelas XII'];
        }
        
        grades.forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.textContent = grade;
            gradeSelect.appendChild(option);
        });
    }
    
    // Reset pilihan ujian
    document.querySelectorAll('.exam-option').forEach(btn => {
        btn.classList.remove('btn-success');
    });
}

// Fungsi untuk memilih opsi ujian
function selectExamOption(button) {
    const subject = button.getAttribute('data-subject');
    
    // Jika memilih CPNS, tampilkan form kode lisensi
    if (subject === 'UJIAN CPNS/P3K') {
        document.getElementById('license-form').classList.remove('hidden');
        document.getElementById('start-exam-btn').classList.add('hidden');
    } else {
        document.getElementById('license-form').classList.add('hidden');
        document.getElementById('start-exam-btn').classList.remove('hidden');
    }
    
    // Set data ujian
    examData = {
        subject: subject,
        grade: participantData.status === 'pelajar' ? document.getElementById('student-grade').value : null
    };
    
    // Highlight tombol yang dipilih
    document.querySelectorAll('.exam-option').forEach(btn => {
        btn.classList.remove('btn-success');
    });
    button.classList.add('btn-success');
    
    playButtonSound();
}

// Fungsi untuk verifikasi kode lisensi
function verifyLicense() {
    const licenseCode = document.getElementById('license-code').value;
    const savedCode = localStorage.getItem('examCode') || DEFAULT_EXAM_CODE;
    
    if (licenseCode === savedCode) {
        document.getElementById('start-exam-btn').classList.remove('hidden');
        showNotification('Kode lisensi valid!', 'success');
        playButtonSound();
    } else {
        showNotification('Kode lisensi salah!', 'error');
    }
}

// Fungsi untuk memulai ujian
function startExam() {
    // Ambil soal berdasarkan subjek
    questions = sampleQuestions[examData.subject] || [];
    
    // Acak urutan soal jika diatur di admin
    if (localStorage.getItem('randomizeQuestions') === 'true') {
        questions = shuffleArray(questions);
    }
    
    // Batasi jumlah soal sesuai setting
    const questionCount = parseInt(localStorage.getItem('questionCount') || 10);
    questions = questions.slice(0, questionCount);
    
    // Set timer
    timeLeft = parseInt(localStorage.getItem('examTimer') || 120) * 60;
    
    // Reset jawaban
    answeredQuestions = {};
    currentQuestionIndex = 0;
    examStarted = true;
    
    // Update judul ujian
    document.getElementById('exam-title').textContent = `Ujian ${examData.subject}`;
    
    // Mulai timer
    startTimer();
    
    // Tampilkan soal pertama
    showQuestion();
    
    playButtonSound();
    showPage('exam');
}

// Fungsi untuk menampilkan soal
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        finishExam();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    const optionsContainer = document.getElementById('options-container');
    
    // Tampilkan pertanyaan
    document.getElementById('question-text').textContent = `${currentQuestionIndex + 1}. ${question.question}`;
    
    // Tampilkan opsi jawaban
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.setAttribute('data-option', String.fromCharCode(65 + index));
        
        // Tandai jika sudah dijawab
        if (answeredQuestions[currentQuestionIndex]) {
            const selectedOption = answeredQuestions[currentQuestionIndex];
            const isCorrect = selectedOption === question.correctAnswer;
            
            if (option.startsWith(selectedOption)) {
                optionElement.classList.add(isCorrect ? 'selected' : 'wrong');
            } else if (option.startsWith(question.correctAnswer)) {
                optionElement.classList.add('selected');
            }
        }
        
        optionElement.addEventListener('click', function() {
            if (!answeredQuestions[currentQuestionIndex]) {
                selectAnswer(this);
            }
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Tampilkan penjelasan jika sudah dijawab
    const explanationElement = document.getElementById('explanation-text');
    if (answeredQuestions[currentQuestionIndex]) {
        explanationElement.style.display = 'block';
        explanationElement.textContent = question.explanation || 'Tidak ada penjelasan tersedia.';
    } else {
        explanationElement.style.display = 'none';
    }
}

// Fungsi untuk memilih jawaban
function selectAnswer(optionElement) {
    const selectedOption = optionElement.getAttribute('data-option');
    const question = questions[currentQuestionIndex];
    
    // Simpan jawaban
    answeredQuestions[currentQuestionIndex] = selectedOption;
    
    // Tandai jawaban benar/salah
    const isCorrect = selectedOption === question.correctAnswer;
    
    if (isCorrect) {
        optionElement.classList.add('selected');
        document.getElementById('correct-sound').play();
    } else {
        optionElement.classList.add('wrong');
        document.getElementById('wrong-sound').play();
        
        // Tandai juga jawaban yang benar
        document.querySelectorAll('.option').forEach(opt => {
            if (opt.getAttribute('data-option') === question.correctAnswer) {
                opt.classList.add('selected');
            }
        });
    }
    
    // Tampilkan penjelasan
    const explanationElement = document.getElementById('explanation-text');
    explanationElement.style.display = 'block';
    explanationElement.textContent = question.explanation || 'Tidak ada penjelasan tersedia.';
}

// Fungsi untuk memulai timer
function startTimer() {
    clearInterval(timerInterval);
    
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            finishExam(true);
        } else if (timeLeft === 10 * 60) {
            // 10 menit tersisa
            showNotification('Perhatian! Ujian akan berakhir dalam waktu 10 menit. Mohon pastikan semua jawaban telah diselesaikan dan diperiksa sebelum waktu habis. Terima kasih atas partisipasi Anda.', 'warning');
        }
    }, 1000);
}

// Fungsi untuk memperbarui tampilan timer
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerElement = document.getElementById('exam-timer');
    
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    // Ubah style jika waktu hampir habis
    timerElement.className = 'timer';
    if (timeLeft <= 10 * 60) {
        timerElement.classList.add('warning');
    }
    if (timeLeft <= 1 * 60) {
        timerElement.classList.remove('warning');
        timerElement.classList.add('danger');
    }
}

// Fungsi untuk melewatkan soal
function skipQuestion() {
    currentQuestionIndex++;
    showQuestion();
    playButtonSound();
}

// Fungsi untuk menampilkan soal yang belum dijawab
function showUnanswered() {
    const unansweredIndexes = [];
    
    for (let i = 0; i < questions.length; i++) {
        if (!answeredQuestions[i]) {
            unansweredIndexes.push(i);
        }
    }
    
    if (unansweredIndexes.length > 0) {
        currentQuestionIndex = unansweredIndexes[0];
        showQuestion();
        showNotification(`Masih ada ${unansweredIndexes.length} soal yang belum dijawab.`, 'info');
    } else {
        showNotification('Semua soal sudah dijawab.', 'success');
    }
    
    playButtonSound();
}

// Fungsi untuk menyelesaikan ujian
function finishExam(timeout = false) {
    clearInterval(timerInterval);
    examStarted = false;
    
    // Hitung hasil
    const totalQuestions = questions.length;
    let correctAnswers = 0;
    
    for (let i = 0; i < totalQuestions; i++) {
        if (answeredQuestions[i] === questions[i].correctAnswer) {
            correctAnswers++;
        }
    }
    
    const wrongAnswers = Object.keys(answeredQuestions).length - correctAnswers;
    const unansweredQuestions = totalQuestions - Object.keys(answeredQuestions).length;
    
    // Simpan hasil
    const result = {
        participant: participantData,
        exam: examData,
        score: Math.round((correctAnswers / totalQuestions) * 100),
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        unansweredQuestions,
        timestamp: new Date().toISOString(),
        timeout
    };
    
    // Simpan hasil ke database (simulasi)
    saveExamResultToDatabase(result);
    
    // Play applause sound
    document.getElementById('applause-sound').play();
    
    // Tampilkan halaman hasil
    showPage('result');
}

// Fungsi untuk menampilkan hasil ujian
function showExamResult() {
    // Ambil hasil terakhir dari database (simulasi)
    const results = JSON.parse(localStorage.getItem('examResults') || '[]');
    const result = results[results.length - 1];
    
    if (!result) return;
    
    // Tampilkan hasil
    document.getElementById('result-score').textContent = result.score;
    document.getElementById('total-questions').textContent = result.totalQuestions;
    document.getElementById('correct-answers').textContent = result.correctAnswers;
    document.getElementById('wrong-answers').textContent = result.wrongAnswers;
    document.getElementById('unanswered-questions').textContent = result.unansweredQuestions;
    
    // Tampilkan pesan berdasarkan skor
    const motivationTexts = (localStorage.getItem('motivationTexts') || "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.\nBagus! Anda telah menunjukkan pemahaman yang baik. Tingkatkan terus kemampuan Anda.\nCukup baik. Masih ada ruang untuk perbaikan. Terus belajar dan berlatih.\nAnda perlu lebih banyak belajar lagi. Jangan menyerah, terus berusaha!").split('\n');
    
    let messageIndex = 0;
    if (result.score >= 90) messageIndex = 0;
    else if (result.score >= 70) messageIndex = 1;
    else if (result.score >= 50) messageIndex = 2;
    else messageIndex = 3;
    
    document.getElementById('result-message').textContent = motivationTexts[messageIndex] || motivationTexts[0];
}

// Fungsi untuk menghasilkan sertifikat
function generateCertificate() {
    // Ambil hasil terakhir dari database (simulasi)
    const results = JSON.parse(localStorage.getItem('examResults') || '[]');
    const result = results[results.length - 1];
    
    if (!result) return;
    
    // Format tanggal
    const date = new Date(result.timestamp);
    const formattedDate = date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    // Generate kode sertifikat
    const participant = result.participant;
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + 
                      Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const certCode = `${participant.fullName.toUpperCase().replace(/ /g, '')}/${participant.status.toUpperCase()}/${participant.schoolLevel || 'UMUM'}/${result.exam.subject}/${formattedDate.replace(/ /g, '')}/${randomCode}/PERGUNU-STB`;
    
    // Isi data sertifikat
    document.getElementById('certificate-name').textContent = participant.fullName;
    document.getElementById('certificate-score').textContent = `Nilai: ${result.score}`;
    document.getElementById('certificate-date').textContent = formattedDate;
    document.getElementById('certificate-code').textContent = certCode;
    document.getElementById('chairman-name').textContent = localStorage.getItem('chairmanName') || "Moh. Nuril Hudha, S.Pd., M.Si.";
    
    // Tampilkan pesan motivasi
    const motivationTexts = (localStorage.getItem('motivationTexts') || "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.\nBagus! Anda telah menunjukkan pemahaman yang baik. Tingkatkan terus kemampuan Anda.\nCukup baik. Masih ada ruang untuk perbaikan. Terus belajar dan berlatih.\nAnda perlu lebih banyak belajar lagi. Jangan menyerah, terus berusaha!").split('\n');
    
    let messageIndex = 0;
    if (result.score >= 90) messageIndex = 0;
    else if (result.score >= 70) messageIndex = 1;
    else if (result.score >= 50) messageIndex = 2;
    else messageIndex = 3;
    
    document.getElementById('motivation-text').textContent = motivationTexts[messageIndex] || motivationTexts[0];
}

// Fungsi untuk mencetak sertifikat
function printCertificate() {
    window.print();
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    
    // Set warna berdasarkan jenis notifikasi
    notification.style.backgroundColor = type === 'error' ? 'rgba(220, 53, 69, 0.9)' : 
                                       type === 'success' ? 'rgba(40, 167, 69, 0.9)' :
                                       type === 'warning' ? 'rgba(255, 193, 7, 0.9)' :
                                       'rgba(23, 162, 184, 0.9)';
    
    // Sembunyikan setelah 3 detik
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Fungsi untuk memainkan suara tombol
function playButtonSound() {
    const sound = document.getElementById('button-sound');
    sound.currentTime = 0;
    sound.play().catch(e => console.log('Audio play prevented:', e));
}

// Fungsi untuk menyimpan data peserta ke database (simulasi)
function saveParticipantToDatabase(data) {
    const participants = JSON.parse(localStorage.getItem('participants') || '[]');
    participants.push(data);
    localStorage.setItem('participants', JSON.stringify(participants));
}

// Fungsi untuk menyimpan hasil ujian ke database (simulasi)
function saveExamResultToDatabase(data) {
    const results = JSON.parse(localStorage.getItem('examResults') || '[]');
    results.push(data);
    localStorage.setItem('examResults', JSON.stringify(results));
}

// Fungsi untuk mendapatkan lokasi GPS
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                // Gunakan API geocoding untuk mendapatkan alamat dari koordinat
                getAddressFromCoordinates(position.coords.latitude, position.coords.longitude);
            },
            function(error) {
                showNotification('Tidak dapat mendapatkan lokasi: ' + error.message, 'error');
            }
        );
    } else {
        showNotification('Geolocation tidak didukung oleh browser Anda.', 'error');
    }
}

// Fungsi untuk mendapatkan alamat dari koordinat (menggunakan Nominatim API)
function getAddressFromCoordinates(lat, lon) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            const address = data.display_name || 'Lokasi tidak diketahui';
            document.getElementById('address').value = address;
            showNotification('Lokasi berhasil ditemukan!', 'success');
        })
        .catch(error => {
            console.error('Error getting address:', error);
            showNotification('Gagal mendapatkan alamat dari koordinat.', 'error');
        });
}

// Fungsi untuk mengacak array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fungsi untuk menampilkan modal share
function showShareModal() {
    // Di aplikasi nyata, ini akan berisi link yang bisa diatur di admin
    const shareLinks = [
        { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
        { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
        { name: 'WhatsApp', icon: 'fab fa-whatsapp', url: '#' },
        { name: 'Telegram', icon: 'fab fa-telegram', url: '#' },
        { name: 'Email', icon: 'fas fa-envelope', url: '#' }
    ];
    
    const linksContainer = document.getElementById('share-links');
    linksContainer.innerHTML = '';
    
    shareLinks.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.className = 'btn';
        linkElement.style.margin = '5px';
        linkElement.innerHTML = `<i class="${link.icon}"></i> ${link.name}`;
        linksContainer.appendChild(linkElement);
    });
    
    document.getElementById('share-modal').classList.remove('hidden');
    playButtonSound();
}

// Fungsi untuk membuka WhatsApp
function openWhatsApp() {
    const phone = '6285647709114';
    const message = 'Assalamualaikum mas admin, saya mau tanya sesuatu nih…';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    playButtonSound();
}

// Fungsi untuk menampilkan modal bank soal
function showQuestionBankModal() {
    document.getElementById('question-bank-modal').classList.remove('hidden');
    playButtonSound();
}

// Fungsi untuk menampilkan modal admin
function showAdminModal() {
    document.getElementById('admin-modal').classList.remove('hidden');
    playButtonSound();
}

// Fungsi untuk mengatur tab admin
function setupAdminTabs() {
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Hapus active dari semua tab dan content
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-content').forEach(c => c.classList.remove('active'));
            
            // Tambahkan active ke tab yang diklik
            this.classList.add('active');
            
            // Tampilkan content yang sesuai
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.add('active');
            
            playButtonSound();
        });
    });
}

// Fungsi untuk menyimpan kode login
function saveLoginCode() {
    const newCode = document.getElementById('new-login-code').value;
    const currentCode = document.getElementById('current-login-code').value;
    const savedCode = localStorage.getItem('loginCode') || DEFAULT_LOGIN_CODE;
    
    if (currentCode === savedCode) {
        localStorage.setItem('loginCode', newCode);
        showNotification('Kode login berhasil diubah!', 'success');
        document.getElementById('new-login-code').value = '';
        document.getElementById('current-login-code').value = '';
        playButtonSound();
    } else {
        showNotification('Kode login lama salah!', 'error');
    }
}

// Fungsi untuk menyimpan kode ujian CPNS
function saveExamCode() {
    const newCode = document.getElementById('new-exam-code').value;
    const currentCode = document.getElementById('current-exam-code').value;
    const savedCode = localStorage.getItem('examCode') || DEFAULT_EXAM_CODE;
    
    if (currentCode === savedCode) {
        localStorage.setItem('examCode', newCode);
        showNotification('Kode ujian CPNS berhasil diubah!', 'success');
        document.getElementById('new-exam-code').value = '';
        document.getElementById('current-exam-code').value = '';
        playButtonSound();
    } else {
        showNotification('Kode ujian CPNS lama salah!', 'error');
    }
}

// Fungsi untuk menyimpan kode bank soal
function saveQuestionCode() {
    const newCode = document.getElementById('new-question-code').value;
    const currentCode = document.getElementById('current-question-code').value;
    const savedCode = localStorage.getItem('bankCode') || DEFAULT_BANK_CODE;
    
    if (currentCode === savedCode) {
        localStorage.setItem('bankCode', newCode);
        showNotification('Kode bank soal berhasil diubah!', 'success');
        document.getElementById('new-question-code').value = '';
        document.getElementById('current-question-code').value = '';
        playButtonSound();
    } else {
        showNotification('Kode bank soal lama salah!', 'error');
    }
}

// Fungsi untuk menyimpan kode admin
function saveAdminCode() {
    const newCode = document.getElementById('new-admin-code').value;
    const currentCode = document.getElementById('current-admin-code').value;
    const savedCode = localStorage.getItem('adminCode') || DEFAULT_ADMIN_CODE;
    
    if (currentCode === savedCode) {
        localStorage.setItem('adminCode', newCode);
        showNotification('Kode admin berhasil diubah!', 'success');
        document.getElementById('new-admin-code').value = '';
        document.getElementById('current-admin-code').value = '';
        playButtonSound();
    } else {
        showNotification('Kode admin lama salah!', 'error');
    }
}

// Fungsi untuk menyimpan pengaturan
function saveSettings() {
    localStorage.setItem('examTimer', document.getElementById('exam-timer-setting').value);
    localStorage.setItem('chairmanName', document.getElementById('chairman-name-setting').value);
    localStorage.setItem('welcomeMessage', document.getElementById('welcome-message-setting').value);
    localStorage.setItem('infoText', document.getElementById('info-text-setting').value);
    localStorage.setItem('motivationTexts', document.getElementById('motivation-texts-setting').value);
    localStorage.setItem('questionPoint', document.getElementById('question-point-setting').value);
    localStorage.setItem('questionCount', document.getElementById('question-count-setting').value);
    
    // Simpan status toggle ujian
    document.querySelectorAll('.exam-toggle').forEach(toggle => {
        const exam = toggle.getAttribute('data-exam');
        localStorage.setItem(`examEnabled_${exam}`, toggle.checked);
    });
    
    showNotification('Pengaturan berhasil disimpan!', 'success');
    playButtonSound();
}

// Fungsi untuk memuat pengaturan
function loadSettings() {
    // Update form dengan nilai dari localStorage
    if (localStorage.getItem('examTimer')) {
        document.getElementById('exam-timer-setting').value = localStorage.getItem('examTimer');
    }
    
    if (localStorage.getItem('chairmanName')) {
        document.getElementById('chairman-name-setting').value = localStorage.getItem('chairmanName');
    }
    
    if (localStorage.getItem('welcomeMessage')) {
        document.getElementById('welcome-message-setting').value = localStorage.getItem('welcomeMessage');
        document.getElementById('welcome-message').textContent = localStorage.getItem('welcomeMessage');
    }
    
    if (localStorage.getItem('infoText')) {
        document.getElementById('info-text-setting').value = localStorage.getItem('infoText');
        document.getElementById('info-text').textContent = localStorage.getItem('infoText');
    }
    
    if (localStorage.getItem('motivationTexts')) {
        document.getElementById('motivation-texts-setting').value = localStorage.getItem('motivationTexts');
    }
    
    if (localStorage.getItem('questionPoint')) {
        document.getElementById('question-point-setting').value = localStorage.getItem('questionPoint');
    }
    
    if (localStorage.getItem('questionCount')) {
        document.getElementById('question-count-setting').value = localStorage.getItem('questionCount');
    }
    
    // Update toggle ujian
    document.querySelectorAll('.exam-toggle').forEach(toggle => {
        const exam = toggle.getAttribute('data-exam');
        const isEnabled = localStorage.getItem(`examEnabled_${exam}`) !== 'false';
        toggle.checked = isEnabled;
    });
}

// Fungsi untuk inisialisasi halaman admin
function initAdminPage() {
    // Pastikan sudah login sebagai admin
    // Di aplikasi nyata, ini akan memiliki sistem autentikasi yang lebih aman
    loadSettings();
}

// Fungsi untuk inisialisasi halaman bank soal
function initQuestionBankPage() {
    // Pastikan sudah login sebagai admin
    // Di aplikasi nyata, ini akan memiliki sistem autentikasi yang lebih aman
    filterQuestions();
}

// Fungsi untuk memfilter soal berdasarkan mata ujian
function filterQuestions() {
    const subject = document.getElementById('filter-subject').value;
    const questionsList = document.getElementById('questions-list');
    
    questionsList.innerHTML = '<div style="text-align: center; padding: 20px;"><div class="spinner"></div><p>Memuat soal...</p></div>';
    
    // Simulasi loading
    setTimeout(() => {
        let filteredQuestions = [];
        
        // Gabungkan semua soal dari semua mata ujian
        for (const [subj, qs] of Object.entries(sampleQuestions)) {
            if (!subject || subj === subject) {
                filteredQuestions = filteredQuestions.concat(qs.map(q => ({ ...q, subject: subj })));
            }
        }
        
        // Tampilkan soal
        if (filteredQuestions.length === 0) {
            questionsList.innerHTML = '<p>Tidak ada soal yang ditemukan.</p>';
            return;
        }
        
        questionsList.innerHTML = '';
        filteredQuestions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'card';
            questionElement.style.marginBottom = '15px';
            questionElement.style.padding = '15px';
            
            questionElement.innerHTML = `
                <h4>${q.subject} - Soal #${index + 1}</h4>
                <p><strong>${q.question}</strong></p>
                <div style="margin: 10px 0;">
                    ${q.options.map(opt => `<div>${opt}</div>`).join('')}
                </div>
                <p><strong>Jawaban benar:</strong> ${q.correctAnswer}</p>
                <p><strong>Penjelasan:</strong> ${q.explanation || 'Tidak ada penjelasan'}</p>
                <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
                    <button class="btn btn-warning edit-question" data-index="${index}" data-subject="${q.subject}" style="margin-right: 10px;">Edit</button>
                    <button class="btn btn-danger delete-question" data-index="${index}" data-subject="${q.subject}">Hapus</button>
                </div>
            `;
            
            questionsList.appendChild(questionElement);
        });
        
        // Tambahkan event listener untuk tombol edit dan hapus
        document.querySelectorAll('.edit-question').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const subject = this.getAttribute('data-subject');
                editQuestion(index, subject);
            });
        });
        
        document.querySelectorAll('.delete-question').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const subject = this.getAttribute('data-subject');
                deleteQuestion(index, subject);
            });
        });
    }, 1000);
}

// Fungsi untuk mengedit soal
function editQuestion(index, subject) {
    // Di aplikasi nyata, ini akan mengambil soal dari database
    const question = sampleQuestions[subject][index];
    
    // Isi form dengan data soal
    document.getElementById('question-subject').value = subject;
    document.getElementById('question-text').value = question.question;
    document.getElementById('option-a').value = question.options[0].substring(3);
    document.getElementById('option-b').value = question.options[1].substring(3);
    document.getElementById('option-c').value = question.options[2].substring(3);
    document.getElementById('option-d').value = question.options[3].substring(3);
    document.getElementById('option-e').value = question.options[4] ? question.options[4].substring(3) : '';
    document.getElementById('correct-answer').value = question.correctAnswer;
    document.getElementById('explanation').value = question.explanation || '';
    
    // Pindah ke tab tambah soal
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-content').forEach(c => c.classList.remove('active'));
    
    document.querySelector('.admin-tab[data-tab="add-question"]').classList.add('active');
    document.getElementById('add-question-content').classList.add('active');
    
    // Scroll ke form
    document.getElementById('question-text').scrollIntoView({ behavior: 'smooth' });
    
    playButtonSound();
}

// Fungsi untuk menghapus soal
function deleteQuestion(index, subject) {
    if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        // Di aplikasi nyata, ini akan menghapus dari database
        sampleQuestions[subject].splice(index, 1);
        showNotification('Soal berhasil dihapus!', 'success');
        filterQuestions();
        playButtonSound();
    }
}

// Fungsi untuk menyimpan soal
function saveQuestion() {
    const subject = document.getElementById('question-subject').value;
    const questionText = document.getElementById('question-text').value;
    const options = [
        `A. ${document.getElementById('option-a').value}`,
        `B. ${document.getElementById('option-b').value}`,
        `C. ${document.getElementById('option-c').value}`,
        `D. ${document.getElementById('option-d').value}`
    ];
    
    // Tambahkan opsi E jika diisi
    if (document.getElementById('option-e').value) {
        options.push(`E. ${document.getElementById('option-e').value}`);
    }
    
    const correctAnswer = document.getElementById('correct-answer').value;
    const explanation = document.getElementById('explanation').value;
    
    // Validasi
    if (!subject || !questionText || !options[0] || !options[1] || !options[2] || !options[3] || !correctAnswer) {
        showNotification('Harap isi semua field yang diperlukan!', 'error');
        return;
    }
    
    // Buat objek soal baru
    const newQuestion = {
        question: questionText,
        options: options,
        correctAnswer: correctAnswer,
        explanation: explanation
    };
    
    // Simpan soal (di aplikasi nyata ini akan disimpan ke database)
    if (!sampleQuestions[subject]) {
        sampleQuestions[subject] = [];
    }
    sampleQuestions[subject].push(newQuestion);
    
    // Reset form
    document.getElementById('add-question-content').querySelector('form').reset();
    
    showNotification('Soal berhasil disimpan!', 'success');
    playButtonSound();
    
    // Kembali ke tab kelola soal
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-content').forEach(c => c.classList.remove('active'));
    
    document.querySelector('.admin-tab[data-tab="manage-questions"]').classList.add('active');
    document.getElementById('manage-questions-content').classList.add('active');
    
    // Perbarui daftar soal
    filterQuestions();
}

// Fungsi untuk generate soal dengan AI
function generateQuestionsWithAI() {
    const prompt = document.getElementById('ai-prompt').value;
    const subject = document.getElementById('ai-subject').value;
    
    if (!prompt) {
        showNotification('Harap masukkan prompt untuk AI!', 'error');
        return;
    }
    
    // Di aplikasi nyata, ini akan memanggil API AI
    // Berikut adalah contoh implementasi dengan API OpenAI (Anda perlu menambahkan API key)
    
    /*
    // UNCOMMENT DAN ISI API KEY ANDA DI BAWAH INI
    const API_KEY = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Ganti dengan API key OpenAI Anda
    
    document.getElementById('ai-results').style.display = 'block';
    document.getElementById('generated-questions').innerHTML = '<div style="text-align: center;"><div class="spinner"></div><p>Sedang generate soal...</p></div>';
    
    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'Anda adalah seorang ahli pembuat soal ujian. Buatkan soal pilihan ganda dengan format: Pertanyaan, 4 opsi jawaban (A-D), jawaban benar (huruf saja), dan penjelasan singkat.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7
        })
    })
    .then(response => response.json())
    .then(data => {
        const content = data.choices[0].message.content;
        document.getElementById('generated-questions').innerHTML = `<pre>${content}</pre>`;
        
        // Di aplikasi nyata, Anda perlu parsing hasilnya untuk disimpan sebagai soal
        // Ini hanya contoh sederhana
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('generated-questions').innerHTML = '<p>Gagal generate soal. Pastikan API key valid.</p>';
    });
    */
    
    // Contoh hasil statis untuk demonstrasi (hapus di aplikasi nyata)
    document.getElementById('ai-results').style.display = 'block';
    document.getElementById('generated-questions').innerHTML = `
        <p><strong>1. Apa ibukota Indonesia?</strong></p>
        <p>A. Jakarta</p>
        <p>B. Bandung</p>
        <p>C. Surabaya</p>
        <p>D. Medan</p>
        <p><em>Jawaban benar: A</em></p>
        <p><em>Penjelasan: Jakarta adalah ibukota Indonesia sejak tahun 1945.</em></p>
        <hr>
        <p><strong>2. Siapa presiden pertama Indonesia?</strong></p>
        <p>A. Soeharto</p>
        <p>B. Soekarno</p>
        <p>C. Joko Widodo</p>
        <p>D. Susilo Bambang Yudhoyono</p>
        <p><em>Jawaban benar: B</em></p>
        <p><em>Penjelasan: Soekarno adalah presiden pertama Indonesia yang menjabat dari tahun 1945 hingga 1967.</em></p>
    `;
    
    showNotification('Fitur AI membutuhkan API key yang valid. Ini hanya contoh demonstrasi.', 'info');
    playButtonSound();
}

// Fungsi untuk menyimpan soal yang dihasilkan AI
function saveGeneratedQuestions() {
    // Di aplikasi nyata, ini akan parsing dan menyimpan soal yang dipilih dari hasil AI
    showNotification('Soal berhasil disimpan! (simulasi)', 'success');
    playButtonSound();
    
    // Sembunyikan hasil dan reset form
    document.getElementById('ai-results').style.display = 'none';
    document.getElementById('ai-prompt').value = '';
    
    // Perbarui daftar soal
    filterQuestions();
}
