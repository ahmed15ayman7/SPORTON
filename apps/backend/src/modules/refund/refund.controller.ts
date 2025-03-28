import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RefundService } from './refund.service';
import { CreateRefundDto } from './dto/create-refund.dto';
import { UpdateRefundDto } from './dto/update-refund.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Refund, RefundStatus } from '@prisma/client';

@ApiTags('المرتجعات')
@Controller('refund')
export class RefundController {
    constructor(private readonly refundService: RefundService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء مرتجع جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء المرتجع بنجاح' })
    create(@Body() createRefundDto: CreateRefundDto): Promise<Refund> {
        return this.refundService.create(createRefundDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع المرتجعات' })
    @ApiResponse({ status: 200, description: 'تم جلب المرتجعات بنجاح' })
    findAll(@Query() paginationDto: PaginationDto): Promise<Refund[]> {
        return this.refundService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل مرتجع معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل المرتجع بنجاح' })
    findOne(@Param('id') id: string): Promise<Refund> {
        return this.refundService.getRefundProfile(+id);
    }

    @Get('order/:orderId')
    @ApiOperation({ summary: 'الحصول على مرتجعات طلب معين' })
    @ApiResponse({ status: 200, description: 'تم جلب مرتجعات الطلب بنجاح' })
    getOrderRefunds(@Param('orderId') orderId: string): Promise<Refund[]> {
        return this.refundService.getOrderRefunds(+orderId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على المرتجعات حسب الحالة' })
    @ApiResponse({ status: 200, description: 'تم جلب المرتجعات بنجاح' })
    getRefundsByStatus(@Param('status') status: RefundStatus): Promise<Refund[]> {
        return this.refundService.getRefundsByStatus(status);
    }

    @Get('pending')
    @ApiOperation({ summary: 'الحصول على المرتجعات المعلقة' })
    @ApiResponse({ status: 200, description: 'تم جلب المرتجعات المعلقة بنجاح' })
    getPendingRefunds(): Promise<Refund[]> {
        return this.refundService.getPendingRefunds();
    }

    @Get('processing')
    @ApiOperation({ summary: 'الحصول على المرتجعات قيد المعالجة' })
    @ApiResponse({ status: 200, description: 'تم جلب المرتجعات قيد المعالجة بنجاح' })
    getProcessingRefunds(): Promise<Refund[]> {
        return this.refundService.getProcessingRefunds();
    }

    @Get('completed')
    @ApiOperation({ summary: 'الحصول على المرتجعات المكتملة' })
    @ApiResponse({ status: 200, description: 'تم جلب المرتجعات المكتملة بنجاح' })
    getCompletedRefunds(): Promise<Refund[]> {
        return this.refundService.getCompletedRefunds();
    }

    @Get('rejected')
    @ApiOperation({ summary: 'الحصول على المرتجعات المرفوضة' })
    @ApiResponse({ status: 200, description: 'تم جلب المرتجعات المرفوضة بنجاح' })
    getRejectedRefunds(): Promise<Refund[]> {
        return this.refundService.getRejectedRefunds();
    }

    @Get('reason/:reason')
    @ApiOperation({ summary: 'الحصول على المرتجعات حسب السبب' })
    @ApiResponse({ status: 200, description: 'تم جلب المرتجعات بنجاح' })
    getRefundsByReason(@Param('reason') reason: string): Promise<Refund[]> {
        return this.refundService.getRefundsByReason(reason);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة مرتجع معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة المرتجع بنجاح' })
    updateRefundStatus(
        @Param('id') id: string,
        @Body('status') status: RefundStatus,
    ): Promise<Refund> {
        return this.refundService.updateRefundStatus(+id, status);
    }

    @Patch(':id/amount')
    @ApiOperation({ summary: 'تحديث مبلغ مرتجع معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث مبلغ المرتجع بنجاح' })
    updateRefundAmount(
        @Param('id') id: string,
        @Body('amount') amount: number,
    ): Promise<Refund> {
        return this.refundService.updateRefundAmount(+id, amount);
    }

    @Patch(':id/details')
    @ApiOperation({ summary: 'تحديث تفاصيل مرتجع معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث تفاصيل المرتجع بنجاح' })
    updateRefundDetails(
        @Param('id') id: string,
        @Body('details') details: string,
    ): Promise<Refund> {
        return this.refundService.updateRefundDetails(+id, details);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات مرتجع معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات المرتجع بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateRefundDto: UpdateRefundDto,
    ): Promise<Refund> {
        return this.refundService.update(+id, updateRefundDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف مرتجع معين' })
    @ApiResponse({ status: 200, description: 'تم حذف المرتجع بنجاح' })
    remove(@Param('id') id: string): Promise<Refund> {
        return this.refundService.remove(+id);
    }
} 