import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from '../../dtos/Campaign.create.dto';
import { UpdateCampaignDto } from '../../dtos/Campaign.update.dto';
import { Campaign, CampaignAnalytics, Advertisement, CampaignStatus } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('الحملات التسويقية')
@Controller('campaigns')
export class CampaignsController extends BaseController<Campaign> {
    constructor(private readonly campaignsService: CampaignsService) {
        super(campaignsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateCampaignDto, "الحملات التسويقية")
    async create(@Body() createCampaignDto: CreateCampaignDto): Promise<Campaign> {
        return this.campaignsService.create(createCampaignDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateCampaignDto, null, "الحملات التسويقية")
    async update(@Param('id') id: number, @Body() data: any): Promise<Campaign> {
        return this.campaignsService.update(+id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "الحملات التسويقية")
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<Campaign>> {
        return this.campaignsService.findAll(search);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "الحملات التسويقية")
    async findOne(@Param('id') id: number): Promise<Campaign> {
        return this.campaignsService.findOne(+id);
    }

    @Get('active')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على الحملات النشطة' })
    @ApiResponse({ status: 200, description: 'تم جلب الحملات النشطة بنجاح' })
    async getActiveCampaigns(): Promise<Campaign[]> {
        return this.campaignsService.getActiveCampaigns();
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تفاصيل الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الحملة بنجاح' })
    async getCampaignProfile(@Param('id') id: number): Promise<Campaign> {
        return this.campaignsService.getCampaignProfile(+id);
    }

    @Get(':id/analytics')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تحليلات الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب تحليلات الحملة بنجاح' })
    async getCampaignAnalytics(@Param('id') id: number): Promise<CampaignAnalytics | null> {
        const analytics = await this.campaignsService.getCampaignAnalytics(+id);
        return analytics || null;
    }

    @Get(':id/budget')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على ميزانية الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب ميزانية الحملة بنجاح' })
    async getCampaignBudget(@Param('id') id: number): Promise<number> {
        return this.campaignsService.getCampaignBudget(+id);
    }

    @Get(':id/advertisements')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على إعلانات الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب إعلانات الحملة بنجاح' })
    async getCampaignAdvertisements(@Param('id') id: number): Promise<Advertisement[]> {
        return this.campaignsService.getCampaignAdvertisements(+id);
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تحديث حالة الحملة' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة الحملة بنجاح' })
    async updateCampaignStatus(@Param('id') id: number, @Body('status') status: CampaignStatus): Promise<Campaign> {
        return this.campaignsService.updateCampaignStatus(+id, status);
    }

} 