<?php
require_once 'includes/security.php';

header('Content-Type: application/json');

if (!isset($_POST['otp'])) {
    echo json_encode(['status' => 'error', 'message' => 'OTP tidak valid']);
    exit;
}

echo json_encode([
    'status' => verify_otp($_POST['otp']) ? 'success' : 'error'
]);
?>
