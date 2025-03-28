import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommissionService } from './commission.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';

@ApiTags('العمولات')
@Controller('commissions')
export class CommissionController {
    constructor(private readonly commissionService: CommissionService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء عمولة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء العمولة بنجاح' })
    create(@Body() createCommissionDto: CreateCommissionDto) {
        return this.commissionService.create(createCommissionDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع العمولات' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولات بنجاح' })
    findAll() {
        return this.commissionService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على عمولة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولة بنجاح' })
    findOne(@Param('id') id: string) {
        return this.commissionService.findOne(+id);
    }

    @Get('agent/:agentId')
    @ApiOperation({ summary: 'الحصول على عمولات وكيل محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولات بنجاح' })
    findByAgent(@Param('agentId') agentId: string) {
        return this.commissionService.findByAgent(+agentId);
    }

    @Get('transaction/:transactionId')
    @ApiOperation({ summary: 'الحصول على عمولات عملية محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولات بنجاح' })
    findByTransaction(@Param('transactionId') transactionId: string) {
        return this.commissionService.findByTransaction(+transactionId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على عمولات بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العمولات بنجاح' })
    findByStatus(@Param('status') status: string) {
        return this.commissionService.findByStatus(status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث عمولة محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث العمولة بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateCommissionDto: UpdateCommissionDto,
    ) {
        return this.commissionService.update(+id, updateCommissionDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف عمولة محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف العمولة بنجاح' })
    remove(@Param('id') id: string) {
        return this.commissionService.remove(+id);
    }
} 