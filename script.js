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
    
    // Admin Panel Modal
    document.getElementById('verifyAdminCodeBtn').addEventListener('click', verifyAdminCode);
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
    
    // Close modals
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
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

// Show/hide floating buttons based on screen
function updateFloatingButtons() {
    const floatingButtons = document.querySelector('.floating-buttons');
    if (document.getElementById('welcomeScreen').classList.contains('active')) {
        floatingButtons.style.display = 'flex';
    } else {
        floatingButtons.style.display = 'none';
    }
}

// Perbaikan fungsi printCertificate
function printCertificate() {
    playButtonSound();
    
    // Get certificate element
    const certificate = document.getElementById('certificatePrint');
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Get all styles from the main document
    let styles = '';
    const styleSheets = document.styleSheets;
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            const rules = styleSheets[i].cssRules;
            for (let j = 0; j < rules.length; j++) {
                styles += rules[j].cssText + '\n';
            }
        } catch (e) {
            console.log('Cannot access stylesheet: ', e);
        }
    }
    
    // Add font imports
    const fonts = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Great+Vibes&family=Dancing+Script:wght@700&display=swap');
    `;
    
    // Build the print document
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Sertifikat Ujian PERGUNU Situbondo</title>
            <style>
                ${fonts}
                ${styles}
                
                /* Override styles for printing */
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                    background: white !important;
                }
                
                .certificate-container {
                    width: 100% !important;
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    box-shadow: none !important;
                    border: none !important;
                    background: white !important;
                    position: relative;
                    page-break-after: avoid;
                    page-break-inside: avoid;
                }
                
                .certificate-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 0;
                    opacity: 0.1;
                }
                
                .certificate-content {
                    position: relative;
                    z-index: 1;
                    padding: 50px;
                    text-align: center;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: black !important;
                }
                
                /* Ensure text is visible */
                .certificate-title, .recipient-name, .certificate-text,
                .score-container, .motivation-text, .certificate-footer {
                    color: #000 !important;
                    text-shadow: none !important;
                }
                
                /* Hide buttons and other unnecessary elements */
                .certificate-actions, .floating-buttons {
                    display: none !important;
                }
                
                @page {
                    size: A4 landscape;
                    margin: 0;
                }
            </style>
        </head>
        <body>
            ${certificate.outerHTML}
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                        setTimeout(function() {
                            window.close();
                        }, 500);
                    }, 300);
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Call this function whenever screen changes
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        screen.scrollIntoView({ behavior: 'smooth' });
    }
    
    updateFloatingButtons();
}

function initializeParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 5);
    const colors = ['rgba(255, 255, 255, 0.8)', 'rgba(200, 200, 255, 0.6)', 'rgba(173, 216, 230, 0.7)'];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.7 + 0.3
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw particles with gradient effect
        particles.forEach(particle => {
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size
            );
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Reset particles that go off screen
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX = -particle.speedX;
            }
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY = -particle.speedY;
            }
            
            // Random twinkle effect
            if (Math.random() > 0.97) {
                particle.opacity = Math.random() * 0.7 + 0.3;
            }
        });
        
        // Draw connecting lines with gradient
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const gradient = ctx.createLinearGradient(
                        particles[i].x, particles[i].y,
                        particles[j].x, particles[j].y
                    );
                    gradient.addColorStop(0, particles[i].color);
                    gradient.addColorStop(1, particles[j].color);
                    
                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
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
    audio.volume = 0.5;
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
                // In a real app, you would reverse geocode the coordinates to get an address
                // For this example, we'll just show a mock address
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
    
    // Save participant data to localStorage (in a real app, this would be sent to a server)
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

function showCertificate() {
    playButtonSound();
    
    // Calculate score
    const totalPossiblePoints = examQuestions.length * adminSettings.questionPoints;
    const earnedPoints = correctAnswers * adminSettings.questionPoints;
    const score = Math.round((earnedPoints / totalPossiblePoints) * 100);
    
    // Format name with proper capitalization
    const formatName = (name) => {
        return name.toLowerCase().split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    
    const formattedName = formatName(participantData.fullName);
    
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
    
    // Generate certificate code
    const certificateCode = generateCertificateCode(score);
    document.getElementById('certificateCode').textContent = certificateCode;
    
    // Hide floating buttons
    document.querySelector('.floating-buttons').style.display = 'none';
    
    // Show certificate screen
    showScreen('certificateScreen');
    
    // Play applause sound
    playApplauseSound();
}

function generateCertificateCode(score) {
    const now = new Date();
    const datePart = now.toISOString().split('T')[0].replace(/-/g, '');
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    const scorePart = score.toString().padStart(3, '0');
    
    // Use full name without modification
    const namePart = participantData.fullName.toUpperCase().replace(/\s+/g, '_');
    
    return `${namePart}/${participantData.status.toUpperCase()}/${
        participantData.tingkatSekolah ? participantData.tingkatSekolah.toUpperCase() : 'UMUM'}/${
        examSubject.toUpperCase()}/${datePart}/${randomPart}-${scorePart}/PERGUNU-STB`;
}


            </style>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Great+Vibes&family=Dancing+Script:wght@700&display=swap" rel="stylesheet">
        </head>
        <body>
            ${certificate.outerHTML}
            <script>
                window.onload = function() {
                    setTimeout(function() {
                        window.print();
                        setTimeout(function() {
                            window.close();
                        }, 500);
                    }, 300);
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

function backToResults() {
    playButtonSound();
    // Show floating buttons again
    document.querySelector('.floating-buttons').style.display = 'flex';
    showScreen('resultsScreen');
}

function retakeExam() {
    playButtonSound();
    // Show floating buttons again
    document.querySelector('.floating-buttons').style.display = 'flex';
    
    // Go back to exam level selection
    showScreen('examLevelScreen');
}

// Floating Button Functions
function showShareModal() {
    playButtonSound();
    document.getElementById('shareModal').style.display = 'block';
    document.getElementById('shareLink').value = window.location.href;
}

function openWhatsApp() {
    playButtonSound();
    const phone = '6285647709114';
    const message = 'Assalamualaikum mas admin, saya mau tanya sesuatu nih...';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}

function showBankSoalModal() {
    playButtonSound();
    document.getElementById('bankSoalModal').style.display = 'block';
}

function showAdminPanelModal() {
    playButtonSound();
    document.getElementById('adminPanelModal').style.display = 'block';
    
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
    for (const [subject, enabled] of Object.entries(adminSettings.enabledSubjects)) {
        document.getElementById(`${subject}Enabled`).checked = enabled;
    }
}

// Bank Soal Functions
function verifyBankSoalCode() {
    playButtonSound();
    const bankSoalCode = document.getElementById('bankSoalCode').value;
    const notification = document.getElementById('bankSoalNotification');
    
    if (bankSoalCode === defaultCodes.bankSoalCode) {
        notification.textContent = "Kode valid! Mengarahkan ke bank soal...";
        notification.className = "notification success";
        
        // Show bank soal content
        document.getElementById('bankSoalContent').style.display = 'block';
        
        // Load questions
        loadQuestionsForBank();
    } else {
        notification.textContent = "Kode bank soal tidak valid. Silakan coba lagi.";
        notification.className = "notification error";
    }
}

function switchTab(e) {
    playButtonSound();
    const tabId = e.target.getAttribute('data-tab');
    
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Update active tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

function saveQuestion(e) {
    e.preventDefault();
    playButtonSound();
    
    const question = {
        question: document.getElementById('questionTextArea').value,
        options: {
            A: document.getElementById('optionA').value,
            B: document.getElementById('optionB').value,
            C: document.getElementById('optionC').value,
            D: document.getElementById('optionD').value,
            E: document.getElementById('optionE').value
        },
        correctAnswer: document.querySelector('input[name="correctOption"]:checked').value,
        explanation: document.getElementById('explanationTextArea').value,
        level: document.getElementById('questionLevel').value,
        category: document.getElementById('questionCategory').value
    };
    
    // Validate all fields are filled
    if (!question.question || !question.explanation || 
        !question.options.A || !question.options.B || !question.options.C || 
        !question.options.D || !question.options.E) {
        alert("Semua field harus diisi!");
        return;
    }
    
    // Add question to the appropriate category
    if (!allQuestions[question.category]) {
        allQuestions[question.category] = [];
    }
    
    allQuestions[question.category].push(question);
    
    // Save to localStorage (in a real app, this would be sent to a server)
    saveQuestionsToStorage();
    
    // Reload questions list
    loadQuestionsForBank();
    
    // Clear form
    clearQuestionForm();
    
    // Show success message
    alert("Soal berhasil disimpan!");
}

function clearQuestionForm() {
    playButtonSound();
    document.getElementById('questionForm').reset();
}

function generateQuestionsWithAI() {
    playButtonSound();
    const prompt = document.getElementById('aiPrompt').value;
    const apiKey = document.getElementById('apiKey').value;
    const resultsContainer = document.getElementById('aiResults');
    
    if (!prompt || !apiKey) {
        alert("Prompt dan API Key harus diisi!");
        return;
    }
    
    resultsContainer.innerHTML = "<p>Menggenerate soal... Harap tunggu.</p>";
    
    // In a real implementation, you would call an AI API here
    // This is a mock implementation for demonstration
    setTimeout(() => {
        // Mock response
        const mockQuestions = [
            {
                question: "Apa ibukota Indonesia?",
                options: {
                    A: "Jakarta",
                    B: "Bandung",
                    C: "Surabaya",
                    D: "Medan",
                    E: "Makassar"
                },
                correctAnswer: "A",
                explanation: "Ibukota Indonesia adalah Jakarta.",
                level: "mudah"
            },
            {
                question: "Siapa presiden pertama Indonesia?",
                options: {
                    A: "Soeharto",
                    B: "Joko Widodo",
                    C: "Soekarno",
                    D: "BJ Habibie",
                    E: "Megawati"
                },
                correctAnswer: "C",
                explanation: "Presiden pertama Indonesia adalah Soekarno.",
                level: "mudah"
            }
        ];
        
        let html = "<h4>Hasil Generate:</h4>";
        
        mockQuestions.forEach((q, index) => {
            html += `
                <div class="ai-question">
                    <p><strong>Soal ${index + 1}:</strong> ${q.question}</p>
                    <p><strong>Opsi:</strong></p>
                    <ul>
                        <li>A. ${q.options.A}</li>
                        <li>B. ${q.options.B}</li>
                        <li>C. ${q.options.C}</li>
                        <li>D. ${q.options.D}</li>
                        <li>E. ${q.options.E}</li>
                    </ul>
                    <p><strong>Jawaban benar:</strong> ${q.correctAnswer}</p>
                    <p><strong>Penjelasan:</strong> ${q.explanation}</p>
                    <button class="use-question-btn" data-index="${index}">Gunakan Soal Ini</button>
                </div>
            `;
        });
        
        resultsContainer.innerHTML = html;
        
        // Add event listeners to use question buttons
        document.querySelectorAll('.use-question-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                useAIQuestion(mockQuestions[index]);
            });
        });
    }, 2000);
}

function useAIQuestion(question) {
    playButtonSound();
    
    // Fill the manual form with the AI-generated question
    document.getElementById('questionTextArea').value = question.question;
    document.getElementById('optionA').value = question.options.A;
    document.getElementById('optionB').value = question.options.B;
    document.getElementById('optionC').value = question.options.C;
    document.getElementById('optionD').value = question.options.D;
    document.getElementById('optionE').value = question.options.E;
    document.querySelector(`input[name="correctOption"][value="${question.correctAnswer}"]`).checked = true;
    document.getElementById('explanationTextArea').value = question.explanation;
    document.getElementById('questionLevel').value = question.level;
    
    // Switch to manual tab
    document.querySelector('.tab-btn[data-tab="manualTab"]').click();
}

function loadQuestionsForBank() {
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = '';
    
    let count = 0;
    
    for (const [category, questions] of Object.entries(allQuestions)) {
        questions.forEach((q, index) => {
            count++;
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            
            questionItem.innerHTML = `
                <div class="question-text-item">${count}. ${q.question}</div>
                <div class="question-meta">
                    <span>Kategori: ${category}</span>
                    <span>Tingkat: ${q.level}</span>
                </div>
                <div class="question-actions">
                    <button class="edit-question-btn" data-category="${category}" data-index="${index}">Edit</button>
                    <button class="delete-question-btn" data-category="${category}" data-index="${index}">Hapus</button>
                </div>
            `;
            
            questionList.appendChild(questionItem);
        });
    }
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-question-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const index = parseInt(this.getAttribute('data-index'));
            editQuestion(category, index);
        });
    });
    
    document.querySelectorAll('.delete-question-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const index = parseInt(this.getAttribute('data-index'));
            deleteQuestion(category, index);
        });
    });
}

function editQuestion(category, index) {
    playButtonSound();
    const question = allQuestions[category][index];
    
    // Fill the form
    document.getElementById('questionTextArea').value = question.question;
    document.getElementById('optionA').value = question.options.A;
    document.getElementById('optionB').value = question.options.B;
    document.getElementById('optionC').value = question.options.C;
    document.getElementById('optionD').value = question.options.D;
    document.getElementById('optionE').value = question.options.E;
    document.querySelector(`input[name="correctOption"][value="${question.correctAnswer}"]`).checked = true;
    document.getElementById('explanationTextArea').value = question.explanation;
    document.getElementById('questionLevel').value = question.level;
    document.getElementById('questionCategory').value = category;
    
    // Switch to manual tab
    document.querySelector('.tab-btn[data-tab="manualTab"]').click();
    
    // Remove the question from the array (will be re-added when saved)
    allQuestions[category].splice(index, 1);
    saveQuestionsToStorage();
    loadQuestionsForBank();
}

function deleteQuestion(category, index) {
    playButtonSound();
    if (confirm("Apakah Anda yakin ingin menghapus soal ini?")) {
        allQuestions[category].splice(index, 1);
        saveQuestionsToStorage();
        loadQuestionsForBank();
    }
}

function filterQuestions() {
    playButtonSound();
    const category = document.getElementById('filterCategory').value;
    const level = document.getElementById('filterLevel').value;
    
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = '';
    
    let count = 0;
    
    for (const [cat, questions] of Object.entries(allQuestions)) {
        if (category !== 'all' && cat !== category) continue;
        
        questions.forEach((q, index) => {
            if (level !== 'all' && q.level !== level) return;
            
            count++;
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            
            questionItem.innerHTML = `
                <div class="question-text-item">${count}. ${q.question}</div>
                <div class="question-meta">
                    <span>Kategori: ${cat}</span>
                    <span>Tingkat: ${q.level}</span>
                </div>
                <div class="question-actions">
                    <button class="edit-question-btn" data-category="${cat}" data-index="${index}">Edit</button>
                    <button class="delete-question-btn" data-category="${cat}" data-index="${index}">Hapus</button>
                </div>
            `;
            
            questionList.appendChild(questionItem);
        });
    }
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-question-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const index = parseInt(this.getAttribute('data-index'));
            editQuestion(category, index);
        });
    });
    
    document.querySelectorAll('.delete-question-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const index = parseInt(this.getAttribute('data-index'));
            deleteQuestion(category, index);
        });
    });
}

// Admin Panel Functions
function verifyAdminCode() {
    playButtonSound();
    const adminCode = document.getElementById('adminCode').value;
    const notification = document.getElementById('adminNotification');
    
    if (adminCode === defaultCodes.adminCode) {
        notification.textContent = "Kode valid! Mengarahkan ke kontrol panel admin...";
        notification.className = "notification success";
        
        // Show admin content
        document.getElementById('adminContent').style.display = 'block';
    } else {
        notification.textContent = "Kode admin tidak valid. Silakan coba lagi.";
        notification.className = "notification error";
    }
}

function saveLoginCode() {
    playButtonSound();
    const newCode = document.getElementById('newLoginCode').value;
    const currentCode = document.getElementById('currentLoginCode').value;
    
    if (!newCode) {
        alert("Kode login baru harus diisi!");
        return;
    }
    
    if (currentCode !== defaultCodes.loginCode) {
        alert("Kode login lama tidak valid!");
        return;
    }
    
    defaultCodes.loginCode = newCode;
    alert("Kode login berhasil diperbarui!");
}

function saveCpnsCode() {
    playButtonSound();
    const newCode = document.getElementById('newCpnsCode').value;
    const currentCode = document.getElementById('currentCpnsCode').value;
    
    if (!newCode) {
        alert("Kode ujian CPNS baru harus diisi!");
        return;
    }
    
    if (currentCode !== defaultCodes.cpnsCode) {
        alert("Kode ujian CPNS lama tidak valid!");
        return;
    }
    
    defaultCodes.cpnsCode = newCode;
    alert("Kode ujian CPNS berhasil diperbarui!");
}

function saveBankSoalCode() {
    playButtonSound();
    const newCode = document.getElementById('newBankSoalCode').value;
    const currentCode = document.getElementById('currentBankSoalCode').value;
    
    if (!newCode) {
        alert("Kode bank soal baru harus diisi!");
        return;
    }
    
    if (currentCode !== defaultCodes.bankSoalCode) {
        alert("Kode bank soal lama tidak valid!");
        return;
    }
    
    defaultCodes.bankSoalCode = newCode;
    alert("Kode bank soal berhasil diperbarui!");
}

function saveAdminCode() {
    playButtonSound();
    const newCode = document.getElementById('newAdminCode').value;
    const currentCode = document.getElementById('currentAdminCode').value;
    
    if (!newCode) {
        alert("Kode admin baru harus diisi!");
        return;
    }
    
    if (currentCode !== defaultCodes.adminCode) {
        alert("Kode admin lama tidak valid!");
        return;
    }
    
    defaultCodes.adminCode = newCode;
    alert("Kode admin berhasil diperbarui!");
}

function saveTextSettings() {
    playButtonSound();
    
    try {
        adminSettings.greetingText = document.getElementById('greetingTextEdit').value;
        adminSettings.periodicInfo = document.getElementById('periodicInfoEdit').value;
        adminSettings.chairmanName = document.getElementById('chairmanNameEdit').value;
        
        // Parse motivation texts JSON
        const motivationTexts = JSON.parse(document.getElementById('motivationTextEdit').value);
        adminSettings.motivationTexts = motivationTexts;
        
        // Save to localStorage
        saveAdminSettings();
        
        // Update displayed texts
        document.getElementById('greetingText').textContent = adminSettings.greetingText;
        document.getElementById('periodicInfo').textContent = adminSettings.periodicInfo;
        
        alert("Pengaturan teks berhasil disimpan!");
    } catch (e) {
        alert("Terjadi kesalahan saat menyimpan pengaturan teks: " + e.message);
    }
}

function saveExamSettings() {
    playButtonSound();
    
    adminSettings.examDuration = parseInt(document.getElementById('examTimerEdit').value);
    adminSettings.questionPoints = parseInt(document.getElementById('questionPoints').value);
    adminSettings.questionCount = parseInt(document.getElementById('questionCount').value);
    adminSettings.randomizeQuestions = document.getElementById('randomizeQuestions').value === 'true';
    
    // Update enabled subjects
    for (const subject in adminSettings.enabledSubjects) {
        adminSettings.enabledSubjects[subject] = document.getElementById(`${subject}Enabled`).checked;
    }
    
    // Save to localStorage
    saveAdminSettings();
    
    alert("Pengaturan ujian berhasil disimpan!");
}

function exportParticipantData() {
    playButtonSound();
    const format = document.getElementById('exportFormat').value;
    const participants = getParticipantsFromStorage();
    
    if (participants.length === 0) {
        alert("Tidak ada data peserta yang tersedia untuk diexport.");
        return;
    }
    
    let data, mimeType, fileName;
    
    if (format === 'excel' || format === 'csv') {
        // Convert to CSV
        let csv = 'No,Nama,Status,Tingkat,Jenis Ujian,Nilai,Tanggal\n';
        
        participants.forEach((p, index) => {
            csv += `${index + 1},"${p.fullName}","${p.status}","${p.tingkatSekolah || 'Umum'}","${p.examSubject || '-'}",${p.score || '-'},"${new Date(p.examDate).toLocaleDateString('id-ID')}"\n`;
        });
        
        data = csv;
        mimeType = 'text/csv';
        fileName = 'data_peserta.csv';
    } else if (format === 'json') {
        data = JSON.stringify(participants, null, 2);
        mimeType = 'application/json';
        fileName = 'data_peserta.json';
    }
    
    // Create download link
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Share Functions
function copyShareLink() {
    playButtonSound();
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    document.execCommand('copy');
    alert("Link berhasil disalin ke clipboard!");
}

function shareToSocial(e) {
    playButtonSound();
    const platform = e.target.classList.contains('facebook') ? 'facebook' :
                     e.target.classList.contains('twitter') ? 'twitter' :
                     e.target.classList.contains('whatsapp') ? 'whatsapp' : 'telegram';
    
    const url = encodeURIComponent(window.location.href);
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=Ikuti%20Ujian%20Online%20PERGUNU%20Situbondo`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=Ikuti%20Ujian%20Online%20PERGUNU%20Situbondo%20${url}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${url}&text=Ikuti%20Ujian%20Online%20PERGUNU%20Situbondo`;
            break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
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
