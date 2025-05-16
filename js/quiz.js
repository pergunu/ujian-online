// Variabel global
let questions = [];
let currentQuestionIndex = 0;
let score = { correct: 0, wrong: 0, skipped: 0 };
let answered = false;

// Fungsi: Muat soal dari localStorage atau default
function loadQuestionsFromStorage() {
  const storedQuestions = JSON.parse(localStorage.getItem("questions")) || {
    pelajar: {
      ipa: { mudah: [], sedang: [], sulit: [] },
      ips: { mudah: [], sedang: [], sulit: [] },
      matematika: { mudah: [], sedang: [], sulit: [] },
      agama: { mudah: [], sedang: [], sulit: [] },
      ppkn: { mudah: [], sedang: [], sulit: [] },
      sejarah: { mudah: [], sedang: [], sulit: [] },
      bahasa_indonesia: { mudah: [], sedang: [], sulit: [] },
      bahasa_inggris: { mudah: [], sedang: [], sulit: [] }
    },
    umum: {
      logika: { mudah: [], sedang: [], sulit: [] }
    }
  };

  localStorage.setItem("quizResult", JSON.stringify(score));
window.location.href = "result.html";

  // Ambil data peserta
  const participantData = JSON.parse(localStorage.getItem("participantData"));
  let category = "pelajar";
  if (participantData && participantData.status === "umum") {
    category = "umum";
  }

  // Gabung semua soal dari semua level dalam subkategori terpilih
  for (const subcategory in storedQuestions[category]) {
    for (const level in storedQuestions[category][subcategory]) {
      questions = questions.concat(storedQuestions[category][subcategory][level]);
    }
  }

  // Acak urutan soal
  questions.sort(() => Math.random() - 0.5);
}

// Fungsi: Tampilkan soal
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

// Fungsi: Pilih jawaban
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

// Fungsi: Lewati soal
function skipQuestion() {
  score.skipped++;
  answered = true;
  updateStats();
  nextQuestion();
}

// Fungsi: Next question
function nextQuestion() {
  currentQuestionIndex++;
  answered = false;
  loadQuestion();
}

// Fungsi: Selesaikan ujian
function finishQuiz() {
  clearInterval(timer); // Hentikan timer jika masih berjalan
  localStorage.setItem("quizResult", JSON.stringify(score));
  window.location.href = "result.html";
}

// Fungsi: Update statistik UI
function updateStats() {
  document.getElementById("correctCount").textContent = score.correct;
  document.getElementById("wrongCount").textContent = score.wrong;
  document.getElementById("skippedCount").textContent = score.skipped;
}

// Fungsi: Mulai timer
let timer;
function startTimer(duration) {
  let timer = duration * 60;
  const interval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    document.getElementById("timer").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (--timer < 0) {
      clearInterval(interval);
      finishQuiz();
    }
  }, 1000);
}

// Inisialisasi saat halaman dimuat
window.onload = () => {
  loadQuestionsFromStorage();
  if (questions.length === 0) {
    alert("Tidak ada soal tersedia. Silakan tambahkan soal di Bank Soal.");
    window.location.href = "bank-soal.html";
    return;
  }
  loadQuestion();
  startTimer(90); // 90 menit
};
