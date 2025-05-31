// Sample questions for all categories
const questionsDatabase = {
    "AGAMA": [
        {
            question: "Berapakah jumlah Rukun Iman?",
            options: {
                A: "4",
                B: "5",
                C: "6",
                D: "7",
                E: "8"
            },
            correctAnswer: "C",
            explanation: "Rukun Iman ada 6 yaitu: 1. Iman kepada Allah, 2. Iman kepada Malaikat, 3. Iman kepada Kitab-kitab, 4. Iman kepada Rasul, 5. Iman kepada Hari Kiamat, 6. Iman kepada Qada dan Qadar"
        }
    ],
    "PPKN": [
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
            explanation: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat"
        }
    ],
    "SEJARAH": [
        {
            question: "Kapan proklamasi kemerdekaan Indonesia dibacakan?",
            options: {
                A: "16 Agustus 1945",
                B: "17 Agustus 1945",
                C: "18 Agustus 1945",
                D: "19 Agustus 1945",
                E: "20 Agustus 1945"
            },
            correctAnswer: "B",
            explanation: "Proklamasi kemerdekaan Indonesia dibacakan pada tanggal 17 Agustus 1945 oleh Soekarno-Hatta"
        }
    ],
    "IPA": [
        {
            question: "Planet terdekat dari matahari adalah?",
            options: {
                A: "Venus",
                B: "Bumi",
                C: "Mars",
                D: "Merkurius",
                E: "Jupiter"
            },
            correctAnswer: "D",
            explanation: "Merkurius adalah planet terdekat dari matahari dalam tata surya kita"
        }
    ],
    "IPS": [
        {
            question: "Apa mata uang resmi Jepang?",
            options: {
                A: "Dollar",
                B: "Euro",
                C: "Yen",
                D: "Pound",
                E: "Won"
            },
            correctAnswer: "C",
            explanation: "Mata uang resmi Jepang adalah Yen"
        }
    ],
    "MATEMATIKA": [
        {
            question: "Berapakah hasil dari 7 × 8?",
            options: {
                A: "48",
                B: "54",
                C: "56",
                D: "64",
                E: "72"
            },
            correctAnswer: "C",
            explanation: "7 × 8 = 56"
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
            explanation: "Sinonim dari 'bahagia' adalah 'senang'"
        }
    ],
    "BAHASA INGGRIS": [
        {
            question: "What is the meaning of 'book' in Indonesian?",
            options: {
                A: "Pensil",
                B: "Buku",
                C: "Meja",
                D: "Papan tulis",
                E: "Penghapus"
            },
            correctAnswer: "B",
            explanation: "'Book' in Indonesian means 'buku'"
        }
    ],
    "MATERI EXTRA": [
        {
            question: "Siapakah pencipta lagu 'Indonesia Raya'?",
            options: {
                A: "Ismail Marzuki",
                B: "W.R. Supratman",
                C: "C. Simanjuntak",
                D: "H. Mutahar",
                E: "Ibu Sud"
            },
            correctAnswer: "B",
            explanation: "Lagu 'Indonesia Raya' diciptakan oleh Wage Rudolf Supratman"
        }
    ],
    "MATERI KHUSUS": [
        {
            question: "Apa nama kitab suci agama Hindu?",
            options: {
                A: "Al-Quran",
                B: "Injil",
                C: "Wedha",
                D: "Tripitaka",
                E: "Talmud"
            },
            correctAnswer: "C",
            explanation: "Kitab suci agama Hindu adalah Wedha"
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
            explanation: "Jika semua A adalah B dan semua B adalah C, maka semua A adalah C"
        }
    ],
    "UJIAN CPNS/P3K": [
        {
            question: "Menurut UUD 1945, kekuasaan yudikatif dilaksanakan oleh:",
            options: {
                A: "Presiden",
                B: "DPR",
                C: "MA dan MK",
                D: "BPK",
                E: "MPR"
            },
            correctAnswer: "C",
            explanation: "Kekuasaan yudikatif menurut UUD 1945 dilaksanakan oleh Mahkamah Agung (MA) dan Mahkamah Konstitusi (MK)"
        }
    ]
};

// Function to get questions by category
function getQuestionsByCategory(category, count = 5) {
    if (!questionsDatabase[category]) return [];
    
    // Shuffle questions
    const shuffled = [...questionsDatabase[category]].sort(() => 0.5 - Math.random());
    
    // Return requested number of questions
    return shuffled.slice(0, count);
}

// Function to add a new question
function addQuestion(category, questionData) {
    if (!questionsDatabase[category]) {
        questionsDatabase[category] = [];
    }
    questionsDatabase[category].push(questionData);
    return true;
}

// Function to edit a question
function editQuestion(category, index, questionData) {
    if (!questionsDatabase[category] || !questionsDatabase[category][index]) {
        return false;
    }
    questionsDatabase[category][index] = questionData;
    return true;
}

// Function to get all categories
function getAllCategories() {
    return Object.keys(questionsDatabase);
}

// Export functions for use in other files
export {
    questionsDatabase,
    getQuestionsByCategory,
    addQuestion,
    editQuestion,
    getAllCategories
};
