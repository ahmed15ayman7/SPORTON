import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Advertisement } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('الإعلانات')
@Controller('advertisements')
export class AdvertisementsController {
    constructor(private readonly advertisementsService: AdvertisementsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء إعلان جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الإعلان بنجاح' })
    async create(@Body() createAdvertisementDto: CreateAdvertisementDto): Promise<Advertisement> {
        return this.advertisementsService.create(createAdvertisementDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الإعلانات' })
    @ApiResponse({ status: 200, description: 'تم جلب الإعلانات بنجاح' })
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<Advertisement>> {
        return this.advertisementsService.findAll(search);
    }

    @Get('profile/:id')
    @ApiOperation({ summary: 'الحصول على تفاصيل الإعلان' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الإعلان بنجاح' })
    async getAdvertisementProfile(@Param('id') id: string): Promise<Advertisement> {
        return this.advertisementsService.getAdvertisementProfile(+id);
    }

    @Get('sponsor/:sponsorId')
    @ApiOperation({ summary: 'الحصول على إعلانات المعلن' })
    @ApiResponse({ status: 200, description: 'تم جلب إعلانات المعلن بنجاح' })
    async getSponsorAdvertisements(@Param('sponsorId') sponsorId: string): Promise<Advertisement[]> {
        return this.advertisementsService.getSponsorAdvertisements(+sponsorId);
    }

    @Get('active')
    @ApiOperation({ summary: 'الحصول على الإعلانات النشطة' })
    @ApiResponse({ status: 200, description: 'تم جلب الإعلانات النشطة بنجاح' })
    async getActiveAdvertisements(): Promise<Advertisement[]> {
        return this.advertisementsService.getActiveAdvertisements();
    }

    @Get('sport/:sport')
    @ApiOperation({ summary: 'الحصول على إعلانات رياضة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب إعلانات الرياضة بنجاح' })
    async getAdvertisementsBySport(@Param('sport') sport: string): Promise<Advertisement[]> {
        return this.advertisementsService.getAdvertisementsBySport(sport);
    }

    @Get('role/:role')
    @ApiOperation({ summary: 'الحصول على إعلانات دور معين' })
    @ApiResponse({ status: 200, description: 'تم جلب إعلانات الدور بنجاح' })
    async getAdvertisementsByRole(@Param('role') role: string): Promise<Advertisement[]> {
        return this.advertisementsService.getAdvertisementsByRole(role);
    }

    @Post(':id/click')
    @ApiOperation({ summary: 'زيادة عدد النقرات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد النقرات بنجاح' })
    async incrementClicks(@Param('id') id: string): Promise<Advertisement> {
        return this.advertisementsService.incrementClicks(+id);
    }

    @Post(':id/impression')
    @ApiOperation({ summary: 'زيادة عدد المشاهدات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد المشاهدات بنجاح' })
    async incrementImpressions(@Param('id') id: string): Promise<Advertisement> {
        return this.advertisementsService.incrementImpressions(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث الإعلان' })
    @ApiResponse({ status: 200, description: 'تم تحديث الإعلان بنجاح' })
    async update(@Param('id') id: string, @Body() updateAdvertisementDto: UpdateAdvertisementDto): Promise<Advertisement> {
        return this.advertisementsService.update(+id, updateAdvertisementDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف الإعلان' })
    @ApiResponse({ status: 200, description: 'تم حذف الإعلان بنجاح' })
    async remove(@Param('id') id: string): Promise<Advertisement> {
        return this.advertisementsService.remove(+id);
    }
} 