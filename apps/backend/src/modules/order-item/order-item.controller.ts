import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from '@/dtos/OrderItem.create.dto';
import { UpdateOrderItemDto } from '@/dtos/OrderItem.update.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { OrderItem } from '@shared/prisma';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
@ApiTags('عناصر الطلب')
@Controller('order-item')
export class OrderItemController extends BaseController<OrderItem> {
    constructor(private readonly orderItemService: OrderItemService) {
        super(orderItemService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء عنصر طلب جديد', 'none', null, CreateOrderItemDto, 'عناصر الطلب')
    create(@Body() createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
        return this.orderItemService.create(createOrderItemDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث عنصر طلب معين', 'none', UpdateOrderItemDto, null, 'عناصر الطلب')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<OrderItem> {
        return this.orderItemService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع عناصر الطلب', 'none', null, null, 'عناصر الطلب')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<OrderItem>> {
        return this.orderItemService.findAll(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل عنصر طلب معين', 'none', null, null, 'عناصر الطلب')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderItem> {
        return this.orderItemService.getOrderItemProfile(id);
    }

    @Get('order/:orderId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على عناصر طلب معين', 'none', null, null, 'عناصر الطلب')
    getOrderItems(@Param('orderId') orderId: string): Promise<OrderItem[]> {
        return this.orderItemService.getOrderItems(+orderId);
    }

    @Get('product/:productId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على عناصر الطلب لمنتج معين', 'none', null, null, 'عناصر الطلب')
    getOrderItemsByProduct(@Param('productId') productId: string): Promise<OrderItem[]> {
        return this.orderItemService.getOrderItemsByProduct(+productId);
    }

    @Get('variant/:variantId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على عناصر الطلب لمتغير منتج معين', 'none', null, null, 'عناصر الطلب')
    getOrderItemsByVariant(@Param('variantId') variantId: string): Promise<OrderItem[]> {
        return this.orderItemService.getOrderItemsByVariant(+variantId);
    }

    @Patch(':id/quantity')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث كمية عنصر طلب معين', 'none', null, null, 'عناصر الطلب')
    updateOrderItemQuantity(
        @Param('id') id: string,
        @Body('quantity') quantity: number,
    ): Promise<OrderItem> {
        return this.orderItemService.updateOrderItemQuantity(+id, quantity);
    }

    @Patch(':id/price')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث سعر عنصر طلب معين', 'none', null, null, 'عناصر الطلب')
    updateOrderItemPrice(
        @Param('id') id: string,
        @Body('unitPrice') unitPrice: number,
    ): Promise<OrderItem> {
        return this.orderItemService.updateOrderItemPrice(+id, unitPrice);
    }



    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف عنصر طلب معين', 'none', null, null, 'عناصر الطلب')
    remove(@Param('id') id: string): Promise<OrderItem> {
        return this.orderItemService.remove(+id);
    }
} 