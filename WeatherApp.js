import WeatherDisplay from "./components/WeatherDisplay.js";
import TemperatureUnitToggle from "./components/TemperatureUnitToggle.js";
import BackgroundChanger from "./components/BackgroundChanger.js";
import TimeDisplay from "./components/TimeDisplay.js";
import MapDisplay from "./components/MapDisplay.js";
import WeatherIcons from "./components/WeatherIcons.js";
import LanguageToggle from "./components/LanguageToggle.js";
import SearchInput from "./components/SearchInput.js";

class WeatherApp {
  constructor() {
    this.location = {};

    this.originalTemperatures = {};

    this.weatherDisplay = new WeatherDisplay(this);
    this.temperatureUnitToggle = new TemperatureUnitToggle(this);
    this.backgroundChanger = new BackgroundChanger(this);
    this.timeDisplay = new TimeDisplay(this);
    this.mapDisplay = new MapDisplay(this);
    this.weatherIcons = new WeatherIcons();
    this.languageToggle = new LanguageToggle(this);
    this.search = new SearchInput(this);

    this.weatherIcons.updateWeatherIcons();
  }

  async fetchWeather(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=01d210c51fcc4941af39f9056f62809c`
      );

      if (!response.ok) {
        throw new Error("Ошибка при получении данных о погоде");
      }

      const data = await response.json();

      this.originalTemperatures = {
        main: data.data[0].temp,
        feelsLike: data.data[0].app_max_temp,
        day1: data.data[1].temp,
        day2: data.data[2].temp,
        day3: data.data[3].temp,
        wind: data.data[0].wind_spd,
        humidity: data.data[0].rh,
      };

      const weatherIconsData = {
        currentDay: data.data[0].weather.icon,
        firstDay: data.data[1].weather.icon,
        secondDay: data.data[2].weather.icon,
        lastDay: data.data[3].weather.icon,
      };

      this.weatherIcons.updateWeatherIcons(weatherIconsData);
      this.weatherDisplay.updateTemperatures("C");
    } catch (error) {
      console.error("Ошибка получения погоды:", error);
    }
  }
}

export default WeatherApp;
