import { Module } from '@nestjs/common';
import { NotificationActionService } from './notification-action.service';
import { NotificationActionController } from './notification-action.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [NotificationActionController],
    providers: [NotificationActionService],
    exports: [NotificationActionService],
})
export class NotificationActionModule { } 