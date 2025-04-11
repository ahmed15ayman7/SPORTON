import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { JobsService } from './jobs.service';
import { Job } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateJobDto } from '@/dtos/Job.create.dto';
import { UpdateJobDto } from '@/dtos/Job.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('jobs')
@Controller('jobs')
export class JobsController extends BaseController<Job> {
    constructor(private readonly jobsService: JobsService) {
        super(jobsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء وظيفة جديدة', 'create', CreateJobDto, null, "الوظائف")
    create(@Body() createJobDto: CreateJobDto) {
        return this.jobsService.create(createJobDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث وظيفة محددة', 'update', UpdateJobDto, null, "الوظائف")
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.jobsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الوظائف', 'none', null, null, "الوظائف")
    findAll(@Query() query: PaginationDto) {
        return this.jobsService.findAll(query);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل الوظيفة محددة', 'none', null, null, "الوظائف")
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.jobsService.findOne(id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل الوظيفة مع جميع العلاقات', 'none', null, null, "الوظائف")
    getJobProfile(@Param('id', ParseIntPipe) id: number) {
        return this.jobsService.getJobProfile(id);
    }

    @Get('company/:companyId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الوظائف المتاحة لشركة محددة', 'none', null, null, "الوظائف")
    getCompanyJobs(@Param('companyId', ParseIntPipe) companyId: number) {
        return this.jobsService.getCompanyJobs(companyId);
    }



} 