import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ABTestService } from './ab-test.service';
import { CreateABTestDto } from '../../dtos/ABTest.create.dto';
import { UpdateABTestDto } from '../../dtos/ABTest.update.dto';
import { ABTest, User } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('تجربة A/B')
@Controller('ab-test')
export class ABTestController extends BaseController<ABTest> {
    constructor(private readonly abTestService: ABTestService) {
        super(abTestService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateABTestDto, "تجربة A/B")
    async create(@Body() data: any): Promise<ABTest> {
        return this.abTestService.create(data);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateABTestDto, null, "تجربة A/B")
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<ABTest> {
        return this.abTestService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "تجربة A/B")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<ABTest>> {
        return this.abTestService.findAll(params);
    }
    @Get(":id")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "تجربة A/B")
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ABTest> {
        return this.abTestService.findOne(id);
    }

    @Get(':id/variants')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على جميع المتغيرات لتجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب المتغيرات بنجاح' })
    @ApiResponse({ status: 400, description: 'فشل جلب المتغيرات.' })
    async getTestVariants(@Param('id') id: number): Promise<ABTest> {
        return this.abTestService.getTestVariants(+id);
    }

    @Get(':id/metrics')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على جميع المقاييس لتجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب المقاييس بنجاح' })
    @ApiResponse({ status: 400, description: 'فشل جلب المقاييس.' })
    async getTestMetrics(@Param('id') id: number): Promise<ABTest> {
        return this.abTestService.getTestMetrics(+id);
    }

    @Get(':id/winner')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على النسخة الفائزة لتجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب النسخة الفائزة بنجاح' })
    @ApiResponse({ status: 400, description: 'فشل جلب النسخة الفائزة.' })
    async getTestWinner(@Param('id') id: number): Promise<ABTest> {
        return this.abTestService.getTestWinner(+id);
    }
} 