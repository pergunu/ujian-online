// File: quiz-pergunu/admin/assets/admin.js

class AdminPanel {
  constructor() {
    this.authenticated = false;
    this.currentFile = null;
    this.questionsData = [];
    this.initAuth();
    this.initEventListeners();
    this.setupFileSelector();
  }

  initAuth() {
    document.getElementById('admin-login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const password = document.getElementById('admin-password').value;
      
      // Password default (harus diganti di production)
      if (password === 'PERGUNU2025') {
        this.authenticated = true;
        this.showAdminPanel();
        this.showNotification('Login berhasil!', 'success');
      } else {
        this.showNotification('Password salah!', 'error');
      }
    });
  }

  showAdminPanel() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    this.loadCategoryOptions();
  }

  loadCategoryOptions() {
    const categories = {
      'Umum': ['SD', 'SMP', 'SMA', 'Umum'],
      'Pelajar': {
        'IPA': ['SD', 'SMP', 'SMA'],
        'IPS': ['SD', 'SMP', 'SMA'],
        'Matematika': ['SD', 'SMP', 'SMA'],
        'Bahasa Indonesia': ['SD', 'SMP', 'SMA'],
        'Bahasa Inggris': ['SD', 'SMP', 'SMA'],
        'Sejarah': ['SMP', 'SMA'],
        'PPKN': ['SD', 'SMP', 'SMA'],
        'Agama': ['SD', 'SMP', 'SMA']
      },
      'Khusus': {
        'Tebak Logika & Jenaka': ['Umum'],
        'Sambung Lagu': ['Umum'],
        'Sambung Pribahasa': ['Umum']
      }
    };

    const categorySelect = document.getElementById('question-category');
    categorySelect.innerHTML = '';

    // Add option groups
    for (const [groupName, subCategories] of Object.entries(categories)) {
      const group = document.createElement('optgroup');
      group.label = groupName;

      if (Array.isArray(subCategories)) {
        // Umum category
        subCategories.forEach(level => {
          const option = document.createElement('option');
          option.value = `umum_${level.toLowerCase()}`;
          option.textContent = `Umum - ${level}`;
          group.appendChild(option);
        });
      } else {
        // Other categories
        for (const [category, levels] of Object.entries(subCategories)) {
          levels.forEach(level => {
            const option = document.createElement('option');
            option.value = `${category.toLowerCase().replace(' ', '_')}_${level.toLowerCase()}`;
            option.textContent = `${category} - ${level}`;
            group.appendChild(option);
          });
        }
      }

      categorySelect.appendChild(group);
    }

    // Add event listener for file selection
    categorySelect.addEventListener('change', (e) => {
      const [category, level] = e.target.value.split('_');
      this.loadQuestionsFile(category, level);
    });
  }

  async loadQuestionsFile(category, level) {
    let filePath;
    
    if (['tebak_logika_&_jenaka', 'sambung_lagu', 'sambung_pribahasa'].includes(category)) {
      filePath = `../../data/questions/${category.replace('&', 'dan').replace(' ', '_')}/umum.json`;
    } else if (category === 'umum') {
      filePath = `../../data/questions/umum/${level}.json`;
    } else {
      filePath = `../../data/questions/pelajar/${category}/${level}.json`;
    }

    try {
      const response = await fetch(filePath);
      this.questionsData = await response.json();
      this.currentFile = filePath;
      this.displayQuestionsList();
      this.showNotification(`Memuat ${this.questionsData.length} pertanyaan dari ${category} ${level}`, 'success');
    } catch (error) {
      console.error('Error loading questions:', error);
      this.showNotification('Gagal memuat pertanyaan. File mungkin belum ada.', 'error');
      this.questionsData = [];
      this.currentFile = filePath;
      this.displayQuestionsList();
    }
  }

  displayQuestionsList() {
    const listContainer = document.getElementById('questions-list');
    listContainer.innerHTML = '';

    if (this.questionsData.length === 0) {
      listContainer.innerHTML = '<p class="no-questions">Belum ada pertanyaan untuk kategori ini.</p>';
      return;
    }

    this.questionsData.forEach((question, index) => {
      const questionElement = document.createElement('div');
      questionElement.className = 'question-item';
      questionElement.innerHTML = `
        <div class="question-header">
          <span class="question-number">#${index + 1}</span>
          <span class="question-difficulty ${question.difficulty || 'medium'}">${question.difficulty || 'Sedang'}</span>
          <button class="btn-delete" data-index="${index}">Hapus</button>
        </div>
        <div class="question-text">${question.question}</div>
        <div class="question-answer">Jawaban: ${String.fromCharCode(65 + question.correctAnswer)}</div>
      `;
      
      questionElement.querySelector('.btn-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteQuestion(index);
      });

      questionElement.addEventListener('click', () => {
        this.editQuestion(index);
      });

      listContainer.appendChild(questionElement);
    });
  }

  initEventListeners() {
    // Add question form
    document.getElementById('add-question-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addNewQuestion();
    });

    // Save changes button
    document.getElementById('btn-save-changes').addEventListener('click', () => {
      this.saveChanges();
    });

    // Search functionality
    document.getElementById('search-questions').addEventListener('input', (e) => {
      this.filterQuestions(e.target.value);
    });
  }

  addNewQuestion() {
    if (!this.authenticated || !this.currentFile) {
      this.showNotification('Silakan pilih kategori terlebih dahulu', 'error');
      return;
    }

    const form = document.getElementById('add-question-form');
    const formData = new FormData(form);

    const newQuestion = {
      id: `q_${Date.now()}`,
      question: formData.get('question-text'),
      context: formData.get('question-context'),
      options: [
        { text: formData.get('option-a'), explanation: formData.get('explanation-a') },
        { text: formData.get('option-b'), explanation: formData.get('explanation-b') },
        { text: formData.get('option-c'), explanation: formData.get('explanation-c') },
        { text: formData.get('option-d'), explanation: formData.get('explanation-d') }
      ],
      correctAnswer: parseInt(formData.get('correct-answer')),
      difficulty: formData.get('question-difficulty'),
      category: formData.get('question-category').split('_')[0],
      level: formData.get('question-category').split('_')[1]
    };

    this.questionsData.push(newQuestion);
    this.displayQuestionsList();
    form.reset();
    
    this.showNotification('Pertanyaan berhasil ditambahkan!', 'success');
  }

  editQuestion(index) {
    const question = this.questionsData[index];
    const form = document.getElementById('add-question-form');

    // Fill form with question data
    form.querySelector('#question-text').value = question.question;
    form.querySelector('#question-context').value = question.context || '';
    form.querySelector('#option-a').value = question.options[0].text;
    form.querySelector('#explanation-a').value = question.options[0].explanation || '';
    form.querySelector('#option-b').value = question.options[1].text;
    form.querySelector('#explanation-b').value = question.options[1].explanation || '';
    form.querySelector('#option-c').value = question.options[2].text;
    form.querySelector('#explanation-c').value = question.options[2].explanation || '';
    form.querySelector('#option-d').value = question.options[3].text;
    form.querySelector('#explanation-d').value = question.options[3].explanation || '';
    form.querySelector('#correct-answer').value = question.correctAnswer;
    form.querySelector('#question-difficulty').value = question.difficulty || 'medium';

    // Change button text
    form.querySelector('button[type="submit"]').textContent = 'Update Pertanyaan';

    // Store current editing index
    form.dataset.editingIndex = index;

    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
  }

  deleteQuestion(index) {
    if (confirm('Apakah Anda yakin ingin menghapus pertanyaan ini?')) {
      this.questionsData.splice(index, 1);
      this.displayQuestionsList();
      this.showNotification('Pertanyaan berhasil dihapus', 'success');
    }
  }

  filterQuestions(searchTerm) {
    const filteredQuestions = this.questionsData.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.options.some(opt => opt.text.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const listContainer = document.getElementById('questions-list');
    listContainer.innerHTML = '';

    filteredQuestions.forEach((question, index) => {
      const originalIndex = this.questionsData.findIndex(q => q.id === question.id);
      const questionElement = document.createElement('div');
      questionElement.className = 'question-item';
      questionElement.innerHTML = `
        <div class="question-header">
          <span class="question-number">#${originalIndex + 1}</span>
          <span class="question-difficulty ${question.difficulty || 'medium'}">${question.difficulty || 'Sedang'}</span>
          <button class="btn-delete" data-index="${originalIndex}">Hapus</button>
        </div>
        <div class="question-text">${question.question}</div>
        <div class="question-answer">Jawaban: ${String.fromCharCode(65 + question.correctAnswer)}</div>
      `;
      
      questionElement.querySelector('.btn-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteQuestion(originalIndex);
      });

      questionElement.addEventListener('click', () => {
        this.editQuestion(originalIndex);
      });

      listContainer.appendChild(questionElement);
    });
  }

  async saveChanges() {
    if (!this.currentFile) {
      this.showNotification('Tidak ada file yang dipilih', 'error');
      return;
    }

    // In a real implementation, this would save to your backend
    // For GitHub Pages, you would need to use GitHub API or another backend service
    
    try {
      // Simulate saving
      console.log('Data yang akan disimpan:', {
        filePath: this.currentFile,
        questions: this.questionsData
      });
      
      // In a real app, you would do something like:
      // await fetch('/api/save-questions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     filePath: this.currentFile,
      //     questions: this.questionsData
      //   })
      // });
      
      this.showNotification('Perubahan berhasil disimpan (simulasi)', 'success');
    } catch (error) {
      console.error('Error saving questions:', error);
      this.showNotification('Gagal menyimpan perubahan', 'error');
    }
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  setupFileSelector() {
    // This would be more complex in a real implementation
    // For GitHub Pages, you might need a different approach
    console.log('File selector setup complete');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AdminPanel();
});
