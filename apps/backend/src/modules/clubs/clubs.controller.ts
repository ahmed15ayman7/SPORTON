import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { ClubsService } from './clubs.service';
import { Club } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateClubDto } from '../../dtos/Club.create.dto';
import { UpdateClubDto } from '../../dtos/Club.update.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
@ApiTags('clubs')
@Controller('clubs')
export class ClubsController extends BaseController<Club> {
    constructor(private readonly clubsService: ClubsService) {
        super(clubsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateClubDto, "الأندية")
    async create(@Body() createClubDto: CreateClubDto): Promise<Club> {
        return this.clubsService.create(createClubDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateClubDto, null, "الأندية")
    async update(@Param('id') id: number, @Body() data: any): Promise<Club> {
        return this.clubsService.update(+id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "الأندية")
    async findAll(@Query('search') search: PaginationDto): Promise<PaginatedResponse<Club>> {
        return this.clubsService.findAll(search);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "الأندية")
    async findOne(@Param('id') id: number): Promise<Club> {
        return this.clubsService.findOne(+id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get club profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return club profile.' })
    async getClubProfile(@Param('id', ParseIntPipe) id: number) {
        return this.clubsService.getClubProfile(id);
    }

    @Get(':id/players')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get club players' })
    @ApiResponse({ status: 200, description: 'Return club players.' })
    async getClubPlayers(@Param('id', ParseIntPipe) id: number) {
        return this.clubsService.getClubPlayers(id);
    }

    @Get(':id/coaches')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get club coaches' })
    @ApiResponse({ status: 200, description: 'Return club coaches.' })
    async getClubCoaches(@Param('id', ParseIntPipe) id: number) {
        return this.clubsService.getClubCoaches(id);
    }

    @Get(':id/facilities')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get club facilities' })
    @ApiResponse({ status: 200, description: 'Return club facilities.' })
    async getClubFacilities(@Param('id', ParseIntPipe) id: number) {
        return this.clubsService.getClubFacilities(id);
    }

    @Get(':id/teams')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get club teams' })
    @ApiResponse({ status: 200, description: 'Return club teams.' })
    async getClubTeams(@Param('id', ParseIntPipe) id: number) {
        return this.clubsService.getClubTeams(id);
    }

    @Get(':id/tournaments')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get club tournaments' })
    @ApiResponse({ status: 200, description: 'Return club tournaments.' })
    async getClubTournaments(@Param('id', ParseIntPipe) id: number) {
        return this.clubsService.getClubTournaments(id);
    }

    @Get(':id/contracts')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get club contracts' })
    @ApiResponse({ status: 200, description: 'Return club contracts.' })
    async getClubContracts(@Param('id', ParseIntPipe) id: number) {
        return this.clubsService.getClubContracts(id);
    }

    @Get(':id/transfers')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get club transfers' })
    @ApiResponse({ status: 200, description: 'Return club transfers.' })
    async getClubTransfers(@Param('id', ParseIntPipe) id: number) {
        return this.clubsService.getClubTransfers(id);
    }

} 