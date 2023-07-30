import { OgmaService } from '@ogma/nestjs-module';
import { AppModule } from './app.module';
import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  const app = await CommandFactory.createWithoutRunning(AppModule, undefined);
  app.useLogger(app.get(OgmaService));
  await CommandFactory.runApplication(app);
}
bootstrap();
