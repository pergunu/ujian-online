document.addEventListener('DOMContentLoaded', function() {
    // Toggle form sekolah/profesi berdasarkan kategori
    const umumRadio = document.querySelector('input[value="umum"]');
    const pelajarRadio = document.querySelector('input[value="pelajar"]');
    const professionField = document.getElementById('profession-field');
    const schoolField = document.getElementById('school-field');

    function toggleFields() {
        if (umumRadio.checked) {
            professionField.style.display = 'block';
            schoolField.style.display = 'none';
        } else {
            professionField.style.display = 'none';
            schoolField.style.display = 'block';
        }
    }

    umumRadio.addEventListener('change', toggleFields);
    pelajarRadio.addEventListener('change', toggleFields);

    // Form submission
    const participantForm = document.getElementById('participant-form');
    participantForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validasi form
        const name = document.getElementById('name').value.trim();
        const age = document.getElementById('age').value;
        const phone = document.getElementById('phone').value.trim();
        const agreeTerms = document.getElementById('agree-terms').checked;
        
        if (!name || !age || !phone || !agreeTerms) {
            alert('Harap isi semua field yang wajib dan setujui syarat dan ketentuan');
            return;
        }
        
        // Kumpulkan data peserta
        const participantData = {
            name: name,
            category: document.querySelector('input[name="category"]:checked').value,
            age: age,
            phone: phone,
            profession: document.getElementById('profession').value.trim(),
            school: document.getElementById('school').value.trim()
        };
        
        // Simpan data ke localStorage
        localStorage.setItem('quizParticipant', JSON.stringify(participantData));
        
        // Sembunyikan form registrasi
        document.getElementById('registration-form').classList.remove('active');
        
        // Tampilkan quiz container
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.style.display = 'block';
        quizContainer.classList.add('active');
        
        // Inisialisasi quiz
        initializeQuiz(participantData);
    });

    // Fungsi inisialisasi quiz
    function initializeQuiz(participantData) {
        // Implementasi quiz engine akan ditambahkan di sini
        console.log('Quiz dimulai untuk:', participantData);
        
        // Contoh sederhana:
        quizContainer.innerHTML = `
            <div class="quiz-header">
                <h2>Quiz PERGUNU</h2>
                <p>Selamat mengerjakan, ${participantData.name}!</p>
            </div>
            <div class="quiz-content">
                <div class="question-container">
                    <p>Fitur quiz akan segera tersedia. Silakan cek kembali nanti.</p>
                </div>
            </div>
        `;
    }
});
