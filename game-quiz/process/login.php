<?php
session_start();
require '../inc/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if ($username === DEFAULT_USER && $password === DEFAULT_PASS) {
        $_SESSION['otp_required'] = true;
        $_SESSION['login_attempt'] = true;
        header("Location: ../otp-verification.php");
    } else {
        header("Location: ../login.php?error=1");
    }
    exit;
}
