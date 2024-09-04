export default class DrawManager {
  constructor(canvas, entityManager) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.entityManager = entityManager;

    this.init();
  }

  init() {
    this.ctx.font = "16px serif";
  }

  playersDraw(players) {
    Object.keys(players).forEach((key, index) => {
      this.ctx.fillStyle = "black";
      this.ctx.fillText(
        `${players[key].nickname} : ${players[key].score}`,
        0,
        200 + 20 * (index + 1)
      );

      if (players[key].bullets.length) {
        const radius = players[key].radius;
        players[key].bullets.forEach((bullet) => {
          const { x, y } = bullet;
          this.ctx.beginPath();
          this.ctx.strokeStyle = "black";
          this.ctx.arc(x, y, radius, 0, Math.PI * 2);
          this.ctx.closePath();
          this.ctx.stroke();
        });
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    const { players, enemies, items } = this.entityManager;

    if (Object.keys(players).length !== 0) {
      this.playersDraw(players);
    }

    if (enemies.length) {
      enemies.forEach((enemy) => {
        this.ctx.beginPath();
        this.ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        this.ctx.closePath();

        this.ctx.fillStyle = enemy.color;
        this.ctx.fill();
      });
    }

    if (items.length) {
      items.forEach((item) => {
        this.ctx.beginPath();
        this.ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        this.ctx.closePath();

        this.ctx.fillStyle = item.color;
        this.ctx.fill();
      });
    }
  }
}
