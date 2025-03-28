import { Module } from '@nestjs/common';
import { TeamCategoryService } from './team-category.service';
import { TeamCategoryController } from './team-category.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [TeamCategoryController],
    providers: [TeamCategoryService],
    exports: [TeamCategoryService],
})
export class TeamCategoryModule { } 