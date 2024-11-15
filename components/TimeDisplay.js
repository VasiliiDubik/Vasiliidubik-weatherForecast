class TimeDisplay {
  constructor(app) {
    this.app = app;
    this.timeElement = document.querySelector(".time");
    this.dateElement = document.querySelector(".date");

    this.setupCurrentTime();
  }

  setupCurrentTime() {
    const currentDate = new Date();
    const currentTimeString = currentDate.toLocaleTimeString().slice(0, 5);
    const currentDayOfMonth = currentDate.getDate();
    const currentMonthString =
      this.app.MONTHS_COLLECTION[currentDate.getMonth()];
    const currentDayOfWeekString = this.app.DAY_OF_WEEK_COLLECTION[
      currentDate.getDay()
    ].slice(0, 3);
    const currentDateString = `${currentDayOfWeekString} ${currentDayOfMonth} ${currentMonthString}`;

    this.timeElement.textContent = currentTimeString;
    this.dateElement.textContent = currentDateString;
  }
}

export default TimeDisplay;
