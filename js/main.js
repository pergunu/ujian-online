// js/main.js
import { Config } from './config.js';
import { Auth } from './modules/auth.js';
import { Quiz } from './modules/quiz-engine.js';
import { QuizUI } from './modules/quiz-ui.js';
import { Admin } from './modules/admin.js';
import { AudioManager } from './modules/audio.js';
import { Results } from './modules/results.js';
import { Utilities } from './modules/utilities.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi komponen
    Utilities.initStars();
    AudioManager.init();
    Auth.init();
    Quiz.init();
    QuizUI.init();
    Admin.init();
    Results.init();

    console.log("Aplikasi Ujian Pergunu berhasil dimuat.");
});
