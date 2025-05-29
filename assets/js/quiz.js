document.addEventListener('DOMContentLoaded', function() {
    // Quiz variables
    let currentQuestionIndex = 0;
    let questions = [];
    let timer;
    let timeLeft;
    let examStarted = false;
    let examFinished = false;
    let userAnswers = [];
    
    // DOM elements
    const questionText = document.getElementById('question-text');
    const optionA = document.getElementById('optionA');
    const optionB = document.getElementById('optionB');
    const optionC = document.getElementById('optionC');
    const optionD = document.getElementById('optionD');
    const optionE = document.getElementById('optionE');
    const explanation = document.getElementById('explanation');
    const explanationText = document.getElementById('explanation-text');
    const currentQuestionDisplay = document.getElementById('current-question');
    const totalQuestionsDisplay = document.getElementById('total-questions');
    const timerDisplay = document.getElementById('timer');
    const timerContainer = document.querySelector('.timer-container');
    const timerWarning = document.getElementById('timer-warning');
    
    // Buttons
    const finishExamBtn = document.getElementById('finish-exam-btn');
    const skipQuestionBtn = document.getElementById('skip-question-btn');
    const unansweredBtn = document.getElementById('unanswered-btn');
    const viewCertificateBtn = document.getElementById('view-certificate-btn');
    const retakeExamBtn = document.getElementById('retake-exam-btn');
    const printCertificateBtn = document.getElementById('print-certificate-btn');
    const backToResultsBtn = document.getElementById('back-to-results-btn');
    
    // Audio elements
    const correctAudio = document.getElementById('correct-audio');
    const wrongAudio = document.getElementById('wrong-audio');
    const applauseAudio = document.getElementById('applause-audio');
    
    // Event listeners
    if (finishExamBtn) finishExamBtn.addEventListener('click', finishExam);
    if (skipQuestionBtn) skipQuestionBtn.addEventListener('click', skipQuestion);
    if (unansweredBtn) unansweredBtn.addEventListener('click', showUnansweredQuestions);
    if (viewCertificateBtn) viewCertificateBtn.addEventListener('click', viewCertificate);
    if (retakeExamBtn) retakeExamBtn.addEventListener('click', retakeExam);
    if (printCertificateBtn) printCertificateBtn.addEventListener('click', printCertificate);
    if (backToResultsBtn) backToResultsBtn.addEventListener('click', backToResults);
    
    // Option click handlers
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            if (!examFinished) {
                selectAnswer(this.getAttribute('data-option'));
            }
        });
    });
    
    // Start exam when subject is selected
    document.querySelectorAll('.subject-btn').forEach(button => {
        button.addEventListener('click', function() {
            const subject = this.getAttribute('data-subject');
            startExam(subject);
        });
    });
    
    // Start exam function
    function startExam(subject) {
        // Get participant data
        const participantData = JSON.parse(localStorage.getItem('participantData')) || {};
        
        // Get exam settings
        const examSettings = JSON.parse(localStorage.getItem('examSettings')) || {
            timer: 120,
            questionCount: 10,
            randomizeQuestions: true
        };
        
        // Load questions based on participant data and selected subject
        questions = loadQuestions(participantData, subject, examSettings.questionCount);
        
        if (questions.length === 0) {
            alert('Tidak ada soal yang tersedia untuk ujian ini. Silakan hubungi admin.');
            return;
        }
        
        // Set timer
        timeLeft = examSettings.timer * 60; // Convert minutes to seconds
        updateTimerDisplay();
        
        // Start timer
        timer = setInterval(function() {
            timeLeft--;
            updateTimerDisplay();
            
            // Show warning when 10 minutes left
            if (timeLeft === 600) { // 10 minutes = 600 seconds
                timerContainer.classList.add('warning');
                timerWarning.classList.remove('hidden');
            }
            
            // Hide warning when 1 minute left
            if (timeLeft === 60) {
                timerWarning.classList.add('hidden');
            }
            
            // Auto submit when time's up
            if (timeLeft <= 0) {
                clearInterval(timer);
                finishExam();
            }
        }, 1000);
        
        // Initialize user answers
        userAnswers = new Array(questions.length).fill(null);
        
        // Show exam screen
        document.querySelector('.level-selection').classList.add('hidden');
        document.querySelector('.exam-screen').classList.remove('hidden');
        
        // Update question counter
        currentQuestionDisplay.textContent = 1;
        totalQuestionsDisplay.textContent = questions.length;
        
        // Display first question
        displayQuestion(0);
        
        examStarted = true;
    }
    
    // Load questions from localStorage
    function loadQuestions(participantData, subject, questionCount) {
        const allQuestions = JSON.parse(localStorage.getItem('questions')) || [];
        
        // Filter questions based on participant data and selected subject
        let filteredQuestions = allQuestions.filter(q => {
            // Match category
            const categoryMatch = q.category === participantData.status;
            
            // Match subject
            const subjectMatch = q.subject === subject;
            
            // For students, match level if available
            const levelMatch = participantData.status === 'umum' || 
                              (participantData.schoolLevel && 
                               q.level === participantData.schoolLevel);
            
            return categoryMatch && subjectMatch && levelMatch;
        });
        
        // Randomize if enabled
        const examSettings = JSON.parse(localStorage.getItem('examSettings')) || {};
        if (examSettings.randomizeQuestions) {
            filteredQuestions = shuffleArray(filteredQuestions);
        }
        
        // Limit to question count
        return filteredQuestions.slice(0, Math.min(questionCount, filteredQuestions.length));
    }
    
    // Shuffle array
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    
    // Display question
    function displayQuestion(index) {
        if (index < 0 || index >= questions.length) return;
        
        currentQuestionIndex = index;
        const question = questions[index];
        
        // Update question counter
        currentQuestionDisplay.textContent = index + 1;
        
        // Set question text
        questionText.textContent = question.question;
        
        // Set options
        optionA.textContent = question.options.A;
        optionB.textContent = question.options.B;
        optionC.textContent = question.options.C;
        optionD.textContent = question.options.D;
        optionE.textContent = question.options.E;
        
        // Reset option styles
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected', 'correct', 'wrong', 'disabled');
        });
        
        // Hide explanation
        explanation.classList.add('hidden');
        
        // If already answered, show the answer
        if (userAnswers[index] !== null) {
            const userAnswer = userAnswers[index];
            const correctAnswer = question.correctAnswer;
            
            // Disable all options
            document.querySelectorAll('.option').forEach(option => {
                option.classList.add('disabled');
            });
            
            // Mark user's answer
            document.querySelector(`.option[data-option="${userAnswer}"]`).classList.add('selected');
            
            // Mark correct answer
            document.querySelector(`.option[data-option="${correctAnswer}"]`).classList.add('correct');
            
            // If wrong, mark as wrong
            if (userAnswer !== correctAnswer) {
                document.querySelector(`.option[data-option="${userAnswer}"]`).classList.add('wrong');
            }
            
            // Show explanation
            explanationText.textContent = question.explanation;
            explanation.classList.remove('hidden');
        }
    }
    
    // Select answer
    function selectAnswer(option) {
        const question = questions[currentQuestionIndex];
        
        // Play sound based on correctness
        if (option === question.correctAnswer) {
            correctAudio.play();
        } else {
            wrongAudio.play();
        }
        
        // Save answer
        userAnswers[currentQuestionIndex] = option;
        
        // Disable all options
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.add('disabled');
        });
        
        // Mark selected option
        const selectedOption = document.querySelector(`.option[data-option="${option}"]`);
        selectedOption.classList.add('selected');
        
        // Mark correct answer
        const correctOption = document.querySelector(`.option[data-option="${question.correctAnswer}"]`);
        correctOption.classList.add('correct');
        
        // If wrong, mark as wrong
        if (option !== question.correctAnswer) {
            selectedOption.classList.add('wrong');
        }
        
        // Show explanation
        explanationText.textContent = question.explanation;
        explanation.classList.remove('hidden');
        
        // Auto advance to next question after delay
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                displayQuestion(currentQuestionIndex + 1);
            }
        }, 2000);
    }
    
    // Skip question
    function skipQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            displayQuestion(currentQuestionIndex + 1);
        } else {
            displayQuestion(0);
        }
    }
    
    // Show unanswered questions
    function showUnansweredQuestions() {
        const unansweredIndices = userAnswers.map((answer, index) => answer === null ? index : null)
            .filter(index => index !== null);
        
        if (unansweredIndices.length > 0) {
            displayQuestion(unansweredIndices[0]);
        } else {
            alert('Semua soal sudah dijawab!');
        }
    }
    
    // Finish exam
    function finishExam() {
        clearInterval(timer);
        examFinished = true;
        
        // Calculate results
        const results = calculateResults();
        
        // Show results screen
        document.querySelector('.exam-screen').classList.add('hidden');
        document.querySelector('.results-screen').classList.remove('hidden');
        
        // Display results
        document.getElementById('total-answered').textContent = results.totalAnswered;
        document.getElementById('correct-answers').textContent = results.correctAnswers;
        document.getElementById('wrong-answers').textContent = results.wrongAnswers;
        document.getElementById('final-score').textContent = results.score;
        
        // Display answers review
        displayAnswersReview(results.answersReview);
        
        // Generate certificate data
        generateCertificateData(results);
    }
    
    // Calculate results
    function calculateResults() {
        let correctAnswers = 0;
        let wrongAnswers = 0;
        let unanswered = 0;
        const answersReview = [];
        
        const pointSystem = JSON.parse(localStorage.getItem('examSettings'))?.pointSystem || 10;
        
        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            if (userAnswer === null) {
                unanswered++;
            } else if (isCorrect) {
                correctAnswers++;
            } else {
                wrongAnswers++;
            }
            
            answersReview.push({
                question: question.question,
                userAnswer,
                correctAnswer: question.correctAnswer,
                explanation: question.explanation,
                isCorrect
            });
        });
        
        const score = correctAnswers * pointSystem;
        
        return {
            totalQuestions: questions.length,
            totalAnswered: questions.length - unanswered,
            correctAnswers,
            wrongAnswers,
            unanswered,
            score,
            answersReview
        };
    }
    
    // Display answers review
    function displayAnswersReview(review) {
        const container = document.getElementById('answers-list');
        container.innerHTML = '';
        
        review.forEach((item, index) => {
            const answerItem = document.createElement('div');
            answerItem.className = `answer-item ${item.isCorrect ? 'correct' : 'wrong'}`;
            
            answerItem.innerHTML = `
                <div class="answer-question">${index + 1}. ${item.question}</div>
                <div class="answer-choice">
                    <span>Jawaban Anda:</span>
                    <span>${item.userAnswer || 'Tidak dijawab'}</span>
                </div>
                <div class="answer-choice">
                    <span>Jawaban Benar:</span>
                    <span>${item.correctAnswer}</span>
                </div>
                <div class="answer-explanation">${item.explanation}</div>
            `;
            
            container.appendChild(answerItem);
        });
        
        document.getElementById('answers-review').classList.remove('hidden');
    }
    
    // Generate certificate data
    function generateCertificateData(results) {
        const participantData = JSON.parse(localStorage.getItem('participantData')) || {};
        const chairmanName = localStorage.getItem('chairmanName') || 'Moh. Nuril Hudha, S.Pd., M.Si.';
        
        // Format name
        const formattedName = participantData.fullname 
            ? participantData.fullname.split(' ').map(name => 
                name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
              ).join(' ')
            : 'Peserta Ujian';
        
        // Generate certificate code
        const now = new Date();
        const dateStr = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;
        const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + 
                          '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
        
        let category = participantData.status === 'pelajar' ? 'PELAJAR' : 'UMUM';
        let level = '';
        let subject = '';
        
        if (participantData.status === 'pelajar') {
            level = participantData.schoolLevel?.toUpperCase() || '';
            subject = questions[0]?.subject?.toUpperCase() || '';
        } else {
            level = 'UMUM';
            subject = questions[0]?.subject === 'cpns' ? 'CPNS/P3K' : 'LOGIKA';
        }
        
        const certificateCode = `${formattedName.toUpperCase().replace(/ /g, '')}/${category}/${level}/${subject}/${dateStr}/${randomCode}/PERGUNU-STB`;
        
        // Get motivation text based on score
        const motivationText = getMotivationText(results.score, results.totalQuestions * 10); // Max score is questions count * 10
        
        // Set certificate data
        document.getElementById('certificate-name').textContent = formattedName;
        document.getElementById('certificate-score').textContent = results.score;
        document.getElementById('certificate-motivation').textContent = motivationText;
        document.getElementById('certificate-period').textContent = `Ditetapkan di: Situbondo, ${formatDate(now)}`;
        document.getElementById('certificate-code').textContent = certificateCode;
        document.getElementById('chairman-name').textContent = chairmanName;
    }
    
    // Get motivation text based on score
    function getMotivationText(score, maxScore) {
        const percentage = (score / maxScore) * 100;
        
        if (percentage >= 90) {
            return 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.';
        } else if (percentage >= 75) {
            return 'Hasil yang sangat baik! Anda telah menunjukkan pemahaman yang mendalam tentang materi ini.';
        } else if (percentage >= 60) {
            return 'Kerja bagus! Anda memiliki pemahaman yang baik tentang materi ini. Teruslah belajar!';
        } else if (percentage >= 40) {
            return 'Anda telah menyelesaikan ujian ini. Tinjau kembali materi untuk meningkatkan pemahaman Anda.';
        } else {
            return 'Terima kasih telah menyelesaikan ujian ini. Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.';
        }
    }
    
    // Format date
    function formatDate(date) {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }
    
    // View certificate
    function viewCertificate() {
        document.querySelector('.results-screen').classList.add('hidden');
        document.querySelector('.certificate-screen').classList.remove('hidden');
        
        // Play applause sound
        applauseAudio.play();
    }
    
    // Print certificate
    function printCertificate() {
        const printContent = document.getElementById('certificate-print').innerHTML;
        const originalContent = document.body.innerHTML;
        
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        
        // Restore the view
        document.querySelector('.certificate-screen').classList.remove('hidden');
    }
    
    // Back to results
    function backToResults() {
        document.querySelector('.certificate-screen').classList.add('hidden');
        document.querySelector('.results-screen').classList.remove('hidden');
    }
    
    // Retake exam
    function retakeExam() {
        // Reset exam variables
        currentQuestionIndex = 0;
        userAnswers = [];
        examFinished = false;
        
        // Show level selection screen
        document.querySelector('.results-screen').classList.add('hidden');
        document.querySelector('.level-selection').classList.remove('hidden');
    }
    
    // Update timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});
