<?php
require '../inc/security.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['request_otp'])) {
        // Kirim OTP ke nomor default
        $otp = send_whatsapp_otp(DEFAULT_HP);
        echo json_encode(['status' => 'success', 'otp_dev' => $otp]);
    } 
    
    elseif (isset($_POST['verify_otp'])) {
        if (verify_otp($_POST['otp'])) {
            $_SESSION['logged_in'] = true; // Login sukses
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error']);
        }
    }
}
?>
