import { WeaponHeavySkins } from "./heavy";
import { WeaponPistolSkins } from "./pistols";
import { WeaponRifleSkins } from "./rifles";
import { WeaponSMGSkins } from "./smgs";

export enum Weapon {
  AK47 = "AK-47",
  AUG = "AUG",
  AWP = "AWP",
  CZ75Auto = "CZ75-Auto",
  DesertEagle = "Desert Eagle",
  DualBerettas = "Dual Berettas",
  FAMAS = "FAMAS",
  FiveSeven = "Five-SeveN",
  G3SG1 = "G3SG1",
  GalilAR = "Galil AR",
  Glock18 = "Glock-18",
  M249 = "M249",
  M4A1S = "M4A1-S",
  M4A4 = "M4A4",
  MAC10 = "MAC-10",
  MAG7 = "MAG-7",
  MP5SD = "MP5-SD",
  MP7 = "MP7",
  MP9 = "MP9",
  Negev = "Negev",
  Nova = "Nova",
  P2000 = "P2000",
  P250 = "P250",
  P90 = "P90",
  PPBizon = "PP-Bizon",
  R8Revolver = "R8 Revolver",
  SawedOff = "Sawed-Off",
  SCAR20 = "SCAR-20",
  SG553 = "SG 553",
  SSG08 = "SSG 08",
  Tec9 = "Tec-9",
  UMP45 = "UMP-45",
  USP = "USP-S",
  XM1014 = "XM1014",
}

export type WeaponSkins =
  | WeaponHeavySkins
  | WeaponPistolSkins
  | WeaponRifleSkins
  | WeaponSMGSkins;
