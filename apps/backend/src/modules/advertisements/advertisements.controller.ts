import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';

@ApiTags('الإعلانات')
@Controller('advertisements')
export class AdvertisementsController {
    constructor(private readonly advertisementsService: AdvertisementsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء إعلان جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الإعلان بنجاح' })
    create(@Body() createAdvertisementDto: CreateAdvertisementDto) {
        return this.advertisementsService.create(createAdvertisementDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الإعلانات' })
    @ApiResponse({ status: 200, description: 'تم جلب الإعلانات بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.advertisementsService.findAll(search);
    }

    @Get('profile/:id')
    @ApiOperation({ summary: 'الحصول على تفاصيل الإعلان' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الإعلان بنجاح' })
    getAdvertisementProfile(@Param('id') id: string) {
        return this.advertisementsService.getAdvertisementProfile(+id);
    }

    @Get('sponsor/:sponsorId')
    @ApiOperation({ summary: 'الحصول على إعلانات المعلن' })
    @ApiResponse({ status: 200, description: 'تم جلب إعلانات المعلن بنجاح' })
    getSponsorAdvertisements(@Param('sponsorId') sponsorId: string) {
        return this.advertisementsService.getSponsorAdvertisements(+sponsorId);
    }

    @Get('active')
    @ApiOperation({ summary: 'الحصول على الإعلانات النشطة' })
    @ApiResponse({ status: 200, description: 'تم جلب الإعلانات النشطة بنجاح' })
    getActiveAdvertisements() {
        return this.advertisementsService.getActiveAdvertisements();
    }

    @Get('sport/:sport')
    @ApiOperation({ summary: 'الحصول على إعلانات رياضة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب إعلانات الرياضة بنجاح' })
    getAdvertisementsBySport(@Param('sport') sport: string) {
        return this.advertisementsService.getAdvertisementsBySport(sport);
    }

    @Get('role/:role')
    @ApiOperation({ summary: 'الحصول على إعلانات دور معين' })
    @ApiResponse({ status: 200, description: 'تم جلب إعلانات الدور بنجاح' })
    getAdvertisementsByRole(@Param('role') role: string) {
        return this.advertisementsService.getAdvertisementsByRole(role);
    }

    @Post(':id/click')
    @ApiOperation({ summary: 'زيادة عدد النقرات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد النقرات بنجاح' })
    incrementClicks(@Param('id') id: string) {
        return this.advertisementsService.incrementClicks(+id);
    }

    @Post(':id/impression')
    @ApiOperation({ summary: 'زيادة عدد المشاهدات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد المشاهدات بنجاح' })
    incrementImpressions(@Param('id') id: string) {
        return this.advertisementsService.incrementImpressions(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث الإعلان' })
    @ApiResponse({ status: 200, description: 'تم تحديث الإعلان بنجاح' })
    update(@Param('id') id: string, @Body() updateAdvertisementDto: UpdateAdvertisementDto) {
        return this.advertisementsService.update(+id, updateAdvertisementDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف الإعلان' })
    @ApiResponse({ status: 200, description: 'تم حذف الإعلان بنجاح' })
    remove(@Param('id') id: string) {
        return this.advertisementsService.remove(+id);
    }
} 