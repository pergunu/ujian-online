// Data contoh soal
const questions = [
  {
    text: "Siapa presiden pertama Indonesia?",
    options: ["Ir. Soekarno", "Soeharto", "BJ Habibie", "Abdurrahman Wahid", "Megawati"],
    correctAnswer: "A"
  },
  {
    text: "Ibukota Jawa Timur adalah...",
    options: ["Surabaya", "Malang", "Jember", "Sidoarjo", "Kediri"],
    correctAnswer: "A"
  },
  {
    text: "Hasil dari 8 x 9 adalah...",
    options: ["72", "64", "81", "56", "90"],
    correctAnswer: "A"
  },
  {
    text: "Berikut adalah hewan mamalia, kecuali...",
    options: ["Ikan Paus", "Kucing", "Anjing", "Gajah", "Kuda"],
    correctAnswer: "E"
  },
  {
    text: "Kalimat yang tidak sesuai EYD adalah...",
    options: ["Ayah pergi ke pasar.", "Dia sedang makan.", "Mereka telah bermain.", "Kami sudah makan tadi malam.", "Kita harus belajar rajin."],
    correctAnswer: "D"
  }
];

let currentQuestionIndex = 0;
let score = { correct: 0, wrong: 0, skipped: 0 };
let answered = false;

// DOM Elements
const questionText = document.getElementById("questionText");
const optionButtons = document.querySelectorAll(".option");
const questionNumber = document.getElementById("questionNumber");
const correctCount = document.getElementById("correctCount");
const wrongCount = document.getElementById("wrongCount");
const skippedCount = document.getElementById("skippedCount");
const timerElement = document.getElementById("timer");

// Load question
function loadQuestion() {
  const current = questions[currentQuestionIndex];
  questionText.textContent = current.text;

  optionButtons.forEach((btn, index) => {
    btn.textContent = `${String.fromCharCode(65 + index)}: ${current.options[index]}`;
    btn.dataset.answer = String.fromCharCode(65 + index);
    btn.disabled = false;
    btn.classList.remove("correct", "wrong");
  });

  questionNumber.textContent = currentQuestionIndex + 1;
  updateStats();
}

// Update stats display
function updateStats() {
  correctCount.textContent = score.correct;
  wrongCount.textContent = score.wrong;
  skippedCount.textContent = score.skipped;
}

// Select answer
function selectAnswer(selectedOption) {
  if (answered) return;

  const current = questions[currentQuestionIndex];
  const correct = current.correctAnswer;

  optionButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.answer === correct) {
      btn.classList.add("correct");
    } else if (btn.dataset.answer === selectedOption) {
      btn.classList.add("wrong");
    }
  });

  if (selectedOption === correct) {
    score.correct++;
  } else {
    score.wrong++;
  }

  answered = true;
  updateStats();
}

// Skip question
function skipQuestion() {
  score.skipped++;
  answered = true;
  updateStats();
  nextQuestion();
}

// Next question
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    answered = false;
    loadQuestion();
  } else {
    finishQuiz();
  }
}

// Finish quiz
function finishQuiz() {
  alert(`Ujian selesai!\nBenar: ${score.correct}\nSalah: ${score.wrong}\nAlpa: ${score.skipped}`);
  window.location.href = "result.html"; // Redirect ke halaman hasil
}

// Timer logic
function startTimer(duration) {
  let timer = duration * 60;
  const interval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (--timer < 0) {
      clearInterval(interval);
      finishQuiz();
    }
  }, 1000);
}

// Event Listeners
optionButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectAnswer(btn.dataset.answer);
  });
});

document.getElementById("skipBtn").addEventListener("click", skipQuestion);
document.getElementById("finishBtn").addEventListener("click", finishQuiz);

// Start quiz
window.onload = () => {
  loadQuestion();
  startTimer(90); // 90 menit
};
