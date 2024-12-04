import { weatherInstance } from "../services/weatherService.js";

class WeatherDisplay {
  constructor(app) {
    this.app = app;
    this.mainTemperature = document.querySelector(
      ".weather-today__main-temperature h1"
    );
    this.feelsLikeTemp = document.querySelector(".weather-today__feels-like");
    this.day1Temp = document.querySelector(
      ".weather-future-day_first .weather-future-day__temperature"
    );
    this.day2Temp = document.querySelector(
      ".weather-future-day_second .weather-future-day__temperature"
    );
    this.day3Temp = document.querySelector(
      ".weather-future-day_last .weather-future-day__temperature"
    );
    this.weatherWind = document.querySelector(".weather-today__wind");
    this.weatherHumidity = document.querySelector(".weather-today__humidity");
  }

  async fetchWeather(latitude, longitude) {
    try {
      const data = await weatherInstance.getCurrentWeather(latitude, longitude);

      if (!data) {
        throw new Error("Ошибка при получении данных о погоде");
      }

      this.originalTemperatures = {
        main: data.data[0].temp,
        feelsLike: data.data[0].app_max_temp,
        day1: data.data[1].temp,
        day2: data.data[2].temp,
        day3: data.data[3].temp,
        wind: data.data[0].wind_spd,
        humidity: data.data[0].rh,
      };

      await this.app.weatherIcons.updateWeatherIconsFromLocation(
        latitude,
        longitude
      );

      this.updateTemperatures("C");
    } catch (error) {
      console.error("Ошибка получения погоды:", error);
    }
  }

  updateTemperatures(unit) {
    if (!this.originalTemperatures) {
      console.error("Температуры не загружены");
      return;
    }

    switch (unit) {
      case "F":
        this.mainTemperature.textContent = `${this.toFahrenheit(
          this.originalTemperatures.main
        )}°`;
        this.feelsLikeTemp.textContent = `FEELS LIKE: ${this.toFahrenheit(
          this.originalTemperatures.feelsLike
        )}°`;
        this.day1Temp.textContent = `${this.toFahrenheit(
          this.originalTemperatures.day1
        )}°`;
        this.day2Temp.textContent = `${this.toFahrenheit(
          this.originalTemperatures.day2
        )}°`;
        this.day3Temp.textContent = `${this.toFahrenheit(
          this.originalTemperatures.day3
        )}°`;
        break;
      case "C":
      default:
        this.mainTemperature.textContent = `${this.originalTemperatures.main}°`;
        this.feelsLikeTemp.textContent = `FEELS LIKE: ${this.originalTemperatures.feelsLike}°`;
        this.day1Temp.textContent = `${this.originalTemperatures.day1}°`;
        this.day2Temp.textContent = `${this.originalTemperatures.day2}°`;
        this.day3Temp.textContent = `${this.originalTemperatures.day3}°`;
        break;
    }
    this.weatherWind.textContent = `Wind Speed: ${this.originalTemperatures.wind}m/s`;
    this.weatherHumidity.textContent = `Humidity: ${this.originalTemperatures.humidity}%`;
  }

  toFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }
}

export default WeatherDisplay;
