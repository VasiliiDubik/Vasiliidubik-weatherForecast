import LocationService from "../services/locationService.js";
import MapService from "../services/mapService.js";

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
      if (!MapService.map) {
        MapService.initializeMap("map", latitude, longitude);
      } else {
        MapService.updateMap(latitude, longitude);
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
