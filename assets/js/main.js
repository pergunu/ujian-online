document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi partikel
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });

    // Main Logic
    const examCodeInput = document.getElementById('exam-code');
    const enterBtn = document.getElementById('enter-btn');
    const openingAudio = document.getElementById('opening-audio');
    const buttonAudio = document.getElementById('button-audio');
    
    // Play opening audio
    openingAudio.play().catch(e => console.log("Autoplay prevented:", e));
    
    // Button click sound
    function playButtonSound() {
        buttonAudio.currentTime = 0;
        buttonAudio.play().catch(e => console.log("Button sound prevented:", e));
    }
    
    // Floating buttons functionality
    document.querySelector('.share-btn').addEventListener('click', function() {
        playButtonSound();
        alert('Fitur berbagi akan membuka daftar media sosial');
    });
    
    document.querySelector('.whatsapp-btn').addEventListener('click', function() {
        playButtonSound();
        window.open('https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...', '_blank');
    });
    
    // Enter button functionality
    enterBtn.addEventListener('click', function() {
        playButtonSound();
        const examCode = examCodeInput.value.trim();
        
        if (!examCode) {
            alert('Silakan masukkan kode ujian');
            return;
        }
        
        // Default code: 12345
        if (examCode === '12345') {
            // Simpan kode ujian di session storage
            sessionStorage.setItem('examCode', examCode);
            
            // Redirect ke halaman persyaratan
            window.location.href = 'terms.html';
        } else {
            alert('Kode ujian salah. Silakan coba lagi.');
            examCodeInput.value = '';
            examCodeInput.focus();
        }
    });
    
    // Enter key functionality
    examCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            enterBtn.click();
        }
    });
    
    // Load greeting text and welcome message from localStorage or use default
    const greetingText = localStorage.getItem('greetingText') || 'Selamat Datang di Ujian Online PERGUNU SITUBONDO';
    const welcomeMessage = localStorage.getItem('welcomeMessage') || 'Silakan masukkan kode ujian untuk melanjutkan';
    
    document.getElementById('greeting-text').textContent = greetingText;
    document.getElementById('welcome-message').textContent = welcomeMessage;
});
