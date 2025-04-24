<form id="loginForm" action="process/login.php" method="POST">
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>
    <button type="submit">Login</button>
    <?php if (isset($_GET['error'])): ?>
        <p class="error">Login gagal!</p>
    <?php endif; ?>
</form>
