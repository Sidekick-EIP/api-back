import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as multer from "multer";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const limits = {
    fileSize: 1024 * 1024 * 10,
  };
  const multerMiddleware = multer({ limits });
  app.use(multerMiddleware.any());
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
