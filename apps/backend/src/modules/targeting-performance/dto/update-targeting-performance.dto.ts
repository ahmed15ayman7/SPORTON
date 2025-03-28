import { PartialType } from '@nestjs/swagger';
import { CreateTargetingPerformanceDto } from './create-targeting-performance.dto';

export class UpdateTargetingPerformanceDto extends PartialType(CreateTargetingPerformanceDto) { } 