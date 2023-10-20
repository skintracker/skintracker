import { Knife } from "@skintracker/types/src";

// biome-ignore lint/suspicious/noExplicitAny: typecheck function uses any
export function isKnife(obj: any): obj is Knife {
  return Object.values(Knife).includes(obj);
}
