import { Gloves } from "@skintracker/types/src";

// biome-ignore lint/suspicious/noExplicitAny: typecheck function uses any
export function isGloves(obj: any): obj is Gloves {
  return Object.values(Gloves).includes(obj);
}
