
import { CONFIG } from './config.js';
import { QuizEngine } from './quiz-engine.js';
import { UIManager } from './ui-manager.js';
import { Auth } from './auth.js';

class QuizApp {
  constructor() {
    this.quizEngine = new QuizEngine();
    this.uiManager = new UIManager();
    this.timerInterval = null;
    this.timeLeft = CONFIG.TIME_LIMIT;
    
    this.init();
  }

  init() {
    // Cek apakah di halaman admin
    if (window.location.pathname.includes('admin')) {
      Auth.checkAuth();
      return;
    }
    
    // Setup event listeners
    document.addEventListener('quizStarted', (e) => this.startQuiz(e.detail));
    document.addEventListener('pauseQuiz', this.pauseQuiz);
    
    // Cek waktu sholat setiap 5 menit
    setInterval(() => this.uiManager.checkPrayerTime(), 300000);
    
    // Shortcut untuk admin (Ctrl+Alt+A)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.altKey && e.key === 'a') {
        window.location.href = '/admin';
      }
    });
  }

  async startQuiz(quizParams) {
    // Inisialisasi quiz
    const success = await this.quizEngine.initializeQuiz(quizParams);
    
    if (!success) {
      alert('Gagal memuat soal. Silakan coba lagi.');
      return;
    }
    
    // Mulai timer
    this.startTimer();
    
    // Tampilkan soal pertama
    this.showCurrentQuestion();
  }

  showCurrentQuestion() {
    const question = this.quizEngine.getCurrentQuestion();
    this.uiManager.displayQuestion(question);
  }

  startTimer() {
    this.updateTimerDisplay();
    
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateTimerDisplay();
      
      if (this.timeLeft <= 0) {
        this.endQuiz();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    document.getElementById('timer').textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (this.timeLeft < 300) { // 5 menit tersisa
      document.getElementById('timer').classList.add('text-danger');
    }
  }

  submitAnswer() {
    const selectedOption = document.querySelector('.option.selected');
    
    if (!selectedOption) {
      alert('Pilih jawaban terlebih dahulu!');
      return;
    }
    
    const answer = selectedOption.dataset.option;
    const result = this.quizEngine.submitAnswer(answer);
    
    // Tampilkan feedback
    this.uiManager.showFeedback(
      result.isCorrect,
      result.correctAnswer,
      result.explanation
    );
    
    // Jika masih ada soal, lanjut ke berikutnya
    if (this.quizEngine.nextQuestion()) {
      setTimeout(() => this.showCurrentQuestion(), 2000);
    } else {
      this.endQuiz();
    }
  }

  skipQuestion() {
    if (!confirm("Lewati soal ini? Soal yang dilewati dihitung sebagai salah.")) {
      return;
    }
    
    // Submit jawaban kosong (salah)
    this.quizEngine.submitAnswer(null);
    
    // Lanjut ke soal berikutnya
    if (this.quizEngine.nextQuestion()) {
      this.showCurrentQuestion();
    } else {
      this.endQuiz();
    }
  }

  pauseQuiz() {
    clearInterval(this.timerInterval);
    this.uiManager.showPauseScreen();
  }

  resumeQuiz() {
    this.startTimer();
    this.uiManager.hidePauseScreen();
  }

  endQuiz() {
    clearInterval(this.timerInterval);
    const finalScore = this.quizEngine.getFinalScore();
    this.uiManager.showFinalResults(finalScore);
  }

  restartQuiz() {
    this.timeLeft = CONFIG.TIME_LIMIT;
    document.getElementById('timer').classList.remove('text-danger');
    this.uiManager.resetUI();
    this.uiManager.showRegistrationForm();
  }
}

// Jalankan aplikasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  new QuizApp();
});
