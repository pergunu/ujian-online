import { Config } from './config.js';
import { Auth } from './modules/auth.js';
import { Quiz } from './modules/quiz-engine.js';
import { QuizUI } from './modules/quiz-ui.js';
import { Admin } from './modules/admin.js';
import { AudioManager } from './modules/audio.js';
import { Results } from './modules/results.js';
import { initStars } from './modules/utilities.js';

// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi komponen
    initStars();
    AudioManager.init();
    
    // Inisialisasi modul
    Auth.init();
    Quiz.init();
    QuizUI.init();
    Admin.init();
    Results.init();
    
    // Set default category
    Quiz.setCategory('pelajar');
    
    console.log('Aplikasi Ujian Pergunu telah diinisialisasi');
});
