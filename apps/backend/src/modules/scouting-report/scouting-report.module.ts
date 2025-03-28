import { Module } from '@nestjs/common';
import { ScoutingReportService } from './scouting-report.service';
import { ScoutingReportController } from './scouting-report.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ScoutingReportController],
    providers: [ScoutingReportService],
    exports: [ScoutingReportService],
})
export class ScoutingReportModule { } 