import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { AvailabilitiesService } from './availabilities.service';
import { Availability } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@ApiTags('availabilities')
@Controller('availabilities')
export class AvailabilitiesController extends BaseController<Availability> {
    constructor(private readonly availabilitiesService: AvailabilitiesService) {
        super(availabilitiesService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على ملف التوفر مع جميع العلاقات' })
    @ApiResponse({ status: 200, description: 'إرجاع ملف التوفر.' })
    async getAvailabilityProfile(@Param('id', ParseIntPipe) id: number) {
        return this.availabilitiesService.getAvailabilityProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على توفر المستخدم' })
    @ApiResponse({ status: 200, description: 'إرجاع توفر المستخدم.' })
    async getUserAvailability(@Param('userId', ParseIntPipe) userId: number) {
        return this.availabilitiesService.getUserAvailability(userId);
    }

    @Get('available')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على المستخدمين المتاحين' })
    @ApiResponse({ status: 200, description: 'إرجاع قائمة المستخدمين المتاحين.' })
    async getAvailableUsers() {
        return this.availabilitiesService.getAvailableUsers();
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على المستخدمين حسب حالة التوفر' })
    @ApiResponse({ status: 200, description: 'إرجاع قائمة المستخدمين حسب حالة التوفر.' })
    async getUsersByStatus(@Param('status') status: string) {
        return this.availabilitiesService.getUsersByStatus(status);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'إنشاء توفر جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء التوفر بنجاح.' })
    async create(@Body() createAvailabilityDto: CreateAvailabilityDto) {
        return this.availabilitiesService.create(createAvailabilityDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تحديث توفر موجود' })
    @ApiResponse({ status: 200, description: 'تم تحديث التوفر بنجاح.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAvailabilityDto: UpdateAvailabilityDto,
    ) {
        return this.availabilitiesService.update(id, updateAvailabilityDto);
    }
} 