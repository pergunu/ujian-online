document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {
        console.log('Particles.js loaded');
    });
    
    // Play opening audio
    const openingAudio = document.getElementById('opening-audio');
    openingAudio.play().catch(e => console.log('Audio play prevented:', e));
    
    // Login functionality
    const loginBtn = document.getElementById('login-btn');
    const loginCodeInput = document.getElementById('login-code');
    const loginNotification = document.getElementById('login-notification');
    
    loginBtn.addEventListener('click', function() {
        const enteredCode = loginCodeInput.value.trim();
        const defaultCode = '12345';
        
        if (!enteredCode) {
            showNotification('Harap masukkan Kode Login', 'error');
            return;
        }
        
        if (enteredCode === defaultCode) {
            showNotification('Kode Login benar! Mengarahkan...', 'success');
            // Play button sound
            playSound('assets/audio/audiotombol.mp3');
            
            // Redirect to agreement page after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'agreement.html';
            }, 1500);
        } else {
            showNotification('Kode Login salah! Silakan coba lagi.', 'error');
            // Play error sound
            playSound('assets/audio/jawabansalah.mp3');
        }
    });
    
    // Floating buttons functionality
    const shareBtn = document.querySelector('.share-btn');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const adminBtn = document.querySelector('.admin-btn');
    
    shareBtn.addEventListener('click', function() {
        playSound('assets/audio/audiotombol.mp3');
        if (navigator.share) {
            navigator.share({
                title: 'Ujian Online PERGUNU Situbondo',
                text: 'Ikuti ujian online resmi PERGUNU Situbondo',
                url: 'http://is.gd/ujianonline'
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            window.open('http://is.gd/ujianonline', '_blank');
        }
    });
    
    whatsappBtn.addEventListener('click', function() {
        playSound('assets/audio/audiotombol.mp3');
        const phoneNumber = '6285647709114';
        const message = 'Assalamualaikum mas admin, saya mau tanya sesuatu nih...';
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    });
    
    adminBtn.addEventListener('click', function() {
        playSound('assets/audio/audiotombol.mp3');
        const adminCode = prompt('Masukkan Kode Admin:');
        const defaultAdminCode = '65614222';
        
        if (adminCode === defaultAdminCode) {
            window.location.href = 'admin/index.html';
        } else {
            alert('Kode Admin salah!');
        }
    });
    
    // Helper functions
    function showNotification(message, type) {
        loginNotification.textContent = message;
        loginNotification.className = 'notification ' + type;
        setTimeout(() => {
            loginNotification.style.display = 'none';
        }, 3000);
    }
    
    function playSound(soundFile) {
        const audio = new Audio(soundFile);
        audio.play().catch(e => console.log('Audio play prevented:', e));
    }
    
    // Dynamic greeting based on time of day
    function updateGreeting() {
        const greetingText = document.getElementById('greeting-text');
        const hour = new Date().getHours();
        let greeting;
        
        if (hour < 10) greeting = 'Selamat Pagi';
        else if (hour < 15) greeting = 'Selamat Siang';
        else if (hour < 18) greeting = 'Selamat Sore';
        else greeting = 'Selamat Malam';
        
        greetingText.textContent = `${greeting}, Selamat Datang di Ujian Online PERGUNU SITUBONDO`;
    }
    
    updateGreeting();
});
