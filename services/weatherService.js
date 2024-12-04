const currentWeatherApiKey = "01d210c51fcc4941af39f9056f62809c";
const currentWeatherApiKey2 = "900b7ff405fb4b8186f321d9263a98ac";

class WeatherService {
  async getCurrentWeather(latitude, longitude) {
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${currentWeatherApiKey2}`;

    try {
      const response = await fetch(weatherUrl);

      if (!response.ok) {
        throw new Error("Ошибка при получении данных о погоде");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Ошибка получения погоды:", error);
    }
  }
}

export const weatherInstance = new WeatherService();
