import { Question, QuestionSet } from 'nest-commander';
import { Market } from '@skintracker/sdk/types';

@QuestionSet({ name: 'add-market-login-questions' })
export class AddMarketLoginQuestions {
  @Question({
    type: 'list',
    name: 'market',
    message: 'Which market do you want to add a login for?',
    choices: Object.values(Market),
  })
  parseMarket(market: string): Market {
    return market as Market;
  }

  @Question({
    when: (answers) => answers.market === Market.BitSkins,
    type: 'input',
    name: 'secret',
    message: 'What is your 2FA secret (given to you during Secure Access Setup)?',
  })
  parseSecret(secret: string): string {
    return secret;
  }

  @Question({
    when: (answers) => answers.market === Market.BitSkins,
    type: 'input',
    name: 'apiKey',
    message: 'What is your API key (given to you in Account Settings > API Key)?',
  })
  parseApiKey(apiKey: string): string {
    return apiKey;
  }

  @Question({
    when: (answers) => answers.market === Market.DMarket,
    type: 'input',
    name: 'publicKey',
    message: 'What is your public key (given to you in Account Settings > Trading API)?',
  })
  parsePublicKey(publicKey: string): string {
    return publicKey;
  }

  @Question({
    when: (answers) => answers.market === Market.DMarket,
    type: 'input',
    name: 'secretKey',
    message: 'What is your secret key (given to you in Account Settings > Trading API)?',
  })
  parseSecretKey(secretKey: string): string {
    return secretKey;
  }

  @Question({
    when: (answers) => answers.market === Market.Skinport,
    type: 'input',
    name: 'clientId',
    message: 'What is your Client ID (given to you in Skinport Settings)?',
  })
  parseClientId(clientId: string): string {
    return clientId;
  }

  @Question({
    when: (answers) => answers.market === Market.Skinport,
    type: 'input',
    name: 'clientSecret',
    message: 'What is your Client Secret (given to you in Skinport Settings)?',
  })
  parseClientSecret(clientSecret: string): string {
    return clientSecret;
  }
}
