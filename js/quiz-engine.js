
import { CONFIG } from './config.js';
import { QuestionBank } from './database.js';

export class QuizEngine {
  constructor() {
    this.questionBank = new QuestionBank();
    this.currentQuestions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
  }

  async initializeQuiz(quizParams) {
    this.currentQuestions = await this.questionBank.getQuestions(
      quizParams.category,
      quizParams.subject,
      quizParams.level,
      quizParams.difficulty,
      CONFIG.MAX_QUESTIONS
    );
    this.currentIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    return this.currentQuestions.length > 0;
  }

  getCurrentQuestion() {
    return this.currentQuestions[this.currentIndex];
  }

  submitAnswer(answer) {
    const question = this.getCurrentQuestion();
    const isCorrect = answer === question.correctAnswer;
    
    if (isCorrect) {
      const difficultyMultiplier = CONFIG.DIFFICULTY_LEVELS[question.difficulty].multiplier;
      this.score += difficultyMultiplier;
    }
    
    this.userAnswers.push({
      questionId: question.id,
      userAnswer: answer,
      isCorrect,
      timestamp: new Date().toISOString()
    });
    
    return {
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
    };
  }

  nextQuestion() {
    if (this.currentIndex < this.currentQuestions.length - 1) {
      this.currentIndex++;
      return true;
    }
    return false;
  }

  getProgress() {
    return {
      current: this.currentIndex + 1,
      total: this.currentQuestions.length,
      percentage: Math.round(((this.currentIndex + 1) / this.currentQuestions.length) * 100)
    };
  }

  getFinalScore() {
    const totalPossibleScore = this.currentQuestions.reduce((sum, question) => {
      return sum + CONFIG.DIFFICULTY_LEVELS[question.difficulty].multiplier;
    }, 0);
    
    const percentage = Math.round((this.score / totalPossibleScore) * 100);
    
    return {
      score: this.score,
      totalPossible: totalPossibleScore,
      percentage,
      answers: this.userAnswers
    };
  }
}
