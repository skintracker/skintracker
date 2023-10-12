import { Gloves, GlovesSkins } from './gloves';
import { Knife, KnifeSkins } from './knives';
import { Weapon, WeaponSkins } from './weapons';

export enum SkinExterior {
  FN = 'Factory New',
  MW = 'Minimal Wear',
  FT = 'Field-Tested',
  WW = 'Well-Worn',
  BS = 'Battle-Scarred',
}

export enum SkinCategory {
  Normal = 'Normal',
  StatTrak = 'StatTrak™',
  Souvenir = 'Souvenir',
}

export type SkinBase = {
  exterior: SkinExterior;
  category: SkinCategory;
};

export type Skin =
  | ({
      item: Gloves;
      name: GlovesSkins;
    } & SkinBase)
  | ({
      item: Knife;
      name: KnifeSkins;
    } & SkinBase)
  | ({
      item: Weapon;
      name: WeaponSkins;
    } & SkinBase);
