import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';

@ApiTags('البطولات')
@Controller('tournaments')
export class TournamentController {
    constructor(private readonly tournamentService: TournamentService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء بطولة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء البطولة بنجاح' })
    create(@Body() createTournamentDto: CreateTournamentDto) {
        return this.tournamentService.create(createTournamentDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع البطولات' })
    @ApiResponse({ status: 200, description: 'تم جلب البطولات بنجاح' })
    findAll() {
        return this.tournamentService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على بطولة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب البطولة بنجاح' })
    findOne(@Param('id') id: string) {
        return this.tournamentService.findOne(+id);
    }

    @Get('facility/:facilityId')
    @ApiOperation({ summary: 'الحصول على بطولات منشأة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب البطولات بنجاح' })
    findByFacility(@Param('facilityId') facilityId: string) {
        return this.tournamentService.findByFacility(+facilityId);
    }

    @Get('team-category/:teamCategoryId')
    @ApiOperation({ summary: 'الحصول على بطولات فئة فريق محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب البطولات بنجاح' })
    findByTeamCategory(@Param('teamCategoryId') teamCategoryId: string) {
        return this.tournamentService.findByTeamCategory(+teamCategoryId);
    }

    @Get('date-range/:startDate/:endDate')
    @ApiOperation({ summary: 'الحصول على بطولات ضمن نطاق تاريخ محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب البطولات بنجاح' })
    findByDateRange(
        @Param('startDate') startDate: string,
        @Param('endDate') endDate: string,
    ) {
        return this.tournamentService.findByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بطولة محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث البطولة بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateTournamentDto: UpdateTournamentDto,
    ) {
        return this.tournamentService.update(+id, updateTournamentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف بطولة محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف البطولة بنجاح' })
    remove(@Param('id') id: string) {
        return this.tournamentService.remove(+id);
    }
} 