import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { CreateContractDto, ContractStatus } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController } from '@/common/controllers/base.controller';

@ApiTags('العقود')
@Controller('contracts')
export class ContractController {
    constructor(private readonly contractService: ContractService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء عقد جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء العقد بنجاح' })
    async create(@Body() createContractDto: CreateContractDto): Promise<Contract> {
        return this.contractService.create(createContractDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع العقود' })
    @ApiResponse({ status: 200, description: 'تم جلب العقود بنجاح' })
    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Contract>> {
        return this.contractService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على عقد محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب العقد بنجاح' })
    async findOne(@Param('id') id: string): Promise<Contract> {
        return this.contractService.findOne(+id);
    }

    @Get('player/:playerId')
    @ApiOperation({ summary: 'الحصول على عقود لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب عقود اللاعب بنجاح' })
    async findByPlayer(@Param('playerId') playerId: string): Promise<Contract[]> {
        return this.contractService.findByPlayer(+playerId);
    }

    @Get('club/:clubId')
    @ApiOperation({ summary: 'الحصول على عقود نادي محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب عقود النادي بنجاح' })
    async findByClub(@Param('clubId') clubId: string): Promise<Contract[]> {
        return this.contractService.findByClub(+clubId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على عقود بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب العقود بنجاح' })
    async findByStatus(@Param('status') status: ContractStatus): Promise<Contract[]> {
        return this.contractService.findByStatus(status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث عقد محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث العقد بنجاح' })
    async update(
        @Param('id') id: string,
        @Body() updateContractDto: UpdateContractDto,
    ): Promise<Contract> {
        return this.contractService.update(+id, updateContractDto);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة عقد محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة العقد بنجاح' })
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: ContractStatus,
    ): Promise<Contract> {
        return this.contractService.updateStatus(+id, status);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف عقد محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف العقد بنجاح' })
    async remove(@Param('id') id: string): Promise<Contract> {
        return this.contractService.remove(+id);
    }
} 