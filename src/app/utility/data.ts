export function getGeoLocation(fn: Function) {
  if (!fn) return;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => fn(position));
  }
}
