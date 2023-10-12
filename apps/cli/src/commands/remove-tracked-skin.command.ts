import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { Command, CommandRunner, InquirerService } from 'nest-commander';

import { skinToString, stringToSkin } from '@skintracker/sdk/functions';
import { SettingsService } from '../services/settings.service';

@Command({
  name: 'remove-tracked-skin',
  description: 'Remove a skin from the list of tracked skins',
  aliases: ['rm'],
  options: { isDefault: false },
})
export class RemoveTrackedSkinCommand extends CommandRunner {
  constructor(
    @OgmaLogger(RemoveTrackedSkinCommand) private readonly logger: OgmaService,
    private readonly inquirer: InquirerService,
    private settingsService: SettingsService,
  ) {
    super();
  }

  async run(): Promise<void> {
    const answers = await this.inquirer.inquirer.prompt<{
      skin: string;
    }>([
      {
        type: 'list',
        name: 'skin',
        message: 'Which skin would you like to remove?',
        choices: this.settingsService.getSettings().trackedSkins.map(skinToString),
      },
    ]);
    const skin = stringToSkin(answers.skin);
    this.logger.verbose(`Converted to skin: ${JSON.stringify(skin)}`);
    this.settingsService.removeTrackedSkin(skin);
    this.logger.verbose(`Removed ${answers.skin} from tracked skins`);
  }
}
