// Main Application Controller
document.addEventListener('DOMContentLoaded', function() {
  // Initialize particles
  particlesJS.load('particles-js', 'assets/js/particles.json', function() {
    console.log('Particles loaded');
  });

  // Play opening audio
  const openingAudio = document.getElementById('openingAudio');
  openingAudio.play().catch(e => console.log('Autoplay prevented:', e));

  // Screen management
  const screens = {
    welcome: document.getElementById('welcome-screen'),
    terms: document.getElementById('terms-screen'),
    participant: document.getElementById('participant-form-screen'),
    examLevel: document.getElementById('exam-level-screen'),
    exam: document.getElementById('exam-screen'),
    results: document.getElementById('results-screen'),
    certificate: document.getElementById('certificate-screen')
  };

  // Login functionality
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      const loginCode = document.getElementById('login-code').value;
      if (loginCode === '12345') {
        switchScreen(screens.welcome, screens.terms);
      } else {
        alert('Kode login salah! Silakan coba lagi.');
      }
    });
  }

  // Terms agreement
  const agreeTerms = document.getElementById('agree-terms');
  const continueBtn = document.getElementById('continue-btn');
  
  if (agreeTerms && continueBtn) {
    agreeTerms.addEventListener('change', function() {
      continueBtn.disabled = !this.checked;
    });

    continueBtn.addEventListener('click', function() {
      switchScreen(screens.terms, screens.participant);
    });
  }

  // Participant form
  const participantForm = document.getElementById('participant-form');
  if (participantForm) {
    participantForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Validate form
      if (validateParticipantForm()) {
        switchScreen(screens.participant, screens.examLevel);
      }
    });
  }

  // Helper function to switch screens
  function switchScreen(from, to) {
    from.classList.remove('active');
    from.classList.add('animate__fadeOut');
    
    setTimeout(() => {
      from.classList.remove('animate__fadeOut');
      to.classList.add('active', 'animate__fadeIn');
      
      setTimeout(() => {
        to.classList.remove('animate__fadeIn');
      }, 500);
    }, 500);
  }

  // Initialize floating buttons
  initFloatingButtons();
});

function validateParticipantForm() {
  // Implement form validation logic
  return true;
}

function initFloatingButtons() {
  // Share button
  const shareBtn = document.querySelector('.share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      document.getElementById('share-modal').style.display = 'block';
    });
  }

  // WhatsApp button
  const whatsappBtn = document.querySelector('.whatsapp-btn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      window.open('https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...');
    });
  }

  // Bank soal button
  const bankSoalBtn = document.querySelector('.bank-soal-btn');
  if (bankSoalBtn) {
    bankSoalBtn.addEventListener('click', () => {
      document.getElementById('bank-soal-modal').style.display = 'block';
    });
  }

  // Admin button
  const adminBtn = document.querySelector('.admin-btn');
  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      document.getElementById('admin-modal').style.display = 'block';
    });
  }

  // Close modals
  const closeModals = document.querySelectorAll('.close-modal');
  closeModals.forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });
}
