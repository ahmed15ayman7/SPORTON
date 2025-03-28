import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { OptimizationLogController } from './optimization-log.controller';
import { OptimizationLogService } from './optimization-log.service';

@Module({
    imports: [PrismaModule],
    controllers: [OptimizationLogController],
    providers: [OptimizationLogService],
    exports: [OptimizationLogService],
})
export class OptimizationLogModule { } 