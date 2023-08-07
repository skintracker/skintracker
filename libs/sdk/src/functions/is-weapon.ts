import { Weapon } from '../types/skins/weapons/weapons';

// rome-ignore lint/suspicious/noExplicitAny: typecheck function uses any
export function isWeapon(obj: any): obj is Weapon {
  return Object.values(Weapon).includes(obj);
}
