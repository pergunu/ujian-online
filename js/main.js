let participantData = {};

document.getElementById("continueBtn").addEventListener("click", function () {
  const loginCodeInput = document.getElementById("loginCode");
  const enteredCode = loginCodeInput.value.trim();

  if (enteredCode === "12345") {
    document.querySelector(".opening-screen").classList.remove("active");
    document.querySelector(".opening-screen").style.display = "none";
    document.getElementById("termsSection").style.display = "block";
  } else {
    alert("Kode Login salah! Silakan coba lagi.");
    loginCodeInput.focus();
  }
});

document.getElementById("agreeTerms").addEventListener("change", function () {
  const nextBtn = document.getElementById("nextToForm");
  nextBtn.disabled = !this.checked;
});

document.getElementById("nextToForm").addEventListener("click", function () {
  document.getElementById("termsSection").style.display = "none";
  document.getElementById("participantForm").style.display = "block";
});

document.getElementById("status").addEventListener("change", function () {
  const selectedStatus = this.value;
  document.getElementById("pelajarFields").style.display = selectedStatus === "pelajar" ? "block" : "none";
  document.getElementById("umumFields").style.display = selectedStatus === "umum" ? "block" : "none";
});

document.getElementById("dataForm").addEventListener("submit", function (e) {
  e.preventDefault();

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

  participantData = {
    name,
    status,
    ...additionalData,
    timestamp: new Date().toLocaleString(),
  };

  localStorage.setItem("participantData", JSON.stringify(participantData));
  window.location.href = "quiz.html";
});

<script src="js/auth.js"></script>
