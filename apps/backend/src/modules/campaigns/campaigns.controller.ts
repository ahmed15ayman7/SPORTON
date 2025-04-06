import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign, CampaignAnalytics, Advertisement, CampaignStatus } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController } from '@/common/controllers/base.controller';
@ApiTags('الحملات التسويقية')
@Controller('campaigns')
export class CampaignsController {
    constructor(private readonly campaignsService: CampaignsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء حملة تسويقية جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الحملة بنجاح' })
    async create(@Body() createCampaignDto: CreateCampaignDto): Promise<Campaign> {
        return this.campaignsService.create(createCampaignDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الحملات التسويقية' })
    @ApiResponse({ status: 200, description: 'تم جلب الحملات بنجاح' })
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<Campaign>> {
        return this.campaignsService.findAll(search);
    }

    @Get('active')
    @ApiOperation({ summary: 'الحصول على الحملات النشطة' })
    @ApiResponse({ status: 200, description: 'تم جلب الحملات النشطة بنجاح' })
    async getActiveCampaigns(): Promise<Campaign[]> {
        return this.campaignsService.getActiveCampaigns();
    }

    @Get('profile/:id')
    @ApiOperation({ summary: 'الحصول على تفاصيل الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الحملة بنجاح' })
    async getCampaignProfile(@Param('id') id: number): Promise<Campaign> {
        return this.campaignsService.getCampaignProfile(+id);
    }

    @Get(':id/analytics')
    @ApiOperation({ summary: 'الحصول على تحليلات الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب تحليلات الحملة بنجاح' })
    async getCampaignAnalytics(@Param('id') id: number): Promise<CampaignAnalytics | null> {
        const analytics = await this.campaignsService.getCampaignAnalytics(+id);
        return analytics || null;
    }

    @Get(':id/budget')
    @ApiOperation({ summary: 'الحصول على ميزانية الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب ميزانية الحملة بنجاح' })
    async getCampaignBudget(@Param('id') id: number): Promise<number> {
        return this.campaignsService.getCampaignBudget(+id);
    }

    @Get(':id/advertisements')
    @ApiOperation({ summary: 'الحصول على إعلانات الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب إعلانات الحملة بنجاح' })
    async getCampaignAdvertisements(@Param('id') id: number): Promise<Advertisement[]> {
        return this.campaignsService.getCampaignAdvertisements(+id);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة الحملة' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة الحملة بنجاح' })
    async updateCampaignStatus(@Param('id') id: number, @Body('status') status: CampaignStatus): Promise<Campaign> {
        return this.campaignsService.updateCampaignStatus(+id, status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث الحملة' })
    @ApiResponse({ status: 200, description: 'تم تحديث الحملة بنجاح' })
    async update(@Param('id') id: number, @Body() updateCampaignDto: UpdateCampaignDto): Promise<Campaign> {
        return this.campaignsService.update(+id, updateCampaignDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف الحملة' })
    @ApiResponse({ status: 200, description: 'تم حذف الحملة بنجاح' })
    async remove(@Param('id') id: number): Promise<Campaign> {
        return this.campaignsService.remove(+id);
    }
} 