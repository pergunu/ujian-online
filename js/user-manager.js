const UserManager = {
    currentUser: null,
    
    init: function() {
        // Cek apakah ada data user di localStorage
        const savedUser = localStorage.getItem('quizUserData');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    },
    
    saveUserData: function(userData) {
        this.currentUser = userData;
        localStorage.setItem('quizUserData', JSON.stringify(userData));
    },
    
    getUserData: function() {
        return this.currentUser;
    },
    
    clearUserData: function() {
        this.currentUser = null;
        localStorage.removeItem('quizUserData');
    },
    
    checkUserLimit: function() {
        // Implementasi untuk memeriksa batasan 100 soal per 4 jam
        const lastAttempt = localStorage.getItem('lastQuizAttempt');
        
        if (lastAttempt) {
            const lastAttemptTime = new Date(lastAttempt);
            const now = new Date();
            const hoursSinceLastAttempt = (now - lastAttemptTime) / (1000 * 60 * 60);
            
            if (hoursSinceLastAttempt < 4) {
                return false; // Belum memenuhi syarat
            }
        }
        
        return true; // Bisa mengikuti quiz
    },
    
    recordQuizAttempt: function() {
        localStorage.setItem('lastQuizAttempt', new Date().toISOString());
    }
};
