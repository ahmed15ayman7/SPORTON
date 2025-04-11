import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JobApplicationsService } from './job-applications.service';
import { JobApplication } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateJobApplicationDto } from '@/dtos/JobApplication.create.dto';
import { UpdateJobApplicationDto } from '@/dtos/JobApplication.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('job-applications')
@Controller('job-applications')
export class JobApplicationsController extends BaseController<JobApplication> {
    constructor(private readonly jobApplicationsService: JobApplicationsService) {
        super(jobApplicationsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء طلب عمل جديد', 'create', CreateJobApplicationDto, null, "طلبات العمل")
    create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
        return this.jobApplicationsService.create(createJobApplicationDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث طلب عمل محدد', 'update', UpdateJobApplicationDto, null, "طلبات العمل")
    update(@Param('id', ParseIntPipe) id: number, @Body() updateJobApplicationDto: UpdateJobApplicationDto) {
        return this.jobApplicationsService.update(id, updateJobApplicationDto);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع طلبات العمل', 'none', null, null, "طلبات العمل")
    findAll(@Query() query: PaginationDto) {
        return this.jobApplicationsService.findAll(query);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل الطلب العملي محدد', 'none', null, null, "طلبات العمل")
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.jobApplicationsService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل الطلب العملي مع جميع العلاقات', 'none', null, null, "طلبات العمل")
    async getJobApplicationProfile(@Param('id', ParseIntPipe) id: number) {
        return this.jobApplicationsService.getJobApplicationProfile(id);
    }

    @Get('job/:jobId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع طلبات العمل لوظيفة محددة', 'none', null, null, "طلبات العمل")
    async getJobApplications(@Param('jobId', ParseIntPipe) jobId: number) {
        return this.jobApplicationsService.getJobApplications(jobId);
    }

    @Get('user/:applicantId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع طلبات العمل لمستخدم محدد', 'none', null, null, "طلبات العمل")
    async getUserApplications(@Param('applicantId', ParseIntPipe) applicantId: number) {
        return this.jobApplicationsService.getUserApplications(applicantId);
    }

} 