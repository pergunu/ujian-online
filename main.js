
let questions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let totalAnswered = 0;
let quizStartTime = Date.now();

const responsesCorrect = [
  "Woooww.. kamu pandai!", "Kamu jenius sekali!", "Wiihh saya jadi iri, kamu sangat cerdas!",
  "Wah kamu anak siapa sih kok jenius?", "Kerennn, kamu luar biasa!"
];

const responsesWrong = [
  "Waaah kamu salah..", "Waduh hampir benar nih...", "Yaaah coba lagi yaa...",
  "Ups, belum tepat!", "Belum beruntung, ayo semangat!"
];

function startQuiz() {
  correctAnswers = 0;
  totalAnswered = 0;
  currentQuestionIndex = 0;
  questions = generateQuestions(100); // generate dummy questions
  document.getElementById("quizContainer").style.display = "block";
  document.getElementById("result").style.display = "none";
  showQuestion();
}

function generateQuestions(count) {
  let result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      question: `Contoh soal ke-${i+1}?`,
      options: ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
      answer: "Pilihan A"
    });
  }
  return result;
}

function showQuestion() {
  if (currentQuestionIndex >= questions.length || (Date.now() - quizStartTime > 4 * 60 * 60 * 1000)) {
    endQuiz();
    return;
  }

  const q = questions[currentQuestionIndex];
  document.getElementById("question").innerText = q.question;
  document.getElementById("options").innerHTML = "";
  document.getElementById("feedback").innerText = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.className = "option-button";
    btn.onclick = () => checkAnswer(option);
    document.getElementById("options").appendChild(btn);
  });
}

function checkAnswer(selected) {
  totalAnswered++;
  const correct = questions[currentQuestionIndex].answer;
  const isCorrect = selected === correct;

  document.getElementById("feedback").innerText =
    isCorrect ? responsesCorrect[Math.floor(Math.random() * responsesCorrect.length)]
              : responsesWrong[Math.floor(Math.random() * responsesWrong.length)];

  if (isCorrect) correctAnswers++;

  setTimeout(() => {
    currentQuestionIndex++;
    showQuestion();
  }, 1000);
}

function resetQuestion() {
  totalAnswered++;
  currentQuestionIndex++;
  showQuestion();
}

function endQuiz() {
  const score = Math.round((correctAnswers / totalAnswered) * 100);
  document.getElementById("quizContainer").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("resultText").innerText = `Skor kamu: ${score}% dari ${totalAnswered} soal.`;
}
