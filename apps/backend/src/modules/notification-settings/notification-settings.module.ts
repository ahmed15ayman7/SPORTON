import { Module } from '@nestjs/common';
import { NotificationSettingsService } from './notification-settings.service';
import { NotificationSettingsController } from './notification-settings.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [NotificationSettingsController],
    providers: [NotificationSettingsService],
    exports: [NotificationSettingsService],
})
export class NotificationSettingsModule { } 