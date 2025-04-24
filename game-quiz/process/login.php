<?php
require '../inc/config.php';

if ($_POST['username'] === DEFAULT_USER && $_POST['password'] === DEFAULT_PASS) {
    $_SESSION['login_attempt'] = true; // Flag untuk OTP
    header("Location: ../otp-verification.php");
} else {
    header("Location: ../login.php?error=1"); // Redirect jika gagal
}
exit;
?>
