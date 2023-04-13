import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { setupSwagger } from '@config/swagger.config';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as csurf from 'csurf';

/**
 * This function sets up a NestJS application with a global prefix, Swagger documentation, and listens
 * for incoming requests on a specified port.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors();
  app.use(csurf());
  setupSwagger(app);
  const port = configService.get<number>('app.port');
  await app.listen(port);
}
bootstrap();
