export default class TouchHandler {
  constructor(canvas) {
    this.touchPosition = { x: 0, y: 0 };
    this.isTouchDown = false;

    this.onTouchStart = () => {};
    this.onTouchMove = () => {};
    this.onTouchEnd = () => {};

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    canvas.addEventListener("touchstart", this.handleTouchStart);
    canvas.addEventListener("touchmove", this.handleTouchMove);
    canvas.addEventListener("touchend", this.handleTouchEnd);
  }

  handleTouchStart(event) {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    this.isTouchDown = true;
    const touch = event.touches[0];
    this.touchPosition = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
    this.onTouchStart(this.touchPosition);
  }

  handleTouchMove(event) {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    const touch = event.touches[0];
    this.touchPosition = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
    this.onTouchMove(this.touchPosition);
  }

  handleTouchEnd(event) {
    event.preventDefault();
    this.isTouchDown = false;
    this.onTouchEnd(this.touchPosition);
  }

  setOnTouchStart(callback) {
    this.onTouchStart = callback;
  }

  setOnTouchMove(callback) {
    this.onTouchMove = callback;
  }

  setOnTouchEnd(callback) {
    this.onTouchEnd = callback;
  }
}
