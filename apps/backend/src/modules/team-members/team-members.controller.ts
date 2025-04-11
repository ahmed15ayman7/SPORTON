import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { TeamMembersService } from './team-members.service';
import { TeamMember } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateTeamMemberDto } from '@/dtos/TeamMember.create.dto';
import { UpdateTeamMemberDto } from '@/dtos/TeamMember.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('team-members')
@Controller('team-members')
export class TeamMembersController extends BaseController<TeamMember> {
    constructor(private readonly teamMembersService: TeamMembersService) {
        super(teamMembersService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء عضو فريق جديد', 'none', CreateTeamMemberDto, null, 'عضوية الفرق')
    create(@Body() createTeamMemberDto: CreateTeamMemberDto) {
        return this.teamMembersService.create(createTeamMemberDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث عضو فريق محدد', 'none', UpdateTeamMemberDto, null, 'عضوية الفرق')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.teamMembersService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع عضوية الفرق', 'none', null, null, 'عضوية الفرق')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() params: PaginationDto) {
        return this.teamMembersService.findAll(params);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على عضو فريق محدد', 'none', null, null, 'عضوية الفرق')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.teamMembersService.findOne(id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على عضو فريق محدد بالعلاقات', 'none', null, null, 'عضوية الفرق')
    async getTeamMemberProfile(@Param('id', ParseIntPipe) id: number) {
        return this.teamMembersService.getTeamMemberProfile(id);
    }

    @Get('team/:teamId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع عضوية الفرق', 'none', null, null, 'عضوية الفرق')
    async getTeamMembers(@Param('teamId', ParseIntPipe) teamId: number) {
        return this.teamMembersService.getTeamMembers(teamId);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع عضوية الفرق', 'none', null, null, 'عضوية الفرق')
    async getUserTeamMemberships(@Param('userId', ParseIntPipe) userId: number) {
        return this.teamMembersService.getUserTeamMemberships(userId);
    }

    @Get('current/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع عضوية الفرق الحالية', 'none', null, null, 'عضوية الفرق')
    async getCurrentTeamMemberships(@Param('userId', ParseIntPipe) userId: number) {
        return this.teamMembersService.getCurrentTeamMemberships(userId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف عضو فريق محدد', 'none', null, null, 'عضوية الفرق')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.teamMembersService.remove(id);
    }

} 