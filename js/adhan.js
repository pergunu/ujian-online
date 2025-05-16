// Fungsi untuk memainkan suara adzan saat waktu sholat tiba
function playAdhan() {
  const adhanSound = document.getElementById("adhanSound");
  const quizMusic = document.getElementById("quizMusic");

  // Hentikan musik latar
  if (!quizMusic.paused) {
    quizMusic.pause();
  }

  // Mainkan adzan
  adhanSound.currentTime = 0;
  adhanSound.play().catch(err => console.log("Gagal memainkan adzan:", err));

  // Tampilkan overlay
  document.getElementById("adhanOverlay").style.display = "flex";

  // Setelah adzan selesai (misalnya durasi 60 detik), sembunyikan overlay
  setTimeout(() => {
    closeAdhanOverlay();
  }, 60000); // Durasi adzan (sesuaikan dengan durasi file mp3 Anda)
}

<script src="js/auth.js"></script>
// Tutup overlay adzan
function closeAdhanOverlay() {
  const adhanOverlay = document.getElementById("adhanOverlay");
  const quizMusic = document.getElementById("quizMusic");

  adhanOverlay.style.display = "none";

  // Lanjutkan musik jika sedang diputar
  if (!quizMusic.paused) {
    quizMusic.play().catch(err => console.log("Gagal melanjutkan musik:", err));
  }
}

// Deteksi waktu sholat secara manual (contoh simulasi)
function checkPrayerTimeAndPlayAdhan() {
  const now = new Date();

  // Simulasi waktu adzan (ganti dengan waktu nyata nanti)
  const prayerTimes = {
    subuh: "04:30",
    dzuhur: "11:45",
    ashar: "15:00",
    maghrib: "17:30",
    isya: "19:00"
  };

  const currentTime = now.toTimeString().slice(0, 5); // Format HH:mm

  for (const [_, time] of Object.entries(prayerTimes)) {
    if (currentTime === time) {
      playAdhan();
      break;
    }
  }
}

// Jalankan pengecekan setiap menit
setInterval(checkPrayerTimeAndPlayAdhan, 60000);

// Cek saat halaman dimuat juga
window.addEventListener("load", () => {
  checkPrayerTimeAndPlayAdhan(); // Cek langsung saat halaman dimuat
});
