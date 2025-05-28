// Pastikan config.js sudah dimuat sebelum file ini
document.addEventListener('DOMContentLoaded', function() {
  // Akses konfigurasi dari objek global
  const config = window.APP_CONFIG || {
    AI_API_KEY: '',
    DEFAULT_ADMIN_CODE: '65614222'
  };

  // Fungsi untuk generate soal dengan AI
  async function generateQuestionsWithAI(prompt, category) {
    if (!config.AI_API_KEY) {
      alert('API Key belum diatur. Silakan hubungi administrator.');
      return null;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.AI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: `Buat 1 soal pilihan ganda tentang ${category} dengan format:
            Pertanyaan: [isi pertanyaan]
            A. [opsi A] B. [opsi B] C. [opsi C] D. [opsi D] E. [opsi E]
            Jawaban benar: [huruf]
            Penjelasan: [penjelasan singkat]
            
            ${prompt}`
          }],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating questions:', error);
      alert(`Error: ${error.message}`);
      return null;
    }
  }

  // Event listener untuk tombol generate
  document.getElementById('generate-questions-btn').addEventListener('click', async function() {
    const prompt = document.getElementById('ai-prompt').value;
    const category = document.getElementById('ai-category').value;
    
    if (!prompt.trim()) {
      alert('Silakan masukkan prompt untuk AI');
      return;
    }

    this.disabled = true;
    this.textContent = 'Membuat soal...';

    const generatedText = await generateQuestionsWithAI(prompt, category);
    
    if (generatedText) {
      const questions = parseGeneratedQuestions(generatedText, category);
      displayGeneratedQuestions(questions, document.querySelector('.ai-results'));
    }

    this.disabled = false;
    this.textContent = 'Generate Soal';
  });

  // ... (kode lainnya tetap sama)
});
