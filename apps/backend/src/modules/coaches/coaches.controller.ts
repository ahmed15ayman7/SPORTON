import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { CoachesService } from './coaches.service';
import { Coach } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateCoachDto } from '../../dtos/Coach.create.dto';
import { UpdateCoachDto } from '../../dtos/Coach.update.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('coaches')
@Controller('coaches')
export class CoachesController extends BaseController<Coach> {
    constructor(private readonly coachesService: CoachesService) {
        super(coachesService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get coach profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return coach profile.' })
    async getCoachProfile(@Param('id', ParseIntPipe) id: number) {
        return this.coachesService.getCoachProfile(id);
    }

    @Get(':id/trainings')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get coach trainings' })
    @ApiResponse({ status: 200, description: 'Return coach trainings.' })
    async getCoachTrainings(@Param('id', ParseIntPipe) id: number) {
        return this.coachesService.getCoachTrainings(id);
    }

    @Get(':id/achievements')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get coach achievements' })
    @ApiResponse({ status: 200, description: 'Return coach achievements.' })
    async getCoachAchievements(@Param('id', ParseIntPipe) id: number) {
        return this.coachesService.getCoachAchievements(id);
    }

    @Get(':id/licenses')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get coach licenses' })
    @ApiResponse({ status: 200, description: 'Return coach licenses.' })
    async getCoachLicenses(@Param('id', ParseIntPipe) id: number) {
        return this.coachesService.getCoachLicenses(id);
    }

    @Get(':id/teams')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get coach teams' })
    @ApiResponse({ status: 200, description: 'Return coach teams.' })
    async getCoachTeams(@Param('id', ParseIntPipe) id: number) {
        return this.coachesService.getCoachTeams(id);
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateCoachDto, "المدربين")
    @ApiOperation({ summary: 'Create a new coach' })
    @ApiResponse({ status: 201, description: 'The coach has been successfully created.' })
    async create(@Body() createCoachDto: CreateCoachDto) {
        return this.coachesService.create(createCoachDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateCoachDto, null, "المدربين")
    async update(@Param('id') id: number, @Body() data: any): Promise<Coach> {
        return this.coachesService.update(+id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "المدربين")
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<Coach>> {
        return this.coachesService.findAll(search);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "المدربين")
    async findOne(@Param('id') id: number): Promise<Coach> {
        return this.coachesService.findOne(+id);
    }
}