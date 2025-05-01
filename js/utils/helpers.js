export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const createConfetti = () => {
    const colors = ['#2563eb', '#1d4ed8', '#dc2626', '#16a34a', '#d97706'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
};

export const playAudio = (audioElement) => {
    const promise = audioElement.play();
    if (promise !== undefined) {
        promise.catch(error => console.log("Autoplay prevented:", error));
    }
};
