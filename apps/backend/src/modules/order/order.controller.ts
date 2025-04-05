import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Order } from '@prisma/client';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
@ApiTags('الطلبات')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء طلب جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الطلب بنجاح' })
    create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.orderService.create(createOrderDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الطلبات' })
    @ApiResponse({ status: 200, description: 'تم جلب الطلبات بنجاح' })
    findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Order>> {
        return this.orderService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل طلب معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الطلب بنجاح' })
    findOne(@Param('id') id: string): Promise<Order> {
        return this.orderService.getOrderProfile(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على طلبات مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب طلبات المستخدم بنجاح' })
    getUserOrders(@Param('userId') userId: string): Promise<Order[]> {
        return this.orderService.getUserOrders(+userId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على الطلبات حسب الحالة' })
    @ApiResponse({ status: 200, description: 'تم جلب الطلبات بنجاح' })
    getOrdersByStatus(@Param('status') status: OrderStatus): Promise<Order[]> {
        return this.orderService.getOrdersByStatus(status);
    }

    @Get('pending')
    @ApiOperation({ summary: 'الحصول على الطلبات المعلقة' })
    @ApiResponse({ status: 200, description: 'تم جلب الطلبات المعلقة بنجاح' })
    getPendingOrders(): Promise<Order[]> {
        return this.orderService.getPendingOrders();
    }

    @Get('processing')
    @ApiOperation({ summary: 'الحصول على الطلبات قيد المعالجة' })
    @ApiResponse({ status: 200, description: 'تم جلب الطلبات قيد المعالجة بنجاح' })
    getProcessingOrders(): Promise<Order[]> {
        return this.orderService.getProcessingOrders();
    }

    @Get('shipped')
    @ApiOperation({ summary: 'الحصول على الطلبات المشحونة' })
    @ApiResponse({ status: 200, description: 'تم جلب الطلبات المشحونة بنجاح' })
    getShippedOrders(): Promise<Order[]> {
        return this.orderService.getShippedOrders();
    }

    @Get('delivered')
    @ApiOperation({ summary: 'الحصول على الطلبات المستلمة' })
    @ApiResponse({ status: 200, description: 'تم جلب الطلبات المستلمة بنجاح' })
    getDeliveredOrders(): Promise<Order[]> {
        return this.orderService.getDeliveredOrders();
    }

    @Get('cancelled')
    @ApiOperation({ summary: 'الحصول على الطلبات الملغية' })
    @ApiResponse({ status: 200, description: 'تم جلب الطلبات الملغية بنجاح' })
    getCancelledOrders(): Promise<Order[]> {
        return this.orderService.getCancelledOrders();
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة طلب معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة الطلب بنجاح' })
    updateOrderStatus(
        @Param('id') id: string,
        @Body('status') status: OrderStatus,
    ): Promise<Order> {
        return this.orderService.updateOrderStatus(+id, status);
    }

    @Patch(':id/cancel')
    @ApiOperation({ summary: 'إلغاء طلب معين' })
    @ApiResponse({ status: 200, description: 'تم إلغاء الطلب بنجاح' })
    cancelOrder(@Param('id') id: string): Promise<Order> {
        return this.orderService.cancelOrder(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات طلب معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات الطلب بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto,
    ): Promise<Order> {
        return this.orderService.update(+id, updateOrderDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف طلب معين' })
    @ApiResponse({ status: 200, description: 'تم حذف الطلب بنجاح' })
    remove(@Param('id') id: string): Promise<Order> {
        return this.orderService.remove(+id);
    }
} 