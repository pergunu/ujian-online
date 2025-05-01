// Authentication and user management
class Auth {
    static login(password) {
        return password === Config.adminPassword;
    }
    
    static changePassword(oldPassword, newPassword) {
        if (oldPassword !== Config.adminPassword) {
            return false;
        }
        
        Config.adminPassword = newPassword;
        return true;
    }
    
    static isAuthenticated() {
        return localStorage.getItem('quiz_pergunu_admin') === 'true';
    }
    
    static setAuthenticated(status) {
        if (status) {
            localStorage.setItem('quiz_pergunu_admin', 'true');
        } else {
            localStorage.removeItem('quiz_pergunu_admin');
        }
    }
}

export default Auth;
