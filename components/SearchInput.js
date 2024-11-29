class SearchInput {
  constructor(app) {
    this.app = app;
    this.searchInput = document.querySelector(".search-block__input");
    this.searchButton = document.querySelector(".search-block__button");

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.searchButton.addEventListener("click", () => {
      const city = this.searchInput.ariaValueMax.trim();
      if (city) {
        this.fetchCityCoordinates(city);
      } else {
        alert("Please enter a city name!");
      }
    });
  }
}
