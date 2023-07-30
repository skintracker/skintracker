import { Question, QuestionSet } from 'nest-commander';

import { SkinExterior } from '../types/skins';

// Glove skins
import {
  BloodhoundGlovesSkins,
  BrokenFangGlovesSkins,
  DriverGlovesSkins,
  Gloves,
  HandWrapsSkins,
  HydraGlovesSkins,
  MotoGlovesSkins,
  SpecialistGlovesSkins,
  SportGlovesSkins,
} from '../types/skins/gloves';

// Knife skins
import {
  BayonetSkins,
  BowieKnifeSkins,
  ButterflyKnifeSkins,
  ClassicKnifeSkins,
  FalchionKnifeSkins,
  FlipKnifeSkins,
  GutKnifeSkins,
  HuntsmanKnifeSkins,
  KarambitSkins,
  Knife,
  M9BayonetSkins,
  NavajaKnifeSkins,
  NomadKnifeSkins,
  ParacordKnifeSkins,
  SkeletonKnifeSkins,
  StilettoKnifeSkins,
  UrsusKnifeSkins,
} from '../types/skins/knives';

// Weapon skins
import {
  AK47Skins,
  AUGSkins,
  AWPSkins,
  CZ75AutoSkins,
  DesertEagleSkins,
  DualBerettasSkins,
  FAMASSkins,
  FiveSevenSkins,
  G3SG1Skins,
  GalilSkins,
  Glock18Skins,
  M249Skins,
  M4A1SSkins,
  M4A4Skins,
  MAC10Skins,
  MAG7Skins,
  MP5Skins,
  MP7Skins,
  MP9Skins,
  NegevSkins,
  NovaSkins,
  P2000Skins,
  P250Skins,
  P90Skins,
  PPBizonSkins,
  R8RevolverSkins,
  SCAR20Skins,
  SG553Skins,
  SSG08Skins,
  SawedOffSkins,
  Tec9Skins,
  UMP45Skins,
  USPSSkins,
  Weapon,
  XM1014Skins,
} from '../types/skins/weapons';

@QuestionSet({ name: 'add-tracked-skin-questions' })
export class AddTrackedSkinQuestions {
  @Question({
    message: 'Which item do you want to track?',
    name: 'item',
    type: 'list',
    choices: ['Gloves', 'Knife', 'Weapon'],
  })
  parseChoice(item: string): string {
    return item;
  }

  @Question({
    when: (answers) => answers.item === 'Gloves',
    message: 'Which gloves do you want to track?',
    name: 'gloves',
    type: 'list',
    choices: Object.values(Gloves),
  })
  parseGloves(gloves: string): Gloves {
    return gloves as Gloves;
  }

  @Question({
    when: (answers) => answers.gloves === 'Bloodhound Gloves',
    message: 'Which Bloodhound gloves skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(BloodhoundGlovesSkins),
  })
  parseBloodhound(name: string): BloodhoundGlovesSkins {
    return name as BloodhoundGlovesSkins;
  }

  @Question({
    when: (answers) => answers.gloves === 'Broken Fang Gloves',
    message: 'Which Broken Fang gloves skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(BrokenFangGlovesSkins),
  })
  parseBrokenFang(name: string): BrokenFangGlovesSkins {
    return name as BrokenFangGlovesSkins;
  }

  @Question({
    when: (answers) => answers.gloves === 'Driver Gloves',
    message: 'Which Driver gloves skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(DriverGlovesSkins),
  })
  parseDriver(name: string): DriverGlovesSkins {
    return name as DriverGlovesSkins;
  }

  @Question({
    when: (answers) => answers.gloves === 'Hand Wraps',
    message: 'Which Hand Wraps gloves skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(HandWrapsSkins),
  })
  parseHandWraps(name: string): HandWrapsSkins {
    return name as HandWrapsSkins;
  }

  @Question({
    when: (answers) => answers.gloves === 'Hydra Gloves',
    message: 'Which Hydra gloves skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(HydraGlovesSkins),
  })
  parseHydra(name: string): HydraGlovesSkins {
    return name as HydraGlovesSkins;
  }

  @Question({
    when: (answers) => answers.gloves === 'Moto Gloves',
    message: 'Which Moto gloves skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(MotoGlovesSkins),
  })
  parseMoto(name: string): MotoGlovesSkins {
    return name as MotoGlovesSkins;
  }

  @Question({
    when: (answers) => answers.gloves === 'Specialist Gloves',
    message: 'Which Specialist gloves skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(SpecialistGlovesSkins),
  })
  parseSpecialist(name: string): SpecialistGlovesSkins {
    return name as SpecialistGlovesSkins;
  }

  @Question({
    when: (answers) => answers.gloves === 'Sport Gloves',
    message: 'Which Sport gloves skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(SportGlovesSkins),
  })
  parseSport(name: string): SportGlovesSkins {
    return name as SportGlovesSkins;
  }

  @Question({
    when: (answers) => answers.item === 'Knife',
    message: 'Which knife do you want to track?',
    name: 'knife',
    type: 'list',
    choices: Object.values(Knife),
  })
  parseKnife(knife: string): Knife {
    return knife as Knife;
  }

  @Question({
    when: (answers) => answers.knife === 'Bayonet',
    message: 'Which Bayonet skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(BayonetSkins),
  })
  parseBayonet(name: string): BayonetSkins {
    return name as BayonetSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Bowie Knife',
    message: 'Which Bowie Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(BowieKnifeSkins),
  })
  parseBowie(name: string): BowieKnifeSkins {
    return name as BowieKnifeSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Butterfly Knife',
    message: 'Which Butterfly Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(ButterflyKnifeSkins),
  })
  parseButterfly(name: string): ButterflyKnifeSkins {
    return name as ButterflyKnifeSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Classic Knife',
    message: 'Which Classic Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(ClassicKnifeSkins),
  })
  parseClassic(name: string): ClassicKnifeSkins {
    return name as ClassicKnifeSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Falchion Knife',
    message: 'Which Falchion Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(FalchionKnifeSkins),
  })
  parseFalchion(name: string): FalchionKnifeSkins {
    return name as FalchionKnifeSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Flip Knife',
    message: 'Which Flip Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(FlipKnifeSkins),
  })
  parseFlip(name: string): FlipKnifeSkins {
    return name as FlipKnifeSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Gut Knife',
    message: 'Which Gut Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(GutKnifeSkins),
  })
  parseGut(name: string): GutKnifeSkins {
    return name as GutKnifeSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Huntsman Knife',
    message: 'Which Huntsman Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(HuntsmanKnifeSkins),
  })
  parseHuntsman(name: string): HuntsmanKnifeSkins {
    return name as HuntsmanKnifeSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Karambit',
    message: 'Which Karambit skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(KarambitSkins),
  })
  parseKarambit(name: string): KarambitSkins {
    return name as KarambitSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'M9 Bayonet',
    message: 'Which M9 Bayonet skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(M9BayonetSkins),
  })
  parseM9(name: string): M9BayonetSkins {
    return name as M9BayonetSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Navaja Knife',
    message: 'Which Navaja Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(NavajaKnifeSkins),
  })
  parseNavaja(name: string): NavajaKnifeSkins {
    return name as NavajaKnifeSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Nomad Knife',
    message: 'Which Nomad Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(NomadKnifeSkins),
  })
  parseNomad(name: string): NomadKnifeSkins {
    return name as NomadKnifeSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Paracord Knife',
    message: 'Which Paracord Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(ParacordKnifeSkins),
  })
  parseParacord(name: string): ParacordKnifeSkins {
    return name as ParacordKnifeSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Skeleton Knife',
    message: 'Which Skeleton Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(SkeletonKnifeSkins),
  })
  parseSkeleton(name: string): SkeletonKnifeSkins {
    return name as SkeletonKnifeSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Stiletto Knife',
    message: 'Which Stiletto Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(StilettoKnifeSkins),
  })
  parseStiletto(name: string): StilettoKnifeSkins {
    return name as StilettoKnifeSkins;
  }

  @Question({
    when: (answers) => answers.knife === 'Ursus Knife',
    message: 'Which Ursus Knife skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(UrsusKnifeSkins),
  })
  parseUrsus(name: string): UrsusKnifeSkins {
    return name as UrsusKnifeSkins;
  }

  @Question({
    when: (answers) => answers.item === 'Weapon',
    message: 'Which weapon do you want to track?',
    name: 'weapon',
    type: 'list',
    choices: Object.values(Weapon),
  })
  parseWeapon(weapon: string): Weapon {
    return weapon as Weapon;
  }

  @Question({
    when: (answers) => answers.weapon === 'M249',
    message: 'Which M249 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(M249Skins),
  })
  parseM249(name: string): M249Skins {
    return name as M249Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'MAG-7',
    message: 'Which MAG-7 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(MAG7Skins),
  })
  parseMAG7(name: string): MAG7Skins {
    return name as MAG7Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'Negev',
    message: 'Which Negev skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(NegevSkins),
  })
  parseNegev(name: string): NegevSkins {
    return name as NegevSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'Nova',
    message: 'Which Nova skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(NovaSkins),
  })
  parseNova(name: string): NovaSkins {
    return name as NovaSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'Sawed-Off',
    message: 'Which Sawed-Off skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(SawedOffSkins),
  })
  parseSawedOff(name: string): SawedOffSkins {
    return name as SawedOffSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'XM1014',
    message: 'Which XM1014 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(XM1014Skins),
  })
  parseXM1014(name: string): XM1014Skins {
    return name as XM1014Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'CZ75-Auto',
    message: 'Which CZ75-Auto skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(CZ75AutoSkins),
  })
  parseCZ75Auto(name: string): CZ75AutoSkins {
    return name as CZ75AutoSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'Desert Eagle',
    message: 'Which Desert Eagle skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(DesertEagleSkins),
  })
  parseDesertEagle(name: string): DesertEagleSkins {
    return name as DesertEagleSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'Dual Berettas',
    message: 'Which Dual Berettas skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(DualBerettasSkins),
  })
  parseDualBerettas(name: string): DualBerettasSkins {
    return name as DualBerettasSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'Five-SeveN',
    message: 'Which Five-SeveN skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(FiveSevenSkins),
  })
  parseFiveSeveN(name: string): FiveSevenSkins {
    return name as FiveSevenSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'Glock-18',
    message: 'Which Glock-18 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(Glock18Skins),
  })
  parseGlock18(name: string): Glock18Skins {
    return name as Glock18Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'P2000',
    message: 'Which P2000 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(P2000Skins),
  })
  parseP2000(name: string): P2000Skins {
    return name as P2000Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'P250',
    message: 'Which P250 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(P250Skins),
  })
  parseP250(name: string): P250Skins {
    return name as P250Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'R8 Revolver',
    message: 'Which R8 Revolver skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(R8RevolverSkins),
  })
  parseR8Revolver(name: string): R8RevolverSkins {
    return name as R8RevolverSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'Tec-9',
    message: 'Which Tec-9 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(Tec9Skins),
  })
  parseTec9(name: string): Tec9Skins {
    return name as Tec9Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'USP-S',
    message: 'Which USP-S skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(USPSSkins),
  })
  parseUSPS(name: string): USPSSkins {
    return name as USPSSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'AK-47',
    message: 'Which AK-47 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(AK47Skins),
  })
  parseAK47(name: string): AK47Skins {
    return name as AK47Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'AUG',
    message: 'Which AUG skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(AUGSkins),
  })
  parseAUG(name: string): AUGSkins {
    return name as AUGSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'AWP',
    message: 'Which AWP skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(AWPSkins),
  })
  parseAWP(name: string): AWPSkins {
    return name as AWPSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'FAMAS',
    message: 'Which FAMAS skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(FAMASSkins),
  })
  parseFAMAS(name: string): FAMASSkins {
    return name as FAMASSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'G3SG1',
    message: 'Which G3SG1 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(G3SG1Skins),
  })
  parseG3SG1(name: string): G3SG1Skins {
    return name as G3SG1Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'Galil AR',
    message: 'Which Galil AR skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(GalilSkins),
  })
  parseGalil(name: string): GalilSkins {
    return name as GalilSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'M4A4',
    message: 'Which M4A4 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(M4A4Skins),
  })
  parseM4A4(name: string): M4A4Skins {
    return name as M4A4Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'M4A1-S',
    message: 'Which M4A1-S skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(M4A1SSkins),
  })
  parseM4A1S(name: string): M4A1SSkins {
    return name as M4A1SSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'SCAR-20',
    message: 'Which SCAR-20 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(SCAR20Skins),
  })
  parseSCAR20(name: string): SCAR20Skins {
    return name as SCAR20Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'SG 553',
    message: 'Which SG 553 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(SG553Skins),
  })
  parseSG553(name: string): SG553Skins {
    return name as SG553Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'SSG 08',
    message: 'Which SSG 08 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(SSG08Skins),
  })
  parseSSG08(name: string): SSG08Skins {
    return name as SSG08Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'MAC-10',
    message: 'Which MAC-10 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(MAC10Skins),
  })
  parseMAC10(name: string): MAC10Skins {
    return name as MAC10Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'MP5-SD',
    message: 'Which MP5-SD skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(MP5Skins),
  })
  parseMP5SD(name: string): MP5Skins {
    return name as MP5Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'MP7',
    message: 'Which MP7 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(MP7Skins),
  })
  parseMP7(name: string): MP7Skins {
    return name as MP7Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'MP9',
    message: 'Which MP9 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(MP9Skins),
  })
  parseMP9(name: string): MP9Skins {
    return name as MP9Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'P90',
    message: 'Which P90 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(P90Skins),
  })
  parseP90(name: string): P90Skins {
    return name as P90Skins;
  }

  @Question({
    when: (answers) => answers.weapon === 'PP-Bizon',
    message: 'Which PP-Bizon skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(PPBizonSkins),
  })
  parsePPBizon(name: string): PPBizonSkins {
    return name as PPBizonSkins;
  }

  @Question({
    when: (answers) => answers.weapon === 'UMP-45',
    message: 'Which UMP-45 skin do you want to track?',
    name: 'name',
    type: 'list',
    choices: Object.values(UMP45Skins),
  })
  parseUMP45(name: string): UMP45Skins {
    return name as UMP45Skins;
  }

  @Question({
    message: "What is the wear you'd like to track?",
    name: 'exterior',
    type: 'list',
    choices: Object.values(SkinExterior),
  })
  parseExterior(exterior: string): SkinExterior {
    console.log(exterior);
    return exterior as SkinExterior;
  }
}
