const ScoreManager = {
    currentScore: null,
    scoreHistory: [],
    
    init: function() {
        // Load score history dari localStorage
        const savedHistory = localStorage.getItem('quizScoreHistory');
        if (savedHistory) {
            this.scoreHistory = JSON.parse(savedHistory);
        }
    },
    
    saveScore: function(score) {
        this.currentScore = score;
        
        // Tambahkan ke histori
        this.scoreHistory.push({
            score: score,
            date: new Date().toISOString(),
            userData: UserManager.getUserData()
        });
        
        // Simpan ke localStorage
        localStorage.setItem('quizScoreHistory', JSON.stringify(this.scoreHistory));
    },
    
    getCurrentScore: function() {
        return this.currentScore;
    },
    
    getScoreHistory: function() {
        return this.scoreHistory;
    },
    
    clearCurrentScore: function() {
        this.currentScore = null;
    },
    
    cleanOldScores: function() {
        // Hapus skor yang lebih dari 30 hari
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        this.scoreHistory = this.scoreHistory.filter(item => {
            return new Date(item.date) > thirtyDaysAgo;
        });
        
        localStorage.setItem('quizScoreHistory', JSON.stringify(this.scoreHistory));
    }
};

// Bersihkan skor lama setiap hari
setInterval(ScoreManager.cleanOldScores, 24 * 60 * 60 * 1000);
