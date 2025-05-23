// Form validation functions
function validateParticipantForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const status = document.querySelector('input[name="status"]:checked').value;
    
    if (!fullName) {
        alert('Nama lengkap wajib diisi');
        return false;
    }
    
    if (status === 'pelajar') {
        const schoolName = document.getElementById('schoolName').value.trim();
        const studentId = document.getElementById('studentId').value.trim();
        
        if (!schoolName || !studentId) {
            alert('Data pelajar harus lengkap');
            return false;
        }
        
        if (isNaN(studentId)) {
            alert('NIS harus berupa angka');
            return false;
        }
    } else {
        const address = document.getElementById('address').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (!address || !whatsapp || !email) {
            alert('Data umum harus lengkap');
            return false;
        }
        
        if (isNaN(whatsapp)) {
            alert('Nomor WhatsApp harus berupa angka');
            return false;
        }
        
        if (!validateEmail(email)) {
            alert('Email tidak valid');
            return false;
        }
        
        const purpose = document.getElementById('generalPurpose').value;
        if (purpose === 'cpns') {
            const cpnsLicense = document.getElementById('cpnsLicense').value;
            if (cpnsLicense !== 'OPENLOCK-1945') {
                alert('Kode lisensi CPNS/P3K salah');
                return false;
            }
        }
    }
    
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// GPS location validation
function validateLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('Geolocation tidak didukung oleh browser Anda');
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                let message = 'Gagal mendapatkan lokasi: ';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        message += 'Izin ditolak oleh pengguna';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        message += 'Informasi lokasi tidak tersedia';
                        break;
                    case error.TIMEOUT:
                        message += 'Permintaan lokasi timeout';
                        break;
                    case error.UNKNOWN_ERROR:
                        message += 'Error tidak diketahui';
                        break;
                }
                reject(message);
            }
        );
    });
}
