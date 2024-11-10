class TemperatureUnitToggle {
  constructor(app) {
    this.app = app;
    this.celsiusButton = document.querySelector(".celsius");
    this.fahrenheitButton = document.querySelector(".fahrenheit");
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
