import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { EndorsementsService } from './endorsements.service';
import { Endorsement } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateEndorsementDto } from '@/dtos/Endorsement.create.dto';
import { UpdateEndorsementDto } from '@/dtos/Endorsement.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('التزكيات')
@Controller('endorsements')
export class EndorsementsController extends BaseController<Endorsement> {
    constructor(private readonly endorsementsService: EndorsementsService) {
        super(endorsementsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء تزكية جديدة', 'create', CreateEndorsementDto, null, "التزكيات")
    async create(@Body() createEndorsementDto: CreateEndorsementDto) {
        return this.endorsementsService.create(createEndorsementDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث تزكية موجودة', 'update', UpdateEndorsementDto, null, "التزكيات")
    async update(@Param('id') id: number, @Body() updateEndorsementDto: UpdateEndorsementDto) {
        return this.endorsementsService.update(id, updateEndorsementDto);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع التزكيات', 'none', null, null, "التزكيات")
    async findAll(@Query() paginationDto: PaginationDto) {
        return this.endorsementsService.findAll(paginationDto);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تزكية معينة', 'none', null, null, "التزكيات")
    async findOne(@Param('id') id: number) {
        return this.endorsementsService.findOne(id);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على ملف التزكية مع جميع العلاقات', 'none', null, null, "التزكيات")
    async getEndorsementProfile(@Param('id', ParseIntPipe) id: number) {
        return this.endorsementsService.getEndorsementProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تزكيات المستخدم', 'none', null, null, "التزكيات")
    async getUserEndorsements(@Param('userId', ParseIntPipe) userId: number) {
        return this.endorsementsService.getUserEndorsements(userId);
    }

    @Get('given/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على التزكيات التي قدمها المستخدم', 'none', null, null, "التزكيات")
    async getUserGivenEndorsements(@Param('userId', ParseIntPipe) userId: number) {
        return this.endorsementsService.getUserGivenEndorsements(userId);
    }

    @Get('skill/:skill')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تزكيات لمهارة معينة', 'none', null, null, "التزكيات")
    async getSkillEndorsements(@Param('skill') skill: string) {
        return this.endorsementsService.getSkillEndorsements(skill);
    }


} 