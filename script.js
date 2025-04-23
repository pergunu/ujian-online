// DOM Elements
const registrationForm = document.getElementById('registration-form');
const userForm = document.getElementById('user-form');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const termsModal = document.getElementById('terms-modal');
const showTermsBtn = document.getElementById('show-terms');
const closeTermsBtn = document.getElementById('close-terms');
const prayerNotification = document.getElementById('prayer-notification');
const closePrayerBtn = document.getElementById('close-prayer-notification');
const adzanAudio = document.getElementById('adzan-audio');

// Form elements
const categoryRadios = document.querySelectorAll('input[name="category"]');
const profesiGroup = document.getElementById('profesi-group');
const sekolahGroup = document.getElementById('sekolah-group');

// Quiz elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const timerElement = document.getElementById('timer');
const quizCategoryDisplay = document.getElementById('quiz-category-display');
const quizLevelDisplay = document.getElementById('quiz-level-display');
const questionCountDisplay = document.getElementById('question-count');
const resetBtn = document.getElementById('reset-btn');
const nextBtn = document.getElementById('next-btn');
const finishBtn = document.getElementById('finish-btn');

// Result elements
const resultName = document.getElementById('result-name');
const resultCategory = document.getElementById('result-category');
const resultLevel = document.getElementById('result-level');
const scoreElement = document.getElementById('score');
const scoreMessage = document.getElementById('score-message');
const moralMessage = document.getElementById('moral-message');
const correctAnswers = document.getElementById('correct-answers');
const totalQuestions = document.getElementById('total-questions');
const timeRemaining = document.getElementById('time-remaining');
const restartBtn = document.getElementById('restart-btn');
const shareBtn = document.getElementById('share-btn');
const likeBtn = document.getElementById('like-btn');

// Quiz variables
let currentQuestionIndex = 0;
let questions = [];
let userAnswers = [];
let score = 0;
let timer;
let timeLeft = 60 * 60; // 60 minutes in seconds
let quizStarted = false;
let userData = {};

// Prayer times (in 24-hour format)
const prayerTimes = {
    shubuh: '04:30',
    dzuhur: '12:00',
    ashar: '15:30',
    maghrib: '18:00',
    isya: '19:30'
};

// Event Listeners
userForm.addEventListener('submit', startQuiz);
showTermsBtn.addEventListener('click', showTerms);
closeTermsBtn.addEventListener('click', closeTerms);
categoryRadios.forEach(radio => {
    radio.addEventListener('change', toggleCategoryFields);
});
resetBtn.addEventListener('click', resetQuestion);
nextBtn.addEventListener('click', nextQuestion);
finishBtn.addEventListener('click', finishQuiz);
restartBtn.addEventListener('click', restartQuiz);
shareBtn.addEventListener('click', shareResult);
likeBtn.addEventListener('click', showLikeEffect);
closePrayerBtn.addEventListener('click', closePrayerNotification);

// Initialize
toggleCategoryFields();
checkPrayerTimes();
setInterval(checkPrayerTimes, 60000); // Check every minute

// Functions
function toggleCategoryFields() {
    const selectedCategory = document.querySelector('input[name="category"]:checked').value;
    if (selectedCategory === 'pelajar') {
        profesiGroup.classList.add('hidden');
        sekolahGroup.classList.remove('hidden');
        document.getElementById('sekolah').required = true;
        document.getElementById('profesi').required = false;
    } else {
        profesiGroup.classList.remove('hidden');
        sekolahGroup.classList.add('hidden');
        document.getElementById('profesi').required = true;
        document.getElementById('sekolah').required = false;
    }
}

function showTerms(e) {
    e.preventDefault();
    termsModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeTerms() {
    termsModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function startQuiz(e) {
    e.preventDefault();
    
    // Get user data
    userData = {
        name: document.getElementById('name').value,
        category: document.querySelector('input[name="category"]:checked').value,
        profesi: document.getElementById('profesi').value,
        sekolah: document.getElementById('sekolah').value,
        age: document.getElementById('age').value,
        phone: document.getElementById('phone').value,
        quizCategory: document.getElementById('quiz-category').value,
        quizLevel: document.getElementById('quiz-level').value
    };
    
    // Hide registration form and show quiz
    registrationForm.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    
    // Set quiz info
    quizCategoryDisplay.textContent = `Kategori: ${getCategoryName(userData.quizCategory)}`;
    quizLevelDisplay.textContent = `Tingkat: ${getLevelName(userData.quizLevel)}`;
    
    // Generate questions based on category and level
    generateQuestions(userData.quizCategory, userData.quizLevel);
    
    // Start timer
    startTimer();
    
    // Show first question
    showQuestion();
}

// Fungsi-fungsi lainnya sama seperti sebelumnya
// ... (termasuk semua fungsi yang ada di kode sebelumnya)

function checkPrayerTimes() {
    const now = new Date();
    const currentHours = now.getHours().toString().padStart(2, '0');
    const currentMinutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;
    
    // Check each prayer time
    for (const [prayer, time] of Object.entries(prayerTimes)) {
        if (currentTime === time) {
            showPrayerNotification(prayer);
            break;
        }
    }
}

function showPrayerNotification(prayer) {
    const prayerNames = {
        shubuh: 'Shubuh',
        dzuhur: 'Dzuhur',
        ashar: 'Ashar',
        maghrib: 'Maghrib',
        isya: 'Isya'
    };
    
    document.getElementById('prayer-time-message').textContent = 
        `Waktu ${prayerNames[prayer]} telah tiba. Mari berhenti sejenak untuk menunaikan ibadah.`;
    
    prayerNotification.style.display = 'block';
    adzanAudio.play();
}

function closePrayerNotification() {
    prayerNotification.style.display = 'none';
    adzanAudio.pause();
    adzanAudio.currentTime = 0;
}