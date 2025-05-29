// Quiz Engine - Handles all quiz/question logic

class QuizEngine {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timer = null;
        this.timeLeft = 0;
        this.unansweredQuestions = [];
        this.participantData = {};
    }
    
    // Load questions based on category and subject
    async loadQuestions(category, subject) {
        try {
            // In a real app, you would fetch from an API
            // For demo, we'll use sample questions
            this.questions = this.getSampleQuestions(subject);
            return true;
        } catch (error) {
            console.error('Error loading questions:', error);
            return false;
        }
    }
    
    getSampleQuestions(subject) {
        // Sample questions for demonstration
        // In a real app, these would come from a database
        const sampleQuestions = {
            'AGAMA': [
                {
                    id: 1,
                    text: "Apa rukun Islam yang pertama?",
                    options: [
                        { id: 'A', text: "Shalat" },
                        { id: 'B', text: "Zakat" },
                        { id: 'C', text: "Syahadat" },
                        { id: 'D', text: "Puasa" },
                        { id: 'E', text: "Haji" }
                    ],
                    correctAnswer: 'C',
                    explanation: "Rukun Islam yang pertama adalah mengucapkan dua kalimat syahadat."
                }
            ],
            'PPKN': [
                {
                    id: 1,
                    text: "Apa dasar negara Indonesia?",
                    options: [
                        { id: 'A', text: "UUD 1945" },
                        { id: 'B', text: "Pancasila" },
                        { id: 'C', text: "Bhineka Tunggal Ika" },
                        { id: 'D', text: "NKRI" },
                        { id: 'E', text: "Bhinneka Tunggal Ika" }
                    ],
                    correctAnswer: 'B',
                    explanation: "Dasar negara Indonesia adalah Pancasila."
                }
            ],
            // Add more sample questions for other subjects
            'default': [
                {
                    id: 1,
                    text: `Ini adalah contoh pertanyaan untuk mata ujian ${subject}`,
                    options: [
                        { id: 'A', text: "Pilihan jawaban A" },
                        { id: 'B', text: "Pilihan jawaban B" },
                        { id: 'C', text: "Pilihan jawaban C (benar)" },
                        { id: 'D', text: "Pilihan jawaban D" },
                        { id: 'E', text: "Pilihan jawaban E" }
                    ],
                    correctAnswer: 'C',
                    explanation: `Ini adalah penjelasan mengapa jawaban C adalah yang benar untuk mata ujian ${subject}.`
                }
            ]
        };
        
        return sampleQuestions[subject] || sampleQuestions['default'];
    }
    
    // Start the quiz timer
    startTimer(durationInMinutes, onTick, onComplete) {
        this.timeLeft = durationInMinutes * 60;
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            
            if (typeof onTick === 'function') {
                onTick(this.getFormattedTime());
            }
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                if (typeof onComplete === 'function') {
                    onComplete();
                }
            }
        }, 1000);
    }
    
    // Get formatted time (MM:SS)
    getFormattedTime() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Get current question
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }
    
    // Move to next question
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }
    
    // Move to previous question
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            return true;
        }
        return false;
    }
    
    // Skip current question (marks as unanswered)
    skipQuestion() {
        if (!this.unansweredQuestions.includes(this.currentQuestionIndex)) {
            this.unansweredQuestions.push(this.currentQuestionIndex);
        }
        return this.nextQuestion();
    }
    
    // Answer the current question
    answerQuestion(selectedOption) {
        const question = this.getCurrentQuestion();
        const isCorrect = selectedOption === question.correctAnswer;
        
        // Record the answer
        question.userAnswer = {
            option: selectedOption,
            isCorrect: isCorrect,
            timestamp: new Date().toISOString()
        };
        
        // Update score if correct
        if (isCorrect) {
            this.score += 1;
        }
        
        // Remove from unanswered if it was there
        const index = this.unansweredQuestions.indexOf(this.currentQuestionIndex);
        if (index > -1) {
            this.unansweredQuestions.splice(index, 1);
        }
        
        return {
            isCorrect: isCorrect,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation
        };
    }
    
    // Calculate final score
    calculateFinalScore() {
        const totalQuestions = this.questions.length;
        const correctAnswers = this.questions.filter(q => 
            q.userAnswer && q.userAnswer.isCorrect).length;
        const wrongAnswers = totalQuestions - correctAnswers;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        
        return {
            totalQuestions,
            correctAnswers,
            wrongAnswers,
            percentage,
            unanswered: this.unansweredQuestions.length
        };
    }
    
    // Generate certificate data
    generateCertificateData() {
        const scoreData = this.calculateFinalScore();
        const now = new Date();
        
        // Generate certificate code
        const certCode = this.generateCertificateCode();
        
        return {
            participantName: this.participantData.name,
            participantType: this.participantData.status,
            participantLevel: this.participantData.schoolLevel || 'UMUM',
            subject: this.participantData.subject,
            date: now,
            certificateCode: certCode,
            score: scoreData.percentage,
            motivationText: this.getMotivationText(scoreData.percentage)
        };
    }
    
    generateCertificateCode() {
        const now = new Date();
        const datePart = now.toISOString().split('T')[0].replace(/-/g, '');
        const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
        
        return `${this.participantData.name.substring(0, 3).toUpperCase()}/${datePart}/${randomPart}/PERGUNU-STB`;
    }
    
    getMotivationText(score) {
        if (score >= 90) {
            return "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.";
        } else if (score >= 80) {
            return "Hasil yang sangat baik! Anda telah menunjukkan pemahaman yang mendalam tentang materi ujian.";
        } else if (score >= 70) {
            return "Kerja bagus! Anda memiliki pemahaman yang baik tentang materi, masih ada ruang untuk peningkatan.";
        } else if (score >= 60) {
            return "Anda telah menyelesaikan ujian dengan baik. Teruslah belajar untuk meningkatkan pemahaman.";
        } else {
            return "Jangan menyerah! Setiap tantangan adalah kesempatan untuk belajar dan berkembang.";
        }
    }
    
    // Reset the quiz engine
    reset() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timeLeft = 0;
        this.unansweredQuestions = [];
        
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
}

// Initialize a global quiz engine instance
const quizEngine = new QuizEngine();
