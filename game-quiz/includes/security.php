<?php
session_start();

// Generate OTP
function generate_otp() {
    return rand(
        pow(10, OTP_LENGTH-1), 
        pow(10, OTP_LENGTH)-1
    );
}

// Simpan OTP ke session
function save_otp($otp) {
    $_SESSION['otp'] = $otp;
    $_SESSION['otp_time'] = time();
}

// Verifikasi OTP
function verify_otp($input) {
    if (!isset($_SESSION['otp'])) return false;
    
    $is_valid = ($input == $_SESSION['otp']) && 
               (time() - $_SESSION['otp_time'] <= OTP_EXPIRY);
    
    unset($_SESSION['otp']);
    return $is_valid;
}
?>
