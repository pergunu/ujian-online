// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS.load('particles-js', 'assets/js/particles-config.json', function() {
        console.log('Particles.js loaded');
    });

    // Play opening audio
    const openingAudio = document.getElementById('opening-audio');
    openingAudio.play().catch(e => console.log('Autoplay prevented:', e));

    // Login Screen
    const loginBtn = document.getElementById('login-btn');
    const loginCode = document.getElementById('login-code');
    const openingScreen = document.querySelector('.opening-screen');
    const termsContainer = document.querySelector('.terms-container');

    loginBtn.addEventListener('click', function() {
        playButtonSound();
        if (loginCode.value === '12345') {
            openingScreen.classList.add('animate__fadeOut');
            setTimeout(() => {
                openingScreen.classList.add('hidden');
                termsContainer.classList.remove('hidden');
                termsContainer.classList.add('animate__fadeIn');
            }, 500);
        } else {
            alert('Kode login salah! Silakan coba lagi.');
        }
    });

    // Terms Agreement
    const agreeTerms = document.getElementById('agree-terms');
    const continueBtn = document.getElementById('continue-btn');
    const participantForm = document.querySelector('.participant-form');

    agreeTerms.addEventListener('change', function() {
        continueBtn.disabled = !this.checked;
    });

    continueBtn.addEventListener('click', function() {
        playButtonSound();
        termsContainer.classList.add('animate__fadeOut');
        setTimeout(() => {
            termsContainer.classList.add('hidden');
            participantForm.classList.remove('hidden');
            participantForm.classList.add('animate__fadeIn');
        }, 500);
    });

    // Participant Form
    const participantDataForm = document.getElementById('participant-data');
    const studentRadio = document.getElementById('student');
    const generalRadio = document.getElementById('general');
    const studentFields = document.querySelectorAll('.student-fields');
    const generalFields = document.querySelectorAll('.general-fields');
    const generalPurpose = document.getElementById('general-purpose');
    const cpnsLicenseGroup = document.getElementById('cpns-license-group');
    const examSelection = document.querySelector('.exam-selection');
    const studentOptions = document.querySelector('.student-options');
    const generalOptions = document.querySelector('.general-options');
    const startExamBtn = document.getElementById('start-exam-btn');

    // Toggle between student and general fields
    studentRadio.addEventListener('change', function() {
        if (this.checked) {
            studentFields.forEach(field => field.classList.remove('hidden'));
            generalFields.forEach(field => field.classList.add('hidden'));
            cpnsLicenseGroup.classList.add('hidden'));
        }
    });

    generalRadio.addEventListener('change', function() {
        if (this.checked) {
            studentFields.forEach(field => field.classList.add('hidden'));
            generalFields.forEach(field => field.classList.remove('hidden'));
        }
    });

    // Show CPNS license field if CPNS option is selected
    generalPurpose.addEventListener('change', function() {
        if (this.value === 'ujian-cpns') {
            cpnsLicenseGroup.classList.remove('hidden'));
        } else {
            cpnsLicenseGroup.classList.add('hidden'));
        }
    });

    // Form submission
    participantDataForm.addEventListener('submit', function(e) {
        e.preventDefault();
        playButtonSound();
        
        // Validate CPNS license if applicable
        if (generalPurpose.value === 'ujian-cpns' && document.getElementById('cpns-license').value !== 'OPENLOCK-1945') {
            alert('Kode lisensi CPNS/P3K salah!');
            return;
        }
        
        // Save participant data (in a real app, this would be sent to a server)
        const participantData = {
            fullname: document.getElementById('fullname').value,
            status: document.querySelector('input[name="status"]:checked').value,
            purpose: document.querySelector('input[name="status"]:checked').value === 'pelajar' 
                    ? document.getElementById('student-purpose').value 
                    : document.getElementById('general-purpose').value,
            schoolLevel: document.querySelector('input[name="school-level"]:checked')?.value,
            grade: null, // Will be set when grade is selected
            subject: null // Will be set when subject is selected
        };
        
        localStorage.setItem('participantData', JSON.stringify(participantData));
        
        // Show exam selection based on participant type
        participantForm.classList.add('animate__fadeOut');
        setTimeout(() => {
            participantForm.classList.add('hidden');
            examSelection.classList.remove('hidden');
            examSelection.classList.add('animate__fadeIn');
            
            if (participantData.status === 'pelajar') {
                studentOptions.classList.remove('hidden');
                generalOptions.classList.add('hidden');
                
                // Show appropriate grade buttons based on school level
                document.querySelectorAll('.grade-option').forEach(option => option.classList.add('hidden'));
                if (participantData.schoolLevel === 'SD') {
                    document.querySelector('.sd-options').classList.remove('hidden');
                } else if (participantData.schoolLevel === 'SMP') {
                    document.querySelector('.smp-options').classList.remove('hidden');
                } else if (participantData.schoolLevel === 'SMA/SMK') {
                    document.querySelector('.sma-options').classList.remove('hidden');
                }
            } else {
                studentOptions.classList.add('hidden');
                generalOptions.classList.remove('hidden');
            }
        }, 500);
    });

    // Grade and subject selection
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            document.querySelectorAll('.grade-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update participant data with selected grade
            const participantData = JSON.parse(localStorage.getItem('participantData'));
            participantData.grade = this.dataset.grade;
            localStorage.setItem('participantData', JSON.stringify(participantData));
            
            checkExamReady();
        });
    });

    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update participant data with selected subject
            const participantData = JSON.parse(localStorage.getItem('participantData'));
            participantData.subject = this.dataset.subject;
            localStorage.setItem('participantData', JSON.stringify(participantData));
            
            checkExamReady();
        });
    });

    document.querySelectorAll('.exam-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            document.querySelectorAll('.exam-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update participant data with selected exam type
            const participantData = JSON.parse(localStorage.getItem('participantData'));
            participantData.examType = this.dataset.exam;
            localStorage.setItem('participantData', JSON.stringify(participantData));
            
            checkExamReady();
        });
    });

    function checkExamReady() {
        const participantData = JSON.parse(localStorage.getItem('participantData'));
        
        if (participantData.status === 'pelajar') {
            if (participantData.grade && participantData.subject) {
                startExamBtn.classList.remove('hidden');
            } else {
                startExamBtn.classList.add('hidden');
            }
        } else {
            if (participantData.examType) {
                startExamBtn.classList.remove('hidden');
            } else {
                startExamBtn.classList.add('hidden');
            }
        }
    }

    // Start exam button
    startExamBtn.addEventListener('click', function() {
        playButtonSound();
        const participantData = JSON.parse(localStorage.getItem('participantData'));
        
        // Initialize exam based on participant's choices
        initializeExam(participantData);
        
        examSelection.classList.add('animate__fadeOut');
        setTimeout(() => {
            examSelection.classList.add('hidden');
            document.querySelector('.exam-screen').classList.remove('hidden');
            startTimer(120); // 120 minutes timer
        }, 500);
    });

    // Floating buttons
    const floatingButtons = document.querySelector('.floating-buttons');
    const shareModal = document.getElementById('share-modal');
    const whatsappModal = document.getElementById('whatsapp-modal');
    const questionBankModal = document.getElementById('question-bank-modal');
    const adminPanelModal = document.getElementById('admin-panel-modal');
    const closeModals = document.querySelectorAll('.close-modal');

    document.querySelector('.share-btn').addEventListener('click', function() {
        playButtonSound();
        shareModal.classList.remove('hidden');
    });

    document.querySelector('.whatsapp-btn').addEventListener('click', function() {
        playButtonSound();
        whatsappModal.classList.remove('hidden');
    });

    document.querySelector('.question-bank-btn').addEventListener('click', function() {
        playButtonSound();
        questionBankModal.classList.remove('hidden');
    });

    document.querySelector('.admin-panel-btn').addEventListener('click', function() {
        playButtonSound();
        adminPanelModal.classList.remove('hidden');
    });

    closeModals.forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            this.closest('.modal').classList.add('hidden');
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            playButtonSound();
            e.target.classList.add('hidden');
        }
    });

    // Get current location
    document.getElementById('get-location').addEventListener('click', function() {
        playButtonSound();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    // In a real app, you would reverse geocode these coordinates to get an address
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    
                    // For demo purposes, we'll just show the coordinates
                    document.getElementById('location-text').textContent = 
                        `Lokasi terdeteksi: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
                    
                    // In a real app, you would use a geocoding API to get the address
                    // Example with Google Maps API (you would need an API key)
                    // reverseGeocode(latitude, longitude);
                },
                function(error) {
                    console.error('Error getting location:', error);
                    document.getElementById('location-text').textContent = 
                        'Tidak dapat mendapatkan lokasi: ' + error.message;
                }
            );
        } else {
            document.getElementById('location-text').textContent = 
                'Geolocation tidak didukung oleh browser ini';
        }
    });

    // Helper function to play button sound
    function playButtonSound() {
        const buttonAudio = document.getElementById('button-audio');
        buttonAudio.currentTime = 0;
        buttonAudio.play().catch(e => console.log('Audio play prevented:', e));
    }
});

// Initialize exam with questions
function initializeExam(participantData) {
    // In a real app, you would fetch questions from a server based on the selected subject/exam type
    // For this demo, we'll use sample questions
    
    const questions = getSampleQuestions(participantData);
    localStorage.setItem('currentExam', JSON.stringify({
        questions: questions,
        currentQuestionIndex: 0,
        answers: {},
        startTime: new Date().getTime()
    }));
    
    displayQuestion(0);
}

function displayQuestion(index) {
    const examData = JSON.parse(localStorage.getItem('currentExam'));
    const question = examData.questions[index];
    
    document.getElementById('question-text').textContent = question.text;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, i) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = `${String.fromCharCode(65 + i)}. ${option.text}`;
        optionBtn.dataset.index = i;
        
        // Check if this option was already selected
        if (examData.answers[index] !== undefined) {
            if (examData.answers[index] === i) {
                optionBtn.classList.add('selected');
                if (i === question.correctIndex) {
                    optionBtn.classList.add('correct');
                } else {
                    optionBtn.classList.add('wrong');
                }
            } else if (i === question.correctIndex) {
                optionBtn.classList.add('correct');
            }
        }
        
        optionBtn.addEventListener('click', function() {
            if (examData.answers[index] === undefined) {
                selectAnswer(index, i);
            }
        });
        
        optionsContainer.appendChild(optionBtn);
    });
    
    // Update progress
    document.querySelector('.progress-fill').style.width = `${(index / examData.questions.length) * 100}%`;
    document.querySelector('.progress-text').textContent = `Soal ${index + 1} dari ${examData.questions.length}`;
    
    // Show/hide explanation
    const explanationContainer = document.getElementById('explanation-container');
    const explanationText = document.getElementById('explanation-text');
    
    if (examData.answers[index] !== undefined) {
        explanationText.textContent = question.explanation;
        explanationContainer.classList.remove('hidden');
    } else {
        explanationContainer.classList.add('hidden');
    }
}

function selectAnswer(questionIndex, answerIndex) {
    const examData = JSON.parse(localStorage.getItem('currentExam'));
    examData.answers[questionIndex] = answerIndex;
    localStorage.setItem('currentExam', JSON.stringify(examData));
    
    // Play correct/wrong sound
    const question = examData.questions[questionIndex];
    const audio = answerIndex === question.correctIndex 
        ? document.getElementById('correct-audio')
        : document.getElementById('wrong-audio');
    
    audio.currentTime = 0;
    audio.play().catch(e => console.log('Audio play prevented:', e));
    
    // Update display
    displayQuestion(questionIndex);
}

function startTimer(minutes) {
    let time = minutes * 60;
    const timerElement = document.getElementById('timer');
    const timeWarning = document.getElementById('time-warning');
    
    const timer = setInterval(function() {
        const mins = Math.floor(time / 60);
        let secs = time % 60;
        secs = secs < 10 ? '0' + secs : secs;
        
        timerElement.textContent = `${mins}:${secs}`;
        
        // Show warning when 10 minutes left
        if (time === 600) { // 10 minutes = 600 seconds
            timeWarning.classList.remove('hidden');
            timerElement.style.fontSize = '24px';
            timerElement.style.color = 'var(--warning-color)';
        }
        
        // Remove warning when 1 minute left
        if (time === 60) {
            timeWarning.classList.add('hidden');
        }
        
        // End exam when time is up
        if (time <= 0) {
            clearInterval(timer);
            finishExam();
        }
        
        time--;
    }, 1000);
    
    // Store timer so we can clear it if exam is finished early
    localStorage.setItem('examTimer', timer);
}

function finishExam() {
    clearInterval(localStorage.getItem('examTimer'));
    
    const examData = JSON.parse(localStorage.getItem('currentExam'));
    const participantData = JSON.parse(localStorage.getItem('participantData'));
    
    // Calculate results
    let correct = 0;
    let wrong = 0;
    
    examData.questions.forEach((question, index) => {
        if (examData.answers[index] !== undefined) {
            if (examData.answers[index] === question.correctIndex) {
                correct++;
            } else {
                wrong++;
            }
        } else {
            wrong++;
        }
    });
    
    const totalQuestions = examData.questions.length;
    const score = Math.round((correct / totalQuestions) * 100);
    
    // Save results
    const results = {
        participant: participantData,
        questions: examData.questions,
        answers: examData.answers,
        correct: correct,
        wrong: wrong,
        score: score,
        timestamp: new Date().toISOString()
    };
    
    // In a real app, you would send this to a server
    localStorage.setItem('examResults', JSON.stringify(results));
    
    // Show results screen
    document.querySelector('.exam-screen').classList.add('hidden');
    document.querySelector('.results-screen').classList.remove('hidden');
    
    // Display results
    document.getElementById('total-questions').textContent = totalQuestions;
    document.getElementById('correct-answers').textContent = correct;
    document.getElementById('wrong-answers').textContent = wrong;
    document.getElementById('final-score').textContent = score;
    
    // Setup results buttons
    document.getElementById('view-certificate-btn').addEventListener('click', function() {
        showCertificate(results);
    });
    
    document.getElementById('retake-exam-btn').addEventListener('click', function() {
        // In a real app, you might want to reset the exam
        alert('Fitur mengulang ujian akan segera tersedia.');
    });
}

function showCertificate(results) {
    // Hide results screen
    document.querySelector('.results-screen').classList.add('hidden');
    
    // Show certificate screen
    const certificateScreen = document.querySelector('.certificate-screen');
    certificateScreen.classList.remove('hidden');
    
    // Play applause sound
    const applauseAudio = document.getElementById('applause-audio');
    applauseAudio.play().catch(e => console.log('Audio play prevented:', e));
    
    // Set certificate data
    const now = new Date();
    const dateString = now.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    const uniqueCode = generateUniqueCode(results);
    
    document.getElementById('cert-name').textContent = results.participant.fullname;
    document.getElementById('cert-score').textContent = results.score;
    document.getElementById('cert-date').textContent = dateString;
    document.getElementById('cert-code').textContent = uniqueCode;
    
    // Set motivational message based on score
    const motivationText = document.getElementById('cert-motivation');
    if (results.score >= 90) {
        motivationText.textContent = 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
    } else if (results.score >= 75) {
        motivationText.textContent = 'Bagus! Anda telah menunjukkan pemahaman yang baik terhadap materi ujian.';
    } else if (results.score >= 60) {
        motivationText.textContent = 'Cukup baik! Teruslah belajar untuk meningkatkan pemahaman Anda.';
    } else {
        motivationText.textContent = 'Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.';
    }
    
    // Setup certificate buttons
    document.getElementById('print-certificate-btn').addEventListener('click', function() {
        window.print();
    });
    
    document.getElementById('back-to-results-btn').addEventListener('click', function() {
        certificateScreen.classList.add('hidden');
        document.querySelector('.results-screen').classList.remove('hidden');
    });
}

function generateUniqueCode(results) {
    const participant = results.participant;
    const now = new Date();
    const datePart = now.toISOString().split('T')[0].replace(/-/g, '');
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase() + 
                      '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    
    let code = `${participant.fullname.toUpperCase().replace(/ /g, '')}/`;
    code += `${participant.status.toUpperCase()}/`;
    
    if (participant.status === 'pelajar') {
        code += `${participant.schoolLevel.toUpperCase()}/`;
        code += `${participant.subject.toUpperCase()}/`;
    } else {
        code += `${participant.examType.toUpperCase()}/`;
    }
    
    code += `${datePart}/`;
    code += `${randomPart}/`;
    code += `PERGUNU-STB`;
    
    return code;
}

function getSampleQuestions(participantData) {
    // In a real app, you would fetch questions from a server based on the selected subject/exam type
    // Here we provide some sample questions for demo purposes
    
    let questions = [];
    
    if (participantData.status === 'pelajar') {
        // Sample questions for students
        questions = [
            {
                text: "Siapakah presiden pertama Indonesia?",
                options: [
                    { text: "Soeharto" },
                    { text: "Joko Widodo" },
                    { text: "Soekarno" },
                    { text: "B.J. Habibie" }
                ],
                correctIndex: 2,
                explanation: "Presiden pertama Indonesia adalah Ir. Soekarno yang menjabat dari tahun 1945 hingga 1967."
            },
            {
                text: "2 + 2 x 2 = ...",
                options: [
                    { text: "6" },
                    { text: "8" },
                    { text: "4" },
                    { text: "2" }
                ],
                correctIndex: 0,
                explanation: "Menurut aturan matematika, perkalian dilakukan sebelum penjumlahan. Jadi 2 x 2 = 4, kemudian 2 + 4 = 6."
            }
        ];
    } else {
        // Sample questions for general public
        questions = [
            {
                text: "Jika semua manusia adalah makhluk hidup, dan Andi adalah manusia, maka:",
                options: [
                    { text: "Andi adalah makhluk hidup" },
                    { text: "Andi bukan makhluk hidup" },
                    { text: "Tidak dapat disimpulkan" },
                    { text: "Hanya sebagian manusia yang makhluk hidup" }
                ],
                correctIndex: 0,
                explanation: "Ini adalah silogisme sederhana. Jika premis benar, maka kesimpulan bahwa Andi adalah makhluk hidup adalah benar."
            },
            {
                text: "Manakah yang bukan termasuk dalam kelompoknya?",
                options: [
                    { text: "Merah" },
                    { text: "Hijau" },
                    { text: "Biru" },
                    { text: "Manis" }
                ],
                correctIndex: 3,
                explanation: "Merah, hijau, dan biru adalah warna, sedangkan manis adalah rasa."
            }
        ];
    }
    
    return questions;
}

// Function to handle printing (hide elements not needed on print)
window.onbeforeprint = function() {
    document.querySelector('.certificate-actions').style.display = 'none';
    document.querySelector('.floating-buttons').style.display = 'none';
};

window.onafterprint = function() {
    document.querySelector('.certificate-actions').style.display = 'flex';
    document.querySelector('.floating-buttons').style.display = 'flex';
};
