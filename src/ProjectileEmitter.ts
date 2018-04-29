import Projectile from './Projectile';

const speed = 20;

export default class ProjectileEmitter {
  private projectiles: Phaser.GameObjects.Group;
  private firing: boolean = false;

  private getFocus: () => Vec2;
  private getOrigin: () => Vec2;

  private fireTicks: number = 5;
  private ticksSinceLastFire: number = 0;

  constructor(
    public scene: Phaser.Scene,
  ) {
    this.projectiles = scene.add.group([]);
  }

  private fire() {
    const origin = this.getOrigin();
    const focus = this.getFocus();

    const v = new Phaser.Math.Vector2(
      focus.x - origin.x,
      focus.y - origin.y,
    );

    const l = v.length();
    if (l < .1) return;

    v.scale(speed / l);

    const proj = new Projectile(this.scene, {
      x: origin.x,
      y: origin.y,
      vx: v.x,
      vy: v.y,
    });

    this.projectiles.add(proj);
  }

  public startFire(
    getOrigin: () => Vec2,
    getFocus: () => Vec2,
  ) {
    this.getOrigin = getOrigin;
    this.getFocus = getFocus;
    this.firing = true;
  }

  public stopFire() {
    this.firing = false;
  }

  update() {
    this.ticksSinceLastFire++;
    if (this.ticksSinceLastFire >= this.fireTicks) {
      if (this.firing) {
        this.fire();
        this.ticksSinceLastFire = 0;
      }
    }
  }
}
