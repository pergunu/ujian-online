// js/modules/quiz-ui.js
export const QuizUI = (() => {
    const updateQuestionUI = (question, index, total) => {
        document.getElementById('questionNumber').textContent = `Soal ${index + 1} dari ${total}`;
        document.getElementById('questionText').textContent = question.question;
    };

    const showResults = (score, total) => {
        const percentage = Math.round((score / total) * 100);
        document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    };

    const toggleElement = (id, show) => {
        document.getElementById(id).style.display = show ? 'block' : 'none';
    };

    return {
        init: () => {},
        updateQuestionUI,
        showResults,
        toggleElement
    };
})();
