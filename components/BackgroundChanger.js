class BackgroundChanger {
  constructor(app) {
    this.app = app;
    this.sectionElement = document.querySelector(".section");
    this.backgrounds = ["./img/bg1.png", "./img/bg2.png", "./img/bg3.png"];
    this.refreshButton = document.querySelector(".refresh-button");

    this.currentBackground = null;

    this.changeBackground();
    this.backgroundSwitch();
  }

  backgroundSwitch() {
    this.refreshButton.addEventListener(
      "click",
      this.changeBackground.bind(this)
    );
  }

  changeBackground() {
    let newBackground;

    do {
      newBackground =
        this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)];
    } while (newBackground === this.currentBackground);

    this.sectionElement.style.backgroundImage = `url('${newBackground}')`;
    this.currentBackground = newBackground;
  }
}

export default BackgroundChanger;
