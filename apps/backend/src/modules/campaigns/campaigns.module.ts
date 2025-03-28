import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';

@Module({
    imports: [PrismaModule],
    controllers: [CampaignsController],
    providers: [CampaignsService],
    exports: [CampaignsService],
})
export class CampaignsModule { } 