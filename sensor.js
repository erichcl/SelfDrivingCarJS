class Sensor {
  constructor(car, rayCount = 20, rayLength = 150) {
    this.car = car;
    this.rayCount = rayCount;
    this.rayLength = rayLength;
    this.raySpread = Math.PI / 2;

    this.rays = [];
    this.readings = [];
  }

  update(roadBorders) {
    this.#castRays();
    this.readings = [];
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.#getReading(this.rays[i], roadBorders));
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      let color = 'yellow';
      if (this.rays[i]) {
        let end = this.rays[i][1];
        if (this.readings[i]) {
          end = this.readings[i];
          color = 'red';
        }
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
        ctx.stroke();
      }
    }
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const angle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
        ) + this.car.angle;
      const start = {
        x: this.car.x,
        y: this.car.y,
      };
      const end = {
        x: this.car.x - this.rayLength * Math.sin(angle),
        y: this.car.y - this.rayLength * Math.cos(angle),
      };
      this.rays.push([start, end]);
    }
  }

  #getReading(ray, roadBorders) {
    let touches = [];
    for (let i = 0; i < roadBorders.length; i++) {
      const touch = getIntersection(
        ray[0],
        ray[1],
        roadBorders[i][0],
        roadBorders[i][1]
      );
      if (i == 1) {
        roadBorders[i];
      }
      if (touch) {
        touches.push(touch);
      }
    }
    if (touches.length === 0) {
      return null;
    }
    // order by the offset, get the smallest one (closest to the car)
    // and return it
    return touches.sort((a, b) => a.offset - b.offset)[0];
  }
}
