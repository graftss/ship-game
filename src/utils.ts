const { cos, sin } = Math;

export const rotateVector2 = (a: number, v: Vec2): Phaser.Math.Vector2 => {
  const ca = cos(a);
  const sa = sin(a);

  return new Phaser.Math.Vector2(
    ca * v.x - sa * v.y,
    sa * v.x + ca * v.y,
  );
};

