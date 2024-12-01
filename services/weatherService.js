class WeatherService {
  async fetchWeather(latitude, longitude) {
    try {
      const response = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=01d210c51fcc4941af39f9056f62809c`
      );

      if (!response.ok) {
        throw new Error("Ошибка при получении данных о погоде");
      }

      const data = await response.json();

      return {
        originalTemperatures: {
          main: data.data[0].temp,
          feelsLike: data.data[0].app_max_temp,
          day1: data.data[1].temp,
          day2: data.data[2].temp,
          day3: data.data[3].temp,
          wind: data.data[0].wind_spd,
          humidity: data.data[0].rh,
        },
        weatherIconsData: {
          currentDay: data.data[0].weather.icon,
          firstDay: data.data[1].weather.icon,
          secondDay: data.data[2].weather.icon,
          lastDay: data.data[3].weather.icon,
        },
      };
    } catch (error) {
      console.error("Ошибка получения погоды:", error);
    }
  }
}

// export default new WeatherService();
export const WeatherInstance = new WeatherService();
