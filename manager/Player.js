export default class Player {
  constructor(nickname) {
    this.nickname = nickname;
    this.score = 0;
    this.radius = 5;
    this.bulletBox = 6;
    this.bullets = [];
    this.shootTime = 500;
    this.shootPosition = {};
    this.state = [];
    this.change = false;
  }
}
