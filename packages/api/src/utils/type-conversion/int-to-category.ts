import { STSkinCategory } from "@skintracker/types/src";

export function intToCategory(num: number): STSkinCategory {
	switch (num) {
		case 0:
			return STSkinCategory.Normal;
		case 1:
			return STSkinCategory.StatTrak;
		case 2:
			return STSkinCategory.Souvenir;
		default:
			throw new Error(`Invalid category number: ${num}`);
	}
}
