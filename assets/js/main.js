document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const loginCode = document.getElementById('loginCode');
    const loginBtn = document.getElementById('loginBtn');
    const openingScreen = document.getElementById('openingScreen');
    const termsContainer = document.getElementById('termsContainer');
    const agreeTerms = document.getElementById('agreeTerms');
    const continueBtn = document.getElementById('continueBtn');
    const participantForm = document.getElementById('participantForm');
    const participantDataForm = document.getElementById('participantDataForm');
    const examSelection = document.getElementById('examSelection');
    const examInterface = document.getElementById('examInterface');
    const resultsContainer = document.getElementById('resultsContainer');
    const certificateContainer = document.getElementById('certificateContainer');
    const printCertificateBtn = document.getElementById('printCertificateBtn');
    const closeCertificateBtn = document.getElementById('closeCertificateBtn');
    const retakeExamBtn = document.getElementById('retakeExamBtn');
    const adminPanelBtn = document.getElementById('adminPanelBtn');
    const adminPanel = document.getElementById('adminPanel');
    const closeAdminPanel = document.getElementById('closeAdminPanel');
    const questionBankBtn = document.getElementById('questionBankBtn');
    const questionBank = document.getElementById('questionBank');
    const closeQuestionBank = document.getElementById('closeQuestionBank');
    const shareBtn = document.getElementById('shareBtn');
    const shareModal = document.getElementById('shareModal');
    const closeShareModal = document.getElementById('closeShareModal');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const greetingText = document.getElementById('greetingText');
    
    // Default codes
    const defaultCodes = {
        login: '12345',
        cpns: 'OPENLOCK-1945',
        questionBank: 'OPENLOCK-1926',
        admin: '65614222'
    };
    
    // Play opening audio
    const openingAudio = document.getElementById('openingAudio');
    openingAudio.play().catch(e => console.log('Autoplay prevented:', e));
    
    // Login functionality
    loginBtn.addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        if (loginCode.value === defaultCodes.login) {
            openingScreen.classList.add('hidden');
            termsContainer.classList.remove('hidden');
        } else {
            alert('Kode login salah. Silakan coba lagi.');
        }
    });
    
    // Terms agreement
    agreeTerms.addEventListener('change', function() {
        continueBtn.disabled = !this.checked;
    });
    
    continueBtn.addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        termsContainer.classList.add('hidden');
        participantForm.classList.remove('hidden');
    });
    
    // Participant form
    document.querySelectorAll('input[name="status"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'pelajar') {
                document.querySelectorAll('.student-fields').forEach(field => {
                    field.classList.remove('hidden');
                });
                document.querySelectorAll('.general-fields').forEach(field => {
                    field.classList.add('hidden');
                });
                document.querySelector('.student-options').classList.remove('hidden');
                document.querySelector('.general-options').classList.add('hidden');
            } else {
                document.querySelectorAll('.student-fields').forEach(field => {
                    field.classList.add('hidden');
                });
                document.querySelectorAll('.general-fields').forEach(field => {
                    field.classList.remove('hidden');
                });
                document.querySelector('.student-options').classList.add('hidden');
                document.querySelector('.general-options').classList.remove('hidden');
            }
        });
    });
    
    document.getElementById('generalPurpose').addEventListener('change', function() {
        if (this.value === 'cpns') {
            document.getElementById('cpnsLicenseContainer').classList.remove('hidden');
        } else {
            document.getElementById('cpnsLicenseContainer').classList.add('hidden');
        }
    });
    
    participantDataForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        // Validate form
        let isValid = true;
        const fullName = document.getElementById('fullName').value;
        const status = document.querySelector('input[name="status"]:checked').value;
        
        if (!fullName) {
            isValid = false;
            alert('Nama lengkap harus diisi');
            return;
        }
        
        if (status === 'pelajar') {
            const schoolName = document.getElementById('schoolName').value;
            const studentId = document.getElementById('studentId').value;
            
            if (!schoolName || !studentId) {
                isValid = false;
                alert('Data pelajar harus lengkap');
                return;
            }
        } else {
            const address = document.getElementById('address').value;
            const whatsapp = document.getElementById('whatsapp').value;
            const email = document.getElementById('email').value;
            const purpose = document.getElementById('generalPurpose').value;
            
            if (!address || !whatsapp || !email) {
                isValid = false;
                alert('Data umum harus lengkap');
                return;
            }
            
            if (purpose === 'cpns') {
                const cpnsLicense = document.getElementById('cpnsLicense').value;
                if (cpnsLicense !== defaultCodes.cpns) {
                    isValid = false;
                    alert('Kode lisensi CPNS/P3K salah');
                    return;
                }
            }
        }
        
        if (isValid) {
            participantForm.classList.add('hidden');
            examSelection.classList.remove('hidden');
            
            // Generate grade buttons based on school level
            if (status === 'pelajar') {
                const schoolLevel = document.getElementById('schoolLevel').value;
                const gradeButtons = document.getElementById('gradeButtons');
                gradeButtons.innerHTML = '';
                
                let grades = [];
                if (schoolLevel === 'sd') {
                    grades = ['Kelas IV', 'Kelas V', 'Kelas VI'];
                } else if (schoolLevel === 'smp') {
                    grades = ['Kelas VII', 'Kelas VIII', 'Kelas IX'];
                } else {
                    grades = ['Kelas X', 'Kelas XI', 'Kelas XII'];
                }
                
                grades.forEach(grade => {
                    const btn = document.createElement('button');
                    btn.className = 'btn-subject';
                    btn.textContent = grade;
                    btn.dataset.grade = grade.toLowerCase().replace(' ', '-');
                    btn.addEventListener('click', function() {
                        document.querySelectorAll('.grade-buttons button').forEach(b => {
                            b.classList.remove('active');
                        });
                        this.classList.add('active');
                        checkExamReady();
                    });
                    gradeButtons.appendChild(btn);
                });
            }
        }
    });
    
    // Subject selection
    document.querySelectorAll('.btn-subject').forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonAudio = document.getElementById('buttonAudio');
            buttonAudio.play();
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                document.querySelectorAll('.subject-buttons button, .test-buttons button').forEach(b => {
                    if (b !== this) b.classList.remove('active');
                });
                this.classList.add('active');
            }
            
            checkExamReady();
        });
    });
    
    function checkExamReady() {
        const status = document.querySelector('input[name="status"]:checked').value;
        let isReady = false;
        
        if (status === 'pelajar') {
            const gradeSelected = document.querySelector('.grade-buttons button.active');
            const subjectSelected = document.querySelector('.subject-buttons button.active');
            isReady = gradeSelected && subjectSelected;
        } else {
            const testSelected = document.querySelector('.test-buttons button.active');
            isReady = testSelected;
        }
        
        const startExamBtn = document.getElementById('startExamBtn');
        if (isReady) {
            startExamBtn.classList.remove('hidden');
        } else {
            startExamBtn.classList.add('hidden');
        }
    }
    
    // Start exam
    document.getElementById('startExamBtn').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        examSelection.classList.add('hidden');
        examInterface.classList.remove('hidden');
        
        // Initialize exam
        startExam();
    });
    
    // Exam functionality
    function startExam() {
        // This would be replaced with actual exam logic
        // For now, we'll just show a sample question
        const questionText = document.getElementById('questionText');
        const optionsContainer = document.getElementById('optionsContainer');
        
        questionText.textContent = "Ini adalah contoh pertanyaan ujian. Manakah jawaban yang benar?";
        
        optionsContainer.innerHTML = '';
        const options = ['Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D'];
        
        options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option}</span>
            `;
            
            optionBtn.addEventListener('click', function() {
                const correctAudio = document.getElementById('correctAudio');
                const wrongAudio = document.getElementById('wrongAudio');
                
                // For demo, let's say option B is correct
                if (index === 1) {
                    optionBtn.classList.add('correct');
                    correctAudio.play();
                } else {
                    optionBtn.classList.add('wrong');
                    wrongAudio.play();
                }
                
                // Lock all options
                document.querySelectorAll('.option-btn').forEach(btn => {
                    btn.classList.add('locked');
                });
                
                // Show explanation
                const explanationContainer = document.getElementById('explanationContainer');
                const explanationText = document.getElementById('explanationText');
                explanationText.textContent = "Ini adalah penjelasan untuk jawaban yang benar. Pilihan B adalah jawaban yang tepat karena...";
                explanationContainer.classList.remove('hidden');
            });
            
            optionsContainer.appendChild(optionBtn);
        });
        
        // Start timer
        startTimer(120); // 120 minutes for demo
    }
    
    // Timer functionality
    function startTimer(minutes) {
        let time = minutes * 60;
        const timerElement = document.getElementById('examTimer');
        const progressBar = document.getElementById('progressBar');
        const timeWarning = document.getElementById('timeWarning');
        
        const timer = setInterval(function() {
            const mins = Math.floor(time / 60);
            let secs = time % 60;
            secs = secs < 10 ? '0' + secs : secs;
            
            timerElement.textContent = `${mins}:${secs}`;
            
            // Update progress bar
            const percentage = (time / (minutes * 60)) * 100;
            progressBar.style.width = `${percentage}%`;
            
            // Change color when time is running out
            if (time <= 600) { // 10 minutes left
                timerElement.style.color = '#e74c3c';
                timerElement.style.fontSize = '24px';
                
                if (time > 60) { // Between 10 and 1 minute
                    timeWarning.classList.remove('hidden');
                } else {
                    timeWarning.classList.add('hidden');
                }
            }
            
            if (time <= 0) {
                clearInterval(timer);
                finishExam();
            }
            
            time--;
        }, 1000);
    }
    
    // Finish exam
    document.getElementById('finishExamBtn').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        if (confirm('Apakah Anda yakin ingin menyelesaikan ujian sekarang?')) {
            finishExam();
        }
    });
    
    function finishExam() {
        examInterface.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        
        // For demo, set some random results
        document.getElementById('totalQuestions').textContent = '10';
        document.getElementById('correctAnswers').textContent = '7';
        document.getElementById('wrongAnswers').textContent = '3';
        document.getElementById('finalScore').textContent = '70';
        
        // Set motivational message based on score
        const motivationText = document.getElementById('motivationText');
        motivationText.textContent = "Kerja bagus! Anda memiliki pemahaman yang baik tentang materi ini.";
    }
    
    // Certificate functionality
    printCertificateBtn.addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        resultsContainer.classList.add('hidden');
        certificateContainer.classList.remove('hidden');
        
        // Play applause sound
        const applauseAudio = document.getElementById('applauseAudio');
        applauseAudio.play();
        
        // Generate certificate data
        const fullName = document.getElementById('fullName').value;
        const status = document.querySelector('input[name="status"]:checked').value;
        const subject = document.querySelector('.subject-buttons button.active, .test-buttons button.active').dataset.subject;
        const score = document.getElementById('finalScore').textContent;
        
        // Set certificate content
        document.getElementById('certificateName').textContent = fullName;
        document.getElementById('certificateScore').textContent = score;
        
        // Generate certificate code
        const now = new Date();
        const dateStr = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + 
                          Math.random().toString(36).substring(2, 6).toUpperCase();
        
        let level = '';
        if (status === 'pelajar') {
            const schoolLevel = document.getElementById('schoolLevel').value;
            level = schoolLevel.toUpperCase();
        } else {
            level = 'UMUM';
        }
        
        const certificateCode = `${fullName.toUpperCase().replace(/ /g, '')}/${status.toUpperCase()}/${level}/${subject.toUpperCase()}/${dateStr}/${randomCode}/PERGUNU-STB`;
        document.getElementById('certificateCode').textContent = certificateCode;
        
        // Set date
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        document.getElementById('certificateDate').textContent = now.toLocaleDateString('id-ID', options);
    });
    
    closeCertificateBtn.addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        certificateContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
    });
    
    retakeExamBtn.addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        resultsContainer.classList.add('hidden');
        examSelection.classList.remove('hidden');
    });
    
    // Floating buttons functionality
// Fungsi inisialisasi tombol melayang
function initFloatingButtons() {
  const floatingBtns = [
    {
      id: 'shareBtn',
      icon: 'fas fa-share-alt',
      tooltip: 'Bagikan Aplikasi',
      action: () => {
        document.getElementById('shareModal').classList.remove('hidden');
        playButtonSound();
      }
    },
    {
      id: 'whatsappBtn',
      icon: 'fab fa-whatsapp',
      tooltip: 'Chat WhatsApp Admin',
      action: () => {
        const message = "Assalamualaikum admin, saya mau tanya...";
        window.open(`https://wa.me/6285647709114?text=${encodeURIComponent(message)}`, '_blank');
        playButtonSound();
      }
    },
    {
      id: 'questionBankBtn',
      icon: 'fas fa-book',
      tooltip: 'Bank Soal',
      action: () => {
        const code = prompt("Masukkan kode bank soal:");
        if (code === "OPENLOCK-1926") {
          document.getElementById('questionBank').classList.remove('hidden');
          playButtonSound();
        } else {
          alert("Kode bank soal salah!");
        }
      }
    },
    {
      id: 'adminPanelBtn',
      icon: 'fas fa-cog',
      tooltip: 'Panel Admin',
      action: () => {
        const code = prompt("Masukkan kode admin:");
        if (code === "65614222") {
          document.getElementById('adminPanel').classList.remove('hidden');
          playButtonSound();
        } else {
          alert("Kode admin salah!");
        }
      }
    }
  ];

  const container = document.querySelector('.floating-buttons');
  container.innerHTML = '';

  floatingBtns.forEach(btn => {
    const button = document.createElement('button');
    button.className = 'float-btn';
    button.id = btn.id;
    button.setAttribute('data-tooltip', btn.tooltip);
    button.innerHTML = `<i class="${btn.icon}"></i>`;
    button.addEventListener('click', btn.action);
    container.appendChild(button);
  });
}

// Panggil fungsi inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  initFloatingButtons();
  playButtonSound(); // Untuk testing
});

// Fungsi suara tombol
function playButtonSound() {
  const audio = new Audio('assets/audio/audiotombol.mp3');
  audio.play().catch(e => console.log("Autoplay prevented:", e));
}
    
    adminPanelBtn.addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const code = prompt('Masukkan kode admin:');
        if (code === defaultCodes.admin) {
            adminPanel.classList.remove('hidden');
        } else {
            alert('Kode admin salah');
        }
    });
    
    questionBankBtn.addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const code = prompt('Masukkan kode bank soal:');
        if (code === defaultCodes.questionBank) {
            questionBank.classList.remove('hidden');
        } else {
            alert('Kode bank soal salah');
        }
    });
    
    shareBtn.addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        shareModal.classList.remove('hidden');
        
        // Populate social links
        const socialLinks = document.getElementById('socialLinks');
        socialLinks.innerHTML = '';
        
        const platforms = [
            { name: 'Facebook', icon: 'fab fa-facebook-f', color: '#3b5998' },
            { name: 'Twitter', icon: 'fab fa-twitter', color: '#1da1f2' },
            { name: 'WhatsApp', icon: 'fab fa-whatsapp', color: '#25d366' },
            { name: 'Telegram', icon: 'fab fa-telegram-plane', color: '#0088cc' },
            { name: 'Email', icon: 'fas fa-envelope', color: '#dd4b39' }
        ];
        
        platforms.forEach(platform => {
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'social-link';
            link.innerHTML = `<i class="${platform.icon}"></i>`;
            link.style.background = platform.color;
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert(`Berbagi ke ${platform.name}`);
            });
            socialLinks.appendChild(link);
        });
    });
    
    whatsappBtn.addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const message = "Assalamualaikum mas admin, saya mau tanya sesuatu nih...";
        const url = `https://wa.me/6285647709114?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
    
    closeShareModal.addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        shareModal.classList.add('hidden');
    });
    
    closeAdminPanel.addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        adminPanel.classList.add('hidden');
    });
    
    closeQuestionBank.addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        questionBank.classList.add('hidden');
    });
    
    // Copy link functionality
    document.getElementById('copyLinkBtn').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const linkInput = document.getElementById('shareableLink');
        linkInput.select();
        document.execCommand('copy');
        
        alert('Link berhasil disalin');
    });
    
    // Tab functionality for admin panel
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Deactivate all tab buttons
            document.querySelectorAll('.tab-btn').forEach(tabBtn => {
                tabBtn.classList.remove('active');
            });
            
            // Activate current tab
            document.getElementById(tabId).classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Tab functionality for question bank
    document.querySelectorAll('.bank-tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.bankTab;
            
            // Hide all tab contents
            document.querySelectorAll('.bank-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Deactivate all tab buttons
            document.querySelectorAll('.bank-tab-btn').forEach(tabBtn => {
                tabBtn.classList.remove('active');
            });
            
            // Activate current tab
            document.getElementById(tabId).classList.add('active');
            this.classList.add('active');
        });
    });
    
    // Get GPS location
    document.getElementById('getLocationBtn').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const locationStatus = document.getElementById('locationStatus');
        locationStatus.textContent = "Mendapatkan lokasi...";
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    document.getElementById('address').value = `Lat: ${lat}, Lng: ${lng}`;
                    locationStatus.textContent = "Lokasi berhasil didapatkan";
                },
                function(error) {
                    let message = "Gagal mendapatkan lokasi: ";
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            message += "Izin ditolak oleh pengguna";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            message += "Informasi lokasi tidak tersedia";
                            break;
                        case error.TIMEOUT:
                            message += "Permintaan lokasi timeout";
                            break;
                        case error.UNKNOWN_ERROR:
                            message += "Error tidak diketahui";
                            break;
                    }
                    locationStatus.textContent = message;
                }
            );
        } else {
            locationStatus.textContent = "Geolocation tidak didukung oleh browser ini";
        }
    });
    
    // Admin panel functionality
    document.getElementById('saveLoginCode').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const newCode = document.getElementById('newLoginCode').value;
        if (newCode) {
            defaultCodes.login = newCode;
            document.getElementById('currentLoginCode').value = newCode;
            document.getElementById('newLoginCode').value = '';
            alert('Kode login berhasil diubah');
        } else {
            alert('Masukkan kode baru');
        }
    });
    
    document.getElementById('saveCPNSCode').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const newCode = document.getElementById('newCPNSCode').value;
        if (newCode) {
            defaultCodes.cpns = newCode;
            document.getElementById('currentCPNSCode').value = newCode;
            document.getElementById('newCPNSCode').value = '';
            alert('Kode CPNS berhasil diubah');
        } else {
            alert('Masukkan kode baru');
        }
    });
    
    document.getElementById('saveQuestionCode').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const newCode = document.getElementById('newQuestionCode').value;
        if (newCode) {
            defaultCodes.questionBank = newCode;
            document.getElementById('currentQuestionCode').value = newCode;
            document.getElementById('newQuestionCode').value = '';
            alert('Kode bank soal berhasil diubah');
        } else {
            alert('Masukkan kode baru');
        }
    });
    
    document.getElementById('saveAdminCode').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const newCode = document.getElementById('newAdminCode').value;
        if (newCode) {
            defaultCodes.admin = newCode;
            document.getElementById('currentAdminCode').value = newCode;
            document.getElementById('newAdminCode').value = '';
            alert('Kode admin berhasil diubah');
        } else {
            alert('Masukkan kode baru');
        }
    });
    
    // Save text settings
    document.getElementById('saveTextSettings').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const greetingMessage = document.getElementById('greetingMessage').value;
        const infoBannerText = document.getElementById('infoBannerText').value;
        const chairmanName = document.getElementById('chairmanNameSetting').value;
        
        greetingText.textContent = greetingMessage;
        document.getElementById('infoBanner').textContent = infoBannerText;
        document.getElementById('chairmanName').textContent = chairmanName;
        
        alert('Pengaturan teks berhasil disimpan');
    });
    
    // Save exam settings
    document.getElementById('saveExamSettings').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        alert('Pengaturan ujian berhasil disimpan');
    });
    
    // Question bank functionality
    document.getElementById('saveQuestionBtn').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        // Validate question
        const questionText = document.getElementById('questionText').value;
        const optionA = document.getElementById('optionA').value;
        const optionB = document.getElementById('optionB').value;
        const optionC = document.getElementById('optionC').value;
        const optionD = document.getElementById('optionD').value;
        const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked');
        
        if (!questionText || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
            alert('Harap isi semua field pertanyaan dan pilihan jawaban');
            return;
        }
        
        // In a real app, you would save this to a database
        alert('Soal berhasil disimpan');
        
        // Reset form
        document.getElementById('questionText').value = '';
        document.getElementById('optionA').value = '';
        document.getElementById('optionB').value = '';
        document.getElementById('optionC').value = '';
        document.getElementById('optionD').value = '';
        document.getElementById('optionE').value = '';
        document.getElementById('explanation').value = '';
        document.getElementById('questionImage').value = '';
        document.querySelector('input[name="correctAnswer"]').checked = false;
    });
    
    document.getElementById('resetQuestionBtn').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        if (confirm('Apakah Anda yakin ingin mereset form?')) {
            document.getElementById('questionText').value = '';
            document.getElementById('optionA').value = '';
            document.getElementById('optionB').value = '';
            document.getElementById('optionC').value = '';
            document.getElementById('optionD').value = '';
            document.getElementById('optionE').value = '';
            document.getElementById('explanation').value = '';
            document.getElementById('questionImage').value = '';
            document.querySelector('input[name="correctAnswer"]').checked = false;
        }
    });
    
    // Generate questions with AI (mock functionality)
    document.getElementById('generateQuestionsBtn').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const subject = document.getElementById('aiSubject').value;
        const level = document.getElementById('aiLevel').value;
        const topic = document.getElementById('aiTopic').value;
        const count = document.getElementById('aiCount').value;
        const language = document.getElementById('aiLanguage').value;
        
        if (!topic) {
            alert('Harap masukkan topik untuk generate soal');
            return;
        }
        
        const aiResults = document.getElementById('aiResults');
        aiResults.innerHTML = '<p>Sedang generate soal... (simulasi)</p>';
        
        // Simulate AI generation with timeout
        setTimeout(function() {
            aiResults.innerHTML = `
                <div class="ai-question">
                    <h5>1. Contoh soal tentang ${topic} (${subject}, ${level})</h5>
                    <div class="ai-options">
                        <p class="ai-option">A. Pilihan pertama</p>
                        <p class="ai-option correct">B. Pilihan kedua (benar)</p>
                        <p class="ai-option">C. Pilihan ketiga</p>
                        <p class="ai-option">D. Pilihan keempat</p>
                    </div>
                    <div class="ai-explanation">
                        <p>Penjelasan: Ini adalah penjelasan mengapa pilihan B adalah jawaban yang benar.</p>
                    </div>
                </div>
                <button class="btn-small" style="margin-top: 10px;">Tambah ke Bank Soal</button>
            `;
        }, 1500);
    });
    
    // Load sample questions for review
    document.getElementById('loadQuestionsBtn').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const subject = document.getElementById('reviewSubject').value;
        const reviewContainer = document.getElementById('reviewContainer');
        
        reviewContainer.innerHTML = `
            <div class="review-question">
                <h4>1. Contoh soal ${subject} (Mudah)</h4>
                <div class="review-options">
                    <p class="review-option">A. Pilihan pertama</p>
                    <p class="review-option correct">B. Pilihan kedua (benar)</p>
                    <p class="review-option">C. Pilihan ketiga</p>
                    <p class="review-option">D. Pilihan keempat</p>
                </div>
                <div class="review-explanation">
                    <p>Penjelasan: Ini adalah penjelasan mengapa pilihan B adalah jawaban yang benar.</p>
                </div>
                <div class="question-actions">
                    <button class="btn-small">Edit</button>
                    <button class="btn-small">Hapus</button>
                </div>
            </div>
            <div class="review-question">
                <h4>2. Contoh soal ${subject} kedua (Sedang)</h4>
                <div class="review-options">
                    <p class="review-option">A. Pilihan pertama</p>
                    <p class="review-option">B. Pilihan kedua</p>
                    <p class="review-option correct">C. Pilihan ketiga (benar)</p>
                    <p class="review-option">D. Pilihan keempat</p>
                </div>
                <div class="review-explanation">
                    <p>Penjelasan: Ini adalah penjelasan mengapa pilihan C adalah jawaban yang benar.</p>
                </div>
                <div class="question-actions">
                    <button class="btn-small">Edit</button>
                    <button class="btn-small">Hapus</button>
                </div>
            </div>
        `;
    });
    
    // Export questions to Excel (mock functionality)
    document.getElementById('exportQuestionsBtn').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        alert('Fungsi export ke Excel akan mengunduh file berisi semua soal');
    });
    
    // Search questions (mock functionality)
    document.getElementById('searchBtn').addEventListener('click', function() {
        const buttonAudio = document.getElementById('buttonAudio');
        buttonAudio.play();
        
        const searchTerm = document.getElementById('searchQuestion').value;
        const subject = document.getElementById('filterSubject').value;
        const questionList = document.getElementById('questionList');
        
        if (!searchTerm && subject === 'all') {
            alert('Masukkan kata kunci pencarian atau pilih mata pelajaran');
            return;
        }
        
        questionList.innerHTML = `
            <div class="question-item">
                <h4><span class="subject-badge">${subject === 'all' ? 'AGAMA' : subject.toUpperCase()}</span> 
                <span class="level-badge">Mudah</span> Hasil pencarian untuk "${searchTerm}"</h4>
                <p>Ini adalah contoh soal yang ditemukan berdasarkan pencarian Anda.</p>
                <p>Pertanyaan: Contoh pertanyaan tentang ${subject === 'all' ? 'agama' : subject}?</p>
                <div class="question-actions">
                    <button class="btn-small">Edit</button>
                    <button class="btn-small">Hapus</button>
                    <button class="btn-small">Preview</button>
                </div>
            </div>
        `;
    });
});
