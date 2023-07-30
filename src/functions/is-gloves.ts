import { Gloves } from '../types/skins/gloves/gloves';

// rome-ignore lint/suspicious/noExplicitAny: typecheck function uses any
export function isGloves(obj: any): obj is Gloves {
  return Object.values(Gloves).includes(obj);
}
