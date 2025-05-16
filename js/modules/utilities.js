// js/modules/utilities.js
export const initStars = () => {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = star.style.height = `${Math.random() * 2 + 1}px`;
        star.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        starsContainer.appendChild(star);
    }
};

export const createConfetti = () => {
    const colors = ['#4361ee', '#3a0ca3', '#f72585', '#4cc9f0'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.bottom = '100%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
};
