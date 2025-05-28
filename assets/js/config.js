// Konfigurasi Aplikasi Ujian Online Pergunu
const APP_CONFIG = {
  // API Key untuk AI Generator
  AI_API_KEY: 'sk-8837b24327bd4db99e36688951ceaea8', // Ganti dengan API Key OpenAI/Lainnya
  
  // Kode Akses Default
  DEFAULT_LOGIN_CODE: '12345',
  DEFAULT_EXAM_CODE: 'OPENLOCK-1945',
  DEFAULT_QUESTION_CODE: 'OPENLOCK-1926',
  DEFAULT_ADMIN_CODE: '65614222',
  
  // Pengaturan Default
  DEFAULT_EXAM_DURATION: 120, // menit
  DEFAULT_QUESTION_COUNT: 10,
  
  // URL Endpoint API (jika diperlukan)
  API_ENDPOINT: 'https://api.pergunu-situbondo.com' // Contoh saja
};

// Ekspor untuk penggunaan modular (jika menggunakan Node.js/Webpack)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APP_CONFIG;
}
