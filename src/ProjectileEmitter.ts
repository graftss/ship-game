import Projectile from './Projectile';
import { rotateVector2 } from './utils';

const speed = 12;

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

  private getNextProjectileCount(): number {
    return 7;
  }

  private getProjAngleSpacing(
    focusDistance: number,
    projectileCount: number,
  ): number {
    const low = 50;
    const high = 300;
    const t = 1 - (Phaser.Math.Clamp(focusDistance, low, high) - low) / (high - low);

    const lowArc = Math.PI / 12;
    const highArc = Math.PI / 3;
    const a = t * t * (highArc - lowArc) + lowArc;

    return a / projectileCount;
  }

  private fire() {
    const origin = this.getOrigin();
    const focus = this.getFocus();
    const projCount = this.getNextProjectileCount();

    const vFocus = new Phaser.Math.Vector2(
      focus.x - origin.x,
      focus.y - origin.y,
    );
    const focusDistance = vFocus.length();

    // don't fire if the focus point is too close to the origin
    if (focusDistance < .1) return;

    const projAngleSpacing = this.getProjAngleSpacing(focusDistance, projCount);
    vFocus.scale(speed / focusDistance);

    for (let i = 0; i < projCount; i++) {
      const v = rotateVector2(
        projAngleSpacing * (i - (projCount - 1) / 2),
        vFocus,
      );

      const proj = new Projectile(this.scene, {
        x: origin.x,
        y: origin.y,
        vx: v.x,
        vy: v.y,
      });

      this.projectiles.add(proj);
    }
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
