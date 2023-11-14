import { isGloves, isKnife } from "@/utils/type-guards";
import { type STSkin, STSkinCategory } from "@skintracker/types/src";

export interface SkinToStringConfig {
  skin: STSkin;
  includePhase?: boolean;
}

export function skinToString({
  skin,
  includePhase,
}: SkinToStringConfig): string {
  const prefix =
    skin.category !== STSkinCategory.Normal ? `${skin.category} ` : "";
  const itemString =
    isGloves(skin.item) || isKnife(skin.item)
      ? `★ ${prefix}${skin.item}`
      : `${prefix}${skin.item}`;
  return `${itemString} | ${skin.name}${
    skin.phase && includePhase ? ` Phase ${skin.phase}` : ""
  } (${skin.exterior})`;
}
