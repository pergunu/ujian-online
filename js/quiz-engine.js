export default class QuizEngine {
    constructor() {
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
    }

    async loadQuestions(category) {
        const response = await fetch(`data/questions/${category}.json`);
        this.questions = await response.json();
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            return true;
        }
        return false;
    }
}
