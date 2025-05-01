class QuizEngine {
    static init() {
        this.currentCategory = 'pelajar';
        this.currentSubcategory = 'ipa';
        this.currentLevel = 'mudah';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timer = null;
        this.quizStartTime = null;
        this.questions = [];
    }

    static async loadQuestions(category, subcategory, level) {
        try {
            this.questions = await Database.loadQuestions(category, subcategory, level);
            return this.questions;
        } catch (error) {
            console.error("Error loading questions:", error);
            return [];
        }
    }

    static startQuiz(participantData) {
        this.currentCategory = participantData.category;
        this.currentSubcategory = participantData.subcategory;
        this.currentLevel = participantData.level;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.quizStartTime = new Date();
        
        this.startTimer();
        UIManager.showQuestion(this.getCurrentQuestion());
    }

    static getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    static checkAnswer(selectedIndex) {
        const question = this.getCurrentQuestion();
        const isCorrect = selectedIndex === question.answer;
        
        question.userAnswer = selectedIndex;
        question.isCorrect = isCorrect;
        
        if (isCorrect) {
            this.score++;
            UIManager.playSound('correct');
        } else {
            UIManager.playSound('wrong');
        }
        
        return {
            isCorrect,
            correctAnswer: question.answer,
            explanation: question.explanation
        };
    }

    static nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            UIManager.showQuestion(this.getCurrentQuestion());
        } else {
            this.finishQuiz();
        }
    }

    static finishQuiz() {
        this.stopTimer();
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const timeTaken = (new Date() - this.quizStartTime) / 1000;
        
        Database.saveScore(UserManager.getCurrentUser().id, {
            score: this.score,
            totalQuestions: this.questions.length,
            percentage,
            timeTaken,
            category: this.currentCategory,
            subcategory: this.currentSubcategory,
            level: this.currentLevel
        });
        
        UIManager.showResults({
            score: this.score,
            totalQuestions: this.questions.length,
            percentage,
            timeTaken
        });
    }

    static startTimer() {
        let timeLeft = Config.quizDuration;
        UIManager.updateTimerDisplay(timeLeft);
        
        this.timer = setInterval(() => {
            timeLeft--;
            UIManager.updateTimerDisplay(timeLeft);
            
            if (timeLeft <= 0) {
                this.finishQuiz();
            }
        }, 1000);
    }

    static stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}

export default QuizEngine;
