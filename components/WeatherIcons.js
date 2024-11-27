class WeatherIcons {
  constructor() {
    this.weatherIconCurrent = document.querySelector(".weather-today__image");
    this.weatherIconFirstDay = document.querySelector(".first-day_img");
    this.weatherIconSecondDay = document.querySelector(".second-day_img");
    this.weatherIconLastDay = document.querySelector(".last-day_img");
  }

  getWeatherIconUrl(iconCode) {
    return `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
  }

  updateWeatherIcons(weatherIcons) {
    this.weatherIconCurrent.src = this.getWeatherIconUrl(
      weatherIcons.currentDay
    );
    this.weatherIconFirstDay.src = this.getWeatherIconUrl(
      weatherIcons.firstDay
    );
    this.weatherIconSecondDay.src = this.getWeatherIconUrl(
      weatherIcons.secondDay
    );
    this.weatherIconLastDay.src = this.getWeatherIconUrl(weatherIcons.lastDay);
  }
}

export default WeatherIcons;
