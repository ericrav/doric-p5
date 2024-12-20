export function getElapsedTime(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    seconds: seconds % 60,
    minutes: minutes % 60,
    hours: hours % 24,
    days,
  };
}

export function getElapsedTimeString(ms: number) {
  const elapsed = getElapsedTime(ms);
  return `${elapsed.days}d ${elapsed.hours}h ${elapsed.minutes}m`;
}
