import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdTargetingService } from './ad-targeting.service';
import { CreateAdTargetingDto } from '../../dtos/AdTargeting.create.dto';
import { UpdateAdTargetingDto } from '../../dtos/AdTargeting.update.dto';
import { AdTargeting } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('استهداف الإعلانات')
@Controller('ad-targeting')
export class AdTargetingController extends BaseController<AdTargeting> {
    constructor(private readonly adTargetingService: AdTargetingService) {
        super(adTargetingService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateAdTargetingDto, "استهداف الإعلانات")
    async create(@Body() data: any): Promise<AdTargeting> {
        return this.adTargetingService.create(data);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateAdTargetingDto, null, "استهداف الإعلانات")
    async update(@Param('id') id: number, @Body() data: any): Promise<AdTargeting> {
        return this.adTargetingService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "استهداف الإعلانات")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<AdTargeting>> {
        return this.adTargetingService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "استهداف الإعلانات")
    async findOne(@Param('id') id: number): Promise<AdTargeting> {
        return this.adTargetingService.findOne(id);
    }
    @Get('ad/:adId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
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

} 