import QuizEngine from './quiz-engine.js';
import Auth from './auth.js';

class QuizApp {
    constructor() {
        this.quiz = new QuizEngine();
        this.auth = new Auth();
        this.init();
    }

    init() {
        console.log('Aplikasi berjalan!');
        // Inisialisasi aplikasi
    }
}

new QuizApp();
