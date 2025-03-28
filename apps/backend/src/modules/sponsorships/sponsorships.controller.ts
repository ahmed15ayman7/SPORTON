import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { SponsorshipsService } from './sponsorships.service';
import { Sponsorship } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateSponsorshipDto } from './dto/create-sponsorship.dto';
import { UpdateSponsorshipDto } from './dto/update-sponsorship.dto';

@ApiTags('sponsorships')
@Controller('sponsorships')
export class SponsorshipsController extends BaseController<Sponsorship> {
    constructor(private readonly sponsorshipsService: SponsorshipsService) {
        super(sponsorshipsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get sponsorship profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return sponsorship profile.' })
    async getSponsorshipProfile(@Param('id', ParseIntPipe) id: number) {
        return this.sponsorshipsService.getSponsorshipProfile(id);
    }

    @Get('sponsor/:sponsorId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get sponsor sponsorships' })
    @ApiResponse({ status: 200, description: 'Return sponsor sponsorships.' })
    async getSponsorSponsorships(@Param('sponsorId', ParseIntPipe) sponsorId: number) {
        return this.sponsorshipsService.getSponsorSponsorships(sponsorId);
    }

    @Get('athlete/:athleteId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get athlete sponsorships' })
    @ApiResponse({ status: 200, description: 'Return athlete sponsorships.' })
    async getAthleteSponsorships(@Param('athleteId', ParseIntPipe) athleteId: number) {
        return this.sponsorshipsService.getAthleteSponsorships(athleteId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new sponsorship' })
    @ApiResponse({ status: 201, description: 'The sponsorship has been successfully created.' })
    async create(@Body() createSponsorshipDto: CreateSponsorshipDto) {
        return this.sponsorshipsService.create(createSponsorshipDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a sponsorship' })
    @ApiResponse({ status: 200, description: 'The sponsorship has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSponsorshipDto: UpdateSponsorshipDto,
    ) {
        return this.sponsorshipsService.update(id, updateSponsorshipDto);
    }
} 