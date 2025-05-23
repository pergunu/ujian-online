// Admin Panel Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Load participants data
    loadParticipants();
    
    // Set up admin event listeners
    setupAdminEventListeners();
});

// Load participants data
function loadParticipants() {
    const participants = JSON.parse(localStorage.getItem('participants') || [];
    const tbody = document.querySelector('.participants-list tbody');
    
    tbody.innerHTML = '';
    
    participants.forEach((participant, index) => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${participant.fullname}</td>
            <td>${participant.status === 'pelajar' ? 'Pelajar' : 'Umum'}</td>
            <td>${participant.purpose}</td>
            <td>-</td>
            <td>${new Date(participant.timestamp).toLocaleDateString('id-ID')}</td>
            <td>
                <button class="btn-small view-btn" data-id="${index}"><i class="fas fa-eye"></i></button>
                <button class="btn-small delete-btn" data-id="${index}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').dataset.id;
            viewParticipant(id);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('button').dataset.id;
            deleteParticipant(id);
        });
    });
}

// View participant details
function viewParticipant(id) {
    const participants = JSON.parse(localStorage.getItem('participants') || [];
    const participant = participants[id];
    
    if (!participant) return;
    
    let details = `
        <h3>Detail Peserta</h3>
        <p><strong>Nama Lengkap:</strong> ${participant.fullname}</p>
        <p><strong>Status:</strong> ${participant.status === 'pelajar' ? 'Pelajar' : 'Umum'}</p>
        <p><strong>Tujuan Ujian:</strong> ${participant.purpose}</p>
        <p><strong>Tanggal Daftar:</strong> ${new Date(participant.timestamp).toLocaleString('id-ID')}</p>
    `;
    
    if (participant.status === 'pelajar') {
        details += `
            <p><strong>Sekolah:</strong> ${participant.school}</p>
            <p><strong>NIS:</strong> ${participant.nis}</p>
            <p><strong>Tingkat:</strong> ${participant.level.toUpperCase()}</p>
        `;
    } else {
        details += `
            <p><strong>Alamat:</strong> ${participant.address}</p>
            <p><strong>WhatsApp:</strong> ${participant.whatsapp}</p>
            <p><strong>Email:</strong> ${participant.email}</p>
        `;
    }
    
    alert(details);
}

// Delete participant
function deleteParticipant(id) {
    if (confirm('Apakah Anda yakin ingin menghapus peserta ini?')) {
        const participants = JSON.parse(localStorage.getItem('participants') || [];
        participants.splice(id, 1);
        localStorage.setItem('participants', JSON.stringify(participants));
        loadParticipants();
    }
}

// Export to Excel
document.getElementById('export-excel').addEventListener('click', () => {
    const participants = JSON.parse(localStorage.getItem('participants') || [];
    
    if (participants.length === 0) {
        alert('Tidak ada data peserta untuk diexport');
        return;
    }
    
    // Create CSV content
    let csvContent = "No,Nama Lengkap,Status,Tujuan,Tanggal Daftar\n";
    
    participants.forEach((participant, index) => {
        csvContent += `${index + 1},${participant.fullname},${participant.status === 'pelajar' ? 'Pelajar' : 'Umum'},${participant.purpose},${new Date(participant.timestamp).toLocaleDateString('id-ID')}\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data_peserta_ujian.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Export to Word
document.getElementById('export-word').addEventListener('click', () => {
    alert('Fitur export ke Word akan diimplementasikan di sini');
});

// Export to PDF
document.getElementById('export-pdf').addEventListener('click', () => {
    alert('Fitur export ke PDF akan diimplementasikan di sini');
});

// Search participant
document.getElementById('search-participant-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-participant').value.toLowerCase();
    const rows = document.querySelectorAll('.participants-list tbody tr');
    
    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const status = row.cells[2].textContent.toLowerCase();
        const purpose = row.cells[3].textContent.toLowerCase();
        
        if (name.includes(searchTerm) || status.includes(searchTerm) || purpose.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Setup admin event listeners
function setupAdminEventListeners() {
    // Save login code
    document.getElementById('save-login-code').addEventListener('click', () => {
        const newCode = document.getElementById('new-login-code').value;
        const currentCode = document.getElementById('current-login-code').value;
        
        if (currentCode !== DEFAULT_LOGIN_CODE) {
            alert('Kode login lama tidak sesuai');
            return;
        }
        
        if (newCode.length < 4) {
            alert('Kode login baru minimal 4 karakter');
            return;
        }
        
        DEFAULT_LOGIN_CODE = newCode;
        alert('Kode login berhasil diubah');
    });
    
    // Save CPNS code
    document.getElementById('save-cpns-code').addEventListener('click', () => {
        const newCode = document.getElementById('new-cpns-code').value;
        const currentCode = document.getElementById('current-cpns-code').value;
        
        if (currentCode !== DEFAULT_CPNS_CODE) {
            alert('Kode ujian CPNS lama tidak sesuai');
            return;
        }
        
        if (newCode.length < 4) {
            alert('Kode ujian CPNS baru minimal 4 karakter');
            return;
        }
        
        DEFAULT_CPNS_CODE = newCode;
        alert('Kode ujian CPNS berhasil diubah');
    });
    
    // Save bank soal code
    document.getElementById('save-bank-code').addEventListener('click', () => {
        const newCode = document.getElementById('new-bank-code').value;
        const currentCode = document.getElementById('current-bank-code').value;
        
        if (currentCode !== DEFAULT_BANK_CODE) {
            alert('Kode bank soal lama tidak sesuai');
            return;
        }
        
        if (newCode.length < 4) {
            alert('Kode bank soal baru minimal 4 karakter');
            return;
        }
        
        DEFAULT_BANK_CODE = newCode;
        alert('Kode bank soal berhasil diubah');
    });
    
    // Save admin code
    document.getElementById('save-admin-code').addEventListener('click', () => {
        const newCode = document.getElementById('new-admin-code').value;
        const currentCode = document.getElementById('current-admin-code').value;
        
        if (currentCode !== DEFAULT_ADMIN_CODE) {
            alert('Kode admin lama tidak sesuai');
            return;
        }
        
        if (newCode.length < 4) {
            alert('Kode admin baru minimal 4 karakter');
            return;
        }
        
        DEFAULT_ADMIN_CODE = newCode;
        alert('Kode admin berhasil diubah');
    });
    
    // Add question button
    document.getElementById('add-question-btn').addEventListener('click', () => {
        document.querySelector('.question-form').style.display = 'block';
    });
    
    // Cancel question form
    document.getElementById('cancel-question-btn').addEventListener('click', () => {
        document.querySelector('.question-form').style.display = 'none';
    });
    
    // Save question
    document.getElementById('save-question-btn').addEventListener('click', saveQuestion);
    
    // AI generate question
    document.getElementById('ai-generate-btn').addEventListener('click', generateQuestionWithAI);
    
    // Upload image
    document.getElementById('upload-image-btn').addEventListener('click', uploadImage);
    
    // Search question
    document.getElementById('search-btn').addEventListener('click', searchQuestions);
    
    // Save timer setting
    document.getElementById('save-timer-setting').addEventListener('click', () => {
        const timerValue = document.getElementById('exam-timer-setting').value;
        if (timerValue < 5 || timerValue > 180) {
            alert('Waktu ujian harus antara 5-180 menit');
            return;
        }
        localStorage.setItem('examTimer', timerValue);
        alert('Pengaturan timer berhasil disimpan');
    });
    
    // Save chairman name
    document.getElementById('save-chairman-name').addEventListener('click', () => {
        const name = document.getElementById('chairman-name-setting').value;
        if (!name.trim()) {
            alert('Nama ketua tidak boleh kosong');
            return;
        }
        localStorage.setItem('chairmanName', name);
        alert('Nama ketua berhasil disimpan');
    });
    
    // Save motivation text
    document.getElementById('save-motivation-text').addEventListener('click', () => {
        const text = document.getElementById('motivation-text-setting').value;
        if (!text.trim()) {
            alert('Teks motivasi tidak boleh kosong');
            return;
        }
        localStorage.setItem('motivationText', text);
        alert('Teks motivasi berhasil disimpan');
    });
    
    // Save welcome text
    document.getElementById('save-welcome-text').addEventListener('click', () => {
        const text = document.getElementById('welcome-text-setting').value;
        if (!text.trim()) {
            alert('Teks sambutan tidak boleh kosong');
            return;
        }
        localStorage.setItem('welcomeText', text);
        alert('Teks sambutan berhasil disimpan');
    });
    
    // Save info text
    document.getElementById('save-info-text').addEventListener('click', () => {
        const text = document.getElementById('info-text-setting').value;
        if (!text.trim()) {
            alert('Teks informasi tidak boleh kosong');
            return;
        }
        localStorage.setItem('infoText', text);
        alert('Teks informasi berhasil disimpan');
    });
    
    // Save point setting
    document.getElementById('save-point-setting').addEventListener('click', () => {
        const points = document.getElementById('point-setting').value;
        localStorage.setItem('pointsPerQuestion', points);
        alert('Pengaturan point berhasil disimpan');
    });
    
    // Save randomize setting
    document.getElementById('save-randomize-setting').addEventListener('click', () => {
        const isRandom = document.getElementById('randomize-setting').checked;
        localStorage.setItem('randomizeQuestions', isRandom);
        alert('Pengaturan acak soal berhasil disimpan');
    });
    
    // Save question count
    document.getElementById('save-question-count').addEventListener('click', () => {
        const count = document.getElementById('question-count-setting').value;
        localStorage.setItem('questionCount', count);
        alert('Pengaturan jumlah soal berhasil disimpan');
    });
    
    // Save exam toggle
    document.getElementById('save-exam-toggle').addEventListener('click', () => {
        const studentEnabled = document.getElementById('student-exam-toggle').checked;
        const generalEnabled = document.getElementById('general-exam-toggle').checked;
        
        if (!studentEnabled && !generalEnabled) {
            alert('Minimal satu jenis ujian harus diaktifkan');
            return;
        }
        
        localStorage.setItem('studentExamEnabled', studentEnabled);
        localStorage.setItem('generalExamEnabled', generalEnabled);
        alert('Pengaturan jenis ujian berhasil disimpan');
    });
}

// Save question
function saveQuestion() {
    const type = document.getElementById('question-type').value;
    const category = document.getElementById('question-category').value;
    const grade = type === 'pelajar' ? document.getElementById('question-grade').value : null;
    const text = document.getElementById('question-text').value;
    const options = {
        a: document.getElementById('option-a-input').value,
        b: document.getElementById('option-b-input').value,
        c: document.getElementById('option-c-input').value,
        d: document.getElementById('option-d-input').value,
        e: document.getElementById('option-e-input').value
    };
    const correctAnswer = document.getElementById('correct-answer').value;
    const explanation = document.getElementById('explanation').value;
    
    if (!text.trim()) {
        alert('Pertanyaan tidak boleh kosong');
        return;
    }
    
    if (!options.a.trim() || !options.b.trim() || !options.c.trim() || !options.d.trim() || !options.e.trim()) {
        alert('Semua pilihan jawaban harus diisi');
        return;
    }
    
    if (!explanation.trim()) {
        alert('Penjelasan jawaban harus diisi');
        return;
    }
    
    // Generate new ID
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    
    // Create question object
    const newQuestion = {
        id: newId,
        type,
        category,
        grade,
        text,
        options,
        correctAnswer,
        explanation
    };
    
    // Add to questions array
    questions.push(newQuestion);
    
    // In a real app, this would be saved to a database
    alert('Soal berhasil disimpan');
    document.querySelector('.question-form').style.display = 'none';
    resetQuestionForm();
}

// Reset question form
function resetQuestionForm() {
    document.getElementById('question-text').value = '';
    document.getElementById('option-a-input').value = '';
    document.getElementById('option-b-input').value = '';
    document.getElementById('option-c-input').value = '';
    document.getElementById('option-d-input').value = '';
    document.getElementById('option-e-input').value = '';
    document.getElementById('correct-answer').value = 'a';
    document.getElementById('explanation').value = '';
}

// Generate question with AI
function generateQuestionWithAI() {
    alert('Fitur generate soal dengan AI akan diimplementasikan di sini');
}

// Upload image
function uploadImage() {
    alert('Fitur upload gambar akan diimplementasikan di sini');
}

// Search questions
function searchQuestions() {
    alert('Fitur pencarian soal akan diimplementasikan di sini');
}
