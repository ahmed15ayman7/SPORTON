import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@ApiTags('المنشآت')
@Controller('facilities')
export class FacilityController {
    constructor(private readonly facilityService: FacilityService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء منشأة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء المنشأة بنجاح' })
    create(@Body() createFacilityDto: CreateFacilityDto) {
        return this.facilityService.create(createFacilityDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع المنشآت' })
    @ApiResponse({ status: 200, description: 'تم جلب المنشآت بنجاح' })
    findAll() {
        return this.facilityService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على منشأة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب المنشأة بنجاح' })
    findOne(@Param('id') id: string) {
        return this.facilityService.findOne(+id);
    }

    @Get('type/:type')
    @ApiOperation({ summary: 'الحصول على منشآت بنوع محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب المنشآت بنجاح' })
    findByType(@Param('type') type: string) {
        return this.facilityService.findByType(type);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث منشأة محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث المنشأة بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateFacilityDto: UpdateFacilityDto,
    ) {
        return this.facilityService.update(+id, updateFacilityDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف منشأة محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف المنشأة بنجاح' })
    remove(@Param('id') id: string) {
        return this.facilityService.remove(+id);
    }
} 