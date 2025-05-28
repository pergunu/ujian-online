// File ini JANGAN di-commit ke GitHub (tambahkan ke .gitignore)
const APP_CONFIG = {
  AI_API_KEY: 'sk-YourActualAPIKeyHere', // API Key OpenAI atau layanan AI lainnya
  ADMIN_PASS: '65614222', // Password admin default
  LOGIN_CODE: '12345' // Kode login default
};

// Untuk penggunaan di development saja
if (typeof module !== 'undefined' && module.exports) {
  module.exports = APP_CONFIG;
}
