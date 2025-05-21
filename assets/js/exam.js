// Exam functionality
function initializeExam() {
    const examDetails = JSON.parse(localStorage.getItem('currentExam'));
    const participantData = JSON.parse(localStorage.getItem('currentParticipant'));
    
    if (!examDetails || !participantData) {
        alert('Data ujian tidak valid. Silakan mulai dari awal.');
        showScreen('opening-screen');
        return;
    }
    
    // Set exam title
    const examTitle = document.getElementById('exam-title');
    const examCategory = document.getElementById('exam-category');
    
    if (examDetails.type === 'pelajar') {
        examTitle.textContent = `Ujian ${examDetails.subject}`;
        examCategory.textContent = `Kategori: Pelajar ${examDetails.schoolLevel} Kelas ${examDetails.grade}`;
    } else {
        examTitle.textContent = examDetails.examType === 'tes-iq' ? 'Tes IQ' : 'Ujian CPNS/P3K';
        examCategory.textContent = 'Kategori: Umum';
    }
    
    // Load questions based on exam type
    const questions = loadQuestions(examDetails);
    
    if (questions.length === 0) {
        alert('Tidak ada soal yang tersedia untuk ujian ini.');
        showScreen('exam-selection-screen');
        return;
    }
    
    // Initialize exam state
    const examState = {
        questions: questions,
        currentQuestionIndex: 0,
        answers: {},
        startTime: new Date().getTime(),
        timerInterval: null
    };
    
    localStorage.setItem('examState', JSON.stringify(examState));
    
    // Start timer
    startTimer();
    
    // Display first question
    displayQuestion(examState);
    
    // Setup navigation buttons
    setupExamNavigation(examState);
}

function loadQuestions(examDetails) {
    // In a real app, this would fetch questions from a server or database
    // For demo purposes, we'll use sample questions
    
    const allQuestions = JSON.parse(localStorage.getItem('questionBank')) || getSampleQuestions();
    
    // Filter questions based on exam type
    if (examDetails.type === 'pelajar') {
        return allQuestions.filter(q => q.category === examDetails.subject && q.type === 'pelajar');
    } else {
        return allQuestions.filter(q => q.type === 'umum' && q.examType === examDetails.examType);
    }
}

function getSampleQuestions() {
    // Sample questions for all categories
    const sampleQuestions = [
        // Agama (Pelajar)
        {
            id: '1',
            type: 'pelajar',
            category: 'AGAMA',
            question: 'Apa nama kitab suci umat Islam?',
            options: {
                A: 'Injil',
                B: 'Taurat',
                C: 'Al-Quran',
                D: 'Weda',
                E: 'Tripitaka'
            },
            correctAnswer: 'C',
            explanation: 'Kitab suci umat Islam adalah Al-Quran yang diturunkan kepada Nabi Muhammad SAW.',
            image: null
        },
        // PPKN (Pelajar)
        {
            id: '2',
            type: 'pelajar',
            category: 'PPKN',
            question: 'Pancasila sebagai dasar negara tercantum dalam pembukaan UUD 1945 pada alinea keberapa?',
            options: {
                A: 'Pertama',
                B: 'Kedua',
                C: 'Ketiga',
                D: 'Keempat',
                E: 'Kelima'
            },
            correctAnswer: 'D',
            explanation: 'Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD 1945 alinea keempat.',
            image: null
        },
        // Sejarah (Pelajar)
        {
            id: '3',
            type: 'pelajar',
            category: 'SEJARAH',
            question: 'Kapan Indonesia merdeka?',
            options: {
                A: '16 Agustus 1945',
                B: '17 Agustus 1945',
                C: '18 Agustus 1945',
                D: '19 Agustus 1945',
                E: '20 Agustus 1945'
            },
            correctAnswer: 'B',
            explanation: 'Indonesia merdeka pada tanggal 17 Agustus 1945 yang dibacakan oleh Soekarno-Hatta.',
            image: null
        },
        // IPA (Pelajar)
        {
            id: '4',
            type: 'pelajar',
            category: 'IPA',
            question: 'Planet terdekat dengan matahari adalah?',
            options: {
                A: 'Venus',
                B: 'Bumi',
                C: 'Mars',
                D: 'Merkurius',
                E: 'Jupiter'
            },
            correctAnswer: 'D',
            explanation: 'Merkurius adalah planet terdekat dengan matahari dalam tata surya kita.',
            image: null
        },
        // IPS (Pelajar)
        {
            id: '5',
            type: 'pelajar',
            category: 'IPS',
            question: 'Apa mata uang Jepang?',
            options: {
                A: 'Dolar',
                B: 'Euro',
                C: 'Yen',
                D: 'Pound',
                E: 'Won'
            },
            correctAnswer: 'C',
            explanation: 'Mata uang Jepang adalah Yen (¥).',
            image: null
        },
        // Matematika (Pelajar)
        {
            id: '6',
            type: 'pelajar',
            category: 'MATEMATIKA',
            question: 'Berapa hasil dari 7 × 8?',
            options: {
                A: '48',
                B: '54',
                C: '56',
                D: '64',
                E: '72'
            },
            correctAnswer: 'C',
            explanation: '7 × 8 = 56',
            image: null
        },
        // Bahasa Indonesia (Pelajar)
        {
            id: '7',
            type: 'pelajar',
            category: 'BAHASA-INDONESIA',
            question: 'Apa sinonim dari kata "bahagia"?',
            options: {
                A: 'Sedih',
                B: 'Senang',
                C: 'Marah',
                D: 'Kecewa',
                E: 'Takut'
            },
            correctAnswer: 'B',
            explanation: 'Sinonim dari "bahagia" adalah "senang".',
            image: null
        },
        // Bahasa Inggris (Pelajar)
        {
            id: '8',
            type: 'pelajar',
            category: 'BAHASA-INGGRIS',
            question: 'What is the English word for "buku"?',
            options: {
                A: 'Pen',
                B: 'Book',
                C: 'Table',
                D: 'Chair',
                E: 'Door'
            },
            correctAnswer: 'B',
            explanation: 'The English word for "buku" is "book".',
            image: null
        },
        // Materi Extra (Pelajar)
        {
            id: '9',
            type: 'pelajar',
            category: 'MATERI-EXTRA',
            question: 'Apa warna yang dihasilkan dari campuran merah dan biru?',
            options: {
                A: 'Hijau',
                B: 'Kuning',
                C: 'Ungu',
                D: 'Oranye',
                E: 'Coklat'
            },
            correctAnswer: 'C',
            explanation: 'Campuran warna merah dan biru menghasilkan warna ungu.',
            image: null
        },
        // Materi Khusus (Pelajar)
        {
            id: '10',
            type: 'pelajar',
            category: 'MATERI-KHUSUS',
            question: 'Apa nama ibukota provinsi Jawa Timur?',
            options: {
                A: 'Surabaya',
                B: 'Malang',
                C: 'Jakarta',
                D: 'Bandung',
                E: 'Semarang'
            },
            correctAnswer: 'A',
            explanation: 'Ibukota provinsi Jawa Timur adalah Surabaya.',
            image: null
        },
        // Tes IQ (Umum)
        {
            id: '11',
            type: 'umum',
            examType: 'tes-iq',
            question: 'Jika 2, 4, 8, 16, ... berapakah angka berikutnya?',
            options: {
                A: '24',
                B: '28',
                C: '30',
                D: '32',
                E: '36'
            },
            correctAnswer: 'D',
            explanation: 'Pola angka tersebut adalah dikali 2 setiap langkah (2×2=4, 4×2=8, 8×2=16, 16×2=32).',
            image: null
        },
        // Ujian CPNS (Umum)
        {
            id: '12',
            type: 'umum',
            examType: 'ujian-cpns',
            question: 'Menurut UUD 1945, kekuasaan kehakiman dilakukan oleh...',
            options: {
                A: 'Presiden',
                B: 'DPR',
                C: 'MA dan MK',
                D: 'BPK',
                E: 'KY'
            },
            correctAnswer: 'C',
            explanation: 'Menurut UUD 1945 Pasal 24, kekuasaan kehakiman dilakukan oleh Mahkamah Agung dan Mahkamah Konstitusi.',
            image: null
        }
    ];
    
    // Save sample questions to localStorage if not already present
    if (!localStorage.getItem('questionBank')) {
        localStorage.setItem('questionBank', JSON.stringify(sampleQuestions));
    }
    
    return sampleQuestions;
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    const examState = JSON.parse(localStorage.getItem('examState'));
    
    // Get timer duration from admin settings or use default (120 minutes)
    const examDuration = parseInt(localStorage.getItem('examTimer')) || 120;
    let timeLeft = examDuration * 60; // Convert to seconds
    
    // Update timer immediately
    updateTimerDisplay(timerElement, timeLeft);
    
    // Start timer interval
    examState.timerInterval = setInterval(() => {
        timeLeft--;
        
        // Update display
        updateTimerDisplay(timerElement, timeLeft);
        
        // Check if time is up
        if (timeLeft <= 0) {
            clearInterval(examState.timerInterval);
            finishExam(examState, true);
        }
        
        // Warning when 10 minutes left
        if (timeLeft === 600) {
            showTimeWarning();
        }
    }, 1000);
    
    localStorage.setItem('examState', JSON.stringify(examState));
}

function updateTimerDisplay(timerElement, seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    timerElement.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    
    // Change style when 10 minutes left
    if (seconds <= 600) {
        timerElement.classList.add('warning');
    } else {
        timerElement.classList.remove('warning');
    }
}

function showTimeWarning() {
    const notification = document.getElementById('exam-notification');
    notification.textContent = 'Perhatian! Ujian akan berakhir dalam waktu 10 menit. Mohon pastikan semua jawaban telah diselesaikan dan diperiksa sebelum waktu habis. Terima kasih atas partisipasi Anda.';
    notification.classList.add('show', 'warning');
    
    setTimeout(() => {
        notification.classList.remove('show', 'warning');
    }, 10000); // Hide after 10 seconds
}

function displayQuestion(examState) {
    const currentQuestion = examState.questions[examState.currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const currentQuestionElement = document.getElementById('current-question');
    const totalQuestionsElement = document.getElementById('total-questions');
    
    // Update question number
    currentQuestionElement.textContent = examState.currentQuestionIndex + 1;
    totalQuestionsElement.textContent = examState.questions.length;
    
    // Set question text
    questionText.textContent = currentQuestion.question;
    
    // Clear previous options
    answerOptions.innerHTML = '';
    
    // Add new options
    for (const [key, value] of Object.entries(currentQuestion.options)) {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'answer-option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.id = `answer-${key}`;
        radio.value = key;
        
        // Check if this option was previously selected
        if (examState.answers[examState.currentQuestionIndex] === key) {
            radio.checked = true;
            
            // Show explanation if answer was selected
            showAnswerExplanation(currentQuestion, key === currentQuestion.correctAnswer);
        }
        
        const label = document.createElement('label');
        label.htmlFor = `answer-${key}`;
        label.textContent = `${key}. ${value}`;
        
        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        
        // Add click event to show explanation immediately
        optionDiv.addEventListener('click', function() {
            // Save answer
            examState.answers[examState.currentQuestionIndex] = key;
            localStorage.setItem('examState', JSON.stringify(examState));
            
            // Show explanation
            showAnswerExplanation(currentQuestion, key === currentQuestion.correctAnswer);
            
            // Disable all options after selection
            document.querySelectorAll('.answer-option').forEach(opt => {
                opt.style.pointerEvents = 'none';
            });
        });
        
        answerOptions.appendChild(optionDiv);
    }
}

function showAnswerExplanation(question, isCorrect) {
    const explanationDiv = document.getElementById('answer-explanation');
    const explanationText = document.getElementById('explanation-text');
    
    explanationText.textContent = question.explanation;
    explanationDiv.style.display = 'block';
    
    // Highlight correct/wrong answer
    const selectedOption = document.querySelector(`input[name="answer"]:checked`).parentElement;
    
    if (isCorrect) {
        selectedOption.classList.add('correct');
        document.getElementById('correct-answer-audio').play();
    } else {
        selectedOption.classList.add('wrong');
        document.getElementById('wrong-answer-audio').play();
        
        // Also highlight correct answer
        const correctOption = document.querySelector(`input[value="${question.correctAnswer}"]`).parentElement;
        correctOption.classList.add('correct');
    }
}

function setupExamNavigation(examState) {
    const finishExamBtn = document.getElementById('finish-exam-btn');
    const skipQuestionBtn = document.getElementById('skip-question-btn');
    const unansweredBtn = document.getElementById('unanswered-btn');
    
    // Finish exam button
    finishExamBtn.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin menyelesaikan ujian sekarang? Soal yang belum dijawab akan dianggap salah.')) {
            finishExam(examState, false);
        }
    });
    
    // Skip question button
    skipQuestionBtn.addEventListener('click', function() {
        // Move to next question
        examState.currentQuestionIndex++;
        
        if (examState.currentQuestionIndex >= examState.questions.length) {
            examState.currentQuestionIndex = 0; // Loop back to first question
        }
        
        localStorage.setItem('examState', JSON.stringify(examState));
        displayQuestion(examState);
    });
    
    // Unanswered questions button
    unansweredBtn.addEventListener('click', function() {
        // Find first unanswered question
        let unansweredIndex = 0;
        while (unansweredIndex < examState.questions.length && examState.answers[unansweredIndex]) {
            unansweredIndex++;
        }
        
        if (unansweredIndex < examState.questions.length) {
            examState.currentQuestionIndex = unansweredIndex;
            localStorage.setItem('examState', JSON.stringify(examState));
            displayQuestion(examState);
        } else {
            alert('Semua soal sudah dijawab.');
        }
    });
}

function finishExam(examState, isTimeUp) {
    // Clear timer
    clearInterval(examState.timerInterval);
    
    // Calculate results
    const results = calculateResults(examState);
    
    // Save results
    const participantData = JSON.parse(localStorage.getItem('currentParticipant'));
    const examDetails = JSON.parse(localStorage.getItem('currentExam'));
    
    const examResult = {
        participant: participantData,
        exam: examDetails,
        results: results,
        timestamp: new Date().toISOString(),
        certificateCode: generateCertificateCode(participantData, examDetails, results)
    };
    
    // Save to exam history
    let examHistory = JSON.parse(localStorage.getItem('examHistory')) || [];
    examHistory.push(examResult);
    localStorage.setItem('examHistory', JSON.stringify(examHistory));
    
    // Show results screen
    showResults(results, examResult.certificateCode);
}

function calculateResults(examState) {
    let correct = 0;
    let wrong = 0;
    const totalQuestions = examState.questions.length;
    
    for (let i = 0; i < totalQuestions; i++) {
        const userAnswer = examState.answers[i];
        const correctAnswer = examState.questions[i].correctAnswer;
        
        if (userAnswer === correctAnswer) {
            correct++;
        } else {
            wrong++;
        }
    }
    
    // Get point per question from admin settings or use default (1 point)
    const pointPerQuestion = parseInt(localStorage.getItem('questionPoint')) || 1;
    const score = Math.round((correct / totalQuestions) * 100 * pointPerQuestion);
    
    return {
        totalQuestions,
        correct,
        wrong,
        unanswered: totalQuestions - correct - wrong,
        score
    };
}

function showResults(results, certificateCode) {
    // Update results display
    document.getElementById('total-answered').textContent = results.totalQuestions;
    document.getElementById('correct-answers').textContent = results.correct;
    document.getElementById('wrong-answers').textContent = results.wrong + results.unanswered;
    document.getElementById('exam-score').textContent = results.score;
    
    // Show results screen
    showScreen('results-screen');
    
    // Setup results buttons
    const printCertificateBtn = document.getElementById('print-certificate-btn');
    const retakeExamBtn = document.getElementById('retake-exam-btn');
    
    printCertificateBtn.addEventListener('click', function() {
        showCertificate(results, certificateCode);
    });
    
    retakeExamBtn.addEventListener('click', function() {
        showScreen('exam-selection-screen');
    });
}

function showCertificate(results, certificateCode) {
    const participantData = JSON.parse(localStorage.getItem('currentParticipant'));
    const examDetails = JSON.parse(localStorage.getItem('currentExam'));
    
    // Update certificate content
    document.getElementById('certificate-name').textContent = participantData.fullname;
    document.getElementById('certificate-score').textContent = results.score;
    document.getElementById('certificate-code').textContent = certificateCode;
    
    // Set current date
    const now = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('certificate-date').textContent = now.toLocaleDateString('id-ID', options);
    
    // Set chairman name from admin settings or default
    const chairmanName = localStorage.getItem('chairmanName') || 'Moh. Nuril Hudha, S.Pd., M.Si.';
    document.getElementById('certificate-chairman').textContent = chairmanName;
    
    // Set motivation message based on score
    const motivationMessages = JSON.parse(localStorage.getItem('motivationMessages')) || [
        { minScore: 0, maxScore: 50, message: 'Terus berusaha dan tingkatkan lagi pemahaman Anda. Setiap kegagalan adalah langkah menuju kesuksesan.' },
        { minScore: 51, maxScore: 70, message: 'Hasil yang cukup baik. Pertahankan dan terus tingkatkan kemampuan Anda.' },
        { minScore: 71, maxScore: 85, message: 'Hasil yang sangat baik! Anda telah menguasai sebagian besar materi.' },
        { minScore: 86, maxScore: 100, message: 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.' }
    ];
    
    const motivation = motivationMessages.find(m => results.score >= m.minScore && results.score <= m.maxScore);
    document.getElementById('certificate-motivation').textContent = motivation ? motivation.message : '';
    
    // Show certificate screen
    showScreen('certificate-screen');
    
    // Play applause sound
    applauseAudio.play();
    
    // Setup certificate buttons
    const backToResultsBtn = document.getElementById('back-to-results-btn');
    const printBtn = document.getElementById('print-btn');
    
    backToResultsBtn.addEventListener('click', function() {
        showScreen('results-screen');
    });
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
}

function generateCertificateCode(participantData, examDetails, results) {
    // Generate unique code based on participant and exam data
    const now = new Date();
    const dateStr = `${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`;
    
    // Generate random 8-digit code
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    let category = '';
    if (examDetails.type === 'pelajar') {
        category = `${participantData.schoolLevel}/${examDetails.subject}`;
    } else {
        category = `UMUM/${examDetails.examType}`;
    }
    
    return `${participantData.fullname.toUpperCase().replace(/ /g, '_')}/${participantData.status.toUpperCase()}/${category}/${dateStr}/${randomCode}/PERGUNU-STB`;
}
