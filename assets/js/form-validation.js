// Form validation functions
function validateParticipantForm() {
    const form = document.getElementById('participant-form');
    if (!form) return;
    
    // Real-time validation for NIS (numbers only)
    const studentIdInput = document.getElementById('student-id');
    if (studentIdInput) {
        studentIdInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
    
    // Real-time validation for WhatsApp (numbers only)
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Validate length
            if (this.value.length > 13) {
                this.value = this.value.slice(0, 13);
            }
        });
    }
    
    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !this.checkValidity()) {
                this.style.borderColor = 'red';
                alert('Format email tidak valid. Harap gunakan @gmail.com, @yahoo.com, atau @hotmail.com.');
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    // CPNS code validation
    const cpnsCodeInput = document.getElementById('cpns-code');
    if (cpnsCodeInput) {
        cpnsCodeInput.addEventListener('blur', function() {
            if (this.value && this.value !== settings.cpnsCode) {
                this.style.borderColor = 'red';
                alert('Kode lisensi CPNS/P3K salah.');
            } else {
                this.style.borderColor = '';
            }
        });
    }
}

// Initialize form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    validateParticipantForm();
});
