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
  }
}

export default WeatherApp;
