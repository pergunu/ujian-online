const Config = {
    // Pengaturan Umum
    APP_NAME: "Quiz PERGUNU",
    VERSION: "1.0.0",
    DEVELOPER: "Tim Kreatif PERGUNU Situbondo (cendhanu)",
    
    // Pengaturan Quiz
    MAX_QUESTIONS: 100,
    TIME_LIMIT: 60 * 60 * 1000, // 60 menit dalam milidetik
    QUESTION_LIMIT_PER_USER: 100,
    TIME_LIMIT_PER_USER: 4 * 60 * 60 * 1000, // 4 jam dalam milidetik
    
    // Pengaturan Level
    LEVELS: {
        SD: { minAge: 5, maxAge: 12 },
        SMP: { minAge: 13, maxAge: 15 },
        SMA: { minAge: 16, maxAge: 18 },
        UMUM: { minAge: 19, maxAge: 100 }
    },
    
    // Pengaturan Skor
    GRADE_THRESHOLDS: {
        A_PLUS: 75,
        B: 50,
        C: 25,
        D: 0
    },
    
    // Pengaturan Audio
    AUDIO_VOLUME: 0.5,
    
    // API Endpoints (jika ada)
    API_BASE_URL: null,
    
    // Pengaturan Admin
    ADMIN_PASSWORD: "pergunu2025", // Ganti dengan password yang aman
    
    init: function() {
        // Inisialisasi konfigurasi tambahan jika diperlukan
        console.log(`${this.APP_NAME} v${this.VERSION} initialized`);
    }
};

// Inisialisasi saat load
Config.init();
