// ===== GLOBAL VARIABLES =====
const DEFAULT_LOGIN_CODE = "12345";

// ===== INITIALIZE APP =====
function initApp() {
    setupEventListeners();
    initParticles();
    setupFloatingButtons();
}

// ===== BUTTON HANDLERS =====
function handleLogin() {
    const code = document.getElementById('login-code').value.trim();
    const btn = document.getElementById('login-btn');
    
    // Show loading state
    btn.querySelector('.btn-text').classList.add('hidden');
    btn.querySelector('.btn-loader').classList.remove('hidden');
    
    setTimeout(() => {
        if (code === DEFAULT_LOGIN_CODE) {
            // Success
            btn.classList.add('btn-success');
            animateTransition(openingScreen, termsScreen);
        } else {
            // Error
            btn.classList.add('btn-error');
            showAlert('Kode login tidak valid!', 'error');
        }
        
        // Reset button
        setTimeout(() => {
            btn.querySelector('.btn-text').classList.remove('hidden');
            btn.querySelector('.btn-loader').classList.add('hidden');
            btn.classList.remove('btn-success', 'btn-error');
        }, 1000);
    }, 800);
}

// ===== FLOATING BUTTONS =====
function setupFloatingButtons() {
    // Ripple effect
    document.querySelectorAll('.fab-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = this.querySelector('.ripple-effect');
            if (ripple) {
                ripple.style.left = `${e.offsetX}px`;
                ripple.style.top = `${e.offsetY}px`;
                ripple.classList.add('animate');
                setTimeout(() => ripple.classList.remove('animate'), 600);
            }
            
            // Play sound
            playButtonSound();
        });
    });
    
    // Button functionalities
    document.getElementById('share-btn').addEventListener('click', showShareModal);
    document.getElementById('whatsapp-btn').addEventListener('click', openWhatsApp);
    document.getElementById('question-bank-btn').addEventListener('click', openQuestionBank);
    document.getElementById('admin-btn').addEventListener('click', openAdminPanel);
}

// ===== TRANSITION EFFECTS =====
function animateTransition(fromScreen, toScreen) {
    fromScreen.classList.add('animate__fadeOut');
    setTimeout(() => {
        fromScreen.classList.add('hidden');
        fromScreen.classList.remove('animate__fadeOut');
        
        toScreen.classList.remove('hidden');
        toScreen.classList.add('animate__fadeIn');
        
        setTimeout(() => {
            toScreen.classList.remove('animate__fadeIn');
        }, 500);
    }, 500);
}

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', initApp);
