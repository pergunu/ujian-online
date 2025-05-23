// Question bank functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load questions from localStorage
    loadQuestions();
    
    // Save question
    document.getElementById('saveQuestionBtn').addEventListener('click', function() {
        const subject = document.getElementById('questionSubject').value;
        const level = document.getElementById('questionLevel').value;
        const questionText = document.getElementById('questionText').value;
        const optionA = document.getElementById('optionA').value;
        const optionB = document.getElementById('optionB').value;
        const optionC = document.getElementById('optionC').value;
        const optionD = document.getElementById('optionD').value;
        const optionE = document.getElementById('optionE').value;
        const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked').value;
        const explanation = document.getElementById('explanation').value;
        
        // Basic validation
        if (!questionText || !optionA || !optionB || !optionC || !optionD || !correctAnswer) {
            alert('Harap isi semua field yang wajib');
            return;
        }
        
        // Create question object
        const question = {
            id: Date.now(), // Use timestamp as simple ID
            subject,
            level,
            text: questionText,
            options: [
                { id: 'A', text: optionA },
                { id: 'B', text: optionB },
                { id: 'C', text: optionC },
                { id: 'D', text: optionD }
            ],
            explanation
        };
        
        // Add option E if exists
        if (optionE) {
            question.options.push({ id: 'E', text: optionE });
        }
        
        // Mark correct answer
        question.options.forEach(opt => {
            if (opt.id === correctAnswer) {
                opt.correct = true;
            }
        });
        
        // Save to localStorage
        saveQuestion(question);
        
        // Reset form
        document.getElementById('questionText').value = '';
        document.getElementById('optionA').value = '';
        document.getElementById('optionB').value = '';
        document.getElementById('optionC').value = '';
        document.getElementById('optionD').value = '';
        document.getElementById('optionE').value = '';
        document.getElementById('explanation').value = '';
        document.querySelector('input[name="correctAnswer"]').checked = false;
        
        alert('Soal berhasil disimpan');
    });
    
    // Reset question form
    document.getElementById('resetQuestionBtn').addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin mereset form?')) {
            document.getElementById('questionText').value = '';
            document.getElementById('optionA').value = '';
            document.getElementById('optionB').value = '';
            document.getElementById('optionC').value = '';
            document.getElementById('optionD').value = '';
            document.getElementById('optionE').value = '';
            document.getElementById('explanation').value = '';
            document.querySelector('input[name="correctAnswer"]').checked = false;
        }
    });
    
    // Search questions
    document.getElementById('searchBtn').addEventListener('click', function() {
        const searchTerm = document.getElementById('searchQuestion').value.toLowerCase();
        const subject = document.getElementById('filterSubject').value;
        
        const questions = getQuestions();
        const filteredQuestions = questions.filter(q => {
            const matchesSubject = subject === 'all' || q.subject === subject;
            const matchesSearch = q.text.toLowerCase().includes(searchTerm) || 
                                q.options.some(opt => opt.text.toLowerCase().includes(searchTerm));
            
            return matchesSubject && matchesSearch;
        });
        
        displayQuestionList(filteredQuestions);
    });
    
    // Load questions for review
    document.getElementById('loadQuestionsBtn').addEventListener('click', function() {
        const subject = document.getElementById('reviewSubject').value;
        const questions = getQuestions();
        
        const filteredQuestions = subject === 'all' ? questions : questions.filter(q => q.subject === subject);
        displayQuestionReview(filteredQuestions);
    });
    
    // Export to Excel (mock functionality)
    document.getElementById('exportQuestionsBtn').addEventListener('click', function() {
        const questions = getQuestions();
        alert(`Fungsi export akan mengunduh file Excel dengan ${questions.length} soal`);
    });
    
    // Generate questions with AI (mock functionality)
    document.getElementById('generateQuestionsBtn').addEventListener('click', function() {
        const subject = document.getElementById('aiSubject').value;
        const level = document.getElementById('aiLevel').value;
        const topic = document.getElementById('aiTopic').value;
        const count = document.getElementById('aiCount').value;
        const language = document.getElementById('aiLanguage').value;
        
        if (!topic) {
            alert('Harap masukkan topik untuk generate soal');
            return;
        }
        
        // Simulate AI generation
        const aiResults = document.getElementById('aiResults');
        aiResults.innerHTML = '<p>Sedang generate soal... (simulasi)</p>';
        
        setTimeout(() => {
            const generatedQuestions = generateMockQuestions(topic, subject, level, count);
            displayGeneratedQuestions(generatedQuestions);
        }, 1500);
    });
});

function getQuestions() {
    return JSON.parse(localStorage.getItem('questions')) || [];
}

function saveQuestion(question) {
    const questions = getQuestions();
    questions.push(question);
    localStorage.setItem('questions', JSON.stringify(questions));
}

function loadQuestions() {
    const questions = getQuestions();
    displayQuestionList(questions);
}

function displayQuestionList(questions) {
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = '';
    
    if (questions.length === 0) {
        questionList.innerHTML = '<p>Tidak ada soal yang ditemukan</p>';
        return;
    }
    
    questions.forEach(question => {
        const correctOption = question.options.find(opt => opt.correct);
        
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.innerHTML = `
            <h4><span class="subject-badge">${question.subject.toUpperCase()}</span> 
            <span class="level-badge">${question.level}</span> ${question.text}</h4>
            <p>Jawaban benar: ${correctOption ? correctOption.id : 'Tidak ada'}</p>
            <div class="question-actions">
                <button class="btn-small" data-id="${question.id}" onclick="editQuestion(${question.id})">Edit</button>
                <button class="btn-small" data-id="${question.id}" onclick="deleteQuestion(${question.id})">Hapus</button>
                <button class="btn-small" data-id="${question.id}" onclick="previewQuestion(${question.id})">Preview</button>
            </div>
        `;
        
        questionList.appendChild(questionItem);
    });
}

function displayQuestionReview(questions) {
    const reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = '';
    
    if (questions.length === 0) {
        reviewContainer.innerHTML = '<p>Tidak ada soal yang ditemukan</p>';
        return;
    }
    
    questions.forEach((question, index) => {
        const correctOption = question.options.find(opt => opt.correct);
        
        const questionReview = document.createElement('div');
        questionReview.className = 'review-question';
        questionReview.innerHTML = `
            <h4>${index + 1}. ${question.text} (${question.level})</h4>
            <div class="review-options">
                ${question.options.map(opt => `
                    <p class="review-option ${opt.correct ? 'correct' : ''}">${opt.id}. ${opt.text}</p>
                `).join('')}
            </div>
            <div class="review-explanation">
                <p>${question.explanation || 'Tidak ada penjelasan'}</p>
            </div>
            <div class="question-actions">
                <button class="btn-small" data-id="${question.id}" onclick="editQuestion(${question.id})">Edit</button>
                <button class="btn-small" data-id="${question.id}" onclick="deleteQuestion(${question.id})">Hapus</button>
            </div>
        `;
        
        reviewContainer.appendChild(questionReview);
    });
}

function generateMockQuestions(topic, subject, level, count) {
    const questions = [];
    
    for (let i = 1; i <= count; i++) {
        questions.push({
            text: `Contoh soal ${i} tentang ${topic} (${subject}, ${level})`,
            options: [
                { id: 'A', text: 'Pilihan pertama' },
                { id: 'B', text: 'Pilihan kedua', correct: true },
                { id: 'C', text: 'Pilihan ketiga' },
                { id: 'D', text: 'Pilihan keempat' }
            ],
            explanation: `Ini adalah penjelasan mengapa pilihan B adalah jawaban yang benar untuk soal tentang ${topic}.`
        });
    }
    
    return questions;
}

function displayGeneratedQuestions(questions) {
    const aiResults = document.getElementById('aiResults');
    aiResults.innerHTML = '';
    
    questions.forEach((question, index) => {
        const correctOption = question.options.find(opt => opt.correct);
        
        const questionElement = document.createElement('div');
        questionElement.className = 'ai-question';
        questionElement.innerHTML = `
            <h5>${index + 1}. ${question.text}</h5>
            <div class="ai-options">
                ${question.options.map(opt => `
                    <p class="ai-option ${opt.correct ? 'correct' : ''}">${opt.id}. ${opt.text}</p>
                `).join('')}
            </div>
            <div class="ai-explanation">
                <p>${question.explanation}</p>
            </div>
            <button class="btn-small" onclick="addToQuestionBank(${index})">Tambah ke Bank Soal</button>
        `;
        
        aiResults.appendChild(questionElement);
    });
}

// Global functions for button actions
function editQuestion(id) {
    const questions = getQuestions();
    const question = questions.find(q => q.id === id);
    
    if (!question) {
        alert('Soal tidak ditemukan');
        return;
    }
    
    // Switch to add question tab
    document.querySelectorAll('.bank-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.bank-tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector('.bank-tab-btn[data-bank-tab="add-question"]').classList.add('active');
    document.getElementById('add-question').classList.add('active');
    
    // Fill form with question data
    document.getElementById('questionSubject').value = question.subject;
    document.getElementById('questionLevel').value = question.level;
    document.getElementById('questionText').value = question.text;
    
    document.getElementById('optionA').value = question.options[0].text;
    document.getElementById('optionB').value = question.options[1].text;
    document.getElementById('optionC').value = question.options[2].text;
    document.getElementById('optionD').value = question.options[3].text;
    
    if (question.options.length > 4) {
        document.getElementById('optionE').value = question.options[4].text;
    } else {
        document.getElementById('optionE').value = '';
    }
    
    const correctOption = question.options.find(opt => opt.correct);
    if (correctOption) {
        document.getElementById(`correct${correctOption.id}`).checked = true;
    }
    
    document.getElementById('explanation').value = question.explanation || '';
    
    // Scroll to form
    document.getElementById('questionText').scrollIntoView();
}

function deleteQuestion(id) {
    if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        const questions = getQuestions().filter(q => q.id !== id);
        localStorage.setItem('questions', JSON.stringify(questions));
        loadQuestions();
    }
}

function previewQuestion(id) {
    const questions = getQuestions();
    const question = questions.find(q => q.id === id);
    
    if (!question) {
        alert('Soal tidak ditemukan');
        return;
    }
    
    alert(`Preview soal:\n\n${question.text}\n\nPilihan:\n${question.options.map(opt => 
        `${opt.id}. ${opt.text}${opt.correct ? ' (benar)' : ''}`
    ).join('\n')}\n\nPenjelasan: ${question.explanation || 'Tidak ada'}`);
}

function addToQuestionBank(index) {
    // This would add the generated question to the bank
    alert(`Soal ${index + 1} akan ditambahkan ke bank soal`);
}
