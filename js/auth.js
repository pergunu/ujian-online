const Auth = {
    currentUser: null,
    isAdmin: false,
    
    init: function() {
        this.loadUser();
    },
    
    loadUser: function() {
        const userData = localStorage.getItem('quizUserData');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    },
    
    registerUser: function(userData) {
        this.currentUser = userData;
        localStorage.setItem('quizUserData', JSON.stringify(userData));
    },
    
    clearUser: function() {
        this.currentUser = null;
        localStorage.removeItem('quizUserData');
    },
    
    checkAdminAccess: function(password) {
        this.isAdmin = password === Config.ADMIN_PASSWORD;
        return this.isAdmin;
    },
    
    canTakeQuiz: function() {
        if (!this.currentUser) return false;
        
        const lastAttempt = localStorage.getItem('lastQuizAttempt');
        if (lastAttempt) {
            const lastAttemptTime = new Date(lastAttempt);
            const now = new Date();
            return (now - lastAttemptTime) >= Config.TIME_LIMIT_PER_USER;
        }
        return true;
    },
    
    recordQuizAttempt: function() {
        localStorage.setItem('lastQuizAttempt', new Date().toISOString());
    }
};
