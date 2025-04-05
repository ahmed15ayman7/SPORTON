import { Module } from '@nestjs/common';
import { EventSponsorsController } from './event-sponsors.controller';
import { EventSponsorsService } from './event-sponsors.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [EventSponsorsController],
    providers: [EventSponsorsService],
    exports: [EventSponsorsService],
})
export class EventSponsorsModule { } 