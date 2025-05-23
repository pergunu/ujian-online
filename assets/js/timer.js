class ExamTimer {
    constructor(duration, displayElement, progressBar, warningElement) {
        this.duration = duration * 60; // Convert minutes to seconds
        this.display = displayElement;
        this.progressBar = progressBar;
        this.warningElement = warningElement;
        this.timer = null;
        this.remainingTime = this.duration;
    }
    
    start() {
        this.timer = setInterval(() => {
            this.updateDisplay();
            this.remainingTime--;
            
            if (this.remainingTime <= 0) {
                this.stop();
                this.timeUp();
            } else if (this.remainingTime <= 600) { // 10 minutes left
                this.showWarning();
                if (this.remainingTime <= 60) { // 1 minute left
                    this.hideWarning();
                }
            }
        }, 1000);
    }
    
    stop() {
        clearInterval(this.timer);
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        
        this.display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        // Update progress bar
        const percentage = (this.remainingTime / this.duration) * 100;
        this.progressBar.style.width = `${percentage}%`;
        
        // Change color when time is running out
        if (this.remainingTime <= 600) { // 10 minutes left
            this.display.style.color = '#e74c3c';
            this.display.style.fontSize = '24px';
        }
    }
    
    showWarning() {
        this.warningElement.classList.remove('hidden');
    }
    
    hideWarning() {
        this.warningElement.classList.add('hidden');
    }
    
    timeUp() {
        // Trigger exam finish
        finishExam();
    }
}

function startTimer(minutes) {
    const timerElement = document.getElementById('examTimer');
    const progressBar = document.getElementById('progressBar');
    const warningElement = document.getElementById('timeWarning');
    
    const examTimer = new ExamTimer(minutes, timerElement, progressBar, warningElement);
    examTimer.start();
    
    return examTimer;
}
