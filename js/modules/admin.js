import { Config } from '../config.js';
import { Quiz } from './quiz-engine.js';

export const Admin = (() => {
    // Elemen DOM
    const adminOverlay = document.getElementById('adminOverlay');
    const adminLogin = document.getElementById('adminLogin');
    const adminPanel = document.getElementById('adminPanel');
    
    // Fungsi-fungsi admin
    const toggleAdminPanel = () => {
        adminOverlay.style.display = 'block';
        adminLogin.style.display = 'block';
    };
    
    const handleAdminLogin = (password) => {
        if (password === Config.adminPassword) {
            adminLogin.style.display = 'none';
            adminPanel.style.display = 'block';
            loadQuestions();
        }
    };
    
    const loadQuestions = () => {
        // Implementasi muat pertanyaan untuk admin
    };
    
    // API publik
    return {
        init: () => {
            document.getElementById('adminBtn').addEventListener('click', toggleAdminPanel);
            // Event listener lainnya
        }
    };
})();
