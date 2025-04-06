import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from '@shared/prisma';
import { BaseController } from '@/common/controllers/base.controller';
@ApiTags('سلة التسوق')
@Controller('carts')
export class CartController extends BaseController<Product> {
    constructor(private readonly cartService: CartService) {
        super(cartService);
    }

    @Post()
    @ApiOperation({ summary: 'إنشاء سلة تسوق جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء سلة التسوق بنجاح' })
    async create(@Body() createCartDto: CreateCartDto): Promise<Product> {
        return this.cartService.create(createCartDto);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على سلة تسوق مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب سلة التسوق بنجاح' })
    async findByUser(@Param('userId') userId: string): Promise<Product[]> {
        return this.cartService.findByUser(+userId);
    }

    @Post('user/:userId/product/:productId')
    @ApiOperation({ summary: 'إضافة منتج إلى سلة التسوق' })
    @ApiResponse({ status: 200, description: 'تمت إضافة المنتج بنجاح' })
    async addItem(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
        @Query('quantity') quantity: string,
        @Query('variantId') variantId?: string,
    ): Promise<Product> {
        return this.cartService.addItem(
            +userId,
            +productId,
            +quantity,
            variantId ? +variantId : undefined,
        );
    }

    @Patch('user/:userId/product/:productId')
    @ApiOperation({ summary: 'تحديث كمية منتج في سلة التسوق' })
    @ApiResponse({ status: 200, description: 'تم تحديث الكمية بنجاح' })
    async updateItemQuantity(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
        @Query('quantity') quantity: string,
    ): Promise<Product> {
        return this.cartService.updateItemQuantity(+userId, +productId, +quantity);
    }

    @Delete('user/:userId/product/:productId')
    @ApiOperation({ summary: 'إزالة منتج من سلة التسوق' })
    @ApiResponse({ status: 200, description: 'تمت إزالة المنتج بنجاح' })
    async removeItem(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
    ): Promise<Product> {
        return this.cartService.removeItem(+userId, +productId);
    }

    @Delete('user/:userId')
    @ApiOperation({ summary: 'تفريغ سلة التسوق' })
    @ApiResponse({ status: 200, description: 'تم تفريغ السلة بنجاح' })
    async clearCart(@Param('userId') userId: string): Promise<Product[]> {
        return this.cartService.clearCart(+userId);
    }

    @Get('user/:userId/total')
    @ApiOperation({ summary: 'حساب إجمالي سلة التسوق' })
    @ApiResponse({ status: 200, description: 'تم حساب الإجمالي بنجاح' })
    async calculateTotal(@Param('userId') userId: string): Promise<number> {
        return this.cartService.calculateTotal(+userId);
    }

    @Patch('user/:userId')
    @ApiOperation({ summary: 'تحديث سلة تسوق مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث سلة التسوق بنجاح' })
    async updateUserCart(
        @Param('userId') userId: number,
        @Body() updateCartDto: UpdateCartDto,
    ): Promise<Product> {
        return this.cartService.updateUserCart(userId, updateCartDto);
    }
} 