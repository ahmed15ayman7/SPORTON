import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { MatchesService } from './matches.service';
import { Match } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateMatchDto } from '@/dtos/Match.create.dto';
import { UpdateMatchDto } from '@/dtos/Match.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('matches')
@Controller('matches')
export class MatchesController extends BaseController<Match> {
    constructor(private readonly matchesService: MatchesService) {
        super(matchesService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء مباراة جديدة', 'create', CreateMatchDto, null, "المباريات")
    create(@Body() createMatchDto: CreateMatchDto) {
        return this.matchesService.create(createMatchDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث مباراة محددة', 'update', UpdateMatchDto, null, "المباريات")
    update(@Param('id') id: number, @Body() updateMatchDto: UpdateMatchDto) {
        return this.matchesService.update(id, updateMatchDto);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المباريات', 'none', null, null, "المباريات")
    async findAll(paginationDto: PaginationDto) {
        return this.matchesService.findAll(paginationDto);
    }
    @Get(":id")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل المباراة محددة', 'none', null, null, "المباريات")
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.matchesService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل المباراة مع جميع العلاقات', 'none', null, null, "المباريات")
    async getMatchProfile(@Param('id', ParseIntPipe) id: number) {
        return this.matchesService.getMatchProfile(id);
    }

    @Get('team/:teamName')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المباريات التي لعبها فريق محدد', 'none', null, null, "المباريات")
    async getTeamMatches(@Param('teamName') teamName: string) {
        return this.matchesService.getTeamMatches(teamName);
    }

    @Get('player/:playerId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المباريات التي لعبها لاعب محدد', 'none', null, null, "المباريات")
    async getPlayerMatches(@Param('playerId', ParseIntPipe) playerId: number) {
        return this.matchesService.getPlayerMatches(playerId);
    }

} 