import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CompetitionsController } from './competitions.controller';
import { CompetitionsService } from './competitions.service';

@Module({
    imports: [PrismaModule],
    controllers: [CompetitionsController],
    providers: [CompetitionsService],
    exports: [CompetitionsService],
})
export class CompetitionsModule { } 