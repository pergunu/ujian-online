// Fungsi untuk meng-generate kode sertifikat
function generateCertificateCode(participantData, examResult, date) {
    const namePart = participantData.fullName.replace(/\s+/g, '').toUpperCase().substring(0, 5);
    const statusPart = participantData.status === 'pelajar' ? 'PELAJAR' : 'UMUM';
    const levelPart = participantData.schoolLevel || 'UMUM';
    const subjectPart = examResult.subject.replace(/_/g, '').substring(0, 5).toUpperCase();
    const datePart = date.getDate().toString().padStart(2, '0') + 
                    (date.getMonth() + 1).toString().padStart(2, '0') + 
                    date.getFullYear().toString().substring(2);
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + 
                      Math.random().toString(36).substring(2, 6).toUpperCase();
    
    return `${namePart}/${statusPart}/${levelPart}/${subjectPart}/${datePart}/${randomPart}/PERGUNU-STB`;
}

// Fungsi untuk mencetak sertifikat
function printCertificate() {
    const printContent = document.getElementById('certificateToPrint').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
}

// Event listener untuk tombol cetak sertifikat
document.getElementById('printCertificateBtn').addEventListener('click', printCertificate);

// Fungsi untuk memainkan suara applause
function playApplause() {
    const audio = document.getElementById('applauseAudio');
    audio.currentTime = 0;
    audio.play();
}

// Animasi sertifikat saat muncul
function animateCertificate() {
    const certificate = document.getElementById('certificateToPrint');
    certificate.classList.add('certificate-enter');
    playApplause();
}

// Panggil animasi saat halaman sertifikat dimuat
if (document.getElementById('certificateScreen')) {
    animateCertificate();
}
