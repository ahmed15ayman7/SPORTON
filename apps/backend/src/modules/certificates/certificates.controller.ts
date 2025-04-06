import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { CertificatesService } from './certificates.service';
import { Certificate } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@ApiTags('certificates')
@Controller('certificates')
export class CertificatesController extends BaseController<Certificate> {
    constructor(private readonly certificatesService: CertificatesService) {
        super(certificatesService);
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

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new certificate' })
    @ApiResponse({ status: 201, description: 'The certificate has been successfully created.' })
    async create(@Body() createCertificateDto: CreateCertificateDto) {
        return this.certificatesService.create(createCertificateDto);
    }

} 