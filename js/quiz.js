let questions = [];
let currentQuestionIndex = 0;
let score = { correct: 0, wrong: 0, skipped: 0 };
let answered = false;

function loadQuestionsFromStorage() {
  const storedQuestions = JSON.parse(localStorage.getItem("questions")) || {
    pelajar: {
      ipa: { mudah: [], sedang: [], sulit: [] },
      ips: { mudah: [], sedang: [], sulit: [] }
    },
    umum: {
      logika: { mudah: [], sedang: [], sulit: [] }
    }
  };

  const participantData = JSON.parse(localStorage.getItem("participantData"));
  let category = "pelajar";
  if (participantData && participantData.status === "umum") {
    category = "umum";
  }

  for (const subcategory in storedQuestions[category]) {
    for (const level in storedQuestions[category][subcategory]) {
      questions = questions.concat(storedQuestions[category][subcategory][level]);
    }
  }

  questions.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    finishQuiz();
    return;
  }

  const current = questions[currentQuestionIndex];
  if (!current) {
    alert("Soal tidak tersedia.");
    finishQuiz();
    return;
  }

  document.getElementById("questionText").textContent = current.question;
  const optionsContainer = document.querySelectorAll(".option");

  optionsContainer.forEach((btn, index) => {
    btn.textContent = `${String.fromCharCode(65 + index)}: ${current.options[index]}`;
    btn.dataset.answer = String.fromCharCode(65 + index);
    btn.disabled = false;
    btn.classList.remove("correct", "wrong");
  });

  document.getElementById("questionNumber").textContent = currentQuestionIndex + 1;
}

function selectAnswer(selectedOption) {
  if (answered) return;

  const current = questions[currentQuestionIndex];
  const correct = current.correctAnswer;

  document.querySelectorAll(".option").forEach(btn => {
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

function skipQuestion() {
  score.skipped++;
  answered = true;
  updateStats();
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  answered = false;
  loadQuestion();
}

function finishQuiz() {
  clearInterval(timer);
  localStorage.setItem("quizResult", JSON.stringify(score));
  window.location.href = "result.html";
}

function updateStats() {
  document.getElementById("correctCount").textContent = score.correct;
  document.getElementById("wrongCount").textContent = score.wrong;
  document.getElementById("skippedCount").textContent = score.skipped;
}

let timer;
function startTimer(duration) {
  let time = duration * 60;
  timer = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById("timer").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (--time < 0) {
      clearInterval(timer);
      finishQuiz();
    }
  }, 1000);
}

window.onload = () => {
  loadQuestionsFromStorage();
  if (questions.length === 0) {
    alert("Tidak ada soal tersedia. Silakan tambahkan soal di Bank Soal.");
    window.location.href = "bank-soal.html";
    return;
  }
  loadQuestion();
  startTimer(90);
};
