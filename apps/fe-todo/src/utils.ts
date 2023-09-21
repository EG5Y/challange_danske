export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function match<R>(data: [() => boolean, () => R][]): R | undefined {
  for (let i = 0; i < data.length; i++) {
    const [com, fun] = data[i];
    if (com()) return fun();
  }
  return undefined;
}
