interface ProjectileConfig {
  x: number,
  y: number,
  vx: number,
  vy: number,
}

export default class Projectile extends Phaser.GameObjects.Sprite {
  constructor(
    public scene: Phaser.Scene,
    public config: ProjectileConfig,
  ) {
    super(scene, config.x, config.y, 'projectile');
    scene.add.existing(this);

    this.scaleX = 0.2;
    this.scaleY = 0.2;

    scene.events.on('update', this.update.bind(this));
  }

  update() {
    const { vx, vy } = this.config;
    this.x += vx;
    this.y += vy;
  }
}
