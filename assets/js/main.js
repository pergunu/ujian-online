// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', function() {
  // Inisialisasi partikel background
  particlesJS.load('particles-js', 'assets/js/particles.json', function() {
    console.log('Particles.js loaded');
  });
  
  // Set greeting message from localStorage or default
  const greetingText = localStorage.getItem('greetingText') || 'Selamat Datang di Ujian Online Pergunu Situbondo';
  document.getElementById('greeting-text').textContent = greetingText;
  
  // Set info message from localStorage or default
  const infoMessage = localStorage.getItem('infoMessage') || 'Informasi penting akan ditampilkan di sini';
  document.getElementById('period-info').innerHTML = `<p>${infoMessage}</p>`;
  
  // Play opening audio
  const openingAudio = document.getElementById('opening-audio');
  openingAudio.volume = 0.5;
  openingAudio.play().catch(e => console.log('Autoplay prevented:', e));
  
  // Event listeners
  setupEventListeners();
  
  // Load sample questions if none exist
  if (!localStorage.getItem('questions')) {
    loadSampleQuestions();
  }
});

// Setup semua event listeners
function setupEventListeners() {
  // Login screen
  document.getElementById('login-btn').addEventListener('click', handleLogin);
  document.getElementById('login-code').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') handleLogin();
  });
  
  // Terms screen
  document.getElementById('agree-terms').addEventListener('change', function() {
    document.getElementById('terms-btn').disabled = !this.checked;
  });
  document.getElementById('terms-btn').addEventListener('click', function() {
    switchScreen('terms-screen', 'participant-screen', 'slideInUp');
  });
  
  // Participant form
  document.querySelectorAll('input[name="status"]').forEach(radio => {
    radio.addEventListener('change', toggleParticipantFields);
  });
  document.getElementById('student-level').addEventListener('change', function() {
    updateClassOptions(this.value);
  });
  document.getElementById('participant-form').addEventListener('submit', function(e) {
    e.preventDefault();
    saveParticipantData();
  });
  
  // GPS button
  document.getElementById('gps-btn').addEventListener('click', getLocation);
  
  // Exam selection
  document.querySelectorAll('.btn-roman').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.btn-roman').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      checkExamReady();
    });
  });
  
  document.querySelectorAll('.btn-subject').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.btn-subject').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      checkExamReady();
    });
  });
  
  document.querySelectorAll('.btn-exam').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.btn-exam').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      if (this.value === 'cpns') {
        document.getElementById('cpns-license').style.display = 'block';
      } else {
        document.getElementById('cpns-license').style.display = 'none';
        checkExamReady();
      }
    });
  });
  
  document.getElementById('verify-license').addEventListener('click', verifyLicense);
  document.getElementById('license-code').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') verifyLicense();
  });
  
  document.getElementById('start-exam-btn').addEventListener('click', startExam);
  
  // Floating buttons
  document.getElementById('share-btn').addEventListener('click', showShareModal);
  document.getElementById('whatsapp-btn').addEventListener('click', openWhatsApp);
  document.getElementById('question-bank-btn').addEventListener('click', showQuestionBank);
  document.getElementById('admin-btn').addEventListener('click', showAdminPanel);
  
  // Modal close buttons
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').classList.remove('active');
    });
  });
  
  // Share modal links will be added dynamically
}

// Fungsi untuk berpindah screen dengan animasi
function switchScreen(fromId, toId, animation = 'fadeIn') {
  const fromScreen = document.getElementById(fromId);
  const toScreen = document.getElementById(toId);
  
  fromScreen.classList.remove('active');
  toScreen.classList.add('active');
  toScreen.style.animation = `${animation} 0.5s ease`;
  
  // Scroll ke atas
  window.scrollTo(0, 0);
}

// Handle login
function handleLogin() {
  const loginCode = document.getElementById('login-code').value;
  const defaultCode = localStorage.getItem('loginCode') || '12345';
  
  if (loginCode === defaultCode) {
    playButtonSound();
    switchScreen('opening-screen', 'terms-screen', 'slideInUp');
  } else {
    alert('Kode login salah. Silakan coba lagi.');
    document.getElementById('login-code').focus();
  }
}

// Toggle participant fields berdasarkan status
function toggleParticipantFields() {
  const isStudent = document.getElementById('student').checked;
  
  document.getElementById('student-fields').style.display = isStudent ? 'block' : 'none';
  document.getElementById('general-fields').style.display = isStudent ? 'none' : 'block';
  
  // Reset fields when toggling
  if (isStudent) {
    document.getElementById('school').value = '';
    document.getElementById('nis').value = '';
    document.getElementById('student-purpose').value = '';
    document.getElementById('student-level').value = '';
  } else {
    document.getElementById('address').value = '';
    document.getElementById('whatsapp').value = '';
    document.getElementById('email').value = '';
    document.getElementById('general-purpose').value = '';
  }
}

// Update class options berdasarkan tingkat sekolah
function updateClassOptions(level) {
  document.getElementById('sd-classes').style.display = level === 'sd' ? 'block' : 'none';
  document.getElementById('smp-classes').style.display = level === 'smp' ? 'block' : 'none';
  document.getElementById('sma-classes').style.display = level === 'sma' ? 'block' : 'none';
  
  // Reset selected class
  document.querySelectorAll('.btn-roman').forEach(btn => {
    btn.classList.remove('active');
  });
}

// Get GPS location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function(position) {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          const data = await response.json();
          
          let address = '';
          if (data.address) {
            if (data.address.road) address += data.address.road + ', ';
            if (data.address.village) address += data.address.village + ', ';
            if (data.address.subdistrict) address += data.address.subdistrict + ', ';
            if (data.address.city || data.address.county) address += data.address.city || data.address.county;
          }
          
          document.getElementById('address').value = address || 'Lokasi tidak dapat ditentukan';
        } catch (error) {
          console.error('Error getting address:', error);
          document.getElementById('address').value = 'Lokasi tidak dapat ditentukan';
        }
      },
      function(error) {
        console.error('Error getting location:', error);
        alert('Tidak dapat mendapatkan lokasi. Silakan isi alamat secara manual.');
      }
    );
  } else {
    alert('Browser tidak mendukung geolokasi. Silakan isi alamat secara manual.');
  }
}

// Save participant data
function saveParticipantData() {
  const isStudent = document.getElementById('student').checked;
  const fullname = document.getElementById('fullname').value.trim();
  
  if (!fullname) {
    alert('Nama lengkap harus diisi');
    return;
  }
  
  if (isStudent) {
    const school = document.getElementById('school').value.trim();
    const nis = document.getElementById('nis').value.trim();
    const purpose = document.getElementById('student-purpose').value;
    const level = document.getElementById('student-level').value;
    
    if (!school || !nis || !purpose || !level) {
      alert('Semua data pelajar harus diisi');
      return;
    }
  } else {
    const address = document.getElementById('address').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const email = document.getElementById('email').value.trim();
    const purpose = document.getElementById('general-purpose').value;
    
    if (!address || !whatsapp || !email || !purpose) {
      alert('Semua data umum harus diisi');
      return;
    }
    
    if (!isValidWhatsApp(whatsapp)) {
      alert('Nomor WhatsApp harus 10-13 digit angka');
      return;
    }
    
    if (!isValidEmail(email)) {
      alert('Email harus menggunakan domain @gmail, @yahoo, atau @hotmail');
      return;
    }
  }
  
  // Save to localStorage
  const participant = {
    fullname,
    isStudent,
    timestamp: new Date().toISOString(),
    data: isStudent ? {
      school: document.getElementById('school').value.trim(),
      nis: document.getElementById('nis').value.trim(),
      purpose: document.getElementById('student-purpose').value,
      level: document.getElementById('student-level').value,
      class: document.querySelector('.btn-roman.active')?.value || ''
    } : {
      address: document.getElementById('address').value.trim(),
      whatsapp: document.getElementById('whatsapp').value.trim(),
      email: document.getElementById('email').value.trim(),
      purpose: document.getElementById('general-purpose').value
    }
  };
  
  let participants = JSON.parse(localStorage.getItem('participants') || '[]');
  participants.push(participant);
  localStorage.setItem('participants', JSON.stringify(participants));
  
  // Set current participant
  localStorage.setItem('currentParticipant', JSON.stringify(participant));
  
  playButtonSound();
  switchScreen('participant-screen', 'exam-selection-screen', 'slideInUp');
  
  // Update exam selection based on participant type
  document.getElementById('student-exam-options').style.display = isStudent ? 'block' : 'none';
  document.getElementById('general-exam-options').style.display = isStudent ? 'none' : 'block';
}

// Validasi WhatsApp
function isValidWhatsApp(number) {
  return /^\d{10,13}$/.test(number);
}

// Validasi Email
function isValidEmail(email) {
  return /^[a-z0-9._%+-]+@(gmail|yahoo|hotmail)\.com$/i.test(email);
}

// Check if exam is ready to start
function checkExamReady() {
  const isStudent = JSON.parse(localStorage.getItem('currentParticipant')).isStudent;
  let ready = false;
  
  if (isStudent) {
    const classSelected = document.querySelector('.btn-roman.active');
    const subjectSelected = document.querySelector('.btn-subject.active');
    ready = classSelected && subjectSelected;
  } else {
    const examType = document.querySelector('.btn-exam.active');
    if (examType?.value === 'cpns') {
      ready = false; // Need license verification
    } else {
      ready = examType !== null;
    }
  }
  
  document.getElementById('start-exam-btn').disabled = !ready;
}

// Verify CPNS license
function verifyLicense() {
  const licenseCode = document.getElementById('license-code').value;
  const defaultCode = localStorage.getItem('examCode') || 'OPENLOCK-1945';
  
  if (licenseCode === defaultCode) {
    document.getElementById('start-exam-btn').disabled = false;
    document.getElementById('cpns-license').style.display = 'none';
    playButtonSound();
  } else {
    alert('Kode lisensi salah. Silakan coba lagi.');
    document.getElementById('license-code').focus();
  }
}

// Start exam
function startExam() {
  const isStudent = JSON.parse(localStorage.getItem('currentParticipant')).isStudent;
  let examType;
  
  if (isStudent) {
    examType = document.querySelector('.btn-subject.active').value;
  } else {
    examType = document.querySelector('.btn-exam.active').value;
  }
  
  // Set current exam
  localStorage.setItem('currentExam', JSON.stringify({
    type: examType,
    startTime: new Date().getTime(),
    timer: parseInt(localStorage.getItem('examTimer') || '120') * 60 * 1000 // Convert minutes to ms
  }));
  
  playButtonSound();
  switchScreen('exam-selection-screen', 'exam-screen', 'slideInUp');
  
  // Load questions
  loadQuestionsForExam(examType);
}

// Load questions for exam type
function loadQuestionsForExam(examType) {
  let allQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
  let filteredQuestions = allQuestions.filter(q => q.category === examType);
  
  // Randomize if setting is enabled
  if (localStorage.getItem('randomizeQuestions') === 'yes') {
    filteredQuestions = shuffleArray(filteredQuestions);
  }
  
  // Limit number of questions
  const questionCount = parseInt(localStorage.getItem('questionCount') || '10');
  filteredQuestions = filteredQuestions.slice(0, questionCount);
  
  // Set current questions
  localStorage.setItem('currentQuestions', JSON.stringify(filteredQuestions));
  
  // Start exam
  startExamTimer();
  showQuestion(0);
}

// Shuffle array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Show question by index
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
  
  // Clear previous selections
  document.querySelectorAll('.option').forEach(opt => {
    opt.classList.remove('selected', 'wrong');
    opt.onclick = function() { selectOption(this, currentQuestion); };
  });
  
  // Hide explanation
  document.querySelector('.answer-explanation').style.display = 'none';
  
  // Set options
  const options = ['A', 'B', 'C', 'D', 'E'];
  options.forEach(opt => {
    const optionElement = document.querySelector(`.option[data-option="${opt}"]`);
    if (optionElement && currentQuestion.options[opt]) {
      optionElement.querySelector('.option-text').textContent = currentQuestion.options[opt];
    } else if (optionElement) {
      optionElement.style.display = 'none';
    }
  });
  
  // Set current question index
  localStorage.setItem('currentQuestionIndex', index);
}

// Select option
function selectOption(element, question) {
  const selectedOption = element.getAttribute('data-option');
  const correctAnswer = question.correctAnswer;
  
  // Disable all options
  document.querySelectorAll('.option').forEach(opt => {
    opt.onclick = null;
  });
  
  // Mark selected option
  if (selectedOption === correctAnswer) {
    element.classList.add('selected');
    playCorrectSound();
  } else {
    element.classList.add('wrong');
    document.querySelector(`.option[data-option="${correctAnswer}"]`).classList.add('selected');
    playWrongSound();
  }
  
  // Show explanation
  document.getElementById('explanation-text').textContent = question.explanation || 'Tidak ada penjelasan tersedia.';
  document.querySelector('.answer-explanation').style.display = 'block';
  
  // Save answer
  saveAnswer(question.id, selectedOption, selectedOption === correctAnswer);
}

// Save answer
function saveAnswer(questionId, selectedOption, isCorrect) {
  let examAnswers = JSON.parse(localStorage.getItem('examAnswers') || '{}');
  examAnswers[questionId] = { selectedOption, isCorrect };
  localStorage.setItem('examAnswers', JSON.stringify(examAnswers));
}

// Skip question
function skipQuestion() {
  const currentIndex = parseInt(localStorage.getItem('currentQuestionIndex'));
  showQuestion(currentIndex + 1);
}

// Show unanswered questions
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

// Finish exam
function finishExam() {
  // Calculate results
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
  
  // Save results
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
  
  // Stop timer
  clearInterval(window.examTimerInterval);
  
  // Show results
  showResults(result);
}

// Show results
function showResults(result) {
  document.getElementById('total-answered').textContent = result.totalQuestions;
  document.getElementById('correct-answers').textContent = result.correctAnswers;
  document.getElementById('wrong-answers').textContent = result.wrongAnswers;
  document.getElementById('exam-score').textContent = result.score;
  
  // Set motivational message based on score
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
  
  // Switch screen
  switchScreen('exam-screen', 'results-screen', 'slideInUp');
  
  // Play applause sound
  const applause = new Audio('assets/audio/applause.mp3');
  applause.volume = 0.5;
  applause.play();
}

// Generate certificate code
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

// Show certificate
function showCertificate() {
  const result = JSON.parse(localStorage.getItem('currentResult'));
  const participant = JSON.parse(localStorage.getItem('currentParticipant'));
  
  document.getElementById('certificate-name').textContent = participant.fullname;
  document.getElementById('certificate-score').textContent = result.score;
  document.getElementById('certificate-code').textContent = result.certificateCode;
  document.getElementById('certificate-date').textContent = new Date().toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  
  // Set motivational message
  const messages = (localStorage.getItem('motivationMessages') || 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.\nBagus! Anda telah menunjukkan pemahaman yang baik. Tingkatkan terus kemampuan Anda.\nAnda bisa lebih baik lagi. Pelajari kembali materi yang belum dikuasai.').split('\n');
  
  let message;
  if (result.score >= 85) {
    message = messages[0] || 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
  } else if (result.score >= 60) {
    message = messages[1] || 'Bagus! Anda telah menunjukkan pemahaman yang baik. Tingkatkan terus kemampuan Anda.';
  } else {
    message = messages[2] || 'Anda bisa lebih baik lagi. Pelajari kembali materi yang belum dikuasai.';
  }
  
  document.getElementById('certificate-motivation').textContent = message;
  
  // Set chairman name
  document.getElementById('chairman-name').textContent = localStorage.getItem('chairmanName') || 'Moh. Nuril Hudha, S.Pd., M.Si.';
  
  // Show certificate screen
  switchScreen('results-screen', 'certificate-screen', 'slideInUp');
}

// Print certificate
function printCertificate() {
  const printContent = document.getElementById('certificate-print').innerHTML;
  const originalContent = document.body.innerHTML;
  
  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
  
  // Re-add event listeners
  setupEventListeners();
  
  // Show certificate screen again
  document.getElementById('certificate-screen').classList.add('active');
}

// Start exam timer
function startExamTimer() {
  const exam = JSON.parse(localStorage.getItem('currentExam'));
  const endTime = exam.startTime + exam.timer;
  
  // Clear any existing timer
  clearInterval(window.examTimerInterval);
  
  // Update timer immediately
  updateTimer(endTime);
  
  // Set interval to update timer every second
  window.examTimerInterval = setInterval(() => {
    updateTimer(endTime);
  }, 1000);
}

// Update timer display
function updateTimer(endTime) {
  const now = new Date().getTime();
  const remaining = endTime - now;
  
  if (remaining <= 0) {
    clearInterval(window.examTimerInterval);
    document.getElementById('timer').textContent = '00:00';
    finishExam();
    return;
  }
  
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
  
  document.getElementById('timer').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Show warning when 10 minutes left
  if (remaining <= 10 * 60 * 1000 && remaining > 60 * 1000) {
    document.querySelector('.time-warning').style.display = 'block';
    document.getElementById('timer').style.fontSize = '2rem';
    document.getElementById('timer').style.color = 'var(--warning-color)';
  }
  
  // Hide warning when 1 minute left
  if (remaining <= 60 * 1000) {
    document.querySelector('.time-warning').style.display = 'none';
  }
}

// Play button sound
function playButtonSound() {
  const audio = new Audio('assets/audio/audiotombol.mp3');
  audio.volume = 0.3;
  audio.play();
}

// Play correct answer sound
function playCorrectSound() {
  const audio = new Audio('assets/audio/jawabanbenar.mp3');
  audio.volume = 0.5;
  audio.play();
}

// Play wrong answer sound
function playWrongSound() {
  const audio = new Audio('assets/audio/jawabansalah.mp3');
  audio.volume = 0.5;
  audio.play();
}

// Show share modal
function showShareModal() {
  const shareLinks = JSON.parse(localStorage.getItem('shareLinks') || '[]');
  const shareContainer = document.querySelector('.share-links');
  
  shareContainer.innerHTML = '';
  
  if (shareLinks.length === 0) {
    shareContainer.innerHTML = '<p>Tidak ada link share yang tersedia. Admin dapat menambahkan melalui panel admin.</p>';
  } else {
    shareLinks.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.className = 'btn-grad';
      a.style.margin = '0.5rem 0';
      a.textContent = link.title;
      shareContainer.appendChild(a);
    });
  }
  
  document.getElementById('share-modal').classList.add('active');
}

// Open WhatsApp chat
function openWhatsApp() {
  const phone = '6285647709114';
  const message = 'Assalamualaikum mas admin, saya mau tanya sesuatu nih...';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

// Show question bank
function showQuestionBank() {
  // Check if already authenticated
  if (localStorage.getItem('questionBankAuthenticated') === 'true') {
    document.getElementById('question-bank-panel').classList.add('active');
    loadQuestionBank();
    return;
  }
  
  const code = prompt('Masukkan Kode Bank Soal:');
  const defaultCode = localStorage.getItem('questionCode') || 'OPENLOCK-1926';
  
  if (code === defaultCode) {
    localStorage.setItem('questionBankAuthenticated', 'true');
    document.getElementById('question-bank-panel').classList.add('active');
    loadQuestionBank();
  } else {
    alert('Kode bank soal salah.');
  }
}

// Load question bank
function loadQuestionBank() {
  const questions = JSON.parse(localStorage.getItem('questions') || '[]');
  const questionsList = document.querySelector('.questions-list');
  
  questionsList.innerHTML = '';
  
  if (questions.length === 0) {
    questionsList.innerHTML = '<p>Tidak ada soal tersedia. Tambahkan soal baru.</p>';
    return;
  }
  
  questions.forEach((q, index) => {
    const questionItem = document.createElement('div');
    questionItem.className = 'question-item';
    
    questionItem.innerHTML = `
      <div class="question-item-header">
        <span class="question-item-category">${q.category.toUpperCase()}</span>
        <div class="question-item-actions">
          <button class="edit-question" data-id="${q.id}"><i class="fas fa-edit"></i></button>
          <button class="delete-question" data-id="${q.id}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <div class="question-item-text">${q.text}</div>
      <div class="question-item-options">
        ${Object.entries(q.options).map(([opt, text]) => `
          <div class="question-item-option ${opt === q.correctAnswer ? 'correct' : ''}">
            ${opt}. ${text}
          </div>
        `).join('')}
      </div>
      ${q.explanation ? `
        <div class="question-item-explanation">
          <strong>Penjelasan:</strong> ${q.explanation}
        </div>
      ` : ''}
    `;
    
    questionsList.appendChild(questionItem);
  });
  
  // Add event listeners to edit and delete buttons
  document.querySelectorAll('.edit-question').forEach(btn => {
    btn.addEventListener('click', function() {
      editQuestion(this.getAttribute('data-id'));
    });
  });
  
  document.querySelectorAll('.delete-question').forEach(btn => {
    btn.addEventListener('click', function() {
      deleteQuestion(this.getAttribute('data-id'));
    });
  });
}

// Edit question
function editQuestion(questionId) {
  const questions = JSON.parse(localStorage.getItem('questions') || '[]');
  const question = questions.find(q => q.id === questionId);
  
  if (!question) return;
  
  // Fill form
  document.getElementById('question-category').value = question.category;
  document.getElementById('question-text').value = question.text;
  
  // Fill options
  Object.entries(question.options).forEach(([opt, text]) => {
    const input = document.querySelector(`.option-text[data-option="${opt}"]`);
    if (input) input.value = text;
  });
  
  document.getElementById('correct-answer').value = question.correctAnswer;
  document.getElementById('answer-explanation').value = question.explanation || '';
  
  // Set current editing question
  localStorage.setItem('editingQuestionId', questionId);
  
  // Switch to add question tab
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.admin-tab-content').forEach(tab => tab.classList.remove('active'));
  
  document.querySelector('.tab-btn[data-tab="add-question"]').classList.add('active');
  document.getElementById('add-question').classList.add('active');
  
  // Change button text
  document.getElementById('save-question-btn').textContent = 'Update Soal';
}

// Delete question
function deleteQuestion(questionId) {
  if (!confirm('Apakah Anda yakin ingin menghapus soal ini?')) return;
  
  let questions = JSON.parse(localStorage.getItem('questions') || '[]');
  questions = questions.filter(q => q.id !== questionId);
  
  localStorage.setItem('questions', JSON.stringify(questions));
  loadQuestionBank();
}

// Show admin panel
function showAdminPanel() {
  // Check if already authenticated
  if (localStorage.getItem('adminAuthenticated') === 'true') {
    document.getElementById('admin-panel').classList.add('active');
    return;
  }
  
  const code = prompt('Masukkan Kode Kontrol Panel Admin:');
  const defaultCode = localStorage.getItem('adminCode') || '65614222';
  
  if (code === defaultCode) {
    localStorage.setItem('adminAuthenticated', 'true');
    document.getElementById('admin-panel').classList.add('active');
  } else {
    alert('Kode admin salah.');
  }
}

// Load sample questions
function loadSampleQuestions() {
  const sampleQuestions = [
    {
      id: '1',
      category: 'agama',
      text: 'Siapakah nabi terakhir dalam Islam?',
      options: {
        A: 'Nabi Musa',
        B: 'Nabi Isa',
        C: 'Nabi Muhammad',
        D: 'Nabi Ibrahim',
        E: 'Nabi Nuh'
      },
      correctAnswer: 'C',
      explanation: 'Nabi Muhammad SAW adalah nabi terakhir yang diutus Allah SWT untuk seluruh umat manusia.'
    },
    {
      id: '2',
      category: 'ppkn',
      text: 'Pancasila sebagai dasar negara tercantum dalam pembukaan UUD 1945 pada alinea keberapa?',
      options: {
        A: 'Pertama',
        B: 'Kedua',
        C: 'Ketiga',
        D: 'Keempat',
        E: 'Kelima'
      },
      correctAnswer: 'D',
      explanation: 'Pancasila tercantum dalam Pembukaan UUD 1945 alinea keempat setelah kalimat "maka disusunlah Kemerdekaan Kebangsaan Indonesia itu dalam suatu Undang-Undang Dasar Negara Indonesia".'
    },
    {
      id: '3',
      category: 'logika',
      text: 'Jika semua manusia adalah makhluk hidup dan Andi adalah manusia, maka:',
      options: {
        A: 'Andi adalah makhluk hidup',
        B: 'Andi bukan makhluk hidup',
        C: 'Beberapa manusia bukan makhluk hidup',
        D: 'Makhluk hidup pasti manusia',
        E: 'Tidak dapat disimpulkan'
      },
      correctAnswer: 'A',
      explanation: 'Dari premis "semua manusia adalah makhluk hidup" dan "Andi adalah manusia", maka dapat disimpulkan bahwa "Andi adalah makhluk hidup".'
    }
  ];
  
  localStorage.setItem('questions', JSON.stringify(sampleQuestions));
}

// Inisialisasi event listeners untuk admin panel
document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Update active tab button
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Update active tab content
      document.querySelectorAll('.admin-tab-content').forEach(tab => tab.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Save login code
  document.getElementById('save-login-code').addEventListener('click', function() {
    const newCode = document.getElementById('new-login-code').value;
    if (newCode) {
      localStorage.setItem('loginCode', newCode);
      document.getElementById('current-login-code').value = newCode;
      document.getElementById('new-login-code').value = '';
      alert('Kode login berhasil diperbarui!');
    } else {
      alert('Masukkan kode baru terlebih dahulu.');
    }
  });
  
  // Save exam code
  document.getElementById('save-exam-code').addEventListener('click', function() {
    const newCode = document.getElementById('new-exam-code').value;
    if (newCode) {
      localStorage.setItem('examCode', newCode);
      document.getElementById('current-exam-code').value = newCode;
      document.getElementById('new-exam-code').value = '';
      alert('Kode ujian CPNS berhasil diperbarui!');
    } else {
      alert('Masukkan kode baru terlebih dahulu.');
    }
  });
  
  // Save question bank code
  document.getElementById('save-question-code').addEventListener('click', function() {
    const newCode = document.getElementById('new-question-code').value;
    if (newCode) {
      localStorage.setItem('questionCode', newCode);
      document.getElementById('current-question-code').value = newCode;
      document.getElementById('new-question-code').value = '';
      alert('Kode bank soal berhasil diperbarui!');
    } else {
      alert('Masukkan kode baru terlebih dahulu.');
    }
  });
  
  // Save admin code
  document.getElementById('save-admin-code').addEventListener('click', function() {
    const newCode = document.getElementById('new-admin-code').value;
    if (newCode) {
      localStorage.setItem('adminCode', newCode);
      document.getElementById('current-admin-code').value = newCode;
      document.getElementById('new-admin-code').value = '';
      alert('Kode admin berhasil diperbarui!');
    } else {
      alert('Masukkan kode baru terlebih dahulu.');
    }
  });
  
  // Save exam settings
  document.getElementById('save-exam-settings').addEventListener('click', function() {
    const timer = document.getElementById('exam-timer-setting').value;
    const questionCount = document.getElementById('question-count-setting').value;
    const pointPerQuestion = document.getElementById('point-per-question').value;
    const randomize = document.getElementById('randomize-questions').value;
    
    localStorage.setItem('examTimer', timer);
    localStorage.setItem('questionCount', questionCount);
    localStorage.setItem('pointPerQuestion', pointPerQuestion);
    localStorage.setItem('randomizeQuestions', randomize);
    
    alert('Pengaturan ujian berhasil disimpan!');
  });
  
  // Save content settings
  document.getElementById('save-content-settings').addEventListener('click', function() {
    const greeting = document.getElementById('greeting-message').value;
    const chairman = document.getElementById('chairman-name-setting').value;
    const info = document.getElementById('info-message').value;
    const motivations = document.getElementById('motivation-messages').value;
    
    localStorage.setItem('greetingText', greeting);
    localStorage.setItem('chairmanName', chairman);
    localStorage.setItem('infoMessage', info);
    localStorage.setItem('motivationMessages', motivations);
    
    // Update UI
    document.getElementById('greeting-text').textContent = greeting;
    document.getElementById('period-info').innerHTML = `<p>${info}</p>`;
    
    alert('Pengaturan konten berhasil disimpan!');
  });
  
  // Save question
  document.getElementById('add-question-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const category = document.getElementById('question-category').value;
    const text = document.getElementById('question-text').value;
    const options = {
      A: document.querySelector('.option-text[data-option="A"]').value,
      B: document.querySelector('.option-text[data-option="B"]').value,
      C: document.querySelector('.option-text[data-option="C"]').value,
      D: document.querySelector('.option-text[data-option="D"]').value,
      E: document.querySelector('.option-text[data-option="E"]').value || ''
    };
    const correctAnswer = document.getElementById('correct-answer').value;
    const explanation = document.getElementById('answer-explanation').value;
    
    if (!category || !text || !options.A || !options.B || !options.C || !options.D || !correctAnswer) {
      alert('Harap isi semua field yang wajib!');
      return;
    }
    
    const editingId = localStorage.getItem('editingQuestionId');
    let questions = JSON.parse(localStorage.getItem('questions') || '[]');
    
    if (editingId) {
      // Update existing question
      const index = questions.findIndex(q => q.id === editingId);
      if (index !== -1) {
        questions[index] = {
          ...questions[index],
          category,
          text,
          options,
          correctAnswer,
          explanation
        };
      }
      localStorage.removeItem('editingQuestionId');
    } else {
      // Add new question
      const newQuestion = {
        id: Date.now().toString(),
        category,
        text,
        options,
        correctAnswer,
        explanation
      };
      questions.push(newQuestion);
    }
    
    localStorage.setItem('questions', JSON.stringify(questions));
    alert(editingId ? 'Soal berhasil diperbarui!' : 'Soal baru berhasil ditambahkan!');
    
    // Reset form
    this.reset();
    document.getElementById('save-question-btn').textContent = 'Simpan Soal';
    
    // Reload question bank
    loadQuestionBank();
  });
  
  // Generate questions with AI
  document.getElementById('generate-questions-btn').addEventListener('click', async function() {
    const apiKey = document.getElementById('ai-api-key').value;
    const prompt = document.getElementById('ai-prompt').value;
    const category = document.getElementById('ai-category').value;
    
    if (!apiKey) {
      alert('Masukkan API Key terlebih dahulu');
      return;
    }
    
    if (!prompt) {
      alert('Masukkan prompt untuk AI terlebih dahulu');
      return;
    }
    
    this.disabled = true;
    this.textContent = 'Memproses...';
    
    const aiResults = document.querySelector('.ai-results');
    aiResults.innerHTML = '<p>Membuat soal, harap tunggu...</p>';
    
    try {
      // NOTE: Replace with actual AI API call
      // This is a mock implementation - you'll need to integrate with a real AI service
      // Example using OpenAI (you'll need to add the actual API call)
      /*
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: `Buatkan soal pilihan ganda dengan format berikut:\n\nPertanyaan: [pertanyaan]\nA. [pilihan A]\nB. [pilihan B]\nC. [pilihan C]\nD. [pilihan D]\nE. [pilihan E]\nJawaban benar: [huruf jawaban benar]\nPenjelasan: [penjelasan singkat]\n\n${prompt}`,
          max_tokens: 1000,
          temperature: 0.7
        })
      });
      
      const data = await response.json();
      const generatedText = data.choices[0].text;
      */
      
      // Mock response for demonstration
      const generatedText = `
Pertanyaan: Apa ibukota Indonesia?
A. Jakarta
B. Bandung
C. Surabaya
D. Medan
E. Bali
Jawaban benar: A
Penjelasan: Jakarta adalah ibukota Indonesia sejak tahun 1945.

Pertanyaan: Siapakah presiden pertama Indonesia?
A. Soeharto
B. Joko Widodo
C. Soekarno
D. B.J. Habibie
E. Megawati
Jawaban benar: C
Penjelasan: Soekarno adalah presiden pertama Indonesia yang menjabat dari tahun 1945 hingga 1967.
`;
      
      const questions = parseGeneratedQuestions(generatedText, category);
      displayGeneratedQuestions(questions, aiResults);
      
    } catch (error) {
      console.error('Error generating questions:', error);
      aiResults.innerHTML = `<p class="error">Gagal membuat soal: ${error.message}</p>`;
    } finally {
      this.disabled = false;
      this.textContent = 'Generate Soal';
    }
  });
  
  // Print certificate button
  document.getElementById('print-btn').addEventListener('click', printCertificate);
  document.getElementById('print-certificate-btn').addEventListener('click', showCertificate);
  
  // Close certificate button
  document.getElementById('close-certificate-btn').addEventListener('click', function() {
    switchScreen('certificate-screen', 'results-screen', 'slideInUp');
  });
  
  // Retake exam button
  document.getElementById('retake-exam-btn').addEventListener('click', function() {
    if (confirm('Apakah Anda ingin mengulang ujian? Hasil sebelumnya akan direset.')) {
      localStorage.removeItem('currentExam');
      localStorage.removeItem('examAnswers');
      switchScreen('results-screen', 'exam-selection-screen', 'slideInUp');
    }
  });
  
  // Exam screen buttons
  document.getElementById('finish-exam-btn').addEventListener('click', function() {
    if (confirm('Apakah Anda yakin ingin menyelesaikan ujian sekarang? Soal yang belum dijawab akan dianggap salah.')) {
      finishExam();
    }
  });
  
  document.getElementById('skip-question-btn').addEventListener('click', skipQuestion);
  document.getElementById('unanswered-btn').addEventListener('click', showUnanswered);
});

// Parse generated questions from AI text
function parseGeneratedQuestions(text, category) {
  const questionBlocks = text.split('\n\n').filter(block => block.trim());
  const questions = [];
  
  let currentQuestion = null;
  
  questionBlocks.forEach(block => {
    const lines = block.split('\n').map(line => line.trim()).filter(line => line);
    
    if (lines[0].toLowerCase().startsWith('pertanyaan:')) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      
      currentQuestion = {
        text: lines[0].substring('pertanyaan:'.length).trim(),
        options: {},
        category,
        explanation: ''
      };
    } else if (currentQuestion) {
      if (lines[0].match(/^[A-E]\.\s/)) {
        const option = lines[0].charAt(0);
        const optionText = lines[0].substring(2).trim();
        currentQuestion.options[option] = optionText;
      } else if (lines[0].toLowerCase().startsWith('jawaban benar:')) {
        currentQuestion.correctAnswer = lines[0].substring('jawaban benar:'.length).trim().charAt(0);
      } else if (lines[0].toLowerCase().startsWith('penjelasan:')) {
        currentQuestion.explanation = lines[0].substring('penjelasan:'.length).trim();
      }
    }
  });
  
  if (currentQuestion) {
    questions.push(currentQuestion);
  }
  
  return questions;
}

// Display generated questions
function displayGeneratedQuestions(questions, container) {
  if (questions.length === 0) {
    container.innerHTML = '<p>Tidak ada soal yang dapat diparsing dari hasil AI.</p>';
    return;
  }
  
  container.innerHTML = `
    <h3>Hasil Generate (${questions.length} soal)</h3>
    <p>Review soal sebelum disimpan:</p>
  `;
  
  questions.forEach((q, i) => {
    const questionEl = document.createElement('div');
    questionEl.className = 'generated-question';
    questionEl.innerHTML = `
      <div class="generated-question-header">
        <h4>Soal #${i + 1}</h4>
        <button class="btn-small save-generated-question" data-index="${i}">Simpan</button>
      </div>
      <div class="generated-question-content">
        <p><strong>Pertanyaan:</strong> ${q.text}</p>
        <p><strong>Kategori:</strong> ${q.category.toUpperCase()}</p>
        <div class="generated-options">
          ${Object.entries(q.options).map(([opt, text]) => `
            <p><strong>${opt}.</strong> ${text} ${opt === q.correctAnswer ? '✓' : ''}</p>
          `).join('')}
        </div>
        ${q.explanation ? `<p><strong>Penjelasan:</strong> ${q.explanation}</p>` : ''}
      </div>
    `;
    
    container.appendChild(questionEl);
  });
  
  // Add event listeners to save buttons
  document.querySelectorAll('.save-generated-question').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      saveGeneratedQuestion(questions[index]);
    });
  });
}

// Save generated question
function saveGeneratedQuestion(question) {
  let questions = JSON.parse(localStorage.getItem('questions') || '[]');
  
  // Add ID to the question
  question.id = Date.now().toString();
  
  questions.push(question);
  localStorage.setItem('questions', JSON.stringify(questions));
  
  alert('Soal berhasil disimpan ke bank soal!');
  loadQuestionBank();
}
