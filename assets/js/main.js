// KODE UTAMA
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi Particles.js
    particlesJS.load('particles-js', 'assets/js/particles.json', function() {
        console.log('Particles.js loaded');
    });
    
    // Handler Tombol Masuk
    const btnMasuk = document.getElementById('btn-masuk');
    if(btnMasuk) {
        btnMasuk.addEventListener('click', function() {
            const kode = document.getElementById('kode-ujian').value;
            
            // Tampilkan loading
            this.querySelector('.btn-text').classList.add('hidden');
            this.querySelector('.btn-loading').classList.remove('hidden');
            
            // Validasi kode
            setTimeout(() => {
                if(kode === "12345") {
                    window.location.href = "peserta.html";
                } else {
                    alert("Kode ujian salah!");
                    this.querySelector('.btn-text').classList.remove('hidden');
                    this.querySelector('.btn-loading').classList.add('hidden');
                }
            }, 1000);
        });
    }
    
    // Handler Form Peserta
    const formPeserta = document.getElementById('form-peserta');
    if(formPeserta) {
        formPeserta.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simpan data ke localStorage
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            localStorage.setItem('dataPeserta', JSON.stringify(data));
            
            // Redirect ke halaman ujian
            window.location.href = "ujian.html";
        });
    }
});
