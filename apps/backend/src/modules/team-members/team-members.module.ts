import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TeamMembersController } from './team-members.controller';
import { TeamMembersService } from './team-members.service';

@Module({
    imports: [PrismaModule],
    controllers: [TeamMembersController],
    providers: [TeamMembersService],
    exports: [TeamMembersService],
})
export class TeamMembersModule { } 