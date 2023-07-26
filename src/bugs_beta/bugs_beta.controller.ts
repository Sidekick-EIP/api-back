import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { BugsBetaService } from './bugs_beta.service';
import { BugsBetaDto } from './dto/bugs_beta.dto';
import { UpdateBugsBetaDto } from './dto/update.dto';

@Controller('bugs-beta')
export class BugsBetaController {
	constructor(private bugsBetaService: BugsBetaService) { }

    @Post("/")
    addBugsBeta(@Request() req: any, @Body() dto: BugsBetaDto) {
      return this.bugsBetaService.add(dto, req.user.email);
    }

    @Put("/:id")
    modifyBugsBeta(@Param('id') id: string, @Body() dto: UpdateBugsBetaDto) {
      return this.bugsBetaService.update(dto, id);
    }

    @Delete("/:id")
    removeBugsBeta(@Param('id') id: string) {
      return this.bugsBetaService.delete(id);
    }

    @Get("/")
    getAll() {
      return this.bugsBetaService.getAll();
    }
	
	@Get("/findByPage")
	getMealsForOneDay(@Query('page') page: string) {
	  return this.bugsBetaService.getByPage(page);
	}

	@Get("/:id")
    getById(@Param('id') id: string) {
      return this.bugsBetaService.getById(id);
    }
}
