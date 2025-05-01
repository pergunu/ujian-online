class UserManager {
    static init() {
        this.currentUser = null;
        this.loadUserData();
    }

    static loadUserData() {
        const savedUser = localStorage.getItem(Config.storageKeys.userData);
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    static saveUserData(userData) {
        this.currentUser = {
            id: Date.now(),
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            profession: userData.profession || '',
            joinDate: new Date().toISOString()
        };
        
        localStorage.setItem(Config.storageKeys.userData, JSON.stringify(this.currentUser));
    }

    static getCurrentUser() {
        return this.currentUser;
    }

    static clearUserData() {
        this.currentUser = null;
        localStorage.removeItem(Config.storageKeys.userData);
    }
}

export default UserManager;
