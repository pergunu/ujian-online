import { CONFIG } from './config.js';
import { PrayerTimes } from './prayer-times.js';

export class UIManager {
  constructor() {
    this.prayerTimes = new PrayerTimes();
    this.registerForm = document.getElementById('registerForm');
    this.quizContainer = document.getElementById('quizContainer');
    this.resultContainer = document.getElementById('resultContainer');
    this.initEventListeners();
  }

  initEventListeners() {
    // Pilihan kategori peserta
    document.getElementById('participantType').addEventListener('change', (e) => {
      this.toggleAdditionalFields(e.target.value);
    });
    
    // Tombol mulai quiz
    this.registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.startQuiz();
    });
    
    // Tombol-tombol quiz
    document.getElementById('skipBtn').addEventListener('click', this.skipQuestion);
    document.getElementById('submitBtn').addEventListener('click', this.submitAnswer);
    document.getElementById('restartBtn').addEventListener('click', this.restartQuiz);
  }

  toggleAdditionalFields(participantType) {
    const additionalFields = document.getElementById('additionalFields');
    
    if (participantType === 'umum') {
      additionalFields.innerHTML = this.getUmumFieldsHTML();
    } else if (participantType === 'pelajar') {
      additionalFields.innerHTML = this.getPelajarFieldsHTML();
    } else {
      additionalFields.innerHTML = '';
    }
  }

  getUmumFieldsHTML() {
    return `
      <div class="form-group">
        <label>Profesi</label>
        <input type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label>Kategori Quiz</label>
        <select class="form-control" required>
          <option value="">Pilih Kategori</option>
          <option value="umum">Pengetahuan Umum</option>
          <option value="logika">Tebak Logika & Jenaka</option>
          <option value="lagu">Sambung Lagu</option>
          <option value="pribahasa">Sambung Pribahasa</option>
        </select>
      </div>
      <div class="form-group">
        <label>Tingkat Kesulitan</label>
        <select class="form-control" required>
          <option value="mudah">Mudah</option>
          <option value="sedang">Sedang</option>
          <option value="sulit">Sulit</option>
        </select>
      </div>
    `;
  }

  getPelajarFieldsHTML() {
    return `
      <div class="form-group">
        <label>Sekolah/Universitas</label>
        <input type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label>Jenjang Pendidikan</label>
        <select class="form-control" required>
          <option value="">Pilih Jenjang</option>
          <option value="sd">SD</option>
          <option value="smp">SMP</option>
          <option value="sma">SMA</option>
        </select>
      </div>
      <div class="form-group">
        <label>Mata Pelajaran</label>
        <select class="form-control" required>
          <option value="">Pilih Pelajaran</option>
          <option value="ipa">IPA</option>
          <option value="ips">IPS</option>
          <option value="matematika">Matematika</option>
          <option value="bahasa_indonesia">Bahasa Indonesia</option>
          <option value="bahasa_inggris">Bahasa Inggris</option>
          <option value="sejarah">Sejarah</option>
          <option value="ppkn">PPKN</option>
          <option value="agama">Agama</option>
        </select>
      </div>
      <div class="form-group">
        <label>Tingkat Kesulitan</label>
        <select class="form-control" required>
          <option value="mudah">Mudah</option>
          <option value="sedang">Sedang</option>
          <option value="sulit">Sulit</option>
        </select>
      </div>
    `;
  }

  startQuiz() {
    // Ambil data dari form
    const formData = new FormData(this.registerForm);
    const quizParams = {
      name: formData.get('name'),
      type: formData.get('participantType'),
      category: formData.get('category') || 'umum',
      subject: formData.get('subject') || 'pengetahuan_umum',
      level: formData.get('level') || 'umum',
      difficulty: formData.get('difficulty')
    };
    
    // Simpan data user
    this.currentUser = quizParams;
    
    // Sembunyikan form, tampilkan quiz
    this.registerForm.closest('.card').classList.add('hidden');
    this.quizContainer.classList.remove('hidden');
    
    // Trigger event untuk memulai quiz
    document.dispatchEvent(new CustomEvent('quizStarted', { detail: quizParams }));
  }

  displayQuestion(question) {
    const questionElement = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    
    // Tampilkan pertanyaan
    questionElement.textContent = question.question;
    
    // Kosongkan opsi sebelumnya
    optionsContainer.innerHTML = '';
    
    // Tambahkan opsi jawaban
    for (const [key, option] of Object.entries(question.options)) {
      const optionElement = document.createElement('div');
      optionElement.className = 'option btn-hover-effect';
      optionElement.dataset.option = key;
      optionElement.innerHTML = `
        <strong>${key}.</strong> ${option.text}
        <small class="option-desc">${option.description}</small>
      `;
      optionElement.addEventListener('click', this.selectOption);
      optionsContainer.appendChild(optionElement);
    }
    
    // Update progress
    this.updateProgress();
  }

  selectOption(e) {
    // Hapus seleksi sebelumnya
    document.querySelectorAll('.option').forEach(opt => {
      opt.classList.remove('selected');
    });
    
    // Tandai opsi yang dipilih
    e.currentTarget.classList.add('selected');
  }

  updateProgress() {
    const progress = quizEngine.getProgress();
    document.getElementById('progressBar').style.width = `${progress.percentage}%`;
    document.getElementById('progressText').textContent = 
      `Soal ${progress.current}/${progress.total}`;
  }

  showFeedback(isCorrect, correctAnswer, explanation) {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
    feedback.innerHTML = `
      <h4>${isCorrect ? 'Benar!' : 'Salah!'}</h4>
      ${!isCorrect ? `<p>Jawaban benar: ${correctAnswer}</p>` : ''}
      <p>${explanation}</p>
    `;
    
    document.getElementById('feedbackContainer').appendChild(feedback);
    setTimeout(() => feedback.remove(), 3000);
  }

  showFinalResults(score) {
    this.quizContainer.classList.add('hidden');
    this.resultContainer.classList.remove('hidden');
    
    document.getElementById('scoreValue').textContent = `${score.percentage}%`;
    document.getElementById('scoreText').textContent = 
      `Anda menjawab benar ${score.score} dari ${score.totalPossible} poin`;
    
    // Tampilkan pesan berdasarkan skor
    let message = '';
    let messageClass = '';
    
    if (score.percentage >= 75) {
      message = 'Luar biasa! Anda benar-benar ahli!';
      messageClass = 'text-success';
    } else if (score.percentage >= 50) {
      message = 'Kerja bagus! Tingkatkan lagi!';
      messageClass = 'text-info';
    } else if (score.percentage >= 25) {
      message = 'Tetap semangat! Belajar lagi ya!';
      messageClass = 'text-warning';
    } else {
      message = 'Jangan menyerah! Pelajari materinya lagi!';
      messageClass = 'text-danger';
    }
    
    document.getElementById('resultMessage').className = messageClass;
    document.getElementById('resultMessage').textContent = message;
  }

  checkPrayerTime() {
    const currentPrayer = this.prayerTimes.checkCurrentTime();
    if (currentPrayer) {
      const notification = this.prayerTimes.notifyPrayerTime(currentPrayer);
      this.showPrayerNotification(notification);
    }
  }

  showPrayerNotification(notification) {
    const notificationElement = document.createElement('div');
    notificationElement.className = 'prayer-notification';
    notificationElement.innerHTML = `
      <h3>${notification.title}</h3>
      <p>${notification.message}</p>
      <div class="notification-actions">
        <button id="pauseQuiz">Pause Quiz</button>
        <button id="continueQuiz">Lanjutkan</button>
      </div>
    `;
    
    document.body.appendChild(notificationElement);
    
    document.getElementById('pauseQuiz').addEventListener('click', () => {
      document.dispatchEvent(new Event('pauseQuiz'));
      notificationElement.remove();
    });
    
    document.getElementById('continueQuiz').addEventListener('click', () => {
      notificationElement.remove();
    });
  }
}
