// Fungsi-fungsi validasi form
// (Dalam aplikasi lengkap, ini akan berisi lebih banyak fungsi)

// Validasi email
function validateEmail(email) {
    const re = /^[a-z0-9._%+-]+@(gmail|yahoo|hotmail)\.com$/i;
    return re.test(String(email).toLowerCase());
}

// Validasi nomor WhatsApp
function validateWhatsApp(number) {
    return /^\d{10,13}$/.test(number);
}

// Validasi NIS (hanya angka)
function validateNIS(nis) {
    return /^\d+$/.test(nis);
}

// Validasi form peserta
function validateParticipantForm(formData) {
    const errors = [];
    
    // Validasi nama lengkap
    if (!formData.get('full-name')) {
        errors.push('Nama lengkap harus diisi');
    }
    
    // Validasi berdasarkan status
    if (formData.get('status') === 'pelajar') {
        if (!formData.get('school-name')) {
            errors.push('Nama sekolah harus diisi');
        }
        if (!validateNIS(formData.get('student-id'))) {
            errors.push('NIS harus berupa angka');
        }
    } else {
        if (!formData.get('address')) {
            errors.push('Alamat harus diisi');
        }
        if (!validateWhatsApp(formData.get('whatsapp'))) {
            errors.push('Nomor WhatsApp harus 10-13 digit angka');
        }
        if (!validateEmail(formData.get('email'))) {
            errors.push('Email harus valid (@gmail, @yahoo, atau @hotmail)');
        }
    }
    
    return errors;
}
