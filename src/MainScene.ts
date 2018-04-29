import Ship from './Ship';

export default class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private ship: Ship;
  private cursors: CursorKeys;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("ship", "../assets/games/endlessRunner/head.png");
    this.load.image("projectile", "../assets/games/endlessRunner/head.png");
  }

  create(): void {
    this.ship = new Ship(this, 50, 50);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.on('pointerdown', pointer => this.ship.startFire(pointer));
    this.input.on('pointerup', () => this.ship.stopFire());
  }

  update(): void {
    const movement = new Phaser.Math.Vector2(0, 0);

    if (this.cursors.down.isDown) {
      movement.y += 4;
    } else if (this.cursors.up.isDown) {
      movement.y -= 4;
    }

    if (this.cursors.left.isDown) {
      movement.x -= 4;
    } else if (this.cursors.right.isDown) {
      movement.x += 4;
    }

    this.ship.move(movement);
  }
}
