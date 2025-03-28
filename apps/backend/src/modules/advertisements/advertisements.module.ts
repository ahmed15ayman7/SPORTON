import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AdvertisementsController } from './advertisements.controller';
import { AdvertisementsService } from './advertisements.service';

@Module({
    imports: [PrismaModule],
    controllers: [AdvertisementsController],
    providers: [AdvertisementsService],
    exports: [AdvertisementsService],
})
export class AdvertisementsModule { } 