// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', function() {
  // Inisialisasi partikel background
  particlesJS.load('particles-js', 'assets/js/particles.json', function() {
    console.log('Particles.js loaded');
  });
  
  // Main App Logic
  const app = {
    currentScreen: 'welcome',
    participantData: {},
    examData: {},
    results: {},
    questions: [],
    currentQuestionIndex: 0,
    timerInterval: null,
    timeLeft: 120 * 60, // 120 menit dalam detik
    
    init: function() {
      this.bindEvents();
      this.loadQuestions();
      this.showScreen('welcome');
      this.playOpeningAudio();
    },
    
    bindEvents: function() {
      // Navigation Events
      document.getElementById('enter-btn').addEventListener('click', this.verifyExamCode.bind(this));
      document.getElementById('agree-terms').addEventListener('change', this.toggleAgreement.bind(this));
      document.getElementById('continue-btn').addEventListener('click', this.goToParticipantForm.bind(this));
      
      // Status Radio Buttons
      document.querySelectorAll('input[name="status"]').forEach(radio => {
        radio.addEventListener('change', this.toggleStatusFields.bind(this));
      });
      
      // Form Submission
      document.getElementById('participant-form').addEventListener('submit', this.saveParticipantData.bind(this));
      
      // Exam Level Selection
      document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', this.selectGradeLevel.bind(this));
      });
      
      document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', this.selectSubject.bind(this));
      });
      
      // Start Exam
      document.getElementById('start-exam-btn').addEventListener('click', this.startExam.bind(this));
      
      // Exam Controls
      document.getElementById('finish-exam-btn').addEventListener('click', this.finishExam.bind(this));
      document.getElementById('skip-question-btn').addEventListener('click', this.skipQuestion.bind(this));
      document.getElementById('unanswered-btn').addEventListener('click', this.showUnanswered.bind(this));
      
      // Floating Buttons
      document.querySelector('.share-btn').addEventListener('click', this.openShareModal.bind(this));
      document.querySelector('.whatsapp-btn').addEventListener('click', this.chatAdmin.bind(this));
      document.querySelector('.question-bank-btn').addEventListener('click', this.openQuestionBank.bind(this));
      document.querySelector('.admin-panel-btn').addEventListener('click', this.openAdminPanel.bind(this));
    },
    
    // Screen Management
    showScreen: function(screenName) {
      document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
      });
      
      const screenElement = document.getElementById(`${screenName}-screen`);
      if (screenElement) {
        screenElement.classList.add('active');
        this.currentScreen = screenName;
      }
    },
    
    // Audio Functions
    playOpeningAudio: function() {
      const audio = document.getElementById('opening-audio');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play failed:', e));
    },
    
    // Verification Functions
    verifyExamCode: function() {
      const examCode = document.getElementById('exam-code').value;
      if (examCode === '12345') {
        this.showScreen('terms');
        this.animateScreenTransition('terms-screen', 'fadeInRight');
      } else {
        alert('Kode ujian salah! Silakan coba lagi.');
      }
    },
    
    // Dan seterusnya... (semua fungsi lainnya)
  };
  
  // Start the app
  app.init();
});
