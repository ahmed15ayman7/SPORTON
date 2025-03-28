import { PartialType } from '@nestjs/swagger';
import { CreateScoutingReportDto } from './create-scouting-report.dto';

export class UpdateScoutingReportDto extends PartialType(CreateScoutingReportDto) { } 