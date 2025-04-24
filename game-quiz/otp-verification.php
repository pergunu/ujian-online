<div id="otpForm">
    <p>OTP dikirim ke WhatsApp (*******4222)</p>
    <input type="text" id="otpInput" placeholder="Masukkan OTP">
    <button id="verifyOtpBtn">Verifikasi</button>
    <p id="otpError" class="hidden">OTP salah!</p>
</div>

<script>
document.getElementById('verifyOtpBtn').addEventListener('click', async () => {
    const otp = document.getElementById('otpInput').value;
    const response = await fetch('process/otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verify_otp: true, otp: otp })
    });
    
    const result = await response.json();
    if (result.status === 'success') {
        window.location.href = 'index.php'; // Redirect ke quiz
    } else {
        document.getElementById('otpError').classList.remove('hidden');
    }
});
</script>
