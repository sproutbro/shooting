import EventManager from "./event/EventManager.js";

import EntityManager from "./entity/entityManager.js";
import InputManager from "./input/InputManager.js";
import DrawManager from "./event/DrawManager.js";

const $ = document.querySelector.bind(document);

const canvas = $("canvas");
canvas.width = 640;
canvas.height = 360;

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
      socket.emit("change", {
        name: "shoot",
        shootPosition: inputManager.mouseHandler.mousePosition,
      });
    }

    entityManager.set(data);
    drawManager.draw();
  });
}
