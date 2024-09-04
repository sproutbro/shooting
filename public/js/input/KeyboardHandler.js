export default class KeyboardHandler {
  constructor() {
    this.onKeyDown = () => {};
    this.onKeyUp = () => {};

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleKeyDown(event) {
    this.onKeyDown(event.key);
  }

  handleKeyUp(event) {
    this.onKeyUp(event.key);
  }

  setOnKeyDown(callback) {
    this.onKeyDown = callback;
  }

  setOnKeyUp(callback) {
    this.onKeyUp = callback;
  }
}
