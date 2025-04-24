<?php
require 'config.php';

// Kirim OTP via WhatsApp (simulasi)
function send_whatsapp_otp($no_hp) {
    $otp = rand(1000, 9999); // Generate OTP 4 digit
    $_SESSION['otp'] = $otp;
    $_SESSION['otp_time'] = time();

    // Simulasi pengiriman (development)
    error_log("[OTP] Untuk $no_hp: $otp"); // Cek di error_log server
    
    return $otp; // Di production, ganti dengan API WhatsApp nyata
}

// Verifikasi OTP
function verify_otp($input) {
    if (!isset($_SESSION['otp']) || time() > $_SESSION['otp_time'] + OTP_EXPIRY) {
        return false; // OTP expired/tidak ada
    }
    return ($input == $_SESSION['otp']);
}
?>
