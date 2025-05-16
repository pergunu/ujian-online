// js/modules/quiz-engine.js
import { Config } from '../config.js';
import { AudioManager } from './audio.js';

export const Quiz = (() => {
    let state = {
        currentCategory: 'pelajar',
        currentSubcategory: 'ipa',
        currentLevel: 'mudah',
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        timer: null
    };

    function startQuiz() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        if (!name || !phone) {
            alert("Isi nama dan nomor HP!");
            return;
        }

        document.getElementById('participantForm').style.display = 'none';
        document.getElementById('quizContainer').style.display = 'block';

        loadQuestions();
        startTimer(Config.examDuration);
        loadQuestion();
    }

    function loadQuestions() {
        state.questions = Config.questions[state.currentCategory][state.currentSubcategory][state.currentLevel];
    }

    function loadQuestion() {
        const q = state.questions[state.currentQuestionIndex];
        document.getElementById('questionText').textContent = q.question;
        const optionsContainer = document.getElementById('optionsContainer');
        optionsContainer.innerHTML = '';
        q.options.forEach((opt, i) => {
            const div = document.createElement('div');
            div.className = 'option';
            div.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
            div.onclick = () => selectAnswer(i);
            optionsContainer.appendChild(div);
        });
    }

    function selectAnswer(idx) {
        const q = state.questions[state.currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        options.forEach(o => o.classList.remove('selected'));
        options[idx].classList.add('selected');
        q.userAnswer = idx;
        if (idx === q.answer) {
            state.score++;
            AudioManager.playSound('correctSound');
        } else {
            AudioManager.playSound('wrongSound');
        }
        showExplanation(q.explanation);
    }

    function showExplanation(text) {
        const expl = document.getElementById('explanation');
        expl.querySelector('.explanation-text').textContent = text;
        expl.style.display = 'block';
    }

    function nextQuestion() {
        if (state.currentQuestionIndex < state.questions.length - 1) {
            state.currentQuestionIndex++;
            loadQuestion();
        } else {
            finishQuiz();
        }
    }

    function finishQuiz() {
        clearInterval(state.timer);
        const percentage = Math.round((state.score / state.questions.length) * 100);
        document.getElementById('scoreDisplay').textContent = `${percentage}%`;
        document.getElementById('quizContainer').style.display = 'none';
        document.getElementById('resultsContainer').style.display = 'block';
    }

    function startTimer(minutes) {
        let timeLeft = minutes * 60;
        const display = document.getElementById('timeDisplay');
        state.timer = setInterval(() => {
            const m = Math.floor(timeLeft / 60);
            const s = timeLeft % 60;
            display.textContent = `${m}:${s.toString().padStart(2, '0')}`;
            if (--timeLeft <= 0) finishQuiz();
        }, 1000);
    }

    return {
        init: () => {
            document.getElementById('startQuiz').addEventListener('click', startQuiz);
            document.getElementById('nextBtn').addEventListener('click', nextQuestion);
        },
        setCategory: (cat) => {
            state.currentCategory = cat;
        },
        showOpeningScreen: () => {
            document.getElementById('openingScreen').style.display = 'flex';
        }
    };
})();
