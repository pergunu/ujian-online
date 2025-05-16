// quiz.js

let questions = [];
let currentQuestionIndex = 0;
let score = { correct: 0, wrong: 0, skipped: 0 };
let answered = false;

// Ambil soal dari localStorage atau default
function loadQuestionsFromStorage() {
  const storedQuestions = JSON.parse(localStorage.getItem("questions")) || {
    pelajar: {
      ipa: { mudah: [], sedang: [], sulit: [] },
      ips: { mudah: [], sedang: [], sulit: [] }
    },
    umum: {
      logika: { mudah: [], sedang: [], sulit: [] }
    }
  };

  // Filter berdasarkan kategori peserta
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
