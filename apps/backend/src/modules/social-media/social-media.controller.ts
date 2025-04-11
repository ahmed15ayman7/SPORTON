import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SocialMediaService } from './social-media.service';
import { CreateSocialMediaDto } from '@/dtos/SocialMedia.create.dto';
import { UpdateSocialMediaDto } from '@/dtos/SocialMedia.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { SocialMedia } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('حسابات التواصل الاجتماعي')
@Controller('social-media')
export class SocialMediaController extends BaseController<SocialMedia> {
    constructor(private readonly socialMediaService: SocialMediaService) {
        super(socialMediaService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء حساب تواصل اجتماعي جديد', 'none', null, CreateSocialMediaDto, 'حسابات التواصل الاجتماعي')
    create(@Body() createSocialMediaDto: CreateSocialMediaDto) {
        return this.socialMediaService.create(createSocialMediaDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث حساب تواصل اجتماعي', 'none', UpdateSocialMediaDto, null, 'حسابات التواصل الاجتماعي')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSocialMediaDto: UpdateSocialMediaDto) {
        return this.socialMediaService.update(id, updateSocialMediaDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع حسابات التواصل الاجتماعي', 'none', null, null, 'حسابات التواصل الاجتماعي')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto) {
        return this.socialMediaService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على حساب تواصل اجتماعي محدد', 'none', null, null, 'حسابات التواصل الاجتماعي')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.socialMediaService.findOne(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على حسابات تواصل اجتماعي لمستخدم محدد', 'none', null, null, 'حسابات التواصل الاجتماعي')
    findByUser(@Param('userId') userId: string) {
        return this.socialMediaService.findByUser(+userId);
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف حساب تواصل اجتماعي', 'none', null, null, 'حسابات التواصل الاجتماعي')
    remove(@Param('id') id: string) {
        return this.socialMediaService.remove(+id);
    }
} 