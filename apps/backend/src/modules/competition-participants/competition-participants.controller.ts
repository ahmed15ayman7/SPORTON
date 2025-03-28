import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompetitionParticipantsService } from './competition-participants.service';
import { CreateCompetitionParticipantDto } from './dto/create-competition-participant.dto';
import { UpdateCompetitionParticipantDto } from './dto/update-competition-participant.dto';

@ApiTags('مشاركي المسابقات')
@Controller('competition-participants')
export class CompetitionParticipantsController {
    constructor(private readonly competitionParticipantsService: CompetitionParticipantsService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة مشارك جديد في المسابقة' })
    @ApiResponse({ status: 201, description: 'تم إضافة المشارك بنجاح' })
    create(@Body() createCompetitionParticipantDto: CreateCompetitionParticipantDto) {
        return this.competitionParticipantsService.create(createCompetitionParticipantDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع المشاركين' })
    @ApiResponse({ status: 200, description: 'تم جلب المشاركين بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.competitionParticipantsService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل مشارك معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل المشارك بنجاح' })
    findOne(@Param('id') id: string) {
        return this.competitionParticipantsService.getCompetitionParticipantProfile(+id);
    }

    @Get('competition/:competitionId')
    @ApiOperation({ summary: 'الحصول على جميع المشاركين في مسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب المشاركين بنجاح' })
    getCompetitionParticipants(@Param('competitionId') competitionId: string) {
        return this.competitionParticipantsService.getCompetitionParticipants(+competitionId);
    }

    @Get('user/:participantId')
    @ApiOperation({ summary: 'الحصول على جميع مشاركات مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب المشاركات بنجاح' })
    getUserParticipations(@Param('participantId') participantId: string) {
        return this.competitionParticipantsService.getUserParticipations(+participantId);
    }

    @Get('competition/:competitionId/status/:status')
    @ApiOperation({ summary: 'الحصول على المشاركين في مسابقة معينة حسب الحالة' })
    @ApiResponse({ status: 200, description: 'تم جلب المشاركين بنجاح' })
    getParticipantsByStatus(
        @Param('competitionId') competitionId: string,
        @Param('status') status: string,
    ) {
        return this.competitionParticipantsService.getParticipantsByStatus(+competitionId, status);
    }

    @Get('competition/:competitionId/standings')
    @ApiOperation({ summary: 'الحصول على ترتيب المشاركين في مسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الترتيب بنجاح' })
    getCompetitionStandings(@Param('competitionId') competitionId: string) {
        return this.competitionParticipantsService.getCompetitionStandings(+competitionId);
    }

    @Patch(':id/rank')
    @ApiOperation({ summary: 'تحديث ترتيب مشارك معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث الترتيب بنجاح' })
    updateRank(
        @Param('id') id: string,
        @Body('rank') rank: number,
    ) {
        return this.competitionParticipantsService.updateParticipantRank(+id, rank);
    }

    @Patch(':id/score')
    @ApiOperation({ summary: 'تحديث درجة مشارك معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث الدرجة بنجاح' })
    updateScore(
        @Param('id') id: string,
        @Body('score') score: number,
    ) {
        return this.competitionParticipantsService.updateParticipantScore(+id, score);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات مشارك معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث البيانات بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateCompetitionParticipantDto: UpdateCompetitionParticipantDto,
    ) {
        return this.competitionParticipantsService.update(+id, updateCompetitionParticipantDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف مشارك معين' })
    @ApiResponse({ status: 200, description: 'تم حذف المشارك بنجاح' })
    remove(@Param('id') id: string) {
        return this.competitionParticipantsService.remove(+id);
    }
} 