import { Quiz } from './quiz-engine.js';
import { Config } from '../config.js';
import { AudioManager } from './audio.js';

export const Results = (() => {
    const init = () => {
        document.getElementById('printBtn').addEventListener('click', printCertificate);
        document.getElementById('restartBtn').addEventListener('click', restartQuiz);
    };
    
    const show = (score, totalQuestions, timeTaken) => {
        const percentage = Math.round((score / totalQuestions) * 100);
        
        // Update certificate
        document.getElementById('scoreDisplay').textContent = `${percentage}%`;
        document.getElementById('participantName').textContent = 
            Quiz.getParticipantName();
        
        // Set result message
        let message = "";
        if (percentage >= 80) {
            message = `<p>SEMPURNA! Anda sangat menguasai materi ini.</p>`;
            AudioManager.play('applauseSound');
        } else if (percentage >= 60) {
            message = `<p>BAIK SEKALI! Pemahaman Anda cukup solid.</p>`;
            AudioManager.play('applauseSound');
        } else {
            message = `<p>TERUS BERLATIH! Setiap kesalahan adalah pelajaran.</p>`;
        }
        
        document.getElementById('resultsMessage').innerHTML = message;
        
        // Generate watermark code
        generateWatermark();
    };
    
    const generateWatermark = () => {
        const now = new Date();
        const dateStr = `${now.getDate()}${now.getMonth()+1}${now.getFullYear()}`;
        const uniqueCode = `${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        
        const watermark = `${Quiz.getParticipantName().toUpperCase()}/${
            Quiz.getCurrentCategory().toUpperCase()}/${
            Quiz.getCurrentSubcategory().toUpperCase()}/${
            dateStr}/${uniqueCode}/PERGUNU-STB`;
            
        document.getElementById('watermarkCode').textContent = watermark;
    };
    
    const printCertificate = () => {
        window.print();
    };
    
    const restartQuiz = () => {
        Quiz.reset();
    };
    
    return {
        init,
        show
    };
})();
