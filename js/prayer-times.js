const PrayerTimes = {
    prayerTimes: {},
    location: { lat: -7.2575, lng: 112.7521 }, // Default: Surabaya
    checkInterval: null,
    
    init: function() {
        // Dapatkan lokasi user jika memungkinkan
        this.getUserLocation();
        
        // Set waktu sholat untuk hari ini
        this.setPrayerTimes();
        
        // Mulai pengecekan waktu sholat
        this.startPrayerTimeChecker();
    },
    
    getUserLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.setPrayerTimes();
                },
                error => {
                    console.log('Error getting location:', error);
                    // Gunakan lokasi default
                }
            );
        }
    },
    
    setPrayerTimes: function() {
        // Dalam implementasi nyata, ini akan memanggil API waktu sholat
        // Contoh: https://api.aladhan.com/v1/timingsByAddress
        
        // Untuk demo, kita gunakan waktu acak
        const now = new Date();
        const hours = now.getHours();
        
        this.prayerTimes = {
            Fajr: this.formatTime(hours + 1, 0),
            Dhuhr: this.formatTime(hours + 3, 30),
            Asr: this.formatTime(hours + 6, 0),
            Maghrib: this.formatTime(hours + 8, 15),
            Isha: this.formatTime(hours + 9, 45)
        };
    },
    
    formatTime: function(hours, minutes) {
        hours = hours % 24;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    },
    
    startPrayerTimeChecker: function() {
        // Cek setiap menit
        this.checkInterval = setInterval(() => {
            const now = new Date();
            const currentTime = this.formatTime(now.getHours(), now.getMinutes());
            
            for (const prayer in this.prayerTimes) {
                if (this.prayerTimes[prayer] === currentTime) {
                    this.notifyPrayerTime(prayer, currentTime);
                    break;
                }
            }
        }, 60000); // Cek setiap menit
    },
    
    notifyPrayerTime: function(prayerName, time) {
        const prayerNames = {
            Fajr: 'Subuh',
            Dhuhr: 'Dzuhur',
            Asr: 'Ashar',
            Maghrib: 'Maghrib',
            Isha: 'Isya'
        };
        
        UIManager.showPrayerTimeNotification(prayerNames[prayerName], time);
    }
};
