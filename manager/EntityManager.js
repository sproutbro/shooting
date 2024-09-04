import Enemy from "./Enemy.js";
import Item from "./Item.js";
import Player from "./Player.js";

export default class EntityManager {
  constructor() {
    this.enemies = [];
    this.items = [];
    this.players = {};
  }

  addPlayer(player) {
    this.players[player.socketId] = new Player(player.nickname);
  }

  createEnemy() {
    this.enemies.push(new Enemy());
  }

  createItem(x, y, radius) {
    this.items.push(new Item(x, y, radius));
  }

  update() {
    this.enemies.forEach((enemy) => {
      enemy.update();
    });

    this.items.forEach((item) => {
      item.update();
    });
  }
}
