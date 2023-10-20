export function hexStringToByteArray(hex: string): Uint8Array {
  if (typeof hex !== "string") {
    throw new TypeError("Wrong data type passed to converter. Hexadecimal string is expected");
  }

  const length = hex.length / 2;
  const uint8arr = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    uint8arr[i] = parseInt(hex.substring(i * 2, 2), 16);
  }

  return uint8arr;
}
