const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const PORT = 3000;

const accessKey = "cc91932a-ab33-4d40-9b4a-2a66bbafffee";

app.use(cors());

app.get("/", async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const headers = {
      "X-Yandex-Weather-Key": accessKey,
    };

    const response = await fetch(
      `https://api.weather.yandex.ru/v2/forecast?lat=${latitude}&lon=${longitude}`,
      { headers }
    );
    const json = await response.json();
    console.log("===", json);

    res.send(json);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).send("Failed to fetch weather data");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
