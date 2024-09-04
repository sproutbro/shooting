export function checkCircleCollision(entity, position) {
  const dx = entity.x - position.x;
  const dy = entity.y - position.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < entity.radius + position.radius;
}
