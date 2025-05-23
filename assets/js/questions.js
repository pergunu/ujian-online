// Sample questions data
const questions = [
    // Pelajar - AGAMA - SD
    {
        id: 1,
        type: 'pelajar',
        category: 'agama',
        grade: 'sd',
        text: 'Apa nama kitab suci umat Islam?',
        options: {
            a: 'Injil',
            b: 'Taurat',
            c: 'Al-Quran',
            d: 'Zabur',
            e: 'Weda'
        },
        correctAnswer: 'c',
        explanation: 'Kitab suci umat Islam adalah Al-Quran yang diturunkan kepada Nabi Muhammad SAW.'
    },
    {
        id: 2,
        type: 'pelajar',
        category: 'agama',
        grade: 'sd',
        text: 'Berapa jumlah Rukun Islam?',
        options: {
            a: '3',
            b: '4',
            c: '5',
            d: '6',
            e: '7'
        },
        correctAnswer: 'c',
        explanation: 'Rukun Islam ada 5 yaitu: Syahadat, Shalat, Zakat, Puasa, dan Haji.'
    },
    
    // Pelajar - PPKN - SD
    {
        id: 3,
        type: 'pelajar',
        category: 'ppkn',
        grade: 'sd',
        text: 'Lambang negara Indonesia adalah...',
        options: {
            a: 'Garuda Pancasila',
            b: 'Burung Elang',
            c: 'Harimau',
            d: 'Komodo',
            e: 'Badak'
        },
        correctAnswer: 'a',
        explanation: 'Lambang negara Indonesia adalah Garuda Pancasila dengan semboyan Bhinneka Tunggal Ika.'
    },
    
    // Pelajar - IPA - SD
    {
        id: 4,
        type: 'pelajar',
        category: 'ipa',
        grade: 'sd',
        text: 'Proses tumbuhan membuat makanan disebut...',
        options: {
            a: 'Respirasi',
            b: 'Fotosintesis',
            c: 'Evaporasi',
            d: 'Transpirasi',
            e: 'Digesti'
        },
        correctAnswer: 'b',
        explanation: 'Fotosintesis adalah proses tumbuhan membuat makanan menggunakan cahaya matahari, air, dan karbon dioksida.'
    },
    
    // Pelajar - MATEMATIKA - SD
    {
        id: 5,
        type: 'pelajar',
        category: 'matematika',
        grade: 'sd',
        text: 'Hasil dari 25 × 4 adalah...',
        options: {
            a: '50',
            b: '75',
            c: '100',
            d: '125',
            e: '150'
        },
        correctAnswer: 'c',
        explanation: '25 dikali 4 sama dengan 100.'
    },
    
    // Pelajar - BAHASA INDONESIA - SD
    {
        id: 6,
        type: 'pelajar',
        category: 'bahasa-indonesia',
        grade: 'sd',
        text: 'Kata tanya yang digunakan untuk menanyakan alasan adalah...',
        options: {
            a: 'Apa',
            b: 'Siapa',
            c: 'Kapan',
            d: 'Mengapa',
            e: 'Bagaimana'
        },
        correctAnswer: 'd',
        explanation: 'Kata tanya "mengapa" digunakan untuk menanyakan alasan atau sebab sesuatu terjadi.'
    },
    
    // Pelajar - AGAMA - SMP
    {
        id: 7,
        type: 'pelajar',
        category: 'agama',
        grade: 'smp',
        text: 'Nabi yang menerima kitab Taurat adalah...',
        options: {
            a: 'Nabi Musa AS',
            b: 'Nabi Isa AS',
            c: 'Nabi Daud AS',
            d: 'Nabi Muhammad SAW',
            e: 'Nabi Ibrahim AS'
        },
        correctAnswer: 'a',
        explanation: 'Kitab Taurat diturunkan kepada Nabi Musa AS.'
    },
    
    // Pelajar - SEJARAH - SMP
    {
        id: 8,
        type: 'pelajar',
        category: 'sejarah',
        grade: 'smp',
        text: 'Tokoh yang dikenal sebagai Bapak Proklamator Indonesia adalah...',
        options: {
            a: 'Soekarno dan Hatta',
            b: 'Soeharto dan Habibie',
            c: 'Sjafruddin Prawiranegara dan Tan Malaka',
            d: 'Sudirman dan Gatot Subroto',
            e: 'Diponegoro dan Imam Bonjol'
        },
        correctAnswer: 'a',
        explanation: 'Soekarno dan Hatta adalah tokoh yang memproklamasikan kemerdekaan Indonesia pada 17 Agustus 1945.'
    },
    
    // Pelajar - IPA - SMP
    {
        id: 9,
        type: 'pelajar',
        category: 'ipa',
        grade: 'smp',
        text: 'Organel sel yang berfungsi sebagai tempat berlangsungnya fotosintesis adalah...',
        options: {
            a: 'Mitokondria',
            b: 'Ribosom',
            c: 'Kloroplas',
            d: 'Vakuola',
            e: 'Nukleus'
        },
        correctAnswer: 'c',
        explanation: 'Kloroplas adalah organel sel tumbuhan yang mengandung klorofil untuk proses fotosintesis.'
    },
    
    // Pelajar - MATEMATIKA - SMP
    {
        id: 10,
        type: 'pelajar',
        category: 'matematika',
        grade: 'smp',
        text: 'Nilai x dari persamaan 2x + 5 = 15 adalah...',
        options: {
            a: '2',
            b: '3',
            c: '5',
            d: '7',
            e: '10'
        },
        correctAnswer: 'c',
        explanation: '2x + 5 = 15 → 2x = 15 - 5 → 2x = 10 → x = 5'
    },
    
    // Pelajar - AGAMA - SMA
    {
        id: 11,
        type: 'pelajar',
        category: 'agama',
        grade: 'sma',
        text: 'Hukum melaksanakan shalat Jumat bagi laki-laki muslim adalah...',
        options: {
            a: 'Sunnah',
            b: 'Fardhu Kifayah',
            c: 'Fardhu Ain',
            d: 'Mubah',
            e: 'Makruh'
        },
        correctAnswer: 'c',
        explanation: 'Shalat Jumat hukumnya fardhu ain (wajib) bagi laki-laki muslim yang telah memenuhi syarat.'
    },
    
    // Pelajar - PPKN - SMA
    {
        id: 12,
        type: 'pelajar',
        category: 'ppkn',
        grade: 'sma',
        text: 'Lembaga negara yang berwenang mengubah UUD 1945 adalah...',
        options: {
            a: 'Presiden',
            b: 'DPR',
            c: 'MPR',
            d: 'MA',
            e: 'MK'
        },
        correctAnswer: 'c',
        explanation: 'Menurut Pasal 3 UUD 1945, MPR berwenang mengubah dan menetapkan UUD.'
    },
    
    // Pelajar - BAHASA INGGRIS - SMA
    {
        id: 13,
        type: 'pelajar',
        category: 'bahasa-inggris',
        grade: 'sma',
        text: 'What is the past tense of "go"?',
        options: {
            a: 'goed',
            b: 'gone',
            c: 'went',
            d: 'goes',
            e: 'going'
        },
        correctAnswer: 'c',
        explanation: 'Bentuk past tense dari "go" adalah "went".'
    },
    
    // Pelajar - MATEMATIKA - SMA
    {
        id: 14,
        type: 'pelajar',
        category: 'matematika',
        grade: 'sma',
        text: 'Turunan pertama dari fungsi f(x) = 3x² + 2x - 5 adalah...',
        options: {
            a: '3x + 2',
            b: '6x + 2',
            c: '6x² + 2',
            d: '3x² + 2',
            e: '6x - 5'
        },
        correctAnswer: 'b',
        explanation: 'Turunan dari 3x² adalah 6x, turunan dari 2x adalah 2, dan turunan dari konstanta (-5) adalah 0. Jadi f\'(x) = 6x + 2.'
    },
    
    // Umum - Tes IQ
    {
        id: 15,
        type: 'umum',
        category: 'tes-iq',
        text: 'Jika 2, 4, 8, 16, ..., maka angka selanjutnya adalah...',
        options: {
            a: '18',
            b: '20',
            c: '24',
            d: '32',
            e: '64'
        },
        correctAnswer: 'd',
        explanation: 'Pola ini adalah perkalian 2 setiap angka: 2×2=4, 4×2=8, 8×2=16, 16×2=32.'
    },
    {
        id: 16,
        type: 'umum',
        category: 'tes-iq',
        text: 'Sinonim dari "kredibel" adalah...',
        options: {
            a: 'Ragu',
            b: 'Percaya',
            c: 'Dapat dipercaya',
            d: 'Tidak jelas',
            e: 'Samar'
        },
        correctAnswer: 'c',
        explanation: 'Kredibel berarti dapat dipercaya atau diandalkan.'
    },
    
    // Umum - Ujian CPNS/P3K
    {
        id: 17,
        type: 'umum',
        category: 'cpns',
        text: 'Pancasila sebagai dasar negara tercantum dalam...',
        options: {
            a: 'Pembukaan UUD 1945',
            b: 'Batang Tubuh UUD 1945',
            c: 'Penjelasan UUD 1945',
            d: 'Keputusan Presiden',
            e: 'Ketetapan MPR'
        },
        correctAnswer: 'a',
        explanation: 'Pancasila sebagai dasar negara tercantum dalam alinea keempat Pembukaan UUD 1945.'
    },
    {
        id: 18,
        type: 'umum',
        category: 'cpns',
        text: 'Sistem pemerintahan Indonesia berdasarkan UUD 1945 adalah...',
        options: {
            a: 'Presidensial',
            b: 'Parlementer',
            c: 'Monarki',
            d: 'Federal',
            e: 'Komunis'
        },
        correctAnswer: 'a',
        explanation: 'Sistem pemerintahan Indonesia adalah presidensial dimana presiden sebagai kepala negara dan kepala pemerintahan.'
    },
    
    // Materi Extra
    {
        id: 19,
        type: 'pelajar',
        category: 'materi-extra',
        grade: 'sma',
        text: 'Penemu teori relativitas adalah...',
        options: {
            a: 'Isaac Newton',
            b: 'Albert Einstein',
            c: 'Thomas Edison',
            d: 'Galileo Galilei',
            e: 'Nikola Tesla'
        },
        correctAnswer: 'b',
        explanation: 'Albert Einstein adalah fisikawan yang mengemukakan teori relativitas.'
    },
    
    // Materi Khusus
    {
        id: 20,
        type: 'pelajar',
        category: 'materi-khusus',
        grade: 'smp',
        text: 'Ibukota provinsi Jawa Timur adalah...',
        options: {
            a: 'Surabaya',
            b: 'Malang',
            c: 'Sidoarjo',
            d: 'Kediri',
            e: 'Madiun'
        },
        correctAnswer: 'a',
        explanation: 'Ibukota provinsi Jawa Timur adalah Surabaya.'
    }
];

// Load questions (simulated API call)
function loadQuestions() {
    // In a real app, this would be an API call
    console.log(`${questions.length} questions loaded`);
    
    // Initialize localStorage settings if not exists
    if (!localStorage.getItem('examTimer')) {
        localStorage.setItem('examTimer', '120');
    }
    if (!localStorage.getItem('randomizeQuestions')) {
        localStorage.setItem('randomizeQuestions', 'true');
    }
    if (!localStorage.getItem('questionCount')) {
        localStorage.setItem('questionCount', '10');
    }
    if (!localStorage.getItem('pointsPerQuestion')) {
        localStorage.setItem('pointsPerQuestion', '10');
    }
    if (!localStorage.getItem('motivationText')) {
        localStorage.setItem('motivationText', 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.');
    }
}
