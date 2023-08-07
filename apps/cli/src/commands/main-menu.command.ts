import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { Command, CommandRunner } from 'nest-commander';
import { terminal } from 'terminal-kit';

import { ListTrackedSkinsCommand } from './list-tracked-skins.command';
import { AddTrackedSkinCommand } from './add-tracked-skin.command';
import { AddMarketLoginCommand } from './add-market-login.command';
import { RemoveTrackedSkinCommand } from './remove-tracked-skin.command';

@Command({
  name: 'main-menu',
  description: 'Main menu for Skintracker',
  aliases: ['m', 'menu'],
  options: { isDefault: true },
})
export class MainMenuCommand extends CommandRunner {
  constructor(
    @OgmaLogger(MainMenuCommand) private readonly logger: OgmaService,
    private readonly listTrackedSkinsCommand: ListTrackedSkinsCommand,
    private readonly addTrackedSkinCommand: AddTrackedSkinCommand,
    private readonly addMarketLoginCommand: AddMarketLoginCommand,
    private readonly removeTrackedSkinCommand: RemoveTrackedSkinCommand,
  ) {
    super();
  }

  async run(): Promise<void> {
    // terminal.eraseDisplayAbove();
    terminal('Welcome to Skintracker!');
    const { promise } = terminal.singleColumnMenu([
      'List all tracked skins',
      'Add tracked skin',
      'Add market login',
      'Remove tracked skin',
      'Exit',
    ]);
    const response = await promise;
    switch (response.selectedIndex) {
      case 0:
        await this.listTrackedSkinsCommand.run();
        break;
      case 1:
        await this.addTrackedSkinCommand.run();
        break;
      case 2:
        await this.addMarketLoginCommand.run();
        break;
      case 3:
        await this.removeTrackedSkinCommand.run();
        break;
      default:
        process.exit(0);
    }
  }
}
