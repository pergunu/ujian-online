<?php
session_start();

// 1. Lapisan Dasar: Proteksi Session
ini_set('session.cookie_httponly', 1); // Anti XSS
header("X-Frame-Options: DENY"); // Anti clickjacking

// 2. Lapisan OTP Sederhana
function generate_simple_otp() {
    return rand(1000, 9999); // OTP 4 digit
}

function send_simple_otp($email) {
    $otp = generate_simple_otp();
    $_SESSION['otp'] = $otp;
    $_SESSION['otp_time'] = time();
    
    // Simulasi pengiriman email (pada real implementation gunakan mail())
    error_log("OTP untuk $email: $otp"); // Cek di error_log server
    
    return $otp; // Di development bisa return OTP langsung
}

function verify_simple_otp($user_input) {
    if (!isset($_SESSION['otp']) return false;
    
    $is_valid = ($user_input == $_SESSION['otp']);
    unset($_SESSION['otp']);
    
    return $is_valid;
}
?>
