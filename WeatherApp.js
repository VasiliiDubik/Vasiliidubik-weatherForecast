import WeatherDisplay from "./components/WeatherDisplay.js";
import TemperatureUnitToggle from "./components/TemperatureUnitToggle.js";
import BackgroundChanger from "./components/BackgroundChanger.js";
import TimeDisplay from "./components/TimeDisplay.js";
import MapDisplay from "./components/MapDisplay.js";

class WeatherApp {
  constructor() {
    this.backgrounds = ["./img/bg1.png", "./img/bg2.png", "./img/bg3.png"];
    this.sectionElement = document.querySelector(".section");
    this.refreshButton = document.querySelector(".refresh-button");

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

    this.setupEventListeners();
    this.backgroundChanger.changeBackground();
    this.timeDisplay.setupCurrentTime();
    setInterval(this.timeDisplay.setupCurrentTime.bind(this.timeDisplay), 5000);
  }

  setupEventListeners() {
    this.refreshButton.addEventListener(
      "click",
      this.backgroundChanger.changeBackground.bind(this.backgroundChanger)
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
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
        `http://localhost:3000/?latitude=${latitude}&longitude=${longitude}`
      );

      if (!response.ok) {
        throw new Error("Ошибка при получении данных о погоде");
      }

      const data = await response.json();

      this.originalTemperatures = {
        main: data.fact.temp,
        feelsLike: data.fact.feels_like,
        day1: data.forecasts[0].parts.day.temp_avg,
        day2: data.forecasts[1].parts.day.temp_avg,
        day3: data.forecasts[2].parts.day.temp_avg,
      };

      this.weatherDisplay.updateTemperatures("C");
    } catch (error) {
      console.error("Ошибка получения погоды:", error);
    }
  }
}

export default WeatherApp;
