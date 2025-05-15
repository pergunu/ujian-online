import AppConfig from './config.js';
import { playSound, toggleBackgroundMusic } from './audio.js';
import { createConfetti } from './ui.js';

// Variabel state quiz
let quizState = {
    currentCategory: 'pelajar',
    currentSubcategory: 'ipa',
    currentLevel: 'mudah',
    currentQuestionIndex: 0,
    score: 0,
    timer: null,
    quizStartTime: null,
    questions: {} // Akan diisi dengan data soal
};

// Inisialisasi quiz
export function initQuiz() {
    loadQuestions();
    setupEventListeners();
}

// Fungsi untuk memuat soal
function loadQuestions() {
    // Di sini Anda akan memuat soal dari sumber data
    // Untuk sementara kita gunakan contoh sederhana
    quizState.questions = {
        pelajar: {
            ipa: {
                mudah: [
                    {
                        id: 1,
                        question: "Organ apa yang bertanggung jawab untuk memompa darah ke seluruh tubuh?",
                        options: ["Jantung", "Paru-paru", "Hati", "Ginjal"],
                        answer: 0,
                        explanation: "Jantung adalah organ yang bertugas memompa darah ke seluruh tubuh melalui sistem peredaran darah."
                    }
                    // Tambahkan soal lainnya
                ]
            }
            // Tambahkan kategori lainnya
        }
        // Tambahkan tipe lainnya
    };
}

// Fungsi untuk memulai quiz
export function startQuiz(participantData) {
    // Validasi data peserta
    if (!participantData.name || !participantData.phone) {
        alert('Silakan isi nama lengkap dan nomor HP terlebih dahulu');
        return false;
    }
    
    // Set state quiz
    quizState.currentCategory = participantData.category;
    quizState.currentSubcategory = participantData.subcategory;
    quizState.currentLevel = participantData.level;
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.quizStartTime = new Date();
    
    // Update UI
    updateQuizInfoDisplay();
    
    // Mulai timer
    startTimer(AppConfig.defaultQuizTime);
    
    // Load pertanyaan pertama
    loadQuestion();
    
    return true;
}

// Fungsi untuk memuat pertanyaan
function loadQuestion() {
    const question = getCurrentQuestion();
    
    // Update UI pertanyaan
    // ...
    
    // Set opsi jawaban
    // ...
}

// Fungsi untuk menangani jawaban
export function handleAnswerSelection(selectedIndex) {
    const question = getCurrentQuestion();
    const isCorrect = selectedIndex === question.answer;
    
    // Update state
    question.userAnswer = selectedIndex;
    question.isCorrect = isCorrect;
    
    // Update score jika benar
    if (isCorrect) {
        quizState.score++;
        playSound('correctSound');
    } else {
        playSound('wrongSound');
    }
    
    // Update UI
    // ...
}

// Fungsi helper untuk mendapatkan pertanyaan saat ini
function getCurrentQuestion() {
    return quizState.questions[quizState.currentCategory]
        [quizState.currentSubcategory]
        [quizState.currentLevel][quizState.currentQuestionIndex];
}
