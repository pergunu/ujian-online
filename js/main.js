// Variabel untuk menyimpan data peserta
let participantData = {};

// 1. Event listener untuk tombol "Lanjutkan" di Opening Screen
document.getElementById("continueBtn").addEventListener("click", function () {
  const loginCodeInput = document.getElementById("loginCode");
  const enteredCode = loginCodeInput.value.trim();

  // Kode default: 12345
  if (enteredCode === "12345") {
    document.querySelector(".opening-screen").classList.remove("active");
    document.querySelector(".opening-screen").style.display = "none";
    document.getElementById("termsSection").style.display = "block";
  } else {
    alert("Kode Login salah! Silakan coba lagi.");
    loginCodeInput.focus();
  }
});

// 2. Checkbox syarat & ketentuan
document.getElementById("agreeTerms").addEventListener("change", function () {
  const nextBtn = document.getElementById("nextToForm");
  nextBtn.disabled = !this.checked;
});

document.getElementById("nextToForm").addEventListener("click", function () {
  document.getElementById("termsSection").style.display = "none";
  document.getElementById("participantForm").style.display = "block";
});

// 3. Toggle field Pelajar / Umum
document.getElementById("status").addEventListener("change", function () {
  const selectedStatus = this.value;
  document.getElementById("pelajarFields").style.display = selectedStatus === "pelajar" ? "block" : "none";
  document.getElementById("umumFields").style.display = selectedStatus === "umum" ? "block" : "none";
});

// 4. Submit form data peserta
document.getElementById("dataForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Ambil semua input
  const name = document.getElementById("name").value.trim();
  const status = document.getElementById("status").value;
  let additionalData = {};

  if (status === "pelajar") {
    additionalData = {
      pendidikan: document.getElementById("pendidikan").value,
      sekolah: document.getElementById("sekolah").value.trim(),
      nis: document.getElementById("nis").value.trim(),
      tujuan_pelajar: document.getElementById("tujuan_pelajar").value,
    };
  } else if (status === "umum") {
    additionalData = {
      alamat: document.getElementById("alamat").value.trim(),
      wa: document.getElementById("wa").value.trim(),
      email: document.getElementById("email").value.trim(),
      tujuan_umum: document.getElementById("tujuan_umum").value,
    };
  }

  // Simpan ke objek participantData
  participantData = {
    name,
    status,
    ...additionalData,
    timestamp: new Date().toLocaleString(),
  };

  // Tampilkan ke console (untuk debugging)
  console.log("Data Peserta:", participantData);

  // Simpan ke localStorage (opsional)
  localStorage.setItem("participantData", JSON.stringify(participantData));

  // Lanjut ke menu kategori soal
  window.location.href = "quiz.html"; // Redirect ke halaman ujian selanjutnya
});
