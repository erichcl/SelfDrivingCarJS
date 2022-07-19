class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    const fakeInfinity = 1000000;
    this.top = -fakeInfinity;
    this.bottom = fakeInfinity;

    this.topLeft = { x: this.left, y: this.top };
    this.bottomLeft = { x: this.left, y: this.bottom };
    this.topRight = { x: this.right, y: this.top };
    this.bottomRight = { x: this.right, y: this.bottom };

    this.borders = [
      [this.topLeft, this.bottomLeft],
      [this.topRight, this.bottomRight],
    ];
  }

  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.laneCount;
    const minLaneIndex = Math.min(laneIndex, this.laneCount - 1);
    return this.left + laneWidth / 2 + laneWidth * minLaneIndex;
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';

    for (let i = 1; i <= this.laneCount - 1; i++) {
      const x = lerp(this.left, this.right, i / this.laneCount);
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(x, this.top);
      ctx.lineTo(x, this.bottom);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    this.borders.forEach((border) => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    });
  }
}
