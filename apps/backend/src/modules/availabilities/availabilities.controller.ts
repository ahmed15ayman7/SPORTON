import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { AvailabilitiesService } from './availabilities.service';
import { Availability, AvailabilityStatus } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateAvailabilityDto } from '../../dtos/Availability.create.dto';
import { UpdateAvailabilityDto } from '../../dtos/Availability.update.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
@ApiTags('availabilities')
@Controller('availabilities')
export class AvailabilitiesController extends BaseController<Availability> {
    constructor(private readonly availabilitiesService: AvailabilitiesService) {
        super(availabilitiesService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateAvailabilityDto, "التوفر")
    async create(@Body() data: any): Promise<Availability> {
        return this.availabilitiesService.create(data);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateAvailabilityDto, null, "التوفر")
    async update(@Param('id') id: number, @Body() data: any): Promise<Availability> {
        return this.availabilitiesService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "التوفر")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Availability>> {
        return this.availabilitiesService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "التوفر")
    async findOne(@Param('id') id: number): Promise<Availability> {
        return this.availabilitiesService.findOne(id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على ملف التوفر مع جميع العلاقات' })
    @ApiResponse({ status: 200, description: 'إرجاع ملف التوفر.' })
    async getAvailabilityProfile(@Param('id', ParseIntPipe) id: number): Promise<Availability> {
        return this.availabilitiesService.getAvailabilityProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على توفر المستخدم' })
    @ApiResponse({ status: 200, description: 'إرجاع توفر المستخدم.' })
    async getUserAvailability(@Param('userId', ParseIntPipe) userId: number): Promise<Availability> {
        return this.availabilitiesService.getUserAvailability(userId);
    }

    @Get('available')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على المستخدمين المتاحين' })
    @ApiResponse({ status: 200, description: 'إرجاع قائمة المستخدمين المتاحين.' })
    async getAvailableUsers(): Promise<Availability[]> {
        return this.availabilitiesService.getAvailableUsers();
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على المستخدمين حسب حالة التوفر' })
    @ApiResponse({ status: 200, description: 'إرجاع قائمة المستخدمين حسب حالة التوفر.' })
    async getUsersByStatus(@Param('status') status: AvailabilityStatus): Promise<Availability[]> {
        return this.availabilitiesService.getUsersByStatus(status);
    }


} 