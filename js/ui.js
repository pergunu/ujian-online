import AppConfig from './config.js';

// Fungsi untuk membuat efek confetti
export function createConfetti() {
    const colors = ['#4361ee', '#3a0ca3', '#f72585', '#4cc9f0', '#4895ef', '#f8961e'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        
        // Hapus setelah animasi selesai
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Fungsi untuk membuat bintang latar belakang
export function createStars() {
    const starsContainer = document.getElementById('stars');
    const starsCount = 100;
    
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Posisi acak
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Ukuran acak
        const size = Math.random() * 3 + 1;
        
        // Opacity dan durasi acak
        const opacity = Math.random() * 0.7 + 0.3;
        const duration = Math.random() * 5 + 3;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--opacity', opacity);
        star.style.setProperty('--duration', `${duration}s`);
        
        starsContainer.appendChild(star);
    }
}

// Fungsi untuk menampilkan sertifikat
export function renderCertificate(participantData, score) {
    const percentage = Math.round((score / participantData.totalQuestions) * 100);
    const now = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    
    // Format nama peserta
    const formattedName = formatName(participantData.name);
    
    // Generate watermark code
    const watermarkCode = generateWatermarkCode(participantData, now);
    
    // Set konten sertifikat
    document.getElementById('participantName').textContent = formattedName;
    document.getElementById('scoreDisplay').textContent = `${percentage}%`;
    document.getElementById('watermarkCode').textContent = watermarkCode;
    document.getElementById('certificateDate').textContent = 
        `Ditetapkan di: Situbondo, ${now.toLocaleDateString('id-ID', options)}`;
    
    // Set pesan hasil
    setResultMessage(percentage);
}

// Helper untuk format nama
function formatName(name) {
    return name.toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Helper untuk generate watermark code
function generateWatermarkCode(participantData, date) {
    const dateStr = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth()+1).toString().padStart(2, '0')}${date.getFullYear()}`;
    const uniqueCode = generateUniqueCode();
    
    const categoryMap = {
        pelajar: 'PELAJAR',
        umum: 'UMUM'
    };
    
    const subcategoryMap = {
        pelajar: {
            ipa: "IPA",
            ips: "IPS",
            matematika: "MATEMATIKA",
            agama: "AGAMA",
            ppkn: "PPKN",
            sejarah: "SEJARAH",
            bahasa_indonesia: "BAHASA INDONESIA",
            bahasa_inggris: "BAHASA INGGRIS"
        },
        umum: {
            logika: "UJIAN LOGIKA"
        }
    };
    
    return `${participantData.name.toUpperCase()}/${categoryMap[participantData.category]}/${
        subcategoryMap[participantData.category][participantData.subcategory]}/${dateStr}/${uniqueCode}/PERGUNU-STB`;
}

// Helper untuk generate kode unik
function generateUniqueCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    
    for (let i = 0; i < 8; i++) {
        if (i > 0 && i % 4 === 0) code += '-';
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return code;
}

// Helper untuk set pesan hasil
function setResultMessage(percentage) {
    let message = "";
    if (percentage >= 80) {
        message = `<p>SEMPURNA! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini!</p>`;
    } else if (percentage >= 60) {
        message = `<p>BAIK SEKALI! Anda memiliki pemahaman yang solid tentang materi ini.</p>`;
    } else if (percentage >= 40) {
        message = `<p>CUKUP BAIK. Tingkatkan lagi belajarnya!</p>`;
    } else {
        message = `<p>TERUS BERLATIH! Setiap kesalahan adalah kesempatan untuk belajar lebih baik lagi.</p>`;
    }
    
    document.getElementById('resultsMessage').innerHTML = message;
}
