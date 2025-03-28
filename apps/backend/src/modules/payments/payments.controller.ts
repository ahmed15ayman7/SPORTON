import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('المدفوعات')
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة دفعة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إضافة الدفعة بنجاح' })
    create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentsService.create(createPaymentDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع المدفوعات' })
    @ApiResponse({ status: 200, description: 'تم جلب المدفوعات بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.paymentsService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل دفعة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الدفعة بنجاح' })
    findOne(@Param('id') id: string) {
        return this.paymentsService.getPaymentProfile(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على جميع مدفوعات مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب مدفوعات المستخدم بنجاح' })
    getUserPayments(@Param('userId') userId: string) {
        return this.paymentsService.getUserPayments(+userId);
    }

    @Get('type/:type')
    @ApiOperation({ summary: 'الحصول على جميع المدفوعات حسب النوع' })
    @ApiResponse({ status: 200, description: 'تم جلب المدفوعات بنجاح' })
    getPaymentsByType(@Param('type') type: string) {
        return this.paymentsService.getPaymentsByType(type);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على جميع المدفوعات حسب الحالة' })
    @ApiResponse({ status: 200, description: 'تم جلب المدفوعات بنجاح' })
    getPaymentsByStatus(@Param('status') status: string) {
        return this.paymentsService.getPaymentsByStatus(status);
    }

    @Get('date-range')
    @ApiOperation({ summary: 'الحصول على جميع المدفوعات في نطاق تاريخ معين' })
    @ApiResponse({ status: 200, description: 'تم جلب المدفوعات بنجاح' })
    getPaymentsByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.paymentsService.getPaymentsByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get('user/:userId/statistics')
    @ApiOperation({ summary: 'الحصول على إحصائيات مدفوعات مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب إحصائيات المدفوعات بنجاح' })
    getPaymentStatistics(@Param('userId') userId: string) {
        return this.paymentsService.getPaymentStatistics(+userId);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة دفعة معينة' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة الدفعة بنجاح' })
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.paymentsService.updatePaymentStatus(+id, status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات دفعة معينة' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات الدفعة بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updatePaymentDto: UpdatePaymentDto,
    ) {
        return this.paymentsService.update(+id, updatePaymentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف دفعة معينة' })
    @ApiResponse({ status: 200, description: 'تم حذف الدفعة بنجاح' })
    remove(@Param('id') id: string) {
        return this.paymentsService.remove(+id);
    }
} 