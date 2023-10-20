import { Weapon } from "@skintracker/types/src";

// biome-ignore lint/suspicious/noExplicitAny: typecheck function uses any
export function isWeapon(obj: any): obj is Weapon {
	return Object.values(Weapon).includes(obj);
}
