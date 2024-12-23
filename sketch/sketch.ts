import { em, vh, vw } from "./units";

export const settings = {
  dimensions: [800, 600],
}

export function setup() {
  background("#f3f2eb");
}

export function draw() {
  background("#f3f2eb");
  drawWave("#111142AA", 0);
  drawWave("#44444499", 2);
  drawWave("#00000033", 5);
}

function drawWave(c, offset) {
  const originalAlpha = alpha(c);
  let col = color(c);
  // col.setAlpha(255);
  stroke(col);
  strokeWeight(em(0.75));

  let y = vh(97.5) + offset
  const gap = vw(0.5);
  const cols = 85;
  const margin = vw(0.1);
  const length = (width - margin * 2 - gap*(cols-1)) / cols;
  let x = margin + offset;

  for (let i = 0; i < cols; i++) {
    const mid = Math.ceil(cols / 2);
    const fromMid = Math.abs(i - mid);
    const rows = cols*2.8 - fromMid ** (1.4 + offset*0.02);

    // Calculate influence for the entire column
    const columnX = x + length/2;
    const mouseDistance = Math.abs(mouseX - columnX) ** 1.2;
    const maxDistance = vw(40);
    const influence = Math.max(0, 1 - mouseDistance/maxDistance);

    for (let j = 0; j < rows; j++) {
      const y2 = y - vh(j ** (1.15 + (mid - fromMid) * 0.02));
      col.setAlpha(originalAlpha - (j * 5));
      stroke(col);

      // Calculate angle with distance influence
      const baseAngle = (1 - (fromMid ** (1 + j/(40 * fromMid**1.6))) * (j*0.275));
      const angle = baseAngle * influence * (2.5 - 4*fromMid/cols); // increased multiplier to 5 for stronger effect

      if (i < mid) {
        line(x, y2, x + length, y2 + angle);
      } else {
        line(x, y2  + angle, x + length, y2);
      }
    }

    x += gap + length;
  }
}
