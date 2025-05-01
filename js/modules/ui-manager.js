class UIManager {
    static init() {
        this.cacheDOMElements();
        this.bindEvents();
    }

    static cacheDOMElements() {
        this.elements = {
            participantForm: document.getElementById('participantForm'),
            quizContainer: document.getElementById('quizContainer'),
            resultsContainer: document.getElementById('resultsContainer'),
            questionText: document.getElementById('questionText'),
            optionsContainer: document.getElementById('optionsContainer'),
            explanationText: document.getElementById('explanationText'),
            // Add other elements as needed
        };
    }

    static bindEvents() {
        document.getElementById('startQuiz').addEventListener('click', (e) => {
            e.preventDefault();
            const participantData = this.getParticipantData();
            QuizEngine.startQuiz(participantData);
        });
        
        // Add other event bindings
    }

    static showQuestion(question) {
        this.elements.questionText.textContent = question.question;
        
        // Clear and render options
        this.elements.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.dataset.index = index;
            optionElement.innerHTML = `
                <span class="option-prefix">${String.fromCharCode(65 + index)}</span>
                <span>${option}</span>
            `;
            optionElement.addEventListener('click', () => {
                const result = QuizEngine.checkAnswer(index);
                this.showAnswerFeedback(result);
            });
            this.elements.optionsContainer.appendChild(optionElement);
        });
        
        // Update UI state
        this.elements.quizContainer.style.display = 'block';
        this.elements.participantForm.style.display = 'none';
        this.elements.resultsContainer.style.display = 'none';
    }

    static showAnswerFeedback(result) {
        // Highlight correct and incorrect answers
        // Show explanation
        // Enable next button
    }

    static showResults(results) {
        // Display results
        this.elements.quizContainer.style.display = 'none';
        this.elements.resultsContainer.style.display = 'block';
        
        if (results.percentage >= 80) {
            this.playSound('applause');
            this.showConfetti();
        }
    }

    static playSound(soundType) {
        if (!Config.enableSound) return;
        // Play corresponding sound
    }

    static showConfetti() {
        // Show confetti animation
    }

    static updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        document.getElementById('timeDisplay').textContent = 
            `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

export default UIManager;
