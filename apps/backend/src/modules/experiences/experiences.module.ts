import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ExperiencesController } from './experiences.controller';
import { ExperiencesService } from './experiences.service';

@Module({
    imports: [PrismaModule],
    controllers: [ExperiencesController],
    providers: [ExperiencesService],
    exports: [ExperiencesService],
})
export class ExperiencesModule { } 