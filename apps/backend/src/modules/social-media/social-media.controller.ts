import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SocialMediaService } from './social-media.service';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';

@ApiTags('حسابات التواصل الاجتماعي')
@Controller('social-media')
export class SocialMediaController {
    constructor(private readonly socialMediaService: SocialMediaService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء حساب تواصل اجتماعي جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الحساب بنجاح' })
    create(@Body() createSocialMediaDto: CreateSocialMediaDto) {
        return this.socialMediaService.create(createSocialMediaDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع حسابات التواصل الاجتماعي' })
    @ApiResponse({ status: 200, description: 'تم جلب الحسابات بنجاح' })
    findAll() {
        return this.socialMediaService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على حساب تواصل اجتماعي محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الحساب بنجاح' })
    findOne(@Param('id') id: string) {
        return this.socialMediaService.findOne(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على حسابات تواصل اجتماعي لمستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب الحسابات بنجاح' })
    findByUser(@Param('userId') userId: string) {
        return this.socialMediaService.findByUser(+userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث حساب تواصل اجتماعي' })
    @ApiResponse({ status: 200, description: 'تم تحديث الحساب بنجاح' })
    update(@Param('id') id: string, @Body() updateSocialMediaDto: UpdateSocialMediaDto) {
        return this.socialMediaService.update(+id, updateSocialMediaDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف حساب تواصل اجتماعي' })
    @ApiResponse({ status: 200, description: 'تم حذف الحساب بنجاح' })
    remove(@Param('id') id: string) {
        return this.socialMediaService.remove(+id);
    }
} 