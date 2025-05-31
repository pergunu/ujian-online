// Fungsi untuk mengakses panel admin
function accessAdminPanel() {
  const adminCode = document.getElementById('adminAccessCode').value;
  const defaultAdminCode = "65614222";
  const storedAdminCode = localStorage.getItem('adminCode') || defaultAdminCode;
  
  if (adminCode === storedAdminCode) {
    document.getElementById('bankContent').classList.add('hidden');
    document.getElementById('adminContent').classList.remove('hidden');
    loadAdminPanel();
    playSound('buttonAudio');
  } else {
    showMessage("Error", "Kode admin salah. Silakan coba lagi.");
    playSound('wrongAudio');
  }
}

// Fungsi untuk memuat panel admin
function loadAdminPanel() {
  // Load current settings
  document.getElementById('currentLoginCode').value = 
    localStorage.getItem('accessCode') || "12345";
  document.getElementById('currentExamCode').value = 
    localStorage.getItem('cpnsCode') || "OPENLOCK-1945";
  document.getElementById('currentBankCode').value = 
    localStorage.getItem('bankCode') || "OPENLOCK-1926";
  document.getElementById('currentAdminCode').value = 
    localStorage.getItem('adminCode') || "65614222";
    
  // Load other settings
  document.getElementById('greetingTextInput').value = 
    localStorage.getItem('greetingText') || "Sistem Ujian Online oleh Pergunu Situbondo";
  document.getElementById('chairmanNameInput').value = 
    localStorage.getItem('chairmanName') || "Moh. Nuril Hudha, S.Pd., M.Si.";
  
  // Load exam settings
  document.getElementById('examTimerInput').value = 
    localStorage.getItem('examDuration') || "120";
  document.getElementById('questionLimitInput').value = 
    localStorage.getItem('questionLimit') || "10";
  document.getElementById('pointSystemInput').value = 
    localStorage.getItem('pointSystem') || "1";
  
  // Load motivation texts
  const motivationTexts = JSON.parse(localStorage.getItem('motivationTexts')) || {
    perfect: "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.",
    excellent: "Luar biasa! Anda telah menunjukkan pemahaman yang mendalam.",
    good: "Bagus! Hasil yang cukup memuaskan, tetap semangat belajar!",
    average: "Cukup baik. Masih ada ruang untuk peningkatan.",
    poor: "Perlu peningkatan. Silakan pelajari kembali materinya."
  };
  
  document.getElementById('motivationPerfect').value = motivationTexts.perfect;
  document.getElementById('motivationExcellent').value = motivationTexts.excellent;
  document.getElementById('motivationGood').value = motivationTexts.good;
  document.getElementById('motivationAverage').value = motivationTexts.average;
  document.getElementById('motivationPoor').value = motivationTexts.poor;
}

// Fungsi untuk menyimpan pengaturan admin
function saveAdminSettings(section) {
  switch(section) {
    case 'login':
      localStorage.setItem('accessCode', document.getElementById('newLoginCode').value);
      break;
    case 'exam':
      localStorage.setItem('cpnsCode', document.getElementById('newExamCode').value);
      break;
    // Dan seterusnya untuk semua pengaturan
  }
  
  showMessage("Sukses", "Pengaturan berhasil disimpan");
  playSound('correctAudio');
}
