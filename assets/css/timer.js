class ExamTimer {
  constructor(durationInMinutes, onTick, onComplete) {
    this.duration = durationInMinutes * 60;
    this.remainingTime = this.duration;
    this.onTick = onTick;
    this.onComplete = onComplete;
    this.timerId = null;
    this.warningTriggered = false;
  }

  start() {
    this.timerId = setInterval(() => {
      this.remainingTime--;
      this.onTick(this.getFormattedTime());
      
      // Peringatan 10 menit terakhir
      if (this.remainingTime <= 600 && !this.warningTriggered) {
        this.warningTriggered = true;
        document.getElementById('timeWarning').classList.remove('hidden');
      }
      
      // Peringatan 1 menit terakhir
      if (this.remainingTime <= 60) {
        document.getElementById('timeWarning').classList.add('hidden');
      }
      
      // Timer habis
      if (this.remainingTime <= 0) {
        this.stop();
        this.onComplete();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }

  getFormattedTime() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
