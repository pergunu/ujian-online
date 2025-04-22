const setup = document.getElementById('setup');
const quizContainer = document.getElementById('quizContainer');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('nextBtn');
const resetButton = document.getElementById('resetBtn');
const finishButton = document.getElementById('finishBtn');
const resultContainer = document.getElementById('result');
const resultText = document.getElementById('resultText');
const moralMessage = document.getElementById('moralMessage');
const restartButton = document.getElementById('restartBtn');
const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('progressBar');
const adzanAudio = document.getElementById('adzanAudio');
const namaInput = document.getElementById('nama');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');
const downloadJpegBtn = document.getElementById('downloadJpegBtn');
const resultDetails = document.getElementById('resultDetails');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let userAnswers = [];
let timer;
let timeLeft = 0;
const totalTime = 60 * 60;
let questionsAnswered = 0;
const maxQuestions = 100;
const timeLimit = 4 * 60 * 60 * 1000;
let startTime = 0;
let quizStarted = false;

function startQuiz() {
    setup.style.display = 'none';
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    questionsAnswered = 0;
    startTime = Date.now();
    quizStarted = true;

    const category = document.getElementById('category').value;
    const level = document.getElementById('level').value;
    const difficulty = document.getElementById('difficulty').value;

    // Tampilkan pesan loading
    questionElement.textContent = "Memuat soal...";
    optionsElement.innerHTML = "";
    feedbackElement.textContent = "";

    // Panggil fungsi untuk mengambil soal dari API AI
    fetchAIQuestions(category, level, difficulty)
        .then(fetchedQuestions => {
            questions = fetchedQuestions;
            if (questions.length > 0) {
                showQuestion();
                startTimer();
            } else {
                // Jika tidak ada soal, tampilkan pesan kesalahan
                questionElement.textContent = "Tidak ada soal yang tersedia.";
            }
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
            // Handle error (misalnya, tampilkan pesan ke pengguna)
            questionElement.textContent = "Gagal mengambil soal. Coba lagi nanti.";
            optionsElement.innerHTML = "";
            feedbackElement.textContent = "";
        });
}

async function fetchAIQuestions(category, level, difficulty) {
    const aiPrompt = `Buatlah 5 soal kuis ${category} tingkat ${level} dengan tingkat kesulitan ${difficulty}. Berikan 4 pilihan jawaban (A, B, C, D) dengan deskripsi singkat untuk setiap pilihan. Tandai jawaban yang benar. Output dalam format JSON:
    {
      "questions": [
        {
          "question": "...",
          "options": [
            {"text": "...", "isCorrect": true, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."}
          ],
          "explanation": "Penjelasan jawaban yang benar..."
        },
        {
          "question": "...",
          "options": [
            {"text": "...", "isCorrect": true, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."}
          ],
          "explanation": "Penjelasan jawaban yang benar..."
        },
        {
          "question": "...",
          "options": [
            {"text": "...", "isCorrect": true, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."}
          ],
          "explanation": "Penjelasan jawaban yang benar..."
        },
        {
          "question": "...",
          "options": [
            {"text": "...", "isCorrect": true, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."}
          ],
          "explanation": "Penjelasan jawaban yang benar..."
        },
        {
          "question": "...",
          "options": [
            {"text": "...", "isCorrect": true, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."},
            {"text": "...", "isCorrect": false, "description": "..."}
          ],
          "explanation": "Penjelasan jawaban yang benar..."
        }
      ]
    }
    Contoh:
    Buatlah 5 soal kuis matematika tingkat sd dengan tingkat kesulitan mudah. Berikan 4 pilihan jawaban (A, B, C, D) dengan deskripsi singkat untuk setiap pilihan. Tandai jawaban yang benar. Output dalam format JSON:`;
    const apiKey = 'YOUR_API_KEY'; // **GANTI DENGAN API KEY ANDA! JANGAN SIMPAN DI FRONTEND UNTUK PRODUKSI!**
    const url = 'https://api.openai.com/v1/completions'; // Atau URL API AI yang sesuai

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003', // Atau model lain yang sesuai
                prompt: aiPrompt,
                max_tokens: 1000, // Sesuaikan
                temperature: 0.7 // Sesuaikan
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.choices || data.choices.length === 0) {
            throw new Error("Invalid AI response: No choices returned.");
        }

        const aiResponse = data.choices[0].text;
        if (!aiResponse) {
            throw new Error("Invalid AI response: Empty response.");
        }

        return parseAIResponse(aiResponse);

    } catch (error) {
        console.error("Error fetching questions from AI:", error);
        feedbackElement.textContent = `Gagal mengambil soal: ${error.message}`;
        feedbackElement.style.color = "red";
        return [];
    }
}

function parseAIResponse(aiResponse) {
    try {
        const parsedResponse = JSON.parse(aiResponse);
        if (!parsedResponse || typeof parsedResponse !== 'object' || !Array.isArray(parsedResponse.questions)) { // Asumsikan AI mengembalikan { questions: [] }
            throw new Error("Invalid AI response: Not a valid JSON object or missing 'questions' array.");
        }
        return parsedResponse.questions;
    } catch (error) {
        console.error("Error parsing AI response:", error);
        feedbackElement.textContent = "Gagal memproses jawaban AI. Coba lagi.";
        feedbackElement.style.color = "red";
        return [];
    }
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];
        questionElement.textContent = questionData.question;
        optionsElement.innerHTML = "";

        questionData.options.forEach((option, index) => {
            const optionElement = document.createElement("div");
            optionElement.classList.add("option");
            optionElement.innerHTML = `
                <span class="option-letter"><span class="math-inline">\{String\.fromCharCode\(65 \+ index\)\}\.</span\>
<span class\="option\-text"\></span>{option.text}</span>
                <span class="option-description">${option.description}</span>
            `;
            optionElement.addEventListener("click", () => checkAnswer(option.isCorrect, optionElement, option.text));
            optionsElement.appendChild(optionElement);
        });

        updateProgressBar();
        nextButton.style.display = "none";
    } else {
        endQuiz();
    }
}

function checkAnswer(isCorrect, selectedOption, selectedText) {
    questionsAnswered++;

    if (isCorrect) {
        score++;
        selectedOption.classList.add("correct");
        showFeedback("Wow, kamu cerdas sekali!", "green");
    } else {
        selectedOption.classList.add("wrong");
        showFeedback("Wah, kamu salah… tapi jangan menyerah ya!", "red");

        // Tampilkan jawaban yang benar
        questions[currentQuestionIndex].options.forEach(option => {
            if (option.isCorrect) {
                const correctOption = optionsElement.querySelector(`.option:nth-child(${questions[currentQuestionIndex].options.indexOf(option) + 1})`);
                correctOption.classList.add("correct");
            }
        });
    }

    // Nonaktifkan semua opsi setelah menjawab
    const options = optionsElement.querySelectorAll(".option");
    options.forEach(option => option.style.pointerEvents = "none");

    nextButton.style.display = "block";
}

function showFeedback(message, color) {
    feedbackElement.textContent = message;
    feedbackElement.style.color = color;
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function resetQuestion() {
    if (quizStarted) {
        alert("Soal ini akan direset dan dianggap salah. Anda yakin?");
        userAnswers.push(null);
        questionsAnswered++;
        nextQuestion();
    } else {
        alert("Mulai kuis terlebih dahulu!");
    }
}

function endQuiz() {
    quizStarted = false;
    clearInterval(timer);
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    const percentage = (score / questions.length) * 100;
    let resultMessage = `Skor Anda: ${score} dari <span class="math-inline">\{questions\.length\} \(</span>{percentage.toFixed(2)}%)`;
    resultText.textContent = resultMessage;

    showMoralMessage(percentage);
    displayResultDetails();
}

function displayResultDetails() {
    const nama = namaInput.value || "Anonim";
    const category = document.getElementById('category').value;
    const level = document.getElementById('level').value;
    const difficulty = document.getElementById('difficulty').value;
    const today = new Date();
    const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    resultDetails.innerHTML = `
        <p>Nama Peserta: ${nama}</p>
        <p>Materi Pelajaran: ${category}</p>
        <p>Tingkat: ${level}</p>
        <p>Kesulitan: ${difficulty}</p>
        <p>Tanggal: ${date}</p>
    `;
}

function showMoralMessage(percentage) {
    let message = "";
    let color = "";
    let animationClass = "";

    if (percentage <= 25) {
        message = "Tetap semangat, belajar dari kesalahan adalah kunci sukses!";
        color = "red";
        animationClass