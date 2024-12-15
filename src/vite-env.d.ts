/// <reference types="vite/client" />

declare module '@ericrav/p5.node' {
  import canvas from 'canvas'
  export function setupP5(p5: any): void;
  export function getCanvas(): canvas.Canvas;
}
