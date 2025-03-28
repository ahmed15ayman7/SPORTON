import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('سلة التسوق')
@Controller('carts')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء سلة تسوق جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء سلة التسوق بنجاح' })
    create(@Body() createCartDto: CreateCartDto) {
        return this.cartService.create(createCartDto);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على سلة تسوق مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب سلة التسوق بنجاح' })
    findByUser(@Param('userId') userId: string) {
        return this.cartService.findByUser(+userId);
    }

    @Post('user/:userId/product/:productId')
    @ApiOperation({ summary: 'إضافة منتج إلى سلة التسوق' })
    @ApiResponse({ status: 200, description: 'تمت إضافة المنتج بنجاح' })
    addItem(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
        @Query('quantity') quantity: string,
        @Query('variantId') variantId?: string,
    ) {
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
    updateItemQuantity(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
        @Query('quantity') quantity: string,
    ) {
        return this.cartService.updateItemQuantity(+userId, +productId, +quantity);
    }

    @Delete('user/:userId/product/:productId')
    @ApiOperation({ summary: 'إزالة منتج من سلة التسوق' })
    @ApiResponse({ status: 200, description: 'تمت إزالة المنتج بنجاح' })
    removeItem(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
    ) {
        return this.cartService.removeItem(+userId, +productId);
    }

    @Delete('user/:userId')
    @ApiOperation({ summary: 'تفريغ سلة التسوق' })
    @ApiResponse({ status: 200, description: 'تم تفريغ السلة بنجاح' })
    clearCart(@Param('userId') userId: string) {
        return this.cartService.clearCart(+userId);
    }

    @Get('user/:userId/total')
    @ApiOperation({ summary: 'حساب إجمالي سلة التسوق' })
    @ApiResponse({ status: 200, description: 'تم حساب الإجمالي بنجاح' })
    calculateTotal(@Param('userId') userId: string) {
        return this.cartService.calculateTotal(+userId);
    }

    @Patch('user/:userId')
    @ApiOperation({ summary: 'تحديث سلة تسوق مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث سلة التسوق بنجاح' })
    update(
        @Param('userId') userId: string,
        @Body() updateCartDto: UpdateCartDto,
    ) {
        return this.cartService.update(+userId, updateCartDto);
    }
} 