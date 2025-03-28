import { PartialType } from '@nestjs/swagger';
import { CreateOptimizationLogDto } from './create-optimization-log.dto';

export class UpdateOptimizationLogDto extends PartialType(CreateOptimizationLogDto) { } 