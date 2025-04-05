import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CoachingHistoryService } from './coaching-history.service';
import { CreateCoachingHistoryDto } from './dto/create-coaching-history.dto';
import { UpdateCoachingHistoryDto } from './dto/update-coaching-history.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';

@ApiTags('سجلات التدريب')
@Controller('coaching-history')
export class CoachingHistoryController {
    constructor(private readonly coachingHistoryService: CoachingHistoryService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء سجل تدريب جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء سجل التدريب بنجاح' })
    create(@Body() createCoachingHistoryDto: CreateCoachingHistoryDto) {
        return this.coachingHistoryService.create(createCoachingHistoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع سجلات التدريب' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات التدريب بنجاح' })
    findAll(@Query() params: PaginationDto) {
        return this.coachingHistoryService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على سجل تدريب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب سجل التدريب بنجاح' })
    findOne(@Param('id') id: string) {
        return this.coachingHistoryService.findOne(+id);
    }

    @Get('coach/:coachId')
    @ApiOperation({ summary: 'الحصول على سجلات تدريب مدرب محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات التدريب بنجاح' })
    findByCoach(@Param('coachId') coachId: string) {
        return this.coachingHistoryService.findByCoach(+coachId);
    }

    @Get('club/:clubId')
    @ApiOperation({ summary: 'الحصول على سجلات تدريب نادي محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات التدريب بنجاح' })
    findByClub(@Param('clubId') clubId: string) {
        return this.coachingHistoryService.findByClub(+clubId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث سجل تدريب محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث سجل التدريب بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateCoachingHistoryDto: UpdateCoachingHistoryDto,
    ) {
        return this.coachingHistoryService.update(+id, updateCoachingHistoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف سجل تدريب محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف سجل التدريب بنجاح' })
    remove(@Param('id') id: string) {
        return this.coachingHistoryService.remove(+id);
    }
} 