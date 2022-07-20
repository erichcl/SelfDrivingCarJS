class Car {
  constructor(x, y, w, h, controlType, maxSpeed = 3) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = buildColor();

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = maxSpeed;
    this.friction = 0.05;
    this.angle = 0;
    this.turningAngle = 0.05;
    if (controlType != 'DUMMY') {
      this.sensor = new Sensor(this);
    }
    this.controls = new Controls(controlType);
    // this.damage = 0;
    // this.maxHealth = 255;
    this.hasDamage = false;
    this.polygon = [];
  }

  update(roadBorders, traffic, playerCar = null) {
    if (!this.hasDamage) {
      this.#move();
      this.polygon = this.#createPolygon();
      this.hasDamage = this.#assesDamage(roadBorders, traffic, playerCar);
    }

    if (this.sensor) {
      this.sensor.update(roadBorders, traffic);
    }
  }

  #assesDamage(roadBorders, traffic, playerCar) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polyIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    for (let i = 0; i < traffic.length; i++) {
      if (polyIntersect(this.polygon, traffic[i].polygon)) {
        return true;
      }
    }

    if (playerCar && polyIntersect(this.polygon, playerCar.polygon)) {
      return true;
    }
    return false;
  }

  #createPolygon() {
    const points = [];
    const radius = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * radius,
      y: this.y - Math.cos(this.angle - alpha) * radius,
    });

    points.push({
      x: this.x - Math.sin(this.angle + alpha) * radius,
      y: this.y - Math.cos(this.angle + alpha) * radius,
    });

    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * radius,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * radius,
    });

    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * radius,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * radius,
    });

    return points;
  }

  #move() {
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

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += this.turningAngle * flip;
      }

      if (this.controls.right) {
        this.angle -= this.turningAngle * flip;
      }
    }

    this.x -= this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  }

  #drawPolygon(ctx) {
    if (this.polygon.length == 0) {
      return;
    }

    // if (this.damage >= this.maxHealth) {
    //   this.damage = 0;
    // }

    this.color = buildColor(0, 0, 0, 1);
    if (this.hasDamage) {
      this.color = buildColor(255, 0, 0, 1);
    }

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.lineWidth = 2;
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();
    ctx.closePath();
  }

  draw(ctx) {
    this.#drawPolygon(ctx);
    if (this.sensor) {
      this.sensor.draw(ctx);
    }
  }
}
