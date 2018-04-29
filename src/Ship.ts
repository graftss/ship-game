import 'phaser';

export default class Ship extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'ship');

    scene.add.existing(this);
  }

  move(v: Phaser.Math.Vector2): void {
    this.x += v.x;
    this.y += v.y;
  }
}
