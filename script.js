// Konfigurasi Aplikasi
const CONFIG = {
  maxQuestions: 100,
  timeLimit: 60 * 60 * 1000, // 60 menit dalam milidetik
  cooldownPeriod: 4 * 60 * 60 * 1000, // 4 jam dalam milidetik
  prayerTimes: {
    fajr: "05:30",
    dhuhr: "12:00",
    asr: "15:00",
    maghrib: "18:00",
    isha: "19:30"
  },
  feedback: {
    correct: [
      "Wow, kamu cerdas sekali!",
      "Luar biasa! Saya iri sama kamu!",
      "Benar sekali! Pengetahuanmu sangat mengagumkan!",
      "Keren! Jawaban yang tepat!",
      "Mantap! Kamu benar-benar paham materi ini!"
    ],
    incorrect: [
      "Wah, kamu salah… tapi jangan menyerah ya!",
      "Hampir benar kok, coba lagi yuk!",
      "Oops, jawaban yang kurang tepat. Tetap semangat!",
      "Salah dikit lagi! Pelajari lagi yuk materinya!",
      "Jangan khawatir, kesalahan adalah bagian dari belajar!"
    ]
  },
  moralMessages: {
    low: [
      "Tetap semangat! Setiap ahli pernah menjadi pemula. Teruslah belajar dan berusaha!",
      "Kegagalan adalah kesuksesan yang tertunda. Belajar dari kesalahan adalah kunci sukses!",
      "Jangan berkecil hati! Setiap jawaban salah adalah kesempatan untuk belajar hal baru."
    ],
    medium: [
      "Hasil yang bagus! Teruslah berusaha untuk lebih baik lagi!",
      "Kamu sudah menunjukkan kemajuan! Pertahankan semangat belajarmu!",
      "Lumayan! Dengan sedikit usaha ekstra, kamu bisa mencapai hasil yang lebih baik."
    ],
    good: [
      "Keren! Pemahaman kamu sudah sangat baik!",
      "Hebat! Kamu sudah menguasai banyak materi!",
      "Hasil yang mengesankan! Pertahankan prestasimu!"
    ],
    excellent: [
      "Luar biasa! Kamu benar-benar ahli! Saya bangga pada kamu!",
      "Sempurna! Pengetahuanmu sangat luas dan mendalam!",
      "Wow! Hasil yang fantastis! Kamu layak mendapat tepuk tangan!"
    ]
  }
};

// Variabel Global
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = CONFIG.timeLimit;
let questions = [];
let userAnswers = [];
let userData = {};
let quizStarted = false;
let quizCompleted = false;

// DOM Elements
const registrationForm = document.getElementById('regForm');
const profesiGroup = document.getElementById('profesiGroup');
const sekolahGroup = document.getElementById('sekolahGroup');
const umumRadio = document.getElementById('umum');
const pelajarRadio = document.getElementById('pelajar');
const termsModal = document.getElementById('termsModal');
const showTermsBtn = document.getElementById('showTerms');
const closeModal = document.querySelector('.close');
const container = document.querySelector('.container');
const registration = document.getElementById('registration');
const setup = document.getElementById('setup');
const quizContainer = document.getElementById('quizContainer');
const result = document.getElementById('result');
const categorySelect = document.getElementById('category');
const levelSelect = document.getElementById('level');
const difficultySelect = document.getElementById('difficulty');
const startBtn = document.getElementById('startBtn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const answerKeyElement = document.getElementById('answerKey');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const finishBtn = document.getElementById('finishBtn');
const resultText = document.getElementById('resultText');
const moralMessage = document.getElementById('moralMessage');
const restartBtn = document.getElementById('restartBtn');
const likeBtn = document.getElementById('likeBtn');
const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('progressBar');
const questionCounter = document.getElementById('questionCounter');
const prayerAlert = document.getElementById('prayerAlert');
const prayerName = document.getElementById('prayerName');
const continueBtn = document.getElementById('continueBtn');
const adzanAudio = document.getElementById('adzanAudio');
const celebrationAudio = document.getElementById('celebrationAudio');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Set audio celebration
  celebrationAudio.src = "https://www.soundjay.com/human/sounds/applause-01.mp3";
  
  // Toggle form berdasarkan kategori peserta
  umumRadio.addEventListener('change', () => {
    profesiGroup.style.display = 'block';
    sekolahGroup.style.display = 'none';
  });
  
  pelajarRadio.addEventListener('change', () => {
    profesiGroup.style.display = 'none';
    sekolahGroup.style.display = 'block';
  });
  
  // Modal terms and conditions
  showTermsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    termsModal.style.display = 'block';
  });
  
  closeModal.addEventListener('click', () => {
    termsModal.style.display = 'none';
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === termsModal) {
      termsModal.style.display = 'none';
    }
  });
  
  // Form registrasi
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    registerUser();
  });
  
  // Quiz controls
  startBtn.addEventListener('click', startQuiz);
  nextBtn.addEventListener('click', nextQuestion);
  resetBtn.addEventListener('click', resetQuestion);
  finishBtn.addEventListener('click', finishQuiz);
  restartBtn.addEventListener('click', restartQuiz);
  likeBtn.addEventListener('click', showCelebration);
  continueBtn.addEventListener('click', () => {
    prayerAlert.style.display = 'none';
  });
  
  // Check prayer times setiap menit
  setInterval(checkPrayerTime, 60000);
});

// Fungsi untuk registrasi user
function registerUser() {
  userData = {
    name: document.getElementById('name').value,
    category: document.querySelector('input[name="kategori"]:checked').value,
    profesi: document.getElementById('profesi').value,
    sekolah: document.getElementById('sekolah').value,
    usia: document.getElementById('usia').value,
    phone: document.getElementById('phone').value,
    timestamp: new Date().toISOString()
  };
  
  // Simpan data user ke localStorage
  localStorage.setItem('quizUserData', JSON.stringify(userData));
  
  // Sembunyikan form registrasi, tampilkan container quiz
  registration.style.display = 'none';
  container.style.display = 'block';
  
  // Cek apakah user sudah mengikuti quiz dalam 4 jam terakhir
  checkQuizCooldown();
}

// Fungsi untuk memeriksa cooldown quiz
function checkQuizCooldown() {
  const lastQuizTime = localStorage.getItem('lastQuizTime');
  if (lastQuizTime) {
    const now = new Date();
    const lastTime = new Date(lastQuizTime);
    const diff = now - lastTime;
    
    if (diff < CONFIG.cooldownPeriod) {
      const remainingTime = CONFIG.cooldownPeriod - diff;
      const remainingHours = Math.ceil(remainingTime / (60 * 60 * 1000));
      
      alert(`Anda hanya dapat mengikuti quiz sekali setiap 4 jam. Silakan kembali dalam ${remainingHours} jam lagi.`);
      container.style.display = 'none';
      registration.style.display = 'block';
      return;
    }
  }
}

// Fungsi untuk memulai quiz
function startQuiz() {
  const category = categorySelect.value;
  const level = levelSelect.value;
  const difficulty = difficultySelect.value;
  
  // Validasi untuk kategori khusus
  if (['logika', 'lagu', 'pribahasa'].includes(category) && level !== 'umum') {
    alert('Kategori ini hanya tersedia untuk tingkat umum');
    return;
  }
  
  // Sembunyikan setup, tampilkan quiz container
  setup.style.display = 'none';
  quizContainer.style.display = 'block';
  quizStarted = true;
  
  // Generate atau ambil pertanyaan
  generateQuestions(category, level, difficulty);
  
  // Mulai timer
  startTimer();
  
  // Tampilkan pertanyaan pertama
  showQuestion();
}

// Fungsi untuk generate pertanyaan (simulasi - dalam implementasi nyata akan memanggil API)
function generateQuestions(category, level, difficulty) {
  // Ini adalah simulasi - dalam implementasi nyata, Anda akan memanggil:
  // 1. API internal yang terhubung dengan database soal
  // 2. API eksternal seperti OpenAI untuk generate soal dinamis
  // 3. Kombinasi keduanya
  
  questions = [];
  
  // Jumlah pertanyaan berdasarkan kesulitan
  let questionCount = CONFIG.maxQuestions;
  if (difficulty === 'sulit') questionCount = Math.min(100, questionCount + 20);
  
  for (let i = 0; i < questionCount; i++) {
    questions.push(generateQuestion(i, category, level, difficulty));
  }
  
  // Acak urutan pertanyaan
  questions = shuffleArray(questions);
}

// Fungsi untuk generate pertanyaan individu
function generateQuestion(index, category, level, difficulty) {
  // Ini adalah contoh - dalam implementasi nyata akan lebih kompleks
  const id = `q-${category}-${level}-${difficulty}-${index}`;
  const questionText = generateQuestionText(category, level, difficulty);
  const options = generateOptions(category, level, difficulty);
  const correctAnswer = options.find(opt => opt.correct).id;
  const explanation = generateExplanation(category, level, difficulty, correctAnswer);
  
  return {
    id,
    category,
    level,
    difficulty,
    question: questionText,
    options,
    correctAnswer,
    explanation
  };
}

// Helper functions untuk generate konten pertanyaan
function generateQuestionText(category, level, difficulty) {
  const prefixes = {
    mudah: ["Apa yang dimaksud dengan", "Siapa yang dikenal sebagai", "Dimana letak"],
    sedang: ["Jelaskan mengapa", "Analisis hubungan antara", "Bandingkan konsep"],
    sulit: ["Evaluasi dampak dari", "Sintesiskan pemikiran tentang", "Kritisi pendapat bahwa"]
  };
  
  const subjects = {
    umum: ["globalisasi", "teknologi modern", "kebudayaan nasional"],
    bindo: ["puisi", "prosa", "drama"],
    bing: ["present perfect tense", "reported speech", "conditional sentences"],
    matematika: ["aljabar", "geometri", "trigonometri"],
    sejarah: ["proklamasi kemerdekaan", "kerajaan majapahit", "perang dunia II"],
    ipa: ["fotosintesis", "sistem tata surya", "struktur atom"],
    ips: ["inflasi", "sistem pemerintahan", "interaksi sosial"],
    agama: ["rukun iman", "shalat wajib", "puasa ramadhan"],
    ppkn: ["Pancasila", "UUD 1945", "hak asasi manusia"],
    logika: ["Jika ayam berkokok di pagi hari, maka", "Mengapa orang tidur dengan mata tertutup?", "Apa yang naik tapi tidak pernah turun?"],
    lagu: ["Tanah airku tidak kulupakan...", "Di timur matahari mulai bercahaya...", "Bendera merah putih berkibar..."],
    pribahasa: ["Air tenang menghanyutkan...", "Tak ada gading yang tak...", "Bagai makan buah simalakama..."]
  };
  
  const prefix = prefixes[difficulty] ? 
    prefixes[difficulty][Math.floor(Math.random() * prefixes[difficulty].length)] : 
    "Pertanyaan tentang";
  
  const subject = subjects[category] ? 
    subjects[category][Math.floor(Math.random() * subjects[category].length)] : 
    "topik ini";
  
  let question = `${prefix} ${subject}?`;
  
  // Tambahkan konteks untuk pertanyaan sulit
  if (difficulty === 'sulit') {
    const contexts = [
      "Berikan analisis mendalam dengan contoh konkret.",
      "Jelaskan dengan referensi teori yang relevan.",
      "Sertakan bukti empiris dalam jawaban Anda."
    ];
    question += ` ${contexts[Math.floor(Math.random() * contexts.length)]}`;
  }
  
  // Tambahkan petunjuk untuk kategori khusus
  if (category === 'lagu') {
    question = `Sambungkan lirik lagu berikut: "${subject}"`;
  } else if (category === 'pribahasa') {
    question = `Lanjutkan pribahasa berikut: "${subject}"`;
  } else if (category === 'logika') {
    question = subject;
  }
  
  return question;
}

function generateOptions(category, level, difficulty) {
  const options = [];
  const letters = ['A', 'B', 'C', 'D'];
  
  // Generate satu jawaban benar
  const correctOption = {
    id: `opt-${Math.random().toString(36).substr(2, 9)}`,
    letter: letters[0],
    text: generateCorrectAnswer(category, level, difficulty),
    correct: true
  };
  options.push(correctOption);
  
  // Generate jawaban salah
  for (let i = 1; i < 4; i++) {
    options.push({
      id: `opt-${Math.random().toString(36).substr(2, 9)}`,
      letter: letters[i],
      text: generateWrongAnswer(category, level, difficulty),
      correct: false
    });
  }
  
  // Acak urutan opsi
  return shuffleArray(options);
}

function generateCorrectAnswer(category, level, difficulty) {
  const answers = {
    umum: ["Jawaban yang paling tepat untuk pertanyaan umum ini", "Pilihan yang mencakup semua aspek penting", "Solusi komprehensif untuk masalah ini"],
    bindo: ["Interpretasi yang paling sesuai dengan kaidah bahasa", "Analisis sastra yang paling mendalam", "Pemahaman yang tepat tentang teks"],
    bing: ["Penggunaan grammar yang paling tepat", "Terjemahan yang paling akurat", "Struktur kalimat yang benar"],
    matematika: ["Solusi matematis yang tepat", "Rumus yang sesuai dengan masalah", "Hasil perhitungan yang akurat"],
    sejarah: ["Fakta sejarah yang paling akurat", "Interpretasi peristiwa yang paling tepat", "Kronologi yang benar"],
    ipa: ["Penjelasan ilmiah yang paling tepat", "Konsep fisika/kimia/biologi yang benar", "Hasil eksperimen yang valid"],
    ips: ["Analisis sosial yang paling tepat", "Teori ekonomi yang sesuai", "Pemahaman politik yang akurat"],
    agama: ["Penjelasan sesuai ajaran agama", "Tafsir yang paling tepat", "Praktik ibadah yang benar"],
    ppkn: ["Pemahaman konstitusi yang tepat", "Implementasi nilai Pancasila", "Pengetahuan hukum yang akurat"],
    logika: ["Jawaban yang paling logis dan jenaka", "Solusi kreatif untuk teka-teki", "Pemecahan masalah yang cerdas"],
    lagu: ["Lanjutan lirik yang benar", "Bagian berikutnya dari lagu", "Verse/chorus yang sesuai"],
    pribahasa: ["Lanjutan pribahasa yang benar", "Bagian akhir dari peribahasa", "Makna yang tepat"]
  };
  
  const base = answers[category] || ["Jawaban yang paling tepat"];
  const detailLevel = {
    mudah: ["dasar", "sederhana", "umum"],
    sedang: ["menengah", "lebih rinci", "dengan penjelasan"],
    sulit: ["mendalam", "komprehensif", "dengan analisis lengkap"]
  };
  
  return `${base[Math.floor(Math.random() * base.length)]} ${detailLevel[difficulty][Math.floor(Math.random() * 3)]}.`;
}

function generateWrongAnswer(category, level, difficulty) {
  const mistakes = {
    umum: ["Jawaban yang kurang tepat", "Pemahaman yang keliru", "Informasi yang tidak relevan"],
    bindo: ["Interpretasi yang salah", "Analisis yang terlalu sederhana", "Pemahaman yang tidak utuh"],
    bing: ["Kesalahan grammar", "Terjemahan yang tidak akurat", "Struktur kalimat yang salah"],
    matematika: ["Rumus yang keliru", "Perhitungan yang salah", "Konsep yang tidak tepat"],
    sejarah: ["Fakta yang tidak akurat", "Interpretasi yang keliru", "Kronologi yang salah"],
    ipa: ["Penjelasan yang tidak ilmiah", "Konsep yang salah", "Kesimpulan yang tidak valid"],
    ips: ["Analisis yang terlalu sederhana", "Teori yang tidak relevan", "Pemahaman yang keliru"],
    agama: ["Penjelasan yang tidak sesuai ajaran", "Tafsir yang keliru", "Praktik yang tidak benar"],
    ppkn: ["Pemahaman konstitusi yang keliru", "Implementasi nilai yang salah", "Pengetahuan hukum yang tidak tepat"],
    logika: ["Jawaban yang tidak logis", "Solusi yang tidak kreatif", "Pemecahan masalah yang keliru"],
    lagu: ["Lanjutan lirik yang salah", "Bagian yang tidak sesuai", "Verse/chorus yang keliru"],
    pribahasa: ["Lanjutan yang tidak tepat", "Bagian akhir yang salah", "Makna yang keliru"]
  };
  
  const base = mistakes[category] || ["Jawaban yang kurang tepat"];
  const detailLevel = {
    mudah: ["dasar", "sederhana", "umum"],
    sedang: ["menengah", "kurang rinci", "dengan penjelasan terbatas"],
    sulit: ["yang tampak benar tapi salah", "dengan analisis yang keliru", "yang tampak logis tapi tidak tepat"]
  };
  
  return `${base[Math.floor(Math.random() * base.length)]} ${detailLevel[difficulty][Math.floor(Math.random() * 3)]}.`;
}

function generateExplanation(category, level, difficulty, correctAnswer) {
  const explanations = {
    mudah: `Jawaban yang benar adalah ${correctAnswer} karena ini adalah pilihan yang paling tepat untuk tingkat kesulitan ini.`,
    sedang: `Pilihan ${correctAnswer} adalah yang paling tepat karena memenuhi semua kriteria pertanyaan. Penjelasan lebih lanjut bisa ditemukan dalam referensi standar.`,
    sulit: `Analisis mendalam menunjukkan bahwa ${correctAnswer} adalah jawaban yang paling komprehensif. Ini didukung oleh teori X dan penelitian Y yang menunjukkan bahwa... (penjelasan mendalam)`
  };
  
  return explanations[difficulty] || `Jawaban yang benar adalah ${correctAnswer}.`;
}

// Fungsi untuk menampilkan pertanyaan
function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    finishQuiz();
    return;
  }
  
  const question = questions[currentQuestionIndex];
  questionElement.innerHTML = `<strong>Soal ${currentQuestionIndex + 1}:</strong> ${question.question}`;
  
  // Update progress
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
  questionCounter.textContent = `Soal ${currentQuestionIndex + 1}/${questions.length}`;
  
  // Tampilkan opsi jawaban
  optionsElement.innerHTML = '';
  question.options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.dataset.id = option.id;
    optionElement.innerHTML = `
      <div class="option-label">
        <span class="option-letter">${option.letter}</span>
        <span class="option-text">${option.text}</span>
      </div>
    `;
    
    optionElement.addEventListener('click', () => selectAnswer(option.id));
    optionsElement.appendChild(optionElement);
  });
  
  // Sembunyikan feedback dan answer key
  feedbackElement.style.display = 'none';
  answerKeyElement.style.display = 'none';
  nextBtn.style.display = 'none';
  
  // Reset user answer untuk pertanyaan ini
  userAnswers[currentQuestionIndex] = null;
}

// Fungsi untuk memilih jawaban
function selectAnswer(optionId) {
  if (userAnswers[currentQuestionIndex] !== null) return;
  
  const question = questions[currentQuestionIndex];
  const optionElements = document.querySelectorAll('.option');
  const selectedOption = optionElements.find(el => el.dataset.id === optionId);
  const isCorrect = optionId === question.correctAnswer;
  
  // Tandai jawaban yang dipilih
  optionElements.forEach(el => {
    if (el.dataset.id === optionId) {
      el.classList.add(isCorrect ? 'correct' : 'incorrect');
    } else if (el.dataset.id === question.correctAnswer) {
      el.classList.add('correct');
    }
    el.style.pointerEvents = 'none'; // Nonaktifkan klik setelah memilih
  });
  
  // Simpan jawaban user
  userAnswers[currentQuestionIndex] = {
    questionId: question.id,
    answerId: optionId,
    isCorrect,
    timestamp: new Date().toISOString()
  };
  
  // Update skor
  if (isCorrect) {
    score++;
  }
  
  // Tampilkan feedback
  showFeedback(isCorrect, question.explanation);
}

// Fungsi untuk menampilkan feedback
function showFeedback(isCorrect, explanation) {
  const feedbacks = isCorrect ? CONFIG.feedback.correct : CONFIG.feedback.incorrect;
  const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
  
  feedbackElement.textContent = randomFeedback;
  feedbackElement.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
  feedbackElement.style.display = 'block';
  
  // Tampilkan kunci jawaban jika salah
  if (!isCorrect) {
    answerKeyElement.innerHTML = `<strong>Kunci Jawaban:</strong> ${explanation}`;
    answerKeyElement.style.display = 'block';
  }
  
  // Tampilkan tombol next
  nextBtn.style.display = 'inline-block';
}

// Fungsi untuk pertanyaan berikutnya
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}

// Fungsi untuk reset pertanyaan
function resetQuestion() {
  if (confirm("Reset soal ini? Soal yang direset akan dihitung sebagai jawaban salah.")) {
    userAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex].id,
      answerId: null,
      isCorrect: false,
      timestamp: new Date().toISOString()
    };
    nextQuestion();
  }
}

// Fungsi untuk memulai timer
function startTimer() {
  // Update timer setiap detik
  timer = setInterval(() => {
    timeLeft -= 1000;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      finishQuiz(true);
    }
  }, 1000);
}

// Fungsi untuk update tampilan timer
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / (60 * 1000));
  const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
  timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Ubah warna saat waktu hampir habis
  if (timeLeft < 5 * 60 * 1000) { // Kurang dari 5 menit
    timerElement.style.backgroundColor = '#e74c3c';
  }
}

// Fungsi untuk menyelesaikan quiz
function finishQuiz(timeout = false) {
  clearInterval(timer);
  quizStarted = false;
  quizCompleted = true;
  
  // Sembunyikan quiz container, tampilkan hasil
  quizContainer.style.display = 'none';
  result.style.display = 'block';
  
  // Hitung skor
  const percentage = Math.round((score / questions.length) * 100);
  
  // Tampilkan hasil
  resultText.textContent = timeout ? 
    "Waktu Habis! Ini Hasil Kamu:" : 
    "Selamat! Kamu Telah Menyelesaikan Quiz!";
  
  // Tampilkan skor dengan animasi
  const scoreDisplay = document.getElementById('scoreDisplay');
  scoreDisplay.className = 'score-display';
  
  if (percentage >= 75) {
    scoreDisplay.classList.add('score-A');
    scoreDisplay.textContent = 'A+';
    moralMessage.textContent = getRandomMoralMessage('excellent');
  } else if (percentage >= 50) {
    scoreDisplay.classList.add('score-B');
    scoreDisplay.textContent = 'B';
    moralMessage.textContent = getRandomMoralMessage('good');
  } else if (percentage >= 25) {
    scoreDisplay.classList.add('score-C');
    scoreDisplay.textContent = 'C';
    moralMessage.textContent = getRandomMoralMessage('medium');
  } else {
    scoreDisplay.classList.add('score-D');
    scoreDisplay.textContent = 'D';
    moralMessage.textContent = getRandomMoralMessage('low');
  }
  
  // Simpan waktu quiz terakhir
  localStorage.setItem('lastQuizTime', new Date().toISOString());
  
  // Simpan hasil quiz (opsional)
  saveQuizResult(percentage);
}

// Fungsi untuk mendapatkan pesan moral acak
function getRandomMoralMessage(level) {
  const messages = CONFIG.moralMessages[level];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Fungsi untuk menyimpan hasil quiz
function saveQuizResult(percentage) {
  const quizResult = {
    userData,
    score: percentage,
    totalQuestions: questions.length,
    correctAnswers: score,
    date: new Date().toISOString(),
    category: categorySelect.value,
    level: levelSelect.value,
    difficulty: difficultySelect.value
  };
  
  // Simpan ke localStorage (dalam implementasi nyata bisa ke database)
  const existingResults = JSON.parse(localStorage.getItem('quizResults') || [];
  existingResults.push(quizResult);
  localStorage.setItem('quizResults', JSON.stringify(existingResults));
}

// Fungsi untuk memulai ulang quiz
function restartQuiz() {
  // Reset semua variabel
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = CONFIG.timeLimit;
  questions = [];
  userAnswers = [];
  quizStarted = false;
  quizCompleted = false;
  
  // Tampilkan setup, sembunyikan hasil
  result.style.display = 'none';
  setup.style.display = 'block';
  
  // Reset timer display
  timerElement.textContent = "60:00";
  timerElement.style.backgroundColor = '#2c3e50';
}

// Fungsi untuk menampilkan celebration
function showCelebration() {
  celebrationAudio.play();
  
  // Buat efek confetti
  for (let i = 0; i < 100; i++) {
    createConfetti();
  }
  
  // Animasi tombol
  likeBtn.classList.add('animate__tada');
  setTimeout(() => {
    likeBtn.classList.remove('animate__tada');
  }, 1000);
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  confetti.style.left = `${Math.random() * 100}vw`;
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  document.body.appendChild(confetti);
  
  setTimeout(() => {
    confetti.remove();
  }, 5000);
}

// Fungsi untuk memeriksa waktu sholat
function checkPrayerTime() {
  if (!quizStarted) return;
  
  const now = new Date();
  const currentHours = now.getHours().toString().padStart(2, '0');
  const currentMinutes = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${currentHours}:${currentMinutes}`;
  
  for (const [prayer, time] of Object.entries(CONFIG.prayerTimes)) {
    if (currentTime === time) {
      showPrayerAlert(prayer);
      break;
    }
  }
}

function showPrayerAlert(prayer) {
  const prayerNames = {
    fajr: "Subuh",
    dhuhr: "Dzuhur",
    asr: "Ashar",
    maghrib: "Maghrib",
    isha: "Isya"
  };
  
  prayerName.textContent = prayerNames[prayer];
  adzanAudio.play();
  prayerAlert.style.display = 'block';
  
  // Jeda timer
  clearInterval(timer);
}

// Helper function untuk mengacak array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Helper function untuk querySelectorAll dengan find
NodeList.prototype.find = function(selector) {
  return Array.from(this).find(el => el.matches(selector));
};