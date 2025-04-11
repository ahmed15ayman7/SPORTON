import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContractService } from './contract.service';
import { CreateContractDto } from '../../dtos/Contract.create.dto';
import { UpdateContractDto } from '../../dtos/Contract.update.dto';
import { Contract, ContractStatus } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('العقود')
@Controller('contracts')
export class ContractController extends BaseController<Contract> {
    constructor(private readonly contractService: ContractService) {
        super(contractService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء عقد جديد', 'create', CreateContractDto, null, "العقود")
    async create(@Body() createContractDto: CreateContractDto): Promise<Contract> {
        return this.contractService.create(createContractDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث عقد معين', 'update', UpdateContractDto, null, "العقود")
    async update(@Param('id') id: number, @Body() data: any): Promise<Contract> {
        return this.contractService.update(+id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع العقود', 'none', null, null, "العقود")
    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Contract>> {
        return this.contractService.findAll(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على عقد محدد', 'none', null, null, "العقود")
    async findOne(@Param('id') id: number): Promise<Contract> {
        return this.contractService.findOne(+id);
    }

    @Get('player/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على عقود لاعب محدد', 'none', null, null, "العقود")
    async findByPlayer(@Param('playerId') playerId: string): Promise<Contract[]> {
        return this.contractService.findByPlayer(+playerId);
    }

    @Get('club/:clubId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على عقود نادي محدد', 'none', null, null, "العقود")
    async findByClub(@Param('clubId') clubId: string): Promise<Contract[]> {
        return this.contractService.findByClub(+clubId);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على عقود بحالة محددة', 'none', null, null, "العقود")
    async findByStatus(@Param('status') status: ContractStatus): Promise<Contract[]> {
        return this.contractService.findByStatus(status);
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث حالة عقد محدد', 'update', null, null, "العقود")
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: ContractStatus,
    ): Promise<Contract> {
        return this.contractService.updateStatus(+id, status);
    }

} 