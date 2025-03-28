import { Module } from '@nestjs/common';
import { PlayerDiscoveryService } from './player-discovery.service';
import { PlayerDiscoveryController } from './player-discovery.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [PlayerDiscoveryController],
    providers: [PlayerDiscoveryService],
    exports: [PlayerDiscoveryService],
})
export class PlayerDiscoveryModule { } 