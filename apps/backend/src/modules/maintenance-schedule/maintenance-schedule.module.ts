import { Module } from '@nestjs/common';
import { MaintenanceScheduleService } from './maintenance-schedule.service';
import { MaintenanceScheduleController } from './maintenance-schedule.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [MaintenanceScheduleController],
    providers: [MaintenanceScheduleService],
    exports: [MaintenanceScheduleService],
})
export class MaintenanceScheduleModule { } 