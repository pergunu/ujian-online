// Global Variables
let currentScreen = 0;
let participantData = {};
let examQuestions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let unansweredQuestions = 0;
let selectedOptions = {};
let examTimer;
let timeLeft = 120 * 60; // 120 minutes in seconds
let examStarted = false;
let examSubject = '';
let examLevel = '';
let allQuestions = {};
let adminSettings = {
    greetingText: "Selamat Datang di Ujian Online PERGUNU Situbondo",
    periodicInfo: "Informasi penting akan ditampilkan di sini sesuai pengaturan admin.",
    chairmanName: "Moh. Nuril Hudha, S.Pd., M.Si.",
    motivationTexts: {
        "90-100": "Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.",
        "80-89": "Bagus sekali! Anda telah menunjukkan pemahaman yang mendalam tentang materi ujian.",
        "70-79": "Baik! Anda memiliki pemahaman yang cukup baik tentang materi ini.",
        "60-69": "Cukup. Masih ada ruang untuk meningkatkan pemahaman Anda.",
        "0-59": "Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi."
    },
    examDuration: 120,
    questionPoints: 1,
    questionCount: 10,
    enabledSubjects: {
        agama: true,
        ppkn: true,
        sejarah: true,
        ipa: true,
        ips: true,
        matematika: true,
        bahasa_indonesia: true,
        bahasa_inggris: true,
        materi_extra: true,
        materi_khusus: true,
        ujian_logika: true,
        ujian_cpns: true
    },
    randomizeQuestions: true
};

// Default codes
const defaultCodes = {
    loginCode: "12345",
    cpnsCode: "OPENLOCK-1945",
    bankSoalCode: "OPENLOCK-1926",
    adminCode: "65614222"
};

// Enhanced particle system
let particles = [];
let particleCanvas, particleCtx;

// Sample Questions (In a real app, this would come from a database)
function initializeSampleQuestions() {
    allQuestions = {
        agama: [
            {
                question: "Apa nama kitab suci agama Islam?",
                options: {
                    A: "Injil",
                    B: "Al-Quran",
                    C: "Taurat",
                    D: "Weda",
                    E: "Tripitaka"
                },
                correctAnswer: "B",
                explanation: "Kitab suci agama Islam adalah Al-Quran yang diturunkan kepada Nabi Muhammad SAW.",
                level: "mudah"
            }
        ],
        ppkn: [
            {
                question: "Pancasila sebagai dasar negara tercantum dalam?",
                options: {
                    A: "Pembukaan UUD 1945",
                    B: "Batang Tubuh UUD 1945",
                    C: "Penjelasan UUD 1945",
                    D: "Keputusan Presiden",
                    E: "Keputusan MPR"
                },
                correctAnswer: "A",
                explanation: "Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat.",
                level: "mudah"
            }
        ],
        sejarah: [
            {
                question: "Kapan Indonesia memproklamasikan kemerdekaannya?",
                options: {
                    A: "16 Agustus 1945",
                    B: "17 Agustus 1945",
                    C: "18 Agustus 1945",
                    D: "19 Agustus 1945",
                    E: "20 Agustus 1945"
                },
                correctAnswer: "B",
                explanation: "Indonesia memproklamasikan kemerdekaannya pada tanggal 17 Agustus 1945.",
                level: "mudah"
            }
        ],
        ipa: [
            {
                question: "Planet terdekat dengan matahari adalah?",
                options: {
                    A: "Venus",
                    B: "Bumi",
                    C: "Mars",
                    D: "Merkurius",
                    E: "Jupiter"
                },
                correctAnswer: "D",
                explanation: "Merkurius adalah planet terdekat dengan matahari dalam tata surya kita.",
                level: "mudah"
            }
        ],
        ips: [
            {
                question: "Apa mata uang resmi Jepang?",
                options: {
                    A: "Dollar",
                    B: "Euro",
                    C: "Yen",
                    D: "Pound",
                    E: "Won"
                },
                correctAnswer: "C",
                explanation: "Mata uang resmi Jepang adalah Yen.",
                level: "mudah"
            }
        ],
        matematika: [
            {
                question: "Berapakah hasil dari 7 x 8?",
                options: {
                    A: "48",
                    B: "54",
                    C: "56",
                    D: "64",
                    E: "72"
                },
                correctAnswer: "C",
                explanation: "Hasil dari 7 x 8 adalah 56.",
                level: "mudah"
            }
        ],
        bahasa_indonesia: [
            {
                question: "Apa sinonim dari kata 'bahagia'?",
                options: {
                    A: "Sedih",
                    B: "Senang",
                    C: "Marah",
                    D: "Kecewa",
                    E: "Takut"
                },
                correctAnswer: "B",
                explanation: "Sinonim dari kata 'bahagia' adalah 'senang'.",
                level: "mudah"
            }
        ],
        bahasa_inggris: [
            {
                question: "What is the English word for 'buku'?",
                options: {
                    A: "Pen",
                    B: "Book",
                    C: "Table",
                    D: "Chair",
                    E: "Door"
                },
                correctAnswer: "B",
                explanation: "The English word for 'buku' is 'book'.",
                level: "mudah"
            }
        ],
        materi_extra: [
            {
                question: "Siapa pencipta lagu Indonesia Raya?",
                options: {
                    A: "W.R. Supratman",
                    B: "C. Simanjuntak",
                    C: "Ismail Marzuki",
                    D: "Gesang",
                    E: "Ibu Sud"
                },
                correctAnswer: "A",
                explanation: "Lagu Indonesia Raya diciptakan oleh Wage Rudolf Supratman.",
                level: "mudah"
            }
        ],
        materi_khusus: [
            {
                question: "Apa nama organisasi pelajar Nahdlatul Ulama?",
                options: {
                    A: "GP Ansor",
                    B: "IPNU",
                    C: "IPPNU",
                    D: "Pergunu",
                    E: "Banom NU"
                },
                correctAnswer: "B",
                explanation: "IPNU (Ikatan Pelajar Nahdlatul Ulama) adalah organisasi pelajar NU.",
                level: "mudah"
            }
        ],
        ujian_logika: [
            {
                question: "Jika semua A adalah B dan beberapa B adalah C, maka:",
                options: {
                    A: "Semua A adalah C",
                    B: "Beberapa A adalah C",
                    C: "Tidak ada A yang C",
                    D: "Beberapa C adalah A",
                    E: "Tidak dapat disimpulkan"
                },
                correctAnswer: "B",
                explanation: "Jika beberapa B adalah C dan semua A adalah B, maka beberapa A adalah C.",
                level: "sedang"
            }
        ],
        ujian_cpns: [
            {
                question: "Menurut UUD 1945, kekuasaan kehakiman dilakukan oleh:",
                options: {
                    A: "Presiden",
                    B: "DPR",
                    C: "MA dan MK",
                    D: "BPK",
                    E: "KY"
                },
                correctAnswer: "C",
                explanation: "Kekuasaan kehakiman dilakukan oleh Mahkamah Agung (MA) dan Mahkamah Konstitusi (MK) menurut UUD 1945.",
                level: "sedang"
            }
        ]
    };
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSampleQuestions();
    initializeParticles();
    loadAdminSettings();
    playOpeningSound();
    
    // Set greeting text
    document.getElementById('greetingText').textContent = adminSettings.greetingText;
    document.getElementById('periodicInfo').textContent = adminSettings.periodicInfo;
    
    // Show floating buttons only on welcome screen
    showFloatingButtons('welcomeScreen');
    
    // Event Listeners
    document.getElementById('loginBtn').addEventListener('click', verifyLoginCode);
    document.getElementById('agreeCheckbox').addEventListener('change', toggleContinueButton);
    document.getElementById('continueBtn').addEventListener('click', showParticipantForm);
    document.getElementById('participantDataForm').addEventListener('submit', saveParticipantData);
    document.getElementById('getLocationBtn').addEventListener('click', getLocation);
    document.querySelectorAll('input[name="status"]').forEach(radio => {
        radio.addEventListener('change', toggleParticipantFields);
    });
    document.getElementById('verifyCpnsCodeBtn').addEventListener('click', verifyCpnsCode);
    document.getElementById('startExamBtn').addEventListener('click', startExam);
    document.getElementById('finishExamBtn').addEventListener('click', finishExam);
    document.getElementById('skipQuestionBtn').addEventListener('click', skipQuestion);
    document.getElementById('unansweredBtn').addEventListener('click', showUnansweredQuestions);
    document.getElementById('viewCertificateBtn').addEventListener('click', showCertificate);
    document.getElementById('printCertificateBtn').addEventListener('click', printCertificate);
    document.getElementById('backToResultsBtn').addEventListener('click', backToResults);
    document.getElementById('retakeExamBtn').addEventListener('click', retakeExam);
    
    // Floating buttons
    document.getElementById('shareBtn').addEventListener('click', showShareModal);
    document.getElementById('whatsappBtn').addEventListener('click', openWhatsApp);
    document.getElementById('bankSoalBtn').addEventListener('click', showBankSoalModal);
    document.getElementById('adminBtn').addEventListener('click', showAdminPanelModal);
    
    // Bank Soal Modal
    document.getElementById('verifyBankSoalCodeBtn').addEventListener('click', verifyBankSoalCode);
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', switchTab);
    });
    document.getElementById('questionForm').addEventListener('submit', saveQuestion);
    document.getElementById('clearFormBtn').addEventListener('click', clearQuestionForm);
    document.getElementById('generateQuestionsBtn').addEventListener('click', generateQuestionsWithAI);
    document.getElementById('applyFilterBtn').addEventListener('click', filterQuestions);
    
    // Admin Panel Modal - Fixed event listeners
    document.getElementById('verifyAdminCodeBtn').addEventListener('click', function() {
        const code = document.getElementById('adminCode').value;
        const notification = document.getElementById('adminNotification');
        
        if (code === defaultCodes.adminCode) {
            notification.textContent = "Kode valid! Mengarahkan ke panel admin...";
            notification.className = "notification success";
            document.getElementById('adminContent').style.display = 'block';
            
            // Load current settings into form
            document.getElementById('greetingTextEdit').value = adminSettings.greetingText;
            document.getElementById('periodicInfoEdit').value = adminSettings.periodicInfo;
            document.getElementById('chairmanNameEdit').value = adminSettings.chairmanName;
            document.getElementById('motivationTextEdit').value = JSON.stringify(adminSettings.motivationTexts, null, 2);
            document.getElementById('examTimerEdit').value = adminSettings.examDuration;
            document.getElementById('questionPoints').value = adminSettings.questionPoints;
            document.getElementById('questionCount').value = adminSettings.questionCount;
            document.getElementById('randomizeQuestions').value = adminSettings.randomizeQuestions.toString();
            
            // Set enabled subjects checkboxes
            for (const subject in adminSettings.enabledSubjects) {
                document.getElementById(`${subject}Enabled`).checked = adminSettings.enabledSubjects[subject];
            }
        } else {
            notification.textContent = "Kode admin tidak valid. Silakan coba lagi.";
            notification.className = "notification error";
        }
    });
    
    document.getElementById('saveLoginCodeBtn').addEventListener('click', saveLoginCode);
    document.getElementById('saveCpnsCodeBtn').addEventListener('click', saveCpnsCode);
    document.getElementById('saveBankSoalCodeBtn').addEventListener('click', saveBankSoalCode);
    document.getElementById('saveAdminCodeBtn').addEventListener('click', saveAdminCode);
    document.getElementById('saveTextSettingsBtn').addEventListener('click', saveTextSettings);
    document.getElementById('saveExamSettingsBtn').addEventListener('click', saveExamSettings);
    document.getElementById('exportDataBtn').addEventListener('click', exportParticipantData);
    
    // Share Modal
    document.getElementById('copyLinkBtn').addEventListener('click', copyShareLink);
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', shareToSocial);
    });
    
    // Close modals - Fixed event listeners
    document.getElementById('closeBankSoalModal').addEventListener('click', function() {
        document.getElementById('bankSoalModal').style.display = 'none';
    });
    
    document.getElementById('closeAdminModal').addEventListener('click', function() {
        document.getElementById('adminPanelModal').style.display = 'none';
    });
    
    document.getElementById('closeShareModal').addEventListener('click', function() {
        document.getElementById('shareModal').style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Play button sound on all buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', playButtonSound);
    });
});

// Show/hide floating buttons based on current screen
function showFloatingButtons(screenId) {
    const floatingButtons = document.getElementById('floatingButtons');
    if (screenId === 'welcomeScreen') {
        floatingButtons.style.display = 'flex';
    } else {
        floatingButtons.style.display = 'none';
    }
}

// Enhanced Particle Animation
function initializeParticles() {
    particleCanvas = document.getElementById('particle-canvas');
    particleCtx = particleCanvas.getContext('2d');
    
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    
    // Create premium particles with different colors and sizes
    const particleCount = Math.floor(window.innerWidth / 5); // More particles
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * particleCanvas.width,
            y: Math.random() * particleCanvas.height,
            size: Math.random() * 4 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: `hsla(${Math.random() * 60 + 180}, 80%, 60%, ${Math.random() * 0.5 + 0.1})`,
            twinkleSpeed: Math.random() * 0.02 + 0.01,
            opacity: Math.random() * 0.5 + 0.1,
            targetOpacity: Math.random() * 0.5 + 0.1
        });
    }
    
    // Start animation
    animateParticles();
    
    window.addEventListener('resize', function() {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    });
}

function animateParticles() {
    // Clear with semi-transparent background for trail effect
    particleCtx.fillStyle = 'rgba(10, 15, 30, 0.2)';
    particleCtx.fillRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    // Draw particles
    particles.forEach(particle => {
        // Update opacity for twinkle effect
        if (Math.abs(particle.opacity - particle.targetOpacity) < 0.01) {
            particle.targetOpacity = Math.random() * 0.5 + 0.1;
        } else {
            if (particle.opacity < particle.targetOpacity) {
                particle.opacity += particle.twinkleSpeed;
            } else {
                particle.opacity -= particle.twinkleSpeed;
            }
        }
        
        // Draw particle
        particleCtx.beginPath();
        particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        particleCtx.fillStyle = particle.color.replace(/[\d\.]+\)$/, particle.opacity + ')');
        particleCtx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > particleCanvas.width) {
            particle.speedX = -particle.speedX;
        }
        if (particle.y < 0 || particle.y > particleCanvas.height) {
            particle.speedY = -particle.speedY;
        }
    });
    
    // Draw connecting lines with gradient effect
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const gradient = particleCtx.createLinearGradient(
                    particles[i].x, particles[i].y, 
                    particles[j].x, particles[j].y
                );
                gradient.addColorStop(0, particles[i].color.replace(/[\d\.]+\)$/, (0.3 - distance/500) + ')'));
                gradient.addColorStop(1, particles[j].color.replace(/[\d\.]+\)$/, (0.3 - distance/500) + ')'));
                
                particleCtx.beginPath();
                particleCtx.strokeStyle = gradient;
                particleCtx.lineWidth = 0.8;
                particleCtx.moveTo(particles[i].x, particles[i].y);
                particleCtx.lineTo(particles[j].x, particles[j].y);
                particleCtx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

// Audio Functions
function playOpeningSound() {
    const audio = document.getElementById('openingAudio');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Autoplay prevented:", e));
}

function playButtonSound() {
    const audio = document.getElementById('buttonAudio');
    audio.currentTime = 0;
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio play prevented:", e));
}

function playCorrectSound() {
    const audio = document.getElementById('correctAudio');
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play prevented:", e));
}

function playWrongSound() {
    const audio = document.getElementById('wrongAudio');
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play prevented:", e));
}

function playApplauseSound() {
    const audio = document.getElementById('applauseAudio');
    audio.currentTime = 0;
    audio.volume = 0.7;
    audio.play().catch(e => console.log("Audio play prevented:", e));
}

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        screen.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update floating buttons visibility
    showFloatingButtons(screenId);
    
    // Show particle effect when showing results screen
    if (screenId === 'resultsScreen') {
        createCelebrationParticles();
    }
}

// Celebration particles for results screen
function createCelebrationParticles() {
    const particleCanvas = document.getElementById('particle-canvas');
    const ctx = particleCanvas.getContext('2d');
    
    // Create confetti particles
    const confettiParticles = [];
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    for (let i = 0; i < 150; i++) {
        confettiParticles.push({
            x: Math.random() * particleCanvas.width,
            y: -20,
            size: Math.random() * 10 + 5,
            speedY: Math.random() * 5 + 2,
            speedX: Math.random() * 4 - 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    // Animate confetti
    function animateConfetti() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        
        confettiParticles.forEach(particle => {
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            
            ctx.fillStyle = particle.color;
            ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
            
            ctx.restore();
            
            // Update position
            particle.y += particle.speedY;
            particle.x += particle.speedX;
            particle.rotation += particle.rotationSpeed;
            
            // Reset if out of screen
            if (particle.y > particleCanvas.height) {
                particle.y = -20;
                particle.x = Math.random() * particleCanvas.width;
            }
        });
        
        if (document.getElementById('resultsScreen').classList.contains('active')) {
            requestAnimationFrame(animateConfetti);
        }
    }
    
    animateConfetti();
}

function verifyLoginCode() {
    playButtonSound();
    const loginCode = document.getElementById('loginCode').value;
    const notification = document.getElementById('loginNotification');
    
    if (loginCode === defaultCodes.loginCode) {
        notification.textContent = "Kode valid! Mengarahkan ke halaman berikutnya...";
        notification.className = "notification success";
        
        setTimeout(() => {
            showScreen('termsScreen');
        }, 1000);
    } else {
        notification.textContent = "Kode login tidak valid. Silakan coba lagi.";
        notification.className = "notification error";
    }
}

function toggleContinueButton() {
    const checkbox = document.getElementById('agreeCheckbox');
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.disabled = !checkbox.checked;
}

function showParticipantForm() {
    playButtonSound();
    showScreen('participantForm');
}

function toggleParticipantFields() {
    const isPelajar = document.getElementById('pelajar').checked;
    
    document.querySelectorAll('.pelajar-fields').forEach(field => {
        field.style.display = isPelajar ? 'block' : 'none';
    });
    
    document.querySelectorAll('.umum-fields').forEach(field => {
        field.style.display = isPelajar ? 'none' : 'block';
    });
    
    // Reset fields when switching
    if (isPelajar) {
        document.getElementById('address').value = '';
        document.getElementById('whatsapp').value = '';
        document.getElementById('email').value = '';
    } else {
        document.getElementById('schoolName').value = '';
        document.getElementById('nis').value = '';
    }
}

function getLocation() {
    playButtonSound();
    const locationDisplay = document.getElementById('locationDisplay');
    
    if (navigator.geolocation) {
        locationDisplay.textContent = "Mendapatkan lokasi...";
        
        navigator.geolocation.getCurrentPosition(
            position => {
                const mockAddresses = [
                    "Jl. Raya Situbondo No. 123, Situbondo",
                    "Jl. Panglima Sudirman No. 45, Situbondo",
                    "Jl. Dr. Sutomo No. 67, Situbondo"
                ];
                
                const randomAddress = mockAddresses[Math.floor(Math.random() * mockAddresses.length)];
                locationDisplay.textContent = `Lokasi saat ini: ${randomAddress}`;
                document.getElementById('address').value = randomAddress;
            },
            error => {
                locationDisplay.textContent = "Tidak dapat mendapatkan lokasi: " + error.message;
            }
        );
    } else {
        locationDisplay.textContent = "Geolocation tidak didukung oleh browser Anda.";
    }
}

function saveParticipantData(e) {
    e.preventDefault();
    playButtonSound();
    
    const isPelajar = document.getElementById('pelajar').checked;
    
    participantData = {
        fullName: document.getElementById('fullName').value,
        status: isPelajar ? 'pelajar' : 'umum',
        schoolName: isPelajar ? document.getElementById('schoolName').value : null,
        nis: isPelajar ? document.getElementById('nis').value : null,
        tingkatSekolah: isPelajar ? document.getElementById('tingkatSekolah').value : null,
        tujuan: isPelajar ? document.getElementById('pelajarTujuan').value : document.getElementById('umumTujuan').value,
        address: !isPelajar ? document.getElementById('address').value : null,
        whatsapp: !isPelajar ? document.getElementById('whatsapp').value : null,
        email: !isPelajar ? document.getElementById('email').value : null,
        registrationDate: new Date().toISOString()
    };
    
    // Validate required fields
    if (!participantData.fullName) {
        alert("Nama lengkap harus diisi!");
        return;
    }
    
    if (isPelajar) {
        if (!participantData.schoolName || !participantData.nis) {
            alert("Nama sekolah dan NIS harus diisi untuk pelajar!");
            return;
        }
    } else {
        if (!participantData.address || !participantData.whatsapp || !participantData.email) {
            alert("Alamat, nomor WhatsApp, dan email harus diisi untuk peserta umum!");
            return;
        }
        
        // Validate email format
        const emailRegex = /^[a-z0-9._%+-]+@(gmail|yahoo|hotmail)\.com$/i;
        if (!emailRegex.test(participantData.email)) {
            alert("Format email tidak valid. Harus menggunakan @gmail.com, @yahoo.com, atau @hotmail.com");
            return;
        }
    }
    
    // Save participant data to localStorage
    saveParticipantToStorage(participantData);
    
    // Show exam level selection screen
    showScreen('examLevelScreen');
    
    // Show appropriate options based on participant status
    if (isPelajar) {
        document.querySelector('.pelajar-options').style.display = 'block';
        document.querySelector('.umum-options').style.display = 'none';
        
        // Show class options based on school level
        const tingkatSekolah = participantData.tingkatSekolah;
        document.querySelectorAll('.kelas-options').forEach(option => {
            option.style.display = 'none';
        });
        
        if (tingkatSekolah === 'SD') {
            document.querySelector('.sd-options').style.display = 'block';
        } else if (tingkatSekolah === 'SMP') {
            document.querySelector('.smp-options').style.display = 'block';
        } else if (tingkatSekolah === 'SMA') {
            document.querySelector('.sma-options').style.display = 'block';
        }
    } else {
        document.querySelector('.pelajar-options').style.display = 'none';
        document.querySelector('.umum-options').style.display = 'block';
    }
    
    // Add event listeners to level buttons
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            examLevel = this.getAttribute('data-level');
            
            // Highlight selected button
            document.querySelectorAll('.level-btn').forEach(b => {
                b.classList.remove('selected');
            });
            this.classList.add('selected');
            
            // For CPNS exam, show code input
            if (examLevel === 'ujian_cpns') {
                document.getElementById('cpnsCodeContainer').style.display = 'block';
            } else {
                document.getElementById('cpnsCodeContainer').style.display = 'none';
            }
            
            checkExamReady();
        });
    });
    
    // Add event listeners to subject buttons
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            examSubject = this.getAttribute('data-subject');
            
            // Highlight selected button
            document.querySelectorAll('.subject-btn').forEach(b => {
                b.classList.remove('selected');
            });
            this.classList.add('selected');
            
            checkExamReady();
        });
    });
}

function verifyCpnsCode() {
    playButtonSound();
    const cpnsCode = document.getElementById('cpnsCode').value;
    const notification = document.getElementById('cpnsCodeNotification');
    
    if (cpnsCode === defaultCodes.cpnsCode) {
        notification.textContent = "Kode valid! Anda dapat melanjutkan.";
        notification.className = "notification success";
        checkExamReady();
    } else {
        notification.textContent = "Kode lisensi tidak valid. Silakan coba lagi.";
        notification.className = "notification error";
    }
}

function checkExamReady() {
    const startBtn = document.getElementById('startExamBtn');
    
    if (participantData.status === 'pelajar') {
        startBtn.disabled = !(examLevel && examSubject);
    } else {
        if (examLevel === 'ujian_cpns') {
            const cpnsCode = document.getElementById('cpnsCode').value;
            startBtn.disabled = !(examLevel && cpnsCode === defaultCodes.cpnsCode);
        } else {
            startBtn.disabled = !examLevel;
        }
    }
}

function startExam() {
    playButtonSound();
    
    // Determine exam subject based on participant status
    if (participantData.status === 'pelajar') {
        examSubject = examSubject;
    } else {
        examSubject = examLevel === 'tes_iq' ? 'ujian_logika' : 'ujian_cpns';
    }
    
    // Get questions for the selected subject
    examQuestions = allQuestions[examSubject] || [];
    
    // Randomize questions if enabled
    if (adminSettings.randomizeQuestions) {
        examQuestions = shuffleArray(examQuestions);
    }
    
    // Limit to the configured number of questions
    examQuestions = examQuestions.slice(0, adminSettings.questionCount);
    
    // Reset exam variables
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    unansweredQuestions = 0;
    selectedOptions = {};
    examStarted = true;
    
    // Start timer
    timeLeft = adminSettings.examDuration * 60;
    updateTimerDisplay();
    examTimer = setInterval(updateTimer, 1000);
    
    // Show exam screen
    showScreen('examScreen');
    displayCurrentQuestion();
}

function updateTimer() {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
        clearInterval(examTimer);
        finishExam();
    } else if (timeLeft === 10 * 60) {
        // 10 minutes left warning
        document.getElementById('timeWarning').style.display = 'block';
    } else if (timeLeft === 60) {
        // 1 minute left - hide warning
        document.getElementById('timeWarning').style.display = 'none';
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerDisplay = document.getElementById('examTimer');
    
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    // Make timer bigger when 10 minutes or less remaining
    if (timeLeft <= 10 * 60) {
        timerDisplay.style.fontSize = '1.5rem';
        timerDisplay.style.color = 'var(--warning-color)';
    } else {
        timerDisplay.style.fontSize = '1.2rem';
        timerDisplay.style.color = 'white';
    }
}

function displayCurrentQuestion() {
    if (currentQuestionIndex >= examQuestions.length) {
        finishExam();
        return;
    }
    
    const question = examQuestions[currentQuestionIndex];
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const answerExplanation = document.getElementById('answerExplanation');
    const currentQuestionDisplay = document.getElementById('currentQuestion');
    const totalQuestionsDisplay = document.getElementById('totalQuestions');
    
    // Update question counters
    currentQuestionDisplay.textContent = currentQuestionIndex + 1;
    totalQuestionsDisplay.textContent = examQuestions.length;
    
    // Set question text
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    answerExplanation.style.display = 'none';
    
    // Create option buttons
    for (const [key, value] of Object.entries(question.options)) {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = `${key}. ${value}`;
        optionBtn.setAttribute('data-option', key);
        
        // If already answered, show the result
        if (selectedOptions[currentQuestionIndex]) {
            if (key === question.correctAnswer) {
                optionBtn.classList.add('correct');
            } else if (key === selectedOptions[currentQuestionIndex] && key !== question.correctAnswer) {
                optionBtn.classList.add('incorrect');
            }
            
            if (key === selectedOptions[currentQuestionIndex]) {
                optionBtn.classList.add('selected');
            }
            
            optionBtn.disabled = true;
        } else {
            optionBtn.addEventListener('click', selectOption);
        }
        
        optionsContainer.appendChild(optionBtn);
    }
    
    // Show explanation if already answered
    if (selectedOptions[currentQuestionIndex]) {
        answerExplanation.textContent = question.explanation;
        answerExplanation.style.display = 'block';
    }
}

function selectOption(e) {
    playButtonSound();
    const selectedOption = e.target.getAttribute('data-option');
    const question = examQuestions[currentQuestionIndex];
    
    // Save selected option
    selectedOptions[currentQuestionIndex] = selectedOption;
    
    // Disable all options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        btn.removeEventListener('click', selectOption);
    });
    
    // Highlight correct/incorrect
    if (selectedOption === question.correctAnswer) {
        e.target.classList.add('correct');
        correctAnswers++;
        playCorrectSound();
    } else {
        e.target.classList.add('incorrect');
        wrongAnswers++;
        playWrongSound();
        
        // Also highlight the correct answer
        document.querySelector(`.option-btn[data-option="${question.correctAnswer}"]`).classList.add('correct');
    }
    
    e.target.classList.add('selected');
    
    // Show explanation
    const answerExplanation = document.getElementById('answerExplanation');
    answerExplanation.textContent = question.explanation;
    answerExplanation.style.display = 'block';
    
    // Auto-advance after 2 seconds
    setTimeout(() => {
        currentQuestionIndex++;
        displayCurrentQuestion();
    }, 2000);
}

function skipQuestion() {
    playButtonSound();
    if (!selectedOptions[currentQuestionIndex]) {
        unansweredQuestions++;
    }
    currentQuestionIndex++;
    displayCurrentQuestion();
}

function showUnansweredQuestions() {
    playButtonSound();
    // Find the first unanswered question
    for (let i = 0; i < examQuestions.length; i++) {
        if (!selectedOptions[i]) {
            currentQuestionIndex = i;
            displayCurrentQuestion();
            return;
        }
    }
    
    // If all questions are answered, show a message
    alert("Semua soal sudah dijawab.");
}

function finishExam() {
    playButtonSound();
    clearInterval(examTimer);
    examStarted = false;
    
    // Calculate unanswered questions
    unansweredQuestions = examQuestions.length - (correctAnswers + wrongAnswers);
    
    // Calculate score (0-100)
    const totalPossiblePoints = examQuestions.length * adminSettings.questionPoints;
    const earnedPoints = correctAnswers * adminSettings.questionPoints;
    const score = Math.round((earnedPoints / totalPossiblePoints) * 100);
    
    // Update results display
    document.getElementById('totalQuestionsResult').textContent = examQuestions.length;
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('wrongAnswers').textContent = wrongAnswers;
    document.getElementById('unansweredQuestions').textContent = unansweredQuestions;
    document.getElementById('finalScore').textContent = score;
    
    // Show results screen
    showScreen('resultsScreen');
    
    // Save exam results
    saveExamResults(score);
}

// Enhanced Certificate Function
function showCertificate() {
    playButtonSound();
    
    // Calculate score
    const totalPossiblePoints = examQuestions.length * adminSettings.questionPoints;
    const earnedPoints = correctAnswers * adminSettings.questionPoints;
    const score = Math.round((earnedPoints / totalPossiblePoints) * 100);
    
    // Format participant name (capitalize first letter of each word)
    const formattedName = participantData.fullName.toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    // Set certificate data
    document.getElementById('certificateName').textContent = formattedName;
    document.getElementById('certificateScore').textContent = score;
    
    // Set certificate date
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('certificateDate').textContent = now.toLocaleDateString('id-ID', options);
    
    // Set chairman name
    document.getElementById('chairmanName').textContent = adminSettings.chairmanName;
    
    // Set motivation text based on score
    let motivationText = "";
    for (const [range, text] of Object.entries(adminSettings.motivationTexts)) {
        const [min, max] = range.split('-').map(Number);
        if (score >= min && score <= max) {
            motivationText = text;
            break;
        }
    }
    document.getElementById('motivationText').textContent = motivationText;
    
    // Generate certificate code with full name
    const certificateCode = generateCertificateCode(score, participantData.fullName);
    document.getElementById('certificateCode').textContent = certificateCode;
    
    // Show certificate screen
    showScreen('certificateScreen');
    
    // Play applause sound
    playApplauseSound();
    
    // Create certificate celebration effect
    createCertificateCelebration();
}

function createCertificateCelebration() {
    const certificateContainer = document.getElementById('certificatePrint');
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    // Create 50 celebration elements
    for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'celebration-dot';
        dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.width = `${Math.random() * 10 + 5}px`;
        dot.style.height = dot.style.width;
        dot.style.animationDuration = `${Math.random() * 3 + 2}s`;
        dot.style.animationDelay = `${Math.random() * 0.5}s`;
        
        certificateContainer.appendChild(dot);
        
        // Remove after animation completes
        setTimeout(() => {
            dot.remove();
        }, 5000);
    }
}

function generateCertificateCode(score, fullName) {
    const now = new Date();
    const datePart = now.toISOString().split('T')[0].replace(/-/g, '');
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    const scorePart = score.toString().padStart(3, '0');
    
    // Use full name in the certificate code
    const namePart = fullName.replace(/\s+/g, '-').toUpperCase();
    
    return `${namePart}/${participantData.status.toUpperCase()}/${
        participantData.tingkatSekolah ? participantData.tingkatSekolah.toUpperCase() : 'UMUM'}/${
        examSubject.toUpperCase()}/${datePart}/${randomPart}-${scorePart}/PERGUNU-STB`;
}

function printCertificate() {
    playButtonSound();
    
    // Create a print-specific version
    const printContent = document.getElementById('certificatePrint').innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Sertifikat Ujian</title>
            <style>
                @page {
                    size: A4 landscape;
                    margin: 0;
                }
                body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #fff;
                }
                .certificate-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                }
                .certificate-bg {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 1;
                }
                .certificate-content {
                    position: relative;
                    z-index: 2;
                    padding: 2cm;
                    color: #333;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .certificate-title {
                    font-size: 36pt;
                    margin-bottom: 1cm;
                    font-weight: bold;
                    color: #1a3e72;
                    font-family: 'Times New Roman', serif;
                }
                .certificate-given {
                    font-size: 14pt;
                    margin-bottom: 0.5cm;
                }
                .recipient-name {
                    font-size: 24pt;
                    margin: 1cm 0;
                    font-weight: bold;
                    font-family: 'Times New Roman', serif;
                    letter-spacing: 1px;
                }
                .certificate-description {
                    font-size: 12pt;
                    margin: 1cm 0;
                }
                .certificate-description strong {
                    font-weight: bold;
                }
                .certificate-text {
                    font-size: 11pt;
                    margin: 1cm auto;
                    max-width: 80%;
                    line-height: 1.5;
                }
                .score-container {
                    font-size: 14pt;
                    margin: 1cm 0;
                    font-weight: bold;
                }
                .motivation-text {
                    font-size: 12pt;
                    margin: 1cm auto;
                    max-width: 80%;
                    font-style: italic;
                }
                .certificate-footer {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    margin-top: 1cm;
                }
                .footer-left, .footer-right {
                    width: 45%;
                }
                .period {
                    font-size: 11pt;
                    text-align: left;
                }
                .signature-title {
                    font-size: 12pt;
                    font-weight: bold;
                    margin-top: 1.5cm;
                }
                .signature-name {
                    font-size: 12pt;
                    font-weight: bold;
                    margin-top: 1cm;
                }
                .barcode {
                    width: 3cm;
                    height: auto;
                    margin-top: 0.5cm;
                }
                .certificate-code {
                    position: absolute;
                    bottom: 0.5cm;
                    right: 0.5cm;
                    font-size: 10pt;
                    font-weight: bold;
                    color: #000;
                    letter-spacing: 1px;
                }
            </style>
        </head>
        <body>
            ${printContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    // Trigger print after content is loaded
    printWindow.onload = function() {
        printWindow.print();
        printWindow.close();
    };
}

function backToResults() {
    playButtonSound();
    showScreen('resultsScreen');
}

function retakeExam() {
    playButtonSound();
    // Go back to exam level selection
    showScreen('examLevelScreen');
}

// Modal Functions
function showShareModal() {
    playButtonSound();
    document.getElementById('shareModal').style.display = 'block';
    document.getElementById('shareLink').value = window.location.href;
}

function openWhatsApp() {
    playButtonSound();
    const message = "Halo admin, saya ingin bertanya tentang ujian online PERGUNU Situbondo.";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function showBankSoalModal() {
    playButtonSound();
    document.getElementById('bankSoalModal').style.display = 'block';
}

function showAdminPanelModal() {
    playButtonSound();
    document.getElementById('adminPanelModal').style.display = 'block';
}

function verifyBankSoalCode() {
    playButtonSound();
    const code = document.getElementById('bankSoalCode').value;
    const notification = document.getElementById('bankSoalNotification');
    
    if (code === defaultCodes.bankSoalCode) {
        notification.textContent = "Kode valid! Mengarahkan ke bank soal...";
        notification.className = "notification success";
        document.getElementById('bankSoalContent').style.display = 'block';
    } else {
        notification.textContent = "Kode bank soal tidak valid. Silakan coba lagi.";
        notification.className = "notification error";
    }
}

function copyShareLink() {
    playButtonSound();
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    document.execCommand('copy');
    
    // Show copied notification
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = 'Link berhasil disalin!';
    document.getElementById('shareModal').appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Helper Functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// LocalStorage Functions
function saveParticipantToStorage(participant) {
    let participants = JSON.parse(localStorage.getItem('participants')) || [];
    participants.push(participant);
    localStorage.setItem('participants', JSON.stringify(participants));
}

function saveExamResults(score) {
    let participants = JSON.parse(localStorage.getItem('participants')) || [];
    if (participants.length > 0) {
        const lastParticipant = participants[participants.length - 1];
        lastParticipant.examSubject = examSubject;
        lastParticipant.examLevel = examLevel;
        lastParticipant.score = score;
        lastParticipant.examDate = new Date().toISOString();
        localStorage.setItem('participants', JSON.stringify(participants));
    }
}

function getParticipantsFromStorage() {
    return JSON.parse(localStorage.getItem('participants')) || [];
}

function saveQuestionsToStorage() {
    localStorage.setItem('questions', JSON.stringify(allQuestions));
}

function loadQuestionsFromStorage() {
    const savedQuestions = localStorage.getItem('questions');
    if (savedQuestions) {
        allQuestions = JSON.parse(savedQuestions);
    }
}

function saveAdminSettings() {
    localStorage.setItem('adminSettings', JSON.stringify(adminSettings));
}

function loadAdminSettings() {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
        adminSettings = JSON.parse(savedSettings);
    }
}

// Admin Panel Functions
function saveLoginCode() {
    const newCode = document.getElementById('newLoginCode').value;
    const currentCode = document.getElementById('currentLoginCode').value;
    
    if (currentCode === defaultCodes.loginCode) {
        defaultCodes.loginCode = newCode;
        alert("Kode login berhasil diperbarui!");
    } else {
        alert("Kode login lama tidak valid!");
    }
}

function saveCpnsCode() {
    const newCode = document.getElementById('newCpnsCode').value;
    const currentCode = document.getElementById('currentCpnsCode').value;
    
    if (currentCode === defaultCodes.cpnsCode) {
        defaultCodes.cpnsCode = newCode;
        alert("Kode ujian CPNS berhasil diperbarui!");
    } else {
        alert("Kode ujian CPNS lama tidak valid!");
    }
}

function saveBankSoalCode() {
    const newCode = document.getElementById('newBankSoalCode').value;
    const currentCode = document.getElementById('currentBankSoalCode').value;
    
    if (currentCode === defaultCodes.bankSoalCode) {
        defaultCodes.bankSoalCode = newCode;
        alert("Kode bank soal berhasil diperbarui!");
    } else {
        alert("Kode bank soal lama tidak valid!");
    }
}

function saveAdminCode() {
    const newCode = document.getElementById('newAdminCode').value;
    const currentCode = document.getElementById('currentAdminCode').value;
    
    if (currentCode === defaultCodes.adminCode) {
        defaultCodes.adminCode = newCode;
        alert("Kode admin berhasil diperbarui!");
    } else {
        alert("Kode admin lama tidak valid!");
    }
}

function saveTextSettings() {
    adminSettings.greetingText = document.getElementById('greetingTextEdit').value;
    adminSettings.periodicInfo = document.getElementById('periodicInfoEdit').value;
    adminSettings.chairmanName = document.getElementById('chairmanNameEdit').value;
    
    try {
        adminSettings.motivationTexts = JSON.parse(document.getElementById('motivationTextEdit').value);
        saveAdminSettings();
        alert("Pengaturan teks berhasil disimpan!");
    } catch (e) {
        alert("Format JSON tidak valid untuk teks motivasi!");
    }
}

function saveExamSettings() {
    adminSettings.examDuration = parseInt(document.getElementById('examTimerEdit').value);
    adminSettings.questionPoints = parseInt(document.getElementById('questionPoints').value);
    adminSettings.questionCount = parseInt(document.getElementById('questionCount').value);
    adminSettings.randomizeQuestions = document.getElementById('randomizeQuestions').value === 'true';
    
    // Update enabled subjects
    for (const subject in adminSettings.enabledSubjects) {
        adminSettings.enabledSubjects[subject] = document.getElementById(`${subject}Enabled`).checked;
    }
    
    saveAdminSettings();
    alert("Pengaturan ujian berhasil disimpan!");
}

function exportParticipantData() {
    const format = document.getElementById('exportFormat').value;
    const participants = getParticipantsFromStorage();
    
    if (participants.length === 0) {
        alert("Tidak ada data peserta yang tersedia untuk diekspor.");
        return;
    }
    
    let data, mimeType, extension;
    
    if (format === 'json') {
        data = JSON.stringify(participants, null, 2);
        mimeType = 'application/json';
        extension = 'json';
    } else if (format === 'csv') {
        // Create CSV header
        let csv = 'Nama,Status,Sekolah,NIS,Tingkat,Tujuan,Alamat,WhatsApp,Email,Mata Ujian,Tingkat Ujian,Nilai,Tanggal Ujian\n';
        
        // Add data rows
        participants.forEach(p => {
            csv += `"${p.fullName}","${p.status}","${p.schoolName || ''}","${p.nis || ''}","${
                p.tingkatSekolah || ''}","${p.tujuan}","${p.address || ''}","${p.whatsapp || ''}","${
                p.email || ''}","${p.examSubject || ''}","${p.examLevel || ''}","${p.score || ''}","${
                p.examDate || ''}"\n`;
        });
        
        data = csv;
        mimeType = 'text/csv';
        extension = 'csv';
    } else { // Excel
        // For Excel, we'll create a CSV with tab separator
        let excel = 'Nama\tStatus\tSekolah\tNIS\tTingkat\tTujuan\tAlamat\tWhatsApp\tEmail\tMata Ujian\tTingkat Ujian\tNilai\tTanggal Ujian\n';
        
        participants.forEach(p => {
            excel += `${p.fullName}\t${p.status}\t${p.schoolName || ''}\t${p.nis || ''}\t${
                p.tingkatSekolah || ''}\t${p.tujuan}\t${p.address || ''}\t${p.whatsapp || ''}\t${
                p.email || ''}\t${p.examSubject || ''}\t${p.examLevel || ''}\t${p.score || ''}\t${
                p.examDate || ''}\n`;
        });
        
        data = excel;
        mimeType = 'application/vnd.ms-excel';
        extension = 'xls';
    }
    
    // Create download link
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data_peserta_ujian.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
