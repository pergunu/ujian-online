document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi modul
    Auth.init();
    PrayerTimes.init();
    QuizEngine.init();
    UIManager.init();
    UserManager.init();
    ScoreManager.init();

    // Sembunyikan loading screen setelah semua siap
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
    }, 1500);

    // Event listener untuk kategori peserta
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'pelajar') {
                document.getElementById('profesiGroup').style.display = 'none';
                document.getElementById('schoolGroup').style.display = 'block';
                document.getElementById('profession').required = false;
                document.getElementById('school').required = true;
            } else {
                document.getElementById('profesiGroup').style.display = 'block';
                document.getElementById('schoolGroup').style.display = 'none';
                document.getElementById('profession').required = true;
                document.getElementById('school').required = false;
            }
        });
    });

    // Event listener untuk modal syarat dan ketentuan
    document.getElementById('termsLink').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('termsModal').style.display = 'block';
    });

    document.getElementById('privacyLink').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('privacyModal').style.display = 'block';
    });

    // Tutup modal
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Klik di luar modal untuk menutup
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Form registrasi
    document.getElementById('userRegistration').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userData = {
            name: document.getElementById('name').value,
            category: document.querySelector('input[name="category"]:checked').value,
            profession: document.getElementById('profession').value,
            school: document.getElementById('school').value,
            age: document.getElementById('age').value,
            phone: document.getElementById('phone').value,
            timestamp: new Date().toISOString()
        };

        // Simpan data user
        UserManager.saveUserData(userData);
        
        // Tampilkan data user di UI
        UIManager.displayUserInfo(userData);
        
        // Sembunyikan form registrasi
        document.getElementById('registrationForm').style.display = 'none';
        
        // Tampilkan quiz container
        document.getElementById('quizContainer').style.display = 'block';
        
        // Mulai quiz
        QuizEngine.startQuiz(userData.category);
    });

    // Event listener untuk tombol quiz
    document.getElementById('btnNext').addEventListener('click', QuizEngine.nextQuestion);
    document.getElementById('btnReset').addEventListener('click', QuizEngine.resetQuestion);
    document.getElementById('btnFinish').addEventListener('click', QuizEngine.finishQuiz);
    
    // Event listener untuk hasil quiz
    document.getElementById('btnRestart').addEventListener('click', restartQuiz);
    document.getElementById('btnLike').addEventListener('click', likeQuiz);
    document.getElementById('btnShare').addEventListener('click', shareResults);

    function restartQuiz() {
        document.getElementById('resultContainer').style.display = 'none';
        document.getElementById('quizContainer').style.display = 'block';
        QuizEngine.restartQuiz();
    }

    function likeQuiz() {
        const btnLike = document.getElementById('btnLike');
        btnLike.classList.add('clicked');
        
        // Mainkan suara tepuk tangan
        const applauseSound = document.getElementById('applauseSound');
        applauseSound.play();
        
        // Tampilkan efek confetti
        UIManager.showConfetti();
        
        // Reset animasi setelah selesai
        setTimeout(() => {
            btnLike.classList.remove('clicked');
        }, 500);
    }

    function shareResults() {
        // Implementasi berbagi hasil
        const score = ScoreManager.getCurrentScore();
        const shareText = `Saya baru saja menyelesaikan Quiz PERGUNU dengan skor ${score.percentage}%! Coba kamu juga di ${window.location.href}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Hasil Quiz PERGUNU',
                text: shareText,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare(shareText);
            });
        } else {
            fallbackShare(shareText);
        }
    }

    function fallbackShare(text) {
        // Fallback untuk browser yang tidak mendukung Web Share API
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(shareUrl, '_blank');
    }
});
