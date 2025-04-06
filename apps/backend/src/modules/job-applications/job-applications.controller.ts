import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { JobApplicationsService } from './job-applications.service';
import { JobApplication } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';

@ApiTags('job-applications')
@Controller('job-applications')
export class JobApplicationsController extends BaseController<JobApplication> {
    constructor(private readonly jobApplicationsService: JobApplicationsService) {
        super(jobApplicationsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get job application profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return job application profile.' })
    async getJobApplicationProfile(@Param('id', ParseIntPipe) id: number) {
        return this.jobApplicationsService.getJobApplicationProfile(id);
    }

    @Get('job/:jobId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get job applications' })
    @ApiResponse({ status: 200, description: 'Return job applications.' })
    async getJobApplications(@Param('jobId', ParseIntPipe) jobId: number) {
        return this.jobApplicationsService.getJobApplications(jobId);
    }

    @Get('user/:applicantId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user applications' })
    @ApiResponse({ status: 200, description: 'Return user applications.' })
    async getUserApplications(@Param('applicantId', ParseIntPipe) applicantId: number) {
        return this.jobApplicationsService.getUserApplications(applicantId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new job application' })
    @ApiResponse({ status: 201, description: 'The job application has been successfully created.' })
    async create(@Body() createJobApplicationDto: CreateJobApplicationDto) {
        return this.jobApplicationsService.create(createJobApplicationDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a job application' })
    @ApiResponse({ status: 200, description: 'The job application has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateJobApplicationDto: UpdateJobApplicationDto,
    ) {
        return this.jobApplicationsService.update(id, updateJobApplicationDto);
    }
} 