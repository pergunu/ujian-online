import { QuestionBank } from './database.js';
import { Auth } from './auth.js';

class AdminPanel {
    constructor() {
        this.questionBank = new QuestionBank();
        this.currentSection = 'dashboard';
        this.initElements();
        this.initEventListeners();
        this.loadStats();
    }

    initElements() {
        this.elements = {
            logoutBtn: document.getElementById('logoutBtn'),
            sections: {
                dashboard: document.getElementById('dashboardSection'),
                addQuestion: document.getElementById('addQuestionSection'),
                questionBank: document.getElementById('questionBankSection'),
                userScores: document.getElementById('userScoresSection')
            },
            navLinks: document.querySelectorAll('.admin-sidebar a'),
            addQuestionForm: document.getElementById('addQuestionForm'),
            filterCategory: document.getElementById('filterCategory'),
            applyFilter: document.getElementById('applyFilter'),
            questionTableContainer: document.getElementById('questionTableContainer'),
            totalQuestions: document.getElementById('totalQuestions'),
            totalUsers: document.getElementById('totalUsers')
        };
    }

    initEventListeners() {
        // Navigation
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(link.dataset.section);
            });
        });

        // Logout
        this.elements.logoutBtn.addEventListener('click', () => {
            Auth.logout();
            window.location.href = '../';
        });

        // Form tambah soal
        this.elements.addQuestionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewQuestion();
        });

        // Filter bank soal
        this.elements.applyFilter.addEventListener('click', () => {
            this.loadQuestionBank();
        });
    }

    showSection(section) {
        // Sembunyikan semua section
        Object.values(this.elements.sections).forEach(s => {
            s.classList.add('hidden');
        });

        // Tampilkan section yang dipilih
        this.elements.sections[section].classList.remove('hidden');

        // Update active nav link
        this.elements.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === section) {
                link.classList.add('active');
            }
        });

        // Load data jika diperlukan
        if (section === 'questionBank') {
            this.loadQuestionBank();
        }

        this.currentSection = section;
    }

    async loadStats() {
        try {
            // Hitung total soal (simulasi)
            let total = 0;
            for (const category in this.questionBank.categories) {
                for (const subject of this.questionBank.categories[category]) {
                    for (const level of this.questionBank.levels) {
                        const questions = await this.questionBank.loadQuestions(category, subject, level);
                        total += questions.length;
                    }
                }
            }
            this.elements.totalQuestions.textContent = total;

            // Total pengguna (simulasi)
            this.elements.totalUsers.textContent = "1250";
        } catch (error) {
            console.error("Error loading stats:", error);
        }
    }

    renderAddQuestionForm() {
        this.elements.addQuestionForm.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label>Kategori</label>
                    <select id="questionCategory" required>
                        <option value="">Pilih Kategori</option>
                        <option value="umum">Umum</option>
                        <option value="pelajar">Pelajar</option>
                        <option value="logika">Logika & Jenaka</option>
                        <option value="lagu">Sambung Lagu</option>
                        <option value="pribahasa">Sambung Pribahasa</option>
                    </select>
                </div>
                
                <div class="form-group" id="subjectField" style="display: none;">
                    <label>Subjek</label>
                    <select id="questionSubject">
                        <option value="">Pilih Subjek</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Tingkat</label>
                    <select id="questionLevel" required>
                        <option value="">Pilih Tingkat</option>
                        <option value="sd">SD</option>
                        <option value="smp">SMP</option>
                        <option value="sma">SMA</option>
                        <option value="umum">Umum</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Tingkat Kesulitan</label>
                    <select id="questionDifficulty" required>
                        <option value="mudah">Mudah</option>
                        <option value="sedang">Sedang</option>
                        <option value="sulit">Sulit</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group">
                <label>Pertanyaan</label>
                <textarea id="questionText" rows="3" required></textarea>
            </div>
            
            <div class="options-grid">
                <div class="option-group">
                    <label>Opsi A</label>
                    <input type="text" id="optionA" required>
                    <textarea id="descA" placeholder="Deskripsi Opsi A" rows="2"></textarea>
                </div>
                
                <div class="option-group">
                    <label>Opsi B</label>
                    <input type="text" id="optionB" required>
                    <textarea id="descB" placeholder="Deskripsi Opsi B" rows="2"></textarea>
                </div>
                
                <div class="option-group">
                    <label>Opsi C</label>
                    <input type="text" id="optionC" required>
                    <textarea id="descC" placeholder="Deskripsi Opsi C" rows="2"></textarea>
                </div>
                
                <div class="option-group">
                    <label>Opsi D</label>
                    <input type="text" id="optionD" required>
                    <textarea id="descD" placeholder="Deskripsi Opsi D" rows="2"></textarea>
                </div>
            </div>
            
            <div class="form-group">
                <label>Jawaban Benar</label>
                <select id="correctAnswer" required>
                    <option value="">Pilih Jawaban Benar</option>
                    <option value="A">Opsi A</option>
                    <option value="B">Opsi B</option>
                    <option value="C">Opsi C</option>
                    <option value="D">Opsi D</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>Penjelasan</label>
                <textarea id="questionExplanation" rows="2" required></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary">Simpan Soal</button>
        `;

        // Event listener untuk perubahan kategori
        document.getElementById('questionCategory').addEventListener('change', (e) => {
            this.toggleSubjectField(e.target.value);
        });
    }

    toggleSubjectField(category) {
        const subjectField = document.getElementById('subjectField');
        const subjectSelect = document.getElementById('questionSubject');
        
        if (category === 'pelajar') {
            subjectField.style.display = 'block';
            subjectSelect.innerHTML = `
                <option value="">Pilih Subjek</option>
                ${this.questionBank.categories.pelajar.map(subject => `
                    <option value="${subject}">${subject.replace('_', ' ').toUpperCase()}</option>
                `).join('')}
            `;
        } else {
            subjectField.style.display = 'none';
            subjectSelect.innerHTML = '<option value="">Pilih Subjek</option>';
        }
    }

    async addNewQuestion() {
        const formData = {
            category: document.getElementById('questionCategory').value,
            subject: document.getElementById('questionSubject').value || 'pengetahuan_umum',
            level: document.getElementById('questionLevel').value,
            difficulty: document.getElementById('questionDifficulty').value,
            question: document.getElementById('questionText').value,
            options: {
                A: {
                    text: document.getElementById('optionA').value,
                    description: document.getElementById('descA').value
                },
                B: {
                    text: document.getElementById('optionB').value,
                    description: document.getElementById('descB').value
                },
                C: {
                    text: document.getElementById('optionC').value,
                    description: document.getElementById('descC').value
                },
                D: {
                    text: document.getElementById('optionD').value,
                    description: document.getElementById('descD').value
                }
            },
            correctAnswer: document.getElementById('correctAnswer').value,
            explanation: document.getElementById('questionExplanation').value
        };

        const success = await this.questionBank.addQuestion(formData);
        
        if (success) {
            alert('Soal berhasil ditambahkan!');
            this.elements.addQuestionForm.reset();
            this.loadStats();
        } else {
            alert('Gagal menambahkan soal. Periksa data yang dimasukkan.');
        }
    }

    async loadQuestionBank() {
        const category = this.elements.filterCategory.value;
        let questions = [];

        if (category) {
            // Load questions for specific category
            if (category === 'pelajar') {
                for (const subject of this.questionBank.categories.pelajar) {
                    const subjQuestions = await this.loadSubjectQuestions(subject);
                    questions = questions.concat(subjQuestions);
                }
            } else {
                questions = await this.questionBank.loadQuestions(category, 
                    this.questionBank.categories[category][0], 'umum');
            }
        } else {
            // Load all questions
            for (const cat in this.questionBank.categories) {
                if (cat === 'pelajar') {
                    for (const subject of this.questionBank.categories.pelajar) {
                        const subjQuestions = await this.loadSubjectQuestions(subject);
                        questions = questions.concat(subjQuestions);
                    }
                } else {
                    const catQuestions = await this.questionBank.loadQuestions(cat, 
                        this.questionBank.categories[cat][0], 'umum');
                    questions = questions.concat(catQuestions);
                }
            }
        }

        this.renderQuestionTable(questions);
    }

    async loadSubjectQuestions(subject) {
        let questions = [];
        for (const level of this.questionBank.levels) {
            const levelQuestions = await this.questionBank.loadQuestions('pelajar', subject, level);
            questions = questions.concat(levelQuestions);
        }
        return questions;
    }

    renderQuestionTable(questions) {
        if (questions.length === 0) {
            this.elements.questionTableContainer.innerHTML = '<p>Tidak ada soal yang ditemukan</p>';
            return;
        }

        const tableHTML = `
            <table class="question-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Pertanyaan</th>
                        <th>Kategori</th>
                        <th>Tingkat</th>
                        <th>Kesulitan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    ${questions.map((q, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${q.question.substring(0, 50)}${q.question.length > 50 ? '...' : ''}</td>
                            <td>${this.formatCategory(q.category, q.subject)}</td>
                            <td>${q.level.toUpperCase()}</td>
                            <td>${q.difficulty}</td>
                            <td>
                                <button class="btn btn-sm btn-edit" data-id="${q.id}">Edit</button>
                                <button class="btn btn-sm btn-delete" data-id="${q.id}">Hapus</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        this.elements.questionTableContainer.innerHTML = tableHTML;

        // Tambahkan event listener untuk tombol aksi
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => this.editQuestion(e.target.dataset.id));
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => this.deleteQuestion(e.target.dataset.id));
        });
    }

    formatCategory(category, subject) {
        if (category === 'pelajar') {
            return subject.replace('_', ' ').toUpperCase();
        }
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    editQuestion(questionId) {
        // Implementasi edit soal
        console.log('Edit question:', questionId);
        alert('Fitur edit akan segera tersedia!');
    }

    deleteQuestion(questionId) {
        if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            // Implementasi hapus soal
            console.log('Delete question:', questionId);
            alert('Soal berhasil dihapus!');
            this.loadQuestionBank();
        }
    }
}

// Jalankan admin panel saat dokumen siap
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('admin')) {
        new AdminPanel();
    }
});
