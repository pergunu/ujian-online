// Fungsi-fungsi tambahan untuk manajemen kuis
// (Dalam aplikasi lengkap, ini akan berisi lebih banyak fungsi)

// Fungsi untuk memuat soal dari file JSON
async function loadQuestionsFromFile(subject) {
    try {
        const response = await fetch(`questions/${subject}.json`);
        if (!response.ok) {
            throw new Error('File soal tidak ditemukan');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading questions:', error);
        return [];
    }
}

// Fungsi untuk mengacak urutan soal
function shuffleQuestions(questions) {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
}

// Fungsi untuk mengacak pilihan jawaban
function shuffleOptions(question) {
    // Simpan jawaban yang benar
    const correctAnswer = question.options[question.answer];
    
    // Acak pilihan jawaban
    for (let i = question.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [question.options[i], question.options[j]] = [question.options[j], question.options[i]];
    }
    
    // Update index jawaban yang benar
    question.answer = question.options.indexOf(correctAnswer);
    
    return question;
}
