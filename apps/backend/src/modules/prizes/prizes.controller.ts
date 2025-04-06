import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrizesService } from './prizes.service';

import { PaginationDto } from '../../common/dto/pagination.dto';
import { Prize } from '@shared/prisma';

@ApiTags('الجوائز')
@Controller('prizes')
export class PrizesController {
    constructor(private readonly prizesService: PrizesService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة جائزة جديدة' })
    @ApiResponse({ status: 201, description: 'تم إضافة الجائزة بنجاح' })
    create(@Body() createPrizeDto: Prize) {
        return this.prizesService.create(createPrizeDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الجوائز' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الجوائز بنجاح' })
    findAll(@Query() query: PaginationDto) {
        return this.prizesService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل جائزة محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع تفاصيل الجائزة بنجاح' })
    getPrizeProfile(@Param('id') id: string) {
        return this.prizesService.getPrizeProfile(+id);
    }

    @Get('event/:eventId')
    @ApiOperation({ summary: 'الحصول على جوائز فعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع جوائز الفعالية بنجاح' })
    getEventPrizes(@Param('eventId') eventId: string) {
        return this.prizesService.getEventPrizes(+eventId);
    }

    @Get('event/:eventId/rank/:rank')
    @ApiOperation({ summary: 'الحصول على جائزة حسب المركز لفعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الجائزة بنجاح' })
    getPrizeByRank(
        @Param('eventId') eventId: string,
        @Param('rank') rank: string,
    ) {
        return this.prizesService.getPrizeByRank(+eventId, +rank);
    }

    @Get('competition/:competitionId')
    @ApiOperation({ summary: 'الحصول على جوائز مسابقة محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع جوائز المسابقة بنجاح' })
    getCompetitionPrizes(@Param('competitionId') competitionId: string) {
        return this.prizesService.getCompetitionPrizes(+competitionId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث جائزة محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث الجائزة بنجاح' })
    update(@Param('id') id: string, @Body() updatePrizeDto: Prize) {
        return this.prizesService.update(+id, updatePrizeDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف جائزة محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف الجائزة بنجاح' })
    remove(@Param('id') id: string) {
        return this.prizesService.remove(+id);
    }
} 