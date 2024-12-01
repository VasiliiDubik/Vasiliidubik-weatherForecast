import mapService from "../services/mapService.js";

class MapDisplay {
  constructor(app) {
    this.app = app;

    this.latitudeElement = document.querySelector(".latitude-Location__text");
    this.longitudeElement = document.querySelector(".Longitude-Location__text");
    this.loadingText = document.querySelector(".map-block__loading-text");

    this.map = null;
    this.placemark = null;

    this.setupEventListeners();
  }

  setupEventListeners() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.location = { latitude, longitude };
        this.updateLocation(position);
        this.app.fetchWeather(latitude, longitude);
      },
      (error) => {
        console.error("Ошибка определения местоположения:", error);
      }
    );
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
      if (!mapService.map) {
        mapService.initializeMap("map", latitude, longitude);
      } else {
        mapService.updateMap(latitude, longitude);
      }

      mapService
        .getCountryAndCity(latitude, longitude)
        .then(({ country, city }) => {
          document.querySelector(".forecast-block__country").textContent =
            country;
          document.querySelector(".forecast-block__city").textContent = city;

          mapService.updateMap(latitude, longitude);
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
