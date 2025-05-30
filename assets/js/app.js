// app.js - Main Application Logic

// Global Variables
let currentScreen = 'opening';
let participantData = {};
let examData = {
    category: '',
    level: '',
    questions: [],
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    timer: null,
    timeLeft: 120 * 60 // 120 minutes in seconds
};

// DOM Elements
const screens = {
    opening: document.getElementById('openingScreen'),
    terms: document.getElementById('termsScreen'),
    dataForm: document.getElementById('dataFormScreen'),
    level: document.getElementById('levelScreen'),
    exam: document.getElementById('examScreen'),
    results: document.getElementById('resultsScreen'),
    admin: document.getElementById('adminScreen')
};

const audioElements = {
    opening: document.getElementById('openingAudio'),
    applause: document.getElementById('applauseAudio'),
    correct: document.getElementById('correctAudio'),
    wrong: document.getElementById('wrongAudio'),
    button: document.getElementById('buttonAudio')
};

// Initialize the application
function initApp() {
    // Load saved data
    loadSavedData();
    
    // Initialize particles
    initParticles();
    
    // Play opening audio
    playOpeningAudio();
    
    // Set initial greeting text
    setGreetingText();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check for admin access
    checkAdminAccess();
}

// Load saved data from localStorage
function loadSavedData() {
    // Load from localStorage or use defaults
    // Implement your data loading logic here
}

// Initialize particles.js
function initParticles() {
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {
        console.log('Particles.js loaded');
    });
}

// Play opening audio
function playOpeningAudio() {
    audioElements.opening.play();
}

// Set greeting text
function setGreetingText() {
    const greetingElement = document.getElementById('greetingText');
    // Set from admin settings or use default
    greetingElement.textContent = "Selamat Datang di Ujian Online PERGUNU Situbondo";
}

// Setup all event listeners
function setupEventListeners() {
    // Opening screen
    document.getElementById('enterBtn').addEventListener('click', checkExamCode);
    document.getElementById('examCode').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') checkExamCode();
    });
    
    // Terms screen
    document.getElementById('agreeTerms').addEventListener('change', toggleContinueButton);
    document.getElementById('continueBtn').addEventListener('click', proceedToDataForm);
    
    // Data form screen
    setupDataFormListeners();
    
    // Level screen
    setupLevelScreenListeners();
    
    // Exam screen
    setupExamScreenListeners();
    
    // Results screen
    setupResultsScreenListeners();
    
    // Admin panel
    setupAdminPanelListeners();
    
    // Floating buttons
    setupFloatingButtons();
    
    // Add sound to all buttons
    addButtonSounds();
}

// [Tambahkan semua fungsi pembantu lainnya di sini]

// Check exam code
function checkExamCode() {
    const enteredCode = document.getElementById('examCode').value;
    const errorElement = document.getElementById('codeError');
    
    if(enteredCode === "12345") { // Default code, should be from settings
        errorElement.textContent = '';
        showScreen('terms');
    } else {
        errorElement.textContent = 'Kode ujian salah. Silakan coba lagi.';
    }
}

// Toggle continue button based on terms agreement
function toggleContinueButton() {
    document.getElementById('continueBtn').disabled = !this.checked;
}

// Proceed to data form
function proceedToDataForm() {
    showScreen('dataForm');
}

// Show specific screen
function showScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show requested screen
    screens[screenName].classList.add('active');
    currentScreen = screenName;
    
    // Special handling for certain screens
    if(screenName === 'exam') {
        startExam();
    } else if(screenName === 'results') {
        showResults();
    }
}

// [Tambahkan semua fungsi lainnya yang diperlukan]

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
