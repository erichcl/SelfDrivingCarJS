class Sensor {
  constructor(car, rayCount = 3, rayLength = 100) {
    this.car = car;
    this.rayCount = rayCount;
    this.rayLength = rayLength;
    this.raySpread = Math.PI / 4;

    this.rays = [];
  }

  update() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const angle = lerp(
        this.raySpread / 2,
        -this.raySpread / 2,
        i / (this.rayCount - 1)
      );
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
    console.log(this.rays);
  }

  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      if (this.rays[i] !== undefined) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'yellow';
        ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
        ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
        ctx.stroke();
      }
    }
  }
}
