const backgrounds = ["./img/bg1.png", "./img/bg2.png", "./img/bg3.png"];
const sectionElement = document.querySelector(".section");
const refreshButton = document.querySelector(".refresh-button");

const MONTHS_COLLECTION = {
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
};

const DAY_OF_WEEK_COLLECTION = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

let currentBackground = null;

function changeBackground() {
  let newBackground;

  do {
    newBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  } while (newBackground === currentBackground);

  sectionElement.style.backgroundImage = `url('${newBackground}')`;
  currentBackground = newBackground;
}

refreshButton.addEventListener("click", changeBackground);

changeBackground();

const celsiusButton = document.querySelector(".celsius");
const fahrenheitButton = document.querySelector(".fahrenheit");

const mainTemperature = document.querySelector(
  ".content-info_weather__temperature h1"
);
const feelsLikeTemp = document.querySelector(".weather__feels-like");
const day1Temp = document.querySelector(".day1-temp");
const day2Temp = document.querySelector(".day2-temp");
const day3Temp = document.querySelector(".day3-temp");

const originalTemperatures = {
  main: parseInt(mainTemperature.textContent),
  feelsLike: parseInt(feelsLikeTemp.textContent.split(": ")[1]),
  day1: parseInt(day1Temp.textContent),
  day2: parseInt(day2Temp.textContent),
  day3: parseInt(day3Temp.textContent),
};

function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function toCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

function updateTemperatures(unit) {
  if (unit === "F") {
    mainTemperature.textContent = `${toFahrenheit(originalTemperatures.main)}°`;
    feelsLikeTemp.textContent = `FEELS LIKE: ${toFahrenheit(
      originalTemperatures.feelsLike
    )}°`;
    day1Temp.textContent = `${toFahrenheit(originalTemperatures.day1)}°`;
    day2Temp.textContent = `${toFahrenheit(originalTemperatures.day2)}°`;
    day3Temp.textContent = `${toFahrenheit(originalTemperatures.day3)}°`;
    fahrenheitButton.classList.add("active");
    celsiusButton.classList.remove("active");
  } else {
    mainTemperature.textContent = `${originalTemperatures.main}°`;
    feelsLikeTemp.textContent = `FEELS LIKE: ${originalTemperatures.feelsLike}°`;
    day1Temp.textContent = `${originalTemperatures.day1}°`;
    day2Temp.textContent = `${originalTemperatures.day2}°`;
    day3Temp.textContent = `${originalTemperatures.day3}°`;
    celsiusButton.classList.add("active");
    fahrenheitButton.classList.remove("active");
  }
}

fahrenheitButton.addEventListener("click", () => {
  updateTemperatures("F");
});

celsiusButton.addEventListener("click", () => {
  updateTemperatures("C");
});

const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const firstDayElement = document.querySelector(".first-day");
const secondDayElement = document.querySelector(".second-day");
const lastDayElement = document.querySelector(".last-day");

function setCurrentTime() {
  const currentDate = new Date();

  const currentTimeString = currentDate.toLocaleTimeString().slice(0, 5);

  const currentDayOfMonth = currentDate.getDate();
  const currentMonthString = MONTHS_COLLECTION[currentDate.getMonth()];
  const currentDayOfWeekString = DAY_OF_WEEK_COLLECTION[
    currentDate.getDay()
  ].slice(0, 3);

  const currentFirstDay =
    DAY_OF_WEEK_COLLECTION[(currentDate.getDay() + 1) % 7];
  const currentSecondDay =
    DAY_OF_WEEK_COLLECTION[(currentDate.getDay() + 2) % 7];
  const currentLastDay = DAY_OF_WEEK_COLLECTION[(currentDate.getDay() + 3) % 7];

  const currentDateString = `${currentDayOfWeekString} ${currentDayOfMonth} ${currentMonthString}`;

  timeElement.textContent = currentTimeString;
  dateElement.textContent = currentDateString;
  firstDayElement.textContent = currentFirstDay;
  secondDayElement.textContent = currentSecondDay;
  lastDayElement.textContent = currentLastDay;
}

setCurrentTime();

setInterval(setCurrentTime, 5000);

const latitudeElement = document.querySelector(".latitude-text");
const longitudeElement = document.querySelector(".longitude-text");

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  latitudeElement.textContent = `Latitude: ${latitude
    .toString()
    .slice(0, 5)
    .replace(".", "° ")}'`;
  longitudeElement.textContent = `Longitude: ${longitude
    .toString()
    .slice(0, 5)
    .replace(".", "° ")}'`;

  ymaps.ready(function () {
    const map = new ymaps.Map("map", {
      center: [latitude, longitude],
      zoom: 10,
    });

    const placemark = new ymaps.Placemark([latitude, longitude], {
      hintContent: "Ваше текущее местоположение",
    });
    map.geoObjects.add(placemark);
  });
}

function errorCallback(error) {
  console.error("Ошибка определения местоположения:", error);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
  console.log("Геолокация не поддерживается этим браузером.");
}
