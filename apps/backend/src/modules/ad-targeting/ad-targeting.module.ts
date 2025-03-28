import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AdTargetingController } from './ad-targeting.controller';
import { AdTargetingService } from './ad-targeting.service';

@Module({
    imports: [PrismaModule],
    controllers: [AdTargetingController],
    providers: [AdTargetingService],
    exports: [AdTargetingService],
})
export class AdTargetingModule { } 