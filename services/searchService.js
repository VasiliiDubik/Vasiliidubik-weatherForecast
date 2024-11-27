class Search {
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
        this.fetchCityCoordinates(city);
      } else {
        alert("Please enter a city name!");
      }
    });
  }

  async fetchCityCoordinates(city) {
    const apiKey = "50a738f4ae0fdc05df88af4f6a0dcf5f";
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching city coordinates");
      }

      const data = await response.json();
      if (data.length === 0) {
        alert("City not found. Please try again!");
        return;
      }

      const { lat, lon } = data[0];
      this.app.location = { latitude: lat, longitude: lon };

      document.querySelector(
        ".latitude-Location__text"
      ).textContent = `latitude: ${lat.toFixed(2)}°`;
      document.querySelector(
        ".Longitude-Location__text"
      ).textContent = `longitude: ${lon.toFixed(2)}°`;

      this.app.fetchWeather(lat, lon);
      this.app.mapDisplay.getCountryAndCity(lat, lon);
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
      alert("Failed to fetch city coordinates. Please try again later.");
    }
  }
}

export default Search;
