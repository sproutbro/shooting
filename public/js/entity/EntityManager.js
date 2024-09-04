export default class EntityManager {
  constructor() {
    this.enemies = [];
    this.items = [];
    this.players = {};
  }

  set({ enemies, items, players }) {
    this.enemies = enemies;
    this.items = items;
    this.players = players;
  }
}
