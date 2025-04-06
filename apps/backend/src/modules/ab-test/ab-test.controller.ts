import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ABTestService } from './ab-test.service';
import { CreateABTestDto } from './dto/create-ab-test.dto';
import { UpdateABTestDto } from './dto/update-ab-test.dto';
import { ABTest } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController } from '@/common/controllers/base.controller';
@ApiTags('تجربة A/B')
@Controller('ab-test')
export class ABTestController extends BaseController<ABTest> {
    constructor(private readonly abTestService: ABTestService) {
        super(abTestService);
    }

    @Post()
    @ApiOperation({ summary: 'إضافة تجربة A/B جديدة' })
    @ApiResponse({ status: 201, description: 'تم إضافة تجربة A/B بنجاح' })
    async create(@Body() createABTestDto: CreateABTestDto): Promise<ABTest> {
        return this.abTestService.create(createABTestDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع تجارب A/B' })
    @ApiResponse({ status: 200, description: 'تم جلب تجارب A/B بنجاح' })
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<ABTest>> {
        return this.abTestService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل تجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل تجربة A/B بنجاح' })
    async findOne(@Param('id') id: number): Promise<ABTest> {
        return this.abTestService.getTestProfile(+id);
    }

    @Get(':id/variants')
    @ApiOperation({ summary: 'الحصول على جميع المتغيرات لتجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب المتغيرات بنجاح' })
    async getTestVariants(@Param('id') id: number): Promise<ABTest> {
        return this.abTestService.getTestVariants(+id);
    }

    @Get(':id/metrics')
    @ApiOperation({ summary: 'الحصول على جميع المقاييس لتجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب المقاييس بنجاح' })
    async getTestMetrics(@Param('id') id: number): Promise<ABTest> {
        return this.abTestService.getTestMetrics(+id);
    }

    @Get(':id/winner')
    @ApiOperation({ summary: 'الحصول على النسخة الفائزة لتجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب النسخة الفائزة بنجاح' })
    async getTestWinner(@Param('id') id: number): Promise<ABTest> {
        return this.abTestService.getTestWinner(+id);
    }
} 