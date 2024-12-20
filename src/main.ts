import { draw, settings, setup } from '../sketch/sketch';
import './style.css';
import 'p5';

import clockData from './stats.json';
import { getElapsedTimeString } from './utils';

(window as any).setup = () => {
  createCanvas(settings.dimensions[0], settings.dimensions[1]);
  setup();
};

(window as any).draw = draw;

// Update player clocks
document.getElementById('clock')?.style.setProperty('visibility', 'visible');
(Object.keys(clockData.authors) as (keyof typeof clockData.authors)[]).forEach((key) => {
  const time = document.getElementById(`${key}-time`)!;
  time.innerText = getElapsedTimeString(clockData.authors[key].time);

  if ('message' in clockData.authors[key].commit) {
    const link = document.getElementById(`${key}-commit`) as HTMLAnchorElement;
    link.innerText = clockData.authors[key].commit.message;
    link.href = `https://github.com/ericrav/doric-p5/commit/${clockData.authors[key].commit.hash}`;
  }

  if (key === clockData.turn) {
    document.getElementById(key)!.classList.add('active');
    time.classList.add('active');

    const lastDate = new Date(clockData.lastCommit).getTime();
    const updateTime = () => {
      const elapsed = Date.now() - lastDate;
      time!.innerText = getElapsedTimeString(clockData.authors[key].time + elapsed);
    };
    setInterval(updateTime, 1000*60);
    updateTime();
  }
});
