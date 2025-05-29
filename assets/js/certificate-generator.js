// Certificate Generator Module
class CertificateGenerator {
  constructor() {
    this.certificateData = null;
    this.motivations = {
      '90-100': 'Sempurna! Anda sangat luar biasa dalam menguasai materi ini. Pertahankan prestasi ini.',
      '75-89': 'Bagus! Anda telah menunjukkan pemahaman yang baik terhadap materi ujian.',
      '60-74': 'Cukup baik. Masih ada ruang untuk meningkatkan pemahaman Anda.',
      '0-59': 'Jangan menyerah! Gunakan hasil ini sebagai motivasi untuk belajar lebih giat lagi.'
    };
  }

  generate(participantData, examResults) {
    this.certificateData = {
      name: participantData.fullname,
      status: participantData.status,
      level: participantData.level || 'umum',
      subject: participantData.examType || 'umum',
      score: examResults.score,
      date: new Date(),
      uniqueCode: this.generateUniqueCode()
    };
    
    this.updateCertificateDisplay();
    this.playApplause();
  }

  generateUniqueCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return code;
  }

  updateCertificateDisplay() {
    if (!this.certificateData) return;
    
    // Set basic information
    document.getElementById('certificate-name').textContent = this.certificateData.name;
    document.getElementById('certificate-score').textContent = this.certificateData.score;
    
    // Format date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = this.certificateData.date.toLocaleDateString('id-ID', options);
    document.getElementById('certificate-date').textContent = `Ditetapkan di: Situbondo, ${dateStr}`;
    
    // Generate certificate code
    const dateCode = this.certificateData.date.toISOString().slice(0,10).replace(/-/g, '');
    const certCode = `${this.certificateData.name.toUpperCase().replace(/ /g, '_')}/${this.certificateData.status.toUpperCase()}/${this.certificateData.level.toUpperCase()}/${this.certificateData.subject.toUpperCase()}/${dateCode}/${this.certificateData.uniqueCode}/PERGUNU-STB`;
    document.getElementById('certificate-code').textContent = certCode;
    
    // Set motivation based on score
    const motivation = this.getMotivation(this.certificateData.score);
    document.getElementById('certificate-motivation').textContent = motivation;
    
    // Load chairman name from settings
    fetch('data/settings.json')
      .then(response => response.json())
      .then(settings => {
        document.getElementById('certificate-chairman').textContent = settings.chairmanName;
      });
  }

  getMotivation(score) {
    if (score >= 90) return this.motivations['90-100'];
    if (score >= 75) return this.motivations['75-89'];
    if (score >= 60) return this.motivations['60-74'];
    return this.motivations['0-59'];
  }

  playApplause() {
    const applause = document.getElementById('applauseAudio');
    applause.volume = 0.7;
    applause.play().catch(e => console.log('Audio play error:', e));
  }

  print() {
    // Hide elements not needed for printing
    const elementsToHide = document.querySelectorAll('.no-print, .floating-buttons, .certificate-actions');
    elementsToHide.forEach(el => el.style.display = 'none');
    
    // Trigger print
    window.print();
    
    // Show elements again after printing
    setTimeout(() => {
      elementsToHide.forEach(el => el.style.display = '');
    }, 1000);
  }
}

// Initialize certificate generator
const certificateGenerator = new CertificateGenerator();

// Set up print button
document.getElementById('print-certificate-btn')?.addEventListener('click', () => {
  certificateGenerator.print();
});
