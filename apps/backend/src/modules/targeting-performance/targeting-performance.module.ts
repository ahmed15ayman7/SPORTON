import { Module } from '@nestjs/common';
import { TargetingPerformanceService } from './targeting-performance.service';
import { TargetingPerformanceController } from './targeting-performance.controller';

@Module({
    controllers: [TargetingPerformanceController],
    providers: [TargetingPerformanceService],
    exports: [TargetingPerformanceService],
})
export class TargetingPerformanceModule { }
