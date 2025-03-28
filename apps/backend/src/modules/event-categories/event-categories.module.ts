import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EventCategoriesController } from './event-categories.controller';
import { EventCategoriesService } from './event-categories.service';

@Module({
    imports: [PrismaModule],
    controllers: [EventCategoriesController],
    providers: [EventCategoriesService],
    exports: [EventCategoriesService],
})
export class EventCategoriesModule { } 