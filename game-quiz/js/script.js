document.getElementById('requestOTP').addEventListener('click', async () => {
    const response = await fetch('request-otp.php');
    const data = await response.json();
    
    // Di production, buka link WhatsApp
    window.open(data.whatsapp_url, '_blank');
    
    // Di development, tampilkan OTP di console
    console.log("OTP (development only):", data.otp);
    
    // Proses verifikasi
    const otp = prompt("Masukkan OTP yang dikirim ke WhatsApp:");
    if (otp) {
        const verify = await fetch('verify-otp.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `otp=${otp}`
        });
        
        const result = await verify.json();
        alert(result.status === 'success' 
            ? "OTP valid!" 
            : "OTP salah/kadaluarsa!");
    }
});
