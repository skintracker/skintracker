import { isGloves, isKnife } from "@/utils/type-guards";
import {
  Gloves,
  type GlovesSkins,
  Knife,
  type KnifeSkins,
  type STSkin,
  STSkinCategory,
  STSkinExterior,
  Weapon,
  type WeaponSkins,
} from "@skintracker/types/src";

type SkinItem = Gloves | Knife | Weapon;

export function stringToSkin(s: string): STSkin {
  const skin: Partial<STSkin> = {};

  const prefixAndRest = s.split("★ ");
  if (prefixAndRest.length === 1) {
    skin.item = prefixAndRest[0] as SkinItem;
  } else {
    const [prefix, rest] = prefixAndRest;
    if (prefix) {
      skin.category = prefix.trim() as STSkinCategory;
    }
    skin.item = rest as SkinItem;
  }

  const [itemAndName, exterior] = skin.item.split(" (");
  skin.exterior = exterior.slice(0, -1) as STSkinExterior;

  const [item, name] = itemAndName.split(" | ");
  skin.item = item as SkinItem;
  skin.name = name as GlovesSkins | KnifeSkins | WeaponSkins;

  if (isGloves(skin.item)) {
    return {
      item: skin.item,
      name: skin.name,
      exterior: skin.exterior,
      category: skin.category || STSkinCategory.Normal,
    } as STSkin;
  }
  if (isKnife(skin.item)) {
    return {
      item: skin.item,
      name: skin.name,
      exterior: skin.exterior,
      category: skin.category || STSkinCategory.Normal,
    } as STSkin;
  }
  return {
    item: skin.item,
    name: skin.name,
    exterior: skin.exterior,
    category: skin.category || STSkinCategory.Normal,
  } as STSkin;
}
