import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { OrderItem } from '@prisma/client';

@ApiTags('عناصر الطلب')
@Controller('order-item')
export class OrderItemController {
    constructor(private readonly orderItemService: OrderItemService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء عنصر طلب جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء عنصر الطلب بنجاح' })
    create(@Body() createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
        return this.orderItemService.create(createOrderItemDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع عناصر الطلب' })
    @ApiResponse({ status: 200, description: 'تم جلب عناصر الطلب بنجاح' })
    findAll(@Query() paginationDto: PaginationDto): Promise<OrderItem[]> {
        return this.orderItemService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل عنصر طلب معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل عنصر الطلب بنجاح' })
    findOne(@Param('id') id: string): Promise<OrderItem> {
        return this.orderItemService.getOrderItemProfile(+id);
    }

    @Get('order/:orderId')
    @ApiOperation({ summary: 'الحصول على عناصر طلب معين' })
    @ApiResponse({ status: 200, description: 'تم جلب عناصر الطلب بنجاح' })
    getOrderItems(@Param('orderId') orderId: string): Promise<OrderItem[]> {
        return this.orderItemService.getOrderItems(+orderId);
    }

    @Get('product/:productId')
    @ApiOperation({ summary: 'الحصول على عناصر الطلب لمنتج معين' })
    @ApiResponse({ status: 200, description: 'تم جلب عناصر الطلب بنجاح' })
    getOrderItemsByProduct(@Param('productId') productId: string): Promise<OrderItem[]> {
        return this.orderItemService.getOrderItemsByProduct(+productId);
    }

    @Get('variant/:variantId')
    @ApiOperation({ summary: 'الحصول على عناصر الطلب لمتغير منتج معين' })
    @ApiResponse({ status: 200, description: 'تم جلب عناصر الطلب بنجاح' })
    getOrderItemsByVariant(@Param('variantId') variantId: string): Promise<OrderItem[]> {
        return this.orderItemService.getOrderItemsByVariant(+variantId);
    }

    @Patch(':id/quantity')
    @ApiOperation({ summary: 'تحديث كمية عنصر طلب معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث كمية عنصر الطلب بنجاح' })
    updateOrderItemQuantity(
        @Param('id') id: string,
        @Body('quantity') quantity: number,
    ): Promise<OrderItem> {
        return this.orderItemService.updateOrderItemQuantity(+id, quantity);
    }

    @Patch(':id/price')
    @ApiOperation({ summary: 'تحديث سعر عنصر طلب معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث سعر عنصر الطلب بنجاح' })
    updateOrderItemPrice(
        @Param('id') id: string,
        @Body('unitPrice') unitPrice: number,
    ): Promise<OrderItem> {
        return this.orderItemService.updateOrderItemPrice(+id, unitPrice);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات عنصر طلب معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات عنصر الطلب بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateOrderItemDto: UpdateOrderItemDto,
    ): Promise<OrderItem> {
        return this.orderItemService.update(+id, updateOrderItemDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف عنصر طلب معين' })
    @ApiResponse({ status: 200, description: 'تم حذف عنصر الطلب بنجاح' })
    remove(@Param('id') id: string): Promise<OrderItem> {
        return this.orderItemService.remove(+id);
    }
} 