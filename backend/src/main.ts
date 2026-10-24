import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnprocessableEntityException, ValidationPipe, VersioningType } from '@nestjs/common';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.map((err) => ({
          field: err.property,
          errors: Object.values(err.constraints ?? {}),
        }));
        return new UnprocessableEntityException({
          message: 'Unexceptable Entity',
          statusCode: 422,
          errors: formattedErrors,
        });
      },
    }),
  );
  app.enableCors({
    origin: (process.env.API_ORIGINS ?? 'http://localhost:3000')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  setupSwagger(app);
  await app.listen(process.env.API_PORT ?? 8000);
}
bootstrap();
