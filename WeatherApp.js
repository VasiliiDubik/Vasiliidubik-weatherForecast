import WeatherDisplay from "./components/WeatherDisplay.js";
import TemperatureUnitToggle from "./components/TemperatureUnitToggle.js";
import BackgroundChanger from "./components/BackgroundChanger.js";
import TimeDisplay from "./components/TimeDisplay.js";
import MapDisplay from "./components/MapDisplay.js";
import WeatherIcons from "./components/WeatherIcons.js";
import LanguageToggle from "./components/LanguageToggle.js";
import Search from "./components/Search.js";

class WeatherApp {
  constructor() {
    this.backgrounds = ["./img/bg1.png", "./img/bg2.png", "./img/bg3.png"];
    this.sectionElement = document.querySelector(".section");
    this.refreshButton = document.querySelector(".refresh-button");
    this.location = {};

    this.MONTHS_COLLECTION = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };

    this.DAY_OF_WEEK_COLLECTION = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    this.currentBackground = null;
    this.originalTemperatures = {};

    this.weatherDisplay = new WeatherDisplay(this);
    this.temperatureUnitToggle = new TemperatureUnitToggle(this);
    this.backgroundChanger = new BackgroundChanger(this);
    this.timeDisplay = new TimeDisplay(this);
    this.mapDisplay = new MapDisplay(this);
    this.weatherIcons = new WeatherIcons();
    this.languageToggle = new LanguageToggle(this);
    this.search = new Search(this);

    this.setupEventListeners();
    this.backgroundChanger.changeBackground();
    this.timeDisplay.setupCurrentTime();
    setInterval(this.timeDisplay.setupCurrentTime.bind(this.timeDisplay), 5000);
    this.weatherIcons.updateWeatherIcons();
  }

  setupEventListeners() {
    this.refreshButton.addEventListener(
      "click",
      this.backgroundChanger.changeBackground.bind(this.backgroundChanger)
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.location = { latitude, longitude };
        this.mapDisplay.successCallback(position);
        this.mapDisplay.getCountryAndCity(latitude, longitude);
        this.fetchWeather(latitude, longitude);
      },
      (error) => {
        console.error("Ошибка определения местоположения:", error);
      }
    );
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
      console.log(data);

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
