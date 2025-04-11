import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CompetitionRoundsService } from './competition-rounds.service';
import { CreateCompetitionRoundDto } from '../../dtos/CompetitionRound.create.dto';
import { UpdateCompetitionRoundDto } from '../../dtos/CompetitionRound.update.dto';
import { CompetitionRound } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('جولات المسابقات')
@Controller('competition-rounds')
export class CompetitionRoundsController extends BaseController<CompetitionRound> {
    constructor(private readonly competitionRoundsService: CompetitionRoundsService) {
        super(competitionRoundsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة', 'create', null, CreateCompetitionRoundDto, "جولات المسابقات")
    create(@Body() createCompetitionRoundDto: CreateCompetitionRoundDto): Promise<CompetitionRound> {
        return this.competitionRoundsService.create(createCompetitionRoundDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateCompetitionRoundDto, null, "جولات المسابقات")
    update(@Param('id') id: number, @Body() updateCompetitionRoundDto: UpdateCompetitionRoundDto): Promise<CompetitionRound> {
        return this.competitionRoundsService.update(+id, updateCompetitionRoundDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "جولات المسابقات")

    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<CompetitionRound>> {
        return this.competitionRoundsService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "جولات المسابقات")
    findOne(@Param('id') id: number): Promise<CompetitionRound> {
        return this.competitionRoundsService.findOne(+id);
    }

    @Get('competition/:competitionId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على جميع جولات مسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجولات بنجاح' })
    getCompetitionRounds(@Param('competitionId') competitionId: string): Promise<CompetitionRound[]> {
        return this.competitionRoundsService.getCompetitionRounds(+competitionId);
    }

    @Get('competition/:competitionId/current')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على الجولة الحالية لمسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجولة الحالية بنجاح' })
    getCurrentRound(@Param('competitionId') competitionId: string): Promise<CompetitionRound | null> {
        return this.competitionRoundsService.getCurrentRound(+competitionId);
    }

    @Get('competition/:competitionId/upcoming')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على الجولات القادمة لمسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجولات القادمة بنجاح' })
    getUpcomingRounds(@Param('competitionId') competitionId: string): Promise<CompetitionRound[]> {
        return this.competitionRoundsService.getUpcomingRounds(+competitionId);
    }

    @Get('competition/:competitionId/completed')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على الجولات المكتملة لمسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجولات المكتملة بنجاح' })
    getCompletedRounds(@Param('competitionId') competitionId: string): Promise<CompetitionRound[]> {
        return this.competitionRoundsService.getCompletedRounds(+competitionId);
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تحديث حالة جولة معينة' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة الجولة بنجاح' })
    updateStatus(
        @Param('id') id: string,
        @Body('status') status: string,
    ): Promise<CompetitionRound> {
        return this.competitionRoundsService.updateRoundStatus(+id, status);
    }

} 