class MapService {
  constructor(app) {
    this.app = app;
    this.map = null;
    this.placemark = null;
  }

  initializeMap(containerId, latitude, longitude) {
    this.map = new ymaps.Map(containerId, {
      center: [latitude, longitude],
      zoom: 10,
    });

    this.placemark = new ymaps.Placemark([latitude, longitude], {
      hintContent: "Ваше текущее местоположение",
    });
    this.map.geoObjects.add(this.placemark);
  }

  updateMap(latitude, longitude) {
    if (this.map) {
      this.map.setCenter([latitude, longitude]);
      this.placemark.geometry.setCoordinates([latitude, longitude]);
    }
  }

  getCountryAndCity(latitude, longitude) {
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
const mapService = new MapService();

export default mapService;
