import LocationService from "../services/locationService.js";

class MapDisplay {
  constructor(app) {
    this.app = app;

    this.latitudeElement = document.querySelector(".latitude-text");
    this.longitudeElement = document.querySelector(".longitude-text");
    this.loadingText = document.querySelector(".loading-text");

    this.map = null;
    this.placemark = null;
  }

  formatCoordinates(coordinates) {
    return coordinates.toString().slice(0, 5).replace(".", "° ");
  }

  updateLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.latitudeElement.textContent = `Latitude: ${this.formatCoordinates(
      latitude
    )}'`;
    this.longitudeElement.textContent = `Longitude: ${this.formatCoordinates(
      longitude
    )}'`;

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

      LocationService.getCountryAndCity(latitude, longitude)
        .then(({ country, city }) => {
          document.querySelector(".place-country").textContent = country;
          document.querySelector(".place-city").textContent = city;

          this.map.setCenter([latitude, longitude]);
          this.placemark.geometry.setCoordinates([latitude, longitude]);
        })
        .catch((error) => {
          console.error("Ошибка получения страны и города:", error);
        });

      this.loadingText.style.display = "none";
    });
  }

  handleLocationError(error) {
    console.error("Ошибка определения местоположения:", error);
  }
}

export default MapDisplay;
