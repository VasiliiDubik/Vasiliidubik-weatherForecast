import WeatherDisplay from "./components/WeatherDisplay.js";
import TemperatureUnitToggle from "./components/TemperatureUnitToggle.js";
import BackgroundChanger from "./components/BackgroundChanger.js";
import TimeDisplay from "./components/TimeDisplay.js";
import MapDisplay from "./components/MapDisplay.js";
import WeatherIcons from "./components/WeatherIcons.js";
import LanguageToggle from "./components/LanguageToggle.js";
import SearchInput from "./components/SearchInput.js";
import { weatherInstance } from "./services/weatherService.js";

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

      await this.weatherIcons.updateWeatherIconsFromLocation(
        latitude,
        longitude
      );

      this.weatherDisplay.updateTemperatures("C");
    } catch (error) {
      console.error("Ошибка получения погоды:", error);
    }
  }
}

export default WeatherApp;
