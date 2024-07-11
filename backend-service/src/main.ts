import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { Constant } from "./constants/constant";

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(AppModule, {
      abortOnError: true,
      cors: true,
    });

  await app.listen(Constant.PORT, async () => {
    console.log(`Server is listening on port ${Constant.PORT}`);
  });
}
bootstrap();
