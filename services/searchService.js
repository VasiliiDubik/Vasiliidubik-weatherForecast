const apiKey = "50a738f4ae0fdc05df88af4f6a0dcf5f";

class Search {
  async getCoordinatesByCity(city) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error fetching city coordinates");
      }

      const data = await response.json();

      if (data.length === 0) {
        alert("City not found. Please try again!");
        return;
      }

      return data;
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
      alert("Failed to fetch city coordinates. Please try again later.");
    }
  }
}

export const searchInstance = new Search();
