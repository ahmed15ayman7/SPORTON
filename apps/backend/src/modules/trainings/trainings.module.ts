import { Module } from '@nestjs/common';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';
import { PrismaModule } from '@/prisma/prisma.module';


@Module({
    imports: [PrismaModule],
    controllers: [TrainingsController],
    providers: [TrainingsService],
    exports: [TrainingsService],
})
export class TrainingsModule { }