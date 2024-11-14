class WeatherIcons {
  constructor() {
    this.weatherIconCurrent = document.getElementById("current-img");
    this.weatherIconFirstDay = document.getElementById("first-day_img");
    this.weatherIconSecondDay = document.getElementById("second-day_img");
    this.weatherIconLastDay = document.getElementById("last-day_img");
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
