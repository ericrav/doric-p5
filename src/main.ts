import { draw, setup } from '../sketch/sketch';
import './style.css';
import 'p5';

(window as any).setup = setup;

(window as any).draw = draw;
