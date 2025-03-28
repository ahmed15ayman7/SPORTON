import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProductReviewController } from './product-review.controller';
import { ProductReviewService } from './product-review.service';

@Module({
    imports: [PrismaModule],
    controllers: [ProductReviewController],
    providers: [ProductReviewService],
    exports: [ProductReviewService],
})
export class ProductReviewModule { } 