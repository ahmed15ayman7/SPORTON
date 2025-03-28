import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdTargetingService } from './ad-targeting.service';
import { CreateAdTargetingDto } from './dto/create-ad-targeting.dto';
import { UpdateAdTargetingDto } from './dto/update-ad-targeting.dto';

@ApiTags('استهداف الإعلانات')
@Controller('ad-targeting')
export class AdTargetingController {
    constructor(private readonly adTargetingService: AdTargetingService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة استهداف إعلان جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة استهداف الإعلان بنجاح' })
    create(@Body() createAdTargetingDto: CreateAdTargetingDto) {
        return this.adTargetingService.create(createAdTargetingDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع استهدافات الإعلانات' })
    @ApiResponse({ status: 200, description: 'تم جلب استهدافات الإعلانات بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.adTargetingService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل استهداف إعلان معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل استهداف الإعلان بنجاح' })
    findOne(@Param('id') id: string) {
        return this.adTargetingService.getTargetingProfile(+id);
    }

    @Get('ad/:adId')
    @ApiOperation({ summary: 'الحصول على جميع استهدافات الإعلانات لإعلان معين' })
    @ApiResponse({ status: 200, description: 'تم جلب استهدافات الإعلانات بنجاح' })
    getAdTargeting(@Param('adId') adId: string) {
        return this.adTargetingService.getAdTargeting(+adId);
    }

    @Get('interests')
    @ApiOperation({ summary: 'الحصول على جميع استهدافات الإعلانات حسب الاهتمامات' })
    @ApiResponse({ status: 200, description: 'تم جلب استهدافات الإعلانات بنجاح' })
    getTargetingByInterests(@Query('interests') interests: string) {
        return this.adTargetingService.getTargetingByInterests(interests.split(','));
    }

    @Get('behaviors')
    @ApiOperation({ summary: 'الحصول على جميع استهدافات الإعلانات حسب السلوكيات' })
    @ApiResponse({ status: 200, description: 'تم جلب استهدافات الإعلانات بنجاح' })
    getTargetingByBehaviors(@Query('behaviors') behaviors: string) {
        return this.adTargetingService.getTargetingByBehaviors(behaviors.split(','));
    }

    @Get(':id/performance')
    @ApiOperation({ summary: 'الحصول على أداء استهداف إعلان معين' })
    @ApiResponse({ status: 200, description: 'تم جلب أداء استهداف الإعلان بنجاح' })
    getTargetingPerformance(@Param('id') id: string) {
        return this.adTargetingService.getTargetingPerformance(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات استهداف إعلان معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات استهداف الإعلان بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateAdTargetingDto: UpdateAdTargetingDto,
    ) {
        return this.adTargetingService.update(+id, updateAdTargetingDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف استهداف إعلان معين' })
    @ApiResponse({ status: 200, description: 'تم حذف استهداف الإعلان بنجاح' })
    remove(@Param('id') id: string) {
        return this.adTargetingService.remove(+id);
    }
} 