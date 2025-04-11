import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommissionService } from './commission.service';
import { CreateCommissionDto } from '../../dtos/Commission.create.dto';
import { UpdateCommissionDto } from '../../dtos/Commission.update.dto';
import { Commission, PaymentStatus } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('العمولات')
@Controller('commissions')
export class CommissionController extends BaseController<Commission> {
    constructor(private readonly commissionService: CommissionService) {
        super(commissionService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateCommissionDto, "العمولات")
    @ApiOperation({ summary: 'إنشاء عمولة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء العمولة بنجاح' })
    async create(@Body() createCommissionDto: CreateCommissionDto): Promise<Commission> {
        return this.commissionService.create(createCommissionDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateCommissionDto, null, "العمولات")
    async update(@Param('id') id: number, @Body() updateCommissionDto: UpdateCommissionDto): Promise<Commission> {
        return this.commissionService.update(+id, updateCommissionDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "العمولات")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Commission>> {
        return this.commissionService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "العمولات")
    async findOne(@Param('id') id: number): Promise<Commission> {
        return this.commissionService.findOne(+id);
    }

    @Get('agent/:agentId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على عمولات وكيل محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولات بنجاح' })
    async findByAgent(@Param('agentId') agentId: string): Promise<Commission[]> {
        return this.commissionService.findByAgent(+agentId);
    }

    @Get('transaction/:transactionId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على عمولات عملية محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولات بنجاح' })
    async findByTransfer(@Param('transferId') transferId: string): Promise<Commission[]> {
        return this.commissionService.findByTransfer(+transferId);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على عمولات بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولات بنجاح' })
    async findByStatus(@Param('status') status: string): Promise<Commission[]> {
        return this.commissionService.findByStatus(status as PaymentStatus);
    }

} 