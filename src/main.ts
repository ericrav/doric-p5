import { draw, settings, setup } from '../sketch/sketch';
import './style.css';
import 'p5';

(window as any).setup = () => {
  createCanvas(settings.dimensions[0], settings.dimensions[1]);
  setup();
}

(window as any).draw = draw;
