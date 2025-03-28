import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@ApiTags('الحملات التسويقية')
@Controller('campaigns')
export class CampaignsController {
    constructor(private readonly campaignsService: CampaignsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء حملة تسويقية جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الحملة بنجاح' })
    create(@Body() createCampaignDto: CreateCampaignDto) {
        return this.campaignsService.create(createCampaignDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الحملات التسويقية' })
    @ApiResponse({ status: 200, description: 'تم جلب الحملات بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.campaignsService.findAll(search);
    }

    @Get('active')
    @ApiOperation({ summary: 'الحصول على الحملات النشطة' })
    @ApiResponse({ status: 200, description: 'تم جلب الحملات النشطة بنجاح' })
    getActiveCampaigns() {
        return this.campaignsService.getActiveCampaigns();
    }

    @Get('profile/:id')
    @ApiOperation({ summary: 'الحصول على تفاصيل الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الحملة بنجاح' })
    getCampaignProfile(@Param('id') id: string) {
        return this.campaignsService.getCampaignProfile(+id);
    }

    @Get(':id/analytics')
    @ApiOperation({ summary: 'الحصول على تحليلات الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب تحليلات الحملة بنجاح' })
    getCampaignAnalytics(@Param('id') id: string) {
        return this.campaignsService.getCampaignAnalytics(+id);
    }

    @Get(':id/budget')
    @ApiOperation({ summary: 'الحصول على ميزانية الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب ميزانية الحملة بنجاح' })
    getCampaignBudget(@Param('id') id: string) {
        return this.campaignsService.getCampaignBudget(+id);
    }

    @Get(':id/advertisements')
    @ApiOperation({ summary: 'الحصول على إعلانات الحملة' })
    @ApiResponse({ status: 200, description: 'تم جلب إعلانات الحملة بنجاح' })
    getCampaignAdvertisements(@Param('id') id: string) {
        return this.campaignsService.getCampaignAdvertisements(+id);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة الحملة' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة الحملة بنجاح' })
    updateCampaignStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.campaignsService.updateCampaignStatus(+id, status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث الحملة' })
    @ApiResponse({ status: 200, description: 'تم تحديث الحملة بنجاح' })
    update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
        return this.campaignsService.update(+id, updateCampaignDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف الحملة' })
    @ApiResponse({ status: 200, description: 'تم حذف الحملة بنجاح' })
    remove(@Param('id') id: string) {
        return this.campaignsService.remove(+id);
    }
} 