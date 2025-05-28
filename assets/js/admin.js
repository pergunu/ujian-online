// Fungsi-fungsi untuk admin panel
function initAdmin() {
  // Load current settings
  loadAdminSettings();
  
  // Set event listeners
  setupAdminEventListeners();
}

// Fungsi untuk memuat pengaturan admin
function loadAdminSettings() {
  // Kode akses
  document.getElementById('current-login-code').value = localStorage.getItem('loginCode') || '12345';
  document.getElementById('current-exam-code').value = localStorage.getItem('examCode') || 'OPENLOCK-1945';
  document.getElementById('current-question-code').value = localStorage.getItem('questionCode') || 'OPENLOCK-1926';
  document.getElementById('current-admin-code').value = localStorage.getItem('adminCode') || '65614222';
  
  // Pengaturan ujian
  document.getElementById('exam-timer-setting').value = localStorage.getItem('examTimer') || '120';
  document.getElementById('question-count-setting').value = localStorage.getItem('questionCount') || '10';
  document.getElementById('point-per-question').value = localStorage.getItem('pointPerQuestion') || '10';
  document.getElementById('randomize-questions').value = localStorage.getItem('randomizeQuestions') || 'yes';
  
  // Pengaturan konten
  document.getElementById('greeting-message').value = localStorage.getItem('greetingText') || 'Selamat Datang di Ujian Online Pergunu Situbondo';
  document.getElementById('chairman-name-setting').value = localStorage.getItem('chairmanName') || 'Moh. Nuril Hudha, S.Pd., M.Si.';
  document.getElementById('info-message').value = localStorage.getItem('infoMessage') || 'Informasi penting akan ditampilkan di sini';
  document.getElementById('motivation-messages').value = localStorage.getItem('motivationMessages') || 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.\nBagus! Anda telah menunjukkan pemahaman yang baik. Tingkatkan terus kemampuan Anda.\nAnda bisa lebih baik lagi. Pelajari kembali materi yang belum dikuasai.';
  
  // Link share
  if (!localStorage.getItem('shareLinks')) {
    const defaultLinks = [
      { title: 'Facebook', url: 'https://facebook.com' },
      { title: 'Twitter', url: 'https://twitter.com' },
      { title: 'WhatsApp', url: 'https://wa.me/?text=Ikuti%20Ujian%20Online%20Pergunu%20Situbondo' }
    ];
    localStorage.setItem('shareLinks', JSON.stringify(defaultLinks));
  }
}

// Fungsi untuk setup event listeners admin
function setupAdminEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Update active tab button
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Update active tab content
      document.querySelectorAll('.admin-tab-content').forEach(tab => tab.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Simpan kode login
  document.getElementById('save-login-code').addEventListener('click', function() {
    const newCode = document.getElementById('new-login-code').value;
    if (newCode) {
      localStorage.setItem('loginCode', newCode);
      document.getElementById('current-login-code').value = newCode;
      document.getElementById('new-login-code').value = '';
      alert('Kode login berhasil diperbarui!');
    } else {
      alert('Masukkan kode baru terlebih dahulu.');
    }
  });
  
  // Simpan kode ujian CPNS
  document.getElementById('save-exam-code').addEventListener('click', function() {
    const newCode = document.getElementById('new-exam-code').value;
    if (newCode) {
      localStorage.setItem('examCode', newCode);
      document.getElementById('current-exam-code').value = newCode;
      document.getElementById('new-exam-code').value = '';
      alert('Kode ujian CPNS berhasil diperbarui!');
    } else {
      alert('Masukkan kode baru terlebih dahulu.');
    }
  });
  
  // Simpan kode bank soal
  document.getElementById('save-question-code').addEventListener('click', function() {
    const newCode = document.getElementById('new-question-code').value;
    if (newCode) {
      localStorage.setItem('questionCode', newCode);
      document.getElementById('current-question-code').value = newCode;
      document.getElementById('new-question-code').value = '';
      alert('Kode bank soal berhasil diperbarui!');
    } else {
      alert('Masukkan kode baru terlebih dahulu.');
    }
  });
  
  // Simpan kode admin
  document.getElementById('save-admin-code').addEventListener('click', function() {
    const newCode = document.getElementById('new-admin-code').value;
    if (newCode) {
      localStorage.setItem('adminCode', newCode);
      document.getElementById('current-admin-code').value = newCode;
      document.getElementById('new-admin-code').value = '';
      alert('Kode admin berhasil diperbarui!');
    } else {
      alert('Masukkan kode baru terlebih dahulu.');
    }
  });
  
  // Simpan pengaturan ujian
  document.getElementById('save-exam-settings').addEventListener('click', function() {
    const timer = document.getElementById('exam-timer-setting').value;
    const questionCount = document.getElementById('question-count-setting').value;
    const pointPerQuestion = document.getElementById('point-per-question').value;
    const randomize = document.getElementById('randomize-questions').value;
    
    localStorage.setItem('examTimer', timer);
    localStorage.setItem('questionCount', questionCount);
    localStorage.setItem('pointPerQuestion', pointPerQuestion);
    localStorage.setItem('randomizeQuestions', randomize);
    
    alert('Pengaturan ujian berhasil disimpan!');
  });
  
  // Simpan pengaturan konten
  document.getElementById('save-content-settings').addEventListener('click', function() {
    const greeting = document.getElementById('greeting-message').value;
    const chairman = document.getElementById('chairman-name-setting').value;
    const info = document.getElementById('info-message').value;
    const motivations = document.getElementById('motivation-messages').value;
    
    localStorage.setItem('greetingText', greeting);
    localStorage.setItem('chairmanName', chairman);
    localStorage.setItem('infoMessage', info);
    localStorage.setItem('motivationMessages', motivations);
    
    // Update UI
    document.getElementById('greeting-text').textContent = greeting;
    document.getElementById('period-info').innerHTML = `<p>${info}</p>`;
    
    alert('Pengaturan konten berhasil disimpan!');
  });
  
  // Simpan soal
  document.getElementById('add-question-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const category = document.getElementById('question-category').value;
    const text = document.getElementById('question-text').value;
    const options = {
      A: document.querySelector('.option-text[data-option="A"]').value,
      B: document.querySelector('.option-text[data-option="B"]').value,
      C: document.querySelector('.option-text[data-option="C"]').value,
      D: document.querySelector('.option-text[data-option="D"]').value,
      E: document.querySelector('.option-text[data-option="E"]').value || ''
    };
    const correctAnswer = document.getElementById('correct-answer').value;
    const explanation = document.getElementById('answer-explanation').value;
    
    if (!category || !text || !options.A || !options.B || !options.C || !options.D || !correctAnswer) {
      alert('Harap isi semua field yang wajib!');
      return;
    }
    
    const editingId = localStorage.getItem('editingQuestionId');
    let questions = JSON.parse(localStorage.getItem('questions') || '[]');
    
    if (editingId) {
      // Update existing question
      const index = questions.findIndex(q => q.id === editingId);
      if (index !== -1) {
        questions[index] = {
          ...questions[index],
          category,
          text,
          options,
          correctAnswer,
          explanation
        };
      }
      localStorage.removeItem('editingQuestionId');
    } else {
      // Add new question
      const newQuestion = {
        id: Date.now().toString(),
        category,
        text,
        options,
        correctAnswer,
        explanation
      };
      questions.push(newQuestion);
    }
    
    localStorage.setItem('questions', JSON.stringify(questions));
    alert(editingId ? 'Soal berhasil diperbarui!' : 'Soal baru berhasil ditambahkan!');
    
    // Reset form
    this.reset();
    document.getElementById('save-question-btn').textContent = 'Simpan Soal';
    
    // Reload question bank
    loadQuestionBank();
  });
  
  // Generate questions with AI
  document.getElementById('generate-questions-btn').addEventListener('click', async function() {
    const apiKey = document.getElementById('ai-api-key').value;
    const prompt = document.getElementById('ai-prompt').value;
    const category = document.getElementById('ai-category').value;
    
    if (!apiKey) {
      alert('Masukkan API Key terlebih dahulu');
      return;
    }
    
    if (!prompt) {
      alert('Masukkan prompt untuk AI terlebih dahulu');
      return;
    }
    
    this.disabled = true;
    this.textContent = 'Memproses...';
    
    const aiResults = document.querySelector('.ai-results');
    aiResults.innerHTML = '<p>Membuat soal, harap tunggu...</p>';
    
    try {
      // NOTE: Replace with actual AI API call
      // This is a mock implementation - you'll need to integrate with a real AI service
      // Example using OpenAI (you'll need to add the actual API call)
      /*
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: `Buatkan soal pilihan ganda dengan format berikut:\n\nPertanyaan: [pertanyaan]\nA. [pilihan A]\nB. [pilihan B]\nC. [pilihan C]\nD. [pilihan D]\nE. [pilihan E]\nJawaban benar: [huruf jawaban benar]\nPenjelasan: [penjelasan singkat]\n\n${prompt}`,
          max_tokens: 1000,
          temperature: 0.7
        })
      });
      
      const data = await response.json();
      const generatedText = data.choices[0].text;
      */
      
      // Mock response for demonstration
      const generatedText = `
Pertanyaan: Apa ibukota Indonesia?
A. Jakarta
B. Bandung
C. Surabaya
D. Medan
E. Bali
Jawaban benar: A
Penjelasan: Jakarta adalah ibukota Indonesia sejak tahun 1945.

Pertanyaan: Siapakah presiden pertama Indonesia?
A. Soeharto
B. Joko Widodo
C. Soekarno
D. B.J. Habibie
E. Megawati
Jawaban benar: C
Penjelasan: Soekarno adalah presiden pertama Indonesia yang menjabat dari tahun 1945 hingga 1967.
`;
      
      const questions = parseGeneratedQuestions(generatedText, category);
      displayGeneratedQuestions(questions, aiResults);
      
    } catch (error) {
      console.error('Error generating questions:', error);
      aiResults.innerHTML = `<p class="error">Gagal membuat soal: ${error.message}</p>`;
    } finally {
      this.disabled = false;
      this.textContent = 'Generate Soal';
    }
  });
}

// Fungsi untuk memuat bank soal
function loadQuestionBank() {
  const questions = JSON.parse(localStorage.getItem('questions') || '[]');
  const questionsList = document.querySelector('.questions-list');
  
  questionsList.innerHTML = '';
  
  if (questions.length === 0) {
    questionsList.innerHTML = '<p>Tidak ada soal tersedia. Tambahkan soal baru.</p>';
    return;
  }
  
  questions.forEach((q, index) => {
    const questionItem = document.createElement('div');
    questionItem.className = 'question-item';
    
    questionItem.innerHTML = `
      <div class="question-item-header">
        <span class="question-item-category">${q.category.toUpperCase()}</span>
        <div class="question-item-actions">
          <button class="edit-question" data-id="${q.id}"><i class="fas fa-edit"></i></button>
          <button class="delete-question" data-id="${q.id}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <div class="question-item-text">${q.text}</div>
      <div class="question-item-options">
        ${Object.entries(q.options).map(([opt, text]) => `
          <div class="question-item-option ${opt === q.correctAnswer ? 'correct' : ''}">
            ${opt}. ${text}
          </div>
        `).join('')}
      </div>
      ${q.explanation ? `
        <div class="question-item-explanation">
          <strong>Penjelasan:</strong> ${q.explanation}
        </div>
      ` : ''}
    `;
    
    questionsList.appendChild(questionItem);
  });
  
  // Tambahkan event listeners untuk tombol edit dan hapus
  document.querySelectorAll('.edit-question').forEach(btn => {
    btn.addEventListener('click', function() {
      editQuestion(this.getAttribute('data-id'));
    });
  });
  
  document.querySelectorAll('.delete-question').forEach(btn => {
    btn.addEventListener('click', function() {
      deleteQuestion(this.getAttribute('data-id'));
    });
  });
}

// Fungsi untuk mengedit soal
function editQuestion(questionId) {
  const questions = JSON.parse(localStorage.getItem('questions') || '[]');
  const question = questions.find(q => q.id === questionId);
  
  if (!question) return;
  
  // Isi form dengan data soal
  document.getElementById('question-category').value = question.category;
  document.getElementById('question-text').value = question.text;
  
  // Isi opsi jawaban
  Object.entries(question.options).forEach(([opt, text]) => {
    const input = document.querySelector(`.option-text[data-option="${opt}"]`);
    if (input) input.value = text;
  });
  
  document.getElementById('correct-answer').value = question.correctAnswer;
  document.getElementById('answer-explanation').value = question.explanation || '';
  
  // Set ID soal yang sedang diedit
  localStorage.setItem('editingQuestionId', questionId);
  
  // Pindah ke tab tambah soal
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.admin-tab-content').forEach(tab => tab.classList.remove('active'));
  
  document.querySelector('.tab-btn[data-tab="add-question"]').classList.add('active');
  document.getElementById('add-question').classList.add('active');
  
  // Ubah teks tombol
  document.getElementById('save-question-btn').textContent = 'Update Soal';
}

// Fungsi untuk menghapus soal
function deleteQuestion(questionId) {
  if (!confirm('Apakah Anda yakin ingin menghapus soal ini?')) return;
  
  let questions = JSON.parse(localStorage.getItem('questions') || '[]');
  questions = questions.filter(q => q.id !== questionId);
  
  localStorage.setItem('questions', JSON.stringify(questions));
  loadQuestionBank();
}

// Fungsi untuk parsing hasil generate AI
function parseGeneratedQuestions(text, category) {
  const questionBlocks = text.split('\n\n').filter(block => block.trim());
  const questions = [];
  
  let currentQuestion = null;
  
  questionBlocks.forEach(block => {
    const lines = block.split('\n').map(line => line.trim()).filter(line => line);
    
    if (lines[0].toLowerCase().startsWith('pertanyaan:')) {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      
      currentQuestion = {
        text: lines[0].substring('pertanyaan:'.length).trim(),
        options: {},
        category,
        explanation: ''
      };
    } else if (currentQuestion) {
      if (lines[0].match(/^[A-E]\.\s/)) {
        const option = lines[0].charAt(0);
        const optionText = lines[0].substring(2).trim();
        currentQuestion.options[option] = optionText;
      } else if (lines[0].toLowerCase().startsWith('jawaban benar:')) {
        currentQuestion.correctAnswer = lines[0].substring('jawaban benar:'.length).trim().charAt(0);
      } else if (lines[0].toLowerCase().startsWith('penjelasan:')) {
        currentQuestion.explanation = lines[0].substring('penjelasan:'.length).trim();
      }
    }
  });
  
  if (currentQuestion) {
    questions.push(currentQuestion);
  }
  
  return questions;
}

// Fungsi untuk menampilkan hasil generate AI
function displayGeneratedQuestions(questions, container) {
  if (questions.length === 0) {
    container.innerHTML = '<p>Tidak ada soal yang dapat diparsing dari hasil AI.</p>';
    return;
  }
  
  container.innerHTML = `
    <h3>Hasil Generate (${questions.length} soal)</h3>
    <p>Review soal sebelum disimpan:</p>
  `;
  
  questions.forEach((q, i) => {
    const questionEl = document.createElement('div');
    questionEl.className = 'generated-question';
    questionEl.innerHTML = `
      <div class="generated-question-header">
        <h4>Soal #${i + 1}</h4>
        <button class="btn-small save-generated-question" data-index="${i}">Simpan</button>
      </div>
      <div class="generated-question-content">
        <p><strong>Pertanyaan:</strong> ${q.text}</p>
        <p><strong>Kategori:</strong> ${q.category.toUpperCase()}</p>
        <div class="generated-options">
          ${Object.entries(q.options).map(([opt, text]) => `
            <p><strong>${opt}.</strong> ${text} ${opt === q.correctAnswer ? '✓' : ''}</p>
          `).join('')}
        </div>
        ${q.explanation ? `<p><strong>Penjelasan:</strong> ${q.explanation}</p>` : ''}
      </div>
    `;
    
    container.appendChild(questionEl);
  });
  
  // Tambahkan event listeners untuk tombol simpan
  document.querySelectorAll('.save-generated-question').forEach(btn => {
    btn.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      saveGeneratedQuestion(questions[index]);
    });
  });
}

// Fungsi untuk menyimpan soal hasil generate AI
function saveGeneratedQuestion(question) {
  let questions = JSON.parse(localStorage.getItem('questions') || '[]');
  
  // Tambahkan ID ke soal
  question.id = Date.now().toString();
  
  questions.push(question);
  localStorage.setItem('questions', JSON.stringify(questions));
  
  alert('Soal berhasil disimpan ke bank soal!');
  loadQuestionBank();
}

// Panggil initAdmin saat halaman dimuat
document.addEventListener('DOMContentLoaded', initAdmin);
