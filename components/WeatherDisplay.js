class WeatherDisplay {
  constructor(app) {
    this.app = app;
    this.mainTemperature = document.querySelector(
      ".content-info_weather__temperature h1"
    );
    this.feelsLikeTemp = document.querySelector(".weather__feels-like");
    this.day1Temp = document.querySelector(".first-day_temp");
    this.day2Temp = document.querySelector(".second-day_temp");
    this.day3Temp = document.querySelector(".last-day_temp");
    this.weatherWind = document.querySelector(".weather__wind");
    this.weatherHumidity = document.querySelector(".weather__humidity");
  }

  updateTemperatures(unit) {
    if (!this.app.originalTemperatures.main) {
      console.error("Температуры не загружены");
      return;
    }

    switch (unit) {
      case "F":
        this.mainTemperature.textContent = `${this.toFahrenheit(
          this.app.originalTemperatures.main
        )}°`;
        this.feelsLikeTemp.textContent = `FEELS LIKE: ${this.toFahrenheit(
          this.app.originalTemperatures.feelsLike
        )}°`;
        this.day1Temp.textContent = `${this.toFahrenheit(
          this.app.originalTemperatures.day1
        )}°`;
        this.day2Temp.textContent = `${this.toFahrenheit(
          this.app.originalTemperatures.day2
        )}°`;
        this.day3Temp.textContent = `${this.toFahrenheit(
          this.app.originalTemperatures.day3
        )}°`;
        break;
      case "C":
      default:
        this.mainTemperature.textContent = `${this.app.originalTemperatures.main}°`;
        this.feelsLikeTemp.textContent = `FEELS LIKE: ${this.app.originalTemperatures.feelsLike}°`;
        this.day1Temp.textContent = `${this.app.originalTemperatures.day1}°`;
        this.day2Temp.textContent = `${this.app.originalTemperatures.day2}°`;
        this.day3Temp.textContent = `${this.app.originalTemperatures.day3}°`;
        break;
    }
    this.weatherWind.textContent = `Wind Speed: ${this.app.originalTemperatures.wind}m/s`;
    this.weatherHumidity.textContent = `Humidity: ${this.app.originalTemperatures.humidity}%`;
  }

  toFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }
}

export default WeatherDisplay;
