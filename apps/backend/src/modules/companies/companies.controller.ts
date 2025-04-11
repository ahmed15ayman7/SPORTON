import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { CompaniesService } from './companies.service';
import { Company, Product, Sponsorship, Job } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateCompanyDto } from '../../dtos/Company.create.dto';
import { UpdateCompanyDto } from '../../dtos/Company.update.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
@ApiTags('companies')
@Controller('companies')
export class CompaniesController extends BaseController<Company> {
    constructor(private readonly companiesService: CompaniesService) {
        super(companiesService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateCompanyDto, "الشركات")
    async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
        return this.companiesService.create(createCompanyDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateCompanyDto, null, "الشركات")
    async update(@Param('id') id: number, @Body() data: any): Promise<Company> {
        return this.companiesService.update(+id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "الشركات")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Company>> {
        return this.companiesService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "الشركات")
    async findOne(@Param('id') id: number): Promise<Company> {
        return this.companiesService.findOne(+id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get company profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return company profile.' })
    async getCompanyProfile(@Param('id', ParseIntPipe) id: number): Promise<Company> {
        return this.companiesService.getCompanyProfile(id);
    }

    @Get(':id/products')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get company products' })
    @ApiResponse({ status: 200, description: 'Return company products.' })
    async getCompanyProducts(@Param('id', ParseIntPipe) id: number): Promise<Product[]> {
        return this.companiesService.getCompanyProducts(id);
    }

    @Get(':id/sponsorships')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get company sponsorships' })
    @ApiResponse({ status: 200, description: 'Return company sponsorships.' })
    async getCompanySponsorships(@Param('id', ParseIntPipe) id: number): Promise<Sponsorship[]> {
        return this.companiesService.getCompanySponsorships(id);
    }

    @Get(':id/jobs')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get company jobs' })
    @ApiResponse({ status: 200, description: 'Return company jobs.' })
    async getCompanyJobs(@Param('id', ParseIntPipe) id: number): Promise<Job[]> {
        return this.companiesService.getCompanyJobs(id);
    }

} 