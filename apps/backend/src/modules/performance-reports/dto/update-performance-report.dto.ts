import { PartialType } from '@nestjs/swagger';
import { CreatePerformanceReportDto } from './create-performance-report.dto';

export class UpdatePerformanceReportDto extends PartialType(CreatePerformanceReportDto) { } 