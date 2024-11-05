const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/weather", async (req, res) => {
  try {
    console.log("Запрос данных от Yandex...");

    const response = await axios.get("https://yandex.by/pogoda/minsk");
    console.log("Данные от Yandex:", response.data);

    res.send(response.data);
  } catch (error) {
    console.error("Ошибка при получении данных от Yandex:", error);
    res.status(500).send("Ошибка при получении данных");
  }
});

app.listen(3000, () => console.log("Сервер запущен на порту 3000"));
