const QuizEngine = {
    currentQuestionIndex: 0,
    questions: [],
    userAnswers: [],
    quizTimer: null,
    quizDuration: 60 * 60 * 1000, // 60 menit dalam milidetik
    quizStartTime: null,
    currentCategory: null,
    currentLevel: null,
    
    init: function() {
        // Inisialisasi database questions
        Database.init();
    },
    
    startQuiz: function(category) {
        this.currentCategory = category;
        this.currentLevel = this.determineLevel();
        this.loadQuestions();
        
        // Set timer
        this.quizStartTime = new Date().getTime();
        this.startTimer();
        
        // Inisialisasi array jawaban user
        this.userAnswers = new Array(this.questions.length).fill(null);
        
        // Tampilkan pertanyaan pertama
        this.displayQuestion(0);
    },
    
    determineLevel: function() {
        // Implementasi logika untuk menentukan level berdasarkan usia atau pilihan user
        // Ini adalah contoh sederhana
        const age = parseInt(UserManager.getUserData().age);
        
        if (age <= 12) return 'sd';
        if (age <= 15) return 'smp';
        if (age <= 18) return 'sma';
        return 'umum';
    },
    
    loadQuestions: function() {
        // Ambil pertanyaan dari database berdasarkan kategori dan level
        let categoryQuestions = [];
        
        if (this.currentCategory === 'umum') {
            categoryQuestions = Database.getQuestions('umum', this.currentLevel);
        } else if (this.currentCategory === 'pelajar') {
            // Untuk pelajar, kita bisa memilih subjek secara acak atau berdasarkan preferensi
            const subjects = ['ipa', 'ips', 'matematika', 'bahasa_indonesia', 'bahasa_inggris', 'sejarah', 'ppkn', 'agama'];
            const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
            categoryQuestions = Database.getQuestions(randomSubject, this.currentLevel);
        }
        
        // Acak urutan pertanyaan dan ambil 100 pertanyaan pertama
        this.questions = this.shuffleArray(categoryQuestions).slice(0, 100);
    },
    
    shuffleArray: function(array) {
        // Fisher-Yates shuffle algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    
    displayQuestion: function(index) {
        if (index >= this.questions.length) {
            this.finishQuiz();
            return;
        }
        
        this.currentQuestionIndex = index;
        const question = this.questions[index];
        
        // Update UI
        UIManager.updateQuestionCounter(index + 1, this.questions.length);
        UIManager.displayQuestion(question);
        
        // Tampilkan tombol "Selesaikan" jika pertanyaan terakhir
        if (index === this.questions.length - 1) {
            document.getElementById('btnFinish').style.display = 'block';
            document.getElementById('btnNext').style.display = 'none';
        } else {
            document.getElementById('btnFinish').style.display = 'none';
            document.getElementById('btnNext').style.display = 'block';
        }
    },
    
    startTimer: function() {
        // Hentikan timer sebelumnya jika ada
        if (this.quizTimer) clearInterval(this.quizTimer);
        
        this.quizTimer = setInterval(() => {
            const now = new Date().getTime();
            const elapsed = now - this.quizStartTime;
            const remaining = this.quizDuration - elapsed;
            
            if (remaining <= 0) {
                clearInterval(this.quizTimer);
                this.finishQuiz(true); // Timeout
                return;
            }
            
            // Update timer UI
            UIManager.updateTimer(remaining);
            
            // Beri peringatan jika waktu hampir habis
            if (remaining <= 5 * 60 * 1000) { // 5 menit tersisa
                UIManager.showTimeWarning();
            }
        }, 1000);
    },
    
    nextQuestion: function() {
        // Validasi jawaban terlebih dahulu
        const selectedOption = document.querySelector('.answer-option.selected');
        
        if (!selectedOption) {
            UIManager.showAlert('Silakan pilih jawaban terlebih dahulu!');
            return;
        }
        
        // Simpan jawaban user
        const answerIndex = parseInt(selectedOption.dataset.index);
        this.userAnswers[this.currentQuestionIndex] = answerIndex;
        
        // Lanjut ke pertanyaan berikutnya
        this.displayQuestion(this.currentQuestionIndex + 1);
    },
    
    resetQuestion: function() {
        // Tampilkan konfirmasi
        if (!confirm('Apakah Anda yakin ingin me-reset soal ini? Soal yang tidak dijawab akan dihitung sebagai salah.')) {
            return;
        }
        
        // Tandai sebagai tidak dijawab (null)
        this.userAnswers[this.currentQuestionIndex] = null;
        
        // Ambil pertanyaan baru dengan tipe yang sama
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const newQuestion = Database.getSimilarQuestion(currentQuestion.type, currentQuestion.level);
        
        // Ganti pertanyaan di array
        this.questions[this.currentQuestionIndex] = newQuestion;
        
        // Tampilkan pertanyaan baru
        this.displayQuestion(this.currentQuestionIndex);
    },
    
    finishQuiz: function(isTimeout = false) {
        // Hentikan timer
        clearInterval(this.quizTimer);
        
        // Hitung skor
        const score = this.calculateScore();
        
        // Simpan hasil
        ScoreManager.saveScore(score);
        
        // Tampilkan hasil
        UIManager.showQuizResults(score, isTimeout);
        
        // Sembunyikan quiz container
        document.getElementById('quizContainer').style.display = 'none';
        
        // Tampilkan result container
        document.getElementById('resultContainer').style.display = 'block';
    },
    
    calculateScore: function() {
        let correctCount = 0;
        
        for (let i = 0; i < this.questions.length; i++) {
            const userAnswer = this.userAnswers[i];
            const correctAnswer = this.questions[i].correctAnswer;
            
            if (userAnswer !== null && userAnswer === correctAnswer) {
                correctCount++;
            }
        }
        
        const percentage = Math.round((correctCount / this.questions.length) * 100);
        
        return {
            totalQuestions: this.questions.length,
            correctAnswers: correctCount,
            wrongAnswers: this.questions.length - correctCount,
            percentage: percentage,
            grade: this.getGrade(percentage),
            timeTaken: new Date().getTime() - this.quizStartTime
        };
    },
    
    getGrade: function(percentage) {
        if (percentage >= 75) return 'A+';
        if (percentage >= 50) return 'B';
        if (percentage >= 25) return 'C';
        return 'D';
    },
    
    restartQuiz: function() {
        // Reset semua state
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.quizStartTime = null;
        
        // Mulai quiz baru dengan kategori yang sama
        this.startQuiz(this.currentCategory);
    },
    
    checkAnswer: function(selectedOption) {
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = parseInt(selectedOption.dataset.index) === question.correctAnswer;
        
        // Tampilkan feedback
        UIManager.showAnswerFeedback(isCorrect, question.explanation);
        
        // Simpan jawaban user
        this.userAnswers[this.currentQuestionIndex] = parseInt(selectedOption.dataset.index);
        
        // Mainkan suara feedback
        const sound = isCorrect ? document.getElementById('correctSound') : document.getElementById('wrongSound');
        sound.play();
        
        // Tampilkan penjelasan jawaban
        UIManager.showAnswerExplanation(question.explanation);
        
        return isCorrect;
    }
};
