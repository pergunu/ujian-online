// js/modules/results.js
import { createConfetti } from '../utilities.js';

export const Results = (() => {
    const showResults = () => {
        const scoreElement = document.getElementById('scoreDisplay');
        const messageElement = document.getElementById('resultsMessage');
        const participantName = document.getElementById('name').value || 'Peserta';
        const percentage = calculateScore();

        scoreElement.textContent = `${percentage}%`;

        let message = '';
        if (percentage >= 80) {
            message = `<p>SEMPURNA! ${participantName} sangat luar biasa!</p>`;
            createConfetti();
        } else if (percentage >= 60) {
            message = `<p>BAIK SEKALI! ${participantName} memiliki pemahaman solid.</p>`;
            createConfetti();
        } else {
            message = `<p>TERUS BERLATIH! Setiap kesalahan adalah pelajaran berharga.</p>`;
        }

        messageElement.innerHTML = message;
        document.getElementById('quizContainer').style.display = 'none';
        document.getElementById('resultsContainer').style.display = 'block';
        document.getElementById('floatingButtons').style.display = 'none';
    };

    const calculateScore = () => {
        const questions = Quiz.getQuestions();
        const total = questions.length;
        const correctCount = questions.filter(q => q.isCorrect).length;
        return Math.round((correctCount / total) * 100);
    };

    const printCertificate = () => {
        window.print();
    };

    const restartQuiz = () => {
        location.reload();
    };

    return {
        init: () => {
            document.getElementById('printBtn')?.addEventListener('click', printCertificate);
            document.getElementById('restartBtn')?.addEventListener('click', restartQuiz);
        },
        showResults
    };
})();
