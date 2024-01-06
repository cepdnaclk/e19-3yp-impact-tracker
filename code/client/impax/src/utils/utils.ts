export function deleteByValue<T>(obj: Record<string, T>, value: T): void {
  // Find the key associated with the specified value
  const keyToDelete = Object.keys(obj).find((key) => obj[key] === value);

  // If a key is found, delete the key-value pair
  if (keyToDelete) {
    delete obj[keyToDelete];
  }
}
