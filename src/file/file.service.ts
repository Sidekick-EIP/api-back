import { Injectable } from "@nestjs/common";
import { S3 } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FileService {
  private S3: S3;

  constructor(private configService: ConfigService) {
    this.S3 = new S3({
      region: this.configService.get("AWS_REGION"),
      credentials: {
        accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
        secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
      },
    });
  }

  async uploadPublicFile(file: Express.Multer.File) {
    try {
      const key = `${uuid()}.${file.originalname.split(".").pop()}`;
      await this.S3.putObject({
        Bucket: this.configService.get("AWS_BUCKET_NAME"),
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      });
      return `https://${this.configService.get("AWS_BUCKET_NAME")}.s3.${this.configService.get("AWS_REGION")}.amazonaws.com/${key}`;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
