import { Module } from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { SocialMediaController } from './social-media.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [SocialMediaController],
    providers: [SocialMediaService],
    exports: [SocialMediaService],
})
export class SocialMediaModule { } 