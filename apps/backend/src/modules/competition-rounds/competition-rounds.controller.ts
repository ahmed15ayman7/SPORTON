import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompetitionRoundsService } from './competition-rounds.service';
import { CreateCompetitionRoundDto } from './dto/create-competition-round.dto';
import { UpdateCompetitionRoundDto } from './dto/update-competition-round.dto';

@ApiTags('جولات المسابقات')
@Controller('competition-rounds')
export class CompetitionRoundsController {
    constructor(private readonly competitionRoundsService: CompetitionRoundsService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة جولة جديدة للمسابقة' })
    @ApiResponse({ status: 201, description: 'تم إضافة الجولة بنجاح' })
    create(@Body() createCompetitionRoundDto: CreateCompetitionRoundDto) {
        return this.competitionRoundsService.create(createCompetitionRoundDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الجولات' })
    @ApiResponse({ status: 200, description: 'تم جلب الجولات بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.competitionRoundsService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل جولة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الجولة بنجاح' })
    findOne(@Param('id') id: string) {
        return this.competitionRoundsService.getCompetitionRoundProfile(+id);
    }

    @Get('competition/:competitionId')
    @ApiOperation({ summary: 'الحصول على جميع جولات مسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجولات بنجاح' })
    getCompetitionRounds(@Param('competitionId') competitionId: string) {
        return this.competitionRoundsService.getCompetitionRounds(+competitionId);
    }

    @Get('competition/:competitionId/current')
    @ApiOperation({ summary: 'الحصول على الجولة الحالية لمسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجولة الحالية بنجاح' })
    getCurrentRound(@Param('competitionId') competitionId: string) {
        return this.competitionRoundsService.getCurrentRound(+competitionId);
    }

    @Get('competition/:competitionId/upcoming')
    @ApiOperation({ summary: 'الحصول على الجولات القادمة لمسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجولات القادمة بنجاح' })
    getUpcomingRounds(@Param('competitionId') competitionId: string) {
        return this.competitionRoundsService.getUpcomingRounds(+competitionId);
    }

    @Get('competition/:competitionId/completed')
    @ApiOperation({ summary: 'الحصول على الجولات المكتملة لمسابقة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب الجولات المكتملة بنجاح' })
    getCompletedRounds(@Param('competitionId') competitionId: string) {
        return this.competitionRoundsService.getCompletedRounds(+competitionId);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة جولة معينة' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة الجولة بنجاح' })
    updateStatus(
        @Param('id') id: string,
        @Body('status') status: string,
    ) {
        return this.competitionRoundsService.updateRoundStatus(+id, status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات جولة معينة' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات الجولة بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateCompetitionRoundDto: UpdateCompetitionRoundDto,
    ) {
        return this.competitionRoundsService.update(+id, updateCompetitionRoundDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف جولة معينة' })
    @ApiResponse({ status: 200, description: 'تم حذف الجولة بنجاح' })
    remove(@Param('id') id: string) {
        return this.competitionRoundsService.remove(+id);
    }
} 