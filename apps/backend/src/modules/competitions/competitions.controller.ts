import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { Competition, CompetitionStatus, Sport } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController } from '@/common/controllers/base.controller';

@Controller('competitions')
export class CompetitionsController extends BaseController<Competition> {
    constructor(private readonly competitionsService: CompetitionsService) {
        super(competitionsService);
    }

    @Get()
    async getCompetitions(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Competition>> {
        return this.competitionsService.getCompetitions(paginationDto);
    }

    @Get(':id')
    async getCompetitionById(@Param('id') id: string): Promise<Competition> {
        return this.competitionsService.getCompetitionById(parseInt(id));
    }

    @Get('title/:title')
    async getCompetitionByTitle(@Param('title') title: string): Promise<Competition> {
        return this.competitionsService.getCompetitionByTitle(title);
    }

    @Get('sport/:sport')
    async getCompetitionBySport(@Param('sport') sport: string): Promise<Competition[]> {
        return this.competitionsService.getCompetitionBySport(sport as Sport);
    }

    @Get('status/:status')
    async getCompetitionByStatus(@Param('status') status: string): Promise<Competition[]> {
        return this.competitionsService.getCompetitionByStatus(status as CompetitionStatus);
    }
}
