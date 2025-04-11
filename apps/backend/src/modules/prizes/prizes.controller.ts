import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    Put,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PrizesService } from './prizes.service';

import { PaginationDto } from '../../common/dto/pagination.dto';
import { Prize } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CreatePrizeDto } from '@/dtos/Prize.create.dto';
import { UpdatePrizeDto } from '@/dtos/Prize.update.dto';
@ApiTags('الجوائز')
@Controller('prizes')
export class PrizesController extends BaseController<Prize> {
    constructor(private readonly prizesService: PrizesService) {
        super(prizesService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة جائزة جديدة', 'none', null, CreatePrizeDto, 'الجوائز')
    create(@Body() createPrizeDto: CreatePrizeDto) {
        return this.prizesService.create(createPrizeDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث جائزة محددة', 'none', UpdatePrizeDto, null, 'الجوائز')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.prizesService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الجوائز', 'none', null, null, 'الجوائز')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() query: PaginationDto) {
        return this.prizesService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل جائزة محددة', 'none', null, null, 'الجوائز')
    getPrizeProfile(@Param('id') id: string) {
        return this.prizesService.getPrizeProfile(+id);
    }

    @Get('event/:eventId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جوائز فعالية محددة', 'none', null, null, 'الجوائز')
    getEventPrizes(@Param('eventId') eventId: string) {
        return this.prizesService.getEventPrizes(+eventId);
    }

    @Get('event/:eventId/rank/:rank')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جائزة حسب المركز لفعالية محددة', 'none', null, null, 'الجوائز')
    getPrizeByRank(
        @Param('eventId') eventId: string,
        @Param('rank') rank: string,
    ) {
        return this.prizesService.getPrizeByRank(+eventId, +rank);
    }

    @Get('competition/:competitionId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جوائز مسابقة محددة', 'none', null, null, 'الجوائز')
    getCompetitionPrizes(@Param('competitionId') competitionId: string) {
        return this.prizesService.getCompetitionPrizes(+competitionId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف جائزة محددة', 'none', null, null, 'الجوائز')
    remove(@Param('id') id: string) {
        return this.prizesService.remove(+id);
    }
} 