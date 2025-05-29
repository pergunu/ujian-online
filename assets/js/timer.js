// Timer Module
class ExamTimer {
  constructor(duration = 7200) { // Default 120 minutes in seconds
    this.duration = duration;
    this.timeLeft = duration;
    this.timerInterval = null;
    this.isRunning = false;
    this.warningTriggered = false;
  }

  start(callback) {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.warningTriggered = false;
    this.updateDisplay();
    
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateDisplay();
      
      // Trigger warning when 10 minutes left
      if (this.timeLeft <= 600 && !this.warningTriggered) {
        this.triggerWarning();
        this.warningTriggered = true;
      }
      
      // Timer finished
      if (this.timeLeft <= 0) {
        this.stop();
        if (typeof callback === 'function') {
          callback();
        }
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
  }

  reset() {
    this.stop();
    this.timeLeft = this.duration;
    this.updateDisplay();
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    
    const timerDisplay = document.getElementById('exam-timer');
    if (timerDisplay) {
      timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      
      // Change color when time is running out
      if (this.timeLeft <= 600) { // 10 minutes
        timerDisplay.classList.add('warning');
        
        // Make timer bigger when 10 minutes left
        if (this.timeLeft <= 600 && !timerDisplay.classList.contains('big')) {
          timerDisplay.classList.add('big');
        }
      } else {
        timerDisplay.classList.remove('warning', 'big');
      }
    }
  }

  triggerWarning() {
    const warningElement = document.getElementById('time-warning');
    if (warningElement) {
      warningElement.style.display = 'block';
      
      // Hide warning when 1 minute left
      setTimeout(() => {
        if (this.timeLeft <= 60) {
          warningElement.style.display = 'none';
        }
      }, (600 - 60) * 1000); // 9 minutes later
    }
  }

  setDuration(minutes) {
    this.duration = minutes * 60;
    this.reset();
  }

  getTimeLeft() {
    return {
      minutes: Math.floor(this.timeLeft / 60),
      seconds: this.timeLeft % 60
    };
  }
}

// Initialize timer when exam starts
function initExamTimer(duration) {
  const timer = new ExamTimer(duration);
  
  // Start timer when exam begins
  document.getElementById('start-exam-btn')?.addEventListener('click', () => {
    timer.start(() => {
      alert('Waktu ujian telah habis!');
      // Force finish exam
      document.getElementById('finish-exam-btn').click();
    });
  });
  
  return timer;
}
