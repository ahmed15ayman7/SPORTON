import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UserBehaviorsController } from './user-behaviors.controller';
import { UserBehaviorsService } from './user-behaviors.service';

@Module({
    imports: [PrismaModule],
    controllers: [UserBehaviorsController],
    providers: [UserBehaviorsService],
    exports: [UserBehaviorsService],
})
export class UserBehaviorsModule { } 