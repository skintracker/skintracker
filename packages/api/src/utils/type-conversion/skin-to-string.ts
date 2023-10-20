import { isGloves, isKnife } from "@/utils/type-guards";
import { type STSkin, STSkinCategory } from "@skintracker/types/src";

export function skinToString(skin: STSkin): string {
	const itemString =
		isGloves(skin.item) || isKnife(skin.item) ? `★ ${skin.item}` : skin.item;
	const prefix =
		skin.category !== STSkinCategory.Normal ? `${skin.category} ` : "";
	return `${prefix}${itemString} | ${skin.name} (${skin.exterior})`;
}
