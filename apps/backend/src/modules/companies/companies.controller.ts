import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { CompaniesService } from './companies.service';
import { Company } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController extends BaseController<Company> {
    constructor(private readonly companiesService: CompaniesService) {
        super(companiesService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get company profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return company profile.' })
    async getCompanyProfile(@Param('id', ParseIntPipe) id: number) {
        return this.companiesService.getCompanyProfile(id);
    }

    @Get(':id/products')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get company products' })
    @ApiResponse({ status: 200, description: 'Return company products.' })
    async getCompanyProducts(@Param('id', ParseIntPipe) id: number) {
        return this.companiesService.getCompanyProducts(id);
    }

    @Get(':id/sponsorships')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get company sponsorships' })
    @ApiResponse({ status: 200, description: 'Return company sponsorships.' })
    async getCompanySponsorships(@Param('id', ParseIntPipe) id: number) {
        return this.companiesService.getCompanySponsorships(id);
    }

    @Get(':id/jobs')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get company jobs' })
    @ApiResponse({ status: 200, description: 'Return company jobs.' })
    async getCompanyJobs(@Param('id', ParseIntPipe) id: number) {
        return this.companiesService.getCompanyJobs(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new company' })
    @ApiResponse({ status: 201, description: 'The company has been successfully created.' })
    async create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companiesService.create(createCompanyDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a company' })
    @ApiResponse({ status: 200, description: 'The company has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCompanyDto: UpdateCompanyDto,
    ) {
        return this.companiesService.update(id, updateCompanyDto);
    }
} 