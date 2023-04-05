import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * This function sets up Swagger documentation for a mobile marketplace API.
 * @param app - The Express.js application instance that the Swagger documentation will be added to.
 */
export function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Mobile Marketplace API documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}
