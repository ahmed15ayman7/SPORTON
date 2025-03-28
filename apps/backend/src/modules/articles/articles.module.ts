import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
    imports: [PrismaModule],
    controllers: [ArticlesController],
    providers: [ArticlesService],
    exports: [ArticlesService],
})
export class ArticlesModule { } 