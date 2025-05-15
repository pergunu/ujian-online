import AppConfig from './config.js';

// Inisialisasi audio
export function initAudio() {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.volume = AppConfig.defaultVolume;
    });
    
    // Enable audio setelah interaksi pengguna pertama
    document.body.addEventListener('click', enableAudio, { once: true });
}

// Enable audio
function enableAudio() {
    if (AppConfig.audioEnabled) {
        playOpeningSound();
    }
}

// Mainkan opening sound
export function playOpeningSound() {
    const openingSound = document.getElementById('openingSound');
    openingSound.play().catch(error => {
        console.log("Autoplay prevented:", error);
    });
}

// Mainkan sound effect
export function playSound(soundId) {
    if (!AppConfig.soundEffectsEnabled) return;
    
    const sound = document.getElementById(soundId);
    sound.currentTime = 0; // Reset audio ke awal
    sound.play().catch(error => {
        console.log("Error playing sound:", error);
    });
}

// Toggle background music
export function toggleBackgroundMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(error => {
            console.log("Error playing music:", error);
        });
        AppConfig.audioEnabled = true;
    } else {
        backgroundMusic.pause();
        AppConfig.audioEnabled = false;
    }
    
    updateMusicToggleButton();
}

// Update tombol toggle music
function updateMusicToggleButton() {
    const musicToggle = document.getElementById('musicToggle');
    if (!musicToggle) return;
    
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic.paused) {
        musicToggle.innerHTML = '<i class="fas fa-music"></i><span class="tooltip">Nyalakan Musik Latar</span>';
    } else {
        musicToggle.innerHTML = '<i class="fas fa-music"></i><span class="tooltip">Matikan Musik Latar</span>';
    }
}

// Mainkan musik quiz
export function playQuizMusic() {
    const quizMusic = document.getElementById('quizMusic');
    if (quizMusic.paused && AppConfig.audioEnabled) {
        quizMusic.play().catch(error => {
            console.log("Error playing quiz music:", error);
        });
    }
}

// Mainkan adhan
export function playAdhan() {
    const quizMusic = document.getElementById('quizMusic');
    quizMusic.pause();
    
    const adhanSound = document.getElementById('adhanSound');
    adhanSound.play().catch(error => {
        console.log("Error playing adhan:", error);
    });
    
    adhanSound.onended = function() {
        playQuizMusic();
    };
}
