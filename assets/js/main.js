// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
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

    // Screen management
    const screens = document.querySelectorAll('.screen');
    let currentScreen = 'opening-screen';
    
    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        document.getElementById(screenId).classList.add('active');
        currentScreen = screenId;
        
        // Play button sound
        playButtonSound();
    }

    // Audio elements
    const openingAudio = document.getElementById('opening-audio');
    const correctAnswerAudio = document.getElementById('correct-answer-audio');
    const wrongAnswerAudio = document.getElementById('wrong-answer-audio');
    const buttonAudio = document.getElementById('button-audio');
    const applauseAudio = document.getElementById('applause-audio');

    function playButtonSound() {
        buttonAudio.currentTime = 0;
        buttonAudio.play();
    }

    // Login screen functionality
    const loginBtn = document.getElementById('login-btn');
    const loginCodeInput = document.getElementById('login-code');
    const loginNotification = document.getElementById('login-notification');
    
    const defaultLoginCode = '12345';
    let loginCode = defaultLoginCode;

    loginBtn.addEventListener('click', function() {
        const enteredCode = loginCodeInput.value.trim();
        
        if (enteredCode === loginCode) {
            showScreen('terms-screen');
        } else {
            showNotification(loginNotification, 'Kode login salah. Silakan coba lagi.', 'error');
        }
    });

    // Terms screen functionality
    const agreeTermsCheckbox = document.getElementById('agree-terms');
    const continueBtn = document.getElementById('continue-btn');
    
    agreeTermsCheckbox.addEventListener('change', function() {
        continueBtn.disabled = !this.checked;
    });
    
    continueBtn.addEventListener('click', function() {
        showScreen('participant-form-screen');
    });

    // Participant form functionality
    const participantForm = document.getElementById('participant-form');
    const studentRadio = document.getElementById('student');
    const generalRadio = document.getElementById('general');
    const studentFields = document.getElementById('student-fields');
    const generalFields = document.getElementById('general-fields');
    const getLocationBtn = document.getElementById('get-location');
    const locationStatus = document.getElementById('location-status');
    
    // Toggle between student and general fields
    studentRadio.addEventListener('change', function() {
        if (this.checked) {
            studentFields.style.display = 'block';
            generalFields.style.display = 'none';
        }
    });
    
    generalRadio.addEventListener('change', function() {
        if (this.checked) {
            studentFields.style.display = 'none';
            generalFields.style.display = 'block';
        }
    });
    
    // Get GPS location
    getLocationBtn.addEventListener('click', function() {
        if (navigator.geolocation) {
            locationStatus.textContent = 'Mendapatkan lokasi...';
            
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // Use reverse geocoding to get address (simplified for demo)
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                        .then(response => response.json())
                        .then(data => {
                            const address = data.display_name || 'Lokasi tidak diketahui';
                            document.getElementById('address').value = address;
                            locationStatus.textContent = 'Lokasi berhasil didapatkan';
                        })
                        .catch(error => {
                            document.getElementById('address').value = `${lat}, ${lng}`;
                            locationStatus.textContent = 'Alamat tidak ditemukan, menggunakan koordinat';
                        });
                },
                function(error) {
                    locationStatus.textContent = 'Gagal mendapatkan lokasi: ' + error.message;
                }
            );
        } else {
            locationStatus.textContent = 'GPS tidak didukung oleh browser Anda';
        }
    });
    
    // Form submission
    participantForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const fullname = document.getElementById('fullname').value.trim();
        const status = document.querySelector('input[name="status"]:checked').value;
        
        if (!fullname) {
            alert('Nama lengkap harus diisi');
            return;
        }
        
        if (status === 'pelajar') {
            const school = document.getElementById('school').value.trim();
            const nis = document.getElementById('nis').value.trim();
            
            if (!school || !nis) {
                alert('Nama sekolah dan NIS harus diisi untuk peserta pelajar');
                return;
            }
        } else {
            const address = document.getElementById('address').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const email = document.getElementById('email').value.trim();
            
            if (!address || !whatsapp || !email) {
                alert('Alamat, nomor WhatsApp, dan email harus diisi untuk peserta umum');
                return;
            }
            
            // Simple email validation
            if (!email.includes('@') || !email.includes('.')) {
                alert('Email tidak valid');
                return;
            }
        }
        
        // Save participant data (simplified for demo)
        const participantData = {
            fullname,
            status,
            timestamp: new Date().toISOString()
        };
        
        if (status === 'pelajar') {
            participantData.school = document.getElementById('school').value.trim();
            participantData.nis = document.getElementById('nis').value.trim();
            participantData.purpose = document.getElementById('student-purpose').value;
            participantData.schoolLevel = document.getElementById('school-level').value;
        } else {
            participantData.address = document.getElementById('address').value.trim();
            participantData.whatsapp = document.getElementById('whatsapp').value.trim();
            participantData.email = document.getElementById('email').value.trim();
            participantData.purpose = document.getElementById('general-purpose').value;
        }
        
        localStorage.setItem('currentParticipant', JSON.stringify(participantData));
        
        // Proceed to exam selection
        showScreen('exam-selection-screen');
        setupExamSelection(participantData);
    });

    // Exam selection setup
    function setupExamSelection(participantData) {
        const studentExamOptions = document.getElementById('student-exam-options');
        const generalExamOptions = document.getElementById('general-exam-options');
        
        if (participantData.status === 'pelajar') {
            studentExamOptions.style.display = 'block';
            generalExamOptions.style.display = 'none';
            
            // Show appropriate grade buttons based on school level
            const sdGrades = document.getElementById('sd-grades');
            const smpGrades = document.getElementById('smp-grades');
            const smaGrades = document.getElementById('sma-grades');
            
            sdGrades.style.display = 'none';
            smpGrades.style.display = 'none';
            smaGrades.style.display = 'none';
            
            if (participantData.schoolLevel === 'SD') {
                sdGrades.style.display = 'flex';
            } else if (participantData.schoolLevel === 'SMP') {
                smpGrades.style.display = 'flex';
            } else {
                smaGrades.style.display = 'flex';
            }
        } else {
            studentExamOptions.style.display = 'none';
            generalExamOptions.style.display = 'block';
            
            // Show license form if CPNS exam is selected
            const generalPurpose = document.getElementById('general-purpose');
            const licenseForm = document.getElementById('license-form');
            
            generalPurpose.addEventListener('change', function() {
                if (this.value === 'ujian-cpns') {
                    licenseForm.style.display = 'block';
                } else {
                    licenseForm.style.display = 'none';
                }
            });
            
            // Verify license code
            const verifyLicenseBtn = document.getElementById('verify-license');
            const licenseMessage = document.getElementById('license-message');
            const defaultLicenseCode = 'OPENLOCK-1945';
            let licenseCode = defaultLicenseCode;
            
            verifyLicenseBtn.addEventListener('click', function() {
                const enteredCode = document.getElementById('license-code').value.trim();
                
                if (enteredCode === licenseCode) {
                    licenseMessage.textContent = 'Kode lisensi valid';
                    licenseMessage.style.color = 'green';
                    document.getElementById('start-exam-btn').disabled = false;
                } else {
                    licenseMessage.textContent = 'Kode lisensi tidak valid';
                    licenseMessage.style.color = 'red';
                    document.getElementById('start-exam-btn').disabled = true;
                }
            });
        }
        
        // Start exam button
        const startExamBtn = document.getElementById('start-exam-btn');
        
        // For students, enable start button when subject is selected
        if (participantData.status === 'pelajar') {
            const subjectButtons = document.querySelectorAll('.btn-subject');
            let selectedSubject = null;
            
            subjectButtons.forEach(button => {
                button.addEventListener('click', function() {
                    subjectButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    selectedSubject = this.dataset.subject;
                    startExamBtn.disabled = false;
                });
            });
            
            // Also handle grade selection
            const gradeButtons = document.querySelectorAll('.btn-grade');
            let selectedGrade = null;
            
            gradeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    gradeButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    selectedGrade = this.textContent;
                });
            });
            
            startExamBtn.addEventListener('click', function() {
                if (!selectedSubject) {
                    alert('Silakan pilih mata ujian terlebih dahulu');
                    return;
                }
                
                // Save exam details
                const examDetails = {
                    type: 'pelajar',
                    subject: selectedSubject,
                    grade: selectedGrade || 'X', // Default if not selected
                    schoolLevel: participantData.schoolLevel
                };
                
                localStorage.setItem('currentExam', JSON.stringify(examDetails));
                startExam();
            });
        } else {
            // For general public
            const examTypeButtons = document.querySelectorAll('.btn-exam-type');
            let selectedExamType = null;
            
            examTypeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    examTypeButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    selectedExamType = this.dataset.exam;
                    
                    if (selectedExamType === 'tes-iq') {
                        startExamBtn.disabled = false;
                    }
                });
            });
            
            startExamBtn.addEventListener('click', function() {
                if (!selectedExamType) {
                    alert('Silakan pilih jenis ujian terlebih dahulu');
                    return;
                }
                
                // For CPNS exam, check if license is verified
                if (selectedExamType === 'ujian-cpns' && licenseMessage.textContent !== 'Kode lisensi valid') {
                    alert('Silakan verifikasi kode lisensi terlebih dahulu');
                    return;
                }
                
                // Save exam details
                const examDetails = {
                    type: 'umum',
                    examType: selectedExamType
                };
                
                localStorage.setItem('currentExam', JSON.stringify(examDetails));
                startExam();
            });
        }
    }

    // Start exam function
    function startExam() {
        showScreen('exam-screen');
        initializeExam();
    }

    // Notification function
    function showNotification(element, message, type) {
        element.textContent = message;
        element.classList.add('show', type);
        
        setTimeout(() => {
            element.classList.remove('show', type);
        }, 3000);
    }

    // Floating buttons functionality
    const floatingButtons = document.querySelectorAll('.floating-btn');
    const shareBtn = document.getElementById('share-btn');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const goToBtn = document.getElementById('go-to-btn');
    const questionBankBtn = document.getElementById('question-bank-btn');
    const adminPanelBtn = document.getElementById('admin-panel-btn');
    const goToMenu = document.getElementById('go-to-menu');
    const closeGoTo = document.getElementById('close-go-to');
    const addLinkBtn = document.getElementById('add-link-btn');
    const goToLinks = document.getElementById('go-to-links');
    
    // Default links
    const defaultLinks = [
        { name: 'Website PERGUNU', url: 'https://pergunu.github.io/pergunusmart/' },
        { name: 'Facebook', url: 'https://facebook.com' },
        { name: 'YouTube', url: 'https://youtube.com' }
    ];
    
    // Load links from localStorage or use defaults
    let links = JSON.parse(localStorage.getItem('goToLinks')) || defaultLinks;
    updateGoToLinks();
    
    // Share button
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'Ujian Online PERGUNU SITUBONDO',
                text: 'Ikuti ujian online sekarang!',
                url: 'http://is.gd/ujianonline'
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            window.open('https://twitter.com/intent/tweet?text=Ikuti%20ujian%20online%20PERGUNU%20SITUBONDO%20sekarang!%20http://is.gd/ujianonline', '_blank');
        }
    });
    
    // WhatsApp button
    whatsappBtn.addEventListener('click', function() {
        window.open('https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih…', '_blank');
    });
    
    // Go To button
    goToBtn.addEventListener('click', function() {
        goToMenu.style.display = goToMenu.style.display === 'block' ? 'none' : 'block';
    });
    
    closeGoTo.addEventListener('click', function() {
        goToMenu.style.display = 'none';
    });
    
    // Add new link
    addLinkBtn.addEventListener('click', function() {
        const name = prompt('Masukkan nama link:');
        if (!name) return;
        
        const url = prompt('Masukkan URL link:');
        if (!url) return;
        
        links.push({ name, url });
        localStorage.setItem('goToLinks', JSON.stringify(links));
        updateGoToLinks();
    });
    
    function updateGoToLinks() {
        goToLinks.innerHTML = '';
        
        links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.url;
            a.textContent = link.name;
            a.target = '_blank';
            li.appendChild(a);
            goToLinks.appendChild(li);
        });
    }
    
    // Question Bank button
    questionBankBtn.addEventListener('click', function() {
        showVerificationModal('Masukkan Kode Bank Soal:', 'question-bank-screen', 'OPENLOCK-1926');
    });
    
    // Admin Panel button
    adminPanelBtn.addEventListener('click', function() {
        showVerificationModal('Masukkan Kode Admin:', 'admin-panel-screen', '65614222');
    });
    
    // Verification modal
    const codeVerificationModal = document.getElementById('code-verification-modal');
    const verificationCodeInput = document.getElementById('verification-code');
    const verifyCodeBtn = document.getElementById('verify-code-btn');
    const cancelVerificationBtn = document.getElementById('cancel-verification-btn');
    const verificationMessage = document.getElementById('verification-message');
    
    let verificationCallback = null;
    
    function showVerificationModal(message, targetScreen, defaultCode) {
        verificationMessage.textContent = message;
        verificationCodeInput.value = '';
        verificationCallback = function() {
            const enteredCode = verificationCodeInput.value.trim();
            
            if (enteredCode === defaultCode) {
                codeVerificationModal.style.display = 'none';
                showScreen(targetScreen);
                
                if (targetScreen === 'question-bank-screen') {
                    initializeQuestionBank();
                } else if (targetScreen === 'admin-panel-screen') {
                    initializeAdminPanel();
                }
            } else {
                alert('Kode verifikasi salah. Silakan coba lagi.');
            }
        };
        
        codeVerificationModal.style.display = 'flex';
    }
    
    verifyCodeBtn.addEventListener('click', function() {
        if (verificationCallback) {
            verificationCallback();
        }
    });
    
    cancelVerificationBtn.addEventListener('click', function() {
        codeVerificationModal.style.display = 'none';
    });
    
    verificationCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verifyCodeBtn.click();
        }
    });
    
    // Hide floating buttons on certain screens
    function updateFloatingButtonsVisibility() {
        const hiddenScreens = ['exam-screen', 'results-screen', 'certificate-screen', 
                              'admin-panel-screen', 'question-bank-screen'];
        
        if (hiddenScreens.includes(currentScreen)) {
            document.querySelector('.floating-buttons').style.display = 'none';
        } else {
            document.querySelector('.floating-buttons').style.display = 'flex';
        }
    }
    
    // Update visibility when screen changes
    const originalShowScreen = showScreen;
    showScreen = function(screenId) {
        originalShowScreen(screenId);
        updateFloatingButtonsVisibility();
    };
    
    // Initialize
    updateFloatingButtonsVisibility();
    
    // Play opening audio only once
    openingAudio.volume = 0.5;
    openingAudio.play().catch(e => console.log('Autoplay prevented:', e));
});
