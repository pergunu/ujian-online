// Quiz-specific functionality
function initExam(questions, participantData) {
    if (questions.length === 0) {
        alert('Tidak ada soal yang tersedia untuk ujian ini.');
        return;
    }
    
    const examData = {
        participant: participantData,
        questions: questions,
        currentQuestionIndex: 0,
        answers: {},
        startTime: new Date().getTime(),
        endTime: new Date().getTime() + (settings.examTimer * 60 * 1000)
    };
    
    // Save exam data
    localStorage.setItem('currentExam', JSON.stringify(examData));
    
    // Start timer
    startTimer(examData.endTime);
    
    // Display first question
    displayQuestion(examData, 0);
}

function startTimer(endTime) {
    const timerElement = document.getElementById('timer');
    
    function updateTimer() {
        const now = new Date().getTime();
        const remaining = endTime - now;
        
        if (remaining <= 0) {
            // Time's up
            clearInterval(timerInterval);
            timerElement.textContent = '00:00';
            finishExam(true);
            return;
        }
        
        // Calculate minutes and seconds
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        
        // Display timer
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Change style when time is running out
        if (remaining <= 10 * 60 * 1000) { // 10 minutes left
            timerElement.parentElement.classList.add('warning');
            if (remaining <= 5 * 60 * 1000) {
                timerElement.parentElement.classList.add('danger');
            }
            
            // Show time warning
            if (remaining <= 10 * 60 * 1000 && remaining > 1 * 60 * 1000) {
                document.querySelector('.time-warning').classList.remove('hidden');
                document.getElementById('remaining-minutes').textContent = Math.ceil(minutes);
            } else if (remaining <= 1 * 60 * 1000) {
                document.querySelector('.time-warning').classList.add('hidden');
            }
        }
    }
    
    // Update timer immediately and then every second
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

function displayQuestion(examData, questionIndex) {
    const question = examData.questions[questionIndex];
    if (!question) return;
    
    // Update question counter
    document.getElementById('current-question').textContent = questionIndex + 1;
    document.getElementById('total-questions').textContent = examData.questions.length;
    
    // Display question text
    document.getElementById('question-text').textContent = question.text;
    
    // Display options
    const optionsContainer = document.querySelector('.options-container');
    optionsContainer.innerHTML = '';
    
    ['A', 'B', 'C', 'D', 'E'].forEach(option => {
        if (question[`option${option}`]) {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option-btn';
            optionBtn.dataset.option = option;
            
            const optionLetter = document.createElement('span');
            optionLetter.className = 'option-letter';
            optionLetter.textContent = option;
            
            const optionText = document.createElement('span');
            optionText.textContent = question[`option${option}`];
            
            optionBtn.appendChild(optionLetter);
            optionBtn.appendChild(optionText);
            
            // Check if this option was already selected
            if (examData.answers[questionIndex] === option) {
                optionBtn.classList.add('selected');
                
                // Show if correct or wrong
                if (option === question.correctAnswer) {
                    optionBtn.classList.add('correct');
                } else {
                    optionBtn.classList.add('wrong');
                }
                
                // Show explanation
                document.getElementById('explanation').textContent = question.explanation || 'Tidak ada penjelasan tersedia.';
                document.getElementById('explanation').classList.remove('hidden');
            }
            
            optionBtn.addEventListener('click', function() {
                if (!examData.answers[questionIndex]) {
                    selectAnswer(examData, questionIndex, option);
                }
            });
            
            optionsContainer.appendChild(optionBtn);
        }
    });
    
    // Hide explanation if not answered
    if (!examData.answers[questionIndex]) {
        document.getElementById('explanation').classList.add('hidden');
    }
    
    // Update navigation buttons
    document.getElementById('prev-question').disabled = questionIndex === 0;
    document.getElementById('next-question').disabled = questionIndex === examData.questions.length - 1;
}

function selectAnswer(examData, questionIndex, option) {
    playButtonSound();
    
    // Save answer
    examData.answers[questionIndex] = option;
    localStorage.setItem('currentExam', JSON.stringify(examData));
    
    // Get question
    const question = examData.questions[questionIndex];
    
    // Highlight selected option
    const options = document.querySelectorAll('.option-btn');
    options.forEach(opt => {
        opt.classList.remove('selected', 'correct', 'wrong');
        if (opt.dataset.option === option) {
            opt.classList.add('selected');
            
            // Play sound and show feedback
            if (option === question.correctAnswer) {
                opt.classList.add('correct');
                playCorrectSound();
            } else {
                opt.classList.add('wrong');
                playWrongSound();
            }
        }
    });
    
    // Show explanation
    document.getElementById('explanation').textContent = question.explanation || 'Tidak ada penjelasan tersedia.';
    document.getElementById('explanation').classList.remove('hidden');
}

function finishExam(timeout = false) {
    const examData = JSON.parse(localStorage.getItem('currentExam'));
    if (!examData) return;
    
    // Calculate score
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    
    examData.questions.forEach((question, index) => {
        if (examData.answers[index]) {
            if (examData.answers[index] === question.correctAnswer) {
                correct++;
            } else {
                wrong++;
            }
        } else {
            unanswered++;
        }
    });
    
    const score = Math.round((correct / examData.questions.length) * 100);
    
    // Save result
    const result = {
        participant: examData.participant,
        subject: examData.participant.subject,
        date: new Date().toISOString(),
        totalQuestions: examData.questions.length,
        correctAnswers: correct,
        wrongAnswers: wrong,
        unanswered: unanswered,
        score: score,
        timeout: timeout
    };
    
    let results = JSON.parse(localStorage.getItem('examResults')) || [];
    results.push(result);
    localStorage.setItem('examResults', JSON.stringify(results));
    
    // Clear current exam
    localStorage.removeItem('currentExam');
    
    // Show results
    document.querySelector('.exam-container').classList.add('animate__fadeOut');
    setTimeout(() => {
        document.querySelector('.exam-container').classList.add('hidden');
        showResults(result);
    }, 500);
}

function showResults(result) {
    const resultsContainer = document.querySelector('.results-container');
    resultsContainer.classList.remove('hidden');
    
    // Update result details
    document.getElementById('total-questions-result').textContent = result.totalQuestions;
    document.getElementById('correct-answers').textContent = result.correctAnswers;
    document.getElementById('wrong-answers').textContent = result.wrongAnswers;
    document.getElementById('unanswered-questions').textContent = result.unanswered;
    document.getElementById('score-percentage').textContent = result.score;
    
    // Update score circle animation
    const scoreCircle = document.querySelector('.score-circle');
    const percentage = result.score;
    scoreCircle.style.background = `conic-gradient(var(--success-color) 0%, var(--success-color) ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage}%)`;
    
    // Set motivational message based on score
    let message = '';
    if (result.score >= 90) {
        message = settings.motivationalMessages.excellent;
    } else if (result.score >= 70) {
        message = settings.motivationalMessages.good;
    } else if (result.score >= 50) {
        message = settings.motivationalMessages.average;
    } else {
        message = settings.motivationalMessages.poor;
    }
    
    document.getElementById('motivational-message').textContent = message;
    
    // Handle buttons
    document.getElementById('print-certificate').addEventListener('click', function() {
        playButtonSound();
        showCertificate(result);
    });
    
    document.getElementById('retake-exam').addEventListener('click', function() {
        playButtonSound();
        resultsContainer.classList.add('animate__fadeOut');
        setTimeout(() => {
            resultsContainer.classList.add('hidden');
            showLevelSelection(result.participant);
        }, 500);
    });
}

function showCertificate(result) {
    playApplauseSound();
    
    const certificateContainer = document.querySelector('.certificate-container');
    certificateContainer.classList.remove('hidden');
    
    // Generate certificate code
    const date = new Date(result.date);
    const dateStr = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear()}`;
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const certificateCode = `${result.participant.fullname.toUpperCase().replace(/ /g, '')}/${result.participant.status.toUpperCase()}/${result.participant.schoolLevel || 'UMUM'}/${result.subject.replace(/ /g, '')}/${dateStr}/${randomCode}/PERGUNU-STB`;
    
    // Update certificate content
    document.getElementById('certificate-name').textContent = result.participant.fullname;
    document.getElementById('certificate-score').textContent = result.score;
    document.getElementById('certificate-date').textContent = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('certificate-code').textContent = certificateCode;
    
    // Set motivational message
    let message = '';
    if (result.score >= 90) {
        message = settings.motivationalMessages.excellent;
    } else if (result.score >= 70) {
        message = settings.motivationalMessages.good;
    } else if (result.score >= 50) {
        message = settings.motivationalMessages.average;
    } else {
        message = settings.motivationalMessages.poor;
    }
    
    document.getElementById('certificate-motivation').textContent = message;
    
    // Handle buttons
    document.getElementById('close-certificate').addEventListener('click', function() {
        playButtonSound();
        certificateContainer.classList.add('animate__fadeOut');
        setTimeout(() => {
            certificateContainer.classList.add('hidden');
        }, 500);
    });
    
    document.getElementById('print-certificate-btn').addEventListener('click', function() {
        playButtonSound();
        window.print();
    });
}
