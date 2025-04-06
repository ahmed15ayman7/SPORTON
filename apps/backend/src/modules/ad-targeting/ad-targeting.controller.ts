import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdTargetingService } from './ad-targeting.service';
import { CreateAdTargetingDto } from './dto/create-ad-targeting.dto';
import { UpdateAdTargetingDto } from './dto/update-ad-targeting.dto';
import { AdTargeting } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController } from '@/common/controllers/base.controller';
@ApiTags('استهداف الإعلانات')
@Controller('ad-targeting')
export class AdTargetingController extends BaseController<AdTargeting> {
    constructor(private readonly adTargetingService: AdTargetingService) {
        super(adTargetingService);
    }

    @Post()
    @ApiOperation({ summary: 'إضافة استهداف إعلان جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة استهداف الإعلان بنجاح' })
    async create(@Body() createAdTargetingDto: CreateAdTargetingDto): Promise<AdTargeting> {
        return this.adTargetingService.create(createAdTargetingDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع استهدافات الإعلانات' })
    @ApiResponse({ status: 200, description: 'تم جلب استهدافات الإعلانات بنجاح' })
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<AdTargeting>> {
        return this.adTargetingService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل استهداف إعلان معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل استهداف الإعلان بنجاح' })
    async findOne(@Param('id') id: number): Promise<AdTargeting> {
        return this.adTargetingService.getTargetingProfile(+id);
    }

    @Get('ad/:adId')
    @ApiOperation({ summary: 'الحصول على جميع استهدافات الإعلانات لإعلان معين' })
    @ApiResponse({ status: 200, description: 'تم جلب استهدافات الإعلانات بنجاح' })
    async getAdTargeting(@Param('adId') adId: number): Promise<AdTargeting[]> {
        return this.adTargetingService.getAdTargeting(+adId);
    }

    @Get('interests')
    @ApiOperation({ summary: 'الحصول على جميع استهدافات الإعلانات حسب الاهتمامات' })
    @ApiResponse({ status: 200, description: 'تم جلب استهدافات الإعلانات بنجاح' })
    async getTargetingByInterests(@Query('interests') interests: string): Promise<AdTargeting[]> {
        return this.adTargetingService.getTargetingByInterests(interests.split(','));
    }

    @Get('behaviors')
    @ApiOperation({ summary: 'الحصول على جميع استهدافات الإعلانات حسب السلوكيات' })
    @ApiResponse({ status: 200, description: 'تم جلب استهدافات الإعلانات بنجاح' })
    async getTargetingByBehaviors(@Query('behaviors') behaviors: string): Promise<AdTargeting[]> {
        return this.adTargetingService.getTargetingByBehaviors(behaviors.split(','));
    }

    @Get(':id/performance')
    @ApiOperation({ summary: 'الحصول على أداء استهداف إعلان معين' })
    @ApiResponse({ status: 200, description: 'تم جلب أداء استهداف الإعلان بنجاح' })
    async getTargetingPerformance(@Param('id') id: number): Promise<AdTargeting> {
        return this.adTargetingService.getTargetingPerformance(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات استهداف إعلان معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات استهداف الإعلان بنجاح' })
    async update(
        @Param('id') id: number,
        @Body() updateAdTargetingDto: UpdateAdTargetingDto,
    ): Promise<AdTargeting> {
        return this.adTargetingService.update(+id, updateAdTargetingDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف استهداف إعلان معين' })
    @ApiResponse({ status: 200, description: 'تم حذف استهداف الإعلان بنجاح' })
    async remove(@Param('id') id: number): Promise<AdTargeting> {
        return this.adTargetingService.remove(+id);
    }
} 