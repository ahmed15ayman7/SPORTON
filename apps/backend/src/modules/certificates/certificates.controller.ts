import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { CertificatesService } from './certificates.service';
import { Certificate } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateCertificateDto } from '../../dtos/Certificate.create.dto';
import { UpdateCertificateDto } from '../../dtos/Certificate.update.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
@ApiTags('certificates')
@Controller('certificates')
export class CertificatesController extends BaseController<Certificate> {
    constructor(private readonly certificatesService: CertificatesService) {
        super(certificatesService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateCertificateDto, "الشهادات")
    async create(@Body() createCertificateDto: CreateCertificateDto): Promise<Certificate> {
        return this.certificatesService.create(createCertificateDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateCertificateDto, null, "الشهادات")
    async update(@Param('id') id: number, @Body() data: any): Promise<Certificate> {
        return this.certificatesService.update(+id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "الشهادات")
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<Certificate>> {
        return this.certificatesService.findAll(search);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "الشهادات")
    async findOne(@Param('id') id: number): Promise<Certificate> {
        return this.certificatesService.findOne(+id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get certificate profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return certificate profile.' })
    async getCertificateProfile(@Param('id', ParseIntPipe) id: number) {
        return this.certificatesService.getCertificateProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user certificates' })
    @ApiResponse({ status: 200, description: 'Return user certificates.' })
    async getUserCertificates(@Param('userId', ParseIntPipe) userId: number) {
        return this.certificatesService.getUserCertificates(userId);
    }

    @Get('verified/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user verified certificates' })
    @ApiResponse({ status: 200, description: 'Return user verified certificates.' })
    async getVerifiedCertificates(@Param('userId', ParseIntPipe) userId: number) {
        return this.certificatesService.getVerifiedCertificates(userId);
    }


} 