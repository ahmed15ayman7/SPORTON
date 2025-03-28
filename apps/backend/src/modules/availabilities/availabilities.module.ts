import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AvailabilitiesController } from './availabilities.controller';
import { AvailabilitiesService } from './availabilities.service';

@Module({
    imports: [PrismaModule],
    controllers: [AvailabilitiesController],
    providers: [AvailabilitiesService],
    exports: [AvailabilitiesService],
})
export class AvailabilitiesModule { } 