export default class MouseHandler {
  constructor(canvas) {
    this.mousePosition = { x: 0, y: 0 };
    this.isMouseDown = false;

    this.onMouseMove = () => {};
    this.onMouseDown = () => {};
    this.onMouseUp = () => {};

    canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
    canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  handleMouseMove(event) {
    const rect = event.target.getBoundingClientRect();
    this.mousePosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    this.onMouseMove(this.mousePosition);
  }

  handleMouseDown() {
    this.isMouseDown = true;
    this.onMouseDown(this.mousePosition);
  }

  handleMouseUp() {
    this.isMouseDown = false;
    this.onMouseUp(this.mousePosition);
  }

  setOnMouseMove(callback) {
    this.onMouseMove = callback;
  }

  setOnMouseDown(callback) {
    this.onMouseDown = callback;
  }

  setOnMouseUp(callback) {
    this.onMouseUp = callback;
  }
}
