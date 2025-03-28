import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SponsorshipsController } from './sponsorships.controller';
import { SponsorshipsService } from './sponsorships.service';

@Module({
    imports: [PrismaModule],
    controllers: [SponsorshipsController],
    providers: [SponsorshipsService],
    exports: [SponsorshipsService],
})
export class SponsorshipsModule { } 