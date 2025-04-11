import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from '@/dtos/Payment.create.dto';
import { UpdatePaymentDto } from '@/dtos/Payment.update.dto';
import { Payment } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('المدفوعات')
@Controller('payments')
export class PaymentsController extends BaseController<Payment> {
    constructor(private readonly paymentsService: PaymentsService) {
        super(paymentsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة دفعة جديدة', 'none', null, CreatePaymentDto, 'المدفوعات')
    create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment> {
        return this.paymentsService.create(createPaymentDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث دفعة معينة', 'none', UpdatePaymentDto, null, 'المدفوعات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<Payment> {
        return this.paymentsService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المدفوعات', 'none', null, null, 'المدفوعات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<Payment>> {
        return this.paymentsService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل دفعة معينة', 'none', null, null, 'المدفوعات')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Payment> {
        return this.paymentsService.getPaymentProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع مدفوعات مستخدم معين', 'none', null, null, 'المدفوعات')
    getUserPayments(@Param('userId') userId: string): Promise<Payment[]> {
        return this.paymentsService.getUserPayments(+userId);
    }

    @Get('type/:type')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المدفوعات حسب النوع', 'none', null, null, 'المدفوعات')
    getPaymentsByType(@Param('type') type: string): Promise<Payment[]> {
        return this.paymentsService.getPaymentsByType(type);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المدفوعات حسب الحالة', 'none', null, null, 'المدفوعات')
    getPaymentsByStatus(@Param('status') status: string): Promise<Payment[]> {
        return this.paymentsService.getPaymentsByStatus(status);
    }

    @Get('date-range')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المدفوعات في نطاق تاريخ معين', 'none', null, null, 'المدفوعات')
    getPaymentsByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<Payment[]> {
        return this.paymentsService.getPaymentsByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get('user/:userId/statistics')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إحصائيات مدفوعات مستخدم معين', 'none', null, null, 'المدفوعات')
    getPaymentStatistics(@Param('userId') userId: string): Promise<any> {
        return this.paymentsService.getPaymentStatistics(+userId);
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث حالة دفعة معينة', 'none', null, null, 'المدفوعات')
    updateStatus(@Param('id') id: string, @Body('status') status: string): Promise<Payment> {
        return this.paymentsService.updatePaymentStatus(+id, status);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف دفعة معينة', 'none', null, null, 'المدفوعات')
    remove(@Param('id') id: string): Promise<Payment> {
        return this.paymentsService.remove(+id);
    }
} 