import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ABTestService } from './ab-test.service';
import { CreateABTestDto } from './dto/create-ab-test.dto';
import { UpdateABTestDto } from './dto/update-ab-test.dto';

@ApiTags('تجربة A/B')
@Controller('ab-test')
export class ABTestController {
    constructor(private readonly abTestService: ABTestService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة تجربة A/B جديدة' })
    @ApiResponse({ status: 201, description: 'تم إضافة تجربة A/B بنجاح' })
    create(@Body() createABTestDto: CreateABTestDto) {
        return this.abTestService.create(createABTestDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع تجارب A/B' })
    @ApiResponse({ status: 200, description: 'تم جلب تجارب A/B بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.abTestService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل تجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل تجربة A/B بنجاح' })
    findOne(@Param('id') id: string) {
        return this.abTestService.getTestProfile(+id);
    }

    @Get(':id/variants')
    @ApiOperation({ summary: 'الحصول على جميع المتغيرات لتجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب المتغيرات بنجاح' })
    getTestVariants(@Param('id') id: string) {
        return this.abTestService.getTestVariants(+id);
    }

    @Get(':id/metrics')
    @ApiOperation({ summary: 'الحصول على جميع المقاييس لتجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب المقاييس بنجاح' })
    getTestMetrics(@Param('id') id: string) {
        return this.abTestService.getTestMetrics(+id);
    }

    @Get(':id/winner')
    @ApiOperation({ summary: 'الحصول على النسخة الفائزة لتجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب النسخة الفائزة بنجاح' })
    getTestWinner(@Param('id') id: string) {
        return this.abTestService.getTestWinner(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات تجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات تجربة A/B بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateABTestDto: UpdateABTestDto,
    ) {
        return this.abTestService.update(+id, updateABTestDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف تجربة A/B معينة' })
    @ApiResponse({ status: 200, description: 'تم حذف تجربة A/B بنجاح' })
    remove(@Param('id') id: string) {
        return this.abTestService.remove(+id);
    }
} 