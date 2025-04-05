import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjuryService } from './injury.service';
import { CreateInjuryDto, InjuryStatus } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';
import { Injury } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('الإصابات')
@Controller('injuries')
export class InjuryController {
    constructor(private readonly injuryService: InjuryService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء إصابة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الإصابة بنجاح' })
    async create(@Body() createInjuryDto: CreateInjuryDto): Promise<Injury> {
        return this.injuryService.create(createInjuryDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الإصابات' })
    @ApiResponse({ status: 200, description: 'تم جلب الإصابات بنجاح' })
    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Injury>> {
        return this.injuryService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على إصابة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الإصابة بنجاح' })
    async findOne(@Param('id') id: string): Promise<Injury> {
        return this.injuryService.findOne(+id);
    }

    @Get('player/:playerId')
    @ApiOperation({ summary: 'الحصول على إصابات لاعب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب إصابات اللاعب بنجاح' })
    async findByPlayer(@Param('playerId') playerId: string): Promise<Injury[]> {
        return this.injuryService.findByPlayer(+playerId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على إصابات بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب الإصابات بنجاح' })
    async findByStatus(@Param('status') status: InjuryStatus): Promise<Injury[]> {
        return this.injuryService.findByStatus(status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث إصابة محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث الإصابة بنجاح' })
    async update(
        @Param('id') id: string,
        @Body() updateInjuryDto: UpdateInjuryDto,
    ): Promise<Injury> {
        return this.injuryService.update(+id, updateInjuryDto);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة إصابة محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة الإصابة بنجاح' })
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: InjuryStatus,
    ): Promise<Injury> {
        return this.injuryService.updateStatus(+id, status);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف إصابة محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف الإصابة بنجاح' })
    async remove(@Param('id') id: string): Promise<Injury> {
        return this.injuryService.remove(+id);
    }
} 