import { Knife } from '../types/skins/knives/knives';

// rome-ignore lint/suspicious/noExplicitAny: typecheck function uses any
export function isKnife(obj: any): obj is Knife {
  return Object.values(Knife).includes(obj);
}
