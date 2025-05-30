// Questions Data and Functions

// Sample questions data
let examQuestions = [
    // AGAMA
    {
        question: "Berapa jumlah Rukun Iman?",
        optionA: "4",
        optionB: "5",
        optionC: "6",
        optionD: "7",
        correctAnswer: "C",
        explanation: "Rukun Iman ada 6 yaitu: 1. Iman kepada Allah, 2. Iman kepada Malaikat, 3. Iman kepada Kitab-kitab, 4. Iman kepada Rasul, 5. Iman kepada Hari Kiamat, 6. Iman kepada Qada dan Qadar.",
        category: "AGAMA",
        difficulty: "easy"
    },
    
    // PPKN
    {
        question: "Pancasila sebagai dasar negara tercantum dalam pembukaan UUD 1945 pada alinea ke...",
        optionA: "1",
        optionB: "2",
        optionC: "3",
        optionD: "4",
        correctAnswer: "D",
        explanation: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat.",
        category: "PPKN",
        difficulty: "easy"
    },
    
    // SEJARAH
    {
        question: "Proklamasi Kemerdekaan Indonesia dilaksanakan pada tanggal...",
        optionA: "16 Agustus 1945",
        optionB: "17 Agustus 1945",
        optionC: "18 Agustus 1945",
        optionD: "19 Agustus 1945",
        correctAnswer: "B",
        explanation: "Proklamasi Kemerdekaan Indonesia dibacakan oleh Soekarno-Hatta pada 17 Agustus 1945.",
        category: "SEJARAH",
        difficulty: "easy"
    },
    
    // IPA
    {
        question: "Planet terdekat dari matahari adalah...",
        optionA: "Venus",
        optionB: "Bumi",
        optionC: "Mars",
        optionD: "Merkurius",
        correctAnswer: "D",
        explanation: "Merkurius adalah planet terdekat dari matahari dalam tata surya kita.",
        category: "IPA",
        difficulty: "easy"
    },
    
    // IPS
    {
        question: "Ibukota provinsi Jawa Timur adalah...",
        optionA: "Surabaya",
        optionB: "Malang",
        optionC: "Sidoarjo",
        optionD: "Kediri",
        correctAnswer: "A",
        explanation: "Ibukota provinsi Jawa Timur adalah Surabaya.",
        category: "IPS",
        difficulty: "easy"
    },
    
    // MATEMATIKA
    {
        question: "Hasil dari 7 × 8 adalah...",
        optionA: "48",
        optionB: "54",
        optionC: "56",
        optionD: "64",
        correctAnswer: "C",
        explanation: "7 × 8 = 56",
        category: "MATEMATIKA",
        difficulty: "easy"
    },
    
    // BAHASA INDONESIA
    {
        question: "Kata baku dari 'apotik' adalah...",
        optionA: "Apotik",
        optionB: "Apotek",
        optionC: "Appotik",
        optionD: "Appotek",
        correctAnswer: "B",
        explanation: "Penulisan yang baku menurut KBBI adalah 'apotek'.",
        category: "BAHASA_INDONESIA",
        difficulty: "easy"
    },
    
    // BAHASA INGGRIS
    {
        question: "What is the English word for 'buku'?",
        optionA: "Book",
        optionB: "Table",
        optionC: "Chair",
        optionD: "Pen",
        correctAnswer: "A",
        explanation: "The English word for 'buku' is 'book'.",
        category: "BAHASA_INGGRIS",
        difficulty: "easy"
    },
    
    // MATERI EXTRA
    {
        question: "Lambang unsur kimia untuk Emas adalah...",
        optionA: "Ag",
        optionB: "Au",
        optionC: "Fe",
        optionD: "Cu",
        correctAnswer: "B",
        explanation: "Lambang unsur kimia untuk Emas adalah Au (Aurum).",
        category: "MATERI_EXTRA",
        difficulty: "medium"
    },
    
    // MATERI KHUSUS
    {
        question: "Pahlawan nasional yang dikenal sebagai 'Bapak Pendidikan Nasional' adalah...",
        optionA: "Ki Hajar Dewantara",
        optionB: "R.A. Kartini",
        optionC: "Diponegoro",
        optionD: "Cut Nyak Dien",
        correctAnswer: "A",
        explanation: "Ki Hajar Dewantara dikenal sebagai 'Bapak Pendidikan Nasional' dan mendirikan Taman Siswa.",
        category: "MATERI_KHUSUS",
        difficulty: "easy"
    },
    
    // UJIAN LOGIKA
    {
        question: "Jika semua A adalah B dan semua B adalah C, maka...",
        optionA: "Semua A adalah C",
        optionB: "Semua C adalah A",
        optionC: "Beberapa A bukan C",
        optionD: "Beberapa C bukan B",
        correctAnswer: "A",
        explanation: "Berdasarkan silogisme, jika semua A adalah B dan semua B adalah C, maka semua A adalah C.",
        category: "UJIAN_LOGIKA",
        difficulty: "medium"
    },
    
    // UJIAN CPNS
    {
        question: "Negara Indonesia adalah negara hukum, hal ini tercantum dalam UUD 1945 pasal...",
        optionA: "1 ayat 1",
        optionB: "1 ayat 2",
        optionC: "1 ayat 3",
        optionD: "1 ayat 4",
        correctAnswer: "C",
        explanation: "Pasal 1 ayat 3 UUD 1945 menyatakan 'Negara Indonesia adalah negara hukum'.",
        category: "UJIAN_CPNS",
        difficulty: "hard"
    }
];

// Participants data
let participants = [];

// Get questions by category
function getQuestionsForCategory(category) {
    return examQuestions.filter(q => q.category === category);
}

// Get all categories
function getAllCategories() {
    const categories = new Set();
    examQuestions.forEach(q => categories.add(q.category));
    return Array.from(categories);
}

// Add new question
function addQuestion(questionData) {
    examQuestions.push(questionData);
    saveQuestions();
    return true;
}

// Update question
function updateQuestion(id, questionData) {
    if(id >= 0 && id < examQuestions.length) {
        examQuestions[id] = questionData;
        saveQuestions();
        return true;
    }
    return false;
}

// Delete question
function deleteQuestion(id) {
    if(id >= 0 && id < examQuestions.length) {
        examQuestions.splice(id, 1);
        saveQuestions();
        return true;
    }
    return false;
}

// Save questions to localStorage
function saveQuestions() {
    localStorage.setItem('examQuestions', JSON.stringify(examQuestions));
}

// Load questions from localStorage
function loadQuestions() {
    const savedQuestions = localStorage.getItem('examQuestions');
    if(savedQuestions) {
        examQuestions = JSON.parse(savedQuestions);
    }
}

// Add participant result
function addParticipantResult(participantData) {
    participants.push(participantData);
    saveParticipants();
}

// Get all participants
function getAllParticipants() {
    return participants;
}

// Save participants to localStorage
function saveParticipants() {
    localStorage.setItem('participants', JSON.stringify(participants));
}

// Load participants from localStorage
function loadParticipants() {
    const savedParticipants = localStorage.getItem('participants');
    if(savedParticipants) {
        participants = JSON.parse(savedParticipants);
    }
}

// Shuffle array (for randomizing questions)
function shuffleArray(array) {
    const newArray = [...array];
    for(let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Initialize questions data
function initQuestions() {
    loadQuestions();
    loadParticipants();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initQuestions);
