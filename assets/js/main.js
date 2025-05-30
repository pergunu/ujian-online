document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Login functionality
    const loginCode = document.getElementById('login-code');
    const loginBtn = document.getElementById('login-btn');
    const loginError = document.getElementById('login-error');
    const defaultCode = '12345'; // Default login code

    loginBtn.addEventListener('click', function() {
        if (loginCode.value === defaultCode) {
            // Play button click sound
            const audio = new Audio('assets/audio/audiotombol.mp3');
            audio.play();
            
            // Redirect to terms page after short delay
            setTimeout(() => {
                window.location.href = 'terms.html';
            }, 500);
        } else {
            loginError.textContent = 'Kode login salah. Silakan coba lagi.';
            loginError.style.display = 'block';
            
            // Shake animation for error
            loginCode.style.animation = 'shake 0.5s';
            setTimeout(() => {
                loginCode.style.animation = '';
            }, 500);
        }
    });

    // Also allow login on Enter key
    loginCode.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });

    // Create floating buttons
    createFloatingButtons();
});

function createFloatingButtons() {
    const floatingBtns = document.createElement('div');
    floatingBtns.className = 'floating-btns';
    
    // WhatsApp button
    const whatsappBtn = document.createElement('div');
    whatsappBtn.className = 'floating-btn';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.title = 'Hubungi Admin via WhatsApp';
    whatsappBtn.addEventListener('click', function() {
        window.open('https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...', '_blank');
    });
    
    // Share button
    const shareBtn = document.createElement('div');
    shareBtn.className = 'floating-btn';
    shareBtn.innerHTML = '<i class="fas fa-share-alt"></i>';
    shareBtn.title = 'Bagikan Website Ini';
    shareBtn.addEventListener('click', function() {
        // In a real app, this would open a share dialog
        alert('Fitur berbagi akan membuka dialog berbagi ke media sosial');
    });
    
    floatingBtns.appendChild(whatsappBtn);
    floatingBtns.appendChild(shareBtn);
    document.body.appendChild(floatingBtns);
}
