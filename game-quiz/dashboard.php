<?php
require_once 'includes/auth.php';
if (!is_logged_in()) {
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard Quiz</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <h1>Selamat Datang, <?= DEFAULT_USER ?>!</h1>
    
    <!-- Tombol aksi penting -->
    <button id="requestOTP">Minta OTP via WhatsApp</button>
    
    <script src="assets/js/script.js"></script>
</body>
</html>
