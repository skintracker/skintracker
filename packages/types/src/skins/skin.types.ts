import { Gloves, type GlovesSkins } from "./gloves";
import { Knife, type KnifeSkins } from "./knives";
import { Weapon, type WeaponSkins } from "./weapons";

export enum STSkinExterior {
	FN = "Factory New",
	MW = "Minimal Wear",
	FT = "Field-Tested",
	WW = "Well-Worn",
	BS = "Battle-Scarred",
}

export enum STSkinCategory {
	Normal = "Normal",
	StatTrak = "StatTrak™",
	Souvenir = "Souvenir",
}

export type STSkinBase = {
	exterior: STSkinExterior;
	category: STSkinCategory;
};

export type STSkin =
	| ({
			item: Gloves;
			name: GlovesSkins;
	  } & STSkinBase)
	| ({
			item: Knife;
			name: KnifeSkins;
	  } & STSkinBase)
	| ({
			item: Weapon;
			name: WeaponSkins;
	  } & STSkinBase);
