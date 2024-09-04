export default class Enemy {
  constructor(
    x = Math.random() * 640,
    y = Math.random() * 360,
    radius = Math.random() * 15 + 5,
    speed = Math.random() * 4 + 1,
    color = "blue"
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.color = color;
    this.speed = speed;
  }

  update() {
    this.x -= this.speed;
    if (this.x + this.radius < 0) this.x = 640;
  }
}
