let adminPassword = "65614222";
let quizEnabledCategories = { pelajar: true, umum: true };
let quizTimerDuration = 90;

// DOM Elements
const adminLogin = document.getElementById("adminLogin");
const adminPanel = document.getElementById("adminPanel");
const adminOverlay = document.getElementById("adminOverlay");

document.getElementById("adminBtn").addEventListener("click", () => {
  adminOverlay.style.display = "block";
  adminLogin.style.display = "block";
});

adminOverlay.addEventListener("click", () => {
  adminOverlay.style.display = "none";
  adminLogin.style.display = "none";
  adminPanel.style.display = "none";
});

document.getElementById("adminLoginBtn").addEventListener("click", () => {
  const enteredPass = document.getElementById("adminPassword").value;
  if (enteredPass === adminPassword) {
    adminLogin.style.display = "none";
    adminPanel.style.display = "block";
  } else {
    alert("Password salah!");
  }
});

// Change Password
document.getElementById("changePasswordBtn").addEventListener("click", () => {
  const currentPass = document.getElementById("currentPassword").value;
  const newPass = document.getElementById("newPassword").value;
  const confirmPass = document.getElementById("confirmPassword").value;

  if (currentPass !== adminPassword) {
    alert("Password lama salah!");
    return;
  }

  if (newPass !== confirmPass) {
    alert("Password baru tidak cocok!");
    return;
  }

  adminPassword = newPass;
  alert("Password berhasil diubah!");
  document.getElementById("currentPassword").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("confirmPassword").value = "";
});

// Toggle Categories
function updateToggleButtons() {
  document.getElementById("enablePelajarBtn").style.display = quizEnabledCategories.pelajar ? "none" : "inline-block";
  document.getElementById("disablePelajarBtn").style.display = quizEnabledCategories.pelajar ? "inline-block" : "none";

  document.getElementById("enableUmumBtn").style.display = quizEnabledCategories.umum ? "none" : "inline-block";
  document.getElementById("disableUmumBtn").style.display = quizEnabledCategories.umum ? "inline-block" : "none";
}

document.getElementById("enablePelajarBtn").addEventListener("click", () => {
  quizEnabledCategories.pelajar = true;
  updateToggleButtons();
});

document.getElementById("disablePelajarBtn").addEventListener("click", () => {
  quizEnabledCategories.pelajar = false;
  updateToggleButtons();
});

document.getElementById("enableUmumBtn").addEventListener("click", () => {
  quizEnabledCategories.umum = true;
  updateToggleButtons();
});

document.getElementById("disableUmumBtn").addEventListener("click", () => {
  quizEnabledCategories.umum = false;
  updateToggleButtons();
});

updateToggleButtons();

// Save Timer Duration
document.getElementById("saveTimerBtn").addEventListener("click", () => {
  const duration = parseInt(document.getElementById("timerDuration").value);
  if (!isNaN(duration) && duration >= 10) {
    quizTimerDuration = duration;
    alert(`Durasi ujian diatur menjadi ${duration} menit`);
  } else {
    alert("Masukkan durasi yang valid (minimal 10 menit)");
  }
});

// Add Question
document.getElementById("addQuestionBtn").addEventListener("click", () => {
  const questionText = document.getElementById("newQuestionText").value.trim();
  const optionA = document.getElementById("optionA").value.trim();
  const optionB = document.getElementById("optionB").value.trim();
  const optionC = document.getElementById("optionC").value.trim();
  const optionD = document.getElementById("optionD").value.trim();
  const optionE = document.getElementById("optionE").value.trim();
  const correctAnswer = document.getElementById("correctAnswer").value.trim().toUpperCase();

  if (!questionText || !optionA || !optionB || !optionC || !optionD || !optionE || !correctAnswer) {
    alert("Semua field harus diisi!");
    return;
  }

  const newQuestion = {
    text: questionText,
    options: [optionA, optionB, optionC, optionD, optionE],
    correctAnswer: correctAnswer
  };

  // Save to localStorage or global variable
  let questions = JSON.parse(localStorage.getItem("customQuestions")) || [];
  questions.push(newQuestion);
  localStorage.setItem("customQuestions", JSON.stringify(questions));

  alert("Soal baru berhasil ditambahkan!");

  // Clear form
  document.getElementById("newQuestionText").value = "";
  document.getElementById("optionA").value = "";
  document.getElementById("optionB").value = "";
  document.getElementById("optionC").value = "";
  document.getElementById("optionD").value = "";
  document.getElementById("optionE").value = "";
  document.getElementById("correctAnswer").value = "";
});
<script src="js/auth.js"></script>
