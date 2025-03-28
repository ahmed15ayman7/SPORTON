import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { RoomUsersController } from './room-users.controller';
import { RoomUsersService } from './room-users.service';

@Module({
    imports: [PrismaModule],
    controllers: [RoomUsersController],
    providers: [RoomUsersService],
    exports: [RoomUsersService],
})
export class RoomUsersModule { } 