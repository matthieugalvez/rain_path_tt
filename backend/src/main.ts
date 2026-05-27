import { NestFactory } from '@nestjs/core';
import { HelloModule } from './hello/hello.module';

async function bootstrap() {
  const app = await NestFactory.create(HelloModule);

  app.enableCors({
	  origin: 'http://localhost:5173',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
