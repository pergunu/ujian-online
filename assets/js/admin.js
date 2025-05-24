// Variabel Admin
let questions = [];

// Inisialisasi Admin Panel
document.addEventListener('DOMContentLoaded', function() {
    loadQuestions();
    
    // Event Listeners
    document.getElementById('add-question').addEventListener('click', showQuestionModal);
    document.getElementById('cancel-btn').addEventListener('click', hideQuestionModal);
    document.getElementById('question-form').addEventListener('submit', saveQuestion);
    document.getElementById('subject-filter').addEventListener('change', filterQuestions);
});

// Muat soal dari localStorage/API
function loadQuestions() {
    // Contoh data (bisa diganti dengan fetch)
    questions = [
        {
            id: 1,
            text: "Contoh pertanyaan?",
            options: {
                A: "Pilihan A",
                B: "Pilihan B",
                C: "Pilihan C",
                D: "Pilihan D",
                E: "Pilihan E"
            },
            correctAnswer: "A",
            explanation: "Ini penjelasannya",
            subject: "matematika"
        }
    ];
    
    renderQuestionTable();
}

// Render tabel soal
function renderQuestionTable(filteredQuestions = questions) {
    const tableBody = document.getElementById('question-table');
    tableBody.innerHTML = '';
    
    filteredQuestions.forEach((question, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${question.text.substring(0, 50)}${question.text.length > 50 ? '...' : ''}</td>
            <td>${question.subject}</td>
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
    
    // Tambahkan event listener untuk tombol edit/hapus
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', editQuestion);
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', deleteQuestion);
    });
}

// Fungsi-fungsi CRUD soal...
// (Lengkapi dengan showQuestionModal, hideQuestionModal, saveQuestion, dll)
