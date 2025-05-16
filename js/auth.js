// Definisi password default
const defaultCredentials = {
  peserta: "12345", // KODE LOGIN
  admin: "65614222", // KODE ADMIN
  bankSoal: "BANKSOAL-OPENLOCK" // KODE BANK SOAL
};

let currentUser = null;

// Fungsi login user berdasarkan role
function login(role) {
  const inputPassword = document.getElementById(`password-${role}`).value;
  const correctPassword = defaultCredentials[role];

  if (inputPassword === correctPassword) {
    currentUser = role;
    localStorage.setItem("currentUser", role);
    redirectToDashboard(role);
  } else {
    alert("Password salah!");
  }
}

// Redirect sesuai role
function redirectToDashboard(role) {
  switch (role) {
    case "peserta":
      window.location.href = "index.html"; // Halaman utama peserta
      break;
    case "admin":
      window.location.href = "admin.html"; // Admin panel
      break;
    case "bankSoal":
      window.location.href = "bank-soal.html"; // Bank soal
      break;
    default:
      alert("Role tidak dikenali.");
  }
}

// Cek apakah pengguna sudah login
function checkAuth() {
  currentUser = localStorage.getItem("currentUser");
  if (!window.location.pathname.includes("login.html") && !currentUser) {
    window.location.href = "login.html";
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
