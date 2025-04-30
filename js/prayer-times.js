import { CONFIG } from './config.js';

export class PrayerTimes {
  constructor() {
    this.times = CONFIG.PRAYER_TIMES;
    this.audio = new Audio('../assets/audio/adhan.mp3');
  }

  checkCurrentTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    for (const [prayer, time] of Object.entries(this.times)) {
      if (currentHour === time.hour && 
          currentMinute >= time.minute && 
          currentMinute < time.minute + 5) {
        return prayer;
      }
    }
    return null;
  }

  notifyPrayerTime(prayer) {
    this.audio.play();
    return {
      title: `Waktu Sholat ${this.capitalizeFirstLetter(prayer)}`,
      message: 'Saatnya beristirahat sejenak untuk melaksanakan sholat',
      prayer: prayer
    };
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
