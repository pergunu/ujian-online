document.addEventListener('DOMContentLoaded', function() {
    // Admin panel initialization
    initializeAdminPanel();
    
    // Load participants data
    if (document.getElementById('participants-table')) {
        loadParticipants();
    }
    
    // Load questions data
    if (document.getElementById('questions-table')) {
        loadQuestions();
    }
    
    // Initialize settings
    if (document.getElementById('admin-settings-form')) {
        loadAdminSettings();
    }
});

function initializeAdminPanel() {
    // Admin authentication check
    const adminCode = localStorage.getItem('adminCode') || '65614222';
    const storedCode = localStorage.getItem('adminAuth');
    
    if (!storedCode || storedCode !== adminCode) {
        window.location.href = '../index.html';
        return;
    }
    
    // Sidebar navigation
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadAdminPage(page);
        });
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('adminAuth');
            window.location.href = '../index.html';
        });
    }
}

function loadAdminPage(page) {
    // In a real app, this would load content via AJAX
    // For this example, we'll just show/hide sections
    document.querySelectorAll('.admin-page').forEach(section => {
        section.style.display = 'none';
    });
    
    document.getElementById(page).style.display = 'block';
}

function loadParticipants() {
    // Load participants from localStorage
    const participants = JSON.parse(localStorage.getItem('participants')) || [];
    const tableBody = document.getElementById('participants-table').querySelector('tbody');
    
    tableBody.innerHTML = '';
    
    participants.forEach(participant => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${participant.fullname || '-'}</td>
            <td>${participant.status || '-'}</td>
            <td>${participant.educationLevel || participant.purposeGeneral || '-'}</td>
            <td>${participant.examType || '-'}</td>
            <td>${participant.score || '-'}</td>
            <td>${participant.certificateCode || '-'}</td>
            <td>${new Date(participant.timestamp).toLocaleString() || '-'}</td>
            <td>
                <button class="btn-view" data-id="${participant.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-delete" data-id="${participant.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners for actions
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const participantId = this.getAttribute('data-id');
            viewParticipant(participantId);
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const participantId = this.getAttribute('data-id');
            deleteParticipant(participantId);
        });
    });
}

function viewParticipant(id) {
    // In a real app, this would show detailed participant info
    alert(`Viewing participant with ID: ${id}`);
}

function deleteParticipant(id) {
    if (confirm('Apakah Anda yakin ingin menghapus peserta ini?')) {
        const participants = JSON.parse(localStorage.getItem('participants')) || [];
        const updatedParticipants = participants.filter(p => p.id !== id);
        localStorage.setItem('participants', JSON.stringify(updatedParticipants));
        loadParticipants();
    }
}

function loadQuestions() {
    // Load questions from localStorage
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const tableBody = document.getElementById('questions-table').querySelector('tbody');
    
    tableBody.innerHTML = '';
    
    questions.forEach((question, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${question.category || '-'}</td>
            <td>${question.type || '-'}</td>
            <td>${question.difficulty || '-'}</td>
            <td>${question.questionText.substring(0, 50)}...</td>
            <td>
                <button class="btn-edit" data-id="${question.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" data-id="${question.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners for question actions
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionId = this.getAttribute('data-id');
            editQuestion(questionId);
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const questionId = this.getAttribute('data-id');
            deleteQuestion(questionId);
        });
    });
    
    // Initialize question form
    const questionForm = document.getElementById('question-form');
    if (questionForm) {
        questionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveQuestion();
        });
    }
}

function editQuestion(id) {
    // In a real app, this would load question data into the form
    alert(`Editing question with ID: ${id}`);
}

function deleteQuestion(id) {
    if (confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        const questions = JSON.parse(localStorage.getItem('questions')) || [];
        const updatedQuestions = questions.filter(q => q.id !== id);
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
        loadQuestions();
    }
}

function saveQuestion() {
    const form = document.getElementById('question-form');
    const formData = new FormData(form);
    
    const question = {
        id: Date.now().toString(),
        category: formData.get('category'),
        type: formData.get('type'),
        difficulty: formData.get('difficulty'),
        questionText: formData.get('questionText'),
        options: [
            formData.get('option1'),
            formData.get('option2'),
            formData.get('option3'),
            formData.get('option4'),
            formData.get('option5')
        ].filter(opt => opt),
        correctAnswer: formData.get('correctAnswer'),
        explanation: formData.get('explanation')
    };
    
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions.push(question);
    localStorage.setItem('questions', JSON.stringify(questions));
    
    alert('Soal berhasil disimpan!');
    form.reset();
    loadQuestions();
}

function loadAdminSettings() {
    // Load settings from localStorage
    const settings = JSON.parse(localStorage.getItem('adminSettings')) || {
        loginCode: '12345',
        examCode: 'OPENLOCK-1926',
        bankCode: 'OPENLOCK-1926',
        adminCode: '65614222',
        timerDefault: 120,
        chairmanName: 'Moh. Nuril Hudha, S.Pd., M.Si.',
        greetingText: 'Selamat Datang di Ujian Online PERGUNU SITUBONDO',
        infoText: 'Sistem Ujian Online Resmi PERGUNU Kabupaten Situbondo'
    };
    
    // Populate form fields
    const form = document.getElementById('admin-settings-form');
    for (const key in settings) {
        if (form.elements[key]) {
            form.elements[key].value = settings[key];
        }
    }
    
    // Save settings
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const settings = {};
        
        formData.forEach((value, key) => {
            settings[key] = value;
        });
        
        localStorage.setItem('adminSettings', JSON.stringify(settings));
        alert('Pengaturan berhasil disimpan!');
    });
}
