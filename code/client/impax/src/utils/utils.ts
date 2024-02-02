export function deleteByValue<T>(obj: Record<string, T>, value: T): void {
  // Find the key associated with the specified value
  const keyToDelete = Object.keys(obj).find((key) => obj[key] === value);

  // If a key is found, delete the key-value pair
  if (keyToDelete) {
    delete obj[keyToDelete];
  }
}

export function generateStringId(input: string): string {
  const words = input.split(" ");
  const id = words.map((word) => word[0]).join("");
  const currentDate = new Date().toISOString().split("T")[0];
  const timestamp = Date.now().toString().split("").slice(0, 5).join("");
  const stringId = `${id}-${currentDate}-${timestamp}`;
  return stringId;
}
