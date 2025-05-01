import Auth from '../../js/modules/auth.js';
import Database from '../../js/core/database.js';
import Config from '../../js/core/config.js';

class AdminPanel {
    static init() {
        if (!Auth.isAuthenticated()) {
            window.location.href = '../index.html';
            return;
        }

        this.bindEvents();
        this.loadQuestions();
    }

    static bindEvents() {
        // Navigation tabs
        document.querySelectorAll('.admin-nav a').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.admin-nav a').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(`${tab.dataset.section}-section`).classList.add('active');
            });
        });

        // Add other event bindings
    }

    static async loadQuestions() {
        try {
            const questions = await Database.loadQuestions('all');
            this.renderQuestionsTable(questions);
        } catch (error) {
            console.error("Error loading questions:", error);
        }
    }

    static renderQuestionsTable(questions) {
        const table = document.createElement('table');
        table.className = 'questions-table';
        
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Pertanyaan</th>
                    <th>Kategori</th>
                    <th>Subkategori</th>
                    <th>Level</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                ${questions.map(q => `
                    <tr>
                        <td>${q.id}</td>
                        <td>${q.question.substring(0, 50)}...</td>
                        <td>${q.category === 'pelajar' ? 'Pelajar' : 'Umum'}</td>
                        <td>${this.getSubcategoryName(q.category, q.subcategory)}</td>
                        <td>${q.level.charAt(0).toUpperCase() + q.level.slice(1)}</td>
                        <td>
                            <button class="btn btn-sm btn-edit" data-id="${q.id}">Edit</button>
                            <button class="btn btn-sm btn-danger" data-id="${q.id}">Hapus</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        
        const questionsSection = document.getElementById('questions-section');
        questionsSection.innerHTML = '<h2>Kelola Soal</h2>';
        questionsSection.appendChild(table);
    }

    static getSubcategoryName(category, subcategory) {
        const map = {
            pelajar: {
                ipa: 'IPA',
                ips: 'IPS',
                matematika: 'Matematika',
                agama: 'Agama',
                ppkn: 'PPKN',
                sejarah: 'Sejarah',
                bahasa_indonesia: 'Bahasa Indonesia',
                bahasa_inggris: 'Bahasa Inggris'
            },
            umum: {
                logika: 'Logika',
                sambung_lagu: 'Sambung Lagu',
                peribahasa: 'Peribahasa'
            }
        };
        
        return map[category][subcategory] || subcategory;
    }
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => AdminPanel.init());
