export const vw = (n: number) => (n / 100) * width;
export const vh = (n: number) => (n / 100) * height;

const BASE = () => vw(0.5);
export const em = (n: number) => n * BASE();
