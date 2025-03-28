import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [FacilityController],
    providers: [FacilityService],
    exports: [FacilityService],
})
export class FacilityModule { } 