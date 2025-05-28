// Fungsi untuk memuat data peserta
function loadParticipantData() {
    const examHistory = JSON.parse(localStorage.getItem('examHistory')) || [];
    const participantList = document.getElementById('participantList');
    
    if (examHistory.length === 0) {
        participantList.innerHTML = '<p>Belum ada data peserta.</p>';
        return;
    }
    
    participantList.innerHTML = '';
    
    examHistory.forEach((result, index) => {
        const participant = result.participant;
        const item = document.createElement('div');
        item.className = 'participant-item';
        
        item.innerHTML = `
            <div class="participant-info">
                <h4>${participant.fullName}</h4>
                <p>Status: ${participant.status === 'pelajar' ? 'Pelajar' : 'Umum'}</p>
                <p>Ujian: ${result.subject.replace(/_/g, ' ').toUpperCase()}</p>
                <p>Tanggal: ${new Date(result.date).toLocaleDateString('id-ID')}</p>
            </div>
            <div class="participant-score">
                <span>${result.percentage}%</span>
            </div>
            <div class="participant-actions">
                <button class="btn-small view-btn" data-index="${index}"><i class="fas fa-eye"></i></button>
                <button class="btn-small delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        participantList.appendChild(item);
    });
    
    // Event listener untuk tombol lihat
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            viewParticipantDetails(index);
        });
    });
    
    // Event listener untuk tombol hapus
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            deleteParticipant(index);
        });
    });
}

// Fungsi untuk melihat detail peserta
function viewParticipantDetails(index) {
    const examHistory = JSON.parse(localStorage.getItem('examHistory'));
    const result = examHistory[index];
    const participant = result.participant;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Detail Peserta</h3>
            
            <div class="participant-details">
                <div class="detail-group">
                    <label>Nama Lengkap:</label>
                    <p>${participant.fullName}</p>
                </div>
                
                <div class="detail-group">
                    <label>Status:</label>
                    <p>${participant.status === 'pelajar' ? 'Pelajar' : 'Umum'}</p>
                </div>
                
                ${participant.status === 'pelajar' ? `
                    <div class="detail-group">
                        <label>Nama Sekolah:</label>
                        <p>${participant.schoolName}</p>
                    </div>
                    
                    <div class="detail-group">
                        <label>NIS:</label>
                        <p>${participant.studentId}</p>
                    </div>
                    
                    <div class="detail-group">
                        <label>Tujuan Ujian:</label>
                        <p>${getPurposeText(participant.purpose)}</p>
                    </div>
                    
                    <div class="detail-group">
                        <label>Tingkat Sekolah:</label>
                        <p>${participant.schoolLevel}</p>
                    </div>
                ` : `
                    <div class="detail-group">
                        <label>Alamat:</label>
                        <p>${participant.address}</p>
                    </div>
                    
                    <div class="detail-group">
                        <label>Nomor WhatsApp:</label>
                        <p>${participant.phone}</p>
                    </div>
                    
                    <div class="detail-group">
                        <label>Email:</label>
                        <p>${participant.email}</p>
                    </div>
                    
                    <div class="detail-group">
                        <label>Tujuan Ujian:</label>
                        <p>${getPurposeText(participant.purpose)}</p>
                    </div>
                `}
                
                <div class="detail-group">
                    <label>Hasil Ujian:</label>
                    <p>${result.subject.replace(/_/g, ' ').toUpperCase()} - ${result.percentage}%</p>
                </div>
                
                <div class="detail-group">
                    <label>Detail Nilai:</label>
                    <p>Benar: ${result.correctAnswers}, Salah: ${result.wrongAnswers}, Tidak Dijawab: ${result.skippedQuestions}</p>
                </div>
                
                <div class="detail-group">
                    <label>Tanggal Ujian:</label>
                    <p>${new Date(result.date).toLocaleString('id-ID')}</p>
                </div>
                
                <div class="detail-group">
                    <label>Kode Sertifikat:</label>
                    <p>${generateCertificateCode(participant, result, new Date(result.date))}</p>
                </div>
            </div>
            
            <div class="detail-actions">
                <button class="btn-primary" id="exportParticipantBtn" data-index="${index}"><i class="fas fa-file-export"></i> Ekspor Data</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Event listener untuk tombol tutup
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.remove();
    });
    
    // Event listener untuk tombol ekspor
    modal.querySelector('#exportParticipantBtn').addEventListener('click', function() {
        exportParticipantData(index);
    });
    
    // Klik di luar modal untuk menutup
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Fungsi untuk mendapatkan teks tujuan ujian
function getPurposeText(purpose) {
    const purposes = {
        'tugas_sekolah': 'Tugas Sekolah',
        'tugas_ulangan': 'Tugas Ulangan',
        'tes_belajar': 'Tes dan Belajar',
        'tes_iq': 'Tes IQ',
        'ujian_cpns': 'Ujian CPNS/P3K'
    };
    
    return purposes[purpose] || purpose;
}

// Fungsi untuk menghapus data peserta
function deleteParticipant(index) {
    if (confirm('Apakah Anda yakin ingin menghapus data peserta ini?')) {
        const examHistory = JSON.parse(localStorage.getItem('examHistory'));
        examHistory.splice(index, 1);
        localStorage.setItem('examHistory', JSON.stringify(examHistory));
        loadParticipantData();
        alert('Data peserta berhasil dihapus!');
    }
}

// Fungsi untuk mengekspor data peserta
function exportParticipantData(index) {
    const examHistory = JSON.parse(localStorage.getItem('examHistory'));
    const result = examHistory[index];
    
    // Format data untuk ekspor
    const exportData = {
        peserta: result.participant,
        hasil_ujian: {
            mata_ujian: result.subject.replace(/_/g, ' ').toUpperCase(),
            jawaban_benar: result.correctAnswers,
            jawaban_salah: result.wrongAnswers,
            tidak_dijawab: result.skippedQuestions,
            nilai: result.percentage + '%',
            tanggal: new Date(result.date).toLocaleString('id-ID')
        },
        kode_sertifikat: generateCertificateCode(result.participant, result, new Date(result.date))
    };
    
    // Buat blob untuk download
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportName = `peserta-${result.participant.fullName.replace(/\s+/g, '-')}-${new Date(result.date).toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
}

// Fungsi untuk mengekspor semua data peserta
function exportAllParticipants() {
    const examHistory = JSON.parse(localStorage.getItem('examHistory')) || [];
    
    if (examHistory.length === 0) {
        alert('Tidak ada data peserta untuk diekspor!');
        return;
    }
    
    // Format data untuk ekspor
    const exportData = examHistory.map(result => ({
        peserta: result.participant,
        hasil_ujian: {
            mata_ujian: result.subject.replace(/_/g, ' ').toUpperCase(),
            jawaban_benar: result.correctAnswers,
            jawaban_salah: result.wrongAnswers,
            tidak_dijawab: result.skippedQuestions,
            nilai: result.percentage + '%',
            tanggal: new Date(result.date).toLocaleString('id-ID')
        },
        kode_sertifikat: generateCertificateCode(result.participant, result, new Date(result.date))
    }));
    
    // Buat blob untuk download
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportName = `semua-peserta-ujian-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
}

// Event listener untuk tombol ekspor semua
document.getElementById('exportAllParticipantsBtn').addEventListener('click', exportAllParticipants);
