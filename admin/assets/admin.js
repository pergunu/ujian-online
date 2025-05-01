class QuestionBankManager {
  constructor() {
    this.currentCategory = null;
    this.currentLevel = null;
    this.questions = [];
    this.init();
  }

  async init() {
    await this.verifyAdmin();
    this.setupEventListeners();
    this.loadQuestionBankUI();
    this.setupFileHandlers();
  }

  async verifyAdmin() {
    const password = prompt("Masukkan Kode Admin:");
    if (password !== "PERGUNU2025") {
      window.location.href = "../index.html";
      throw new Error("Akses ditolak");
    }
  }

  setupEventListeners() {
    // Category and level selection
    document.getElementById('category-select').addEventListener('change', (e) => {
      this.currentCategory = e.target.value;
      this.updateLevelOptions();
      this.loadQuestions();
    });

    // Question form submission
    document.getElementById('question-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveQuestion();
    });

    // Bulk operations
    document.getElementById('bulk-import').addEventListener('click', () => this.bulkImport());
    document.getElementById('bulk-export').addEventListener('click', () => this.bulkExport());
  }

  updateLevelOptions() {
    const levelSelect = document.getElementById('level-select');
    levelSelect.innerHTML = '';
    
    if (['logika', 'lagu', 'pribahasa'].includes(this.currentCategory)) {
      levelSelect.innerHTML = '<option value="umum">Umum</option>';
    } else {
      const levels = ['SD', 'SMP', 'SMA', 'Umum'];
      levels.forEach(level => {
        levelSelect.innerHTML += `<option value="${level.toLowerCase()}">${level}</option>`;
      });
    }
    
    this.currentLevel = levelSelect.value;
    this.loadQuestions();
  }

  async loadQuestions() {
    try {
      const response = await fetch(`../../data/${this.getDataPath()}`);
      this.questions = await response.json();
      this.renderQuestionTable();
    } catch (error) {
      console.error("Gagal memuat soal:", error);
      this.questions = [];
      this.renderQuestionTable();
    }
  }

  getDataPath() {
    if (this.currentCategory === 'umum' || 
        this.currentCategory === 'logika' || 
        this.currentCategory === 'lagu' || 
        this.currentCategory === 'pribahasa') {
      return `${this.currentCategory}/${this.currentLevel}.json`;
    } else {
      return `pelajar/${this.currentCategory}/${this.currentLevel}.json`;
    }
  }

  renderQuestionTable() {
    const tableBody = document.querySelector('#question-table tbody');
    tableBody.innerHTML = '';

    this.questions.forEach((question, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${question.question.substring(0, 50)}${question.question.length > 50 ? '...' : ''}</td>
        <td>${question.category}</td>
        <td>${question.level.toUpperCase()}</td>
        <td>${question.difficulty}</td>
        <td class="actions">
          <button class="edit-btn" data-id="${question.id}">Edit</button>
          <button class="delete-btn" data-id="${question.id}">Hapus</button>
        </td>
      `;
      tableBody.appendChild(row);
    });

    // Add event listeners to buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.editQuestion(e.target.dataset.id));
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.deleteQuestion(e.target.dataset.id));
    });
  }

  async saveQuestion() {
    const formData = new FormData(document.getElementById('question-form'));
    const questionData = {
      id: formData.get('question-id') || `q-${Date.now()}`,
      category: formData.get('category'),
      type: formData.get('category'),
      level: formData.get('level'),
      difficulty: formData.get('difficulty'),
      question: formData.get('question-text'),
      options: [
        { text: formData.get('option-1'), description: formData.get('description-1') },
        { text: formData.get('option-2'), description: formData.get('description-2') },
        { text: formData.get('option-3'), description: formData.get('description-3') },
        { text: formData.get('option-4'), description: formData.get('description-4') }
      ],
      correctAnswer: parseInt(formData.get('correct-answer')),
      explanation: formData.get('explanation'),
      lastUpdated: new Date().toISOString()
    };

    // Update or add question
    const existingIndex = this.questions.findIndex(q => q.id === questionData.id);
    if (existingIndex >= 0) {
      this.questions[existingIndex] = questionData;
    } else {
      this.questions.push(questionData);
    }

    await this.saveToFile();
    this.renderQuestionTable();
    this.resetForm();
  }

  async saveToFile() {
    // In a real app, this would save to the server
    console.log("Simpan perubahan ke file:", this.getDataPath());
    // Simulate save
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  editQuestion(questionId) {
    const question = this.questions.find(q => q.id === questionId);
    if (!question) return;

    const form = document.getElementById('question-form');
    form['question-id'].value = question.id;
    form['question-text'].value = question.question;
    form['difficulty'].value = question.difficulty;
    form['correct-answer'].value = question.correctAnswer;
    form['explanation'].value = question.explanation;

    question.options.forEach((option, index) => {
      form[`option-${index + 1}`].value = option.text;
      form[`description-${index + 1}`].value = option.description;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async deleteQuestion(questionId) {
    if (!confirm("Apakah Anda yakin ingin menghapus soal ini?")) return;
    
    this.questions = this.questions.filter(q => q.id !== questionId);
    await this.saveToFile();
    this.renderQuestionTable();
  }

  async bulkImport() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        const content = await file.text();
        const importedQuestions = JSON.parse(content);
        
        if (Array.isArray(importedQuestions)) {
          this.questions = [...this.questions, ...importedQuestions];
          await this.saveToFile();
          this.renderQuestionTable();
          alert(`Berhasil mengimpor ${importedQuestions.length} soal!`);
        } else {
          throw new Error("Format file tidak valid");
        }
      } catch (error) {
        alert("Gagal mengimpor soal: " + error.message);
      }
    };
    
    fileInput.click();
  }

  async bulkExport() {
    const blob = new Blob([JSON.stringify(this.questions, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-${this.currentCategory}-${this.currentLevel}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  }

  resetForm() {
    document.getElementById('question-form').reset();
    document.getElementById('question-id').value = '';
  }

  setupFileHandlers() {
    // Auto-save every 5 minutes
    setInterval(() => {
      if (this.questions.length > 0) {
        this.saveToFile();
      }
    }, 5 * 60 * 1000);
  }

  loadQuestionBankUI() {
    // Initialize UI components
    document.getElementById('app-title').textContent = `Bank Soal PERGUNU - ${new Date().getFullYear()}`;
    this.updateLevelOptions();
  }
}

// Initialize the manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new QuestionBankManager();
});

