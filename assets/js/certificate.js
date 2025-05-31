class CertificateGenerator {
  static generateCertificate(participantData, examResults) {
    const certificateData = {
      name: participantData.fullName,
      score: examResults.score,
      date: new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      certificateCode: this.generateCertificateCode(participantData, examResults),
      motivation: this.getMotivationText(examResults.score)
    };
    
    return certificateData;
  }

  static generateCertificateCode(participantData, examResults) {
    const level = participantData.status === 'pelajar' ? 
      participantData.schoolLevel : 'UMUM';
    const category = participantData.status === 'pelajar' ? 
      participantData.studentPurpose : participantData.generalPurpose;
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    return `${participantData.fullName.toUpperCase().replace(/ /g, '_')}/${
      participantData.status.toUpperCase()}/${
      level}/${
      category}/${
      new Date().toISOString().split('T')[0].replace(/-/g, '')}/${
      randomCode}/PERGUNU-STB`;
  }

  static getMotivationText(score) {
    const texts = JSON.parse(localStorage.getItem('motivationTexts')) || {
      perfect: "Sempurna! Anda sangat luar biasa.",
      excellent: "Luar biasa! Hasil yang sangat baik.",
      good: "Bagus! Pertahankan prestasi Anda.",
      average: "Cukup baik. Tingkatkan lagi!",
      poor: "Perlu peningkatan. Jangan menyerah!"
    };
    
    if (score >= 90) return texts.perfect;
    if (score >= 75) return texts.excellent;
    if (score >= 60) return texts.good;
    if (score >= 40) return texts.average;
    return texts.poor;
  }

  static renderCertificate(certificateData) {
    document.getElementById('certificateName').textContent = certificateData.name;
    document.getElementById('certificateScore').textContent = certificateData.score;
    document.getElementById('certificateMotivation').textContent = certificateData.motivation;
    document.getElementById('certificatePeriod').textContent = `Ditetapkan di: Situbondo, ${certificateData.date}`;
    document.getElementById('certificateCode').textContent = certificateData.certificateCode;
    
    // Update nama ketua jika ada di localStorage
    const chairmanName = localStorage.getItem('chairmanName') || "Moh. Nuril Hudha, S.Pd., M.Si.";
    document.querySelector('.chairman-name').textContent = chairmanName;
    
    // Mainkan suara applause
    const applauseAudio = document.getElementById('applauseAudio');
    applauseAudio.play();
    
    // Tampilkan sertifikat
    document.getElementById('certificateContainer').classList.remove('hidden');
  }
}
