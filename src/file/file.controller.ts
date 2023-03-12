import { Controller, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../common/decorators';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {
    this.fileService = fileService;
  }

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [
    ]
  })) file: Express.Multer.File) {
    return this.fileService.uploadPublicFile(file);
  }
}
