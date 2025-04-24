// Update bagian login untuk handle form submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validasi client-side
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    
    if (username === "Cendhanu" && password === "1499") {
        this.submit(); // Lanjut ke proses PHP
    } else {
        alert("Login gagal! Credential salah.");
    }
});
