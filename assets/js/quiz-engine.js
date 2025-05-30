// Quiz Engine
class QuizEngine {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timer = null;
        this.timeLeft = 120 * 60; // 120 minutes in seconds
        this.answeredQuestions = new Set();
        this.unansweredQuestions = new Set();
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        
        this.init();
    }
    
    init() {
        this.loadQuestions();
        this.setupEventListeners();
    }
    
    loadQuestions() {
        // In a real implementation, you would load questions from a database
        // For demo purposes, we'll use sample questions
        
        this.questions = [
            {
                id: 1,
                question: 'Berapakah hasil dari 2 + 2?',
                options: ['3', '4', '5', '6', '7'],
                correctAnswer: 1, // Index of correct answer (0-based)
                explanation: 'Penjumlahan dasar 2 + 2 adalah 4'
            },
            {
                id: 2,
                question: 'Ibukota Indonesia adalah:',
                options: ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Makassar'],
                correctAnswer: 0,
                explanation: 'Jakarta adalah ibukota Indonesia sejak kemerdekaan'
            },
            {
                id: 3,
                question: 'Planet terdekat dengan matahari adalah:',
                options: ['Venus', 'Bumi', 'Mars', 'Mercury', 'Jupiter'],
                correctAnswer: 3,
                explanation: 'Mercury adalah planet terdekat dengan matahari'
            }
        ];
        
        // Initialize unanswered questions set
        this.questions.forEach((q, index) => this.unansweredQuestions.add(index));
    }
    
    setupEventListeners() {
        // Start exam button
        document.getElementById('start-exam').addEventListener('click', () => this.startExam());
        
        // Option selection
        document.getElementById('options-container').addEventListener('click', (e) => {
            if (e.target.classList.contains('option')) {
                const optionIndex = parseInt(e.target.dataset.index);
                this.selectAnswer(optionIndex);
            }
        });
        
        // Exam controls
        document.getElementById('finish-exam').addEventListener('click', () => this.finishExam());
        document.getElementById('skip-question').addEventListener('click', () => this.skipQuestion());
        document.getElementById('unanswered-questions').addEventListener('click', () => this.showUnanswered());
    }
    
    startExam() {
        // Hide level selection and show exam screen
        document.querySelector('.level-selection').classList.add('hidden');
        document.querySelector('.exam-screen').classList.remove('hidden');
        
        // Start timer
        this.startTimer();
        
        // Load first question
        this.displayQuestion(this.currentQuestionIndex);
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            
            // Update timer display
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            document.getElementById('timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Time warning at 10 minutes
            if (this.timeLeft === 10 * 60) {
                this.showTimeWarning();
            }
            
            // Time's up
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.timeUp();
            }
        }, 1000);
    }
    
    showTimeWarning() {
        const warning = document.getElementById('time-warning');
        warning.classList.remove('hidden');
        
        // Make timer bigger
        document.getElementById('timer').style.fontSize = '1.5rem';
        document.getElementById('timer').style.color = 'var(--warning-color)';
    }
    
    timeUp() {
        alert('Waktu ujian telah habis!');
        this.finishExam();
    }
    
    displayQuestion(index) {
        if (index < 0 || index >= this.questions.length) return;
        
        const question = this.questions[index];
        const optionsContainer = document.getElementById('options-container');
        
        // Update question counter
        document.getElementById('current-question').textContent = index + 1;
        document.getElementById('total-questions').textContent = this.questions.length;
        
        // Set question text
        document.getElementById('question-text').textContent = question.question;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Add new options
        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.dataset.index = i;
            optionElement.innerHTML = `<span class="option-label">${String.fromCharCode(65 + i)}</span> ${option}`;
            optionsContainer.appendChild(optionElement);
        });
        
        // Hide explanation
        document.getElementById('explanation').classList.add('hidden');
    }
    
    selectAnswer(optionIndex) {
        const question = this.questions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        
        // Disable all options
        options.forEach(opt => {
            opt.style.pointerEvents = 'none';
        });
        
        // Mark selected option
        options[optionIndex].classList.add('selected');
        
        // Check if answer is correct
        if (optionIndex === question.correctAnswer) {
            options[optionIndex].classList.add('correct');
            document.getElementById('correct-audio').play();
            this.correctAnswers++;
            this.score += 10; // Assuming 10 points per question
        } else {
            options[optionIndex].classList.add('wrong');
            options[question.correctAnswer].classList.add('correct');
            document.getElementById('wrong-audio').play();
            this.wrongAnswers++;
        }
        
        // Show explanation
        const explanation = document.getElementById('explanation');
        explanation.innerHTML = `<h4>Penjelasan:</h4><p>${question.explanation}</p>`;
        explanation.classList.remove('hidden');
        
        // Update answered questions
        this.answeredQuestions.add(this.currentQuestionIndex);
        this.unansweredQuestions.delete(this.currentQuestionIndex);
        
        // Auto-advance after 3 seconds
        setTimeout(() => {
            this.nextQuestion();
        }, 3000);
    }
    
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion(this.currentQuestionIndex);
        } else {
            this.finishExam();
        }
    }
    
    skipQuestion() {
        this.nextQuestion();
    }
    
    showUnanswered() {
        if (this.unansweredQuestions.size > 0) {
            const firstUnanswered = Math.min(...Array.from(this.unansweredQuestions));
            this.currentQuestionIndex = firstUnanswered;
            this.displayQuestion(this.currentQuestionIndex);
        } else {
            alert('Tidak ada soal yang belum dijawab!');
        }
    }
    
    finishExam() {
        clearInterval(this.timer);
        
        // Calculate results
        const totalQuestions = this.questions.length;
        const unanswered = totalQuestions - this.answeredQuestions.size;
        
        // Show results screen
        document.querySelector('.exam-screen').classList.add('hidden');
        document.querySelector('.results-screen').classList.remove('hidden');
        
        // Update results display
        document.getElementById('total-answered').textContent = totalQuestions;
        document.getElementById('correct-answers').textContent = this.correctAnswers;
        document.getElementById('wrong-answers').textContent = this.wrongAnswers;
        document.getElementById('unanswered').textContent = unanswered;
        document.getElementById('final-score').textContent = this.score;
        
        // Set up certificate button
        document.getElementById('view-certificate').addEventListener('click', () => this.showCertificate());
        
        // Set up retake button
        document.getElementById('retake-exam').addEventListener('click', () => {
            document.querySelector('.results-screen').classList.add('hidden');
            document.querySelector('.level-selection').classList.remove('hidden');
            this.resetExam();
        });
    }
    
    showCertificate() {
        // Get participant data from form
        const fullName = document.getElementById('fullname').value;
        const status = document.querySelector('input[name="status"]:checked').value;
        const schoolLevel = document.getElementById('school-level').value || 'UMUM';
        const subject = document.querySelector('.subject-btn.active').textContent;
        
        // Generate certificate code
        const now = new Date();
        const dateStr = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
        const certCode = `${fullName.toUpperCase().replace(/ /g, '_')}/${status.toUpperCase()}/${schoolLevel}/${subject}/${dateStr}/${randomCode}/PERGUNU-STB`;
        
        // Update certificate content
        document.getElementById('certificate-name').textContent = fullName;
        document.getElementById('certificate-score').textContent = this.score;
        document.getElementById('certificate-code').textContent = `Kode: ${certCode}`;
        
        // Set date
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const dateFormatted = now.toLocaleDateString('id-ID', options);
        document.getElementById('certificate-period').textContent = `Ditetapkan di: Situbondo, ${dateFormatted}`;
        
        // Set motivation text based on score
        const percentage = (this.score / (this.questions.length * 10)) * 100;
        let motivation = '';
        
        if (percentage >= 90) {
            motivation = 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
        } else if (percentage >= 70) {
            motivation = 'Bagus! Anda memiliki pemahaman yang baik tentang materi ini. Terus tingkatkan kemampuan Anda.';
        } else if (percentage >= 50) {
            motivation = 'Cukup baik. Masih ada ruang untuk meningkatkan pemahaman Anda. Terus belajar!';
        } else {
            motivation = 'Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.';
        }
        
        document.getElementById('certificate-motivation').textContent = motivation;
        
        // Show certificate screen
        document.querySelector('.results-screen').classList.add('hidden');
        document.querySelector('.certificate-screen').classList.remove('hidden');
        
        // Play applause sound
        document.getElementById('applause-audio').play();
        
        // Set up print button
        document.getElementById('print-certificate').addEventListener('click', () => window.print());
        
        // Set up back button
        document.getElementById('back-to-results').addEventListener('click', () => {
            document.querySelector('.certificate-screen').classList.add('hidden');
            document.querySelector('.results-screen').classList.remove('hidden');
        });
    }
    
    resetExam() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timeLeft = 120 * 60;
        this.answeredQuestions = new Set();
        this.unansweredQuestions = new Set();
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        
        // Reset timer display
        document.getElementById('timer').textContent = '120:00';
        document.getElementById('timer').style.fontSize = '';
        document.getElementById('timer').style.color = '';
        
        // Hide time warning
        document.getElementById('time-warning').classList.add('hidden');
    }
}

// Initialize quiz engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const quiz = new QuizEngine();
});
