// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi partikel background
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {
        console.log('Particles.js loaded');
    });
    
    // Set default code
    const defaultCodes = {
        login: '12345',
        cpns: 'OPENLOCK-1945',
        questionBank: 'OPENLOCK-1926',
        admin: '65614222'
    };
    
    // Simpan default code ke localStorage jika belum ada
    if (!localStorage.getItem('loginCode')) {
        localStorage.setItem('loginCode', defaultCodes.login);
    }
    if (!localStorage.getItem('cpnsCode')) {
        localStorage.setItem('cpnsCode', defaultCodes.cpns);
    }
    if (!localStorage.getItem('questionBankCode')) {
        localStorage.setItem('questionBankCode', defaultCodes.questionBank);
    }
    if (!localStorage.getItem('adminCode')) {
        localStorage.setItem('adminCode', defaultCodes.admin);
    }
    
    // Set greeting text dari localStorage atau default
    const greetingText = document.getElementById('greetingText');
    const savedGreeting = localStorage.getItem('greetingText') || 'Selamat Datang di Ujian Online Pergunu Situbondo';
    greetingText.textContent = savedGreeting;
    
    // Set info text dari localStorage atau default
    const infoText = document.getElementById('infoText');
    const savedInfo = localStorage.getItem('infoText') || 'Informasi penting akan ditampilkan di sini oleh admin.';
    infoText.textContent = savedInfo;
    
    // Set exam info text dari localStorage atau default
    const examInfoText = document.getElementById('examInfoText');
    const savedExamInfo = localStorage.getItem('examInfoText') || 'Informasi ujian akan ditampilkan di sini oleh admin.';
    examInfoText.textContent = savedExamInfo;
    
    // Event listener untuk tombol login
    document.getElementById('loginBtn').addEventListener('click', function() {
        const loginCode = document.getElementById('loginCode').value;
        const savedLoginCode = localStorage.getItem('loginCode');
        
        if (loginCode === savedLoginCode) {
            playButtonSound();
            document.getElementById('openingScreen').classList.remove('slide-in');
            document.getElementById('openingScreen').classList.add('slide-out');
            
            setTimeout(() => {
                document.getElementById('openingScreen').style.display = 'none';
                document.getElementById('termsScreen').style.display = 'block';
                document.getElementById('termsScreen').classList.remove('slide-out');
                document.getElementById('termsScreen').classList.add('slide-in');
            }, 500);
        } else {
            alert('Kode login salah! Silakan coba lagi.');
        }
    });
    
    // Event listener untuk checkbox persetujuan
    document.getElementById('agreeCheckbox').addEventListener('change', function() {
        document.getElementById('continueBtn').disabled = !this.checked;
    });
    
    // Event listener untuk tombol lanjut
    document.getElementById('continueBtn').addEventListener('click', function() {
        playButtonSound();
        document.getElementById('termsScreen').classList.remove('slide-in');
        document.getElementById('termsScreen').classList.add('slide-out');
        
        setTimeout(() => {
            document.getElementById('termsScreen').style.display = 'none';
            document.getElementById('dataFormScreen').style.display = 'block';
            document.getElementById('dataFormScreen').classList.remove('slide-out');
            document.getElementById('dataFormScreen').classList.add('slide-in');
        }, 500);
    });
    
    // Toggle form berdasarkan status peserta
    document.querySelectorAll('input[name="status"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'pelajar') {
                document.querySelectorAll('.student-fields').forEach(field => {
                    field.style.display = 'block';
                });
                document.querySelectorAll('.general-fields').forEach(field => {
                    field.style.display = 'none';
                });
                document.getElementById('cpnsCodeGroup').style.display = 'none';
            } else {
                document.querySelectorAll('.student-fields').forEach(field => {
                    field.style.display = 'none';
                });
                document.querySelectorAll('.general-fields').forEach(field => {
                    field.style.display = 'block';
                });
            }
        });
    });
    
    // Tampilkan field kode CPNS jika dipilih
    document.getElementById('generalPurpose').addEventListener('change', function() {
        if (this.value === 'ujian_cpns') {
            document.getElementById('cpnsCodeGroup').style.display = 'block';
        } else {
            document.getElementById('cpnsCodeGroup').style.display = 'none';
        }
    });
    
    // GPS location
    document.getElementById('getLocationBtn').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    // Gunakan API geocoding untuk mendapatkan alamat dari koordinat
                    getAddressFromCoordinates(position.coords.latitude, position.coords.longitude);
                },
                function(error) {
                    alert('Error getting location: ' + error.message);
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });
    
    // Form submit
    document.getElementById('participantForm').addEventListener('submit', function(e) {
        e.preventDefault();
        playButtonSound();
        
        // Validasi form
        const fullName = document.getElementById('fullName').value;
        const status = document.querySelector('input[name="status"]:checked').value;
        
        if (!fullName) {
            alert('Nama lengkap harus diisi!');
            return;
        }
        
        if (status === 'pelajar') {
            const schoolName = document.getElementById('schoolName').value;
            const studentId = document.getElementById('studentId').value;
            
            if (!schoolName || !studentId) {
                alert('Data sekolah harus lengkap!');
                return;
            }
        } else {
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            
            if (!address || !phone || !email) {
                alert('Data umum harus lengkap!');
                return;
            }
            
            // Validasi email
            const emailRegex = /^[a-z0-9._%+-]+@(gmail|yahoo|hotmail)\.com$/i;
            if (!emailRegex.test(email)) {
                alert('Email harus menggunakan domain @gmail, @yahoo, atau @hotmail!');
                return;
            }
            
            // Validasi nomor WhatsApp
            const phoneRegex = /^\d{10,13}$/;
            if (!phoneRegex.test(phone)) {
                alert('Nomor WhatsApp harus 10-13 digit angka!');
                return;
            }
            
            // Validasi kode CPNS jika dipilih
            if (document.getElementById('generalPurpose').value === 'ujian_cpns') {
                const cpnsCode = document.getElementById('cpnsCode').value;
                const savedCPNSCode = localStorage.getItem('cpnsCode');
                
                if (cpnsCode !== savedCPNSCode) {
                    alert('Kode lisensi ujian CPNS/P3K salah!');
                    return;
                }
            }
        }
        
        // Simpan data peserta ke localStorage
        const participantData = {
            fullName: fullName,
            status: status,
            timestamp: new Date().toISOString()
        };
        
        if (status === 'pelajar') {
            participantData.schoolName = document.getElementById('schoolName').value;
            participantData.studentId = document.getElementById('studentId').value;
            participantData.purpose = document.getElementById('studentPurpose').value;
            participantData.schoolLevel = document.querySelector('input[name="schoolLevel"]:checked').value;
        } else {
            participantData.address = document.getElementById('address').value;
            participantData.phone = document.getElementById('phone').value;
            participantData.email = document.getElementById('email').value;
            participantData.purpose = document.getElementById('generalPurpose').value;
        }
        
        localStorage.setItem('participantData', JSON.stringify(participantData));
        
        // Pindah ke halaman pemilihan level
        document.getElementById('dataFormScreen').classList.remove('slide-in');
        document.getElementById('dataFormScreen').classList.add('slide-out');
        
        setTimeout(() => {
            document.getElementById('dataFormScreen').style.display = 'none';
            document.getElementById('levelScreen').style.display = 'block';
            document.getElementById('levelScreen').classList.remove('slide-out');
            document.getElementById('levelScreen').classList.add('slide-in');
            
            // Tampilkan opsi yang sesuai dengan status peserta
            if (status === 'pelajar') {
                document.getElementById('studentLevels').style.display = 'block';
                document.getElementById('generalLevels').style.display = 'none';
                document.getElementById('studentSubjects').style.display = 'grid';
                document.getElementById('generalSubjects').style.display = 'none';
                
                // Tampilkan tingkat sekolah yang sesuai
                const schoolLevel = participantData.schoolLevel;
                document.querySelectorAll('.grade-level').forEach(level => {
                    level.style.display = 'none';
                });
                
                if (schoolLevel === 'SD') {
                    document.querySelector('.sd-levels').style.display = 'block';
                } else if (schoolLevel === 'SMP') {
                    document.querySelector('.smp-levels').style.display = 'block';
                } else {
                    document.querySelector('.sma-levels').style.display = 'block';
                }
            } else {
                document.getElementById('studentLevels').style.display = 'none';
                document.getElementById('generalLevels').style.display = 'block';
                document.getElementById('studentSubjects').style.display = 'none';
                document.getElementById('generalSubjects').style.display = 'grid';
            }
        }, 500);
    });
    
    // Event listener untuk tombol level
    document.querySelectorAll('.btn-level').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            localStorage.setItem('selectedGrade', this.value);
            this.classList.add('active');
            
            // Reset active class dari tombol level lainnya
            document.querySelectorAll('.btn-level').forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.classList.remove('active');
                }
            });
            
            checkStartExamConditions();
        });
    });
    
    // Event listener untuk tombol subject
    document.querySelectorAll('.btn-subject').forEach(btn => {
        btn.addEventListener('click', function() {
            playButtonSound();
            localStorage.setItem('selectedSubject', this.dataset.subject);
            this.classList.add('active');
            
            // Reset active class dari tombol subject lainnya
            document.querySelectorAll('.btn-subject').forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.classList.remove('active');
                }
            });
            
            checkStartExamConditions();
        });
    });
    
    // Event listener untuk tombol mulai ujian
    document.getElementById('startExamBtn').addEventListener('click', function() {
        playButtonSound();
        startExam();
    });
    
    // Fungsi untuk memeriksa kondisi mulai ujian
    function checkStartExamConditions() {
        const selectedGrade = localStorage.getItem('selectedGrade');
        const selectedSubject = localStorage.getItem('selectedSubject');
        
        if (selectedGrade && selectedSubject) {
            document.getElementById('startExamBtn').disabled = false;
        } else {
            document.getElementById('startExamBtn').disabled = true;
        }
    }
    
    // Fungsi untuk memulai ujian
    function startExam() {
        document.getElementById('levelScreen').classList.remove('slide-in');
        document.getElementById('levelScreen').classList.add('slide-out');
        
        setTimeout(() => {
            document.getElementById('levelScreen').style.display = 'none';
            document.getElementById('examScreen').style.display = 'block';
            document.getElementById('examScreen').classList.remove('slide-out');
            document.getElementById('examScreen').classList.add('slide-in');
            
            // Mulai timer
            startExamTimer();
            
            // Load soal
            loadQuestions();
        }, 500);
    }
    
    // Fungsi untuk mendapatkan alamat dari koordinat
    function getAddressFromCoordinates(lat, lng) {
        // Gunakan API geocoding seperti Nominatim atau Google Maps Geocoding API
        // Contoh dengan Nominatim (OpenStreetMap)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
            .then(response => response.json())
            .then(data => {
                const address = data.display_name || 'Alamat tidak ditemukan';
                document.getElementById('address').value = address;
            })
            .catch(error => {
                console.error('Error getting address:', error);
                document.getElementById('address').value = 'Error mendapatkan alamat';
            });
    }
    
    // Fungsi untuk memainkan suara tombol
    function playButtonSound() {
        const audio = document.getElementById('buttonAudio');
        audio.currentTime = 0;
        audio.play();
    }
    
    // Event listener untuk tombol mengambang
    document.getElementById('shareBtn').addEventListener('click', function() {
        playButtonSound();
        document.getElementById('shareModal').style.display = 'block';
    });
    
    document.getElementById('whatsappBtn').addEventListener('click', function() {
        playButtonSound();
        window.open('https://wa.me/6285647709114?text=Assalamualaikum%20mas%20admin,%20saya%20mau%20tanya%20sesuatu%20nih...', '_blank');
    });
    
    document.getElementById('questionBankBtn').addEventListener('click', function() {
        playButtonSound();
        document.getElementById('questionBankModal').style.display = 'block';
    });
    
    document.getElementById('adminPanelBtn').addEventListener('click', function() {
        playButtonSound();
        document.getElementById('adminAccessModal').style.display = 'block';
    });
    
    // Tutup modal
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Klik di luar modal untuk menutup
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Akses bank soal
    document.getElementById('submitQuestionBankCode').addEventListener('click', function() {
        const enteredCode = document.getElementById('questionBankCode').value;
        const savedCode = localStorage.getItem('questionBankCode');
        
        if (enteredCode === savedCode) {
            playButtonSound();
            document.getElementById('questionBankModal').style.display = 'none';
            document.getElementById('adminModal').style.display = 'block';
            
            // Buka tab bank soal
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector('[data-tab="questionsTab"]').classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById('questionsTab').classList.add('active');
            
            // Load bank soal
            loadQuestionBank();
        } else {
            alert('Kode bank soal salah!');
        }
    });
    
    // Akses admin panel
    document.getElementById('submitAdminCode').addEventListener('click', function() {
        const enteredCode = document.getElementById('adminAccessCode').value;
        const savedCode = localStorage.getItem('adminCode');
        
        if (enteredCode === savedCode) {
            playButtonSound();
            document.getElementById('adminAccessModal').style.display = 'none';
            document.getElementById('adminModal').style.display = 'block';
            
            // Load data admin
            loadAdminData();
        } else {
            alert('Kode admin salah!');
        }
    });
    
    // Switch tab admin
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(tabBtn => {
                tabBtn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update active tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Simpan kode login
    document.getElementById('saveLoginCodeBtn').addEventListener('click', function() {
        const newCode = document.getElementById('newLoginCode').value;
        const confirmCode = document.getElementById('confirmLoginCode').value;
        
        if (newCode && newCode === confirmCode) {
            localStorage.setItem('loginCode', newCode);
            alert('Kode login berhasil diperbarui!');
        } else {
            alert('Kode tidak cocok atau kosong!');
        }
    });
    
    // Simpan kode CPNS
    document.getElementById('saveCPNSCodeBtn').addEventListener('click', function() {
        const newCode = document.getElementById('newCPNSCode').value;
        const confirmCode = document.getElementById('confirmCPNSCode').value;
        
        if (newCode && newCode === confirmCode) {
            localStorage.setItem('cpnsCode', newCode);
            alert('Kode ujian CPNS/P3K berhasil diperbarui!');
        } else {
            alert('Kode tidak cocok atau kosong!');
        }
    });
    
    // Simpan kode bank soal
    document.getElementById('saveQuestionCodeBtn').addEventListener('click', function() {
        const newCode = document.getElementById('newQuestionCode').value;
        const confirmCode = document.getElementById('confirmQuestionCode').value;
        
        if (newCode && newCode === confirmCode) {
            localStorage.setItem('questionBankCode', newCode);
            alert('Kode bank soal berhasil diperbarui!');
        } else {
            alert('Kode tidak cocok atau kosong!');
        }
    });
    
    // Simpan kode admin
    document.getElementById('saveAdminCodeBtn').addEventListener('click', function() {
        const newCode = document.getElementById('newAdminCode').value;
        const confirmCode = document.getElementById('confirmAdminCode').value;
        
        if (newCode && newCode === confirmCode) {
            localStorage.setItem('adminCode', newCode);
            alert('Kode admin berhasil diperbarui!');
        } else {
            alert('Kode tidak cocok atau kosong!');
        }
    });
    
    // Simpan konten
    document.getElementById('saveContentBtn').addEventListener('click', function() {
        const greetingText = document.getElementById('greetingTextEdit').value;
        const infoText = document.getElementById('infoTextEdit').value;
        const examInfoText = document.getElementById('examInfoTextEdit').value;
        const chairmanName = document.getElementById('chairmanNameEdit').value;
        
        localStorage.setItem('greetingText', greetingText);
        localStorage.setItem('infoText', infoText);
        localStorage.setItem('examInfoText', examInfoText);
        localStorage.setItem('chairmanName', chairmanName);
        
        // Simpan pesan motivasi
        const motivationMessages = [];
        document.querySelectorAll('#motivationMessages .motivation-item input').forEach(input => {
            if (input.value.trim()) {
                motivationMessages.push(input.value.trim());
            }
        });
        localStorage.setItem('motivationMessages', JSON.stringify(motivationMessages));
        
        alert('Perubahan konten berhasil disimpan!');
    });
    
    // Tambah pesan motivasi
    document.getElementById('addMotivationBtn').addEventListener('click', function() {
        const newItem = document.createElement('div');
        newItem.className = 'motivation-item';
        newItem.innerHTML = `
            <input type="text" class="input-field" placeholder="Masukkan pesan motivasi">
            <button class="btn-small remove-btn"><i class="fas fa-trash"></i></button>
        `;
        document.getElementById('motivationMessages').appendChild(newItem);
        
        // Tambah event listener untuk tombol hapus
        newItem.querySelector('.remove-btn').addEventListener('click', function() {
            newItem.remove();
        });
    });
    
    // Simpan pengaturan ujian
    document.getElementById('saveExamSettingsBtn').addEventListener('click', function() {
        const examTimer = document.getElementById('examTimerEdit').value;
        const questionPoints = document.getElementById('questionPoints').value;
        const questionCount = document.getElementById('questionCount').value;
        const randomizeQuestions = document.getElementById('randomizeQuestions').checked;
        
        localStorage.setItem('examTimer', examTimer);
        localStorage.setItem('questionPoints', questionPoints);
        localStorage.setItem('questionCount', questionCount);
        localStorage.setItem('randomizeQuestions', randomizeQuestions);
        
        // Simpan status aktif/nonaktif ujian
        const examStatus = {};
        document.querySelectorAll('#examTab .toggle-item input').forEach(toggle => {
            const subject = toggle.closest('.toggle-item').querySelector('label').textContent.trim();
            examStatus[subject] = toggle.checked;
        });
        localStorage.setItem('examStatus', JSON.stringify(examStatus));
        
        alert('Pengaturan ujian berhasil disimpan!');
    });
    
    // Load data admin
    function loadAdminData() {
        // Load greeting text
        const savedGreeting = localStorage.getItem('greetingText') || 'Selamat Datang di Ujian Online Pergunu Situbondo';
        document.getElementById('greetingTextEdit').value = savedGreeting;
        
        // Load info text
        const savedInfo = localStorage.getItem('infoText') || 'Informasi penting akan ditampilkan di sini oleh admin.';
        document.getElementById('infoTextEdit').value = savedInfo;
        
        // Load exam info text
        const savedExamInfo = localStorage.getItem('examInfoText') || 'Informasi ujian akan ditampilkan di sini oleh admin.';
        document.getElementById('examInfoTextEdit').value = savedExamInfo;
        
        // Load chairman name
        const savedChairman = localStorage.getItem('chairmanName') || 'Moh. Nuril Hudha, S.Pd., M.Si.';
        document.getElementById('chairmanNameEdit').value = savedChairman;
        
        // Load motivation messages
        const savedMotivations = JSON.parse(localStorage.getItem('motivationMessages')) || [
            'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.',
            'Kerja bagus! Anda telah menunjukkan pemahaman yang baik terhadap materi ujian.'
        ];
        
        const motivationContainer = document.getElementById('motivationMessages');
        motivationContainer.innerHTML = '';
        
        savedMotivations.forEach(msg => {
            const newItem = document.createElement('div');
            newItem.className = 'motivation-item';
            newItem.innerHTML = `
                <input type="text" class="input-field" value="${msg}">
                <button class="btn-small remove-btn"><i class="fas fa-trash"></i></button>
            `;
            motivationContainer.appendChild(newItem);
            
            // Tambah event listener untuk tombol hapus
            newItem.querySelector('.remove-btn').addEventListener('click', function() {
                newItem.remove();
            });
        });
        
        // Load exam settings
        document.getElementById('examTimerEdit').value = localStorage.getItem('examTimer') || '120';
        document.getElementById('questionPoints').value = localStorage.getItem('questionPoints') || '1';
        document.getElementById('questionCount').value = localStorage.getItem('questionCount') || '10';
        document.getElementById('randomizeQuestions').checked = localStorage.getItem('randomizeQuestions') === 'true';
        
        // Load exam status
        const examStatus = JSON.parse(localStorage.getItem('examStatus')) || {};
        document.querySelectorAll('#examTab .toggle-item input').forEach(toggle => {
            const subject = toggle.closest('.toggle-item').querySelector('label').textContent.trim();
            toggle.checked = examStatus[subject] !== false;
        });
    }
    
    // Load bank soal
    function loadQuestionBank() {
        const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
        const questionBankList = document.getElementById('questionBankList');
        questionBankList.innerHTML = '';
        
        // Filter berdasarkan kategori
        const categoryFilter = document.getElementById('questionCategoryFilter').value;
        const searchTerm = document.getElementById('questionSearch').value.toLowerCase();
        
        const filteredQuestions = questionBank.filter(question => {
            const matchesCategory = categoryFilter === 'all' || question.category === categoryFilter;
            const matchesSearch = question.question.toLowerCase().includes(searchTerm) || 
                                 question.category.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
        
        if (filteredQuestions.length === 0) {
            questionBankList.innerHTML = '<p>Tidak ada soal yang ditemukan.</p>';
            return;
        }
        
        filteredQuestions.forEach((question, index) => {
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            questionItem.innerHTML = `
                <div class="question-text">${index + 1}. ${question.question}</div>
                <div class="question-meta">
                    <span>Kategori: ${question.category}</span>
                    <span>Jawaban: ${question.correctAnswer}</span>
                </div>
            `;
            
            questionItem.addEventListener('click', function() {
                openQuestionEditor(question);
            });
            
            questionBankList.appendChild(questionItem);
        });
    }
    
    // Buka editor soal
    function openQuestionEditor(question = null) {
        const modal = document.getElementById('questionEditModal');
        const title = document.getElementById('editModalTitle');
        
        if (question) {
            title.textContent = 'Edit Soal';
            
            // Isi form dengan data soal
            document.getElementById('editQuestionCategory').value = question.category;
            document.getElementById('editQuestionText').value = question.question;
            document.getElementById('editOptionA').value = question.options.A;
            document.getElementById('editOptionB').value = question.options.B;
            document.getElementById('editOptionC').value = question.options.C;
            document.getElementById('editOptionD').value = question.options.D;
            document.getElementById('editOptionE').value = question.options.E;
            document.getElementById('editCorrectAnswer').value = question.correctAnswer;
            document.getElementById('editExplanation').value = question.explanation;
            
            // Simpan ID soal untuk edit
            modal.dataset.questionId = question.id;
        } else {
            title.textContent = 'Tambah Soal Baru';
            
            // Reset form
            document.getElementById('editQuestionCategory').value = 'agama';
            document.getElementById('editQuestionText').value = '';
            document.getElementById('editOptionA').value = '';
            document.getElementById('editOptionB').value = '';
            document.getElementById('editOptionC').value = '';
            document.getElementById('editOptionD').value = '';
            document.getElementById('editOptionE').value = '';
            document.getElementById('editCorrectAnswer').value = 'A';
            document.getElementById('editExplanation').value = '';
            
            // Hapus ID soal jika ada
            delete modal.dataset.questionId;
        }
        
        modal.style.display = 'flex';
    }
    
    // Tutup editor soal
    document.getElementById('cancelEditBtn').addEventListener('click', function() {
        document.getElementById('questionEditModal').style.display = 'none';
    });
    
    // Simpan soal
    document.getElementById('saveQuestionBtn').addEventListener('click', function() {
        const category = document.getElementById('editQuestionCategory').value;
        const questionText = document.getElementById('editQuestionText').value.trim();
        const optionA = document.getElementById('editOptionA').value.trim();
        const optionB = document.getElementById('editOptionB').value.trim();
        const optionC = document.getElementById('editOptionC').value.trim();
        const optionD = document.getElementById('editOptionD').value.trim();
        const optionE = document.getElementById('editOptionE').value.trim();
        const correctAnswer = document.getElementById('editCorrectAnswer').value;
        const explanation = document.getElementById('editExplanation').value.trim();
        
        // Validasi
        if (!questionText || !optionA || !optionB || !optionC || !optionD || !optionE) {
            alert('Semua field harus diisi!');
            return;
        }
        
        const question = {
            id: document.getElementById('questionEditModal').dataset.questionId || Date.now().toString(),
            category: category,
            question: questionText,
            options: {
                A: optionA,
                B: optionB,
                C: optionC,
                D: optionD,
                E: optionE
            },
            correctAnswer: correctAnswer,
            explanation: explanation
        };
        
        // Simpan ke localStorage
        const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
        
        if (document.getElementById('questionEditModal').dataset.questionId) {
            // Edit soal yang ada
            const index = questionBank.findIndex(q => q.id === question.id);
            if (index !== -1) {
                questionBank[index] = question;
            }
        } else {
            // Tambah soal baru
            questionBank.push(question);
        }
        
        localStorage.setItem('questionBank', JSON.stringify(questionBank));
        
        // Tutup modal dan refresh daftar soal
        document.getElementById('questionEditModal').style.display = 'none';
        loadQuestionBank();
        
        alert('Soal berhasil disimpan!');
    });
    
    // Generate soal dengan AI
    document.getElementById('generateQuestionBtn').addEventListener('click', function() {
        const apiKey = document.getElementById('aiApiKey').value.trim();
        const prompt = document.getElementById('aiPrompt').value.trim();
        const category = document.getElementById('editQuestionCategory').value;
        
        if (!apiKey) {
            alert('Masukkan API Key AI terlebih dahulu!');
            return;
        }
        
        if (!prompt) {
            alert('Masukkan prompt untuk menghasilkan soal!');
            return;
        }
        
        // Tampilkan loading
        const generateBtn = document.getElementById('generateQuestionBtn');
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Membuat soal...';
        
        // Panggil API AI (contoh menggunakan OpenAI)
        // NOTE: Anda perlu mengganti dengan implementasi API yang sesuai
        fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Buat sebuah soal pilihan ganda tentang ${category} dengan topik: ${prompt}. Berikan 5 pilihan jawaban (A-E) dan tentukan jawaban yang benar. Juga berikan penjelasan singkat untuk jawaban yang benar. Format output dalam JSON seperti ini: 
                {
                    "question": "pertanyaan",
                    "options": {
                        "A": "pilihan A",
                        "B": "pilihan B",
                        "C": "pilihan C",
                        "D": "pilihan D",
                        "E": "pilihan E"
                    },
                    "correctAnswer": "A",
                    "explanation": "penjelasan jawaban"
                }`,
                max_tokens: 500,
                temperature: 0.7
            })
        })
        .then(response => response.json())
        .then(data => {
            try {
                // Parse hasil dari AI
                const result = JSON.parse(data.choices[0].text.trim());
                
                // Isi form dengan hasil dari AI
                document.getElementById('editQuestionText').value = result.question;
                document.getElementById('editOptionA').value = result.options.A;
                document.getElementById('editOptionB').value = result.options.B;
                document.getElementById('editOptionC').value = result.options.C;
                document.getElementById('editOptionD').value = result.options.D;
                document.getElementById('editOptionE').value = result.options.E;
                document.getElementById('editCorrectAnswer').value = result.correctAnswer;
                document.getElementById('editExplanation').value = result.explanation;
            } catch (e) {
                console.error('Error parsing AI response:', e);
                alert('Gagal memproses respons AI. Silakan coba lagi dengan prompt yang lebih jelas.');
            }
        })
        .catch(error => {
            console.error('Error calling AI API:', error);
            alert('Terjadi kesalahan saat memanggil API AI. Pastikan API Key valid dan koneksi internet stabil.');
        })
        .finally(() => {
            generateBtn.disabled = false;
            generateBtn.innerHTML = 'Generate Soal dengan AI';
        });
    });
    
    // Event listener untuk filter dan pencarian bank soal
    document.getElementById('questionCategoryFilter').addEventListener('change', loadQuestionBank);
    document.getElementById('questionSearch').addEventListener('input', loadQuestionBank);
    
    // Event listener untuk tombol tambah soal
    document.getElementById('addQuestionBtn').addEventListener('click', function() {
        openQuestionEditor();
    });
    
    // Event listener untuk tombol impor soal
    document.getElementById('importQuestionsBtn').addEventListener('click', function() {
        alert('Fitur impor soal akan datang!');
    });
    
    // Event listener untuk tombol ekspor soal
    document.getElementById('exportQuestionsBtn').addEventListener('click', function() {
        const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
        if (questionBank.length === 0) {
            alert('Tidak ada soal untuk diekspor!');
            return;
        }
        
        const dataStr = JSON.stringify(questionBank, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const exportName = 'bank-soal-pergunu-' + new Date().toISOString().slice(0, 10) + '.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportName);
        linkElement.click();
    });
    
    // Load data saat pertama kali membuka admin panel
    if (document.getElementById('adminModal')) {
        loadAdminData();
    }
});

// Fungsi untuk memulai timer ujian
function startExamTimer() {
    const examTimer = parseInt(localStorage.getItem('examTimer')) || 120;
    let timeLeft = examTimer * 60; // dalam detik
    
    const timerElement = document.getElementById('examTimer');
    const timeWarningElement = document.getElementById('timeWarning');
    
    const timer = setInterval(() => {
        timeLeft--;
        
        // Update tampilan timer
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        // Tampilkan peringatan jika sisa waktu 10 menit
        if (timeLeft === 600) {
            timeWarningElement.style.display = 'block';
        }
        
        // Sembunyikan peringatan jika sisa waktu 1 menit
        if (timeLeft === 60) {
            timeWarningElement.style.display = 'none';
        }
        
        // Ubah ukuran timer jika sisa waktu 10 menit
        if (timeLeft <= 600) {
            timerElement.style.fontSize = '32px';
            timerElement.style.color = 'var(--warning-color)';
        }
        
        // Jika waktu habis
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerElement.textContent = '00:00';
            finishExam();
        }
    }, 1000);
    
    // Simpan timer untuk bisa di-clear nanti
    localStorage.setItem('currentTimer', timer);
}

// Fungsi untuk memuat soal ujian
function loadQuestions() {
    const selectedSubject = localStorage.getItem('selectedSubject');
    const questionBank = JSON.parse(localStorage.getItem('questionBank')) || [];
    
    // Filter soal berdasarkan kategori/subject
    const subjectQuestions = questionBank.filter(question => question.category === selectedSubject);
    
    if (subjectQuestions.length === 0) {
        // Jika tidak ada soal, tampilkan pesan dan redirect
        alert('Tidak ada soal yang tersedia untuk kategori ini!');
        window.location.reload();
        return;
    }
    
    // Acak urutan soal jika di-setting
    const randomize = localStorage.getItem('randomizeQuestions') === 'true';
    if (randomize) {
        subjectQuestions.sort(() => Math.random() - 0.5);
    }
    
    // Ambil jumlah soal yang di-setting
    const questionCount = parseInt(localStorage.getItem('questionCount')) || 10;
    const examQuestions = subjectQuestions.slice(0, questionCount);
    
    // Simpan soal ujian ke localStorage
    localStorage.setItem('examQuestions', JSON.stringify(examQuestions));
    localStorage.setItem('currentQuestionIndex', '0');
    localStorage.setItem('correctAnswers', '0');
    localStorage.setItem('wrongAnswers', '0');
    
    // Tampilkan soal pertama
    showQuestion(0);
}

// Fungsi untuk menampilkan soal
function showQuestion(index) {
    const examQuestions = JSON.parse(localStorage.getItem('examQuestions'));
    const currentQuestion = examQuestions[index];
    
    // Update tampilan soal
    document.getElementById('questionText').textContent = currentQuestion.question;
    document.getElementById('optionA').textContent = currentQuestion.options.A;
    document.getElementById('optionB').textContent = currentQuestion.options.B;
    document.getElementById('optionC').textContent = currentQuestion.options.C;
    document.getElementById('optionD').textContent = currentQuestion.options.D;
    document.getElementById('optionE').textContent = currentQuestion.options.E;
    
    // Update progress
    document.getElementById('currentQuestion').textContent = index + 1;
    document.getElementById('totalQuestions').textContent = examQuestions.length;
    
    // Reset pilihan jawaban
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('correct', 'wrong');
        option.style.pointerEvents = 'auto';
    });
    
    // Sembunyikan penjelasan jawaban
    document.getElementById('answerExplanation').style.display = 'none';
    document.getElementById('explanationText').textContent = currentQuestion.explanation;
    
    // Event listener untuk pilihan jawaban
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            selectAnswer(this, currentQuestion);
        });
    });
}

// Fungsi untuk memilih jawaban
function selectAnswer(selectedOption, question) {
    const selectedAnswer = selectedOption.dataset.option;
    const correctAnswer = question.correctAnswer;
    
    // Nonaktifkan semua pilihan
    document.querySelectorAll('.option').forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Tandai jawaban yang benar
    document.querySelector(`.option[data-option="${correctAnswer}"]`).classList.add('correct');
    
    // Jika jawaban salah, tandai jawaban yang dipilih sebagai salah
    if (selectedAnswer !== correctAnswer) {
        selectedOption.classList.add('wrong');
        
        // Mainkan suara jawaban salah
        document.getElementById('wrongAudio').play();
    } else {
        // Mainkan suara jawaban benar
        document.getElementById('correctAudio').play();
        
        // Update skor
        const correctAnswers = parseInt(localStorage.getItem('correctAnswers')) + 1;
        localStorage.setItem('correctAnswers', correctAnswers.toString());
    }
    
    // Tampilkan penjelasan jawaban
    document.getElementById('answerExplanation').style.display = 'block';
    
    // Scroll ke penjelasan jawaban
    document.getElementById('answerExplanation').scrollIntoView({ behavior: 'smooth' });
}

// Fungsi untuk menyelesaikan ujian
function finishExam() {
    // Hentikan timer
    clearInterval(parseInt(localStorage.getItem('currentTimer')));
    
    // Hitung skor
    const correctAnswers = parseInt(localStorage.getItem('correctAnswers')) || 0;
    const wrongAnswers = parseInt(localStorage.getItem('wrongAnswers')) || 0;
    const totalQuestions = JSON.parse(localStorage.getItem('examQuestions')).length;
    const skippedQuestions = totalQuestions - correctAnswers - wrongAnswers;
    
    // Hitung nilai
    const questionPoints = parseInt(localStorage.getItem('questionPoints')) || 1;
    const score = correctAnswers * questionPoints;
    const maxScore = totalQuestions * questionPoints;
    const percentage = Math.round((score / maxScore) * 100);
    
    // Simpan hasil ujian
    const participantData = JSON.parse(localStorage.getItem('participantData'));
    const examResult = {
        participant: participantData,
        date: new Date().toISOString(),
        subject: localStorage.getItem('selectedSubject'),
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
        skippedQuestions: skippedQuestions,
        score: score,
        maxScore: maxScore,
        percentage: percentage
    };
    
    // Simpan ke riwayat ujian
    const examHistory = JSON.parse(localStorage.getItem('examHistory')) || [];
    examHistory.push(examResult);
    localStorage.setItem('examHistory', JSON.stringify(examHistory));
    
    // Pindah ke halaman hasil
    document.getElementById('examScreen').classList.remove('slide-in');
    document.getElementById('examScreen').classList.add('slide-out');
    
    setTimeout(() => {
        document.getElementById('examScreen').style.display = 'none';
        document.getElementById('resultsScreen').style.display = 'block';
        document.getElementById('resultsScreen').classList.remove('slide-out');
        document.getElementById('resultsScreen').classList.add('slide-in');
        
        // Tampilkan hasil
        document.getElementById('correctAnswers').textContent = correctAnswers;
        document.getElementById('wrongAnswers').textContent = wrongAnswers;
        document.getElementById('skippedQuestions').textContent = skippedQuestions;
        document.getElementById('finalScore').textContent = `${score}/${maxScore} (${percentage}%)`;
        
        // Event listener untuk tombol lihat sertifikat
        document.getElementById('viewCertificateBtn').addEventListener('click', function() {
            showCertificate(examResult);
        });
        
        // Event listener untuk tombol ulangi ujian
        document.getElementById('retryExamBtn').addEventListener('click', function() {
            document.getElementById('resultsScreen').classList.remove('slide-in');
            document.getElementById('resultsScreen').classList.add('slide-out');
            
            setTimeout(() => {
                document.getElementById('resultsScreen').style.display = 'none';
                document.getElementById('levelScreen').style.display = 'block';
                document.getElementById('levelScreen').classList.remove('slide-out');
                document.getElementById('levelScreen').classList.add('slide-in');
            }, 500);
        });
    }, 500);
}

// Fungsi untuk menampilkan sertifikat
function showCertificate(examResult) {
    document.getElementById('resultsScreen').classList.remove('slide-in');
    document.getElementById('resultsScreen').classList.add('slide-out');
    
    setTimeout(() => {
        document.getElementById('resultsScreen').style.display = 'none';
        document.getElementById('certificateScreen').style.display = 'flex';
        document.getElementById('certificateScreen').classList.remove('slide-out');
        document.getElementById('certificateScreen').classList.add('slide-in');
        
        // Isi data sertifikat
        const participantData = examResult.participant;
        const date = new Date(examResult.date);
        const formattedDate = date.toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
        
        // Generate kode sertifikat
        const certificateCode = generateCertificateCode(participantData, examResult, date);
        
        // Tampilkan data
        document.getElementById('certificateName').textContent = participantData.fullName;
        document.getElementById('certificateScore').textContent = `${examResult.percentage}%`;
        document.getElementById('certificateDate').textContent = formattedDate;
        document.getElementById('certificateCode').textContent = certificateCode;
        
        // Tampilkan pesan motivasi berdasarkan skor
        const motivationMessages = JSON.parse(localStorage.getItem('motivationMessages')) || [
            'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.',
            'Kerja bagus! Anda telah menunjukkan pemahaman yang baik terhadap materi ujian.'
        ];
        
        let motivationIndex = 0;
        if (examResult.percentage >= 90) {
            motivationIndex = 0;
        } else if (examResult.percentage >= 70) {
            motivationIndex = 1;
        } else {
            motivationIndex = Math.min(motivationMessages.length - 1, 2);
        }
        
        document.getElementById('certificateMotivation').textContent = motivationMessages[motivationIndex] || motivationMessages[0];
        
        // Tampilkan nama ketua
        const chairmanName = localStorage.getItem('chairmanName') || 'Moh. Nuril Hudha, S.Pd., M.Si.';
        document.getElementById('signerName').textContent = chairmanName;
        
        // Mainkan suara applause
        document.getElementById('applauseAudio').play();
        
        // Event listener untuk tombol cetak sertifikat
        document.getElementById('printCertificateBtn').addEventListener('click', function() {
            printCertificate();
        });
        
        // Event listener untuk tombol kembali ke hasil
        document.getElementById('backToResultsBtn').addEventListener('click', function() {
            document.getElementById('certificateScreen').classList.remove('slide-in');
            document.getElementById('certificateScreen').classList.add('slide-out');
            
            setTimeout(() => {
                document.getElementById('certificateScreen').style.display = 'none';
                document.getElementById('resultsScreen').style.display = 'block';
                document.getElementById('resultsScreen').classList.remove('slide-out');
                document.getElementById('resultsScreen').classList.add('slide-in');
            }, 500);
        });
    }, 500);
}

// Fungsi untuk generate kode sertifikat
function generateCertificateCode(participantData, examResult, date) {
    const namePart = participantData.fullName.replace(/\s+/g, '').toUpperCase().substring(0, 5);
    const statusPart = participantData.status === 'pelajar' ? 'PELAJAR' : 'UMUM';
    const levelPart = participantData.schoolLevel || 'UMUM';
    const subjectPart = examResult.subject.replace(/_/g, '').substring(0, 5).toUpperCase();
    const datePart = date.getDate().toString().padStart(2, '0') + 
                    (date.getMonth() + 1).toString().padStart(2, '0') + 
                    date.getFullYear().toString().substring(2);
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + 
                      Math.random().toString(36).substring(2, 6).toUpperCase();
    
    return `${namePart}/${statusPart}/${levelPart}/${subjectPart}/${datePart}/${randomPart}/PERGUNU-STB`;
}

// Fungsi untuk mencetak sertifikat
function printCertificate() {
    const printContent = document.getElementById('certificateToPrint').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
}
