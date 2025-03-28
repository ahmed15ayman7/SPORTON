import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';

@Module({
    imports: [PrismaModule],
    controllers: [ProductCategoryController],
    providers: [ProductCategoryService],
    exports: [ProductCategoryService],
})
export class ProductCategoryModule { } 