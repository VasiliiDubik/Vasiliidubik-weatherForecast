class MapService {
  constructor() {
    this.map = null;
    this.placemark = null;
  }

  initializeMap(containerId, latitude, longitude) {
    this.map = new ymaps.Map(containerId, {
      center: [latitude, longitude],
      zoom: 10,
    });

    this.placemark = new ymaps.Placemark([latitude, longitude], {
      hintContent: "Ваше текущее местоположение",
    });
    this.map.geoObjects.add(this.placemark);
  }

  updateMap(latitude, longitude) {
    if (this.map) {
      this.map.setCenter([latitude, longitude]);
      this.placemark.geometry.setCoordinates([latitude, longitude]);
    }
  }
}

export default new MapService();
