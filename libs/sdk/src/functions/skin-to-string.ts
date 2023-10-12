import { Skin, SkinCategory } from '../types/skins/skin.types';
import { isGloves } from './is-gloves';
import { isKnife } from './is-knife';

export function skinToString(skin: Skin) {
  const itemString = isGloves(skin.item) || isKnife(skin.item) ? `★ ${skin.item}` : skin.item;
  const prefix = skin.category !== SkinCategory.Normal ? `${skin.category} ` : '';
  return `${prefix}${itemString} | ${skin.name} (${skin.exterior})`;
}
