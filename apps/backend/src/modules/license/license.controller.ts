import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LicenseService } from './license.service';
import { CreateLicenseDto } from '@/dtos/License.create.dto';
import { UpdateLicenseDto } from '@/dtos/License.update.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { License } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiTags('التراخيص')
@Controller('licenses')
export class LicenseController extends BaseController<License> {
    constructor(private readonly licenseService: LicenseService) {
        super(licenseService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء ترخيص جديد', 'create', CreateLicenseDto, null, "التراخيص")
    create(@Body() createLicenseDto: CreateLicenseDto) {
        return this.licenseService.create(createLicenseDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث ترخيص محدد', 'update', UpdateLicenseDto, null, "التراخيص")
    update(@Param('id') id: number, @Body() data: any) {
        return this.licenseService.update(+id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع التراخيص', 'none', null, null, "التراخيص")
    async findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<License>> {
        return this.licenseService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على ترخيص محدد', 'none', null, null, "التراخيص")
    async findOne(@Param('id') id: number): Promise<License> {
        return this.licenseService.findOne(+id);
    }

    @Get('coach/:coachId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تراخيص مستخدم محدد', 'none', null, null, "التراخيص")
    findByCoach(@Param('coachId') coachId: string) {
        return this.licenseService.findByCoach(+coachId);
    }

    @Get('name/:name')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تراخيص باسم محدد', 'none', null, null, "التراخيص")
    findByName(@Param('name') name: string) {
        return this.licenseService.findByName(name);
    }

} 