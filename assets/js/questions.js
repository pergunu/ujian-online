// Bank soal untuk semua kategori
const questionBank = {
  agama: [
    {
      question: "Berapakah jumlah Rukun Islam?",
      options: ["4", "5", "6", "7"],
      answer: 1,
      explanation: "Rukun Islam ada 5 yaitu: Syahadat, Shalat, Zakat, Puasa, dan Haji."
    }
    // Tambahkan soal lainnya
  ],
  ppkn: [
    {
      question: "Pancasila sebagai dasar negara tercantum dalam?",
      options: ["Pembukaan UUD 1945", "Batang Tubuh UUD 1945", "Penjelasan UUD 1945", "Keputusan Presiden"],
      answer: 0,
      explanation: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat."
    }
    // Tambahkan soal lainnya
  ],
  // Tambahkan kategori lainnya
};

// Fungsi untuk memuat soal berdasarkan kategori
function loadQuestions(category) {
  if (!questionBank[category]) {
    showMessage("Error", "Kategori soal tidak ditemukan");
    return;
  }
  
  // Acak urutan soal jika setting acak aktif
  const shouldShuffle = localStorage.getItem('shuffleQuestions') === 'true';
  let questions = shouldShuffle ? shuffleArray(questionBank[category]) : questionBank[category];
  
  // Batasi jumlah soal jika setting limit aktif
  const questionLimit = parseInt(localStorage.getItem('questionLimit')) || questions.length;
  questions = questions.slice(0, questionLimit);
  
  return questions;
}

// Fungsi untuk mengacak array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
