import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EventImagesController } from './event-images.controller';
import { EventImagesService } from './event-images.service';

@Module({
    imports: [PrismaModule],
    controllers: [EventImagesController],
    providers: [EventImagesService],
    exports: [EventImagesService],
})
export class EventImagesModule { } 