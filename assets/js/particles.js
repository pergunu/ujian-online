// particles.js - Konfigurasi dan inisialisasi partikel
document.addEventListener('DOMContentLoaded', function() {
    // Konfigurasi partikel
    const config = {
        particles: {
            number: {
                value: 150,
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
                value: 0.5,
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
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    };

    // Inisialisasi partikel
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', config);
    } else {
        console.error('particles.js library not loaded');
    }

    // Efek kerlipan untuk partikel tertentu
    function twinkleParticles() {
        const particles = document.querySelectorAll('#particles-js canvas');
        if (particles.length > 0) {
            const canvas = particles[0];
            const ctx = canvas.getContext('2d');
            const particleCount = config.particles.number.value;
            
            setInterval(() => {
                // Pilih 5-10 partikel secara acak untuk dikerlipkan
                const twinkleCount = Math.floor(Math.random() * 6) + 5;
                for (let i = 0; i < twinkleCount; i++) {
                    const idx = Math.floor(Math.random() * particleCount);
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;
                    const size = Math.random() * 5 + 2;
                    
                    // Gambar partikel dengan efek kerlipan
                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                    
                    // Hapus setelah beberapa milidetik
                    setTimeout(() => {
                        ctx.clearRect(x - size - 1, y - size - 1, size * 2 + 2, size * 2 + 2);
                    }, Math.random() * 300 + 200);
                }
            }, 500);
        }
    }

    // Jalankan efek kerlipan setelah partikel terinisialisasi
    setTimeout(twinkleParticles, 1000);
});

// Fallback jika library particles.js tidak ada
if (typeof particlesJS === 'undefined') {
    console.warn('particles.js not found - loading from CDN');
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = function() {
        console.log('particles.js loaded from CDN');
        document.dispatchEvent(new Event('DOMContentLoaded'));
    };
    document.head.appendChild(script);
}
