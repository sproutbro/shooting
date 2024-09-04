const gunshot = [
  new Audio("/assets/sound/gunshot0.mp3"),
  new Audio("/assets/sound/gunshot1.mp3"),
  new Audio("/assets/sound/gunshot2.mp3"),
  new Audio("/assets/sound/gunshot3.mp3"),
  new Audio("/assets/sound/gunshot4.mp3"),
];

function gunshotPlay() {
  const gunshotLength = gunshot.length - 1;
  const i = Math.floor(Math.random() * gunshotLength);
  gunshot[i].play();
}

export { gunshotPlay };
