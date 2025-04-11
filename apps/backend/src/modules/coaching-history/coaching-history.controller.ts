import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CoachingHistoryService } from './coaching-history.service';
import { CreateCoachingHistoryDto } from '../../dtos/CoachingHistory.create.dto';
import { UpdateCoachingHistoryDto } from '../../dtos/CoachingHistory.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CoachingHistory } from '@shared/prisma';
@ApiTags('سجلات التدريب')
@Controller('coaching-history')
export class CoachingHistoryController extends BaseController<CoachingHistory> {
    constructor(private readonly coachingHistoryService: CoachingHistoryService) {
        super(coachingHistoryService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء', 'create', null, CreateCoachingHistoryDto, "سجلات التدريب")
    @ApiOperation({ summary: 'إنشاء سجل تدريب جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء سجل التدريب بنجاح' })
    create(@Body() createCoachingHistoryDto: CreateCoachingHistoryDto) {
        return this.coachingHistoryService.create(createCoachingHistoryDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث', 'update', UpdateCoachingHistoryDto, null, "سجلات التدريب")
    update(@Param('id') id: number, @Body() data: any): Promise<CoachingHistory> {
        return this.coachingHistoryService.update(+id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع', 'none', null, null, "سجلات التدريب")
    findAll(@Query() params: PaginationDto) {
        return this.coachingHistoryService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على', 'none', null, null, "سجلات التدريب")
    findOne(@Param('id') id: number) {
        return this.coachingHistoryService.findOne(+id);
    }

    @Get('coach/:coachId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على سجلات تدريب مدرب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات التدريب بنجاح' })
    findByCoach(@Param('coachId') coachId: string) {
        return this.coachingHistoryService.findByCoach(+coachId);
    }

    @Get('club/:clubId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'الحصول على سجلات تدريب نادي محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات التدريب بنجاح' })
    findByClub(@Param('clubId') clubId: string) {
        return this.coachingHistoryService.findByClub(+clubId);
    }

} 