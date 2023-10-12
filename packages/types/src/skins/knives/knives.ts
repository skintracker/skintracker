import { BayonetSkins } from './bayonet.skins';
import { BowieKnifeSkins } from './bowie.skins';
import { ButterflyKnifeSkins } from './butterfly.skins';
import { ClassicKnifeSkins } from './classic.skins';
import { FalchionKnifeSkins } from './falchion.skins';
import { FlipKnifeSkins } from './flip.skins';
import { GutKnifeSkins } from './gut.skins';
import { HuntsmanKnifeSkins } from './huntsman.skins';
import { KarambitSkins } from './karambit.skins';
import { M9BayonetSkins } from './m9-bayonet.skins';
import { NavajaKnifeSkins } from './navaja.skins';
import { NomadKnifeSkins } from './nomad.skins';
import { ParacordKnifeSkins } from './paracord.skins';
import { ShadowDaggersSkins } from './shadow-daggers.skins';
import { SkeletonKnifeSkins } from './skeleton.skins';
import { StilettoKnifeSkins } from './stiletto.skins';
import { UrsusKnifeSkins } from './ursus.skins';

export enum Knife {
  Bayonet = 'Bayonet',
  BowieKnife = 'Bowie Knife',
  ButterflyKnife = 'Butterfly Knife',
  ClassicKnife = 'Classic Knife',
  FalchionKnife = 'Falchion Knife',
  FlipKnife = 'Flip Knife',
  GutKnife = 'Gut Knife',
  HuntsmanKnife = 'Huntsman Knife',
  Karambit = 'Karambit',
  M9Bayonet = 'M9 Bayonet',
  NavajaKnife = 'Navaja Knife',
  NomadKnife = 'Nomad Knife',
  ParacordKnife = 'Paracord Knife',
  ShadowDaggers = 'Shadow Daggers',
  SkeletonKnife = 'Skeleton Knife',
  StilettoKnife = 'Stiletto Knife',
  UrsusKnife = 'Ursus Knife',
}

export type KnifeSkins =
  | BayonetSkins
  | BowieKnifeSkins
  | ButterflyKnifeSkins
  | ClassicKnifeSkins
  | FalchionKnifeSkins
  | FlipKnifeSkins
  | GutKnifeSkins
  | HuntsmanKnifeSkins
  | KarambitSkins
  | M9BayonetSkins
  | NavajaKnifeSkins
  | NomadKnifeSkins
  | ParacordKnifeSkins
  | ShadowDaggersSkins
  | SkeletonKnifeSkins
  | StilettoKnifeSkins
  | UrsusKnifeSkins;
