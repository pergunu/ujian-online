// This file would contain additional admin-specific functionality
// For this example, we've included all admin functionality in main.js
// In a larger application, you might want to separate it out

// Sample admin-specific functions
function loadParticipantsData() {
    const participants = JSON.parse(localStorage.getItem('participants') || [];
    const table = document.querySelector('.participants-table');
    
    table.innerHTML = `
        <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Status</th>
            <th>Sekolah/Instansi</th>
            <th>WhatsApp</th>
            <th>Email</th>
            <th>Tanggal</th>
        </tr>
    `;
    
    participants.forEach((participant, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${participant.fullName}</td>
            <td>${participant.status}</td>
            <td>${participant.school || participant.address || '-'}</td>
            <td>${participant.whatsapp || '-'}</td>
            <td>${participant.email || '-'}</td>
            <td>${new Date(participant.timestamp).toLocaleDateString()}</td>
        `;
        
        table.appendChild(row);
    });
}

// Load exam types checkboxes
function loadExamTypes() {
    const checkboxGrid = document.querySelector('.checkbox-grid');
    checkboxGrid.innerHTML = '';
    
    const examTypes = [
        { id: 'agama', label: 'AGAMA' },
        { id: 'ppkn', label: 'PPKN' },
        { id: 'sejarah', label: 'SEJARAH' },
        { id: 'ipa', label: 'IPA' },
        { id: 'ips', label: 'IPS' },
        { id: 'matematika', label: 'MATEMATIKA' },
        { id: 'bahasa-indonesia', label: 'BAHASA INDONESIA' },
        { id: 'bahasa-inggris', label: 'BAHASA INGGRIS' },
        { id: 'materi-extra', label: 'MATERI EXTRA' },
        { id: 'materi-khusus', label: 'MATERI KHUSUS' },
        { id: 'iq-test', label: 'Tes IQ' },
        { id: 'cpns', label: 'Ujian CPNS/P3K' }
    ];
    
    examTypes.forEach(type => {
        const div = document.createElement('div');
        div.className = 'checkbox-item';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `exam-type-${type.id}`;
        input.checked = true;
        
        const label = document.createElement('label');
        label.htmlFor = `exam-type-${type.id}`;
        label.textContent = type.label;
        
        div.appendChild(input);
        div.appendChild(label);
        checkboxGrid.appendChild(div);
    });
}

// Load questions table
function loadQuestionsTable() {
    const table = document.querySelector('.questions-table');
    
    table.innerHTML = `
        <tr>
            <th>No</th>
            <th>Pertanyaan</th>
            <th>Mata Pelajaran</th>
            <th>Jawaban Benar</th>
            <th>Aksi</th>
        </tr>
    `;
    
    let questionCount = 1;
    
    Object.entries(SAMPLE_QUESTIONS).forEach(([subject, questions]) => {
        questions.forEach((question, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${questionCount++}</td>
                <td>${question.question.substring(0, 50)}${question.question.length > 50 ? '...' : ''}</td>
                <td>${subject.toUpperCase()}</td>
                <td>${question.correctAnswer}</td>
                <td>
                    <button class="btn-small btn-edit" data-subject="${subject}" data-index="${index}">Edit</button>
                    <button class="btn-small btn-delete" data-subject="${subject}" data-index="${index}">Hapus</button>
                </td>
            `;
            
            table.appendChild(row);
        });
    });
    
    // Add event listeners to edit/delete buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const subject = btn.dataset.subject;
            const index = parseInt(btn.dataset.index);
            editQuestion(subject, index);
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const subject = btn.dataset.subject;
            const index = parseInt(btn.dataset.index);
            deleteQuestion(subject, index);
        });
    });
}

// Edit question
function editQuestion(subject, index) {
    const question = SAMPLE_QUESTIONS[subject][index];
    
    // Fill the form
    document.getElementById('question-text').value = question.question;
    document.querySelector('.option-text[data-option="A"]').value = question.options.A;
    document.querySelector('.option-text[data-option="B"]').value = question.options.B;
    document.querySelector('.option-text[data-option="C"]').value = question.options.C;
    document.querySelector('.option-text[data-option="D"]').value = question.options.D;
    document.querySelector('.option-text[data-option="E"]').value = question.options.E;
    document.getElementById('correct-answer').value = question.correctAnswer;
    document.getElementById('explanation').value = question.explanation;
    document.getElementById('question-subject').value = subject;
    
    // Show the form
    questionForm.classList.remove('hidden');
    aiPrompt.classList.add('hidden');
    
    // Change save button to update
    saveQuestionBtn.textContent = 'Perbarui Soal';
    saveQuestionBtn.onclick = () => updateQuestion(subject, index);
}

// Update question
function updateQuestion(subject, index) {
    const questionText = document.getElementById('question-text').value.trim();
    const options = {
        A: document.querySelector('.option-text[data-option="A"]').value.trim(),
        B: document.querySelector('.option-text[data-option="B"]').value.trim(),
        C: document.querySelector('.option-text[data-option="C"]').value.trim(),
        D: document.querySelector('.option-text[data-option="D"]').value.trim(),
        E: document.querySelector('.option-text[data-option="E"]').value.trim()
    };
    const correctAnswer = document.getElementById('correct-answer').value;
    const explanation = document.getElementById('explanation').value.trim();
    const newSubject = document.getElementById('question-subject').value;
    
    // Validate inputs
    if (!questionText || Object.values(options).some(opt => !opt) || !explanation) {
        showAlert('Semua field harus diisi!', 'error');
        return;
    }
    
    // Update question
    SAMPLE_QUESTIONS[subject][index] = {
        question: questionText,
        options,
        correctAnswer,
        explanation,
        subject: newSubject
    };
    
    // If subject changed, move the question
    if (subject !== newSubject) {
        if (!SAMPLE_QUESTIONS[newSubject]) {
            SAMPLE_QUESTIONS[newSubject] = [];
        }
        
        SAMPLE_QUESTIONS[newSubject].push(SAMPLE_QUESTIONS[subject][index]);
        SAMPLE_QUESTIONS[subject].splice(index, 1);
    }
    
    showAlert('Soal berhasil diperbarui!', 'success');
    
    // Reset form
    document.getElementById('question-text').value = '';
    document.querySelectorAll('.option-text').forEach(input => input.value = '');
    document.getElementById('explanation').value = '';
    questionForm.classList.add('hidden');
    
    // Reload questions table
    loadQuestionsTable();
    
    // Reset save button
    saveQuestionBtn.textContent = 'Simpan Soal';
    saveQuestionBtn.onclick = saveQuestion;
}

// Delete question
function deleteQuestion(subject, index) {
    if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        SAMPLE_QUESTIONS[subject].splice(index, 1);
        showAlert('Soal berhasil dihapus!', 'success');
        loadQuestionsTable();
    }
}

// Initialize admin panel when shown
document.querySelector('.tab-btn[data-tab="participants"]').addEventListener('click', loadParticipantsData);
document.querySelector('.tab-btn[data-tab="settings"]').addEventListener('click', loadExamTypes);
document.querySelector('.tab-btn[data-tab="questions"]').addEventListener('click', loadQuestionsTable);
