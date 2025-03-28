import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserSegmentController } from './user-segment.controller';
import { UserSegmentService } from './user-segment.service';

@Module({
    imports: [PrismaModule],
    controllers: [UserSegmentController],
    providers: [UserSegmentService],
    exports: [UserSegmentService],
})
export class UserSegmentModule { } 