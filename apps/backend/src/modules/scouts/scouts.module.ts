import { Module } from '@nestjs/common';
import { ScoutsController } from './scouts.controller';
import { ScoutsService } from './scouts.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ScoutsController],
    providers: [ScoutsService],
    exports: [ScoutsService],
})
export class ScoutsModule { } 