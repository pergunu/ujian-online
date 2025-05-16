import { Config } from '../config.js';

export const Utilities = {
    // Format nama dengan kapital di tiap kata
    formatName: (name) => {
        return name.toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },
    
    // Generate unique ID
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Format waktu
    formatTime: (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    // Inisialisasi bintang animasi
    initStars: () => {
        const starsContainer = document.getElementById('stars');
        starsContainer.innerHTML = '';
        
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 3 + 1}px`;
            star.style.height = star.style.width;
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            starsContainer.appendChild(star);
        }
    },
    
    // Buat confetti
    createConfetti: () => {
        const colors = ['#4361ee', '#3a0ca3', '#f72585', '#4cc9f0'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }
};
