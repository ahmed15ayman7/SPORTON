import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EndorsementsController } from './endorsements.controller';
import { EndorsementsService } from './endorsements.service';

@Module({
    imports: [PrismaModule],
    controllers: [EndorsementsController],
    providers: [EndorsementsService],
    exports: [EndorsementsService],
})
export class EndorsementsModule { } 