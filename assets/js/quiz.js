// Fungsi-fungsi khusus untuk quiz
function initQuiz() {
  // Inisialisasi timer
  const examTimer = parseInt(localStorage.getItem('examTimer') || '120') * 60 * 1000;
  document.getElementById('timer').textContent = formatTime(examTimer);
  
  // Set event listeners untuk exam screen
  document.getElementById('finish-exam-btn').addEventListener('click', finishExam);
  document.getElementById('skip-question-btn').addEventListener('click', skipQuestion);
  document.getElementById('unanswered-btn').addEventListener('click', showUnanswered);
}

// Format waktu dari milidetik ke menit:detik
function formatTime(ms) {
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Fungsi untuk memulai timer ujian
function startExamTimer() {
  const examData = JSON.parse(localStorage.getItem('currentExam'));
  const endTime = examData.startTime + examData.timer;
  
  // Update timer setiap detik
  window.examTimerInterval = setInterval(() => {
    const now = new Date().getTime();
    const remaining = endTime - now;
    
    if (remaining <= 0) {
      clearInterval(window.examTimerInterval);
      document.getElementById('timer').textContent = '00:00';
      finishExam();
      return;
    }
    
    document.getElementById('timer').textContent = formatTime(remaining);
    
    // Tampilkan peringatan jika sisa waktu 10 menit
    if (remaining <= 10 * 60 * 1000) {
      document.querySelector('.time-warning').style.display = 'block';
      document.getElementById('timer').style.fontSize = '2rem';
      document.getElementById('timer').style.color = 'var(--warning-color)';
    }
    
    // Sembunyikan peringatan jika sisa waktu 1 menit
    if (remaining <= 60 * 1000) {
      document.querySelector('.time-warning').style.display = 'none';
    }
  }, 1000);
}

// Fungsi untuk menampilkan soal
function showQuestion(index) {
  const questions = JSON.parse(localStorage.getItem('currentQuestions'));
  const currentQuestion = questions[index];
  
  if (!currentQuestion) {
    finishExam();
    return;
  }
  
  // Update UI
  document.getElementById('question-text').textContent = currentQuestion.text;
  document.getElementById('current-question').textContent = index + 1;
  document.getElementById('total-questions').textContent = questions.length;
  
  // Reset pilihan jawaban
  document.querySelectorAll('.option').forEach(opt => {
    opt.classList.remove('selected', 'wrong');
    opt.onclick = function() { selectOption(this, currentQuestion); };
  });
  
  // Sembunyikan penjelasan
  document.querySelector('.answer-explanation').style.display = 'none';
  
  // Set opsi jawaban
  const options = ['A', 'B', 'C', 'D', 'E'];
  options.forEach(opt => {
    const optionElement = document.querySelector(`.option[data-option="${opt}"]`);
    if (optionElement) {
      if (currentQuestion.options[opt]) {
        optionElement.style.display = 'flex';
        optionElement.querySelector('.option-text').textContent = currentQuestion.options[opt];
      } else {
        optionElement.style.display = 'none';
      }
    }
  });
  
  // Simpan indeks soal saat ini
  localStorage.setItem('currentQuestionIndex', index);
}

// Fungsi untuk memilih jawaban
function selectOption(element, question) {
  const selectedOption = element.getAttribute('data-option');
  const correctAnswer = question.correctAnswer;
  
  // Nonaktifkan semua opsi
  document.querySelectorAll('.option').forEach(opt => {
    opt.onclick = null;
  });
  
  // Tandai jawaban yang dipilih
  if (selectedOption === correctAnswer) {
    element.classList.add('selected');
    playCorrectSound();
  } else {
    element.classList.add('wrong');
    document.querySelector(`.option[data-option="${correctAnswer}"]`).classList.add('selected');
    playWrongSound();
  }
  
  // Tampilkan penjelasan
  document.getElementById('explanation-text').textContent = question.explanation || 'Tidak ada penjelasan tersedia.';
  document.querySelector('.answer-explanation').style.display = 'block';
  
  // Simpan jawaban
  saveAnswer(question.id, selectedOption, selectedOption === correctAnswer);
}

// Fungsi untuk menyimpan jawaban
function saveAnswer(questionId, selectedOption, isCorrect) {
  let examAnswers = JSON.parse(localStorage.getItem('examAnswers') || '{}');
  examAnswers[questionId] = { selectedOption, isCorrect };
  localStorage.setItem('examAnswers', JSON.stringify(examAnswers));
}

// Fungsi untuk melewati soal
function skipQuestion() {
  const currentIndex = parseInt(localStorage.getItem('currentQuestionIndex'));
  showQuestion(currentIndex + 1);
}

// Fungsi untuk menampilkan soal yang belum dijawab
function showUnanswered() {
  const questions = JSON.parse(localStorage.getItem('currentQuestions'));
  const answers = JSON.parse(localStorage.getItem('examAnswers') || '{}');
  
  for (let i = 0; i < questions.length; i++) {
    if (!answers[questions[i].id]) {
      showQuestion(i);
      return;
    }
  }
  
  alert('Semua soal telah dijawab.');
}

// Fungsi untuk menyelesaikan ujian
function finishExam() {
  // Hitung hasil
  const questions = JSON.parse(localStorage.getItem('currentQuestions'));
  const answers = JSON.parse(localStorage.getItem('examAnswers') || '{}');
  
  let correct = 0;
  let wrong = 0;
  
  questions.forEach(q => {
    if (answers[q.id]?.isCorrect) {
      correct++;
    } else {
      wrong++;
    }
  });
  
  const pointPerQuestion = parseInt(localStorage.getItem('pointPerQuestion') || '10');
  const score = Math.round((correct / questions.length) * 100 * (pointPerQuestion / 10));
  
  // Simpan hasil
  const participant = JSON.parse(localStorage.getItem('currentParticipant'));
  const examType = JSON.parse(localStorage.getItem('currentExam')).type;
  
  const result = {
    participant,
    examType,
    date: new Date().toISOString(),
    totalQuestions: questions.length,
    correctAnswers: correct,
    wrongAnswers: wrong,
    score,
    certificateCode: generateCertificateCode(participant, examType)
  };
  
  let results = JSON.parse(localStorage.getItem('examResults') || '[]');
  results.push(result);
  localStorage.setItem('examResults', JSON.stringify(results));
  localStorage.setItem('currentResult', JSON.stringify(result));
  
  // Hentikan timer
  clearInterval(window.examTimerInterval);
  
  // Tampilkan hasil
  showResults(result);
}

// Fungsi untuk menampilkan hasil
function showResults(result) {
  document.getElementById('total-answered').textContent = result.totalQuestions;
  document.getElementById('correct-answers').textContent = result.correctAnswers;
  document.getElementById('wrong-answers').textContent = result.wrongAnswers;
  document.getElementById('exam-score').textContent = result.score;
  
  // Set pesan motivasi berdasarkan skor
  const messages = (localStorage.getItem('motivationMessages') || 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.\nBagus! Anda telah menunjukkan pemahaman yang baik. Tingkatkan terus kemampuan Anda.\nAnda bisa lebih baik lagi. Pelajari kembali materi yang belum dikuasai.').split('\n');
  
  let message;
  if (result.score >= 85) {
    message = messages[0] || 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
  } else if (result.score >= 60) {
    message = messages[1] || 'Bagus! Anda telah menunjukkan pemahaman yang baik. Tingkatkan terus kemampuan Anda.';
  } else {
    message = messages[2] || 'Anda bisa lebih baik lagi. Pelajari kembali materi yang belum dikuasai.';
  }
  
  document.getElementById('motivation-text').textContent = message;
  
  // Pindah ke screen hasil
  switchScreen('exam-screen', 'results-screen', 'slideInUp');
  
  // Mainkan suara applause
  const applause = new Audio('assets/audio/applause.mp3');
  applause.volume = 0.5;
  applause.play();
}

// Fungsi untuk menghasilkan kode sertifikat
function generateCertificateCode(participant, examType) {
  const now = new Date();
  const dateStr = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;
  const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + 
                     '-' + 
                     Math.random().toString(36).substring(2, 6).toUpperCase();
  
  const level = participant.isStudent ? participant.data.level.toUpperCase() : 'UMUM';
  const className = participant.isStudent ? participant.data.class : '';
  
  return `${participant.fullname.toUpperCase().replace(/ /g, '')}/${participant.isStudent ? 'PELAJAR' : 'UMUM'}/${level}${className ? '/' + className : ''}/${examType.toUpperCase()}/${dateStr}/${randomCode}/PERGUNU-STB`;
}

// Fungsi untuk memainkan suara jawaban benar
function playCorrectSound() {
  const audio = new Audio('assets/audio/jawabanbenar.mp3');
  audio.volume = 0.5;
  audio.play();
}

// Fungsi untuk memainkan suara jawaban salah
function playWrongSound() {
  const audio = new Audio('assets/audio/jawabansalah.mp3');
  audio.volume = 0.5;
  audio.play();
}

// Panggil initQuiz saat halaman dimuat
document.addEventListener('DOMContentLoaded', initQuiz);
