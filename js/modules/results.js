// js/modules/results.js
import { Config } from '../config.js';
import { createConfetti } from '../utilities.js';

export const Results = (() => {
    const init = () => {
        document.getElementById('printBtn').addEventListener('click', printCertificate);
        document.getElementById('restartBtn').addEventListener('click', restartQuiz);
    };

    const show = () => {
        // Logika menampilkan hasil
    };

    const printCertificate = () => window.print();

    const restartQuiz = () => {
        location.reload();
    };

    return {
        init,
        show
    };
})();
