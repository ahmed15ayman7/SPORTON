import { Module } from '@nestjs/common';
import { InjuryService } from './injury.service';
import { InjuryController } from './injury.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [InjuryController],
    providers: [InjuryService],
    exports: [InjuryService],
})
export class InjuryModule { } 