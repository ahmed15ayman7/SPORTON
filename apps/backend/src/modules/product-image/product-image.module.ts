import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProductImageController } from './product-image.controller';
import { ProductImageService } from './product-image.service';

@Module({
    imports: [PrismaModule],
    controllers: [ProductImageController],
    providers: [ProductImageService],
    exports: [ProductImageService],
})
export class ProductImageModule { } 