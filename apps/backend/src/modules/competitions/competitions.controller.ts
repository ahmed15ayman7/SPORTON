import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { Competition, CompetitionStatus, Sport } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { CreateCompetitionDto } from '@/dtos/Competition.create.dto';
import { UpdateCompetitionDto } from '@/dtos/Competition.update.dto';
@Controller('competitions')
export class CompetitionsController extends BaseController<Competition> {
    constructor(private readonly competitionsService: CompetitionsService) {
        super(competitionsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateCompetitionDto, "المسابقات")
    async create(@Body() createCompetitionDto: CreateCompetitionDto): Promise<Competition> {
        return this.competitionsService.create(createCompetitionDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateCompetitionDto, null, "المسابقات")
    async update(@Param('id') id: number, @Body() data: any): Promise<Competition> {
        return this.competitionsService.update(+id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "المسابقات")
    async getCompetitions(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Competition>> {
        return this.competitionsService.getCompetitions(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "المسابقات")
    async getCompetitionById(@Param('id') id: string): Promise<Competition> {
        return this.competitionsService.getCompetitionById(parseInt(id));
    }

    @Get('title/:title')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('البحث بالعنوان', 'none', null, null, "المسابقات")
    async getCompetitionByTitle(@Param('title') title: string): Promise<Competition> {
        return this.competitionsService.getCompetitionByTitle(title);
    }

    @Get('sport/:sport')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('البحث بالرياضة', 'none', null, null, "المسابقات")
    async getCompetitionBySport(@Param('sport') sport: string): Promise<Competition[]> {
        return this.competitionsService.getCompetitionBySport(sport as Sport);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('البحث بالحالة', 'none', null, null, "المسابقات")
    async getCompetitionByStatus(@Param('status') status: string): Promise<Competition[]> {
        return this.competitionsService.getCompetitionByStatus(status as CompetitionStatus);
    }
}
