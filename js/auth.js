// Definisi password default
const defaultCredentials = {
  peserta: "12345",
  admin: "65614222",
  bankSoal: "BANKSOAL-OPENLOCK"
};

let currentUser = null;

// Fungsi login user berdasarkan role
function login(role) {
  const inputPassword = document.getElementById(`password-${role}`).value;
  const correctPassword = defaultCredentials[role];

  if (inputPassword === correctPassword) {
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
      window.location.href = "index.html";
      break;
    case "admin":
      window.location.href = "admin.html";
      break;
    case "bankSoal":
      window.location.href = "bank-soal.html";
      break;
    default:
      alert("Role tidak dikenali.");
  }
}

// Cek otomatis saat halaman dimuat
function checkAuth() {
  currentUser = localStorage.getItem("currentUser");
  const currentPath = window.location.pathname.split("/").pop();

  // Jika bukan login.html dan belum login → redirect
  if (!["login.html", ""].includes(currentPath) && !currentUser) {
    window.location.href = "login.html";
  }

  // Jika sudah login dan di login.html → arahkan ke dashboard
  if (currentPath === "login.html" && currentUser) {
    redirectToDashboard(currentUser);
  }

  // Validasi akses halaman
  if (currentPath === "admin.html" && currentUser !== "admin") {
    logout();
  }

  if ((currentPath === "bank-soal.html") && currentUser !== "bankSoal") {
    logout();
  }

  if (["index.html", "quiz.html", "result.html"].includes(currentPath) && currentUser !== "peserta") {
    logout();
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
<script src="js/auth.js"></script>
