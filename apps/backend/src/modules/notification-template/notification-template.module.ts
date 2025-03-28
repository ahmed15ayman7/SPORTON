import { Module } from '@nestjs/common';
import { NotificationTemplateService } from './notification-template.service';
import { NotificationTemplateController } from './notification-template.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [NotificationTemplateController],
    providers: [NotificationTemplateService],
    exports: [NotificationTemplateService],
})
export class NotificationTemplateModule { } 