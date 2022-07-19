class Car {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = 'green';

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;
    this.turningAngle = 0.05;
    this.controls = new Controls();
  }

  update() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.controls.left) {
      this.angle += this.turningAngle;
    }

    if (this.controls.right) {
      this.angle -= this.turningAngle;
    }

    this.x -= this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();

    ctx.restore();
  }
}
