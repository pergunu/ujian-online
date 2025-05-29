// Form Validation Module
function initFormValidation() {
  // Participant form validation
  const participantForm = document.getElementById('participant-form');
  if (participantForm) {
    participantForm.addEventListener('submit', validateParticipantForm);
  }

  // Real-time validation for inputs
  const inputs = document.querySelectorAll('.form-input[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', validateInput);
  });

  // Special validation for NIS (numbers only)
  const nisInput = document.getElementById('nis');
  if (nisInput) {
    nisInput.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '');
    });
  }

  // Special validation for WhatsApp (numbers only)
  const whatsappInput = document.getElementById('whatsapp');
  if (whatsappInput) {
    whatsappInput.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '');
    });
  }

  // Email validation
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      const emailRegex = /^[a-z0-9._%+-]+@(gmail|yahoo|hotmail)\.com$/i;
      if (!emailRegex.test(this.value)) {
        showError(this, 'Format email harus @gmail.com, @yahoo.com, atau @hotmail.com');
      }
    });
  }

  // GPS button functionality
  const gpsBtn = document.getElementById('gps-btn');
  if (gpsBtn) {
    gpsBtn.addEventListener('click', getLocation);
  }
}

function validateParticipantForm(e) {
  e.preventDefault();
  
  const form = e.target;
  let isValid = true;
  
  // Validate all required fields
  const requiredInputs = form.querySelectorAll('[required]');
  requiredInputs.forEach(input => {
    if (!validateInput({ target: input })) {
      isValid = false;
    }
  });

  // Validate specific fields based on participant type
  const participantType = document.querySelector('input[name="status"]:checked').value;
  
  if (participantType === 'pelajar') {
    const nis = document.getElementById('nis').value;
    if (nis.length < 3) {
      showError(document.getElementById('nis'), 'NIS minimal 3 digit');
      isValid = false;
    }
  } else {
    const whatsapp = document.getElementById('whatsapp').value;
    if (whatsapp.length < 10 || whatsapp.length > 13) {
      showError(document.getElementById('whatsapp'), 'Nomor WhatsApp harus 10-13 digit');
      isValid = false;
    }
  }

  if (isValid) {
    // Save participant data to localStorage
    saveParticipantData();
    return true;
  }
  
  return false;
}

function validateInput(e) {
  const input = e.target;
  
  if (input.required && !input.value.trim()) {
    showError(input, 'Field ini wajib diisi');
    return false;
  }
  
  // Clear any existing error
  clearError(input);
  return true;
}

function showError(input, message) {
  clearError(input);
  
  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = message;
  error.style.color = '#f72585';
  error.style.fontSize = '0.8rem';
  error.style.marginTop = '-10px';
  error.style.marginBottom = '10px';
  
  input.parentNode.insertBefore(error, input.nextSibling);
  input.style.borderColor = '#f72585';
}

function clearError(input) {
  const error = input.parentNode.querySelector('.error-message');
  if (error) {
    error.remove();
  }
  input.style.borderColor = '#e9ecef';
}

function getLocation() {
  const addressInput = document.getElementById('address');
  
  if (navigator.geolocation) {
    addressInput.disabled = true;
    addressInput.placeholder = 'Mendeteksi lokasi...';
    
    navigator.geolocation.getCurrentPosition(
      function(position) {
        // Use reverse geocoding to get address
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
          .then(response => response.json())
          .then(data => {
            const address = data.display_name || 'Lokasi tidak diketahui';
            addressInput.value = address;
            addressInput.disabled = false;
          })
          .catch(() => {
            addressInput.value = '';
            addressInput.placeholder = 'Gagal mendapatkan alamat';
            addressInput.disabled = false;
          });
      },
      function(error) {
        addressInput.value = '';
        addressInput.placeholder = 'Izin lokasi ditolak';
        addressInput.disabled = false;
      }
    );
  } else {
    addressInput.placeholder = 'Geolocation tidak didukung';
  }
}

function saveParticipantData() {
  const formData = {
    fullname: document.getElementById('fullname').value,
    status: document.querySelector('input[name="status"]:checked').value,
    timestamp: new Date().toISOString()
  };

  // Add specific fields based on participant type
  if (formData.status === 'pelajar') {
    formData.school = document.getElementById('school').value;
    formData.nis = document.getElementById('nis').value;
    formData.purpose = document.getElementById('pelajar-purpose').value;
    formData.level = document.getElementById('school-level').value;
  } else {
    formData.address = document.getElementById('address').value;
    formData.whatsapp = document.getElementById('whatsapp').value;
    formData.email = document.getElementById('email').value;
    formData.purpose = document.getElementById('umum-purpose').value;
  }

  // Save to localStorage
  let participants = JSON.parse(localStorage.getItem('participants') || [];
  participants.push(formData);
  localStorage.setItem('participants', JSON.stringify(participants));
}
