// script.js
// Konfigurasi
const config = {
  timerPerSoal: 30, // Detik
  enableSound: true
};

// Efek suara
const sounds = {
  correct: new Audio('assets/sounds/correct.mp3'),
  wrong: new Audio('assets/sounds/wrong.mp3'),
  finish: new Audio('assets/sounds/finish.mp3')
};

// Inisialisasi quiz
function initQuiz() {
  let currentQuestion = 0;
  let score = 0;
  let timer;

  // Load soal
  function loadQuestion() {
    clearInterval(timer);
    const category = Object.keys(questions)[0];
    const q = questions[category][currentQuestion];

    // Update UI
    document.getElementById('question').innerHTML = `
      <span class="q-number">${currentQuestion + 1}.</span>
      ${q.question}
    `;

    // Buat opsi A-E
    let optionsHTML = '';
    const optionLetters = ['A', 'B', 'C', 'D', 'E'];
    q.options.forEach((opt, i) => {
      optionsHTML += `
        <div class="option" 
             data-index="${i}" 
             onclick="checkAnswer(${i}, ${q.answer})">
          <span class="option-letter">${optionLetters[i]}</span>
          ${opt}
        </div>
      `;
    });

    document.getElementById('options').innerHTML = optionsHTML;
    startTimer();
  }

  // Timer
  function startTimer() {
    let timeLeft = config.timerPerSoal;
    updateTimerDisplay(timeLeft);

    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timer);
        handleTimeOut();
      }
    }, 1000);
  }

  // Cek jawaban
  window.checkAnswer = (selectedIdx, correctIdx) => {
    clearInterval(timer);
    const options = document.querySelectorAll('.option');
    
    options.forEach(opt => {
      opt.style.pointerEvents = 'none';
      if (parseInt(opt.dataset.index) === correctIdx) {
        opt.classList.add('correct');
      } else if (parseInt(opt.dataset.index) === selectedIdx) {
        opt.classList.add('wrong');
      }
    });

    // Play sound
    if (config.enableSound) {
      if (selectedIdx === correctIdx) {
        sounds.correct.play();
        score++;
      } else {
        sounds.wrong.play();
      }
    }

    // Next question
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions[Object.keys(questions)[0]].length) {
        loadQuestion();
      } else {
        showResult();
      }
    }, 2000);
  };

  // Tampilkan hasil
  function showResult() {
    if (config.enableSound) sounds.finish.play();
    document.getElementById('quiz-container').innerHTML = `
      <div class="result-card">
        <h2>Quiz Selesai! 🎉</h2>
        <p class="score">Nilai Anda: 
          <span>${score}/${questions[Object.keys(questions)[0]].length}</span>
        </p>
        <button onclick="window.print()">Cetak Hasil</button>
        <button onclick="initQuiz()">Ulangi Quiz</button>
      </div>
    `;
  }

  loadQuestion();
}

// Start quiz
document.addEventListener('DOMContentLoaded', initQuiz);
