let currentCategory = '';
let currentSubcategory = '';
let currentLevel = '';
let currentQuestionIndex = 0;
let score = 0;
let quizStartTime = null;
let timer = null;

function startQuiz() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (!name || !phone) {
        alert('Silakan isi nama lengkap dan nomor HP terlebih dahulu');
        return;
    }

    // Validasi apakah kategori aktif
    if (!enabledCategories[currentCategory]) {
        alert("Kategori ini sedang tidak tersedia!");
        return;
    }

    // Validasi apakah subkategori aktif
    if (!enabledCategories.subcategories[currentCategory]?.[currentSubcategory]) {
        alert("Subkategori ini sedang tidak tersedia!");
        return;
    }

    // Sembunyikan form pendaftaran
    document.getElementById('participantForm').style.display = 'none';

    // Tampilkan level selection
    document.getElementById('levelSelection').classList.remove('hidden');

    // Update informasi di sertifikat
    document.getElementById('participantName').textContent = formatName(name);
    document.getElementById('categoryDisplay').textContent = currentCategory === 'pelajar' ? 'Pelajar' : 'Umum';
}

function loadQuestions() {
    const level = document.getElementById('levelSelect').value;
    currentLevel = level;

    // Ambil soal dari JSON atau database
    const availableQuestions = questions[currentCategory][currentSubcategory][currentLevel];

    if (!availableQuestions || availableQuestions.length === 0) {
        alert('Belum ada soal untuk kategori, subkategori, dan level yang dipilih!');
        return;
    }

    // Update UI
    document.getElementById('levelSelection').style.display = 'none';
    document.getElementById('quizContainer').classList.remove('hidden');
    document.getElementById('floatingButtons').classList.remove('hidden');

    // Mulai timer (90 menit)
    startTimer(90 * 60);

    // Mainkan musik latar
    playQuizMusic();

    // Muat pertanyaan pertama
    loadQuestion();
}

function loadQuestion() {
    const container = document.getElementById('questionContainer');
    const question = questions[currentCategory][currentSubcategory][currentLevel][currentQuestionIndex];

    // Bersihkan konten sebelumnya
    container.innerHTML = '';

    // Tambahkan nomor soal
    const questionNumber = document.createElement('div');
    questionNumber.id = 'questionNumber';
    questionNumber.textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${questions[currentCategory][currentSubcategory][currentLevel].length}`;
    container.appendChild(questionNumber);

    // Tambahkan teks soal
    const questionText = document.createElement('p');
    questionText.textContent = question.question;
    container.appendChild(questionText);

    // Tambahkan opsi jawaban
    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.className = 'option-label';
        label.innerHTML = `
            <input type="radio" name="answer" value="${option}" onchange="handleAnswer(this)">
            ${option}
        `;
        container.appendChild(label);
    });

    // Tampilkan tombol navigasi
    document.getElementById
