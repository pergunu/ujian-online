class QuizEngine {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.timer = null;
    }
    
    loadQuestions(subject, level) {
        // In a real app, this would fetch questions from a database
        // For demo, we'll use sample questions
        
        this.questions = [
            {
                id: 1,
                subject: 'agama',
                level: 'mudah',
                text: 'Siapakah nabi terakhir dalam Islam?',
                options: [
                    { id: 'A', text: 'Nabi Musa' },
                    { id: 'B', text: 'Nabi Isa' },
                    { id: 'C', text: 'Nabi Muhammad', correct: true },
                    { id: 'D', text: 'Nabi Ibrahim' }
                ],
                explanation: 'Nabi Muhammad SAW adalah nabi terakhir yang diutus Allah SWT.'
            },
            {
                id: 2,
                subject: 'ppkn',
                level: 'sedang',
                text: 'Pancasila sebagai dasar negara tercantum dalam?',
                options: [
                    { id: 'A', text: 'Pembukaan UUD 1945', correct: true },
                    { id: 'B', text: 'Batang Tubuh UUD 1945' },
                    { id: 'C', text: 'Penjelasan UUD 1945' },
                    { id: 'D', text: 'Keputusan Presiden' }
                ],
                explanation: 'Pancasila sebagai dasar negara tercantum dalam alinea keempat Pembukaan UUD 1945.'
            }
        ];
    }
    
    displayQuestion(index) {
        if (index < 0 || index >= this.questions.length) return;
        
        this.currentQuestionIndex = index;
        const question = this.questions[index];
        
        document.getElementById('questionText').textContent = question.text;
        document.getElementById('questionCounter').textContent = `Soal ${index + 1} dari ${this.questions.length}`;
        
        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';
        
        question.options.forEach(option => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.dataset.optionId = option.id;
            optionBtn.innerHTML = `
                <span class="option-letter">${option.id}</span>
                <span class="option-text">${option.text}</span>
            `;
            
            optionBtn.addEventListener('click', () => this.checkAnswer(option));
            optionsContainer.appendChild(optionBtn);
        });
        
        document.getElementById('explanationContainer').classList.add('hidden');
    }
    
    checkAnswer(selectedOption) {
        const correctAudio = document.getElementById('correctAudio');
        const wrongAudio = document.getElementById('wrongAudio');
        
        // Disable all options
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.add('locked');
            btn.removeEventListener('click', this.checkAnswer);
        });
        
        // Highlight selected option
        const selectedBtn = document.querySelector(`.option-btn[data-option-id="${selectedOption.id}"]`);
        
        if (selectedOption.correct) {
            selectedBtn.classList.add('correct');
            correctAudio.play();
            this.correctAnswers++;
            this.score += 10; // Assuming 10 points per correct answer
        } else {
            selectedBtn.classList.add('wrong');
            wrongAudio.play();
            this.wrongAnswers++;
            
            // Highlight correct answer
            const question = this.questions[this.currentQuestionIndex];
            const correctOption = question.options.find(opt => opt.correct);
            if (correctOption) {
                const correctBtn = document.querySelector(`.option-btn[data-option-id="${correctOption.id}"]`);
                correctBtn.classList.add('correct');
            }
        }
        
        // Show explanation
        const explanationContainer = document.getElementById('explanationContainer');
        const explanationText = document.getElementById('explanationText');
        explanationText.textContent = this.questions[this.currentQuestionIndex].explanation;
        explanationContainer.classList.remove('hidden');
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.displayQuestion(this.currentQuestionIndex + 1);
        } else {
            this.finishQuiz();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.displayQuestion(this.currentQuestionIndex - 1);
        }
    }
    
    skipQuestion() {
        this.nextQuestion();
    }
    
    showUnanswered() {
        // In a real app, this would show a list of unanswered questions
        alert(`Anda memiliki ${this.questions.length - this.correctAnswers - this.wrongAnswers} soal yang belum dijawab`);
    }
    
    finishQuiz() {
        this.timer.stop();
        
        // Display results
        document.getElementById('totalQuestions').textContent = this.questions.length;
        document.getElementById('correctAnswers').textContent = this.correctAnswers;
        document.getElementById('wrongAnswers').textContent = this.wrongAnswers;
        document.getElementById('finalScore').textContent = this.score;
        
        // Set motivational message based on score
        const percentage = (this.score / (this.questions.length * 10)) * 100;
        const motivationText = document.getElementById('motivationText');
        
        if (percentage >= 90) {
            motivationText.textContent = "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.";
        } else if (percentage >= 80) {
            motivationText.textContent = "Hasil yang sangat baik! Anda telah menguasai sebagian besar materi dengan baik.";
        } else if (percentage >= 70) {
            motivationText.textContent = "Kerja bagus! Anda memiliki pemahaman yang baik tentang materi ini.";
        } else if (percentage >= 60) {
            motivationText.textContent = "Hasil yang cukup baik. Ada beberapa area yang masih bisa ditingkatkan.";
        } else if (percentage >= 50) {
            motivationText.textContent = "Anda telah berusaha, tetapi masih perlu belajar lebih giat lagi.";
        } else {
            motivationText.textContent = "Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.";
        }
        
        // Show results screen
        document.getElementById('examInterface').classList.add('hidden');
        document.getElementById('resultsContainer').classList.remove('hidden');
    }
    
    startQuiz(subject, level, duration) {
        this.loadQuestions(subject, level);
        this.displayQuestion(0);
        this.timer = startTimer(duration);
    }
}

function startExam() {
    const subject = document.querySelector('.subject-buttons button.active, .test-buttons button.active').dataset.subject;
    const level = 'mudah'; // In a real app, this would be determined by grade/selection
    
    const quiz = new QuizEngine();
    quiz.startQuiz(subject, level, 120); // 120 minutes for demo
}

function finishExam() {
    const quiz = new QuizEngine(); // In a real app, you would use the existing instance
    quiz.finishQuiz();
}
