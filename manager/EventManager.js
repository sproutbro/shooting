import { checkCircleCollision } from "./gameUtils.js";

export default class EventManager {
  constructor(entityManager) {
    this.entityManager = entityManager;
  }

  shoot(player) {
    player.bullets.push(player.shootPosition);
    setTimeout(() => player.bullets.splice(0, 1), 1000);
    this.checkCollision(player);

    if (player.state.shoot) return;
    player.state.shoot = setInterval(() => {
      player.change = true;
    }, player.shootTime);
  }

  shootStop(player) {
    clearInterval(player.state.shoot);
    player.state.shoot = null;
  }

  checkCollision(player) {
    const enemies = this.entityManager.enemies;
    const items = this.entityManager.items;
    const position = player.shootPosition;
    position.radius = player.radius;

    enemies.forEach((enemy, i) => {
      if (checkCircleCollision(enemy, position)) {
        player.score++;
        this.entityManager.enemies.splice(i, 1);
      }
    });

    items.forEach((item, i) => {
      if (checkCircleCollision(item, position)) {
        if (item.value === 0) {
          setTimeout(() => (player.shootTime = 50), 5000);
        }
        if (item.value === 1) {
          player.radius = 20;
          setTimeout(() => (player.radius = 5), 5000);
        }
        this.entityManager.items.splice(i, 1);
      }
    });
  }
}
