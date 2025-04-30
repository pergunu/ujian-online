class QuizEngine {
  constructor() {
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timer = null;
    this.timeLeft = 3600; // 60 menit dalam detik
    this.answeredQuestions = 0;
    this.maxQuestions = 100;
    this.maxTime = 14400; // 4 jam dalam detik
    this.participantData = null;
    this.selectedCategory = null;
    this.selectedLevel = null;
    this.usedQuestionIds = new Set();
  }

  async init(category, level, participantData) {
    this.selectedCategory = category;
    this.selectedLevel = level;
    this.participantData = participantData;
    
    // Load questions based on category and level
    await this.loadQuestions();
    
    // Start timer
    this.startTimer();
    
    // Show first question
    this.displayQuestion();
  }

  async loadQuestions() {
    try {
      // Load from appropriate JSON file based on category and level
      let filePath = '';
      
      if (['logika', 'lagu', 'pribahasa'].includes(this.selectedCategory)) {
        filePath = `data/questions/${this.selectedCategory}/umum.json`;
      } else if (this.selectedCategory === 'umum') {
        filePath = `data/questions/umum/${this.selectedLevel}.json`;
      } else {
        filePath = `data/questions/pelajar/${this.selectedCategory}/${this.selectedLevel}.json`;
      }
      
      const response = await fetch(filePath);
      let allQuestions = await response.json();
      
      // Filter out already used questions
      allQuestions = allQuestions.filter(q => !this.usedQuestionIds.has(q.id));
      
      // Shuffle and select questions
      this.questions = this.shuffleArray(allQuestions).slice(0, this.maxQuestions);
      
      // Mark these questions as used
      this.questions.forEach(q => this.usedQuestionIds.add(q.id));
    } catch (error) {
      console.error('Error loading questions:', error);
      // Fallback to AI-generated questions
      await this.generateAIBackupQuestions();
    }
  }

  async generateAIBackupQuestions() {
    // Integration with AI for question generation
    const aiResponse = await fetchAIGeneratedQuestions(
      this.selectedCategory, 
      this.selectedLevel,
      this.maxQuestions - this.questions.length
    );
    
    this.questions = this.questions.concat(aiResponse.questions);
  }

  displayQuestion() {
    if (this.currentQuestionIndex >= this.questions.length || this.answeredQuestions >= this.maxQuestions) {
      this.endQuiz();
      return;
    }
    
    const question = this.questions[this.currentQuestionIndex];
    const questionElement = document.getElementById('question-container');
    
    // Build question HTML with detailed explanation
    questionElement.innerHTML = `
      <div class="question-card">
        <div class="question-header">
          <span class="question-number">Soal ${this.currentQuestionIndex + 1} dari ${this.maxQuestions}</span>
          <span class="timer">${this.formatTime(this.timeLeft)}</span>
        </div>
        
        <div class="question-content">
          <h3>${question.question}</h3>
          ${question.context ? `<p class="question-context">${question.context}</p>` : ''}
        </div>
        
        <div class="options-container">
          ${question.options.map((opt, idx) => `
            <div class="option" data-option="${idx}">
              <div class="option-letter">${String.fromCharCode(65 + idx)}</div>
              <div class="option-content">
                <div class="option-text">${opt.text}</div>
                ${opt.explanation ? `<div class="option-explanation">${opt.explanation}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // Add event listeners to options
    document.querySelectorAll('.option').forEach(opt => {
      opt.addEventListener('click', () => this.checkAnswer(opt.dataset.option));
    });
  }

  checkAnswer(selectedOption) {
    const question = this.questions[this.currentQuestionIndex];
    const isCorrect = selectedOption == question.correctAnswer;
    
    if (isCorrect) {
      this.score++;
      this.playSound('correct');
      this.showFeedback(true, question.options[selectedOption].explanation);
    } else {
      this.playSound('wrong');
      this.showFeedback(false, question.options[question.correctAnswer].explanation);
    }
    
    this.answeredQuestions++;
    this.currentQuestionIndex++;
    
    // Delay before next question
    setTimeout(() => {
      this.displayQuestion();
    }, 2000);
  }

  showFeedback(isCorrect, correctExplanation) {
    const feedbackMessages = {
      correct: [
        "Wow, kamu cerdas sekali!",
        "Luar biasa! Saya iri sama kamu!",
        "Benar! Pengetahuanmu sangat mengagumkan!",
        "Mantap! Jawaban yang tepat!",
        "Kamu benar-benar memahami materi ini!"
      ],
      incorrect: [
        "Wah, kamu salah… tapi jangan menyerah ya!",
        "Hampir benar kok, coba lagi yuk!",
        "Salah, tapi gapapa! Ini peluang untuk belajar!",
        "Jawaban kurang tepat, tapi kamu pasti bisa!",
        "Oops! Coba perhatikan lagi ya!"
      ]
    };
    
    const randomMessage = feedbackMessages[isCorrect ? 'correct' : 'incorrect'][
      Math.floor(Math.random() * feedbackMessages[isCorrect ? 'correct' : 'incorrect'].length)
    ];
    
    const feedbackElement = document.createElement('div');
    feedbackElement.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackElement.innerHTML = `
      <h3>${isCorrect ? '✅ Benar!' : '❌ Salah'}</h3>
      <p>${randomMessage}</p>
      ${!isCorrect ? `
        <div class="correct-answer">
          <strong>Jawaban yang benar:</strong>
          <p>${correctExplanation}</p>
        </div>
      ` : ''}
    `;
    
    document.getElementById('feedback-container').appendChild(feedbackElement);
    
    // Animate feedback
    setTimeout(() => {
      feedbackElement.classList.add('show');
    }, 10);
    
    // Remove after animation
    setTimeout(() => {
      feedbackElement.classList.remove('show');
      setTimeout(() => feedbackElement.remove(), 500);
    }, 2000);
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.timeLeft--;
      document.querySelector('.timer').textContent = this.formatTime(this.timeLeft);
      
      if (this.timeLeft <= 0) {
        this.endQuiz();
      }
      
      // Check prayer times
      this.checkPrayerTimes();
    }, 1000);
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  async checkPrayerTimes() {
    const currentTime = new Date();
    const prayerTimes = await getPrayerTimes();
    
    for (const [prayer, time] of Object.entries(prayerTimes)) {
      const prayerTime = new Date(time);
      const diff = (prayerTime - currentTime) / (1000 * 60); // Difference in minutes
      
      if (diff > 0 && diff < 5) {
        this.showPrayerNotification(prayer);
      }
    }
  }

  showPrayerNotification(prayerName) {
    const notification = document.createElement('div');
    notification.className = 'prayer-notification';
    notification.innerHTML = `
      <div class="prayer-content">
        <h3>Waktu Sholat ${prayerName} hampir tiba</h3>
        <p>Silakan berhenti sejenak untuk menunaikan sholat</p>
        <button class="btn-dismiss">Saya Mengerti</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Play adhan sound
    this.playSound('adhan');
    
    // Dismiss button
    notification.querySelector('.btn-dismiss').addEventListener('click', () => {
      notification.remove();
    });
  }

  endQuiz() {
    clearInterval(this.timer);
    
    const percentage = Math.round((this.score / this.answeredQuestions) * 100);
    let grade, message, color;
    
    if (percentage <= 25) {
      grade = 'D';
      message = 'Tetap semangat, belajar dari kesalahan adalah kunci sukses!';
      color = '#ff0000';
    } else if (percentage <= 50) {
      grade = 'C';
      message = 'Hasil yang bagus, tetap berusaha untuk lebih baik lagi!';
      color = '#ff9900';
    } else if (percentage <= 75) {
      grade = 'B';
      message = 'Keren! Pemahaman kamu sudah sangat baik!';
      color = '#0066ff';
    } else {
      grade = 'A+';
      message = 'Luar biasa! Kamu benar-benar ahli! Saya bangga pada kamu!';
      color = '#009933';
    }
    
    // Show results
    document.getElementById('quiz-container').innerHTML = `
      <div class="result-container">
        <h2>Hasil Quiz</h2>
        <div class="score-display" style="color: ${color}; border-color: ${color}">
          <div class="score-percentage">${percentage}%</div>
          <div class="score-grade">${grade}</div>
        </div>
        <p class="score-message">${message}</p>
        <p class="score-detail">Kamu menjawab ${this.score} dari ${this.answeredQuestions} soal dengan benar</p>
        
        <div class="participant-info">
          <h3>Informasi Peserta</h3>
          <p>Nama: ${this.participantData.name}</p>
          ${this.participantData.category === 'pelajar' ? 
            `<p>Sekolah: ${this.participantData.school}</p>` : 
            `<p>Profesi: ${this.participantData.profession}</p>`}
          <p>Usia: ${this.participantData.age}</p>
        </div>
        
        <button id="btn-like" class="btn-like">
          <span>❤️ Saya suka game quiz PERGUNU</span>
        </button>
        
        <button id="btn-restart" class="btn-restart">
          Main Lagi
        </button>
      </div>
    `;
    
    // Add event listener for like button
    document.getElementById('btn-like').addEventListener('click', () => {
      this.showLikeAnimation();
    });
    
    // Add event listener for restart button
    document.getElementById('btn-restart').addEventListener('click', () => {
      location.reload();
    });
  }

  showLikeAnimation() {
    const container = document.querySelector('.result-container');
    const confetti = document.createElement('div');
    confetti.className = 'confetti-container';
    
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.appendChild(particle);
    }
    
    container.appendChild(confetti);
    this.playSound('applause');
    
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }

  playSound(type) {
    const audio = new Audio(`assets/audio/${type}.mp3`);
    audio.play().catch(e => console.log('Audio play failed:', e));
  }

  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
}
