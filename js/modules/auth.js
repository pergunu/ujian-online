// js/modules/auth.js
import { Config } from '../config.js';
import { Quiz } from '../quiz-engine.js';
import { AudioManager } from '../audio.js';

export const Auth = (() => {
    const loginBtn = document.getElementById('loginBtn');
    const examCodeInput = document.getElementById('examCode');

    const handleLogin = () => {
        if (examCodeInput.value === Config.examCode) {
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('openingScreen').style.display = 'flex';
            AudioManager.playSound('openingSound');
        } else {
            alert("Kode ujian salah!");
        }
    };

    return {
        init: () => {
            loginBtn.addEventListener('click', handleLogin);
            examCodeInput.addEventListener('keypress', e => {
                if (e.key === 'Enter') handleLogin();
            });
        }
    };
})();
