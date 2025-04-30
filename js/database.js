
import { CONFIG } from './config.js';

export class QuestionBank {
  constructor() {
    this.categories = {
      umum: ['pengetahuan_umum'],
      pelajar: ['ipa', 'ips', 'matematika', 'bahasa_indonesia', 'bahasa_inggris', 'sejarah', 'ppkn', 'agama'],
      logika: ['tebak_logika'],
      lagu: ['sambung_lagu'],
      pribahasa: ['sambung_pribahasa']
    };
    
    this.levels = ['sd', 'smp', 'sma', 'umum'];
    this.difficulties = ['mudah', 'sedang', 'sulit'];
  }

  async getQuestions(category, subject, level, difficulty, count) {
    if (!this.isValidRequest(category, subject, level, difficulty)) {
      console.error('Invalid question request parameters');
      return [];
    }
    
    try {
      const response = await fetch(this.getDataPath(category, subject, level));
      let questions = await response.json();
      
      // Filter berdasarkan kesulitan dan acak
      questions = questions.filter(q => q.difficulty === difficulty);
      return this.shuffleArray(questions).slice(0, count);
    } catch (error) {
      console.error('Error loading questions:', error);
      return [];
    }
  }

  isValidRequest(category, subject, level, difficulty) {
    return this.categories[category]?.includes(subject) &&
           this.levels.includes(level) &&
           this.difficulties.includes(difficulty);
  }

  getDataPath(category, subject, level) {
    if (category === 'umum') {
      return `data/umum/${level}.json`;
    } else if (['logika', 'lagu', 'pribahasa'].includes(category)) {
      return `data/${category}/umum.json`;
    } else {
      return `data/pelajar/${subject}/${level}.json`;
    }
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async addQuestion(questionData) {
    // Validasi data soal
    if (!this.validateQuestion(questionData)) {
      return false;
    }
    
    // Dalam implementasi nyata, ini akan mengirim ke server
    console.log('Question added:', questionData);
    return true;
  }

  validateQuestion(question) {
    const requiredFields = [
      'category', 'subject', 'level', 'difficulty',
      'question', 'options', 'correctAnswer', 'explanation'
    ];
    
    return requiredFields.every(field => question[field]) &&
           this.isValidRequest(question.category, question.subject, question.level, question.difficulty);
  }
}
