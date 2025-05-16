import { Config } from '../config.js';
import { AudioManager } from './audio.js';
import { Quiz } from './quiz-engine.js';

export const Auth = (() => {
    // Elemen DOM
    const loginScreen = document.getElementById('loginScreen');
    const examCodeInput = document.getElementById('examCode');
    const loginBtn = document.getElementById('loginBtn');
    
    // Fungsi privat
    const handleLogin = () => {
        const enteredCode = examCodeInput.value.trim();
        
        if (enteredCode === Config.examCode) {
            AudioManager.play('openingSound');
            loginScreen.style.display = 'none';
            Quiz.showOpeningScreen();
        } else {
            alert('Kode ujian salah! Silakan coba lagi.');
        }
    };
    
    // API publik
    return {
        init: () => {
            loginBtn.addEventListener('click', handleLogin);
            examCodeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleLogin();
            });
        }
    };
})();
