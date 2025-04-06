import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompetitionParticipantsService } from './competition-participants.service';
import { CreateCompetitionParticipantDto } from './dto/create-competition-participant.dto';
import { UpdateCompetitionParticipantDto } from './dto/update-competition-participant.dto';
import { CompetitionParticipant } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('مشاركي المسابقات')
@Controller('competition-participants')
export class CompetitionParticipantsController {
    constructor(private readonly competitionParticipantsService: CompetitionParticipantsService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة مشارك جديد في المسابقة' })
    @ApiResponse({ status: 201, description: 'تم إضافة المشارك بنجاح' })
    async create(@Body() createCompetitionParticipantDto: CreateCompetitionParticipantDto): Promise<CompetitionParticipant> {
        return this.competitionParticipantsService.create(createCompetitionParticipantDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع المشاركين' })
    @ApiResponse({ status: 200, description: 'تم جلب المشاركين بنجاح' })
    findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<CompetitionParticipant>> {
        return this.competitionParticipantsService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل مشارك معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل المشارك بنجاح' })
    findOne(@Param('id') id: string): Promise<CompetitionParticipant> {
        return this.competitionParticipantsService.getCompetitionParticipantProfile(+id);
    }

    @Get('competition/:competitionId')
    @ApiOperation({ summary: 'الحصول على جميع المشاركين في مسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب المشاركين بنجاح' })
    getCompetitionParticipants(@Param('competitionId') competitionId: string): Promise<CompetitionParticipant[]> {
        return this.competitionParticipantsService.getCompetitionParticipants(+competitionId);
    }

    @Get('user/:participantId')
    @ApiOperation({ summary: 'الحصول على جميع مشاركات مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب المشاركات بنجاح' })
    getUserParticipations(@Param('participantId') participantId: string): Promise<CompetitionParticipant[]> {
        return this.competitionParticipantsService.getUserParticipations(+participantId);
    }

    @Get('competition/:competitionId/status/:status')
    @ApiOperation({ summary: 'الحصول على المشاركين في مسابقة معينة حسب الحالة' })
    @ApiResponse({ status: 200, description: 'تم جلب المشاركين بنجاح' })
    getParticipantsByStatus(
        @Param('competitionId') competitionId: string,
        @Param('status') status: string,
    ): Promise<CompetitionParticipant[]> {
        return this.competitionParticipantsService.getParticipantsByStatus(+competitionId, status);
    }

    @Get('competition/:competitionId/standings')
    @ApiOperation({ summary: 'الحصول على ترتيب المشاركين في مسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الترتيب بنجاح' })
    getCompetitionStandings(@Param('competitionId') competitionId: string): Promise<CompetitionParticipant[]> {
        return this.competitionParticipantsService.getCompetitionStandings(+competitionId);
    }

    @Patch(':id/rank')
    @ApiOperation({ summary: 'تحديث ترتيب مشارك معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث الترتيب بنجاح' })
    updateRank(
        @Param('id') id: string,
        @Body('rank') rank: number,
    ): Promise<CompetitionParticipant> {
        return this.competitionParticipantsService.updateParticipantRank(+id, rank);
    }

    @Patch(':id/score')
    @ApiOperation({ summary: 'تحديث درجة مشارك معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث الدرجة بنجاح' })
    updateScore(
        @Param('id') id: string,
        @Body('score') score: number,
    ): Promise<CompetitionParticipant> {
        return this.competitionParticipantsService.updateParticipantScore(+id, score);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات مشارك معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث البيانات بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateCompetitionParticipantDto: UpdateCompetitionParticipantDto,
    ): Promise<CompetitionParticipant> {
        return this.competitionParticipantsService.update(+id, updateCompetitionParticipantDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف مشارك معين' })
    @ApiResponse({ status: 200, description: 'تم حذف المشارك بنجاح' })
    remove(@Param('id') id: string): Promise<CompetitionParticipant> {
        return this.competitionParticipantsService.remove(+id);
    }
} 