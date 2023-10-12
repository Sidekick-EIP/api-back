import { Nutrition } from './../../node_modules/.prisma/client/index.d';
import { Module } from '@nestjs/common';
import { NutritionController } from './nutrition.controller';
import { NutritionService } from './nutrition.service';

@Module({
	providers: [NutritionService],
	controllers: [NutritionController]
})
export class NutritionModule { }
