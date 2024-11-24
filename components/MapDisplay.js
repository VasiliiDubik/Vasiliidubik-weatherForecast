class MapDisplay {
  constructor(app) {
    this.app = app;
    this.latitudeElement = document.querySelector(".latitude-text");
    this.longitudeElement = document.querySelector(".longitude-text");
    this.loadingText = document.querySelector(".loading-text");

    this.map = null;
    this.placemark = null;
  }

  updateLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.latitudeElement.textContent = `Latitude: ${latitude
      .toString()
      .slice(0, 5)
      .replace(".", "° ")}'`;
    this.longitudeElement.textContent = `Longitude: ${longitude
      .toString()
      .slice(0, 5)
      .replace(".", "° ")}'`;

    ymaps.ready(() => {
      if (!this.map) {
        this.map = new ymaps.Map("map", {
          center: [latitude, longitude],
          zoom: 10,
        });

        this.placemark = new ymaps.Placemark([latitude, longitude], {
          hintContent: "Ваше текущее местоположение",
        });
        this.map.geoObjects.add(this.placemark);
      } else {
        this.map.setCenter([latitude, longitude]);
        this.placemark.geometry.setCoordinates([latitude, longitude]);
      }

      this.loadingText.style.display = "none";
    });
  }

  handleLocationError(error) {
    console.error("Ошибка определения местоположения:", error);
  }

  getCountryAndCity(latitude, longitude) {
    ymaps.ready(() => {
      ymaps
        .geocode([latitude, longitude], { results: 1, lang: "en_US" })
        .then((res) => {
          const firstGeoObject = res.geoObjects.get(0);
          const country = firstGeoObject.getCountry();
          const city =
            firstGeoObject.getLocalities()[0] || "Местоположение недоступно";

          document.querySelector(".place-country").textContent = country;
          document.querySelector(".place-city").textContent = city;

          this.map.setCenter([latitude, longitude]);
          this.placemark.geometry.setCoordinates([latitude, longitude]);
        });
    });
  }
}

export default MapDisplay;
