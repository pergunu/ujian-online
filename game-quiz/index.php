<?php
session_start();
require 'inc/config.php';

// Cek apakah user sudah login
if (!isset($_SESSION['logged_in'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <!-- Meta dan CSS tetap sama -->
    <?php include 'inc/security.php'; ?>
</head>
<body>
    <!-- Konten quiz Anda yang sudah ada -->
    <script src="assets/js/script.js"></script>
</body>
</html>
