import { Quiz } from './quiz-engine.js';
import { Config } from '../config.js';
import { AudioManager } from './audio.js';

export const QuizUI = (() => {
    // Cache DOM elements
    const participantForm = document.getElementById('participantForm');
    const quizContainer = document.getElementById('quizContainer');
    const optionsContainer = document.getElementById('optionsContainer');
    const questionText = document.getElementById('questionText');
    const questionNumber = document.getElementById('questionNumber');
    
    // Update UI based on quiz state
    const updateQuestionUI = (question, index, total) => {
        questionNumber.textContent = `Pertanyaan ${index + 1} dari ${total}`;
        questionText.textContent = question.question;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.dataset.option = i;
            
            optionElement.innerHTML = `
                <span class="option-prefix">${String.fromCharCode(65 + i)}</span>
                <span>${option}</span>
            `;
            
            optionElement.addEventListener('click', () => selectAnswer(i));
            optionsContainer.appendChild(optionElement);
        });
    };
    
    const selectAnswer = (selectedIndex) => {
        const isCorrect = Quiz.checkAnswer(selectedIndex);
        
        // Update UI based on answer
        const options = document.querySelectorAll('.option');
        options.forEach((opt, i) => {
            opt.classList.remove('selected', 'correct', 'incorrect');
            if (i === selectedIndex) {
                opt.classList.add(isCorrect ? 'correct' : 'incorrect');
            }
            if (i === Quiz.getCurrentQuestion().answer) {
                opt.classList.add('correct');
            }
        });
        
        // Play sound effect
        AudioManager.play(isCorrect ? 'correctSound' : 'wrongSound');
    };
    
    const showResults = (score, total) => {
        const percentage = Math.round((score / total) * 100);
        document.getElementById('scoreDisplay').textContent = `${percentage}%`;
        // ... tambahkan update UI lainnya
    };
    
    return {
        init: () => {
            // Inisialisasi event listeners
            document.getElementById('startQuiz').addEventListener('click', () => Quiz.start());
        },
        updateQuestionUI,
        showResults,
        toggleElement: (elementId, show) => {
            document.getElementById(elementId).style.display = show ? 'block' : 'none';
        }
    };
})();
