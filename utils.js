lerp = (left, right, percentage) => {
  return left + (right - left) * percentage;
};

getIntersection = (LineAStart, LineAEnd, LineBStart, LineBEnd) => {
  const tTop =
    (LineBEnd.x - LineBStart.x) * (LineAStart.y - LineBStart.y) -
    (LineBEnd.y - LineBStart.y) * (LineAStart.x - LineBStart.x);

  const uTop =
    (LineBStart.y - LineAStart.y) * (LineAStart.x - LineAEnd.x) -
    (LineBStart.x - LineAStart.x) * (LineAStart.y - LineAEnd.y);

  const bottom =
    (LineBEnd.y - LineBStart.y) * (LineAEnd.x - LineAStart.x) -
    (LineBEnd.x - LineBStart.x) * (LineAEnd.y - LineAStart.y);

  if (bottom !== 0) {
    const t = tTop / bottom;
    const u = uTop / bottom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(LineAStart.x, LineAEnd.x, t),
        y: lerp(LineAStart.y, LineAEnd.y, t),
        offset: t,
      };
    }
  }
  return null;
};
