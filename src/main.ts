import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { setupSwagger } from '@config/swagger.config';
import { ConfigService } from '@nestjs/config';

/**
 * This function sets up a NestJS application with a global prefix, Swagger documentation, and listens
 * for incoming requests on a specified port.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  setupSwagger(app);
  app.setGlobalPrefix('api');
  const port = configService.get<number>('app.port');
  await app.listen(port);
}
bootstrap();
