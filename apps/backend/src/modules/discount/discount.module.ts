import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';

@Module({
    imports: [PrismaModule],
    controllers: [DiscountController],
    providers: [DiscountService],
    exports: [DiscountService],
})
export class DiscountModule { } 