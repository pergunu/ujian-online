// Admin Panel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Code management
    const saveLoginCode = document.getElementById('save-login-code');
    const saveCPNSCode = document.getElementById('save-cpns-code');
    const saveQuestionCode = document.getElementById('save-question-code');
    const saveAdminCode = document.getElementById('save-admin-code');
    
    saveLoginCode.addEventListener('click', () => {
        const newCode = document.getElementById('new-login-code').value;
        const currentCode = document.getElementById('current-login-code').value;
        
        if (currentCode === '12345') { // Default code
            // In a real app, this would save to server
            alert('Kode login berhasil diubah!');
        } else {
            alert('Kode login lama salah.');
        }
    });
    
    saveCPNSCode.addEventListener('click', () => {
        const newCode = document.getElementById('new-cpns-code').value;
        const currentCode = document.getElementById('current-cpns-code').value;
        
        if (currentCode === 'OPENLOCK-1945') { // Default code
            // In a real app, this would save to server
            alert('Kode ujian CPNS berhasil diubah!');
        } else {
            alert('Kode ujian CPNS lama salah.');
        }
    });
    
    saveQuestionCode.addEventListener('click', () => {
        const newCode = document.getElementById('new-question-code').value;
        const currentCode = document.getElementById('current-question-code').value;
        
        if (currentCode === 'OPENLOCK-1926') { // Default code
            // In a real app, this would save to server
            alert('Kode bank soal berhasil diubah!');
        } else {
            alert('Kode bank soal lama salah.');
        }
    });
    
    saveAdminCode.addEventListener('click', () => {
        const newCode = document.getElementById('new-admin-code').value;
        const currentCode = document.getElementById('current-admin-code').value;
        
        if (currentCode === '65614222') { // Default code
            // In a real app, this would save to server
            alert('Kode admin berhasil diubah!');
        } else {
            alert('Kode admin lama salah.');
        }
    });
    
    // Exam settings
    const saveTimerSetting = document.getElementById('save-timer-setting');
    const savePointsSetting = document.getElementById('save-points-setting');
    const saveCountSetting = document.getElementById('save-count-setting');
    const randomizeQuestions = document.getElementById('randomize-questions');
    
    saveTimerSetting.addEventListener('click', () => {
        const minutes = document.getElementById('exam-timer-setting').value;
        alert(`Timer ujian diatur menjadi ${minutes} menit.`);
    });
    
    savePointsSetting.addEventListener('click', () => {
        const points = document.getElementById('question-points').value;
        alert(`Point per soal diatur menjadi ${points}.`);
    });
    
    saveCountSetting.addEventListener('click', () => {
        const count = document.getElementById('question-count').value;
        alert(`Jumlah soal diatur menjadi ${count}.`);
    });
    
    randomizeQuestions.addEventListener('click', () => {
        alert('Urutan soal telah diacak.');
    });
    
    // Content management
    const saveGreeting = document.getElementById('save-greeting');
    const saveInfo = document.getElementById('save-info');
    const saveChairman = document.getElementById('save-chairman');
    const saveMotivations = document.getElementById('save-motivations');
    
    saveGreeting.addEventListener('click', () => {
        const text = document.getElementById('greeting-text').value;
        alert('Teks pembuka berhasil disimpan: ' + text);
    });
    
    saveInfo.addEventListener('click', () => {
        const text = document.getElementById('info-text').value;
        alert('Informasi berkala berhasil disimpan: ' + text);
    });
    
    saveChairman.addEventListener('click', () => {
        const name = document.getElementById('chairman-name').value;
        alert('Nama ketua berhasil disimpan: ' + name);
    });
    
    saveMotivations.addEventListener('click', () => {
        const motivations = document.querySelectorAll('.motivation-text');
        motivations.forEach(m => {
            console.log(`Pesan untuk ${m.dataset.range}%: ${m.value}`);
        });
        alert('Semua pesan motivasi berhasil disimpan.');
    });
    
    // Question bank
    const addQuestionBtn = document.getElementById('add-question-btn');
    const aiQuestionBtn = document.getElementById('ai-question-btn');
    const questionForm = document.getElementById('question-form');
    const aiForm = document.getElementById('ai-form');
    const saveQuestion = document.getElementById('save-question');
    const cancelQuestion = document.getElementById('cancel-question');
    const generateAI = document.getElementById('generate-ai');
    const cancelAI = document.getElementById('cancel-ai');
    
    addQuestionBtn.addEventListener('click', () => {
        questionForm.style.display = 'block';
        aiForm.style.display = 'none';
    });
    
    aiQuestionBtn.addEventListener('click', () => {
        aiForm.style.display = 'block';
        questionForm.style.display = 'none';
    });
    
    cancelQuestion.addEventListener('click', () => {
        questionForm.style.display = 'none';
    });
    
    cancelAI.addEventListener('click', () => {
        aiForm.style.display = 'none';
    });
    
    saveQuestion.addEventListener('click', () => {
        // In a real app, this would save to database
        alert('Soal berhasil disimpan!');
        questionForm.style.display = 'none';
    });
    
    generateAI.addEventListener('click', () => {
        const prompt = document.getElementById('ai-prompt').value;
        const category = document.getElementById('ai-category').value;
        const count = document.getElementById('ai-count').value;
        
        if (!prompt) {
            alert('Silakan masukkan prompt untuk AI.');
            return;
        }
        
        // In a real app, this would call an AI API
        // You would need to insert your API key in the code below
        alert(`Fitur ini akan memanggil API AI dengan prompt: "${prompt}" untuk kategori ${category} sebanyak ${count} soal.`);
        
        // Example of where to insert API key:
        /*
        const apiKey = 'YOUR_OPENAI_API_KEY_HERE';
        fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `Generate ${count} multiple choice questions about ${category} with this context: ${prompt}`,
                max_tokens: 1000
            })
        })
        .then(response => response.json())
        .then(data => {
            // Process the AI response
            console.log(data);
        });
        */
        
        aiForm.style.display = 'none';
    });
    
    // Participants data
    const exportParticipants = document.getElementById('export-participants');
    const exportFormat = document.getElementById('export-format');
    
    exportParticipants.addEventListener('click', () => {
        alert(`Data peserta akan diexport dalam format ${exportFormat.value}.`);
    });
    
    // Load sample participants for demo
    loadSampleParticipants();
    
    function loadSampleParticipants() {
        const participants = [
            {
                name: "Uswatun Hasanah",
                status: "Pelajar",
                exam: "AGAMA",
                score: "90",
                date: "16/05/2024",
                certificate: "USWATUN_HASANAH/PELAJAR/SMA/AGAMA/16052024/T9B3-S6M3/PERGUNU-STB"
            },
            {
                name: "Budi Santoso",
                status: "Umum",
                exam: "CPNS",
                score: "75",
                date: "15/05/2024",
                certificate: "BUDI_SANTOSO/UMUM/CPNS/15052024/X2Y4-Z5W7/PERGUNU-STB"
            }
        ];
        
        const tableBody = document.getElementById('participants-table-body');
        tableBody.innerHTML = '';
        
        participants.forEach(p => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${p.name}</td>
                <td>${p.status}</td>
                <td>${p.exam}</td>
                <td>${p.score}</td>
                <td>${p.date}</td>
                <td>${p.certificate}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
});
