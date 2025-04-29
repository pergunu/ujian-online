// Inisialisasi Quiz
let currentQuestion = 0;
let score = 0;
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');

function loadQuestion() {
  const q = questions[currentQuestion];
  
  document.getElementById('question').innerHTML = `
    <span class="q-number">${currentQuestion + 1}.</span>
    ${q.question}
  `;

  let optionsHTML = '';
  q.options.forEach((opt, i) => {
    optionsHTML += `
      <div class="option" onclick="checkAnswer(${i})">
        <span class="option-letter">${String.fromCharCode(65 + i)}.</span>
        ${opt}
      </div>
    `;
  });
  
  document.getElementById('options').innerHTML = optionsHTML;
}

function checkAnswer(selectedIdx) {
  const q = questions[currentQuestion];
  const options = document.querySelectorAll('.option');
  
  options.forEach((opt, i) => {
    opt.style.pointerEvents = 'none';
    if (i === q.answer) {
      opt.style.background = 'rgba(46, 204, 113, 0.3)';
      opt.style.borderColor = '#2ecc71';
    } else if (i === selectedIdx) {
      opt.style.background = 'rgba(231, 76, 60, 0.3)';
      opt.style.borderColor = '#e74c3c';
    }
  });

  if (selectedIdx === q.answer) score++;
  
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function showResult() {
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  document.getElementById('score').textContent = `Skor Anda: ${score}/${questions.length}`;
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  quizContainer.style.display = 'block';
  resultContainer.style.display = 'none';
  loadQuestion();
}

// Mulai quiz
loadQuestion();
