import { Config } from '../config.js';

export const AudioManager = (() => {
    const audioElements = {};
    let isMusicEnabled = true;
    let isSoundEffectsEnabled = true;

    // Inisialisasi audio
    const init = () => {
        // Load semua elemen audio
        audioElements.openingSound = document.getElementById('openingSound');
        audioElements.backgroundMusic = document.getElementById('backgroundMusic');
        // ... tambahkan semua audio elements
        
        // Set volume default
        setAllVolumes(Config.audioVolume);
        
        // Event listener untuk autoplay
        document.body.addEventListener('click', enableAudio, { once: true });
    };

    const enableAudio = () => {
        if (isMusicEnabled) {
            play('openingSound');
        }
    };

    const play = (soundId) => {
        if (!isSoundEffectsEnabled && soundId !== 'backgroundMusic') return;
        
        try {
            const audio = audioElements[soundId];
            if (audio) {
                const promise = audio.play();
                if (promise !== undefined) {
                    promise.catch(error => console.error("Autoplay prevented:", error));
                }
            }
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    const toggleMusic = () => {
        isMusicEnabled = !isMusicEnabled;
        if (isMusicEnabled) {
            play('backgroundMusic');
        } else {
            audioElements.backgroundMusic.pause();
        }
        return isMusicEnabled;
    };

    const setAllVolumes = (volume) => {
        Object.values(audioElements).forEach(audio => {
            if (audio) audio.volume = volume;
        });
    };

    return {
        init,
        play,
        toggleMusic,
        setVolume: setAllVolumes,
        isMusicEnabled: () => isMusicEnabled
    };
})();
