import ProjectileEmitter from './ProjectileEmitter';

export default class Ship extends Phaser.GameObjects.Sprite {
  private emitter: ProjectileEmitter;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'ship');
    scene.add.existing(this);
    scene.events.on('update', this.update.bind(this));

    this.emitter = new ProjectileEmitter(scene);
  }

  move(v: Phaser.Math.Vector2): void {
    this.x += v.x;
    this.y += v.y;
  }

  public startFire(pointer: Phaser.Input.Pointer): void {
    this.emitter.startFire(
      () => this,
      () => pointer,
    );
  }

  public stopFire() {
    this.emitter.stopFire();
  }

  update() {
    this.emitter.update();
  }
}
