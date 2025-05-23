// Admin panel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings from localStorage
    loadAdminSettings();
    
    // Save login code
    document.getElementById('saveLoginCode').addEventListener('click', function() {
        const newCode = document.getElementById('newLoginCode').value;
        if (newCode) {
            localStorage.setItem('loginCode', newCode);
            document.getElementById('currentLoginCode').value = newCode;
            document.getElementById('newLoginCode').value = '';
            alert('Kode login berhasil diubah');
        } else {
            alert('Masukkan kode baru');
        }
    });
    
    // Save CPNS code
    document.getElementById('saveCPNSCode').addEventListener('click', function() {
        const newCode = document.getElementById('newCPNSCode').value;
        if (newCode) {
            localStorage.setItem('cpnsCode', newCode);
            document.getElementById('currentCPNSCode').value = newCode;
            document.getElementById('newCPNSCode').value = '';
            alert('Kode CPNS berhasil diubah');
        } else {
            alert('Masukkan kode baru');
        }
    });
    
    // Save question bank code
    document.getElementById('saveQuestionCode').addEventListener('click', function() {
        const newCode = document.getElementById('newQuestionCode').value;
        if (newCode) {
            localStorage.setItem('questionBankCode', newCode);
            document.getElementById('currentQuestionCode').value = newCode;
            document.getElementById('newQuestionCode').value = '';
            alert('Kode bank soal berhasil diubah');
        } else {
            alert('Masukkan kode baru');
        }
    });
    
    // Save admin code
    document.getElementById('saveAdminCode').addEventListener('click', function() {
        const newCode = document.getElementById('newAdminCode').value;
        if (newCode) {
            localStorage.setItem('adminCode', newCode);
            document.getElementById('currentAdminCode').value = newCode;
            document.getElementById('newAdminCode').value = '';
            alert('Kode admin berhasil diubah');
        } else {
            alert('Masukkan kode baru');
        }
    });
    
    // Save exam settings
    document.getElementById('saveExamSettings').addEventListener('click', function() {
        const examTimer = document.getElementById('examTimerSetting').value;
        const questionCount = document.getElementById('questionCount').value;
        const pointValue = document.getElementById('pointValue').value;
        const randomizeQuestions = document.getElementById('randomizeQuestions').checked;
        
        const enabledSubjects = {
            agama: document.getElementById('enableAgama').checked,
            ppkn: document.getElementById('enablePPKN').checked,
            sejarah: document.getElementById('enableSejarah').checked,
            ipa: document.getElementById('enableIPA').checked,
            ips: document.getElementById('enableIPS').checked,
            matematika: document.getElementById('enableMatematika').checked,
            bahasa_indonesia: document.getElementById('enableBahasaIndonesia').checked,
            bahasa_inggris: document.getElementById('enableBahasaInggris').checked,
            materi_extra: document.getElementById('enableMateriExtra').checked,
            materi_khusus: document.getElementById('enableMateriKhusus').checked,
            logika: document.getElementById('enableLogika').checked,
            cpns: document.getElementById('enableCPNS').checked
        };
        
        localStorage.setItem('examTimer', examTimer);
        localStorage.setItem('questionCount', questionCount);
        localStorage.setItem('pointValue', pointValue);
        localStorage.setItem('randomizeQuestions', randomizeQuestions);
        localStorage.setItem('enabledSubjects', JSON.stringify(enabledSubjects));
        
        alert('Pengaturan ujian berhasil disimpan');
    });
    
    // Save text settings
    document.getElementById('saveTextSettings').addEventListener('click', function() {
        const greetingMessage = document.getElementById('greetingMessage').value;
        const infoBannerText = document.getElementById('infoBannerText').value;
        const chairmanName = document.getElementById('chairmanNameSetting').value;
        
        const motivationMessages = {
            motivation90: document.getElementById('motivation90').value,
            motivation80: document.getElementById('motivation80').value,
            motivation70: document.getElementById('motivation70').value,
            motivation60: document.getElementById('motivation60').value,
            motivation50: document.getElementById('motivation50').value,
            motivationBelow50: document.getElementById('motivationBelow50').value
        };
        
        localStorage.setItem('greetingMessage', greetingMessage);
        localStorage.setItem('infoBannerText', infoBannerText);
        localStorage.setItem('chairmanName', chairmanName);
        localStorage.setItem('motivationMessages', JSON.stringify(motivationMessages));
        
        // Update UI
        document.getElementById('greetingText').textContent = greetingMessage;
        document.getElementById('infoBanner').textContent = infoBannerText;
        document.getElementById('chairmanName').textContent = chairmanName;
        
        alert('Pengaturan teks berhasil disimpan');
    });
});

function loadAdminSettings() {
    // Load codes
    if (localStorage.getItem('loginCode')) {
        document.getElementById('currentLoginCode').value = localStorage.getItem('loginCode');
    }
    
    if (localStorage.getItem('cpnsCode')) {
        document.getElementById('currentCPNSCode').value = localStorage.getItem('cpnsCode');
    }
    
    if (localStorage.getItem('questionBankCode')) {
        document.getElementById('currentQuestionCode').value = localStorage.getItem('questionBankCode');
    }
    
    if (localStorage.getItem('adminCode')) {
        document.getElementById('currentAdminCode').value = localStorage.getItem('adminCode');
    }
    
    // Load exam settings
    if (localStorage.getItem('examTimer')) {
        document.getElementById('examTimerSetting').value = localStorage.getItem('examTimer');
    }
    
    if (localStorage.getItem('questionCount')) {
        document.getElementById('questionCount').value = localStorage.getItem('questionCount');
    }
    
    if (localStorage.getItem('pointValue')) {
        document.getElementById('pointValue').value = localStorage.getItem('pointValue');
    }
    
    if (localStorage.getItem('randomizeQuestions')) {
        document.getElementById('randomizeQuestions').checked = localStorage.getItem('randomizeQuestions') === 'true';
    }
    
    if (localStorage.getItem('enabledSubjects')) {
        const enabledSubjects = JSON.parse(localStorage.getItem('enabledSubjects'));
        for (const subject in enabledSubjects) {
            const checkbox = document.getElementById(`enable${subject.charAt(0).toUpperCase() + subject.slice(1)}`);
            if (checkbox) {
                checkbox.checked = enabledSubjects[subject];
            }
        }
    }
    
    // Load text settings
    if (localStorage.getItem('greetingMessage')) {
        document.getElementById('greetingMessage').value = localStorage.getItem('greetingMessage');
        document.getElementById('greetingText').textContent = localStorage.getItem('greetingMessage');
    }
    
    if (localStorage.getItem('infoBannerText')) {
        document.getElementById('infoBannerText').value = localStorage.getItem('infoBannerText');
        document.getElementById('infoBanner').textContent = localStorage.getItem('infoBannerText');
    }
    
    if (localStorage.getItem('chairmanName')) {
        document.getElementById('chairmanNameSetting').value = localStorage.getItem('chairmanName');
        document.getElementById('chairmanName').textContent = localStorage.getItem('chairmanName');
    }
    
    if (localStorage.getItem('motivationMessages')) {
        const motivationMessages = JSON.parse(localStorage.getItem('motivationMessages'));
        for (const key in motivationMessages) {
            const textarea = document.getElementById(key);
            if (textarea) {
                textarea.value = motivationMessages[key];
            }
        }
    }
}
