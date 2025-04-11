import { Controller, Get, Post, Param, UseGuards, Body, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdvertisementsService } from './advertisements.service';
import { CreateAdvertisementDto } from '../../dtos/Advertisement.create.dto';
import { UpdateAdvertisementDto } from '../../dtos/Advertisement.update.dto';
import { Advertisement } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('الإعلانات')
@Controller('advertisements')
export class AdvertisementsController extends BaseController<Advertisement> {
    constructor(private readonly advertisementsService: AdvertisementsService) {
        super(advertisementsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateAdvertisementDto, "الإعلانات")
    async create(@Body() data: any): Promise<Advertisement> {
        return this.advertisementsService.create(data);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateAdvertisementDto, null, "الإعلانات")
    async update(@Param('id') id: number, @Body() data: any): Promise<Advertisement> {
        return this.advertisementsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "الإعلانات")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Advertisement>> {
        return this.advertisementsService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "الإعلانات")
    async findOne(@Param('id') id: number): Promise<Advertisement> {
        return this.advertisementsService.findOne(id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تفاصيل الإعلان' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الإعلان بنجاح' })
    async getAdvertisementProfile(@Param('id') id: string): Promise<Advertisement> {
        return this.advertisementsService.getAdvertisementProfile(+id);
    }

    @Get('sponsor/:sponsorId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على إعلانات المعلن' })
    @ApiResponse({ status: 200, description: 'تم جلب إعلانات المعلن بنجاح' })
    async getSponsorAdvertisements(@Param('sponsorId') sponsorId: string): Promise<Advertisement[]> {
        return this.advertisementsService.getSponsorAdvertisements(+sponsorId);
    }

    @Get('active')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على الإعلانات النشطة' })
    @ApiResponse({ status: 200, description: 'تم جلب الإعلانات النشطة بنجاح' })
    async getActiveAdvertisements(): Promise<Advertisement[]> {
        return this.advertisementsService.getActiveAdvertisements();
    }

    @Get('sport/:sport')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على إعلانات رياضة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب إعلانات الرياضة بنجاح' })
    async getAdvertisementsBySport(@Param('sport') sport: string): Promise<Advertisement[]> {
        return this.advertisementsService.getAdvertisementsBySport(sport);
    }

    @Get('role/:role')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على إعلانات دور معين' })
    @ApiResponse({ status: 200, description: 'تم جلب إعلانات الدور بنجاح' })
    async getAdvertisementsByRole(@Param('role') role: string): Promise<Advertisement[]> {
        return this.advertisementsService.getAdvertisementsByRole(role);
    }

    @Post(':id/click')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'زيادة عدد النقرات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد النقرات بنجاح' })
    async incrementClicks(@Param('id') id: string): Promise<Advertisement> {
        return this.advertisementsService.incrementClicks(+id);
    }

    @Post(':id/impression')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'زيادة عدد المشاهدات' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد المشاهدات بنجاح' })
    async incrementImpressions(@Param('id') id: string): Promise<Advertisement> {
        return this.advertisementsService.incrementImpressions(+id);
    }

} 