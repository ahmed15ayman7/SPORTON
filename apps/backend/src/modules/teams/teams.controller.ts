import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { TeamsService } from './teams.service';
import { Team } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateTeamDto } from '@/dtos/Team.create.dto';
import { UpdateTeamDto } from '@/dtos/Team.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('teams')
@Controller('teams')
export class TeamsController extends BaseController<Team> {
    constructor(private readonly teamsService: TeamsService) {
        super(teamsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء فريق جديد', 'none', CreateTeamDto, null, 'الفرق')
    create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamsService.create(createTeamDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث فريق محدد', 'none', UpdateTeamDto, null, 'الفرق')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.teamsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الفرق', 'none', null, null, 'الفرق')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto) {
        return this.teamsService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على فريق محدد', 'none', null, null, 'الفرق')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.teamsService.findOne(id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على فريق محدد بالعلاقات', 'none', null, null, 'الفرق')
    async getTeamProfile(@Param('id', ParseIntPipe) id: number): Promise<Team> {
        return this.teamsService.getTeamProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع فرق المستخدم', 'none', null, null, 'الفرق')
    async getUserTeams(@Param('userId', ParseIntPipe) userId: number): Promise<Team[]> {
        return this.teamsService.getUserTeams(userId);
    }

    @Get('sport/:sport')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع فرق الرياضة', 'none', null, null, 'الفرق')
    async getSportTeams(@Param('sport') sport: string): Promise<Team[]> {
        return this.teamsService.getSportTeams(sport);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف فريق محدد', 'none', null, null, 'الفرق')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.teamsService.remove(id);
    }
} 