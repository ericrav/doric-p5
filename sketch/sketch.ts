import { em, vh, vw } from "./units";

export const settings = {
  dimensions: [800, 600],
}

export function setup() {
  background(211);
}

export function draw() {
  stroke(11);
  strokeWeight(em(0.75));

  let y = vh(95)
  const gap = vw(4);
  const cols = 13;
  const margin = vw(8);
  const length = (width - margin * 2 - gap * (cols - 1)) / cols;
  let x = margin;

  for (let i = 0; i < cols; i++) {
    const fromMid = Math.abs(i - 6);
    const rows = 22 - fromMid ** 1.45;
    for (let j = 0; j < rows; j++) {
      const y2 = y - vh(j ** (1.3 + (6 - fromMid) * 0.01));
      stroke(11 + (j * 5));
      const angle = (1 - (fromMid ** (1 + j/20)) * (j*0.275));
      if (i < 7) {
        line(x, y2, x + length, y2 + angle);
      } else {
        line(x, y2  + angle, x + length, y2);
      }
    }

    x += gap + length;
  }
}
