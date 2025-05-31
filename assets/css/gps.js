class LocationService {
  static getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation tidak didukung oleh browser Anda'));
      } else {
        navigator.geolocation.getCurrentPosition(
          position => resolve(this.reverseGeocode(position.coords)),
          error => reject(error)
        );
      }
    });
  }

  static async reverseGeocode(coords) {
    try {
      // TODO: Ganti dengan API key Google Maps Anda
      const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          coords.latitude
        },${
          coords.longitude
        }&key=${
          apiKey
        }&language=id`
      );
      
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return 'Lokasi tidak dapat ditentukan';
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return 'Gagal mendapatkan alamat';
    }
  }
}
