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

    this.celsiusButton = document.querySelector(".celsius");
    this.fahrenheitButton = document.querySelector(".fahrenheit");

    this.mainTemperature = document.querySelector(
      ".content-info_weather__temperature h1"
    );
    this.feelsLikeTemp = document.querySelector(".weather__feels-like");
    this.day1Temp = document.querySelector(".first-day_temp");
    this.day2Temp = document.querySelector(".second-day_temp");
    this.day3Temp = document.querySelector(".last-day_temp");

    this.timeElement = document.querySelector(".time");
    this.dateElement = document.querySelector(".date");
    this.firstDayElement = document.querySelector(".first-day");
    this.secondDayElement = document.querySelector(".second-day");
    this.lastDayElement = document.querySelector(".last-day");

    this.latitudeElement = document.querySelector(".latitude-text");
    this.longitudeElement = document.querySelector(".longitude-text");

    this.loadingText = document.querySelector(".loading-text");

    this.setupEventListeners();
    this.changeBackground();
    this.setCurrentTime();

    setInterval(this.setCurrentTime.bind(this), 5000);
  }

  setupEventListeners() {
    this.refreshButton.addEventListener(
      "click",
      this.changeBackground.bind(this)
    );

    this.celsiusButton.addEventListener("click", () => {
      this.updateTemperatures("C");
    });

    this.fahrenheitButton.addEventListener("click", () => {
      this.updateTemperatures("F");
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.fetchWeather(latitude, longitude);
        this.getCountryAndCity(latitude, longitude);

        this.successCallback(position);
      },
      (error) => {
        console.error("Ошибка определения местоположения:", error);
      }
    );
  }

  changeBackground() {
    let newBackground;

    do {
      newBackground =
        this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)];
    } while (newBackground === this.currentBackground);

    this.sectionElement.style.backgroundImage = `url('${newBackground}')`;
    this.currentBackground = newBackground;
  }

  updateTemperatures(unit) {
    if (unit === "F") {
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
      this.fahrenheitButton.classList.add("active");
      this.celsiusButton.classList.remove("active");
    } else {
      this.mainTemperature.textContent = `${this.originalTemperatures.main}°`;
      this.feelsLikeTemp.textContent = `FEELS LIKE: ${this.originalTemperatures.feelsLike}°`;
      this.day1Temp.textContent = `${this.originalTemperatures.day1}°`;
      this.day2Temp.textContent = `${this.originalTemperatures.day2}°`;
      this.day3Temp.textContent = `${this.originalTemperatures.day3}°`;
      this.celsiusButton.classList.add("active");
      this.fahrenheitButton.classList.remove("active");
    }
  }

  toFahrenheit(celsius) {
    return Math.round((celsius * 9) / 5 + 32);
  }

  toCelsius(fahrenheit) {
    return Math.round(((fahrenheit - 32) * 5) / 9);
  }

  setCurrentTime() {
    const currentDate = new Date();

    const currentTimeString = currentDate.toLocaleTimeString().slice(0, 5);
    const currentDayOfMonth = currentDate.getDate();
    const currentMonthString = this.MONTHS_COLLECTION[currentDate.getMonth()];
    const currentDayOfWeekString = this.DAY_OF_WEEK_COLLECTION[
      currentDate.getDay()
    ].slice(0, 3);

    const currentFirstDay =
      this.DAY_OF_WEEK_COLLECTION[(currentDate.getDay() + 1) % 7];
    const currentSecondDay =
      this.DAY_OF_WEEK_COLLECTION[(currentDate.getDay() + 2) % 7];
    const currentLastDay =
      this.DAY_OF_WEEK_COLLECTION[(currentDate.getDay() + 3) % 7];

    const currentDateString = `${currentDayOfWeekString} ${currentDayOfMonth} ${currentMonthString}`;

    this.timeElement.textContent = currentTimeString;
    this.dateElement.textContent = currentDateString;
    this.firstDayElement.textContent = currentFirstDay;
    this.secondDayElement.textContent = currentSecondDay;
    this.lastDayElement.textContent = currentLastDay;
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

      document.querySelector(
        ".content-info_weather__temperature h1"
      ).textContent = `${data.fact.temp}°`;
      document.querySelector(
        ".weather__feels-like"
      ).textContent = `FEELS LIKE: ${data.fact.feels_like}°`;
      document.querySelector(".weather__condition").textContent =
        data.fact.condition.toUpperCase();
      document.querySelector(
        ".weather__wind"
      ).textContent = `WIND: ${data.fact.wind_speed} m/s`;
      document.querySelector(
        ".weather__humidity"
      ).textContent = `HUMIDITY: ${data.fact.humidity}%`;

      document.querySelector(
        ".first-day_temp"
      ).textContent = `${data.forecasts[0].parts.day.temp_avg}°`;
      document.querySelector(
        ".second-day_temp"
      ).textContent = `${data.forecasts[1].parts.day.temp_avg}°`;
      document.querySelector(
        ".last-day_temp"
      ).textContent = `${data.forecasts[2].parts.day.temp_avg}°`;
    } catch (error) {
      console.error("Ошибка получения погоды:", error);
    }
  }

  // переименовать метод

  successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.latitudeElement.textContent = `Latitude: ${latitude
      .toString()
      .slice(0, 5)
      .replace(".", "° ")}'`;
    this.longitudeElement.textContent = `Longitude: ${longitude
      .toString()
      .slice(0, 5)
      .replace(".", "° ")}'`;

    ymaps.ready(() => {
      const map = new ymaps.Map("map", {
        center: [latitude, longitude],
        zoom: 10,
      });

      const placemark = new ymaps.Placemark([latitude, longitude], {
        hintContent: "Ваше текущее местоположение",
      });
      map.geoObjects.add(placemark);

      this.loadingText.style.display = "none";
    });
  }

  errorCallback(error) {
    console.error("Ошибка определения местоположения:", error);
  }

  getCountryAndCity(latitude, longitude) {
    ymaps.ready(() => {
      ymaps
        .geocode([latitude, longitude], { results: 1, lang: "en_US" })
        .then((res) => {
          const firstGeoObject = res.geoObjects.get(0);

          const country = firstGeoObject.getCountry();
          const city =
            firstGeoObject.getLocalities()[0] || "Местоположение недоступно";

          document.querySelector(".place-country").textContent = country;
          document.querySelector(".place-city").textContent = city;
        });
    });
  }
}

const app = new WeatherApp();
