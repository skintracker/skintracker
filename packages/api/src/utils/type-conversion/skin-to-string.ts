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
  const itemString =
    isGloves(skin.item) || isKnife(skin.item) ? `★ ${skin.item}` : skin.item;
  const prefix =
    skin.category !== STSkinCategory.Normal ? `${skin.category} ` : "";
  return `${prefix}${itemString} | ${skin.name}${
    skin.phase && includePhase ? ` Phase ${skin.phase}` : ""
  } (${skin.exterior})`;
}
