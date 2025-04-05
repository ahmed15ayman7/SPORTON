import { Module } from '@nestjs/common';
import { NotificationLogService } from './notification-log.service';
import { NotificationLogController } from './notification-log.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [NotificationLogController],
    providers: [NotificationLogService],
    exports: [NotificationLogService],
})
export class NotificationLogModule { } 