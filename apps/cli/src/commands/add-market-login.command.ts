import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { Command, CommandRunner, InquirerService } from 'nest-commander';

import { BuffMarketService } from '@skintracker/sdk/services/market';
import { Market } from '@skintracker/sdk/types/market';
import { SettingsService } from '../services/settings.service';

@Command({
  name: 'add-market-login',
  description: 'Add a login token for a market',
  aliases: ['aml'],
  options: { isDefault: false },
})
export class AddMarketLoginCommand extends CommandRunner {
  constructor(
    @OgmaLogger(AddMarketLoginCommand) private readonly logger: OgmaService,
    private readonly inquirer: InquirerService,
    private settingsService: SettingsService,
    private buffMarketService: BuffMarketService,
  ) {
    super();
  }

  async run(): Promise<void> {
    const answers = await this.inquirer.ask<{
      market: Market;
      publicKey?: string;
      secretKey?: string;
      clientId?: string;
      clientSecret?: string;
      apiKey?: string;
      secret?: string;
    }>('add-market-login-questions', undefined);
    const token = await (async () => {
      switch (answers.market) {
        case Market.BitSkins: {
          return JSON.stringify({
            apiKey: answers.apiKey,
            secret: answers.secret,
          });
        }
        case Market.BUFFMarket: {
          return await this.buffMarketService.loginAndFetchCookie();
        }
        case Market.DMarket: {
          return JSON.stringify({
            publicKey: answers.publicKey,
            secretKey: answers.secretKey,
          });
        }
        case Market.Skinport: {
          return JSON.stringify({
            clientId: answers.clientId,
            clientSecret: answers.clientSecret,
          });
        }
      }
    })();
    this.settingsService.addMarketLoginToken(answers.market, token);
    process.exit(0);
  }
}
