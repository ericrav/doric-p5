import { setupP5, getCanvas } from '@ericrav/p5.node';
import fs from 'fs';

import './style.css';
import { settings } from '../sketch/sketch';


(window as any).requestAnimationFrame = (callback: FrameRequestCallback) => {
  setTimeout(callback, 1000 / 60);
};

setupP5(require('p5'));


import('../sketch/sketch').then(({ setup, draw }) => {
  (window as any).setup = () => {
    createCanvas(settings.dimensions[0], settings.dimensions[1]);
    setup();
  }

  (window as any).draw = () => {
    draw();
    noLoop();
    // Save sketch to file
    const out = fs.createWriteStream('sketch.png');
    const canvas = getCanvas(); // get node-canvas instance
    console.log(canvas.width, canvas.height);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('Done rendering'));
  };
});
