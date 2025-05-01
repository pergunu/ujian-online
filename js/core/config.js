// Application configuration
const Config = {
    appName: "Quiz Pergunu",
    version: "1.0.0",
    apiBaseUrl: "https://api.pergunu.edu",
    defaultCategory: "pelajar",
    defaultSubcategory: "ipa",
    defaultLevel: "mudah",
    quizDuration: 600, // 10 minutes in seconds
    maxQuestions: 10,
    showPrayerTimes: true,
    enableSound: true,
    enableMusic: true,
    adminPassword: "65614222",
    
    // UI Settings
    themeColors: {
        primary: "#2563eb",
        secondary: "#dc2626",
        success: "#16a34a",
        warning: "#d97706",
        danger: "#b91c1c"
    },
    
    // API Endpoints
    endpoints: {
        questions: "/api/questions",
        scores: "/api/scores",
        users: "/api/users"
    },
    
    // Local storage keys
    storageKeys: {
        userData: "quiz_pergunu_user",
        quizProgress: "quiz_pergunu_progress",
        settings: "quiz_pergunu_settings"
    }
};

export default Config;
