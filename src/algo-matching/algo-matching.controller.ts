import { Controller } from '@nestjs/common';
import { AlgoMatchingService } from './algo-matching.service';

@Controller('algo-matching')
export class AlgoMatchingController {
  constructor(private readonly algoMatchingService: AlgoMatchingService) {

  }
}
