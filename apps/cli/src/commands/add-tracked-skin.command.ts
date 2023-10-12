import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { Command, CommandRunner, InquirerService } from 'nest-commander';

import { skinToString } from '@skintracker/sdk/functions';
import {
  Gloves,
  GlovesSkins,
  Knife,
  KnifeSkins,
  Skin,
  SkinCategory,
  SkinExterior,
  Weapon,
  WeaponSkins,
} from '@skintracker/sdk/types';
import { SettingsService } from '../services/settings.service';

@Command({
  name: 'add-tracked-skin',
  description: 'Track a skin',
  aliases: ['t', 'track'],
  options: { isDefault: false },
})
export class AddTrackedSkinCommand extends CommandRunner {
  constructor(
    @OgmaLogger(AddTrackedSkinCommand) private readonly logger: OgmaService,
    private readonly inquirer: InquirerService,
    private settingsService: SettingsService,
  ) {
    super();
  }

  async run(): Promise<void> {
    const answers = await this.inquirer.ask<{
      item: string;
      gloves?: Gloves;
      knife?: Knife;
      weapon?: Weapon;
      name?: string;
      exterior?: SkinExterior;
    }>('add-tracked-skin-questions', undefined);
    const skin: Skin = (() => {
      switch (answers.item) {
        case 'Gloves':
          return {
            item: answers.gloves as Gloves,
            name: answers.name as GlovesSkins,
            exterior: answers.exterior,
            category: SkinCategory.Normal,
          };
        case 'Knife':
          return {
            item: answers.knife as Knife,
            name: answers.name as KnifeSkins,
            exterior: answers.exterior,
            category: SkinCategory.Normal,
          };
        case 'Weapon':
          return {
            item: answers.weapon as Weapon,
            name: answers.name as WeaponSkins,
            exterior: answers.exterior,
            category: SkinCategory.Normal,
          };
      }
    })();
    this.settingsService.addTrackedSkin(skin);
    this.logger.verbose(`Tracking ${skinToString(skin)}`);
  }
}
