import mapService from "../services/mapService.js";
import { searchInstance } from "../services/searchService.js";

class SearchInput {
  constructor(app) {
    this.app = app;
    this.searchInput = document.querySelector(".search-block__input");
    this.searchButton = document.querySelector(".search-block__button");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.searchButton.addEventListener("click", () => {
      const city = this.searchInput.value.trim();
      if (city) {
        this.updateCoordinates(city);
      } else {
        alert("Please enter a city name!");
      }
    });
  }

  async updateCoordinates(city) {
    const data = await searchInstance.getCoordinatesByCity(city);
    const { lat, lon } = data[0];

    this.app.location = { latitude: lat, longitude: lon };

    document.querySelector(
      ".latitude-Location__text"
    ).textContent = `latitude: ${lat.toFixed(2)}°`;
    document.querySelector(
      ".Longitude-Location__text"
    ).textContent = `longitude: ${lon.toFixed(2)}°`;

    this.app.weatherDisplay.fetchWeather(lat, lon);
    mapService.getCountryAndCity(lat, lon);
    this.app.location = { latitude: lat, longitude: lon };
    this.app.mapDisplay.updateLocation({
      coords: { latitude: lat, longitude: lon },
    });
  }
}

export default SearchInput;
