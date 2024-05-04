import {
  AK47Skins,
  STSkin,
  STSkinCategory,
  STSkinExterior,
  Weapon,
} from "@skintracker/types/src";

export const INDEXED_SKINS_WITH_WEIGHTS: [STSkin, number][] = [
  [
    {
      item: Weapon.AK47,
      name: AK47Skins.AquamarineRevenge,
      category: STSkinCategory.Normal,
      exterior: STSkinExterior.FN,
    },
    1,
  ],
];
