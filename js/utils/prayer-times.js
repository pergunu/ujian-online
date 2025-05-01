// Prayer times module
class PrayerTimes {
    static async init() {
        if (!Config.showPrayerTimes) return;
        
        try {
            const times = await this.getPrayerTimes();
            this.displayPrayerTimes(times);
        } catch (error) {
            console.error("Error loading prayer times:", error);
        }
    }
    
    static async getPrayerTimes() {
        // Try to get from API first
        try {
            const response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia');
            if (response.ok) {
                const data = await response.json();
                return data.data.timings;
            }
        } catch (error) {
            console.error("Failed to fetch prayer times from API:", error);
        }
        
        // Fallback to default times
        return {
            Fajr: "04:30",
            Dhuhr: "12:00",
            Asr: "15:30",
            Maghrib: "18:00",
            Isha: "19:30"
        };
    }
    
    static displayPrayerTimes(times) {
        const container = document.createElement('div');
        container.id = 'prayer-times';
        container.style.position = 'fixed';
        container.style.bottom = '2rem';
        container.style.left = '2rem';
        container.style.background = 'white';
        container.style.padding = '1rem';
        container.style.borderRadius = 'var(--radius-sm)';
        container.style.boxShadow = 'var(--shadow)';
        container.style.zIndex = '100';
        
        container.innerHTML = `
            <h3 style="margin-bottom: 0.5rem; color: var(--primary);">Waktu Shalat</h3>
            <ul style="list-style: none;">
                <li>Subuh: ${times.Fajr}</li>
                <li>Dzuhur: ${times.Dhuhr}</li>
                <li>Ashar: ${times.Asr}</li>
                <li>Maghrib: ${times.Maghrib}</li>
                <li>Isya: ${times.Isha}</li>
            </ul>
        `;
        
        document.body.appendChild(container);
    }
}

export default PrayerTimes;
