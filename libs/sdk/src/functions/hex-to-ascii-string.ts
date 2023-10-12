export function hexToAsciiString(hex: string) {
  let str = '';
  for (let i = 0; i < hex.length && hex.substring(i, i + 2) !== '00'; i += 2) {
    str += String.fromCharCode(parseInt(hex.substring(i, i + 2), 16));
  }
  return str;
}
