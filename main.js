
let questions = [
  {
    question: "Apa ibu kota Indonesia?",
    options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
    answer: 0
  },
  {
    question: "Siapa penemu lampu pijar?",
    options: ["Einstein", "Edison", "Newton", "Tesla"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let totalQuestions = 0;
let timerInterval;

function startQuiz() {
  document.getElementById('setup').style.display = 'none';
  document.getElementById('quizContainer').style.display = 'block';
  totalQuestions = questions.length;
  startTimer(60 * 60);
  showQuestion();
}

function showQuestion() {
  let q = questions[currentQuestion];
  document.getElementById('question').innerText = q.question;
  let optionsHTML = "";
  q.options.forEach((opt, i) => {
    optionsHTML += `<button class="option-button" onclick="selectOption(${i})">${String.fromCharCode(65 + i)}. ${opt}</button>`;
  });
  document.getElementById('options').innerHTML = optionsHTML;
  document.getElementById('feedback').innerText = "";
}

function selectOption(index) {
  let q = questions[currentQuestion];
  if (index === q.answer) {
    score++;
    document.getElementById('feedback').innerText = "Benar!";
  } else {
    document.getElementById('feedback').innerText = "Salah! Kunci jawaban: " + q.options[q.answer];
  }
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < totalQuestions) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 1500);
}

function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById('quizContainer').style.display = 'none';
  document.getElementById('result').style.display = 'block';
  let percentage = (score / totalQuestions) * 100;
  let message = "";
  if (percentage <= 25) {
    message = "Semangat! Terus belajar dan jangan menyerah.";
  } else if (percentage <= 50) {
    message = "Lumayan! Masih bisa ditingkatkan.";
  } else if (percentage <= 75) {
    message = "Bagus! Kamu hampir menguasai materi.";
  } else {
    message = "Luar biasa! Kamu hebat dan siap menginspirasi.";
  }
  document.getElementById('resultText').innerText =
    "Skor Kamu: " + percentage.toFixed(2) + "%
" + message;
}

function startTimer(duration) {
  let timer = duration;
  const display = document.getElementById('timer');
  timerInterval = setInterval(function () {
    let minutes = parseInt(timer / 60, 10);
    let seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;
    if (--timer < 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}
