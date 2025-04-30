const Database = {
    questions: {},
    
    init: function() {
        // Inisialisasi database dengan contoh soal
        // Dalam implementasi nyata, ini akan diisi dengan data dari file JSON atau API
        this.questions = {
            umum: {
                sd: this.generateSampleQuestions('umum', 'sd', 50),
                smp: this.generateSampleQuestions('umum', 'smp', 50),
                sma: this.generateSampleQuestions('umum', 'sma', 50),
                umum: this.generateSampleQuestions('umum', 'umum', 50)
            },
            ipa: {
                sd: this.generateSampleQuestions('ipa', 'sd', 50),
                smp: this.generateSampleQuestions('ipa', 'smp', 50),
                sma: this.generateSampleQuestions('ipa', 'sma', 50)
            },
            ips: {
                sd: this.generateSampleQuestions('ips', 'sd', 50),
                smp: this.generateSampleQuestions('ips', 'smp', 50),
                sma: this.generateSampleQuestions('ips', 'sma', 50)
            },
            matematika: {
                sd: this.generateSampleQuestions('matematika', 'sd', 50),
                smp: this.generateSampleQuestions('matematika', 'smp', 50),
                sma: this.generateSampleQuestions('matematika', 'sma', 50)
            },
            bahasa_indonesia: {
                sd: this.generateSampleQuestions('bahasa_indonesia', 'sd', 50),
                smp: this.generateSampleQuestions('bahasa_indonesia', 'smp', 50),
                sma: this.generateSampleQuestions('bahasa_indonesia', 'sma', 50)
            },
            bahasa_inggris: {
                sd: this.generateSampleQuestions('bahasa_inggris', 'sd', 50),
                smp: this.generateSampleQuestions('bahasa_inggris', 'smp', 50),
                sma: this.generateSampleQuestions('bahasa_inggris', 'sma', 50)
            },
            sejarah: {
                smp: this.generateSampleQuestions('sejarah', 'smp', 50),
                sma: this.generateSampleQuestions('sejarah', 'sma', 50)
            },
            ppkn: {
                sd: this.generateSampleQuestions('ppkn', 'sd', 50),
                smp: this.generateSampleQuestions('ppkn', 'smp', 50),
                sma: this.generateSampleQuestions('ppkn', 'sma', 50)
            },
            agama: {
                sd: this.generateSampleQuestions('agama', 'sd', 50),
                smp: this.generateSampleQuestions('agama', 'smp', 50),
                sma: this.generateSampleQuestions('agama', 'sma', 50)
            },
            logika: {
                umum: this.generateSampleQuestions('logika', 'umum', 50)
            },
            lagu: {
                umum: this.generateSampleQuestions('lagu', 'umum', 50)
            },
            pribahasa: {
                umum: this.generateSampleQuestions('pribahasa', 'umum', 50)
            }
        };
        
        // Load questions from JSON files (in a real implementation)
        // this.loadQuestionsFromJSON();
    },
    
    generateSampleQuestions: function(category, level, count) {
        const questions = [];
        const categories = {
            umum: 'Umum',
            ipa: 'IPA',
            ips: 'IPS',
            matematika: 'Matematika',
            bahasa_indonesia: 'Bahasa Indonesia',
            bahasa_inggris: 'Bahasa Inggris',
            sejarah: 'Sejarah',
            ppkn: 'PPKN',
            agama: 'Agama',
            logika: 'Tebak Logika & Jenaka',
            lagu: 'Sambung Lagu',
            pribahasa: 'Sambung Pribahasa'
        };
        
        const levels = {
            sd: 'SD',
            smp: 'SMP',
            sma: 'SMA',
            umum: 'Umum'
        };
        
        for (let i = 1; i <= count; i++) {
            questions.push({
                id: `${category}-${level}-${i}`,
                category: categories[category],
                type: category,
                level: levels[level],
                difficulty: this.getRandomDifficulty(),
                question: `Ini adalah contoh pertanyaan ${i} untuk kategori ${categories[category]} tingkat ${levels[level]}. Pertanyaan ini dirancang untuk menguji pengetahuan Anda dalam bidang ini.`,
                options: [
                    { text: 'Pilihan A', description: 'Ini adalah deskripsi untuk pilihan A yang menjelaskan mengapa ini mungkin benar atau salah.' },
                    { text: 'Pilihan B', description: 'Ini adalah deskripsi untuk pilihan B yang menjelaskan mengapa ini mungkin benar atau salah.' },
                    { text: 'Pilihan C', description: 'Ini adalah deskripsi untuk pilihan C yang menjelaskan mengapa ini mungkin benar atau salah.' },
                    { text: 'Pilihan D', description: 'Ini adalah deskripsi untuk pilihan D yang menjelaskan mengapa ini mungkin benar atau salah.' }
                ],
                correctAnswer: Math.floor(Math.random() * 4), // Random correct answer for sample
                explanation: `Ini adalah penjelasan lengkap untuk jawaban yang benar pada pertanyaan ${i}. Penjelasan ini mencakup alasan mengapa jawaban tersebut benar dan mengapa pilihan lainnya salah.`
            });
        }
        
        return questions;
    },
    
    getRandomDifficulty: function() {
        const difficulties = ['mudah', 'sedang', 'sulit'];
        return difficulties[Math.floor(Math.random() * difficulties.length)];
    },
    
    getQuestions: function(category, level) {
        return this.questions[category]?.[level] || [];
    },
    
    getSimilarQuestion: function(category, level) {
        const questions = this.getQuestions(category, level);
        return questions[Math.floor(Math.random() * questions.length)];
    },
    
    loadQuestionsFromJSON: async function() {
        try {
            // Dalam implementasi nyata, ini akan memuat pertanyaan dari file JSON
            // Contoh:
            // const response = await fetch('data/questions/umum/sd.json');
            // this.questions.umum.sd = await response.json();
        } catch (error) {
            console.error('Error loading questions:', error);
        }
    },
    
    addDailyQuestions: function() {
        // Implementasi untuk menambahkan soal baru setiap hari
        // Ini akan memanggil API atau memproses file baru
        console.log('Menambahkan soal baru hari ini...');
    }
};

// Jalankan fungsi untuk menambahkan soal baru setiap hari
setInterval(Database.addDailyQuestions, 24 * 60 * 60 * 1000);
