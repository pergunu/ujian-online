<?php
require_once 'config/constants.php';
require_once 'includes/security.php';

header('Content-Type: application/json');

$otp = generate_otp();
save_otp($otp);

// Simulasi pengiriman WhatsApp
$message = urlencode("Kode OTP Anda: $otp");
$whatsapp_url = "https://wa.me/".ADMIN_WHATSAPP."?text=$message";

echo json_encode([
    'status' => 'success',
    'whatsapp_url' => $whatsapp_url,
    'otp' => $otp // Hanya untuk development
]);
?>
