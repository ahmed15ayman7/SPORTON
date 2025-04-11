import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from '@/dtos/Facility.create.dto';
import { UpdateFacilityDto } from '@/dtos/Facility.update.dto';
import { Facility, FacilityType } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('المنشآت')
@Controller('facilities')
export class FacilityController extends BaseController<Facility> {
    constructor(private readonly facilityService: FacilityService) {
        super(facilityService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء منشأة جديدة', 'create', CreateFacilityDto, null, "المنشآت")
    create(@Body() createFacilityDto: CreateFacilityDto): Promise<Facility> {
        return this.facilityService.create(createFacilityDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث منشأة محددة', 'update', UpdateFacilityDto, null, "المنشآت")
    update(@Param('id') id: number, @Body() data: any): Promise<Facility> {
        return this.facilityService.update(+id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المنشآت', 'none', null, null, "المنشآت")
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<Facility>> {
        return this.facilityService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على منشأة محددة', 'none', null, null, "المنشآت")
    findOne(@Param('id') id: number): Promise<Facility> {
        return this.facilityService.findOne(+id);
    }

    @Get('type/:type')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على منشآت بنوع محدد', 'none', null, null, "المنشآت")
    findByType(@Param('type') type: string): Promise<Facility[]> {
        return this.facilityService.findByType(type as FacilityType);
    }


} 