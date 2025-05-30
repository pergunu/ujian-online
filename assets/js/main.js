// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {
        console.log('Particles.js loaded');
    });
    
    // Audio elements
    const openingAudio = document.getElementById('opening-audio');
    const correctAudio = document.getElementById('correct-audio');
    const wrongAudio = document.getElementById('wrong-audio');
    const buttonAudio = document.getElementById('button-audio');
    const applauseAudio = document.getElementById('applause-audio');
    
    // Play opening audio once
    openingAudio.play().catch(e => console.log('Autoplay prevented:', e));
    
    // Login screen
    const loginBtn = document.getElementById('login-btn');
    const loginCode = document.getElementById('login-code');
    const openingScreen = document.querySelector('.opening-screen');
    const termsScreen = document.querySelector('.terms-container');
    
    // Default login code
    const DEFAULT_LOGIN_CODE = '12345';
    
    loginBtn.addEventListener('click', function() {
        playButtonSound();
        
        if (loginCode.value === DEFAULT_LOGIN_CODE) {
            // Hide opening screen with animation
            openingScreen.classList.add('animate__animated', 'animate__fadeOut');
            
            // Show terms screen after animation completes
            setTimeout(() => {
                openingScreen.classList.add('hidden');
                termsScreen.classList.remove('hidden');
                termsScreen.classList.add('animate__animated', 'animate__fadeIn');
            }, 500);
        } else {
            alert('Kode login tidak valid!');
        }
    });
    
    // Terms and conditions
    const agreeTerms = document.getElementById('agree-terms');
    const continueBtn = document.getElementById('continue-btn');
    const participantForm = document.querySelector('.participant-form');
    
    agreeTerms.addEventListener('change', function() {
        continueBtn.disabled = !this.checked;
    });
    
    continueBtn.addEventListener('click', function() {
        playButtonSound();
        
        // Hide terms screen with animation
        termsScreen.classList.add('animate__animated', 'animate__fadeOut');
        
        // Show participant form after animation completes
        setTimeout(() => {
            termsScreen.classList.add('hidden');
            participantForm.classList.remove('hidden');
            participantForm.classList.add('animate__animated', 'animate__fadeIn');
        }, 500);
    });
    
    // Participant form
    const participantDataForm = document.getElementById('participant-data');
    const studentRadio = document.getElementById('student');
    const generalRadio = document.getElementById('general');
    const studentFields = document.querySelectorAll('.student-fields');
    const generalFields = document.querySelectorAll('.general-fields');
    const levelSelection = document.querySelector('.level-selection');
    
    // Toggle between student and general fields
    studentRadio.addEventListener('change', toggleFields);
    generalRadio.addEventListener('change', toggleFields);
    
    function toggleFields() {
        if (studentRadio.checked) {
            studentFields.forEach(field => field.classList.remove('hidden'));
            generalFields.forEach(field => field.classList.add('hidden'));
        } else {
            studentFields.forEach(field => field.classList.add('hidden'));
            generalFields.forEach(field => field.classList.remove('hidden'));
        }
    }
    
    // Get location button
    const getLocationBtn = document.getElementById('get-location');
    const addressInput = document.getElementById('address');
    
    getLocationBtn.addEventListener('click', function() {
        playButtonSound();
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async function(position) {
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
                        const data = await response.json();
                        
                        if (data.display_name) {
                            addressInput.value = data.display_name;
                        } else {
                            addressInput.value = 'Lokasi tidak dapat ditentukan';
                        }
                    } catch (error) {
                        console.error('Error fetching location:', error);
                        addressInput.value = 'Gagal mendapatkan alamat';
                    }
                },
                function(error) {
                    console.error('Geolocation error:', error);
                    alert('Tidak dapat mengakses lokasi. Silakan isi alamat secara manual.');
                }
            );
        } else {
            alert('Browser tidak mendukung geolocation. Silakan isi alamat secara manual.');
        }
    });
    
    // Form submission
    participantDataForm.addEventListener('submit', function(e) {
        e.preventDefault();
        playButtonSound();
        
        // Validate form
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'red';
                
                setTimeout(() => {
                    field.style.borderColor = '';
                }, 2000);
            }
        });
        
        if (!isValid) {
            alert('Harap isi semua field yang wajib diisi!');
            return;
        }
        
        // Hide participant form with animation
        participantForm.classList.add('animate__animated', 'animate__fadeOut');
        
        // Show level selection after animation completes
        setTimeout(() => {
            participantForm.classList.add('hidden');
            levelSelection.classList.remove('hidden');
            levelSelection.classList.add('animate__animated', 'animate__fadeIn');
            
            // Generate class levels based on school level
            const schoolLevel = document.getElementById('school-level').value;
            generateClassLevels(schoolLevel);
        }, 500);
    });
    
    // Generate class levels buttons
    function generateClassLevels(level) {
        const classLevelsContainer = document.getElementById('class-levels');
        classLevelsContainer.innerHTML = '';
        
        let classes = [];
        
        if (level === 'SD') {
            classes = ['Kelas IV', 'Kelas V', 'Kelas VI'];
        } else if (level === 'SMP') {
            classes = ['Kelas VII', 'Kelas VIII', 'Kelas IX'];
        } else if (level === 'SMA') {
            classes = ['Kelas X', 'Kelas XI', 'Kelas XII'];
        }
        
        classes.forEach(cls => {
            const btn = document.createElement('button');
            btn.className = 'level-btn';
            btn.textContent = cls;
            btn.addEventListener('click', function() {
                playButtonSound();
                document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
            classLevelsContainer.appendChild(btn);
        });
    }
    
    // CPNS license verification
    const cpnsLicenseForm = document.getElementById('cpns-license');
    const verifyLicenseBtn = document.getElementById('verify-license');
    const licenseCodeInput = document.getElementById('license-code');
    const errorMessage = document.querySelector('.error-message');
    const DEFAULT_CPNS_CODE = 'OPENLOCK-1945';
    
    // Show license form when CPNS is selected
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            
            if (this.dataset.subject === 'cpns') {
                cpnsLicenseForm.classList.remove('hidden');
            } else {
                cpnsLicenseForm.classList.add('hidden');
                errorMessage.classList.add('hidden');
            }
            
            document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    verifyLicenseBtn.addEventListener('click', function() {
        playButtonSound();
        
        if (licenseCodeInput.value === DEFAULT_CPNS_CODE) {
            errorMessage.classList.add('hidden');
            alert('Kode lisensi valid! Anda dapat melanjutkan ujian.');
        } else {
            errorMessage.classList.remove('hidden');
        }
    });
    
    // Play button sound
    function playButtonSound() {
        buttonAudio.currentTime = 0;
        buttonAudio.play().catch(e => console.log('Audio play prevented:', e));
    }
    
    // Initialize floating buttons
    initFloatingButtons();
    
    // Initialize admin panel
    initAdminPanel();
});

// Initialize floating buttons
function initFloatingButtons() {
    // Share button dropdown
    const shareBtn = document.querySelector('.share-btn');
    const shareDropdown = document.querySelector('.share-dropdown');
    
    shareBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        shareDropdown.classList.toggle('hidden');
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function() {
        shareDropdown.classList.add('hidden');
    });
    
    // Share options
    document.querySelectorAll('.share-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const social = this.dataset.social;
            const url = window.location.href;
            let shareUrl = '';
            
            switch(social) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this website: ${url}`)}`;
                    break;
                case 'telegram':
                    shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}`;
                    break;
                case 'link':
                    navigator.clipboard.writeText(url).then(() => {
                        alert('Link copied to clipboard!');
                    });
                    return;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
    
    // Admin panel button
    const adminBtn = document.querySelector('.admin-btn');
    const adminPanel = document.querySelector('.admin-panel');
    const DEFAULT_ADMIN_CODE = '65614222';
    
    adminBtn.addEventListener('click', function() {
        const code = prompt('Masukkan kode admin:', '');
        
        if (code === DEFAULT_ADMIN_CODE) {
            adminPanel.classList.remove('hidden');
        } else if (code !== null) {
            alert('Kode admin tidak valid!');
        }
    });
    
    // Close admin panel
    const closeAdminBtn = document.getElementById('close-admin');
    
    closeAdminBtn.addEventListener('click', function() {
        adminPanel.classList.add('hidden');
    });
    
    // Question bank button
    const questionBankBtn = document.querySelector('.question-bank-btn');
    const DEFAULT_BANK_CODE = 'OPENLOCK-1926';
    
    questionBankBtn.addEventListener('click', function() {
        const code = prompt('Masukkan kode bank soal:', '');
        
        if (code === DEFAULT_BANK_CODE) {
            // Show questions tab in admin panel
            adminPanel.classList.remove('hidden');
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            document.querySelector('[data-tab="questions"]').classList.add('active');
            document.getElementById('questions-tab').classList.add('active');
        } else if (code !== null) {
            alert('Kode bank soal tidak valid!');
        }
    });
}

// Initialize admin panel functionality
function initAdminPanel() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${this.dataset.tab}-tab`).classList.add('active');
        });
    });
    
    // Code saving functionality
    document.getElementById('save-login-code').addEventListener('click', saveCode);
    document.getElementById('save-cpns-code').addEventListener('click', saveCode);
    document.getElementById('save-bank-code').addEventListener('click', saveCode);
    document.getElementById('save-admin-code').addEventListener('click', saveCode);
    
    function saveCode() {
        alert('Kode berhasil disimpan!');
        // In a real implementation, you would save this to localStorage or a database
    }
    
    // Question bank functionality
    const questionCategory = document.getElementById('question-category');
    const questionSubject = document.getElementById('question-subject');
    const addQuestionBtn = document.getElementById('add-question');
    const questionForm = document.getElementById('question-form');
    
    // Update subject options based on category
    questionCategory.addEventListener('change', function() {
        questionSubject.disabled = !this.value;
        
        if (this.value) {
            questionSubject.innerHTML = '<option value="">Pilih Jenis Ujian</option>';
            
            const subjects = this.value === 'pelajar' ? 
                ['AGAMA', 'PPKN', 'SEJARAH', 'IPA', 'IPS', 'MATEMATIKA', 'BAHASA INDONESIA', 'BAHASA INGGRIS', 'MATERI EXTRA', 'MATERI KHUSUS'] :
                ['Ujian Logika', 'Ujian CPNS/P3K'];
            
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.toLowerCase().replace(/ /g, '-');
                option.textContent = subject;
                questionSubject.appendChild(option);
            });
        }
    });
    
    // Show question form
    addQuestionBtn.addEventListener('click', function() {
        if (!questionCategory.value || !questionSubject.value) {
            alert('Pilih kategori dan jenis ujian terlebih dahulu!');
            return;
        }
        
        questionForm.classList.remove('hidden');
    });
    
    // Cancel question form
    document.getElementById('cancel-question').addEventListener('click', function() {
        questionForm.classList.add('hidden');
    });
    
    // Save question
    document.getElementById('save-question').addEventListener('click', function() {
        // Validate form
        const questionText = document.getElementById('question-text-editor').value.trim();
        const options = Array.from(document.querySelectorAll('.option')).map(opt => opt.value.trim());
        const correctAnswer = document.getElementById('correct-answer').value;
        const explanation = document.getElementById('explanation-text').value.trim();
        
        if (!questionText || options.some(opt => !opt) || !correctAnswer) {
            alert('Harap isi semua field yang diperlukan!');
            return;
        }
        
        // In a real implementation, you would save the question to your database
        alert('Soal berhasil disimpan!');
        questionForm.classList.add('hidden');
        
        // Add to questions list
        addQuestionToList({
            category: questionCategory.value,
            subject: questionSubject.value,
            question: questionText,
            options: options,
            correctAnswer: correctAnswer,
            explanation: explanation
        });
    });
    
    // AI generate question
    document.getElementById('ai-generate').addEventListener('click', function() {
        const apiKeySection = document.getElementById('ai-key-section');
        apiKeySection.classList.toggle('hidden');
        
        if (!apiKeySection.classList.contains('hidden')) {
            alert('Masukkan API Key AI Anda untuk menghasilkan soal secara otomatis.');
        }
    });
    
    // Add sample questions to list
    function addQuestionToList(questionData) {
        const questionsList = document.getElementById('questions-list');
        
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        
        questionItem.innerHTML = `
            <h4>${questionData.question}</h4>
            <div class="options">
                ${questionData.options.map((opt, i) => 
                    `<p class="${String.fromCharCode(97 + i) === questionData.correctAnswer ? 'correct-option' : ''}">
                        ${String.fromCharCode(65 + i)}. ${opt}
                    </p>`
                ).join('')}
            </div>
            <div class="explanation">
                <strong>Penjelasan:</strong> ${questionData.explanation || 'Tidak ada penjelasan'}
            </div>
            <div class="actions">
                <button class="btn-small">Edit</button>
                <button class="btn-small">Hapus</button>
            </div>
        `;
        
        questionsList.appendChild(questionItem);
    }
    
    // Add sample questions
    const sampleQuestions = [
        {
            category: 'pelajar',
            subject: 'matematika',
            question: 'Berapakah hasil dari 2 + 2?',
            options: ['3', '4', '5', '6', '7'],
            correctAnswer: 'b',
            explanation: 'Penjumlahan dasar 2 + 2 adalah 4'
        },
        {
            category: 'umum',
            subject: 'ujian-logika',
            question: 'Jika semua manusia adalah makhluk hidup, dan Socrates adalah manusia, maka:',
            options: [
                'Socrates adalah makhluk hidup',
                'Socrates adalah binatang',
                'Socrates adalah tumbuhan',
                'Socrates bukan makhluk hidup',
                'Tidak dapat disimpulkan'
            ],
            correctAnswer: 'a',
            explanation: 'Ini adalah contoh silogisme dasar dalam logika'
        }
    ];
    
    sampleQuestions.forEach(q => addQuestionToList(q));
    
    // Settings save
    document.getElementById('save-settings').addEventListener('click', function() {
        alert('Pengaturan berhasil disimpan!');
    });
    
    // Texts save
    document.getElementById('save-texts').addEventListener('click', function() {
        alert('Teks berhasil disimpan!');
    });
    
    // Export buttons
    document.getElementById('export-excel').addEventListener('click', function() {
        alert('Data peserta akan diekspor ke Excel');
    });
    
    document.getElementById('export-word').addEventListener('click', function() {
        alert('Data peserta akan diekspor ke Word');
    });
    
    document.getElementById('export-pdf').addEventListener('click', function() {
        alert('Data peserta akan diekspor ke PDF');
    });
}
