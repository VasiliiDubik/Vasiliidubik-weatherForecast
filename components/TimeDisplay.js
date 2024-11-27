class TimeDisplay {
  constructor(app) {
    this.app = app;
    this.timeElement = document.querySelector(".forecast-block__time");
    this.dateElement = document.querySelector(".forecast-block__date-value");

    const currentDate = new Date();
    this.setTime(currentDate);
    this.setDate(currentDate);
  }

  setTime(currentDate) {
    const currentTimeString = currentDate.toLocaleTimeString().slice(0, 5);
    this.timeElement.textContent = currentTimeString;
  }

  setDate(currentDate) {
    const currentDayOfMonth = currentDate.getDate();
    const currentMonthString =
      this.app.MONTHS_COLLECTION[currentDate.getMonth()];
    const currentDayOfWeekString = this.app.DAY_OF_WEEK_COLLECTION[
      currentDate.getDay()
    ].slice(0, 3);
    const currentDateString = `${currentDayOfWeekString} ${currentDayOfMonth} ${currentMonthString}`;

    this.dateElement.textContent = currentDateString;
  }
}

export default TimeDisplay;
