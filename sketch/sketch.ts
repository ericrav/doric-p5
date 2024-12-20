import { em, vh, vw } from "./units";

export const settings = {
  dimensions: [800, 600],
}

export function setup() {
  background("#f3f2eb");
  noLoop();
}

export function draw() {
  background("#f3f2eb");
  drawWave("#FFFF00", 0);
  drawWave("#FF00FF", 2);
  drawWave("#00FFFF", 5);
}

function drawWave(c, offset) {
  let col = color(c);
  col.setAlpha(255);
  stroke(col);
  strokeWeight(em(0.75));

  let y = vh(97.5) + offset
  const gap = vw(4);
  const cols = 36;
  const margin = vw(1);
  const length = (width - margin * 2 - gap*(cols-1)) / cols;
  let x = margin + offset;

  for (let i = 0; i < cols; i++) {
    const mid = Math.ceil(cols / 2);
    const fromMid = Math.abs(i - mid);
    const rows = cols*2.9 - fromMid ** (1.4 + offset*0.02);
    for (let j = 0; j < rows; j++) {
      const y2 = y - vh(j ** (1.25 + (mid - fromMid) * 0.02));
      // TODO: eric i want it to fade out in opacity like u did in the prev ver
      // ok
      col.setAlpha(175 - (j * 5));
      stroke(col);
      const angle = (1 - (fromMid ** (1 + j/(40 * fromMid**1.6))) * (j*0.275));
      if (i < mid) {
        line(x, y2, x + length, y2 + angle);
      } else {
        line(x, y2  + angle, x + length, y2);
      }
    }

    x += gap + length;
  }
}
