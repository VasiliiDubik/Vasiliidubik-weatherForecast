class TemperatureUnitToggle {
  constructor(app) {
    this.app = app;
    this.celsiusButton = document.querySelector(
      ".temperature-switcher__button_celsius"
    );
    this.fahrenheitButton = document.querySelector(
      ".temperature-switcher__button_fahrenheit"
    );
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.celsiusButton.addEventListener("click", () => {
      this.app.weatherDisplay.updateTemperatures("C");
      this.celsiusButton.classList.add("active");
      this.fahrenheitButton.classList.remove("active");
    });

    this.fahrenheitButton.addEventListener("click", () => {
      this.app.weatherDisplay.updateTemperatures("F");
      this.fahrenheitButton.classList.add("active");
      this.celsiusButton.classList.remove("active");
    });
  }
}

export default TemperatureUnitToggle;
