import { BloodhoundGlovesSkins } from './bloodhound.skins';
import { BrokenFangGlovesSkins } from './broken-fang.skins';
import { DriverGlovesSkins } from './driver.skins';
import { HandWrapsSkins } from './hand-wraps.skins';
import { HydraGlovesSkins } from './hydra.skins';
import { MotoGlovesSkins } from './moto.skins';
import { SpecialistGlovesSkins } from './specialist.skins';
import { SportGlovesSkins } from './sport.skins';

export enum Gloves {
  Bloodhound = 'Bloodhound Gloves',
  BrokenFang = 'Broken Fang Gloves',
  Driver = 'Driver Gloves',
  HandWraps = 'Hand Wraps',
  Hydra = 'Hydra Gloves',
  Moto = 'Moto Gloves',
  Specialist = 'Specialist Gloves',
  Sport = 'Sport Gloves',
}

export type GlovesSkins =
  | BloodhoundGlovesSkins
  | BrokenFangGlovesSkins
  | DriverGlovesSkins
  | HandWrapsSkins
  | HydraGlovesSkins
  | MotoGlovesSkins
  | SpecialistGlovesSkins
  | SportGlovesSkins;
