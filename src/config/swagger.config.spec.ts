import { Test, TestingModule } from '@nestjs/testing';
import { setupSwagger } from '@config/swagger.config';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

describe('Swagger', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // ...
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('setupSwagger', () => {
    it('should setup swagger correctly', () => {
      const options = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('Mobile Marketplace API documentation')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();

      const setupSpy = jest.spyOn(SwaggerModule, 'setup');

      setupSwagger(app);

      expect(setupSpy).toHaveBeenCalledWith(
        'docs',
        app,
        SwaggerModule.createDocument(app, options),
      );
    });
  });
});
