class LocationService {
  static getCountryAndCity(latitude, longitude) {
    return new Promise((resolve, reject) => {
      ymaps.ready(() => {
        ymaps
          .geocode([latitude, longitude], { results: 1, lang: "en_US" })
          .then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            const country = firstGeoObject.getCountry();
            const city =
              firstGeoObject.getLocalities()[0] || "Местоположение недоступно";
            resolve({ country, city });
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }
}

export default LocationService;
