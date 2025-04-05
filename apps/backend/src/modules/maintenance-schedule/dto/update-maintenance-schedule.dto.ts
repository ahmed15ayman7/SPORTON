import { PartialType } from '@nestjs/swagger';
import { CreateMaintenanceScheduleDto } from './create-maintenance-schedule.dto';

export class UpdateMaintenanceScheduleDto extends PartialType(CreateMaintenanceScheduleDto) { } 