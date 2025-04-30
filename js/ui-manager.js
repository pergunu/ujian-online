const UIManager = {
    init: function() {
        // Inisialisasi event listener untuk jawaban
        document.addEventListener('click', function(e) {
            if (e.target.closest('.answer-option')) {
                const answerOption = e.target.closest('.answer-option');
                if (!answerOption.classList.contains('selected')) {
                    QuizEngine.checkAnswer(answerOption);
                }
            }
        });
    },
    
    displayUserInfo: function(userData) {
        document.getElementById('userNameDisplay').textContent = userData.name;
        
        // Set icon kategori
        const categoryIcon = document.getElementById('categoryIcon');
        let iconSrc = 'assets/images/icons/';
        
        if (userData.category === 'pelajar') {
            iconSrc += 'pelajar.png';
            document.getElementById('quizCategoryDisplay').textContent = 'Pelajar';
        } else {
            iconSrc += 'umum.png';
            document.getElementById('quizCategoryDisplay').textContent = 'Umum';
        }
        
        categoryIcon.src = iconSrc;
    },
    
    displayQuestion: function(question) {
        // Tampilkan teks pertanyaan
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('currentQuestionNum').textContent = this.currentQuestionIndex + 1;
        
        // Tampilkan pilihan jawaban
        const answerOptions = document.getElementById('answerOptions');
        answerOptions.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'answer-option';
            optionElement.dataset.index = index;
            
            optionElement.innerHTML = `
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                <div class="option-content">
                    <div class="option-text">${option.text}</div>
                    <div class="option-description">${option.description}</div>
                </div>
            `;
            
            answerOptions.appendChild(optionElement);
        });
        
        // Reset feedback
        this.hideAnswerFeedback();
    },
    
    updateQuestionCounter: function(current, total) {
        document.getElementById('questionCounter').textContent = `${current}/${total}`;
        
        // Update progress bar
        const progressPercentage = (current / total) * 100;
        document.getElementById('progressFill').style.width = `${progressPercentage}%`;
    },
    
    updateTimer: function(remainingTime) {
        const minutes = Math.floor(remainingTime / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        
        document.getElementById('timeRemaining').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Tambahkan class warning jika waktu hampir habis
        if (remainingTime <= 5 * 60 * 1000) {
            document.getElementById('timeRemaining').classList.add('timer-warning');
        }
    },
    
    showTimeWarning: function() {
        // Mainkan suara peringatan
        const timerSound = document.getElementById('timerSound');
        timerSound.play();
        
        // Tampilkan animasi peringatan
        const timerElement = document.getElementById('timeRemaining');
        timerElement.classList.add('timer-warning');
    },
    
    showAnswerFeedback: function(isCorrect, explanation) {
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.className = 'response-message ' + (isCorrect ? 'correct' : 'wrong');
        
        if (isCorrect) {
            const correctMessages = [
                "Wow, kamu cerdas sekali!",
                "Luar biasa! Saya iri sama kamu!",
                "Benar sekali! Pengetahuanmu luas!",
                "Mantap! Jawaban yang tepat!",
                "Keren! Kamu benar-benar ahli!"
            ];
            responseMessage.textContent = correctMessages[Math.floor(Math.random() * correctMessages.length)];
        } else {
            const wrongMessages = [
                "Wah, kamu salah… tapi jangan menyerah ya!",
                "Hampir benar kok, coba lagi yuk!",
                "Jawaban kurang tepat, tapi terus belajar ya!",
                "Salah, tapi jangan khawatir! Ini kesempatan untuk belajar.",
                "Oops! Jawaban yang benar adalah..."
            ];
            responseMessage.textContent = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
        }
        
        responseMessage.style.display = 'block';
    },
    
    hideAnswerFeedback: function() {
        document.getElementById('responseMessage').style.display = 'none';
    },
    
    showAnswerExplanation: function(explanation) {
        // Implementasi untuk menampilkan penjelasan jawaban
        const explanationElement = document.createElement('div');
        explanationElement.className = 'explanation show';
        explanationElement.innerHTML = `
            <h4>Penjelasan:</h4>
            <p>${explanation}</p>
        `;
        
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.insertAdjacentElement('afterend', explanationElement);
    },
    
    showAlert: function(message) {
        alert(message);
    },
    
    showQuizResults: function(score, isTimeout = false) {
        // Update elemen hasil
        document.getElementById('scorePercentage').textContent = `${score.percentage}%`;
        document.getElementById('correctAnswers').textContent = score.correctAnswers;
        document.getElementById('wrongAnswers').textContent = score.wrongAnswers;
        
        // Format waktu yang digunakan
        const minutes = Math.floor(score.timeTaken / (1000 * 60));
        const seconds = Math.floor((score.timeTaken % (1000 * 60)) / 1000);
        document.getElementById('timeTaken').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Set grade dan warna
        const scoreCircle = document.getElementById('scoreCircle');
        const scoreGrade = document.getElementById('scoreGrade');
        const resultMessage = document.getElementById('resultMessage');
        
        scoreCircle.className = 'score-circle grade-' + score.grade.toLowerCase().replace('+', '');
        scoreGrade.textContent = `Nilai ${score.grade}`;
        scoreGrade.className = 'score-grade grade-' + score.grade.toLowerCase().replace('+', '');
        
        // Set pesan hasil berdasarkan skor
        resultMessage.className = 'result-message grade-' + score.grade.toLowerCase().replace('+', '');
        
        if (isTimeout) {
            resultMessage.textContent = 'Waktu quiz telah habis! Berikut adalah hasil Anda:';
        } else {
            if (score.percentage >= 75) {
                resultMessage.textContent = 'Luar biasa! Kamu benar-benar ahli! Saya bangga pada kamu!';
            } else if (score.percentage >= 50) {
                resultMessage.textContent = 'Keren! Pemahaman kamu sudah sangat baik!';
            } else if (score.percentage >= 25) {
                resultMessage.textContent = 'Hasil yang bagus, tetap berusaha untuk lebih baik lagi!';
            } else {
                resultMessage.textContent = 'Tetap semangat, belajar dari kesalahan adalah kunci sukses!';
            }
        }
        
        // Update sertifikat
        const userData = UserManager.getUserData();
        document.getElementById('certificateName').textContent = userData.name;
        document.getElementById('certificateCategory').textContent = 
            userData.category === 'pelajar' ? `Pelajar di ${userData.school}` : userData.profession;
        document.getElementById('certificateDate').textContent = new Date().toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Mainkan suara tepuk tangan jika nilai bagus
        if (score.percentage >= 50) {
            const applauseSound = document.getElementById('applauseSound');
            applauseSound.play();
        }
    },
    
    showPrayerTimeNotification: function(prayerName, time) {
        const notification = document.getElementById('prayerTimeNotification');
        document.getElementById('prayerTimeText').textContent = 
            `Waktu ${prayerName} telah tiba (${time}). Silakan berhenti sejenak untuk beribadah.`;
        
        notification.style.display = 'flex';
        notification.classList.add('show');
        
        // Mainkan adzan
        const adhanSound = document.getElementById('adhanSound');
        adhanSound.play();
        
        // Sembunyikan notifikasi setelah 1 menit
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.style.display = 'none';
            }, 500);
        }, 60000);
    },
    
    showConfetti: function() {
        const canvas = document.getElementById('confettiCanvas');
        canvas.style.display = 'block';
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const confettiPieces = [];
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        
        // Buat 100 partikel confetti
        for (let i = 0; i < 100; i++) {
            confettiPieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 4 + 1,
                d: Math.random() * 7 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngle: Math.random() * 0.1,
                tiltAngleIncrement: Math.random() * 0.07
            });
        }
        
        let animationFrame;
        const animateConfetti = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            confettiPieces.forEach((p, i) => {
                ctx.beginPath();
                ctx.lineWidth = p.r / 2;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt, p.y);
                ctx.lineTo(p.x + p.tilt + p.r * 2, p.y);
                ctx.stroke();
                
                p.tiltAngle += p.tiltAngleIncrement;
                p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
                p.tilt = Math.sin(p.tiltAngle) * 15;
                
                if (p.y > canvas.height) {
                    confettiPieces.splice(i, 1);
                }
            });
            
            if (confettiPieces.length > 0) {
                animationFrame = requestAnimationFrame(animateConfetti);
            } else {
                canvas.style.display = 'none';
                cancelAnimationFrame(animationFrame);
            }
        };
        
        animateConfetti();
    }
};
