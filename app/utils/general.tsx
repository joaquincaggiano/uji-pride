export const compare = (key: string, a: any, b: any) => {
  if (a[key] < b[key]) {
    return -1;
  }
  if (a[key] > b[key]) {
    return 1;
  }
  // a debe ser igual b
  return 0;
}