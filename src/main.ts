/* eslint-disable @typescript-eslint/no-var-requires */

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';

import { AppModule } from './app.module';
import SwaggerDocs from '../docs/swagger.docs';

require('dotenv').config();

async function bootstrap() {
  const { HOST = 'localhost', PORT = 3000, EXPLORER, NODE_ENV } = process.env;
  const app = await NestFactory.create(AppModule);
  if (NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle(SwaggerDocs.title)
      .setVersion(SwaggerDocs.version)
      .setDescription(SwaggerDocs.description)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document, {
      explorer: EXPLORER === 'true',
    });
  }
  await app.listen(PORT, () =>
    console.log(`Server listen on: ${HOST}:${PORT}`),
  );
}
bootstrap();
