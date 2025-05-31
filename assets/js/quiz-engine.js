// Quiz Engine - Core Functionality
class QuizEngine {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timer = null;
        this.timeLeft = 0;
    }

    init(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.displayQuestion();
    }

    displayQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.finishQuiz();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        document.getElementById('question-text').textContent = question.text;

        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = `${String.fromCharCode(65 + index)}. ${option.text}`;
            optionElement.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(optionElement);
        });

        this.updateProgress();
    }

    selectAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correctAnswer;

        if (isCorrect) {
            this.score++;
            document.getElementById('correct-sound').play();
        } else {
            document.getElementById('wrong-sound').play();
        }

        // Highlight correct answer
        const options = document.querySelectorAll('.option');
        options.forEach((option, index) => {
            if (index === question.correctAnswer) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
            option.style.pointerEvents = 'none';
        });

        // Show explanation
        document.getElementById('explanation-text').textContent = question.explanation;
        document.getElementById('explanation-container').classList.remove('hidden');

        // Move to next question after delay
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }, 2000);
    }

    updateProgress() {
        const progress = (this.currentQuestionIndex / this.questions.length) * 100;
        document.querySelector('.progress-bar').style.width = `${progress}%`;
        document.getElementById('question-counter').textContent = 
            `Soal ${this.currentQuestionIndex + 1} dari ${this.questions.length}`;
    }

    startTimer(minutes) {
        this.timeLeft = minutes * 60;
        this.updateTimerDisplay();

        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();

            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.finishQuiz();
            } else if (this.timeLeft === 300) { // 5 minutes left
                this.showTimeWarning();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        document.getElementById('timer').textContent = 
            `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    showTimeWarning() {
        const warning = document.createElement('div');
        warning.className = 'time-warning';
        warning.textContent = 'Waktu tersisa 5 menit!';
        document.body.appendChild(warning);
        setTimeout(() => warning.remove(), 5000);
    }

    finishQuiz() {
        clearInterval(this.timer);
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        // Show results
        document.getElementById('score-value').textContent = this.score;
        document.getElementById('total-questions').textContent = this.questions.length;
        document.getElementById('percentage').textContent = percentage;
        
        // Hide quiz screen, show results screen
        document.getElementById('quiz-screen').classList.add('hidden');
        document.getElementById('results-screen').classList.remove('hidden');
        
        // Generate certificate
        this.generateCertificate(percentage);
    }

    generateCertificate(score) {
        const certificate = document.getElementById('certificate');
        certificate.querySelector('.participant-name').textContent = 
            localStorage.getItem('participantName');
        certificate.querySelector('.score').textContent = score;
        certificate.querySelector('.date').textContent = new Date().toLocaleDateString();
        
        // Set motivational message based on score
        let message = '';
        if (score >= 90) message = 'Sempurna! Anda sangat luar biasa.';
        else if (score >= 70) message = 'Bagus! Hasil yang sangat memuaskan.';
        else if (score >= 50) message = 'Cukup baik. Tingkatkan lagi!';
        else message = 'Jangan menyerah, terus belajar!';
        
        certificate.querySelector('.motivation').textContent = message;
    }
}

// Initialize Quiz Engine
const quizEngine = new QuizEngine();

// Sample questions for demo
const sampleQuestions = [
    {
        text: "Apa ibukota Indonesia?",
        options: [
            { text: "Jakarta" },
            { text: "Bandung" },
            { text: "Surabaya" },
            { text: "Medan" }
        ],
        correctAnswer: 0,
        explanation: "Ibukota Indonesia adalah Jakarta."
    },
    {
        text: "2 + 2 = ?",
        options: [
            { text: "3" },
            { text: "4" },
            { text: "5" },
            { text: "6" }
        ],
        correctAnswer: 1,
        explanation: "2 ditambah 2 sama dengan 4."
    }
];

// Start quiz with sample questions (in real app, load from server)
quizEngine.init(sampleQuestions);
quizEngine.startTimer(2); // 2 minutes for demo
