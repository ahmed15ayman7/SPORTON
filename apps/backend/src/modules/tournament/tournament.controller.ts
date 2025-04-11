import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TournamentService } from './tournament.service';
import { Tournament, TournamentType } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { CreateTournamentDto } from '@/dtos/Tournament.create.dto';
import { UpdateTournamentDto } from '@/dtos/Tournament.update.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
@ApiTags('البطولات')
@Controller('tournaments')
export class TournamentController extends BaseController<Tournament> {
    constructor(private readonly tournamentService: TournamentService) {
        super(tournamentService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء بطولة جديدة', 'none', CreateTournamentDto, null, 'البطولات')
    create(@Body() createTournamentDto: CreateTournamentDto): Promise<Tournament> {
        return this.tournamentService.create(createTournamentDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث بطولة محددة', 'none', UpdateTournamentDto, null, 'البطولات')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<Tournament> {
        return this.tournamentService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع البطولات', 'none', null, null, 'البطولات')
    findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Tournament>> {
        return this.tournamentService.findAll(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على بطولة محددة', 'none', null, null, 'البطولات')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Tournament> {
        return this.tournamentService.findOne(id);
    }

    @Get('organizer/:organizerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على بطولات منشأة محددة', 'none', null, null, 'البطولات')
    findByOrganizer(@Param('organizerId') organizerId: string): Promise<Tournament[]> {
        return this.tournamentService.findByOrganizer(+organizerId);
    }

    @Get('type/:type')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على بطولات نوع محدد', 'none', null, null, 'البطولات')
    findByType(@Param('type') type: string): Promise<Tournament[]> {
        return this.tournamentService.findByType(type as TournamentType);
    }

    @Get('date-range/:startDate/:endDate')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على بطولات ضمن نطاق تاريخ محدد', 'none', null, null, 'البطولات')
    findByDateRange(
        @Param('startDate') startDate: string,
        @Param('endDate') endDate: string,
    ): Promise<Tournament[]> {
        return this.tournamentService.findByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }


    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف بطولة محددة', 'none', null, null, 'البطولات')
    remove(@Param('id') id: string): Promise<Tournament> {
        return this.tournamentService.remove(+id);
    }
} 