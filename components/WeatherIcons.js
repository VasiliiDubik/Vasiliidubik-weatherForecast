import { WeatherInstance } from "../services/weatherService.js";

class WeatherIcons {
  constructor() {
    this.weatherIconCurrent = document.querySelector(".weather-today__image");
    this.weatherIconFirstDay = document.querySelector(".first-day_img");
    this.weatherIconSecondDay = document.querySelector(".second-day_img");
    this.weatherIconLastDay = document.querySelector(".last-day_img");
  }

  getWeatherIconUrl(iconCode) {
    return `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
  }

  async updateWeatherIconsFromLocation(latitude, longitude) {
    try {
      const data = await WeatherInstance.getCurrentWeather(latitude, longitude);
      if (!data) {
        throw new Error("Ошибка при получении данных о погоде");
      }

      const weatherIcons = {
        currentDay: data.data[0].weather.icon,
        firstDay: data.data[1].weather.icon,
        secondDay: data.data[2].weather.icon,
        lastDay: data.data[3].weather.icon,
      };

      this.updateWeatherIcons(weatherIcons);
    } catch (error) {
      console.error("Ошибка получения иконок погоды:", error);
    }
  }

  updateWeatherIcons(weatherIcons) {
    if (!weatherIcons) {
      return;
    }

    this.weatherIconCurrent.src = this.getWeatherIconUrl(
      weatherIcons.currentDay
    );
    this.weatherIconFirstDay.src = this.getWeatherIconUrl(
      weatherIcons.firstDay
    );
    this.weatherIconSecondDay.src = this.getWeatherIconUrl(
      weatherIcons.secondDay
    );
    this.weatherIconLastDay.src = this.getWeatherIconUrl(weatherIcons.lastDay);
  }
}

export default WeatherIcons;
