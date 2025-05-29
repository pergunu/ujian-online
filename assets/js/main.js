document.addEventListener('DOMContentLoaded', function() {
    // Initialize database
    initDatabase();
    
    // Play opening audio
    const openingAudio = document.getElementById('openingAudio');
    openingAudio.volume = 0.5;
    openingAudio.play().catch(e => console.log('Autoplay prevented:', e));
    
    // Set default codes if not exists
    if (!localStorage.getItem('loginCode')) {
        localStorage.setItem('loginCode', '12345');
    }
    if (!localStorage.getItem('cpnsCode')) {
        localStorage.setItem('cpnsCode', 'OPENLOCK-1945');
    }
    if (!localStorage.getItem('questionBankCode')) {
        localStorage.setItem('questionBankCode', 'OPENLOCK-1926');
    }
    if (!localStorage.getItem('adminCode')) {
        localStorage.setItem('adminCode', '65614222');
    }
    
    // Set welcome text from localStorage or default
    const welcomeTitle = document.getElementById('welcomeTitle');
    const savedWelcome = localStorage.getItem('welcomeText') || 'Selamat Datang di Ujian Online Pergunu Situbondo';
    welcomeTitle.textContent = savedWelcome;
    
    // Enter button click event
    document.getElementById('enterBtn').addEventListener('click', function() {
        const accessCode = document.getElementById('accessCode').value;
        const savedCode = localStorage.getItem('loginCode');
        
        if (accessCode === savedCode) {
            playSound('click');
            switchScreen('welcome-screen', 'terms-screen');
        } else {
            alert('Kode akses salah! Silakan coba lagi.');
        }
    });
    
    // Terms checkbox change event
    document.getElementById('agreeCheckbox').addEventListener('change', function() {
        document.getElementById('continueBtn').disabled = !this.checked;
    });
    
    // Continue button click event
    document.getElementById('continueBtn').addEventListener('click', function() {
        playSound('click');
        switchScreen('terms-screen', 'participant-form');
        loadParticipantForm();
    });
    
    // Floating buttons events
    document.getElementById('shareBtn').addEventListener('click', function() {
        playSound('click');
        shareApp();
    });
    
    document.getElementById('whatsappBtn').addEventListener('click', function() {
        playSound('click');
        window.open('https://wa.me/6285647709114?text=Assalamualaikum%20admin,%20saya%20mau%20tanya%20tentang%20ujian%20online...', '_blank');
    });
    
    document.getElementById('adminBtn').addEventListener('click', function() {
        playSound('click');
        showAdminLogin();
    });
});

function initDatabase() {
    // Initialize all required data in localStorage
    if (!localStorage.getItem('questionBank')) {
        const sampleQuestions = [
            // Sample questions would be here
            // Same as in the previous example
        ];
        localStorage.setItem('questionBank', JSON.stringify(sampleQuestions));
    }
    
    if (!localStorage.getItem('examHistory')) {
        localStorage.setItem('examHistory', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('welcomeText')) {
        localStorage.setItem('welcomeText', 'Selamat Datang di Ujian Online Pergunu Situbondo');
    }
    
    if (!localStorage.getItem('chairmanName')) {
        localStorage.setItem('chairmanName', 'Moh. Nuril Hudha, S.Pd., M.Si.');
    }
    
    if (!localStorage.getItem('motivationMessages')) {
        localStorage.setItem('motivationMessages', JSON.stringify([
            'Sempurna! Anda sangat luar biasa dalam menguasai materi ini.',
            'Kerja bagus! Anda telah menunjukkan pemahaman yang baik.',
            'Hasil yang cukup baik. Tingkatkan lagi belajar Anda!',
            'Anda perlu belajar lebih giat lagi. Jangan menyerah!'
        ]));
    }
    
    if (!localStorage.getItem('examSettings')) {
        localStorage.setItem('examSettings', JSON.stringify({
            timer: 120,
            questionPoints: 1,
            questionCount: 10,
            randomize: true
        }));
    }
}

function switchScreen(from, to) {
    const fromScreen = document.querySelector(`.${from}`);
    const toScreen = document.querySelector(`.${to}`);
    
    fromScreen.classList.remove('active');
    toScreen.classList.add('active');
}

function playSound(type) {
    const audio = document.getElementById(`${type}Audio`);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play prevented:', e));
    }
}

function loadParticipantForm() {
    // Implementation would load the participant form dynamically
    // based on the user type (student/general)
}

function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'Ujian Online Pergunu Situbondo',
            text: 'Ikuti ujian online profesional dari Pergunu Situbondo',
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    // Implementation for browsers that don't support Web Share API
    alert('Silakan salin tautan ini: ' + window.location.href);
}

function showAdminLogin() {
    // Implementation for admin login modal
    const modal = document.getElementById('adminModal');
    modal.style.display = 'block';
    
    // Close modal when clicking X
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Load admin panel if code is correct
    const adminContent = modal.querySelector('.admin-content');
    adminContent.innerHTML = `
        <div class="admin-login">
            <p>Masukkan kode admin:</p>
            <input type="password" id="adminCodeInput" placeholder="Kode Admin">
            <button id="adminLoginBtn" class="btn btn-primary">Masuk</button>
        </div>
    `;
    
    document.getElementById('adminLoginBtn').addEventListener('click', function() {
        const enteredCode = document.getElementById('adminCodeInput').value;
        const savedCode = localStorage.getItem('adminCode');
        
        if (enteredCode === savedCode) {
            playSound('click');
            loadAdminPanel();
        } else {
            alert('Kode admin salah!');
        }
    });
}

function loadAdminPanel() {
    // Implementation for loading the full admin panel
    const adminContent = document.querySelector('.admin-content');
    adminContent.innerHTML = `
        <div class="admin-tabs">
            <button class="tab-btn active" data-tab="settings">Pengaturan</button>
            <button class="tab-btn" data-tab="questions">Bank Soal</button>
            <button class="tab-btn" data-tab="participants">Peserta</button>
        </div>
        
        <div class="tab-content active" id="settings">
            <!-- Settings content would be here -->
        </div>
        
        <div class="tab-content" id="questions">
            <!-- Questions content would be here -->
        </div>
        
        <div class="tab-content" id="participants">
            <!-- Participants content would be here -->
        </div>
    `;
    
    // Tab switching functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(tabBtn => {
                tabBtn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update active tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Load each tab content
    loadSettingsTab();
    loadQuestionsTab();
    loadParticipantsTab();
}

// Additional functions for admin panel and other features would follow
// including loadSettingsTab(), loadQuestionsTab(), loadParticipantsTab()
// and all other necessary functions for the complete application
