// Main Application Controller
document.addEventListener('DOMContentLoaded', function() {
  // Initialize particles
  if (typeof particlesJS !== 'undefined') {
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {
      console.log('Particles loaded');
    });
  }

  // Play opening audio
  const openingAudio = document.getElementById('openingAudio');
  openingAudio.volume = 0.5;
  try {
    openingAudio.play().catch(e => console.log('Autoplay prevented:', e));
  } catch (e) {
    console.log('Audio error:', e);
  }

  // Initialize all modules
  initScreens();
  initFloatingButtons();
  initFormValidation();
  initAdminPanel();
});

function initScreens() {
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
      if (loginCode === '12345') { // Default code
        switchScreen(screens.welcome, screens.terms);
        playButtonSound();
      } else {
        alert('Kode login salah! Silakan coba lagi.');
        playErrorSound();
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
      playButtonSound();
    });
  }

  // Participant form submission
  const participantForm = document.getElementById('participant-form');
  if (participantForm) {
    participantForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateParticipantForm()) {
        switchScreen(screens.participant, screens.examLevel);
        playButtonSound();
        setupExamLevelSelection();
      }
    });
  }

  // Helper function to switch screens with animation
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
}

function initFloatingButtons() {
  // Share button
  const shareBtn = document.querySelector('.share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      document.getElementById('share-modal').style.display = 'block';
      playButtonSound();
    });
  }

  // WhatsApp button
  const whatsappBtn = document.querySelector('.whatsapp-btn');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      window.open('https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...');
      playButtonSound();
    });
  }

  // Bank soal button
  const bankSoalBtn = document.querySelector('.bank-soal-btn');
  if (bankSoalBtn) {
    bankSoalBtn.addEventListener('click', () => {
      document.getElementById('bank-soal-modal').style.display = 'block';
      playButtonSound();
    });
  }

  // Admin button
  const adminBtn = document.querySelector('.admin-btn');
  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      document.getElementById('admin-modal').style.display = 'block';
      playButtonSound();
    });
  }

  // Close modals
  const closeModals = document.querySelectorAll('.close-modal');
  closeModals.forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
      playButtonSound();
    });
  });

  // Click outside modal to close
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
      playButtonSound();
    }
  });
}

function playButtonSound() {
  const audio = document.getElementById('buttonAudio');
  audio.currentTime = 0;
  audio.play().catch(e => console.log('Audio play error:', e));
}

function playErrorSound() {
  const audio = document.getElementById('wrongAudio');
  audio.currentTime = 0;
  audio.play().catch(e => console.log('Audio play error:', e));
}

// Initialize other modules
function setupExamLevelSelection() {
  // Handle participant type change
  const statusRadios = document.querySelectorAll('input[name="status"]');
  statusRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      document.getElementById('pelajar-fields').style.display = 
        this.value === 'pelajar' ? 'block' : 'none';
      document.getElementById('umum-fields').style.display = 
        this.value === 'umum' ? 'block' : 'none';
      
      // Update exam level options
      updateExamLevelOptions();
    });
  });

  // Handle school level change
  const schoolLevelSelect = document.getElementById('school-level');
  if (schoolLevelSelect) {
    schoolLevelSelect.addEventListener('change', updateExamLevelOptions);
  }

  // CPNS license verification
  const verifyLicenseBtn = document.getElementById('verify-license-btn');
  if (verifyLicenseBtn) {
    verifyLicenseBtn.addEventListener('click', function() {
      const licenseCode = document.getElementById('cpns-license').value;
      if (licenseCode === 'OPENLOCK-1945') { // Default CPNS code
        document.querySelector('.umum-btn[data-umum="cpns"]').disabled = false;
        playButtonSound();
      } else {
        alert('Kode lisensi salah!');
        playErrorSound();
      }
    });
  }
}

function updateExamLevelOptions() {
  const status = document.querySelector('input[name="status"]:checked').value;
  
  if (status === 'pelajar') {
    const schoolLevel = document.getElementById('school-level').value;
    
    // Hide all grade options
    document.getElementById('sd-options').style.display = 'none';
    document.getElementById('smp-options').style.display = 'none';
    document.getElementById('sma-options').style.display = 'none';
    
    // Show selected grade options
    document.getElementById(`${schoolLevel}-options`).style.display = 'block';
    
    // Show pelajar subjects
    document.getElementById('pelajar-level-options').style.display = 'block';
    document.getElementById('umum-level-options').style.display = 'none';
  } else {
    // Show umum options
    document.getElementById('pelajar-level-options').style.display = 'none';
    document.getElementById('umum-level-options').style.display = 'block';
  }
}
