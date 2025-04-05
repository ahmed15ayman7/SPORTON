import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommissionService } from './commission.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { Commission, PaymentStatus } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('العمولات')
@Controller('commissions')
export class CommissionController {
    constructor(private readonly commissionService: CommissionService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء عمولة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء العمولة بنجاح' })
    async create(@Body() createCommissionDto: CreateCommissionDto): Promise<Commission> {
        return this.commissionService.create(createCommissionDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع العمولات' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولات بنجاح' })
    async findAll(@Query() params: PaginationDto): Promise<Commission[]> {
        return this.commissionService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على عمولة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولة بنجاح' })
    async findOne(@Param('id') id: string): Promise<Commission> {
        return this.commissionService.findOne(+id);
    }

    @Get('agent/:agentId')
    @ApiOperation({ summary: 'الحصول على عمولات وكيل محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولات بنجاح' })
    async findByAgent(@Param('agentId') agentId: string): Promise<Commission[]> {
        return this.commissionService.findByAgent(+agentId);
    }

    @Get('transaction/:transactionId')
    @ApiOperation({ summary: 'الحصول على عمولات عملية محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولات بنجاح' })
    async findByTransfer(@Param('transferId') transferId: string): Promise<Commission[]> {
        return this.commissionService.findByTransfer(+transferId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على عمولات بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولات بنجاح' })
    async findByStatus(@Param('status') status: string): Promise<Commission[]> {
        return this.commissionService.findByStatus(status as PaymentStatus);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث عمولة محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث العمولة بنجاح' })
    async update(
        @Param('id') id: string,
        @Body() updateCommissionDto: UpdateCommissionDto,
    ): Promise<Commission> {
        return this.commissionService.update(+id, updateCommissionDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف عمولة محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف العمولة بنجاح' })
    async remove(@Param('id') id: string): Promise<Commission> {
        return this.commissionService.remove(+id);
    }
} 