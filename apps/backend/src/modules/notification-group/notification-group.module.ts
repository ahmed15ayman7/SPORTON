import { Module } from '@nestjs/common';
import { NotificationGroupService } from './notification-group.service';
import { NotificationGroupController } from './notification-group.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [NotificationGroupController],
    providers: [NotificationGroupService],
    exports: [NotificationGroupService],
})
export class NotificationGroupModule { } 