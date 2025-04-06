import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { JobsService } from './jobs.service';
import { Job } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController extends BaseController<Job> {
    constructor(private readonly jobsService: JobsService) {
        super(jobsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get job profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return job profile.' })
    async getJobProfile(@Param('id', ParseIntPipe) id: number) {
        return this.jobsService.getJobProfile(id);
    }

    @Get('company/:companyId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get company jobs' })
    @ApiResponse({ status: 200, description: 'Return company jobs.' })
    async getCompanyJobs(@Param('companyId', ParseIntPipe) companyId: number) {
        return this.jobsService.getCompanyJobs(companyId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new job' })
    @ApiResponse({ status: 201, description: 'The job has been successfully created.' })
    async create(@Body() createJobDto: CreateJobDto) {
        return this.jobsService.create(createJobDto);
    }

} 