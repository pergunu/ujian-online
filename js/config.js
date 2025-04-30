export const CONFIG = {
  APP_NAME: "Quiz PERGUNU",
  VERSION: "1.0.0",
  MAX_QUESTIONS: 100,
  TIME_LIMIT: 3600, // 60 menit dalam detik
  PRAYER_TIMES: {
    subuh: { hour: 4, minute: 30 },
    dzuhur: { hour: 12, minute: 0 },
    ashar: { hour: 15, minute: 0 },
    maghrib: { hour: 18, minute: 0 },
    isya: { hour: 19, minute: 30 }
  },
  DIFFICULTY_LEVELS: {
    mudah: { color: "#4cc9f0", multiplier: 1 },
    sedang: { color: "#4895ef", multiplier: 1.5 },
    sulit: { color: "#4361ee", multiplier: 2 }
  },
  ADMIN_PASSWORD: "PERGUNU2025",
  API_ENDPOINTS: {
    submit_score: "/api/scores",
    get_questions: "/api/questions"
  }
};
