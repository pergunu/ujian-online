// Variabel Global
let currentQuestion = 0;
let score = 0;
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

// Data Soal (contoh)
const questions = [
  {
    question: "Siapa pendiri Nahdlatul Ulama (NU)?",
    options: [
      "A. KH. Hasyim Asy'ari",
      "B. KH. Ahmad Dahlan",
      "C. Buya Hamka",
      "D. KH. Wahab Hasbullah",
      "E. KH. Ali Maksum"
    ],
    answer: 0
  },
  {
    question: "Tahun berapa NU didirikan?",
    options: [
      "A. 1926",
      "B. 1945",
      "C. 1938",
      "D. 1912",
      "E. 1954"
    ],
    answer: 0
  }
];

// Muat Soal
function loadQuestion() {
  const q = questions[currentQuestion];
  
  document.getElementById('question').innerHTML = `
    <span class="q-number">${currentQuestion + 1}.</span>
    ${q.question}
  `;

  let optionsHTML = '';
  q.options.forEach((opt, i) => {
    optionsHTML += `
      <div class="option" onclick="selectAnswer(${i})">
        <span class="option-letter">${String.fromCharCode(65 + i)}.</span>
        ${opt}
      </div>
    `;
  });
  
  document.getElementById('options').innerHTML = optionsHTML;
  nextButton.style.display = 'none';
}

// Pilih Jawaban
function selectAnswer(selectedIdx) {
  const q = questions[currentQuestion];
  const options = document.querySelectorAll('.option');
  
  options.forEach((opt, i) => {
    opt.style.pointerEvents = 'none';
    if (i === q.answer) {
      opt.classList.add('correct');
    } else if (i === selectedIdx) {
      opt.classList.add('wrong');
    }
  });

  if (selectedIdx === q.answer) {
    score++;
  }
  
  nextButton.style.display = 'block';
}

// Lanjut ke Soal Berikutnya
function nextQuestion() {
  currentQuestion++;
  
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Tampilkan Hasil
function showResult() {
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  scoreElement.textContent = `${score} / ${questions.length}`;
}

// Reset Quiz
function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  quizContainer.style.display = 'block';
  resultContainer.style.display = 'none';
  loadQuestion();
}

// Event Listener
nextButton.addEventListener('click', nextQuestion);

// Mulai Quiz
loadQuestion();
