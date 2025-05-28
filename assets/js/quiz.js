// Event listener untuk tombol lewati soal
document.getElementById('skipQuestionBtn').addEventListener('click', function() {
    const currentIndex = parseInt(localStorage.getItem('currentQuestionIndex'));
    const examQuestions = JSON.parse(localStorage.getItem('examQuestions'));
    
    if (currentIndex < examQuestions.length - 1) {
        showQuestion(currentIndex + 1);
        localStorage.setItem('currentQuestionIndex', (currentIndex + 1).toString());
    } else {
        finishExam();
    }
});

// Event listener untuk tombol soal belum dijawab
document.getElementById('unansweredBtn').addEventListener('click', function() {
    const currentIndex = parseInt(localStorage.getItem('currentQuestionIndex'));
    const examQuestions = JSON.parse(localStorage.getItem('examQuestions'));
    
    // Cari soal yang belum dijawab
    for (let i = currentIndex + 1; i < examQuestions.length; i++) {
        if (!localStorage.getItem(`answered_${i}`)) {
            showQuestion(i);
            localStorage.setItem('currentQuestionIndex', i.toString());
            return;
        }
    }
    
    // Jika tidak ada soal yang belum dijawab setelah currentIndex
    for (let i = 0; i < currentIndex; i++) {
        if (!localStorage.getItem(`answered_${i}`)) {
            showQuestion(i);
            localStorage.setItem('currentQuestionIndex', i.toString());
            return;
        }
    }
    
    // Jika semua soal sudah dijawab
    alert('Semua soal sudah dijawab!');
});

// Event listener untuk tombol selesaikan ujian
document.getElementById('finishExamBtn').addEventListener('click', function() {
    if (confirm('Apakah Anda yakin ingin menyelesaikan ujian sekarang? Soal yang belum dijawab akan dianggap salah.')) {
        finishExam();
    }
});

// Fungsi untuk memuat soal contoh (default)
function loadSampleQuestions() {
    const sampleQuestions = [
        {
            id: "1",
            category: "agama",
            question: "Siapakah nabi terakhir dalam Islam?",
            options: {
                A: "Nabi Musa",
                B: "Nabi Isa",
                C: "Nabi Muhammad",
                D: "Nabi Ibrahim",
                E: "Nabi Nuh"
            },
            correctAnswer: "C",
            explanation: "Nabi Muhammad SAW adalah nabi terakhir yang diutus Allah SWT, sebagaimana disebutkan dalam Al-Qur'an surah Al-Ahzab ayat 40."
        },
        {
            id: "2",
            category: "ppkn",
            question: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea ke...",
            options: {
                A: "1",
                B: "2",
                C: "3",
                D: "4",
                E: "Tidak tercantum dalam Pembukaan UUD 1945"
            },
            correctAnswer: "D",
            explanation: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat."
        },
        {
            id: "3",
            category: "sejarah",
            question: "Kapan proklamasi kemerdekaan Indonesia dibacakan?",
            options: {
                A: "16 Agustus 1945",
                B: "17 Agustus 1945",
                C: "18 Agustus 1945",
                D: "19 Agustus 1945",
                E: "20 Agustus 1945"
            },
            correctAnswer: "B",
            explanation: "Proklamasi kemerdekaan Indonesia dibacakan oleh Soekarno-Hatta pada tanggal 17 Agustus 1945."
        },
        {
            id: "4",
            category: "ipa",
            question: "Planet terdekat dari matahari adalah...",
            options: {
                A: "Venus",
                B: "Bumi",
                C: "Mars",
                D: "Merkurius",
                E: "Jupiter"
            },
            correctAnswer: "D",
            explanation: "Merkurius adalah planet terdekat dari matahari dalam tata surya kita."
        },
        {
            id: "5",
            category: "ips",
            question: "Apa mata uang resmi Jepang?",
            options: {
                A: "Dolar",
                B: "Euro",
                C: "Yuan",
                D: "Yen",
                E: "Won"
            },
            correctAnswer: "D",
            explanation: "Mata uang resmi Jepang adalah Yen (¥)."
        },
        {
            id: "6",
            category: "matematika",
            question: "Berapakah hasil dari 7 × 8?",
            options: {
                A: "48",
                B: "54",
                C: "56",
                D: "64",
                E: "72"
            },
            correctAnswer: "C",
            explanation: "Hasil dari 7 dikali 8 adalah 56."
        },
        {
            id: "7",
            category: "bahasa_indonesia",
            question: "Kata 'membaca' termasuk dalam jenis kata apa?",
            options: {
                A: "Kata benda",
                B: "Kata sifat",
                C: "Kata kerja",
                D: "Kata ganti",
                E: "Kata keterangan"
            },
            correctAnswer: "C",
            explanation: "Kata 'membaca' termasuk dalam jenis kata kerja karena menunjukkan suatu aktivitas."
        },
        {
            id: "8",
            category: "bahasa_inggris",
            question: "What is the English word for 'buku'?",
            options: {
                A: "Pen",
                B: "Book",
                C: "Table",
                D: "Chair",
                E: "Door"
            },
            correctAnswer: "B",
            explanation: "The English word for 'buku' is 'book'."
        },
        {
            id: "9",
            category: "materi_extra",
            question: "Apa nama ibukota Provinsi Jawa Timur?",
            options: {
                A: "Semarang",
                B: "Surabaya",
                C: "Malang",
                D: "Bandung",
                E: "Yogyakarta"
            },
            correctAnswer: "B",
            explanation: "Ibukota Provinsi Jawa Timur adalah Surabaya."
        },
        {
            id: "10",
            category: "materi_khusus",
            question: "Apa nama organisasi yang mengembangkan aplikasi ini?",
            options: {
                A: "NU",
                B: "Pergunu",
                C: "GP Ansor",
                D: "IPNU",
                E: "IPPNU"
            },
            correctAnswer: "B",
            explanation: "Aplikasi ini dikembangkan oleh Pergunu (Pergerakan Guru Nahdlatul Ulama) Situbondo."
        },
        {
            id: "11",
            category: "ujian_logika",
            question: "Jika semua manusia adalah makhluk hidup, dan Budi adalah manusia, maka...",
            options: {
                A: "Budi adalah makhluk hidup",
                B: "Budi bukan makhluk hidup",
                C: "Semua makhluk hidup adalah Budi",
                D: "Tidak bisa disimpulkan",
                E: "Hanya Budi yang makhluk hidup"
            },
            correctAnswer: "A",
            explanation: "Berdasarkan premis yang diberikan, jika semua manusia adalah makhluk hidup dan Budi adalah manusia, maka Budi adalah makhluk hidup."
        },
        {
            id: "12",
            category: "ujian_cpns",
            question: "Menurut UUD 1945, kekuasaan yudikatif dilaksanakan oleh...",
            options: {
                A: "Presiden",
                B: "DPR",
                C: "MA dan MK",
                D: "BPK",
                E: "KPK"
            },
            correctAnswer: "C",
            explanation: "Menurut UUD 1945 Pasal 24, kekuasaan kehakiman atau yudikatif dilaksanakan oleh Mahkamah Agung (MA) dan Mahkamah Konstitusi (MK)."
        }
    ];

    // Simpan ke localStorage jika belum ada
    if (!localStorage.getItem('questionBank')) {
        localStorage.setItem('questionBank', JSON.stringify(sampleQuestions));
    }
}

// Panggil fungsi untuk memuat soal contoh saat pertama kali
loadSampleQuestions();
