// Quiz Functionality
document.addEventListener('DOMContentLoaded', function() {
    const quizApp = {
        currentQuestion: 0,
        score: 0,
        timer: null,
        timeLeft: 120 * 60, // 120 menit dalam detik
        questions: [],
        
        init: function() {
            this.loadQuestions();
            this.setupEventListeners();
        },
        
        loadQuestions: function() {
            // Dalam aplikasi nyata, ini akan mengambil dari database/API
            // Contoh soal untuk demo
            this.questions = [
                {
                    id: 1,
                    subject: 'agama',
                    question: 'Berapa jumlah Rukun Islam?',
                    options: {
                        A: '4',
                        B: '5',
                        C: '6',
                        D: '7',
                        E: '8'
                    },
                    correctAnswer: 'B',
                    explanation: 'Rukun Islam ada 5 yaitu: Syahadat, Shalat, Zakat, Puasa, dan Haji.'
                },
                {
                    id: 2,
                    subject: 'ppkn',
                    question: 'Pancasila sebagai dasar negara tercantum dalam pembukaan UUD 1945 alinea keberapa?',
                    options: {
                        A: '1',
                        B: '2',
                        C: '3',
                        D: '4',
                        E: 'Tidak tercantum'
                    },
                    correctAnswer: 'D',
                    explanation: 'Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat.'
                }
            ];
            
            this.showQuestion();
        },
        
        setupEventListeners: function() {
            document.querySelectorAll('.option').forEach(option => {
                option.addEventListener('click', (e) => this.selectAnswer(e));
            });
            
            document.getElementById('skip-question-btn').addEventListener('click', () => this.skipQuestion());
            document.getElementById('finish-exam-btn').addEventListener('click', () => this.finishExam());
        },
        
        showQuestion: function() {
            if (this.currentQuestion >= this.questions.length) {
                this.finishQuiz();
                return;
            }
            
            const question = this.questions[this.currentQuestion];
            document.getElementById('question-text').textContent = question.question;
            
            const optionsContainer = document.querySelector('.options-container');
            optionsContainer.innerHTML = '';
            
            for (const [key, value] of Object.entries(question.options)) {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.dataset.option = key;
                
                optionElement.innerHTML = `
                    <span class="option-letter">${key}</span>
                    <span class="option-text">${value}</span>
                `;
                
                optionElement.addEventListener('click', (e) => this.selectAnswer(e));
                optionsContainer.appendChild(optionElement);
            }
            
            this.updateProgress();
        },
        
        selectAnswer: function(e) {
            const selectedOption = e.currentTarget.dataset.option;
            const question = this.questions[this.currentQuestion];
            
            // Tandai jawaban benar/salah
            const isCorrect = selectedOption === question.correctAnswer;
            
            if (isCorrect) {
                this.score++;
                e.currentTarget.classList.add('correct');
                document.getElementById('correct-audio').play();
            } else {
                e.currentTarget.classList.add('wrong');
                document.getElementById('wrong-audio').play();
                
                // Tandai jawaban yang benar
                document.querySelectorAll('.option').forEach(opt => {
                    if (opt.dataset.option === question.correctAnswer) {
                        opt.classList.add('correct');
                    }
                });
            }
            
            // Tampilkan penjelasan
            document.getElementById('explanation-text').textContent = question.explanation;
            document.querySelector('.answer-explanation').classList.remove('hidden');
            
            // Nonaktifkan semua opsi
            document.querySelectorAll('.option').forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
            
            // Lanjut ke soal berikutnya setelah 2 detik
            setTimeout(() => {
                this.currentQuestion++;
                this.showQuestion();
            }, 2000);
        },
        
        skipQuestion: function() {
            this.currentQuestion++;
            this.showQuestion();
        },
        
        finishExam: function() {
            clearInterval(this.timer);
            
            // Hitung nilai
            const percentage = Math.round((this.score / this.questions.length) * 100);
            
            // Tampilkan hasil
            document.getElementById('total-questions').textContent = this.questions.length;
            document.getElementById('correct-answers').textContent = this.score;
            document.getElementById('wrong-answers').textContent = this.questions.length - this.score;
            document.getElementById('score').textContent = percentage;
            
            // Tampilkan pesan motivasi berdasarkan nilai
            let motivation = '';
            if (percentage >= 90) {
                motivation = 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
            } else if (percentage >= 80) {
                motivation = 'Hasil yang sangat baik! Anda telah menguasai sebagian besar materi dengan baik.';
            } else if (percentage >= 70) {
                motivation = 'Hasil yang baik! Terus tingkatkan pemahaman Anda untuk hasil yang lebih baik.';
            } else if (percentage >= 60) {
                motivation = 'Anda sudah cukup baik, tetapi masih perlu meningkatkan pemahaman materi.';
            } else {
                motivation = 'Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.';
            }
            
            document.getElementById('motivation-text').textContent = motivation;
            
            // Tampilkan layar hasil
            document.querySelector('.exam-screen').classList.add('hidden');
            document.querySelector('.results-screen').classList.remove('hidden');
        },
        
        updateProgress: function() {
            const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
            document.querySelector('.progress-fill').style.width = `${progress}%`;
            document.getElementById('progress-text').textContent = 
                `Soal ${this.currentQuestion + 1} dari ${this.questions.length}`;
        },
        
        startTimer: function() {
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateTimerDisplay();
                
                if (this.timeLeft <= 0) {
                    clearInterval(this.timer);
                    this.finishExam();
                }
            }, 1000);
        },
        
        updateTimerDisplay: function() {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            document.getElementById('timer').textContent = 
                `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    };

    quizApp.init();
});
