<?php
require_once 'includes/auth.php';
require_once 'config/constants.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (login($_POST['username'], $_POST['password'])) {
        $_SESSION['loggedin'] = true;
        header('Location: dashboard.php');
        exit;
    } else {
        $error = "Username/Password salah!";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login Game Quiz</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <form method="POST">
        <h2>Login</h2>
        <?php if (isset($error)) echo "<p>$error</p>"; ?>
        
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Masuk</button>
    </form>
</body>
</html>
