// main.js

// Data soal dummy (nanti bisa diintegrasikan ke AI/Database)
const soalDatabase = {
  umum: [...Array(20)].map((_, i) => ({
    question: `Soal Umum ke-${i + 1}`,
    options: ["A: Pilihan 1", "B: Pilihan 2", "C: Pilihan 3", "D: Pilihan 4"],
    correct: Math.floor(Math.random() * 4),
    explanation: "Penjelasan soal umum."
  })),
  bindo: [...Array(20)].map((_, i) => ({
    question: `Soal Bahasa Indonesia ke-${i + 1}`,
    options: ["Sinonim", "Antonim", "Majas", "Kalimat Efektif"],
    correct: Math.floor(Math.random() * 4),
    explanation: "Penjelasan Bahasa Indonesia."
  })),
  // Tambah kategori lain seperti bing, matematika, sejarah, ipa, ips, agama, ppkn
};

let soalSaatIni = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60 * 60; // 60 menit dalam detik
let answeredQuestions = [];

const feedbackPositif = [
  "Keren!", "Jawabanmu mantap!", "Pinter banget kamu!", "WOW, tepat sekali!"
];
const feedbackNegatif = [
  "Yah, salah. Tetap semangat!", "Hampir benar kok!", "Coba lagi ya!", "Ups, belum tepat!"];

function mulaiKuis() {
  const kategori = document.getElementById("category").value;
  const tingkat = document.getElementById("level").value;
  const kesulitan = document.getElementById("difficulty").value;

  soalSaatIni = generateQuestions(kategori, tingkat, kesulitan);
  shuffleArray(soalSaatIni);
  currentQuestionIndex = 0;
  score = 0;
  answeredQuestions = [];

  document.getElementById("setup").style.display = "none";
  document.getElementById("quizContainer").style.display = "block";

  tampilkanSoal();
  mulaiTimer();
  notifikasiAdzan();
}

function generateQuestions(category, level, difficulty) {
  let source = soalDatabase[category] || soalDatabase["umum"];
  return [...source];
}

function tampilkanSoal() {
  if (currentQuestionIndex >= soalSaatIni.length || answeredQuestions.length >= 100) {
    selesaiKuis();
    return;
  }

  const soal = soalSaatIni[currentQuestionIndex];
  document.getElementById("question").innerText = soal.question;

  const opsi = document.getElementById("options");
  opsi.innerHTML = "";
  soal.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "option-btn";
    btn.onclick = () => periksaJawaban(idx);
    opsi.appendChild(btn);
  });

  document.getElementById("feedback").innerHTML = "";
}

function periksaJawaban(pilihan) {
  const soal = soalSaatIni[currentQuestionIndex];
  const feedback = document.getElementById("feedback");

  if (pilihan === soal.correct) {
    score++;
    feedback.innerText = feedbackPositif[Math.floor(Math.random() * feedbackPositif.length)];
  } else {
    feedback.innerHTML = feedbackNegatif[Math.floor(Math.random() * feedbackNegatif.length)] + `<br><strong>Kunci Jawaban:</strong> ${soal.options[soal.correct]}<br><em>${soal.explanation}</em>`;
  }

  answeredQuestions.push(currentQuestionIndex);
  document.getElementById("nextBtn").style.display = "block";
}

function soalBerikutnya() {
  currentQuestionIndex++;
  document.getElementById("nextBtn").style.display = "none";
  tampilkanSoal();
}

function mulaiTimer() {
  timer = setInterval(() => {
    timeLeft--;
    const menit = Math.floor(timeLeft / 60);
    const detik = timeLeft % 60;
    document.getElementById("timer").innerText = `${menit}:${detik < 10 ? '0' + detik : detik}`;

    document.getElementById("progressBar").style.width = `${100 - (timeLeft / (60 * 60)) * 100}%`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      selesaiKuis();
    }
  }, 1000);
}

function selesaiKuis() {
  clearInterval(timer);
  document.getElementById("quizContainer").style.display = "none";
  document.getElementById("result").style.display = "block";

  const nilaiAkhir = Math.round((score / answeredQuestions.length) * 100);
  document.getElementById("resultText").innerText = `Skor Anda: ${nilaiAkhir}%`;

  let pesan = "";
  if (nilaiAkhir <= 25) pesan = "Tetap semangat, belajar dari kesalahan itu keren!";
  else if (nilaiAkhir <= 50) pesan = "Bagus! Sedikit lagi menuju sukses!";
  else if (nilaiAkhir <= 75) pesan = "Keren! Pemahamanmu hebat!";
  else pesan = "LUAR BIASA! Kamu benar-benar ahli!";

  document.getElementById("moralMessage").innerText = pesan;
}

function resetSoal() {
  shuffleArray(soalSaatIni);
  currentQuestionIndex = 0;
  score = 0;
  answeredQuestions = [];
  tampilkanSoal();
}

function notifikasiAdzan() {
  const audio = document.getElementById("adzanAudio");
  setInterval(() => {
    const jam = new Date().getHours();
    if ([4, 12, 15, 18, 19].includes(jam)) {
      alert("Waktu Sholat Telah Tiba. Mari kita beribadah!");
      audio.play();
    }
  }, 3600000);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

document.getElementById("startBtn").onclick = mulaiKuis;
document.getElementById("nextBtn").onclick = soalBerikutnya;
document.getElementById("resetBtn").onclick = resetSoal;
document.getElementById("restartBtn").onclick = () => location.reload();
