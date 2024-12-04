import translations from "../translations/EN_RU.js";

class LanguageToggle {
  constructor(app) {
    this.app = app;
    this.mapDisplay = app.mapDisplay;
    this.langButton = document.querySelector(".language-select__button");
    this.weatherCondition = document.querySelector(".weather-today__condition");
    this.weatherFeelsLike = document.querySelector(
      ".weather-today__feels-like"
    );
    this.weatherWind = document.querySelector(".weather-today__wind");
    this.weatherHumidity = document.querySelector(".weather-today__humidity");
    this.currentLanguage = "en";
    this.latit = document.querySelector(".latitude-Location__text");
    this.langit = document.querySelector(".Longitude-Location__text");
    this.firstDaylang = document.querySelector(
      ".weather-future-day_first .weather-future-day__name"
    );
    this.secondDaylang = document.querySelector(
      ".weather-future-day_second .weather-future-day__name"
    );
    this.lastDaylang = document.querySelector(
      ".weather-future-day_last .weather-future-day__name"
    );
    this.dateElement = document.querySelector(".forecast-block__date-value");

    this.setupEventListeners();
    this.updateLanguageText();
  }

  setupEventListeners() {
    this.langButton.addEventListener("click", () => {
      this.switchLanguage();
    });
  }

  switchLanguage() {
    if (this.currentLanguage === "en") {
      this.currentLanguage = "ru";
    } else {
      this.currentLanguage = "en";
    }

    this.updateLanguageText();
  }

  updateLanguageText() {
    const currentTranslation = translations[this.currentLanguage];

    this.weatherCondition.textContent = `${currentTranslation.overcast}`;
    this.weatherFeelsLike.textContent = `${currentTranslation.feelsLike}: ${this.app.weatherDisplay.originalTemperatures?.feelsLike}°`;

    this.weatherWind.textContent = `${currentTranslation.wind}: ${
      this.app.weatherDisplay.originalTemperatures?.wind || "N/A"
    } m/s`;

    this.weatherHumidity.textContent = `${currentTranslation.humidity}: ${
      this.app.weatherDisplay.originalTemperatures?.humidity || "N/A"
    }%`;

    this.langButton.textContent = this.currentLanguage === "en" ? "EN" : "RU";

    this.dateElement.textContent = this.getCurrentDateText(currentTranslation);

    if (this.app.location.latitude && this.app.location.longitude) {
      const formattedLatitude = this.mapDisplay.formatCoordinates(
        this.app.location.latitude
      );
      const formattedLongitude = this.mapDisplay.formatCoordinates(
        this.app.location.longitude
      );

      this.latit.textContent = `${currentTranslation.latitude}: ${formattedLatitude}`;
      this.langit.textContent = `${currentTranslation.longitude}: ${formattedLongitude}`;
    }

    const firstDayIndex = this.getDayOfWeekIndex(1);
    const secondDayIndex = this.getDayOfWeekIndex(2);
    const lastDayIndex = this.getDayOfWeekIndex(3);

    this.firstDaylang.textContent = currentTranslation.days[firstDayIndex];
    this.secondDaylang.textContent = currentTranslation.days[secondDayIndex];
    this.lastDaylang.textContent = currentTranslation.days[lastDayIndex];
  }

  getCurrentDateText(translations) {
    const currentDate = new Date();
    const dayOfWeek = translations.days[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = translations.months[currentDate.getMonth()];
    return `${dayOfWeek} ${dayOfMonth} ${month}`;
  }

  getDayOfWeekIndex(value) {
    const currentDayIndex = new Date().getDay();

    return (currentDayIndex + value) % 7;
  }
}

export default LanguageToggle;
