class BackgroundChanger {
  constructor(app) {
    this.app = app;
    this.sectionElement = this.app.sectionElement;
    this.backgrounds = this.app.backgrounds;
    this.currentBackground = null;
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
