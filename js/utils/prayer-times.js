function checkPrayerTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Contoh waktu dhuha
    if (hours === 6 && minutes === 0) {
        playAdhan();
    }
    // Tambahkan kondisi lain sesuai jadwal sholat
}

function playAdhan() {
    const adhan = document.getElementById('adhanSound');
    if (adhan) {
        adhan.play();
    }
}
