import QuizEngine from './quiz-engine.js';

document.addEventListener('DOMContentLoaded', function() {
    const quizApp = {
        elements: {
            registerForm: document.getElementById('registerForm'),
            quizArea: document.getElementById('quizArea'),
            resultArea: document.getElementById('resultArea'),
            questionText: document.getElementById('questionText'),
            optionsContainer: document.getElementById('optionsContainer'),
            submitBtn: document.getElementById('submitBtn'),
            skipBtn: document.getElementById('skipBtn'),
            restartBtn: document.getElementById('restartBtn'),
            timer: document.getElementById('timer')
        },
        
        init() {
            this.engine = new QuizEngine();
            this.setupEventListeners();
        },
        
        setupEventListeners() {
            this.elements.registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.startQuiz();
            });
            
            this.elements.restartBtn.addEventListener('click', () => {
                this.restartQuiz();
            });
            
            // Tambahkan event listener lainnya di sini
        },
        
        startQuiz() {
            this.elements.registerForm.closest('.card').classList.add('hidden');
            this.elements.quizArea.classList.remove('hidden');
            this.engine.start();
            this.displayQuestion();
        },
        
        displayQuestion() {
            const question = this.engine.getCurrentQuestion();
            this.elements.questionText.textContent = question.text;
            
            // Tampilkan opsi jawaban
            this.elements.optionsContainer.innerHTML = '';
            question.options.forEach(option => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.innerHTML = `
                    <input type="radio" name="answer" id="option-${option.code}" value="${option.code}">
                    <label for="option-${option.code}">${option.code}. ${option.text}</label>
                `;
                this.elements.optionsContainer.appendChild(optionElement);
            });
        },
        
        restartQuiz() {
            this.elements.resultArea.classList.add('hidden');
            this.elements.quizArea.classList.remove('hidden');
            this.engine.reset();
            this.displayQuestion();
        }
    };
    
    quizApp.init();
});
