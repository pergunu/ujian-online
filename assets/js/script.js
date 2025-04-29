// script.js
document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    let currentQuestion = 0;
    let score = 0;

    // Load soal dari questions.js
    function loadQuestion() {
        const category = Object.keys(questions)[0]; // Ambil kategori pertama
        const q = questions[category][currentQuestion];

        quizContainer.innerHTML = `
            <div class="question">${q.question}</div>
            <div class="options">
                ${q.options.map((opt, i) => 
                    `<div class="option" onclick="checkAnswer(${i})">${opt}</div>`
                ).join('')}
            </div>
            <div id="result"></div>
        `;
    }

    window.checkAnswer = (selectedIdx) => {
        const category = Object.keys(questions)[0];
        const q = questions[category][currentQuestion];
        
        if (selectedIdx === q.answer) {
            document.getElementById('result').innerHTML = 
                '<p style="color:green;">Benar!</p>';
            score++;
        } else {
            document.getElementById('result').innerHTML = 
                `<p style="color:red;">Salah! Jawaban benar: ${q.options[q.answer]}</p>`;
        }

        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions[Object.keys(questions)[0]].length) {
                loadQuestion();
            } else {
                quizContainer.innerHTML = `
                    <h2>Quiz Selesai!</h2>
                    <p>Nilai Anda: ${score}/${questions[Object.keys(questions)[0]].length}</p>
                `;
            }
        }, 1500);
    }

    loadQuestion();
});
