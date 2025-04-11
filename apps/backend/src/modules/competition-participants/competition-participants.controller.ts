import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CompetitionParticipantsService } from './competition-participants.service';
import { CreateCompetitionParticipantDto } from '../../dtos/CompetitionParticipant.create.dto';
import { UpdateCompetitionParticipantDto } from '../../dtos/CompetitionParticipant.update.dto';
import { CompetitionParticipant } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('مشاركي المسابقات')
@Controller('competition-participants')
export class CompetitionParticipantsController extends BaseController<CompetitionParticipant> {
    constructor(private readonly competitionParticipantsService: CompetitionParticipantsService) {
        super(competitionParticipantsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة', 'create', null, CreateCompetitionParticipantDto, "مشاركي المسابقات")
    async create(@Body() createCompetitionParticipantDto: CreateCompetitionParticipantDto): Promise<CompetitionParticipant> {
        return this.competitionParticipantsService.create(createCompetitionParticipantDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "مشاركي المسابقات")
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<CompetitionParticipant>> {
        return this.competitionParticipantsService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "مشاركي المسابقات")
    findOne(@Param('id') id: number): Promise<CompetitionParticipant> {
        return this.competitionParticipantsService.findOne(+id);
    }


    @Get('competition/:competitionId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على جميع المشاركين في مسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب المشاركين بنجاح' })
    getCompetitionParticipants(@Param('competitionId') competitionId: string): Promise<CompetitionParticipant[]> {
        return this.competitionParticipantsService.getCompetitionParticipants(+competitionId);
    }

    @Get('user/:participantId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على جميع مشاركات مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب المشاركات بنجاح' })
    getUserParticipations(@Param('participantId') participantId: string): Promise<CompetitionParticipant[]> {
        return this.competitionParticipantsService.getUserParticipations(+participantId);
    }

    @Get('competition/:competitionId/status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على المشاركين في مسابقة معينة حسب الحالة' })
    @ApiResponse({ status: 200, description: 'تم جلب المشاركين بنجاح' })
    getParticipantsByStatus(
        @Param('competitionId') competitionId: string,
        @Param('status') status: string,
    ): Promise<CompetitionParticipant[]> {
        return this.competitionParticipantsService.getParticipantsByStatus(+competitionId, status);
    }

    @Get('competition/:competitionId/standings')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على ترتيب المشاركين في مسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الترتيب بنجاح' })
    getCompetitionStandings(@Param('competitionId') competitionId: string): Promise<CompetitionParticipant[]> {
        return this.competitionParticipantsService.getCompetitionStandings(+competitionId);
    }

    @Patch(':id/rank')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تحديث ترتيب مشارك معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث الترتيب بنجاح' })
    updateRank(
        @Param('id') id: string,
        @Body('rank') rank: number,
    ): Promise<CompetitionParticipant> {
        return this.competitionParticipantsService.updateParticipantRank(+id, rank);
    }

    @Patch(':id/score')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تحديث درجة مشارك معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث الدرجة بنجاح' })
    updateScore(
        @Param('id') id: string,
        @Body('score') score: number,
    ): Promise<CompetitionParticipant> {
        return this.competitionParticipantsService.updateParticipantScore(+id, score);
    }

} 