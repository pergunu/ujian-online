<?php
require 'inc/config.php';
if (!isset($_SESSION['logged_in'])) {
    header("Location: login.php");
    exit;
}
?>
<!-- Konten quiz Anda yang sudah ada -->
<script src="assets/js/script.js"></script>
