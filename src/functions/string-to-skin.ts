import { Skin, SkinCategory, SkinExterior } from '../types/skins';
import { Gloves, GlovesSkins } from '../types/skins/gloves';
import { Knife, KnifeSkins } from '../types/skins/knives';
import { Weapon, WeaponSkins } from '../types/skins/weapons';
import { isGloves } from './is-gloves';
import { isKnife } from './is-knife';

type SkinItem = Gloves | Knife | Weapon;

export function stringToSkin(s: string): Skin {
  const skin: Partial<Skin> = {};

  const prefixAndRest = s.split('★ ');
  if (prefixAndRest.length === 1) {
    skin.item = prefixAndRest[0] as SkinItem;
  } else {
    const [prefix, rest] = prefixAndRest;
    if (prefix) {
      skin.category = prefix.trim() as SkinCategory;
    }
    skin.item = rest as SkinItem;
  }

  const [itemAndName, exterior] = skin.item.split(' (');
  skin.exterior = exterior.slice(0, -1) as SkinExterior;

  const [item, name] = itemAndName.split(' | ');
  skin.item = item as SkinItem;
  skin.name = name as GlovesSkins | KnifeSkins | WeaponSkins;

  if (isGloves(skin.item)) {
    return {
      item: skin.item,
      name: skin.name,
      exterior: skin.exterior,
      category: skin.category || SkinCategory.Normal,
    } as Skin;
  } else if (isKnife(skin.item)) {
    return {
      item: skin.item,
      name: skin.name,
      exterior: skin.exterior,
      category: skin.category || SkinCategory.Normal,
    } as Skin;
  } else {
    return {
      item: skin.item,
      name: skin.name,
      exterior: skin.exterior,
      category: skin.category || SkinCategory.Normal,
    } as Skin;
  }
}
