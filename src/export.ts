const { setupP5, getCanvas } = require('@ericrav/p5.node');
setupP5(require('p5'));

const fs = require('fs');
import { settings } from '../sketch/sketch';

import('../sketch/sketch').then(({ setup, draw }) => {
  (window as any).setup = () => {
    createCanvas(settings.dimensions[0], settings.dimensions[1]);
    setup();
    noLoop();
    // move mouse to position
    mouseX = settings.mouse[0];
    mouseY = settings.mouse[1];
  }

  (window as any).draw = () => {
    draw();
    // Save sketch to file
    const out = fs.createWriteStream('sketch.png');
    const canvas = getCanvas(); // get node-canvas instance
    console.log(canvas.width, canvas.height);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('Saved to sketch.png'));
  };
});
