import KeyboardHandler from "./KeyboardHandler.js";
import MouseHandler from "./MouseHandler.js";
import TouchHandler from "./TouchHandler.js";

export default class InputManager {
  constructor(canvas) {
    this.mouseHandler = new MouseHandler(canvas);
    this.touchHandler = new TouchHandler(canvas);
    this.keyboardHandler = new KeyboardHandler();
  }

  onMouseMove(callback) {
    this.mouseHandler.onMouseMove(callback);
  }

  onMouseDown(callback) {
    this.mouseHandler.onMouseDown(callback);
  }

  onMouseUp(callback) {
    this.mouseHandler.onMouseUp(callback);
  }

  onKeyDown(callback) {
    this.keyboardHandler.onKeyDown(callback);
  }

  onKeyUp(callback) {
    this.keyboardHandler.onKeyUp(callback);
  }

  onTouchDown(callback) {
    this.touchHandler.onTouchStart(callback);
  }

  onTouchMove(callback) {
    this.touchHandler.onTouchMove(callback);
  }

  onTouchEnd(callback) {
    this.touchHandler.onTouchEnd(callback);
  }
}
