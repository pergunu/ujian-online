function checkPrayerTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Contoh waktu adhan dhuha
    if (hours === 6 && minutes === 0) {
        playAdhan();
    }
    // Tambahkan waktu sholat lainnya sesuai jadwal
}

function playAdhan() {
    const adhan = document.getElementById('adhanSound');
    if (adhan) {
        adhan.play();
    }
}
