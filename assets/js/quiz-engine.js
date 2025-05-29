// Quiz Engine
class QuizEngine {
  constructor() {
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timer = null;
    this.timeLeft = 7200; // 120 minutes in seconds
    this.userAnswers = {};
    this.examStarted = false;
  }

  async loadQuestions(category, level) {
    try {
      const response = await fetch(`data/questions.json`);
      const data = await response.json();
      this.questions = data.filter(q => q.category === category && q.level === level);
      this.shuffleQuestions();
      return this.questions.length > 0;
    } catch (error) {
      console.error('Error loading questions:', error);
      return false;
    }
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }

  startExam() {
    this.examStarted = true;
    this.startTimer();
    this.displayQuestion();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      
      if (this.timeLeft <= 600) { // 10 minutes left
        document.getElementById('time-warning').style.display = 'block';
      }
      
      if (this.timeLeft <= 0) {
        this.finishExam();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    const timerDisplay = document.getElementById('exam-timer');
    
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (this.timeLeft <= 600) { // 10 minutes left
      timerDisplay.classList.add('warning');
    }
  }

  displayQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.finishExam();
      return;
    }

    const question = this.questions[this.currentQuestionIndex];
    const questionContainer = document.getElementById('question-container');
    
    // Build question HTML
    let html = `
      <div class="question">
        <h3>Soal ${this.currentQuestionIndex + 1}</h3>
        <p>${question.text}</p>
    `;
    
    // Add image if exists
    if (question.image) {
      html += `<img src="${question.image}" alt="Question Image" class="question-image">`;
    }
    
    html += `<div class="options">`;
    
    // Add options
    question.options.forEach((option, index) => {
      const isAnswered = this.userAnswers[this.currentQuestionIndex] !== undefined;
      const isCorrect = index === question.correctAnswer;
      const isSelected = this.userAnswers[this.currentQuestionIndex] === index;
      
      let optionClass = 'option';
      if (isAnswered) {
        if (isSelected) {
          optionClass += isCorrect ? ' correct' : ' incorrect';
        } else if (isCorrect) {
          optionClass += ' correct';
        }
      }
      
      html += `
        <div class="${optionClass}" data-index="${index}">
          <span class="option-letter">${String.fromCharCode(65 + index)}</span>
          <span class="option-text">${option}</span>
          ${isAnswered && isCorrect ? '<span class="explanation">' + question.explanation + '</span>' : ''}
        </div>
      `;
    });
    
    html += `</div></div>`;
    
    questionContainer.innerHTML = html;
    
    // Update progress
    this.updateProgress();
    
    // Add event listeners to options if not answered yet
    if (this.userAnswers[this.currentQuestionIndex] === undefined) {
      document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => this.selectAnswer(option));
      });
    }
  }

  selectAnswer(optionElement) {
    const selectedIndex = parseInt(optionElement.dataset.index);
    const question = this.questions[this.currentQuestionIndex];
    
    // Play sound effect
    const isCorrect = selectedIndex === question.correctAnswer;
    const audio = document.getElementById(isCorrect ? 'correctAudio' : 'wrongAudio');
    audio.currentTime = 0;
    audio.play();
    
    // Mark answer
    this.userAnswers[this.currentQuestionIndex] = selectedIndex;
    
    // Update UI
    optionElement.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      this.score += question.points || 1;
    }
    
    // Show explanation for correct answer
    if (!isCorrect) {
      document.querySelector(`.option[data-index="${question.correctAnswer}"]`).classList.add('correct');
    }
    
    // Disable further selection
    document.querySelectorAll('.option').forEach(opt => {
      opt.style.pointerEvents = 'none';
    });
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.displayQuestion();
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.displayQuestion();
    }
  }

  updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${this.currentQuestionIndex + 1}/${this.questions.length}`;
  }

  finishExam() {
    clearInterval(this.timer);
    this.examStarted = false;
    
    // Calculate results
    const totalQuestions = this.questions.length;
    const correctAnswers = Object.values(this.userAnswers).reduce((acc, answer, index) => {
      return acc + (answer === this.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const wrongAnswers = totalQuestions - correctAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Display results
    document.getElementById('total-questions').textContent = totalQuestions;
    document.getElementById('correct-answers').textContent = correctAnswers;
    document.getElementById('wrong-answers').textContent = wrongAnswers;
    document.getElementById('score').textContent = score;
    
    // Show answers details
    const answersDetails = document.getElementById('answers-details');
    answersDetails.innerHTML = '';
    
    this.questions.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      const answerItem = document.createElement('div');
      answerItem.className = `answer-item ${isCorrect ? 'correct' : 'wrong'}`;
      
      answerItem.innerHTML = `
        <h4>Soal ${index + 1}</h4>
        <p>${question.text}</p>
        <p>Jawaban Anda: <strong>${userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : 'Tidak dijawab'}</strong></p>
        <p>Jawaban benar: <strong>${String.fromCharCode(65 + question.correctAnswer)}</strong></p>
        ${question.explanation ? `<p class="explanation">Penjelasan: ${question.explanation}</p>` : ''}
      `;
      
      answersDetails.appendChild(answerItem);
    });
    
    // Switch to results screen
    document.getElementById('exam-screen').classList.remove('active');
    document.getElementById('results-screen').classList.add('active');
    
    // Generate certificate
    this.generateCertificate();
  }

  generateCertificate() {
    // Get participant data from form
    const fullname = document.getElementById('fullname').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const level = document.getElementById('school-level')?.value || 'umum';
    const subject = document.querySelector('.subject-btn.selected')?.dataset.subject || 'umum';
    
    // Calculate date
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '');
    
    // Generate unique code
    const uniqueCode = Math.random().toString(36).substring(2, 6).toUpperCase() + 
                      '-' + Math.random().toString(36).substring(2, 5).toUpperCase();
    
    // Build certificate code
    const certificateCode = `${fullname.toUpperCase().replace(/ /g, '_')}/${status.toUpperCase()}/${level.toUpperCase()}/${subject.toUpperCase()}/${dateStr}/${uniqueCode}/PERGUNU-STB`;
    
    // Set certificate data
    document.getElementById('certificate-name').textContent = fullname;
    document.getElementById('certificate-score').textContent = document.getElementById('score').textContent;
    document.getElementById('certificate-code').textContent = certificateCode;
    document.getElementById('certificate-date').textContent = `Ditetapkan di: Situbondo, ${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    
    // Set motivation text based on score
    const score = parseInt(document.getElementById('score').textContent);
    let motivation = '';
    
    if (score >= 90) {
      motivation = 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
    } else if (score >= 75) {
      motivation = 'Bagus! Anda telah menunjukkan pemahaman yang baik terhadap materi ujian.';
    } else if (score >= 60) {
      motivation = 'Cukup baik. Masih ada ruang untuk meningkatkan pemahaman Anda.';
    } else {
      motivation = 'Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.';
    }
    
    document.getElementById('certificate-motivation').textContent = motivation;
    
    // Play applause sound
    document.getElementById('applauseAudio').play();
  }
}

// Initialize quiz engine
const quizEngine = new QuizEngine();

// Event listeners for exam controls
document.getElementById('next-question-btn')?.addEventListener('click', () => quizEngine.nextQuestion());
document.getElementById('prev-question-btn')?.addEventListener('click', () => quizEngine.prevQuestion());
document.getElementById('finish-exam-btn')?.addEventListener('click', () => quizEngine.finishExam());
document.getElementById('unanswered-btn')?.addEventListener('click', () => {
  // Find first unanswered question
  for (let i = 0; i < quizEngine.questions.length; i++) {
    if (quizEngine.userAnswers[i] === undefined) {
      quizEngine.currentQuestionIndex = i;
      quizEngine.displayQuestion();
      break;
    }
  }
});

// Certificate buttons
document.getElementById('view-certificate-btn')?.addEventListener('click', () => {
  document.getElementById('results-screen').classList.remove('active');
  document.getElementById('certificate-screen').classList.add('active');
});

document.getElementById('back-to-results-btn')?.addEventListener('click', () => {
  document.getElementById('certificate-screen').classList.remove('active');
  document.getElementById('results-screen').classList.add('active');
});

document.getElementById('print-certificate-btn')?.addEventListener('click', () => {
  window.print();
});
