import express from "express";
import { createServer } from "http";
import appConfig from "./config/app.js";
import { Server } from "socket.io";
import EntityManager from "./manager/EntityManager.js";
import EventManager from "./manager/EventManager.js";
const app = appConfig(express);
const server = createServer(app);

const io = new Server(server);

const entityManager = new EntityManager();
const eventManager = new EventManager(entityManager);

setInterval(() => {
  if (entityManager.enemies.length > 100) return;
  if (!Math.floor(Math.random() * 10)) entityManager.createItem();
  entityManager.createEnemy();
}, 1000);

setInterval(() => {
  entityManager.update();
  const { enemies, players, items } = entityManager;
  io.emit("state", { enemies, players, items });
}, 15);

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("init", (player) => {
    const newPlayer = {};
    newPlayer["socketId"] = socket.id;
    newPlayer["nickname"] = player.nickname;
    entityManager.addPlayer(newPlayer);
  });

  socket.on("change", (data) => {
    const player = entityManager.players[socket.id];

    if (data.name === "shoot") {
      player.shootPosition = data.shootPosition;
      eventManager.shoot(player);
    }

    if (data.name === "shootStop") {
      player.shootPosition = {};
      eventManager.shootStop(player);
    }

    player.change = false;
  });

  socket.on("disconnect", (socket) => {
    console.log(`Client disconnected: ${socket.id}`);
    delete entityManager.players[socket.id];
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
