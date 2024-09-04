import { gunshotPlay } from "../sound/sound.js";

export default class EventManager {
  constructor(entityManager, inputManager, socket) {
    this.entityManager = entityManager;
    this.inputManager = inputManager;
    this.socket = socket;

    this.init();
  }

  init() {
    this.inputManager.mouseHandler.setOnMouseDown((position) =>
      this.setOnMouseDown(position)
    );

    this.inputManager.mouseHandler.setOnMouseUp((position) =>
      this.setOnMouseUp(position)
    );

    this.inputManager.touchHandler.setOnTouchStart((position) => {
      this.setOnTouchStart(position);
    });

    this.inputManager.touchHandler.setOnTouchEnd(() => {
      this.setOnTouchEnd();
    });
  }

  setOnMouseDown() {
    gunshotPlay();
    this.change({
      name: "shoot",
      shootPosition: this.inputManager.mouseHandler.mousePosition,
    });
  }

  setOnMouseUp() {
    this.change({
      name: "shootStop",
    });
  }

  setOnTouchStart() {
    gunshotPlay();
    this.change({
      name: "shoot",
      shootPosition: this.inputManager.touchHandler.touchPosition,
    });
  }

  setOnTouchEnd() {
    this.change({
      name: "shootStop",
    });
  }

  change(data) {
    this.socket.emit("change", data);
  }

  getItem(value) {
    if (value === 0) {
      this.entityManager.player.radius = 30;
      setTimeout(() => (this.entityManager.player.radius = 5), 5000);
    }
    if (value === 1) {
      this.entityManager.player.shootTime = 50;
      setTimeout(() => (this.entityManager.player.shootTime = 500), 5000);
    }
  }
}
