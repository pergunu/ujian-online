const participantData = JSON.parse(localStorage.getItem("participantData"));
const quizResult = JSON.parse(localStorage.getItem("quizResult")) || { correct: 0, wrong: 0, skipped: 0 };

const totalQuestions = quizResult.correct + quizResult.wrong + quizResult.skipped;
const percentage = totalQuestions > 0 ? Math.round((quizResult.correct / totalQuestions) * 100) : 0;

if (participantData) {
  document.getElementById("participantName").textContent = participantData.name.toUpperCase();
}

document.getElementById("scoreDisplay").textContent = `${percentage}%`;

const now = new Date();
const dateStr = now.getDate().toString().padStart(2, '0') +
                (now.getMonth() + 1).toString().padStart(2, '0') +
                now.getFullYear();

const uniqueCode = Math.random().toString(36).substring(2, 10).toUpperCase();
const categoryText = participantData.status === "pelajar" ? "PELAJAR" : "UMUM";
let subcategoryText = "";

if (participantData.status === "pelajar") {
  switch(participantData.pendidikan) {
    case "SD": subcategoryText = "SD"; break;
    case "SMP": subcategoryText = "SMP"; break;
    case "SMA": subcategoryText = "SMA"; break;
    case "SMK": subcategoryText = "SMK"; break;
  }
} else {
  subcategoryText = "UMUM";
}

const watermarkCode = `${participantData.name.toUpperCase()}/${categoryText}/${subcategoryText}/${dateStr}/${uniqueCode}/PERGUNU-STB`;
document.getElementById("watermarkCode").textContent = watermarkCode;

document.getElementById("certificateDate").textContent = `Ditetapkan di : Situbondo, ${now.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}`;

const messageElement = document.getElementById("resultsMessage");
if (percentage >= 80) {
  messageElement.innerHTML = `<p>SEMPURNA! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini!</p>`;
  playSound("applauseSound");
} else if (percentage >= 60) {
  messageElement.innerHTML = `<p>BAIK SEKALI! Anda memiliki pemahaman yang solid tentang materi ini.</p>`;
  playSound("applauseSound");
} else if (percentage >= 40) {
  messageElement.innerHTML = `<p>CUKUP BAIK. Tingkatkan lagi belajarnya!</p>`;
} else {
  messageElement.innerHTML = `<p>TERUS BERLATIH! Setiap kesalahan adalah kesempatan untuk belajar lebih baik lagi.</p>`;
}

function playSound(soundId) {
  const sound = document.getElementById(soundId);
  try {
    sound.currentTime = 0;
    sound.play();
  } catch (e) {
    console.error("Gagal memainkan suara:", e);
  }
}

document.getElementById("printBtn").addEventListener("click", () => {
  window.print();
});

<script src="js/auth.js"></script>
