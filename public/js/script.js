import EventManager from "./event/EventManager.js";

import EntityManager from "./entity/EntityManager.js";
import InputManager from "./input/InputManager.js";
import DrawManager from "./event/DrawManager.js";

const $ = document.querySelector.bind(document);

const canvas = $("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const socket = io();

const user_form = $("#user_form");
user_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nickname = e.target.nickname.value;
  socket.emit("init", { nickname });
  e.target.remove();

  init();
});

function init() {
  const entityManager = new EntityManager();
  const inputManager = new InputManager(canvas);
  const eventManager = new EventManager(entityManager, inputManager, socket);
  const drawManager = new DrawManager(canvas, entityManager);

  socket.on("state", (data) => {
    if (data.players[socket.id]?.change) {
      let position = {};
      if (inputManager.mouseHandler.mousePosition.x) {
        position = inputManager.mouseHandler.mousePosition;
      }

      if (inputManager.touchHandler.touchPosition.x) {
        position = inputManager.touchHandler.touchPosition;
      }

      socket.emit("change", {
        name: "shoot",
        shootPosition: position,
      });
    }

    entityManager.set(data);
    drawManager.draw();
  });
}
