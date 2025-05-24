// Variabel Ujian
let currentQuestion = 0;
let questions = [];
let userAnswers = [];
const examDuration = 120 * 60; // 120 menit dalam detik

// Inisialisasi Ujian
document.addEventListener('DOMContentLoaded', function() {
    loadQuestions();
    startTimer();
    displayQuestion();
    
    // Event Listeners
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', selectAnswer);
    });
    
    document.getElementById('prev-btn').addEventListener('click', prevQuestion);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('submit-btn').addEventListener('click', submitExam);
});

// Muat soal dari localStorage atau API
function loadQuestions() {
    // Contoh data soal (bisa diganti dengan fetch dari API)
    questions = [
        {
            id: 1,
            text: "Apa ibukota Jawa Timur?",
            options: {
                A: "Surabaya",
                B: "Malang",
                C: "Jakarta",
                D: "Bandung",
                E: "Semarang"
            },
            correctAnswer: "A",
            explanation: "Ibukota Jawa Timur adalah Surabaya"
        }
        // Tambahkan lebih banyak soal...
    ];
    
    document.getElementById('total-questions').textContent = questions.length;
}

// Tampilkan soal
function displayQuestion() {
    if (currentQuestion < 0 || currentQuestion >= questions.length) return;
    
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.text;
    
    // Tampilkan opsi jawaban
    for (const [key, value] of Object.entries(question.options)) {
        document.getElementById(`option-${key.toLowerCase()}`).textContent = value;
    }
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progress}%`;
    document.getElementById('current-question').textContent = currentQuestion + 1;
    
    // Sembunyikan penjelasan
    document.getElementById('explanation').classList.add('hidden');
    
    // Tampilkan jawaban user jika ada
    if (userAnswers[currentQuestion]) {
        highlightAnswer(userAnswers[currentQuestion], question.correctAnswer);
    }
    
    // Update tombol navigasi
    updateNavigationButtons();
}

// Fungsi-fungsi pendukung lainnya...
// (Lengkapi dengan fungsi selectAnswer, nextQuestion, prevQuestion, dll)
