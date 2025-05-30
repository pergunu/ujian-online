// Sample questions for all categories
function getQuestionsByCategoryAndLevel(category, level) {
    // In a real app, you would fetch these from a database
    // For demo purposes, we'll return sample questions
    
    const allQuestions = {
        agama: [
            {
                text: "Berapakah jumlah Rukun Iman dalam Islam?",
                options: {
                    A: "4",
                    B: "5",
                    C: "6",
                    D: "7",
                    E: "8"
                },
                correctAnswer: "C",
                explanation: "Rukun Iman dalam Islam ada 6, yaitu: Iman kepada Allah, Malaikat-malaikat-Nya, Kitab-kitab-Nya, Rasul-rasul-Nya, Hari Akhir, dan Qada dan Qadar.",
                point: 1
            }
        ],
        ppkn: [
            {
                text: "Pancasila sebagai dasar negara Indonesia ditetapkan pada tanggal?",
                options: {
                    A: "17 Agustus 1945",
                    B: "18 Agustus 1945",
                    C: "1 Juni 1945",
                    D: "22 Juni 1945",
                    E: "29 Mei 1945"
                },
                correctAnswer: "B",
                explanation: "Pancasila ditetapkan sebagai dasar negara pada tanggal 18 Agustus 1945 oleh PPKI, sehari setelah proklamasi kemerdekaan.",
                point: 1
            }
        ],
        sejarah: [
            {
                text: "Siapakah yang membacakan teks proklamasi kemerdekaan Indonesia?",
                options: {
                    A: "Mohammad Hatta",
                    B: "Soekarno",
                    C: "Achmad Soebardjo",
                    D: "Sutan Syahrir",
                    E: "Sayuti Melik"
                },
                correctAnswer: "B",
                explanation: "Ir. Soekarno membacakan teks proklamasi kemerdekaan Indonesia pada tanggal 17 Agustus 1945 di Jalan Pegangsaan Timur 56, Jakarta.",
                point: 1
            }
        ],
        ipa: [
            {
                text: "Planet terdekat dari matahari dalam tata surya kita adalah?",
                options: {
                    A: "Venus",
                    B: "Bumi",
                    C: "Mars",
                    D: "Merkurius",
                    E: "Jupiter"
                },
                correctAnswer: "D",
                explanation: "Merkurius adalah planet terdekat dari matahari, diikuti oleh Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, dan Neptunus.",
                point: 1
            }
        ],
        ips: [
            {
                text: "Aktivitas ekonomi yang berkaitan dengan pengolahan bahan mentah menjadi barang jadi disebut?",
                options: {
                    A: "Pertanian",
                    B: "Perdagangan",
                    C: "Industri",
                    D: "Jasa",
                    E: "Pertambangan"
                },
                correctAnswer: "C",
                explanation: "Industri adalah kegiatan ekonomi yang mengolah bahan mentah menjadi barang jadi atau setengah jadi yang memiliki nilai tambah.",
                point: 1
            }
        ],
        matematika: [
            {
                text: "Hasil dari 7 × 8 adalah?",
                options: {
                    A: "48",
                    B: "54",
                    C: "56",
                    D: "58",
                    E: "64"
                },
                correctAnswer: "C",
                explanation: "Perkalian 7 × 8 menghasilkan 56. Ini adalah salah satu fakta dasar perkalian yang penting untuk diingat.",
                point: 1
            }
        ],
        "bahasa-indonesia": [
            {
                text: "Kata yang tepat untuk melengkapi kalimat 'Saya ___ buku di perpustakaan' adalah?",
                options: {
                    A: "baca",
                    B: "membaca",
                    C: "dibaca",
                    D: "terbaca",
                    E: "pembaca"
                },
                correctAnswer: "B",
                explanation: "Kata kerja 'membaca' adalah bentuk aktif yang tepat untuk subjek 'saya' dalam kalimat tersebut.",
                point: 1
            }
        ],
        "bahasa-inggris": [
            {
                text: "What is the English word for 'buku'?",
                options: {
                    A: "Pen",
                    B: "Book",
                    C: "Table",
                    D: "Chair",
                    E: "Bag"
                },
                correctAnswer: "B",
                explanation: "The English translation for 'buku' is 'book'.",
                point: 1
            }
        ],
        "materi-extra": [
            {
                text: "Dalam seni rupa, teknik melukis dengan menggunakan titik-titik kecil disebut?",
                options: {
                    A: "Aquarel",
                    B: "Plakat",
                    C: "Pointilis",
                    D: "Tempra",
                    E: "Spray"
                },
                correctAnswer: "C",
                explanation: "Pointilisme adalah teknik melukis di mana gambar dibentuk dari titik-titik kecil warna.",
                point: 1
            }
        ],
        "materi-khusus": [
            {
                text: "Dalam permainan catur, bidak yang hanya bisa bergerak diagonal adalah?",
                options: {
                    A: "Pion",
                    B: "Benteng",
                    C: "Kuda",
                    D: "Menteri",
                    E: "Gajah"
                },
                correctAnswer: "E",
                explanation: "Gajah dalam catur hanya bisa bergerak secara diagonal, tidak seperti bidak lainnya yang memiliki pola gerak berbeda.",
                point: 1
            }
        ],
        "ujian-logika": [
            {
                text: "Jika semua manusia adalah makhluk hidup, dan Socrates adalah manusia, maka:",
                options: {
                    A: "Socrates adalah makhluk hidup",
                    B: "Socrates bukan makhluk hidup",
                    C: "Semua makhluk hidup adalah Socrates",
                    D: "Tidak ada hubungan antara Socrates dan makhluk hidup",
                    E: "Hanya Socrates yang makhluk hidup"
                },
                correctAnswer: "A",
                explanation: "Ini adalah contoh silogisme sederhana. Jika premis pertama dan kedua benar, maka kesimpulan yang benar adalah Socrates adalah makhluk hidup.",
                point: 1
            }
        ],
        "ujian-cpns": [
            {
                text: "Menurut UUD 1945, kekuasaan kehakiman dilakukan oleh?",
                options: {
                    A: "Mahkamah Agung",
                    B: "Mahkamah Konstitusi",
                    C: "Komisi Yudisial",
                    D: "Semua jawaban benar",
                    E: "Hanya A dan B benar"
                },
                correctAnswer: "D",
                explanation: "Berdasarkan Pasal 24 UUD 1945, kekuasaan kehakiman dilakukan oleh Mahkamah Agung dan badan peradilan di bawahnya, serta oleh Mahkamah Konstitusi.",
                point: 1
            }
        ]
    };
    
    // Filter questions by category and level (in a real app, you would also filter by level)
    return allQuestions[category] || [];
}

// Initialize sample questions in localStorage if not exists
function initializeSampleQuestions() {
    if (!localStorage.getItem('questions')) {
        const allQuestions = [];
        
        // Add questions from all categories
        for (const category in getQuestionsByCategoryAndLevel()) {
            allQuestions.push(...getQuestionsByCategoryAndLevel(category));
        }
        
        localStorage.setItem('questions', JSON.stringify(allQuestions));
    }
}

// Call this function when the admin panel is loaded
initializeSampleQuestions();
