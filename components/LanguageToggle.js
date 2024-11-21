class LanguageToggle {
  constructor(app) {
    this.app = app;
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

    this.translations = {
      en: {
        overcast: "OVERCAST",
        feelsLike: "FEELS LIKE",
        wind: "WIND",
        humidity: "HUMIDITY",
        latitude: "latitude",
        longitude: "longitude",
        days: {
          0: "Sunday",
          1: "Monday",
          2: "Tuesday",
          3: "Wednesday",
          4: "Thursday",
          5: "Friday",
          6: "Saturday",
        },
        months: {
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
        },
      },
      ru: {
        overcast: "ПАСМУРНО",
        feelsLike: "ОЩУЩАЕТСЯ КАК",
        wind: "ВЕТЕР",
        humidity: "ВЛАЖНОСТЬ",
        latitude: "широта",
        longitude: "долгота",
        days: {
          0: "Воскресенье",
          1: "Понедельник",
          2: "Вторник",
          3: "Среда",
          4: "Четверг",
          5: "Пятница",
          6: "Суббота",
        },
        months: {
          0: "Январь",
          1: "Февраль",
          2: "Март",
          3: "Апрель",
          4: "Май",
          5: "Июнь",
          6: "Июль",
          7: "Август",
          8: "Сентябрь",
          9: "Октябрь",
          10: "Ноябрь",
          11: "Декабрь",
        },
      },
    };

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
      this.langButton.textContent = "RU";
    } else {
      this.currentLanguage = "en";
      this.langButton.textContent = "EN";
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

    const currentDate = new Date();
    const dayOfWeek = translations.days[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = translations.months[currentDate.getMonth()];
    this.dateElement.textContent = `${dayOfWeek} ${dayOfMonth} ${month}`;

    if (this.app.location.latitude && this.app.location.longitude) {
      this.latit.textContent = `${
        translations.latitude
      }: ${this.app.location.latitude
        .toString()
        .slice(0, 5)
        .replace(".", "° ")}`;
      this.langit.textContent = `${
        translations.longitude
      }: ${this.app.location.longitude
        .toString()
        .slice(0, 5)
        .replace(".", "° ")}`;
    }

    const firstDayIndex = this.getDayOfWeekIndex(1);
    const secondDayIndex = this.getDayOfWeekIndex(2);
    const lastDayIndex = this.getDayOfWeekIndex(3);

    this.firstDaylang.textContent = translations.days[firstDayIndex];
    this.secondDaylang.textContent = translations.days[secondDayIndex];
    this.lastDaylang.textContent = translations.days[lastDayIndex];
  }
  getDayOfWeekIndex(value) {
    const currentDayIndex = new Date().getDay();

    return (currentDayIndex + value) % 7;
  }
}

export default LanguageToggle;
