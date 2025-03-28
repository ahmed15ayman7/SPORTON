import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ContentScoreController } from './content-score.controller';
import { ContentScoreService } from './content-score.service';

@Module({
    imports: [PrismaModule],
    controllers: [ContentScoreController],
    providers: [ContentScoreService],
    exports: [ContentScoreService],
})
export class ContentScoreModule { } 