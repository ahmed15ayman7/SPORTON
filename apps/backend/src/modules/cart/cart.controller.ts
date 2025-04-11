import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('سلة التسوق')
@Controller('carts')
export class CartController extends BaseController<Product> {
    constructor(private readonly cartService: CartService) {
        super(cartService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateCartDto, "سلة التسوق")
    async create(@Body() createCartDto: CreateCartDto): Promise<Product> {
        return this.cartService.create(createCartDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateCartDto, null, "سلة التسوق")
    async update(@Param('id') id: number, @Body() data: any): Promise<Product> {
        return this.cartService.update(+id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "سلة التسوق")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Product>> {
        return this.cartService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "سلة التسوق")
    async findOne(@Param('id') id: number): Promise<Product> {
        return this.cartService.findOne(+id);
    }


    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على سلة تسوق مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب سلة التسوق بنجاح' })
    async findByUser(@Param('userId') userId: string): Promise<Product[]> {
        return this.cartService.findByUser(+userId);
    }

    @Post('user/:userId/product/:productId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
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
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
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
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'إزالة منتج من سلة التسوق' })
    @ApiResponse({ status: 200, description: 'تمت إزالة المنتج بنجاح' })
    async removeItem(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
    ): Promise<Product> {
        return this.cartService.removeItem(+userId, +productId);
    }

    @Delete('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تفريغ سلة التسوق' })
    @ApiResponse({ status: 200, description: 'تم تفريغ السلة بنجاح' })
    async clearCart(@Param('userId') userId: string): Promise<Product[]> {
        return this.cartService.clearCart(+userId);
    }

    @Get('user/:userId/total')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'حساب إجمالي سلة التسوق' })
    @ApiResponse({ status: 200, description: 'تم حساب الإجمالي بنجاح' })
    async calculateTotal(@Param('userId') userId: string): Promise<number> {
        return this.cartService.calculateTotal(+userId);
    }

    @Patch('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تحديث سلة تسوق مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث سلة التسوق بنجاح' })
    async updateUserCart(
        @Param('userId') userId: number,
        @Body() updateCartDto: UpdateCartDto,
    ): Promise<Product> {
        return this.cartService.updateUserCart(userId, updateCartDto);
    }
} 