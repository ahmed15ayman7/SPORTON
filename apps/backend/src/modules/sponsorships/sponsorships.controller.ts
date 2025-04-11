import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { SponsorshipsService } from './sponsorships.service';
import { Sponsorship } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateSponsorshipDto } from '@/dtos/Sponsorship.create.dto';
import { UpdateSponsorshipDto } from '@/dtos/Sponsorship.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('sponsorships')
@Controller('sponsorships')
export class SponsorshipsController extends BaseController<Sponsorship> {
    constructor(private readonly sponsorshipsService: SponsorshipsService) {
        super(sponsorshipsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء تعاون جديد', 'none', null, CreateSponsorshipDto, 'التعاونات')
    create(@Body() createSponsorshipDto: CreateSponsorshipDto) {
        return this.sponsorshipsService.create(createSponsorshipDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث تعاون محدد', 'none', UpdateSponsorshipDto, null, 'التعاونات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.sponsorshipsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع التعاونات', 'none', null, null, 'التعاونات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto) {
        return this.sponsorshipsService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تعاون محدد', 'none', null, null, 'التعاونات')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.sponsorshipsService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تعاون معين بالتفاصيل', 'none', null, null, 'التعاونات')
    async getSponsorshipProfile(@Param('id', ParseIntPipe) id: number) {
        return this.sponsorshipsService.getSponsorshipProfile(id);
    }

    @Get('sponsor/:sponsorId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تعاونات المساهم المحدد', 'none', null, null, 'التعاونات')
    async getSponsorSponsorships(@Param('sponsorId', ParseIntPipe) sponsorId: number) {
        return this.sponsorshipsService.getSponsorSponsorships(sponsorId);
    }

    @Get('athlete/:athleteId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تعاونات المساهم المحدد', 'none', null, null, 'التعاونات')
    async getAthleteSponsorships(@Param('athleteId', ParseIntPipe) athleteId: number) {
        return this.sponsorshipsService.getAthleteSponsorships(athleteId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف تعاون محدد', 'none', null, null, 'التعاونات')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.sponsorshipsService.remove(id);
    }
} 