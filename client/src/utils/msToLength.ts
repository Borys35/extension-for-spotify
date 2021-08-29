export function msToLength(ms: number): string {
  const sec = ms / 1000;
  const minutes = Math.floor(sec / 60);
  let restSec = Math.floor(sec % 60).toString();
  if (restSec.length <= 1) restSec = `0${restSec}`;

  return `${minutes}:${restSec}`;
}
