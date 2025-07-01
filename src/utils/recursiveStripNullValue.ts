export function recursiveStripNullValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(recursiveStripNullValue);
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, value]) => [
        key,
        recursiveStripNullValue(value),
      ]),
    );
  }
  if (value !== null) {
    return value;
  }
}
