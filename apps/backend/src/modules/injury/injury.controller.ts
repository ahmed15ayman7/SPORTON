import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjuryService } from './injury.service';
import { CreateInjuryDto } from '@/dtos/Injury.create.dto';
import { UpdateInjuryDto } from '@/dtos/Injury.update.dto';
import { Injury, InjuryStatus } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
@ApiTags('الإصابات')
@Controller('injuries')
export class InjuryController {
    constructor(private readonly injuryService: InjuryService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء إصابة جديدة', 'create', CreateInjuryDto, null, "الإصابات")
    async create(@Body() createInjuryDto: CreateInjuryDto): Promise<Injury> {
        return this.injuryService.create(createInjuryDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث إصابة محددة', 'update', UpdateInjuryDto, null, "الإصابات")
    async update(@Param('id') id: string, @Body() updateInjuryDto: UpdateInjuryDto): Promise<Injury> {
        return this.injuryService.update(+id, updateInjuryDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الإصابات', 'none', null, null, "الإصابات")
    async findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Injury>> {
        return this.injuryService.findAll(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إصابة محددة', 'none', null, null, "الإصابات")
    async findOne(@Param('id') id: string): Promise<Injury> {
        return this.injuryService.findOne(+id);
    }

    @Get('player/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إصابات لاعب محدد', 'none', null, null, "الإصابات")
    async findByPlayer(@Param('playerId') playerId: string): Promise<Injury[]> {
        return this.injuryService.findByPlayer(+playerId);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إصابات بحالة محددة', 'none', null, null, "الإصابات")
    async findByStatus(@Param('status') status: InjuryStatus): Promise<Injury[]> {
        return this.injuryService.findByStatus(status);
    }


    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث حالة إصابة محددة', 'update', UpdateInjuryDto, null, "الإصابات")
    async updateStatus(
        @Param('id') id: string,
        @Body('status') status: InjuryStatus,
    ): Promise<Injury> {
        return this.injuryService.updateStatus(+id, status);
    }
} 