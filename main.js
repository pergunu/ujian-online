
let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = [];
let startTime = null;
let totalQuestionsLimit = 100;
let questions = [];

function startQuiz() {
  const category = document.getElementById("categorySelect").value;
  const level = document.getElementById("levelSelect").value;
  const schoolLevel = document.getElementById("schoolLevelSelect")?.value || "";
  
  currentQuestionIndex = 0;
  score = 0;
  answeredQuestions = [];
  startTime = new Date();
  document.getElementById("quizContainer").style.display = "block";
  document.getElementById("result").style.display = "none";

  fetchQuestions(category, level, schoolLevel);
}

function fetchQuestions(category, level, schoolLevel) {
  const sampleQuestions = [
    {
      question: "Apa ibukota Indonesia?",
      options: ["Jakarta", "Surabaya", "Medan", "Bandung"],
      answer: "Jakarta"
    },
    {
      question: "2 + 2 = ?",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      question: "Sila pertama Pancasila adalah?",
      options: ["Kemanusiaan", "Ketuhanan", "Persatuan", "Keadilan"],
      answer: "Ketuhanan"
    }
  ];
  questions = sampleQuestions;
  displayQuestion();
}

function displayQuestion() {
  if (answeredQuestions.length >= totalQuestionsLimit) {
    endQuiz();
    return;
  }

  const questionData = questions[currentQuestionIndex];
  if (!questionData) {
    endQuiz();
    return;
  }

  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  questionElement.innerText = questionData.question;
  optionsElement.innerHTML = "";
  questionData.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => selectAnswer(opt);
    btn.className = "option-button";
    optionsElement.appendChild(btn);
  });
}

function selectAnswer(selected) {
  const correct = questions[currentQuestionIndex].answer;
  if (selected === correct) {
    score++;
  }
  answeredQuestions.push(currentQuestionIndex);
  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    currentQuestionIndex = 0;
  }
  displayQuestion();
}

function endQuiz() {
  document.getElementById("quizContainer").style.display = "none";
  document.getElementById("result").style.display = "block";
  const percent = (score / answeredQuestions.length * 100).toFixed(2);
  document.getElementById("resultText").innerText = `Skor Kamu: ${score} dari ${answeredQuestions.length} soal ( ${percent}% benar )`;
  currentQuestionIndex = 0;
  score = 0;
  answeredQuestions = [];
  startTime = null;
  questions = [];
}

function checkQuizTimeLimit() {
  if (!startTime) return;
  const now = new Date();
  const elapsedMs = now - startTime;
  const maxTime = 4 * 60 * 60 * 1000;
  if (elapsedMs > maxTime) {
    endQuiz();
  }
}

setInterval(checkQuizTimeLimit, 30000);
