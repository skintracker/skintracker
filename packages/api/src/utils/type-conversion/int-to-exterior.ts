import { STSkinExterior } from "@skintracker/types/src";

export function intToExterior(num: number) {
	switch (num) {
		case 0:
			return STSkinExterior.FN;
		case 1:
			return STSkinExterior.MW;
		case 2:
			return STSkinExterior.FT;
		case 3:
			return STSkinExterior.WW;
		case 4:
			return STSkinExterior.BS;
		default:
			throw new Error(`Invalid exterior number: ${num}`);
	}
}
