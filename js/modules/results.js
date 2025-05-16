// js/modules/audio.js
export const AudioManager = (() => {
    let soundEffectsEnabled = true;

    const init = () => {
        const musicToggle = document.getElementById('musicToggle');
        const quizMusic = document.getElementById('quizMusic');

        if (musicToggle) {
            musicToggle.addEventListener('click', () => {
                soundEffectsEnabled = !soundEffectsEnabled;
                if (!soundEffectsEnabled) {
                    quizMusic.pause();
                } else {
                    quizMusic.play().catch(() => {});
                }
            });
        }

        // Aktifkan autoplay suara saat klik pertama kali
        document.body.addEventListener('click', enableAudio, { once: true });
    };

    const enableAudio = () => {
        if (soundEffectsEnabled) {
            playSound('openingSound');
        }
    };

    const playSound = (soundId) => {
        if (!soundEffectsEnabled) return;
        const sound = document.getElementById(soundId);
        try {
            const promise = sound.play();
            if (promise !== undefined) {
                promise.catch(error => {
                    console.log("Autoplay prevented:", error);
                });
            }
        } catch (error) {
            console.log("Error playing sound:", error);
        }
    };

    const playQuizMusic = () => {
        const quizMusic = document.getElementById('quizMusic');
        quizMusic.loop = true;
        quizMusic.volume = 0.5;
        quizMusic.play().catch(() => {});
    };

    return {
        init,
        playSound,
        playQuizMusic
    };
})();
