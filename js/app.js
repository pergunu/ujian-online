document.addEventListener('DOMContentLoaded', function() {
    // Debug awal
    console.log("Script loaded successfully!");
    
    // 1. Fix: Toggle field sekolah/profesi
    const umumRadio = document.getElementById('umum-radio');
    const pelajarRadio = document.getElementById('pelajar-radio');
    const professionField = document.getElementById('profession-field');
    const schoolField = document.getElementById('school-field');

    function toggleFields() {
        professionField.style.display = umumRadio.checked ? 'block' : 'none';
        schoolField.style.display = pelajarRadio.checked ? 'block' : 'none';
    }

    umumRadio.addEventListener('change', toggleFields);
    pelajarRadio.addEventListener('change', toggleFields);
    toggleFields(); // Init pertama kali

    // 2. Fix: Form submission
    const participantForm = document.getElementById('participant-form');
    
    participantForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log("Form submitted!"); // Debug
        
        if (!validateForm()) {
            alert("Harap isi semua field wajib!");
            return;
        }

        startQuiz();
    });

    // 3. Fix: Validasi terintegrasi
    function validateForm() {
        const requiredFields = [
            { id: 'name-input', name: 'Nama Lengkap' },
            { id: 'age-input', name: 'Usia' },
            { id: 'phone-input', name: 'Nomor HP' }
        ];

        for (const field of requiredFields) {
            const element = document.getElementById(field.id);
            if (!element.value.trim()) {
                alert(`${field.name} harus diisi!`);
                element.focus();
                return false;
            }
        }

        // Validasi khusus pelajar
        if (pelajarRadio.checked && !document.getElementById('school-input').value.trim()) {
            alert("Nama sekolah harus diisi untuk kategori pelajar!");
            return false;
        }

        // Validasi checkbox
        if (!document.getElementById('agree-terms-checkbox').checked) {
            alert("Anda harus menyetujui syarat dan ketentuan!");
            return false;
        }

        return true;
    }

    // 4. Fix: Mulai quiz dengan animasi
    function startQuiz() {
        const participantData = {
            name: document.getElementById('name-input').value.trim(),
            category: document.querySelector('input[name="category"]:checked').value,
            age: document.getElementById('age-input').value,
            phone: document.getElementById('phone-input').value.trim(),
            profession: document.getElementById('profession-input').value.trim(),
            school: document.getElementById('school-input').value.trim()
        };

        // Simpan data
        localStorage.setItem('quizParticipant', JSON.stringify(participantData));

        // Animasi transisi
        const registrationForm = document.getElementById('registration-form');
        registrationForm.style.opacity = '0';
        
        setTimeout(() => {
            registrationForm.style.display = 'none';
            
            // Tampilkan quiz
            const quizContainer = document.getElementById('quiz-container');
            quizContainer.innerHTML = `
                <div class="quiz-start-animation">
                    <h2>Quiz Siap Dimulai!</h2>
                    <p>Halo, ${participantData.name}!</p>
                    <button id="start-quiz-btn" class="btn-primary">Mulai Sekarang</button>
                </div>
            `;
            
            quizContainer.style.display = 'block';
            
            // Event listener untuk tombol mulai
            document.getElementById('start-quiz-btn').addEventListener('click', function() {
                // Implementasi quiz engine di sini
                console.log("Quiz dimulai untuk:", participantData);
                alert("Quiz akan segera dimulai!"); // Placeholder
            });
        }, 500);
    }
});
