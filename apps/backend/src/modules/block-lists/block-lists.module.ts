import { Module } from '@nestjs/common';
import { BlockListsController } from './block-lists.controller';
import { BlockListsService } from './block-lists.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [BlockListsController],
    providers: [BlockListsService],
    exports: [BlockListsService],
})
export class BlockListsModule { } 