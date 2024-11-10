class WeatherIcons {
  constructor() {
    // Селекторы температур
    this.tempFirstDay = document.querySelector(".first-day_temp");
    this.tempSecondDay = document.querySelector(".second-day_temp");
    this.tempLastDay = document.querySelector(".last-day_temp");
    this.tempCurrentDay = document.querySelector(".current-temp_content");

    // Селекторы для изображений погоды
    this.weatherIconCurrent = document.getElementById("current-img");
    this.weatherIconFirstDay = document.getElementById("first-day_img");
    this.weatherIconSecondDay = document.getElementById("second-day_img");
    this.weatherIconLastDay = document.getElementById("last-day_img");
  }

  // Функция для очистки символа ° и преобразования строки в число
  parseTemperature(tempElement) {
    return parseInt(tempElement.textContent.replace("°", ""));
  }

  // Функция для замены изображения и применения класса в зависимости от температуры
  updateWeatherIcons() {
    const threshold = 18; // Температурный порог для замены иконки

    // Проверка и обновление иконки и класса для текущего дня
    if (this.parseTemperature(this.tempCurrentDay) > threshold) {
      this.weatherIconCurrent.src = "./img/sun.png";
      this.weatherIconCurrent.classList.add("sunny-img");
    } else {
      this.weatherIconCurrent.src = "./img/Group 26.png";
      this.weatherIconCurrent.classList.remove("sunny-img");
    }

    // Проверка и обновление иконки и класса для первого дня
    if (this.parseTemperature(this.tempFirstDay) > threshold) {
      this.weatherIconFirstDay.src = "./img/sun.png";
      this.weatherIconFirstDay.classList.add("sunny-img");
    } else {
      this.weatherIconFirstDay.src = "./img/cloud.png";
      this.weatherIconFirstDay.classList.remove("sunny-img");
    }

    // Проверка и обновление иконки и класса для второго дня
    if (this.parseTemperature(this.tempSecondDay) > threshold) {
      this.weatherIconSecondDay.src = "./img/sun.png";
      this.weatherIconSecondDay.classList.add("sunny-img");
    } else {
      this.weatherIconSecondDay.src = "./img/cloud.png";
      this.weatherIconSecondDay.classList.remove("sunny-img");
    }

    // Проверка и обновление иконки и класса для последнего дня
    if (this.parseTemperature(this.tempLastDay) > threshold) {
      this.weatherIconLastDay.src = "./img/sun.png";
      this.weatherIconLastDay.classList.add("sunny-img");
    } else {
      this.weatherIconLastDay.src = "./img/cloud.png";
      this.weatherIconLastDay.classList.remove("sunny-img");
    }
  }
}

export default WeatherIcons;
