import { Module } from '@nestjs/common';
import { FriendshipsController } from './friendships.controller';
import { FriendshipsService } from './friendships.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [FriendshipsController],
    providers: [FriendshipsService],
    exports: [FriendshipsService],
})
export class FriendshipsModule { } 