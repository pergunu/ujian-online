// Fungsi untuk memeriksa kode login di sessionStorage
function checkLogin() {
    const examCode = sessionStorage.getItem('examCode');
    if(!examCode || examCode !== '12345') {
        window.location.href = 'index.html';
    }
}

// Fungsi untuk validasi form peserta
function validateParticipantForm() {
    const form = document.getElementById('participantForm');
    const name = form.elements['fullName'].value.trim();
    const status = form.elements['status'].value;
    const purpose = form.elements['purpose'].value;
    
    // Validasi nama lengkap
    if(name === '') {
        alert('Nama lengkap harus diisi');
        return false;
    }
    
    // Validasi status
    if(status === '') {
        alert('Status peserta harus dipilih');
        return false;
    }
    
    // Validasi berdasarkan status
    if(status === 'pelajar') {
        const school = form.elements['school'].value.trim();
        const nis = form.elements['nis'].value.trim();
        
        if(school === '') {
            alert('Nama sekolah harus diisi');
            return false;
        }
        
        if(nis === '' || isNaN(nis)) {
            alert('NIS harus diisi dengan angka');
            return false;
        }
    } else if(status === 'umum') {
        const address = form.elements['address'].value.trim();
        const phone = form.elements['phone'].value.trim();
        const email = form.elements['email'].value.trim();
        
        if(address === '') {
            alert('Alamat harus diisi');
            return false;
        }
        
        if(phone === '' || isNaN(phone) || phone.length < 10 || phone.length > 13) {
            alert('Nomor WhatsApp harus diisi dengan angka (10-13 digit)');
            return false;
        }
        
        if(email === '' || !validateEmail(email)) {
            alert('Email harus diisi dengan format yang valid (@gmail, @yahoo, atau @hotmail)');
            return false;
        }
    }
    
    // Validasi tujuan
    if(purpose === '') {
        alert('Tujuan ikut ujian harus dipilih');
        return false;
    }
    
    return true;
}

// Fungsi untuk validasi email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+(gmail|yahoo|hotmail)\.com))$/;
    return re.test(String(email).toLowerCase());
}

// Fungsi untuk menampilkan/menyembunyikan form berdasarkan status
function toggleStatusFields() {
    const status = document.getElementById('status').value;
    const studentFields = document.getElementById('studentFields');
    const generalFields = document.getElementById('generalFields');
    
    if(status === 'pelajar') {
        studentFields.style.display = 'block';
        generalFields.style.display = 'none';
        
        // Reset general fields
        document.getElementById('address').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
    } else if(status === 'umum') {
        studentFields.style.display = 'none';
        generalFields.style.display = 'block';
        
        // Reset student fields
        document.getElementById('school').value = '';
        document.getElementById('nis').value = '';
    } else {
        studentFields.style.display = 'none';
        generalFields.style.display = 'none';
    }
    
    // Reset purpose options
    const purposeSelect = document.getElementById('purpose');
    purposeSelect.innerHTML = '<option value="">Pilih Tujuan</option>';
    
    if(status === 'pelajar') {
        purposeSelect.innerHTML += `
            <option value="tugas_sekolah">Tugas Sekolah</option>
            <option value="tugas_ulangan">Tugas Ulangan</option>
            <option value="tes_belajar">Tes dan Belajar</option>
        `;
    } else if(status === 'umum') {
        purposeSelect.innerHTML += `
            <option value="tes_iq">Tes IQ</option>
            <option value="ujian_cpns">Ujian CPNS/P3K</option>
        `;
    }
}

// Fungsi untuk mendapatkan lokasi GPS
function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert('Geolocation tidak didukung oleh browser ini.');
    }
}

function showPosition(position) {
    // Menggunakan API Nominatim untuk reverse geocoding
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        .then(response => response.json())
        .then(data => {
            let address = '';
            if(data.address) {
                if(data.address.road) address += data.address.road + ', ';
                if(data.address.village) address += data.address.village + ', ';
                if(data.address.suburb) address += data.address.suburb + ', ';
                if(data.address.city) address += data.address.city + ', ';
                if(data.address.state) address += data.address.state + ', ';
                if(data.address.country) address += data.address.country;
            }
            
            document.getElementById('address').value = address;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal mendapatkan alamat. Silakan isi manual.');
        });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Pengguna menolak permintaan Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Informasi lokasi tidak tersedia.");
            break;
        case error.TIMEOUT:
            alert("Permintaan lokasi pengguna habis waktunya.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Terjadi kesalahan yang tidak diketahui.");
            break;
    }
}

// Fungsi untuk memulai ujian
function startExam() {
    // Simpan data peserta ke sessionStorage
    const form = document.getElementById('participantForm');
    const participantData = {
        name: form.elements['fullName'].value.trim(),
        status: form.elements['status'].value,
        purpose: form.elements['purpose'].value,
        examType: document.getElementById('examType').value,
        level: document.getElementById('level').value
    };
    
    sessionStorage.setItem('participantData', JSON.stringify(participantData));
    
    // Redirect ke halaman ujian
    window.location.href = 'exam.html';
}

// Fungsi untuk memuat soal ujian
function loadQuestions() {
    // Ambil data peserta dari sessionStorage
    const participantData = JSON.parse(sessionStorage.getItem('participantData'));
    if(!participantData) {
        window.location.href = 'register.html';
        return;
    }
    
    // Tentukan jenis soal berdasarkan pilihan peserta
    let questions = [];
    if(participantData.status === 'pelajar') {
        questions = getStudentQuestions(participantData.examType, participantData.level);
    } else {
        questions = getGeneralQuestions(participantData.purpose);
    }
    
    // Simpan soal ke sessionStorage
    sessionStorage.setItem('examQuestions', JSON.stringify(questions));
    sessionStorage.setItem('currentQuestion', 0);
    sessionStorage.setItem('correctAnswers', 0);
    sessionStorage.setItem('wrongAnswers', 0);
    
    // Tampilkan soal pertama
    displayQuestion(0);
    
    // Mulai timer
    startTimer(120); // 120 menit = 2 jam
}

// Fungsi untuk mendapatkan soal pelajar
function getStudentQuestions(examType, level) {
    // Ini adalah contoh data, Anda bisa mengganti dengan data sebenarnya dari database
    const allQuestions = {
        'AGAMA': [
            {
                question: "Apa nama kitab suci umat Islam?",
                options: ["Injil", "Taurat", "Al-Qur'an", "Zabur", "Wedha"],
                answer: 2,
                explanation: "Kitab suci umat Islam adalah Al-Qur'an yang diturunkan kepada Nabi Muhammad SAW."
            }
        ],
        'PPKN': [
            {
                question: "Pancasila sebagai dasar negara tercantum dalam?",
                options: ["Pembukaan UUD 1945", "Batang Tubuh UUD 1945", "Penjelasan UUD 1945", "Keputusan Presiden", "Tap MPR"],
                answer: 0,
                explanation: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat."
            }
        ],
        // Tambahkan soal lainnya...
    };
    
    return allQuestions[examType] || [];
}

// Fungsi untuk mendapatkan soal umum
function getGeneralQuestions(purpose) {
    if(purpose === 'tes_iq') {
        return [
            {
                question: "Jika 2, 4, 8, 16, maka berapa berikutnya?",
                options: ["18", "20", "24", "32", "64"],
                answer: 3,
                explanation: "Pola ini adalah perkalian 2 setiap angka (2×2=4, 4×2=8, 8×2=16, 16×2=32)."
            }
        ];
    } else if(purpose === 'ujian_cpns') {
        return [
            {
                question: "Negara Indonesia berdasarkan atas hukum, tidak berdasarkan atas kekuasaan belaka. Pernyataan ini terdapat dalam UUD 1945 pasal?",
                options: ["Pasal 1 ayat 1", "Pasal 1 ayat 2", "Pasal 1 ayat 3", "Pasal 2 ayat 1", "Pasal 2 ayat 2"],
                answer: 1,
                explanation: "Pasal 1 ayat 2 UUD 1945 menyatakan 'Negara Indonesia adalah negara hukum'."
            }
        ];
    }
    
    return [];
}

// Fungsi untuk menampilkan soal
function displayQuestion(index) {
    const questions = JSON.parse(sessionStorage.getItem('examQuestions'));
    if(!questions || index >= questions.length) {
        finishExam();
        return;
    }
    
    const question = questions[index];
    const questionElement = document.getElementById('questionContainer');
    
    // Tampilkan soal
    questionElement.innerHTML = `
        <div class="question-header">
            <span class="question-number">Soal ${index + 1} dari ${questions.length}</span>
            <span class="timer" id="examTimer">120:00</span>
        </div>
        <div class="question-text">${question.question}</div>
        <div class="options-container">
            ${question.options.map((option, i) => `
                <div class="option" onclick="selectOption(${i}, ${index})">
                    <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                    <span class="option-text">${option}</span>
                </div>
            `).join('')}
        </div>
        <div class="explanation" id="explanation-${index}" style="display: none;">
            <strong>Penjelasan:</strong> ${question.explanation}
        </div>
    `;
    
    // Update navigasi soal
    updateQuestionNavigation(index, questions.length);
}

// Fungsi untuk memilih jawaban
function selectOption(optionIndex, questionIndex) {
    const questions = JSON.parse(sessionStorage.getItem('examQuestions'));
    const question = questions[questionIndex];
    
    // Play sound based on answer
    const audio = new Audio(question.answer === optionIndex ? 
        'assets/audio/jawabanbenar.mp3' : 'assets/audio/jawabansalah.mp3');
    audio.play();
    
    // Update score
    let correctAnswers = parseInt(sessionStorage.getItem('correctAnswers')) || 0;
    let wrongAnswers = parseInt(sessionStorage.getItem('wrongAnswers')) || 0;
    
    if(question.answer === optionIndex) {
        correctAnswers++;
        document.querySelectorAll('.option')[optionIndex].classList.add('correct');
    } else {
        wrongAnswers++;
        document.querySelectorAll('.option')[optionIndex].classList.add('wrong');
        document.querySelectorAll('.option')[question.answer].classList.add('correct');
    }
    
    sessionStorage.setItem('correctAnswers', correctAnswers);
    sessionStorage.setItem('wrongAnswers', wrongAnswers);
    
    // Tampilkan penjelasan
    document.getElementById(`explanation-${questionIndex}`).style.display = 'block';
    
    // Nonaktifkan semua opsi
    document.querySelectorAll('.option').forEach(opt => {
        opt.style.pointerEvents = 'none';
    });
    
    // Update navigasi soal
    updateQuestionNavigation(questionIndex, questions.length);
}

// Fungsi untuk navigasi soal
function updateQuestionNavigation(currentIndex, totalQuestions) {
    const navElement = document.getElementById('questionNavigation');
    
    navElement.innerHTML = `
        <button class="nav-btn" onclick="finishExam()">
            <i class="fas fa-flag"></i> Selesaikan Ujian
        </button>
        <button class="nav-btn" onclick="nextQuestion(${currentIndex})" ${currentIndex >= totalQuestions - 1 ? 'disabled' : ''}>
            <i class="fas fa-forward"></i> Lewati Soal
        </button>
        <button class="nav-btn" onclick="showUnanswered()">
            <i class="fas fa-question-circle"></i> Soal Belum Dijawab
        </button>
    `;
}

// Fungsi untuk pindah ke soal berikutnya
function nextQuestion(currentIndex) {
    sessionStorage.setItem('currentQuestion', currentIndex + 1);
    displayQuestion(currentIndex + 1);
}

// Fungsi untuk menampilkan soal yang belum dijawab
function showUnanswered() {
    const questions = JSON.parse(sessionStorage.getItem('examQuestions'));
    const currentIndex = parseInt(sessionStorage.getItem('currentQuestion')) || 0;
    
    // Cari soal yang belum dijawab
    for(let i = 0; i < questions.length; i++) {
        if(!questions[i].answered) {
            sessionStorage.setItem('currentQuestion', i);
            displayQuestion(i);
            return;
        }
    }
    
    // Jika semua sudah dijawab, tetap di soal saat ini
    alert('Semua soal sudah dijawab');
    displayQuestion(currentIndex);
}

// Fungsi untuk timer ujian
function startTimer(minutes) {
    let time = minutes * 60;
    const timerElement = document.getElementById('examTimer');
    
    const timer = setInterval(() => {
        const mins = Math.floor(time / 60);
        let secs = time % 60;
        
        secs = secs < 10 ? '0' + secs : secs;
        timerElement.textContent = `${mins}:${secs}`;
        
        // Ubah ukuran timer jika sisa 10 menit
        if(time === 10 * 60) {
            timerElement.classList.add('warning');
            
            // Tampilkan notifikasi
            const notification = document.createElement('div');
            notification.className = 'time-notification';
            notification.innerHTML = `
                <p>Perhatian! Ujian akan berakhir dalam waktu 10 menit. Mohon pastikan semua jawaban telah diselesaikan dan diperiksa sebelum waktu habis. Terima kasih atas partisipasi Anda.</p>
            `;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 9 * 60 * 1000); // Hilangkan setelah 9 menit
        }
        
        // Hilangkan notifikasi jika sisa 1 menit
        if(time === 60) {
            document.querySelector('.time-notification')?.remove();
        }
        
        // Akhiri ujian jika waktu habis
        if(time <= 0) {
            clearInterval(timer);
            finishExam();
        }
        
        time--;
    }, 1000);
    
    sessionStorage.setItem('examTimer', timer);
}

// Fungsi untuk menyelesaikan ujian
function finishExam() {
    // Hentikan timer
    clearInterval(parseInt(sessionStorage.getItem('examTimer')));
    
    // Hitung skor
    const questions = JSON.parse(sessionStorage.getItem('examQuestions')) || [];
    const correctAnswers = parseInt(sessionStorage.getItem('correctAnswers')) || 0;
    const wrongAnswers = parseInt(sessionStorage.getItem('wrongAnswers')) || 0;
    const unanswered = questions.length - correctAnswers - wrongAnswers;
    
    // Hitung nilai
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    // Simpan hasil
    const result = {
        totalQuestions: questions.length,
        correctAnswers,
        wrongAnswers,
        unanswered,
        score,
        timestamp: new Date().toISOString()
    };
    
    sessionStorage.setItem('examResult', JSON.stringify(result));
    
    // Redirect ke halaman hasil
    window.location.href = 'result.html';
}

// Fungsi untuk generate sertifikat
function generateCertificate() {
    const participantData = JSON.parse(sessionStorage.getItem('participantData'));
    const examResult = JSON.parse(sessionStorage.getItem('examResult'));
    
    if(!participantData || !examResult) {
        window.location.href = 'index.html';
        return;
    }
    
    // Generate kode sertifikat
    const now = new Date();
    const dateStr = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + 
                      Math.random().toString(36).substring(2, 6).toUpperCase();
    
    let level = '';
    if(participantData.status === 'pelajar') {
        level = participantData.level;
    } else {
        level = participantData.purpose === 'tes_iq' ? 'Tes IQ' : 'Ujian CPNS/P3K';
    }
    
    const certificateCode = `${participantData.name.toUpperCase().replace(/ /g, '_')}/` +
                           `${participantData.status.toUpperCase()}/` +
                           `${level.toUpperCase()}/` +
                           `${participantData.examType ? participantData.examType.toUpperCase() : 'UMUM'}/` +
                           `${dateStr}/` +
                           `${randomCode}/` +
                           `PERGUNU-STB`;
    
    // Tampilkan sertifikat
    const certificateElement = document.getElementById('certificateContainer');
    certificateElement.innerHTML = `
        <div class="certificate" id="certificatePrint">
            <div class="certificate-bg">
                <img src="assets/images/certificate.png" alt="Certificate Background">
            </div>
            <div class="certificate-content">
                <h1>SERTIFIKAT PRESTASI</h1>
                <p class="awarded-to">Diberikan Kepada</p>
                <h2 class="recipient-name">${formatName(participantData.name)}</h2>
                <p class="achievement">Atas Partisipasi & Pencapaian Luar Biasa dalam <strong>Ujian PERGUNU Situbondo</strong></p>
                <p class="description">Sebagai penghargaan atas dedikasi dalam memahami materi ujian dan mengasah logika, sertifikat ini diberikan sebagai motivasi untuk terus berkembang.</p>
                <div class="score-container">
                    <div class="score-circle">
                        <span class="score-value">${examResult.score}</span>
                        <span class="score-label">Nilai</span>
                    </div>
                </div>
                <p class="motivation">${getMotivationMessage(examResult.score)}</p>
                <div class="footer">
                    <p class="period">Ditetapkan di: Situbondo, ${formatDate(now)}</p>
                    <div class="signature">
                        <p class="title">Ketua PERGUNU Situbondo</p>
                        <p class="name">Moh. Nuril Hudha, S.Pd., M.Si.</p>
                    </div>
                    <div class="barcode">
                        <img src="assets/images/BARCODE.png" alt="Barcode">
                    </div>
                </div>
                <div class="certificate-code">${certificateCode}</div>
            </div>
        </div>
        <div class="certificate-actions">
            <button class="btn-gradient" onclick="printCertificate()">
                <i class="fas fa-print"></i> Cetak Sertifikat
            </button>
            <button class="btn-gradient" onclick="retakeExam()">
                <i class="fas fa-redo"></i> Ulangi Ujian
            </button>
        </div>
    `;
    
    // Play applause sound
    const applause = new Audio('assets/audio/applause.mp3');
    applause.play();
}

// Fungsi untuk memformat nama
function formatName(name) {
    return name.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
}

// Fungsi untuk memformat tanggal
function formatDate(date) {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Fungsi untuk mendapatkan pesan motivasi berdasarkan skor
function getMotivationMessage(score) {
    if(score >= 90) return "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.";
    if(score >= 80) return "Luar biasa! Pemahaman Anda sangat baik. Tingkatkan terus kemampuan Anda.";
    if(score >= 70) return "Bagus! Anda memiliki pemahaman yang cukup baik. Terus berlatih untuk hasil yang lebih baik.";
    if(score >= 60) return "Cukup baik. Masih ada ruang untuk meningkatkan pemahaman Anda. Jangan menyerah!";
    if(score >= 50) return "Anda sudah berusaha. Pelajari kembali materi dan coba lagi untuk hasil yang lebih baik.";
    return "Jangan berkecil hati. Gunakan ini sebagai motivasi untuk belajar lebih giat lagi.";
}

// Fungsi untuk mencetak sertifikat
function printCertificate() {
    const printContent = document.getElementById('certificatePrint').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    
    // Setelah print, tampilkan kembali sertifikat
    generateCertificate();
}

// Fungsi untuk mengulang ujian
function retakeExam() {
    sessionStorage.removeItem('examQuestions');
    sessionStorage.removeItem('currentQuestion');
    sessionStorage.removeItem('correctAnswers');
    sessionStorage.removeItem('wrongAnswers');
    sessionStorage.removeItem('examResult');
    
    window.location.href = 'register.html';
}
