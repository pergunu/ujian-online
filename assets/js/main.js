document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let currentScreen = 'opening';
    let participantData = {};
    let examSettings = {
        timer: 120, // in minutes
        pointSystem: 10,
        questionCount: 10,
        randomizeQuestions: true
    };
    
    // Default codes
    const defaultCodes = {
        login: '12345',
        cpns: 'OPENLOCK-1945',
        bank: 'OPENLOCK-1926',
        admin: '65614222'
    };
    
    // Load saved settings from localStorage
    loadSettings();
    
    // Play opening audio
    const openingAudio = document.getElementById('opening-audio');
    openingAudio.play();
    
    // Button sounds
    const buttonAudio = document.getElementById('button-audio');
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            buttonAudio.currentTime = 0;
            buttonAudio.play();
        });
    });
    
    // Login screen
    const loginBtn = document.getElementById('login-btn');
    loginBtn.addEventListener('click', handleLogin);
    
    // Terms screen
    const agreeCheckbox = document.getElementById('agree-checkbox');
    agreeCheckbox.addEventListener('change', function() {
        document.getElementById('terms-agree-btn').disabled = !this.checked;
    });
    
    const termsAgreeBtn = document.getElementById('terms-agree-btn');
    termsAgreeBtn.addEventListener('click', function() {
    // Validasi checkbox tercentang
    if (!document.getElementById('agree-checkbox').checked) {
        alert('Anda harus menyetujui peraturan terlebih dahulu');
        return;
    }

    // Animasi keluar
    document.querySelector('.terms-screen').classList.add('animate__animated', 'animate__fadeOut');
    
    // Reset form peserta
    document.getElementById('participant-data').reset();
    
    setTimeout(() => {
        // Sembunyikan terms, tampilkan form peserta
        document.querySelector('.terms-screen').classList.add('hidden');
        document.querySelector('.participant-form').classList.remove('hidden');
        document.querySelector('.participant-form').classList.add('animate__animated', 'animate__fadeIn');
        
        // Scroll ke atas form
        window.scrollTo(0, 0);
    }, 500);
});
    
    // Participant form
    const participantForm = document.getElementById('participant-data');
    participantForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveParticipantData();
    });
    
    // Status radio buttons
    document.querySelectorAll('input[name="status"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'pelajar') {
                document.getElementById('student-fields').classList.remove('hidden');
                document.getElementById('general-fields').classList.add('hidden');
            } else {
                document.getElementById('student-fields').classList.add('hidden');
                document.getElementById('general-fields').classList.remove('hidden');
            }
        });
    });
    
    // Get location button
    const getLocationBtn = document.getElementById('get-location');
    if (getLocationBtn) {
        getLocationBtn.addEventListener('click', getCurrentLocation);
    }
    
    // Floating buttons
    setupFloatingButtons();
    
    // Admin modals
    setupAdminModals();
    
    // Question bank modal
    setupQuestionBankModal();
    
    // Share modal
    setupShareModal();
    
    // Bank soal access modal
    setupBankAccessModal();
    
    // Admin access modal
    setupAdminAccessModal();

    function resetSensitiveFields() {
    // Daftar semua field sensitif
    const sensitiveFields = [
        'login-code',
        'cpns-code',
        'bank-access-code',
        'admin-access-code',
        'new-login-code',
        'new-exam-code',
        'new-bank-code',
        'new-admin-code'
    ];
    
    // Reset nilai setiap field
    sensitiveFields.forEach(id => {
        const field = document.getElementById(id);
        if (field) field.value = '';
    });
    
    // Hapus dari localStorage
    ['loginCode', 'cpnsCode', 'bankCode', 'adminCode'].forEach(key => {
        localStorage.removeItem(key);
    });
}
    
    // Functions
   function handleLogin() {
    const loginCode = document.getElementById('login-code').value;
    
    if (loginCode === defaultCodes.login) {
        resetSensitiveFields(); // Panggil fungsi reset
        transitionScreen('opening', 'terms');
    } else {
        alert('Kode login salah. Silakan coba lagi.');
        document.getElementById('login-code').value = ''; // Clear field
    }
}
    
    function transitionScreen(from, to) {
        const fromElement = document.querySelector(`.${from}-screen`);
        const toElement = document.querySelector(`.${to}-screen`);
        
        if (fromElement && toElement) {
            fromElement.classList.add('animate__animated', 'animate__fadeOut');
            
            setTimeout(() => {
                fromElement.classList.add('hidden');
                toElement.classList.remove('hidden');
                toElement.classList.add('animate__animated', 'animate__fadeIn');
                
                currentScreen = to;
            }, 500);
        }
    }
    
    function saveParticipantData() {
        const status = document.querySelector('input[name="status"]:checked').value;
        
        participantData = {
            fullname: document.getElementById('fullname').value,
            status: status
        };
        
        if (status === 'pelajar') {
            participantData.school = document.getElementById('school').value;
            participantData.nis = document.getElementById('nis').value;
            participantData.purpose = document.getElementById('student-purpose').value;
            participantData.schoolLevel = document.getElementById('school-level').value;
        } else {
            participantData.address = document.getElementById('address').value;
            participantData.whatsapp = document.getElementById('whatsapp').value;
            participantData.email = document.getElementById('email').value;
            participantData.purpose = document.getElementById('general-purpose').value;
        }
        
        // Save to localStorage
        localStorage.setItem('participantData', JSON.stringify(participantData));
        
        // Show level selection
        transitionScreen('participant-form', 'level-selection');
        
        // Setup level selection based on participant data
        if (participantData.status === 'pelajar') {
            document.getElementById('student-levels').classList.remove('hidden');
            document.getElementById('general-levels').classList.add('hidden');
            
            // Setup class buttons based on school level
            setupClassButtons();
        } else {
            document.getElementById('student-levels').classList.add('hidden');
            document.getElementById('general-levels').classList.remove('hidden');
            
            // If purpose is CPNS, show code input
            if (participantData.purpose === 'cpns') {
                document.getElementById('cpns-code-form').classList.remove('hidden');
                
                const verifyCpnsCodeBtn = document.getElementById('verify-cpns-code');
                verifyCpnsCodeBtn.addEventListener('click', function() {
                    const cpnsCode = document.getElementById('cpns-code').value;
                    
                    if (cpnsCode === defaultCodes.cpns) {
                        document.getElementById('cpns-code-form').classList.add('hidden');
                        document.querySelector('.subject-selection').classList.remove('hidden');
                    } else {
                        alert('Kode lisensi ujian CPNS salah. Silakan coba lagi.');
                    }
                });
            } else {
                document.querySelector('.subject-selection').classList.remove('hidden');
            }
        }
    }
    
    function setupClassButtons() {
        const classButtons = document.querySelectorAll('.level-btn');
        
        classButtons.forEach(button => {
            button.addEventListener('click', function() {
                participantData.classLevel = this.getAttribute('data-level');
                
                // Show subject selection
                document.querySelector('.subject-selection').classList.remove('hidden');
                
                // Scroll to subject selection
                document.querySelector('.subject-selection').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
    
    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    // Reverse geocoding to get address
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                        .then(response => response.json())
                        .then(data => {
                            let address = '';
                            
                            if (data.address) {
                                if (data.address.road) address += data.address.road + ', ';
                                if (data.address.village) address += data.address.village + ', ';
                                if (data.address.city) address += data.address.city + ', ';
                                if (data.address.state) address += data.address.state + ', ';
                                if (data.address.country) address += data.address.country;
                            }
                            
                            document.getElementById('address').value = address.trim();
                        })
                        .catch(error => {
                            console.error('Error getting address:', error);
                            alert('Berhasil mendapatkan lokasi tetapi gagal mendapatkan alamat detail.');
                        });
                },
                function(error) {
                    console.error('Error getting location:', error);
                    alert('Gagal mendapatkan lokasi: ' + error.message);
                }
            );
        } else {
            alert('Geolocation tidak didukung oleh browser Anda.');
        }
    }
    
    function setupFloatingButtons() {
        // Share button
        document.getElementById('share-btn').addEventListener('click', function() {
            document.getElementById('share-modal').classList.remove('hidden');
        });
        
        // WhatsApp button
        document.getElementById('whatsapp-btn').addEventListener('click', function() {
            window.open(`https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...`, '_blank');
        });
        
        // Question bank button
        document.getElementById('question-bank-btn').addEventListener('click', function() {
            document.getElementById('bank-access-modal').classList.remove('hidden');
        });
        
        // Admin button
        document.getElementById('admin-btn').addEventListener('click', function() {
            document.getElementById('admin-access-modal').classList.remove('hidden');
        });
    }
    
    function setupAdminModals() {
        // Admin modal tabs
        document.querySelectorAll('.admin-tabs .tab-btn').forEach(button => {
            button.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and tabs
                document.querySelectorAll('.admin-tabs .tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                document.querySelectorAll('.tab-content').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding tab
                this.classList.add('active');
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });
        
        // Save buttons
        document.getElementById('save-login-code').addEventListener('click', function() {
            const newCode = document.getElementById('new-login-code').value;
            
            if (newCode) {
                defaultCodes.login = newCode;
                localStorage.setItem('loginCode', newCode);
                document.getElementById('old-login-code').value = newCode;
                document.getElementById('new-login-code').value = '';
                alert('Kode login berhasil diubah!');
            } else {
                alert('Masukkan kode login baru!');
            }
        });
        
        document.getElementById('save-exam-code').addEventListener('click', function() {
            const newCode = document.getElementById('new-exam-code').value;
            
            if (newCode) {
                defaultCodes.cpns = newCode;
                localStorage.setItem('cpnsCode', newCode);
                document.getElementById('old-exam-code').value = newCode;
                document.getElementById('new-exam-code').value = '';
                alert('Kode ujian CPNS berhasil diubah!');
            } else {
                alert('Masukkan kode ujian CPNS baru!');
            }
        });
        
        document.getElementById('save-bank-code').addEventListener('click', function() {
            const newCode = document.getElementById('new-bank-code').value;
            
            if (newCode) {
                defaultCodes.bank = newCode;
                localStorage.setItem('bankCode', newCode);
                document.getElementById('old-bank-code').value = newCode;
                document.getElementById('new-bank-code').value = '';
                alert('Kode bank soal berhasil diubah!');
            } else {
                alert('Masukkan kode bank soal baru!');
            }
        });
        
        document.getElementById('save-admin-code').addEventListener('click', function() {
            const newCode = document.getElementById('new-admin-code').value;
            
            if (newCode) {
                defaultCodes.admin = newCode;
                localStorage.setItem('adminCode', newCode);
                document.getElementById('old-admin-code').value = newCode;
                document.getElementById('new-admin-code').value = '';
                alert('Kode admin berhasil diubah!');
            } else {
                alert('Masukkan kode admin baru!');
            }
        });
        
        // Save settings
        document.getElementById('save-settings').addEventListener('click', function() {
            examSettings.timer = parseInt(document.getElementById('exam-timer-edit').value);
            examSettings.pointSystem = parseInt(document.getElementById('point-system-edit').value);
            examSettings.questionCount = parseInt(document.getElementById('question-count-edit').value);
            examSettings.randomizeQuestions = document.getElementById('randomize-questions').checked;
            
            // Save greeting text
            const greetingText = document.getElementById('greeting-text-edit').value;
            document.getElementById('greeting-text').textContent = greetingText;
            localStorage.setItem('greetingText', greetingText);
            
            // Save chairman name
            const chairmanName = document.getElementById('chairman-name-edit').value;
            document.getElementById('chairman-name').textContent = chairmanName;
            localStorage.setItem('chairmanName', chairmanName);
            
            // Save periodic info
            const periodicInfo = document.getElementById('periodic-info-edit').value;
            document.getElementById('periodic-info').textContent = periodicInfo;
            localStorage.setItem('periodicInfo', periodicInfo);
            
            // Save exam toggles
            const examToggles = {};
            document.querySelectorAll('.exam-toggle').forEach(toggle => {
                examToggles[toggle.id] = toggle.checked;
            });
            localStorage.setItem('examToggles', JSON.stringify(examToggles));
            
            // Save all settings
            localStorage.setItem('examSettings', JSON.stringify(examSettings));
            
            alert('Pengaturan berhasil disimpan!');
        });
        
        // Close modal buttons
        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.modal').classList.add('hidden');
            });
        });
    }
    
    function setupQuestionBankModal() {
        // Question bank tabs
        document.querySelectorAll('.question-bank-tabs .tab-btn').forEach(button => {
            button.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and tabs
                document.querySelectorAll('.question-bank-tabs .tab-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                document.querySelectorAll('.tab-content').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding tab
                this.classList.add('active');
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });
        
        // Add question methods
        document.querySelectorAll('.add-question-methods .method-btn').forEach(button => {
            button.addEventListener('click', function() {
                const method = this.getAttribute('data-method');
                
                // Remove active class from all buttons and content
                document.querySelectorAll('.add-question-methods .method-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                document.querySelectorAll('.method-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                document.getElementById(`${method}-method`).classList.add('active');
            });
        });
        
        // Save question button
        document.getElementById('save-question').addEventListener('click', function() {
            const category = document.getElementById('question-category').value;
            const subject = document.getElementById('question-subject').value;
            const level = document.getElementById('question-level').value;
            const questionText = document.getElementById('question-text-input').value;
            const optionA = document.getElementById('option-a-input').value;
            const optionB = document.getElementById('option-b-input').value;
            const optionC = document.getElementById('option-c-input').value;
            const optionD = document.getElementById('option-d-input').value;
            const optionE = document.getElementById('option-e-input').value;
            const correctAnswer = document.getElementById('correct-answer').value;
            const explanation = document.getElementById('explanation-input').value;
            
            if (!questionText || !optionA || !optionB || !optionC || !optionD || !optionE || !explanation) {
                alert('Harap isi semua field!');
                return;
            }
            
            // Handle image upload
            const imageFile = document.getElementById('question-image').files[0];
            let imageUrl = '';
            
            if (imageFile) {
                // In a real app, you would upload this to a server
                // For demo purposes, we'll just use a placeholder
                imageUrl = URL.createObjectURL(imageFile);
            }
            
            const question = {
                id: Date.now(),
                category,
                subject,
                level,
                question: questionText,
                options: {
                    A: optionA,
                    B: optionB,
                    C: optionC,
                    D: optionD,
                    E: optionE
                },
                correctAnswer,
                explanation,
                image: imageUrl
            };
            
            // Save to localStorage
            let questions = JSON.parse(localStorage.getItem('questions')) || [];
            questions.push(question);
            localStorage.setItem('questions', JSON.stringify(questions));
            
            // Clear form
            document.getElementById('question-text-input').value = '';
            document.getElementById('option-a-input').value = '';
            document.getElementById('option-b-input').value = '';
            document.getElementById('option-c-input').value = '';
            document.getElementById('option-d-input').value = '';
            document.getElementById('option-e-input').value = '';
            document.getElementById('explanation-input').value = '';
            document.getElementById('question-image').value = '';
            
            alert('Soal berhasil disimpan!');
        });
        
        // Generate questions with AI
        document.getElementById('generate-questions').addEventListener('click', function() {
            const apiKey = document.getElementById('api-key').value;
            const category = document.getElementById('ai-question-category').value;
            const subject = document.getElementById('ai-question-subject').value;
            const level = document.getElementById('ai-question-level').value;
            const prompt = document.getElementById('ai-prompt').value;
            const count = document.getElementById('ai-question-count').value;
            
            if (!apiKey) {
                alert('Masukkan API Key AI Anda!');
                return;
            }
            
            if (!prompt) {
                alert('Masukkan prompt untuk generate soal!');
                return;
            }
            
            // Show loading
            const aiResults = document.getElementById('ai-results');
            aiResults.classList.remove('hidden');
            aiResults.innerHTML = '<p>Membuat soal... Harap tunggu.</p>';
            
            // In a real app, you would call the AI API here
            // For demo purposes, we'll simulate a response
            setTimeout(() => {
                const generatedQuestions = [
                    {
                        question: 'Ini adalah contoh soal yang dihasilkan oleh AI berdasarkan prompt Anda.',
                        options: {
                            A: 'Pilihan A',
                            B: 'Pilihan B',
                            C: 'Pilihan C',
                            D: 'Pilihan D',
                            E: 'Pilihan E'
                        },
                        correctAnswer: 'B',
                        explanation: 'Ini adalah penjelasan untuk jawaban yang benar.'
                    }
                ];
                
                displayGeneratedQuestions(generatedQuestions);
            }, 2000);
        });
        
        // Search questions
        document.getElementById('search-questions-btn').addEventListener('click', function() {
            const searchTerm = document.getElementById('search-question').value.toLowerCase();
            const filterCategory = document.getElementById('filter-category').value;
            const filterSubject = document.getElementById('filter-subject').value;
            
            const questions = JSON.parse(localStorage.getItem('questions')) || [];
            
            const filteredQuestions = questions.filter(q => {
                const matchesSearch = searchTerm === '' || 
                    q.question.toLowerCase().includes(searchTerm) || 
                    q.explanation.toLowerCase().includes(searchTerm);
                
                const matchesCategory = filterCategory === 'semua' || q.category === filterCategory;
                const matchesSubject = filterSubject === 'semua' || q.subject === filterSubject;
                
                return matchesSearch && matchesCategory && matchesSubject;
            });
            
            displayQuestionsList(filteredQuestions);
        });
        
        // Export questions
        document.getElementById('export-questions-btn').addEventListener('click', function() {
            const format = document.getElementById('export-format').value;
            const questions = JSON.parse(localStorage.getItem('questions')) || [];
            
            if (questions.length === 0) {
                alert('Tidak ada soal untuk diexport!');
                return;
            }
            
            // In a real app, you would implement export functionality
            alert(`Berhasil export ${questions.length} soal dalam format ${format.toUpperCase()}`);
        });
        
        // Import questions
        document.getElementById('import-questions-btn').addEventListener('click', function() {
            const fileInput = document.getElementById('import-file');
            
            if (fileInput.files.length === 0) {
                alert('Pilih file terlebih dahulu!');
                return;
            }
            
            // In a real app, you would implement import functionality
            alert('Import soal berhasil!');
        });
    }
    
    function displayGeneratedQuestions(questions) {
        const container = document.getElementById('generated-questions');
        container.innerHTML = '';
        
        questions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'generated-question';
            questionDiv.innerHTML = `
                <h4>Soal ${index + 1}</h4>
                <p>${q.question}</p>
                <div class="options">
                    <p><strong>A:</strong> ${q.options.A}</p>
                    <p><strong>B:</strong> ${q.options.B}</p>
                    <p><strong>C:</strong> ${q.options.C}</p>
                    <p><strong>D:</strong> ${q.options.D}</p>
                    <p><strong>E:</strong> ${q.options.E}</p>
                </div>
                <div class="answer-info">
                    <p><strong>Jawaban Benar:</strong> ${q.correctAnswer}</p>
                    <p><strong>Penjelasan:</strong> ${q.explanation}</p>
                </div>
            `;
            
            container.appendChild(questionDiv);
        });
        
        // Add save button
        const saveButton = document.createElement('button');
        saveButton.id = 'save-ai-questions';
        saveButton.className = 'btn-gradient';
        saveButton.textContent = 'Simpan Soal';
        saveButton.addEventListener('click', function() {
            // In a real app, you would save the generated questions
            alert('Soal berhasil disimpan!');
        });
        
        container.appendChild(saveButton);
    }
    
    function displayQuestionsList(questions) {
        const container = document.getElementById('questions-list');
        container.innerHTML = '';
        
        if (questions.length === 0) {
            container.innerHTML = '<p>Tidak ada soal yang ditemukan.</p>';
            return;
        }
        
        questions.forEach(q => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item';
            questionDiv.innerHTML = `
                <h4>${q.question}</h4>
                <div class="question-options">
                    <p class="${q.correctAnswer === 'A' ? 'correct' : ''}">A: ${q.options.A}</p>
                    <p class="${q.correctAnswer === 'B' ? 'correct' : ''}">B: ${q.options.B}</p>
                    <p class="${q.correctAnswer === 'C' ? 'correct' : ''}">C: ${q.options.C}</p>
                    <p class="${q.correctAnswer === 'D' ? 'correct' : ''}">D: ${q.options.D}</p>
                    <p class="${q.correctAnswer === 'E' ? 'correct' : ''}">E: ${q.options.E}</p>
                </div>
                <p><strong>Penjelasan:</strong> ${q.explanation}</p>
                <div class="question-actions">
                    <button class="btn-small edit-question" data-id="${q.id}">Edit</button>
                    <button class="btn-small delete-question" data-id="${q.id}">Hapus</button>
                </div>
            `;
            
            container.appendChild(questionDiv);
        });
        
        // Add edit and delete handlers
        document.querySelectorAll('.edit-question').forEach(button => {
            button.addEventListener('click', function() {
                const questionId = parseInt(this.getAttribute('data-id'));
                editQuestion(questionId);
            });
        });
        
        document.querySelectorAll('.delete-question').forEach(button => {
            button.addEventListener('click', function() {
                const questionId = parseInt(this.getAttribute('data-id'));
                deleteQuestion(questionId);
            });
        });
    }
    
    function editQuestion(questionId) {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        const question = questions.find(q => q.id === questionId);
        
        if (!question) {
            alert('Soal tidak ditemukan!');
            return;
        }
        
        // Switch to add question tab
        document.querySelector('.question-bank-tabs .tab-btn[data-tab="add-question"]').click();
        document.querySelector('.add-question-methods .method-btn[data-method="manual"]').click();
        
        // Fill the form
        document.getElementById('question-category').value = question.category;
        document.getElementById('question-subject').value = question.subject;
        document.getElementById('question-level').value = question.level;
        document.getElementById('question-text-input').value = question.question;
        document.getElementById('option-a-input').value = question.options.A;
        document.getElementById('option-b-input').value = question.options.B;
        document.getElementById('option-c-input').value = question.options.C;
        document.getElementById('option-d-input').value = question.options.D;
        document.getElementById('option-e-input').value = question.options.E;
        document.getElementById('correct-answer').value = question.correctAnswer;
        document.getElementById('explanation-input').value = question.explanation;
        
        // Change save button to update
        const saveButton = document.getElementById('save-question');
        saveButton.textContent = 'Update Soal';
        saveButton.onclick = function() {
            // Update the question
            question.category = document.getElementById('question-category').value;
            question.subject = document.getElementById('question-subject').value;
            question.level = document.getElementById('question-level').value;
            question.question = document.getElementById('question-text-input').value;
            question.options.A = document.getElementById('option-a-input').value;
            question.options.B = document.getElementById('option-b-input').value;
            question.options.C = document.getElementById('option-c-input').value;
            question.options.D = document.getElementById('option-d-input').value;
            question.options.E = document.getElementById('option-e-input').value;
            question.correctAnswer = document.getElementById('correct-answer').value;
            question.explanation = document.getElementById('explanation-input').value;
            
            // Save back to localStorage
            localStorage.setItem('questions', JSON.stringify(questions));
            
            // Reset form and button
            saveButton.textContent = 'Simpan Soal';
            saveButton.onclick = function() {
                // Original save functionality
                // (This would need to be reimplemented or extracted to a function)
            };
            
            alert('Soal berhasil diupdate!');
        };
    }
    
    function deleteQuestion(questionId) {
        if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            let questions = JSON.parse(localStorage.getItem('questions')) || [];
            questions = questions.filter(q => q.id !== questionId);
            localStorage.setItem('questions', JSON.stringify(questions));
            
            // Refresh the list
            document.getElementById('search-questions-btn').click();
        }
    }
    
    function setupShareModal() {
        // Copy link button
        document.getElementById('copy-link-btn').addEventListener('click', function() {
            const linkInput = document.getElementById('share-link');
            linkInput.select();
            document.execCommand('copy');
            
            // Show feedback
            const originalText = this.textContent;
            this.textContent = 'Tersalin!';
            
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
        
        // Add link button
        document.getElementById('add-share-link').addEventListener('click', function() {
            const newLink = document.getElementById('new-share-link').value.trim();
            
            if (newLink) {
                // Save to localStorage
                let links = JSON.parse(localStorage.getItem('shareLinks')) || [];
                links.push(newLink);
                localStorage.setItem('shareLinks', JSON.stringify(links));
                
                // Refresh list
                displayShareLinks();
                
                // Clear input
                document.getElementById('new-share-link').value = '';
            } else {
                alert('Masukkan URL terlebih dahulu!');
            }
        });
        
        // Initial display of links
        displayShareLinks();
    }
    
    function displayShareLinks() {
        const container = document.getElementById('links-list');
        const links = JSON.parse(localStorage.getItem('shareLinks')) || [];
        
        // Clear existing content except the heading
        container.innerHTML = '<h4>Daftar Link:</h4>';
        
        if (links.length === 0) {
            container.innerHTML += '<p>Belum ada link yang ditambahkan.</p>';
            return;
        }
        
        links.forEach((link, index) => {
            const linkItem = document.createElement('div');
            linkItem.className = 'link-item';
            linkItem.innerHTML = `
                <span>${link}</span>
                <div class="link-actions">
                    <button class="btn-small copy-link" data-index="${index}">Salin</button>
                    <button class="btn-small delete-link" data-index="${index}">Hapus</button>
                </div>
            `;
            
            container.appendChild(linkItem);
        });
        
        // Add event listeners
        document.querySelectorAll('.copy-link').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const links = JSON.parse(localStorage.getItem('shareLinks')) || [];
                
                if (links[index]) {
                    navigator.clipboard.writeText(links[index]);
                    
                    // Show feedback
                    const originalText = this.textContent;
                    this.textContent = 'Tersalin!';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }
            });
        });
        
        document.querySelectorAll('.delete-link').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                let links = JSON.parse(localStorage.getItem('shareLinks')) || [];
                
                if (confirm('Apakah Anda yakin ingin menghapus link ini?')) {
                    links.splice(index, 1);
                    localStorage.setItem('shareLinks', JSON.stringify(links));
                    displayShareLinks();
                }
            });
        });
    }
    
    function setupBankAccessModal() {
        document.getElementById('verify-bank-access').addEventListener('click', function() {
            const code = document.getElementById('bank-access-code').value;
            
            if (code === defaultCodes.bank) {
                document.getElementById('bank-access-modal').classList.add('hidden');
                document.getElementById('question-bank-modal').classList.remove('hidden');
                
                // Load questions stats
                const questions = JSON.parse(localStorage.getItem('questions')) || [];
                document.getElementById('total-questions-stat').textContent = questions.length;
                document.getElementById('pelajar-questions-stat').textContent = 
                    questions.filter(q => q.category === 'pelajar').length;
                document.getElementById('umum-questions-stat').textContent = 
                    questions.filter(q => q.category === 'umum').length;
            } else {
                alert('Kode bank soal salah!');
            }
        });
    }
    
    function setupAdminAccessModal() {
        document.getElementById('verify-admin-access').addEventListener('click', function() {
            const code = document.getElementById('admin-access-code').value;
            
            if (code === defaultCodes.admin) {
                document.getElementById('admin-access-modal').classList.add('hidden');
                document.getElementById('admin-modal').classList.remove('hidden');
                
                // Setup exam toggles
                setupExamToggles();
            } else {
                alert('Kode admin salah!');
            }
        });
    }
    
    function setupExamToggles() {
        const container = document.querySelector('.exam-toggle-container');
        container.innerHTML = '';
        
        const examTypes = [
            { id: 'toggle-agama', label: 'AGAMA' },
            { id: 'toggle-ppkn', label: 'PPKN' },
            { id: 'toggle-sejarah', label: 'SEJARAH' },
            { id: 'toggle-ipa', label: 'IPA' },
            { id: 'toggle-ips', label: 'IPS' },
            { id: 'toggle-matematika', label: 'MATEMATIKA' },
            { id: 'toggle-bahasa-indonesia', label: 'BAHASA INDONESIA' },
            { id: 'toggle-bahasa-inggris', label: 'BAHASA INGGRIS' },
            { id: 'toggle-materi-extra', label: 'MATERI EXTRA' },
            { id: 'toggle-materi-khusus', label: 'MATERI KHUSUS' },
            { id: 'toggle-logika', label: 'Ujian Logika' },
            { id: 'toggle-cpns', label: 'Ujian CPNS/P3K' }
        ];
        
        // Load saved toggles
        const savedToggles = JSON.parse(localStorage.getItem('examToggles')) || {};
        
        examTypes.forEach(exam => {
            const toggleDiv = document.createElement('div');
            toggleDiv.className = 'exam-toggle-item';
            
            const toggle = document.createElement('input');
            toggle.type = 'checkbox';
            toggle.id = exam.id;
            toggle.className = 'exam-toggle';
            toggle.checked = savedToggles[exam.id] !== false; // Default to true if not set
            
            const label = document.createElement('label');
            label.htmlFor = exam.id;
            label.textContent = exam.label;
            
            toggleDiv.appendChild(toggle);
            toggleDiv.appendChild(label);
            container.appendChild(toggleDiv);
        });
    }
    
    function loadSettings() {
        // Load codes
        const savedLoginCode = localStorage.getItem('loginCode');
        if (savedLoginCode) defaultCodes.login = savedLoginCode;
        
        const savedCpnsCode = localStorage.getItem('cpnsCode');
        if (savedCpnsCode) defaultCodes.cpns = savedCpnsCode;
        
        const savedBankCode = localStorage.getItem('bankCode');
        if (savedBankCode) defaultCodes.bank = savedBankCode;
        
        const savedAdminCode = localStorage.getItem('adminCode');
        if (savedAdminCode) defaultCodes.admin = savedAdminCode;
        
        // Load exam settings
        const savedExamSettings = localStorage.getItem('examSettings');
        if (savedExamSettings) {
            Object.assign(examSettings, JSON.parse(savedExamSettings));
            
            // Update form fields
            document.getElementById('exam-timer-edit').value = examSettings.timer;
            document.getElementById('point-system-edit').value = examSettings.pointSystem;
            document.getElementById('question-count-edit').value = examSettings.questionCount;
            document.getElementById('randomize-questions').checked = examSettings.randomizeQuestions;
        }
        
        // Load greeting text
        const greetingText = localStorage.getItem('greetingText');
        if (greetingText) {
            document.getElementById('greeting-text').textContent = greetingText;
            document.getElementById('greeting-text-edit').value = greetingText;
        }
        
        // Load chairman name
        const chairmanName = localStorage.getItem('chairmanName');
        if (chairmanName) {
            document.getElementById('chairman-name').textContent = chairmanName;
            document.getElementById('chairman-name-edit').value = chairmanName;
        }
        
        // Load periodic info
        const periodicInfo = localStorage.getItem('periodicInfo');
        if (periodicInfo) {
            document.getElementById('periodic-info').textContent = periodicInfo;
            document.getElementById('periodic-info-edit').value = periodicInfo;
        }
    }
});
