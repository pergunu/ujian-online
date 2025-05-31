document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi partikel dengan konfigurasi lebih kaya
    if (typeof particlesJS !== 'undefined') {
        initParticles();
    } else {
        loadParticlesJS().then(initParticles);
    }

    // Main Logic
    const examCodeInput = document.getElementById('exam-code');
    const enterBtn = document.getElementById('enter-btn');
    const openingAudio = document.getElementById('opening-audio');
    const buttonAudio = document.getElementById('button-audio');
    
    // Inisialisasi tombol melayang
    initFloatingButtons();
    
    // Load pengaturan
    loadSettings();
    
    // Audio handling
    handleAudio();
    
    // Event listeners
    setupEventListeners();

    // Fungsi untuk inisialisasi partikel
    function initParticles() {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 120, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: "#ffffff" 
                },
                shape: { 
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.7,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Fungsi untuk load library particles.js jika belum ada
    function loadParticlesJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Fungsi untuk inisialisasi tombol melayang
    function initFloatingButtons() {
        const floatingButtons = [
            {
                icon: 'fa-share-alt',
                title: 'Bagikan',
                action: shareApp
            },
            {
                icon: 'fab fa-whatsapp',
                title: 'Chat Admin',
                action: contactAdmin
            },
            {
                icon: 'fa-book',
                title: 'Bank Soal',
                action: openQuestionBank,
                adminOnly: true
            },
            {
                icon: 'fa-cog',
                title: 'Admin Panel',
                action: openAdminPanel,
                adminOnly: true
            }
        ];

        const floatingContainer = document.querySelector('.floating-buttons');
        if (floatingContainer) {
            floatingButtons.forEach(button => {
                if (button.adminOnly && !sessionStorage.getItem('isAdmin')) return;
                
                const btn = document.createElement('button');
                btn.className = `floating-btn ${button.title.toLowerCase().replace(' ', '-')}-btn`;
                btn.innerHTML = `
                    <i class="${button.icon}"></i>
                    <span class="tooltip">${button.title}</span>
                `;
                btn.addEventListener('click', button.action);
                floatingContainer.appendChild(btn);
            });
        }
    }

    // Fungsi untuk load pengaturan
    function loadSettings() {
        const greetingText = localStorage.getItem('greetingText') || 'Selamat Datang di Ujian Online PERGUNU SITUBONDO';
        const welcomeMessage = localStorage.getItem('welcomeMessage') || 'Silakan masukkan kode ujian untuk melanjutkan';
        
        if (document.getElementById('greeting-text')) {
            document.getElementById('greeting-text').textContent = greetingText;
        }
        
        if (document.getElementById('welcome-message')) {
            document.getElementById('welcome-message').textContent = welcomeMessage;
        }
    }

    // Fungsi untuk handle audio
    function handleAudio() {
        if (openingAudio) {
            openingAudio.volume = 0.3;
            openingAudio.play().catch(e => console.log("Autoplay prevented:", e));
        }
    }

    // Fungsi untuk setup event listeners
    function setupEventListeners() {
        if (enterBtn && examCodeInput) {
            enterBtn.addEventListener('click', validateExamCode);
            examCodeInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    validateExamCode();
                }
            });
        }
    }

    // Fungsi untuk validasi kode ujian
    function validateExamCode() {
        playButtonSound();
        const examCode = examCodeInput.value.trim();
        const validCode = '12345';
        const savedCode = localStorage.getItem('loginCode') || validCode;
        
        if (!examCode) {
            alert('Silakan masukkan kode ujian');
            return;
        }
        
        if (examCode === savedCode) {
            sessionStorage.setItem('examCode', examCode);
            window.location.href = 'terms.html';
        } else {
            alert('Kode ujian salah. Silakan coba lagi.');
            examCodeInput.value = '';
            examCodeInput.focus();
        }
    }

    // Fungsi untuk tombol berbagi
    function shareApp() {
        playButtonSound();
        if (navigator.share) {
            navigator.share({
                title: 'Ujian Online PERGUNU',
                text: 'Ikuti ujian online dari PERGUNU SITUBONDO',
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare();
            });
        } else {
            fallbackShare();
        }
    }

    // Fallback untuk share
    function fallbackShare() {
        alert('Salin link berikut untuk berbagi:\n' + window.location.href);
    }

    // Fungsi untuk kontak admin
    function contactAdmin() {
        playButtonSound();
        window.open('https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...', '_blank');
    }

    // Fungsi untuk buka bank soal
    function openQuestionBank() {
        playButtonSound();
        const questionCode = prompt('Masukkan Kode Bank Soal:', 'OPENLOCK-1926');
        if (questionCode === 'OPENLOCK-1926' || questionCode === localStorage.getItem('questionCode')) {
            window.location.href = 'admin/questions.html';
        } else {
            alert('Kode Bank Soal salah!');
        }
    }

    // Fungsi untuk buka admin panel
    function openAdminPanel() {
        playButtonSound();
        const adminCode = prompt('Masukkan Kode Admin:', '65614222');
        if (adminCode === '65614222' || adminCode === localStorage.getItem('adminCode')) {
            window.location.href = 'admin/index.html';
        } else {
            alert('Kode Admin salah!');
        }
    }

    // Fungsi untuk play sound tombol
    function playButtonSound() {
        if (buttonAudio) {
            buttonAudio.currentTime = 0;
            buttonAudio.play().catch(e => console.log("Button sound prevented:", e));
        }
    }
});
