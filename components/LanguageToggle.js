class LanguageToggle {
  constructor(app) {
    this.app = app;
    this.translations = app.translations;
    this.mapDisplay = app.mapDisplay;
    this.langButton = document.querySelector(".lang-en");
    this.weatherCondition = document.querySelector(".weather__condition");
    this.weatherFeelsLike = document.querySelector(".weather__feels-like");
    this.weatherWind = document.querySelector(".weather__wind");
    this.weatherHumidity = document.querySelector(".weather__humidity");
    this.currentLanguage = "en";
    this.latit = document.querySelector(".latitude-text");
    this.langit = document.querySelector(".longitude-text");
    this.firstDaylang = document.querySelector(".first-day");
    this.secondDaylang = document.querySelector(".second-day");
    this.lastDaylang = document.querySelector(".last-day");
    this.dateElement = document.querySelector(".date");

    this.setupEventListeners();
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
    const translations = this.translations[this.currentLanguage];

    this.weatherCondition.textContent = `${translations.overcast}`;
    this.weatherFeelsLike.textContent = `${translations.feelsLike}: ${this.app.originalTemperatures?.feelsLike}°`;

    this.weatherWind.textContent = `${translations.wind}: ${
      this.app.originalTemperatures?.wind || "N/A"
    } m/s`;

    this.weatherHumidity.textContent = `${translations.humidity}: ${
      this.app.originalTemperatures?.humidity || "N/A"
    }%`;

    this.langButton.textContent = this.currentLanguage === "en" ? "RU" : "EN";

    this.dateElement.textContent = this.getCurrentDateText(translations);

    if (this.app.location.latitude && this.app.location.longitude) {
      const formattedLatitude = this.mapDisplay.formatCoordinates(
        this.app.location.latitude
      );
      const formattedLongitude = this.mapDisplay.formatCoordinates(
        this.app.location.longitude
      );

      this.latit.textContent = `${translations.latitude}: ${formattedLatitude}`;
      this.langit.textContent = `${translations.longitude}: ${formattedLongitude}`;
    }

    const firstDayIndex = this.getDayOfWeekIndex(1);
    const secondDayIndex = this.getDayOfWeekIndex(2);
    const lastDayIndex = this.getDayOfWeekIndex(3);

    this.firstDaylang.textContent = translations.days[firstDayIndex];
    this.secondDaylang.textContent = translations.days[secondDayIndex];
    this.lastDaylang.textContent = translations.days[lastDayIndex];
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
