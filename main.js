let questions = [
  {
    question: "Siapa Presiden Indonesia?",
    options: ["Joko Widodo", "B.J. Habibie", "Soekarno", "Soeharto"],
    correct: 0
  },
  {
    question: "Apa ibukota Indonesia?",
    options: ["Jakarta", "Surabaya", "Bali", "Yogyakarta"],
    correct: 0
  },
  {
    question: "Berapa banyak provinsi di Indonesia?",
    options: ["34", "32", "33", "35"],
    correct: 0
  },
  // Tambahkan pertanyaan lainnya sesuai kebutuhan
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60 * 5; // 5 menit
let totalQuestions = questions.length;
let quizStarted = false;

// Menambahkan timer untuk salat (notifikasi)
function addSalatNotification() {
  const salatTimes = ["Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];
  setInterval(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour === 4) {
      alert(`Waktu Salat: ${salatTimes[0]}`);
    }
    if (currentHour === 12) {
      alert(`Waktu Salat: ${salatTimes[1]}`);
    }
    if (currentHour === 15) {
      alert(`Waktu Salat: ${salatTimes[2]}`);
    }
    if (currentHour === 18) {
      alert(`Waktu Salat: ${salatTimes[3]}`);
    }
    if (currentHour === 20) {
      alert(`Waktu Salat: ${salatTimes[4]}`);
    }
  }, 3600000); // Cek setiap jam
}

function startQuiz() {
  quizStarted = true;
  document.getElementById("startBtn").style.display = "none";
  showQuestion();
  startTimer();
  document.getElementById("quizContainer").style.display = "block";
  addSalatNotification(); // Menambahkan notifikasi salat
}

function showQuestion() {
  const questionObj = questions[currentQuestionIndex];
  document.getElementById("question").innerText = questionObj.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";

  questionObj.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.innerText = option;
    optionButton.onclick = function () { checkAnswer(index) };
    optionsContainer.appendChild(optionButton);
  });
}

function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correct;
  if (selectedAnswer === correctAnswer) {
    score++;
    displayFeedback("Jawaban benar!");
  } else {
    displayFeedback(`Jawaban salah. Kunci: ${questions[currentQuestionIndex].options[correctAnswer]}`);
  }
}

function displayFeedback(message) {
  const feedbackElement = document.getElementById("feedback");
  feedbackElement.innerText = message;
  document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
  if (currentQuestionIndex < totalQuestions - 1) {
    currentQuestionIndex++;
    showQuestion();
    document.getElementById("nextBtn").style.display = "none";
  } else {
    showResult();
  }
}

function showResult() {
  const resultElement = document.getElementById("result");
  const resultTextElement = document.getElementById("resultText");
  resultTextElement.innerText = `Skor Anda: ${score}/${totalQuestions}`;
  let moralMessage = "";

  if (score <= totalQuestions * 0.25) {
    moralMessage = "Jangan menyerah, belajar lebih giat!";
  } else if (score <= totalQuestions * 0.5) {
    moralMessage = "Baik, tapi masih bisa lebih baik lagi!";
  } else if (score <= totalQuestions * 0.75) {
    moralMessage = "Bagus, Anda cukup paham!";
  } else {
    moralMessage = "Hebat! Anda luar biasa!";
  }

  document.getElementById("moralMessage").innerText = moralMessage;
  resultElement.style.display = "block";
}

function startTimer() {
  timer = setInterval(function () {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

document.getElementById("startBtn").onclick = startQuiz;
document.getElementById("nextBtn").onclick = nextQuestion;
