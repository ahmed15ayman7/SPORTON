import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ABTestController } from './ab-test.controller';
import { ABTestService } from './ab-test.service';

@Module({
    imports: [PrismaModule],
    controllers: [ABTestController],
    providers: [ABTestService],
    exports: [ABTestService],
})
export class ABTestModule { } 