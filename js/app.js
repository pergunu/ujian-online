document.addEventListener('DOMContentLoaded', function() {
    // 1. Toggle form sekolah/profesi
    const umumRadio = document.querySelector('input[value="umum"]');
    const pelajarRadio = document.querySelector('input[value="pelajar"]');
    const professionField = document.getElementById('profession-field');
    const schoolField = document.getElementById('school-field');

    function toggleFields() {
        professionField.style.display = umumRadio.checked ? 'block' : 'none';
        schoolField.style.display = pelajarRadio.checked ? 'block' : 'none';
    }

    umumRadio.addEventListener('change', toggleFields);
    pelajarRadio.addEventListener('change', toggleFields);

    // 2. Form submission fix
    const participantForm = document.getElementById('participant-form');
    participantForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validasi lengkap
        if (!validateForm()) {
            return;
        }
        
        // Kumpulkan data
        const participantData = collectFormData();
        
        // Simpan data dan mulai quiz
        startQuiz(participantData);
    });

    // Fungsi validasi form
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value;
        const phone = document.getElementById('phone').value.trim();
        const agreeTerms = document.getElementById('agree-terms').checked;
        
        // Validasi dasar
        if (!name) {
            alert('Nama lengkap harus diisi');
            return false;
        }
        
        if (!age || age < 10 || age > 100) {
            alert('Usia harus antara 10-100 tahun');
            return false;
        }
        
        if (!phone) {
            alert('Nomor HP harus diisi');
            return false;
        }
        
        if (!agreeTerms) {
            alert('Anda harus menyetujui syarat dan ketentuan');
            return false;
        }
        
        // Validasi khusus kategori
        const isPelajar = document.querySelector('input[value="pelajar"]:checked');
        if (isPelajar && !document.getElementById('school').value.trim()) {
            alert('Nama sekolah/universitas harus diisi');
            return false;
        }
        
        return true;
    }

    // Fungsi kumpulkan data form
    function collectFormData() {
        return {
            name: document.getElementById('name').value.trim(),
            category: document.querySelector('input[name="category"]:checked').value,
            age: document.getElementById('age').value,
            phone: document.getElementById('phone').value.trim(),
            profession: document.getElementById('profession').value.trim(),
            school: document.getElementById('school').value.trim(),
            timestamp: new Date().toISOString()
        };
    }

    // Fungsi mulai quiz
    function startQuiz(participantData) {
        // Simpan data ke localStorage
        localStorage.setItem('quizParticipant', JSON.stringify(participantData));
        
        // Animasi transisi
        const registrationForm = document.getElementById('registration-form');
        registrationForm.classList.add('fade-out');
        
        // Tunggu animasi selesai sebelum menyembunyikan
        setTimeout(() => {
            registrationForm.style.display = 'none';
            
            // Tampilkan quiz container
            const quizContainer = document.getElementById('quiz-container');
            quizContainer.style.display = 'block';
            quizContainer.classList.add('fade-in');
            
            // Inisialisasi quiz (contoh sederhana)
            initializeQuiz(participantData);
        }, 500);
    }

    // Fungsi inisialisasi quiz (sementara)
    function initializeQuiz(participantData) {
        const quizContainer = document.getElementById('quiz-container');
        
        // Contoh tampilan quiz sederhana
        quizContainer.innerHTML = `
            <div class="quiz-header">
                <h2>Quiz PERGUNU</h2>
                <div class="participant-info">
                    <p>Peserta: ${participantData.name}</p>
                    <p>Kategori: ${participantData.category === 'pelajar' ? 'Pelajar' : 'Umum'}</p>
                </div>
                <div class="quiz-meta">
                    <span class="timer">00:60:00</span>
                    <span class="question-counter">Soal 1/100</span>
                </div>
            </div>
            
            <div class="question-container">
                <div class="question-card">
                    <h3>Contoh Pertanyaan</h3>
                    <p>Apa ibukota Indonesia?</p>
                    
                    <div class="options-container">
                        <div class="option">
                            <span class="option-letter">A</span>
                            <span class="option-text">Jakarta</span>
                        </div>
                        <div class="option">
                            <span class="option-letter">B</span>
                            <span class="option-text">Bandung</span>
                        </div>
                        <div class="option">
                            <span class="option-letter">C</span>
                            <span class="option-text">Surabaya</span>
                        </div>
                        <div class="option">
                            <span class="option-letter">D</span>
                            <span class="option-text">Medan</span>
                        </div>
                    </div>
                </div>
                
                <div class="quiz-controls">
                    <button class="btn-next">Lanjut</button>
                </div>
            </div>
        `;
        
        // Tambahkan event listener untuk opsi jawaban
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
                // Hapus seleksi sebelumnya
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Tandai yang dipilih
                this.classList.add('selected');
            });
        });
    }
});
