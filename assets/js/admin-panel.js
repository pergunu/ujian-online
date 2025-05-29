// Admin Panel Module
function initAdminPanel() {
  // Bank soal access
  const accessBankSoalBtn = document.getElementById('access-bank-soal-btn');
  if (accessBankSoalBtn) {
    accessBankSoalBtn.addEventListener('click', function() {
      const code = document.getElementById('bank-soal-code').value;
      if (code === 'OPENLOCK-1926') { // Default bank soal code
        document.getElementById('bank-soal-modal').style.display = 'none';
        document.getElementById('bank-soal-content').style.display = 'block';
        loadBankSoal();
        playButtonSound();
      } else {
        alert('Kode bank soal salah!');
        playErrorSound();
      }
    });
  }

  // Admin panel access
  const accessAdminBtn = document.getElementById('access-admin-btn');
  if (accessAdminBtn) {
    accessAdminBtn.addEventListener('click', function() {
      const code = document.getElementById('admin-code').value;
      if (code === '65614222') { // Default admin code
        document.getElementById('admin-modal').style.display = 'none';
        document.getElementById('admin-panel-content').style.display = 'block';
        loadAdminPanel();
        playButtonSound();
      } else {
        alert('Kode admin salah!');
        playErrorSound();
      }
    });
  }
}

function loadBankSoal() {
  // Load questions from localStorage or JSON file
  fetch('data/questions.json')
    .then(response => response.json())
    .then(questions => {
      const tableBody = document.querySelector('#bank-soal-content table tbody');
      tableBody.innerHTML = '';
      
      questions.forEach((question, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${question.text.substring(0, 50)}${question.text.length > 50 ? '...' : ''}</td>
          <td>${question.category}</td>
          <td>${question.level}</td>
          <td>
            <button class="edit-btn" data-id="${question.id}">Edit</button>
            <button class="delete-btn" data-id="${question.id}">Hapus</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
      
      // Add event listeners to buttons
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const questionId = this.dataset.id;
          editQuestion(questionId);
        });
      });
      
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const questionId = this.dataset.id;
          deleteQuestion(questionId);
        });
      });
    })
    .catch(error => {
      console.error('Error loading questions:', error);
    });
}

function loadAdminPanel() {
  // Load settings
  fetch('data/settings.json')
    .then(response => response.json())
    .then(settings => {
      // Set current codes
      document.getElementById('current-login-code').textContent = settings.adminCodes.login;
      document.getElementById('current-cpns-code').textContent = settings.adminCodes.cpns;
      document.getElementById('current-bank-code').textContent = settings.adminCodes.bankSoal;
      document.getElementById('current-admin-code').textContent = settings.adminCodes.adminPanel;
      
      // Set welcome message
      document.getElementById('welcome-message').value = settings.welcomeMessage;
      
      // Set info message
      document.getElementById('info-message').value = settings.infoText;
      
      // Set motivations
      document.getElementById('motivation-90').value = settings.motivations['90-100'];
      document.getElementById('motivation-75').value = settings.motivations['75-89'];
      document.getElementById('motivation-60').value = settings.motivations['60-74'];
      document.getElementById('motivation-0').value = settings.motivations['0-59'];
      
      // Set chairman name
      document.getElementById('chairman-name').value = settings.chairmanName;
    });
  
  // Load participants data
  loadParticipantsData();
}

function loadParticipantsData() {
  // Load from localStorage or JSON file
  let participants = JSON.parse(localStorage.getItem('participants')) || [];
  
  const tableBody = document.querySelector('#admin-panel-content table tbody');
  tableBody.innerHTML = '';
  
  participants.forEach((participant, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${participant.fullname}</td>
      <td>${participant.status}</td>
      <td>${participant.purpose}</td>
      <td>${participant.level || '-'}</td>
      <td>${participant.score || '-'}</td>
      <td>${new Date(participant.timestamp).toLocaleString()}</td>
      <td>
        <button class="view-btn" data-id="${index}">Lihat</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
  
  // Add export functionality
  document.getElementById('export-participants-btn')?.addEventListener('click', exportParticipants);
}

function exportParticipants() {
  const participants = JSON.parse(localStorage.getItem('participants')) || [];
  let csv = 'No,Nama Lengkap,Status,Tujuan,Kategori,Nilai,Waktu\n';
  
  participants.forEach((p, i) => {
    csv += `${i + 1},"${p.fullname}",${p.status},${p.purpose},${p.level || '-'},${p.score || '-'},${new Date(p.timestamp).toLocaleString()}\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `peserta-ujian-${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
}

// Helper functions
function playButtonSound() {
  const audio = document.getElementById('buttonAudio');
  audio.currentTime = 0;
  audio.play().catch(e => console.log('Audio play error:', e));
}

function playErrorSound() {
  const audio = document.getElementById('wrongAudio');
  audio.currentTime = 0;
  audio.play().catch(e => console.log('Audio play error:', e));
}
