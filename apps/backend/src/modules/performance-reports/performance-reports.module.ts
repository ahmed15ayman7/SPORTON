import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PerformanceReportsController } from './performance-reports.controller';
import { PerformanceReportsService } from './performance-reports.service';

@Module({
    imports: [PrismaModule],
    controllers: [PerformanceReportsController],
    providers: [PerformanceReportsService],
    exports: [PerformanceReportsService],
})
export class PerformanceReportsModule { } 