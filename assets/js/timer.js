class ExamTimer {
    constructor(durationInMinutes, displayElement, warningCallback, finishCallback) {
        this.duration = durationInMinutes * 60; // Convert to seconds
        this.remainingTime = this.duration;
        this.displayElement = displayElement;
        this.warningCallback = warningCallback;
        this.finishCallback = finishCallback;
        this.interval = null;
        this.warningTriggered = false;
    }
    
    start() {
        this.updateDisplay();
        this.interval = setInterval(() => this.tick(), 1000);
    }
    
    tick() {
        this.remainingTime--;
        this.updateDisplay();
        
        // Check for warning (last 10 minutes)
        if (this.remainingTime <= 600 && !this.warningTriggered) {
            this.warningTriggered = true;
            if (this.warningCallback) this.warningCallback();
        }
        
        // Check if time is up
        if (this.remainingTime <= 0) {
            this.stop();
            if (this.finishCallback) this.finishCallback();
        }
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        
        this.displayElement.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Apply warning styles if less than 10 minutes
        if (this.remainingTime <= 600) {
            this.displayElement.classList.add('timer-warning');
            
            if (this.remainingTime <= 60) {
                this.displayElement.classList.add('timer-critical');
            }
        }
    }
    
    stop() {
        clearInterval(this.interval);
    }
    
    getRemainingTime() {
        return this.remainingTime;
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

function initializeTimer(durationInMinutes, displayId, warningCallback, finishCallback) {
    const displayElement = document.getElementById(displayId);
    return new ExamTimer(durationInMinutes, displayElement, warningCallback, finishCallback);
}
