// js/modules/admin.js
import { Config } from '../config.js';

export const Admin = (() => {
    const adminOverlay = document.getElementById('adminOverlay');
    const adminLogin = document.getElementById('adminLogin');
    const adminPanel = document.getElementById('adminPanel');

    const toggleAdminPanel = () => {
        adminOverlay.style.display = 'block';
        adminLogin.style.display = 'block';
    };

    const handleAdminLogin = () => {
        const pass = document.getElementById('adminPassword').value;
        if (pass === Config.adminPassword) {
            adminLogin.style.display = 'none';
            adminPanel.style.display = 'block';
        } else {
            alert("Password salah!");
        }
    };

    const generateQuestionWithAI = async () => {
        const prompt = document.getElementById('aiPromptInput').value.trim();
        const category = document.getElementById('newCategory').value;
        const level = document.getElementById('newLevel').value;

        try {
            // Simulasi API call
            const response = await fetch('/api/generate-question', {
                method: 'POST',
                body: JSON.stringify({ prompt, category, level })
            });

            const data = await response.json();
            document.getElementById('newQuestion').value = data.question;
            document.getElementById('optionA').value = data.options[0];
            document.getElementById('optionB').value = data.options[1];
            document.getElementById('optionC').value = data.options[2];
            document.getElementById('optionD').value = data.options[3];
            document.getElementById('answerSelect').value = data.correctAnswer;
            document.getElementById('explanationInput').value = data.explanation;
        } catch (err) {
            alert("Gagal menghasilkan soal AI");
        }
    };

    return {
        init: () => {
            document.getElementById('adminBtn').addEventListener('click', toggleAdminPanel);
            document.getElementById('adminLoginBtn').addEventListener('click', handleAdminLogin);
            document.getElementById('generateQuestionBtn').addEventListener('click', generateQuestionWithAI);
        }
    };
})();
