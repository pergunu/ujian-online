let currentQuestionIndex = 0;
let score = 0;
let questions = [
  {
    question: "Apa ibu kota Indonesia?",
    options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
    answer: "Jakarta"
  },
  {
    question: "Siapa penemu lampu pijar?",
    options: ["Albert Einstein", "Thomas Edison", "Isaac Newton", "Galileo"],
    answer: "Thomas Edison"
  }
];

function startQuiz() {
  document.getElementById('quizContainer').style.display = 'block';
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  let q = questions[currentQuestionIndex];
  document.getElementById('question').innerText = q.question;
  let optionsHTML = "";
  q.options.forEach(opt => {
    optionsHTML += `<button class='option-button' onclick='checkAnswer("${opt}")'>${opt}</button>`;
  });
  document.getElementById('options').innerHTML = optionsHTML;
}

function checkAnswer(selected) {
  const correct = questions[currentQuestionIndex].answer;
  const feedback = document.getElementById("feedback");
  if (selected === correct) {
    feedback.innerText = "Wah kamu benar! Kamu cerdas! 🎉";
    score++;
  } else {
    feedback.innerText = "Wah salah... Jawaban yang benar adalah: " + correct;
  }
}

function resetQuestion() {
  currentQuestionIndex++;
  document.getElementById("feedback").innerText = "";
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  document.getElementById("quizContainer").style.display = "none";
  const resultText = `Kuis selesai! Skormu: ${score}/${questions.length}`;
  document.getElementById("resultText").innerText = resultText;
  document.getElementById("result").style.display = "block";
}