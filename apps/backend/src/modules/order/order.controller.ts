import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from '@/dtos/Order.create.dto';
import { UpdateOrderDto } from '@/dtos/Order.update.dto';
import { OrderStatus } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Order } from '@shared/prisma';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
@ApiTags('الطلبات')
@Controller('order')
export class OrderController extends BaseController<Order> {
    constructor(private readonly orderService: OrderService) {
        super(orderService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء طلب جديد', 'none', null, CreateOrderDto, 'الطلبات')
    create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.orderService.create(createOrderDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث طلب معين', 'none', UpdateOrderDto, null, 'الطلبات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<Order> {
        return this.orderService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الطلبات', 'none', null, null, 'الطلبات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Order>> {
        return this.orderService.findAll(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل طلب معين', 'none', null, null, 'الطلبات')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
        return this.orderService.getOrderProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على طلبات مستخدم معين', 'none', null, null, 'الطلبات')
    getUserOrders(@Param('userId') userId: string): Promise<Order[]> {
        return this.orderService.getUserOrders(+userId);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الطلبات حسب الحالة', 'none', null, null, 'الطلبات')
    getOrdersByStatus(@Param('status') status: OrderStatus): Promise<Order[]> {
        return this.orderService.getOrdersByStatus(status);
    }

    @Get('pending')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الطلبات المعلقة', 'none', null, null, 'الطلبات')
    getPendingOrders(): Promise<Order[]> {
        return this.orderService.getPendingOrders();
    }

    @Get('processing')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الطلبات قيد المعالجة', 'none', null, null, 'الطلبات')
    getProcessingOrders(): Promise<Order[]> {
        return this.orderService.getProcessingOrders();
    }

    @Get('shipped')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الطلبات المشحونة', 'none', null, null, 'الطلبات')
    getShippedOrders(): Promise<Order[]> {
        return this.orderService.getShippedOrders();
    }

    @Get('delivered')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الطلبات المستلمة', 'none', null, null, 'الطلبات')
    getDeliveredOrders(): Promise<Order[]> {
        return this.orderService.getDeliveredOrders();
    }

    @Get('cancelled')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الطلبات الملغية', 'none', null, null, 'الطلبات')
    getCancelledOrders(): Promise<Order[]> {
        return this.orderService.getCancelledOrders();
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث حالة طلب معين', 'none', null, null, 'الطلبات')
    updateOrderStatus(
        @Param('id') id: string,
        @Body('status') status: OrderStatus,
    ): Promise<Order> {
        return this.orderService.updateOrderStatus(+id, status);
    }

    @Patch(':id/cancel')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إلغاء طلب معين', 'none', null, null, 'الطلبات')
    cancelOrder(@Param('id') id: string): Promise<Order> {
        return this.orderService.cancelOrder(+id);
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف طلب معين', 'none', null, null, 'الطلبات')
    remove(@Param('id') id: string): Promise<Order> {
        return this.orderService.remove(+id);
    }
} 