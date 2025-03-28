import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { EndorsementsService } from './endorsements.service';
import { Endorsement } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateEndorsementDto } from './dto/create-endorsement.dto';
import { UpdateEndorsementDto } from './dto/update-endorsement.dto';

@ApiTags('endorsements')
@Controller('endorsements')
export class EndorsementsController extends BaseController<Endorsement> {
    constructor(private readonly endorsementsService: EndorsementsService) {
        super(endorsementsService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على ملف التزكية مع جميع العلاقات' })
    @ApiResponse({ status: 200, description: 'إرجاع ملف التزكية.' })
    async getEndorsementProfile(@Param('id', ParseIntPipe) id: number) {
        return this.endorsementsService.getEndorsementProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تزكيات المستخدم' })
    @ApiResponse({ status: 200, description: 'إرجاع تزكيات المستخدم.' })
    async getUserEndorsements(@Param('userId', ParseIntPipe) userId: number) {
        return this.endorsementsService.getUserEndorsements(userId);
    }

    @Get('given/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على التزكيات التي قدمها المستخدم' })
    @ApiResponse({ status: 200, description: 'إرجاع التزكيات التي قدمها المستخدم.' })
    async getUserGivenEndorsements(@Param('userId', ParseIntPipe) userId: number) {
        return this.endorsementsService.getUserGivenEndorsements(userId);
    }

    @Get('skill/:skill')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على تزكيات لمهارة معينة' })
    @ApiResponse({ status: 200, description: 'إرجاع تزكيات المهارة.' })
    async getSkillEndorsements(@Param('skill') skill: string) {
        return this.endorsementsService.getSkillEndorsements(skill);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'إنشاء تزكية جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء التزكية بنجاح.' })
    async create(@Body() createEndorsementDto: CreateEndorsementDto) {
        return this.endorsementsService.create(createEndorsementDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'تحديث تزكية موجودة' })
    @ApiResponse({ status: 200, description: 'تم تحديث التزكية بنجاح.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateEndorsementDto: UpdateEndorsementDto,
    ) {
        return this.endorsementsService.update(id, updateEndorsementDto);
    }
} 