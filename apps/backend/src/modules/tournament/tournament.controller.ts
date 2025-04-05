import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TournamentService } from './tournament.service';
import { Tournament, TournamentType } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('البطولات')
@Controller('tournaments')
export class TournamentController {
    constructor(private readonly tournamentService: TournamentService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء بطولة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء البطولة بنجاح' })
    create(@Body() createTournamentDto: CreateTournamentDto): Promise<Tournament> {
        return this.tournamentService.create(createTournamentDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع البطولات' })
    @ApiResponse({ status: 200, description: 'تم جلب البطولات بنجاح' })
    findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Tournament>> {
        return this.tournamentService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على بطولة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب البطولة بنجاح' })
    findOne(@Param('id') id: string): Promise<Tournament> {
        return this.tournamentService.findOne(+id);
    }

    @Get('organizer/:organizerId')
    @ApiOperation({ summary: 'الحصول على بطولات منشأة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب البطولات بنجاح' })
    findByOrganizer(@Param('organizerId') organizerId: string): Promise<Tournament[]> {
        return this.tournamentService.findByOrganizer(+organizerId);
    }

    @Get('type/:type')
    @ApiOperation({ summary: 'الحصول على بطولات نوع محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب البطولات بنجاح' })
    findByType(@Param('type') type: string): Promise<Tournament[]> {
        return this.tournamentService.findByType(type as TournamentType);
    }

    @Get('date-range/:startDate/:endDate')
    @ApiOperation({ summary: 'الحصول على بطولات ضمن نطاق تاريخ محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب البطولات بنجاح' })
    findByDateRange(
        @Param('startDate') startDate: string,
        @Param('endDate') endDate: string,
    ): Promise<Tournament[]> {
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
    ): Promise<Tournament> {
        return this.tournamentService.update(+id, updateTournamentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف بطولة محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف البطولة بنجاح' })
    remove(@Param('id') id: string): Promise<Tournament> {
        return this.tournamentService.remove(+id);
    }
} 