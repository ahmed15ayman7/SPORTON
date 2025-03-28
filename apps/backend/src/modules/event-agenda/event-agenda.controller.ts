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
import { EventAgendaService } from './event-agenda.service';
import { CreateEventAgendaDto } from './dto/create-event-agenda.dto';
import { UpdateEventAgendaDto } from './dto/update-event-agenda.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('جدول الفعاليات')
@Controller('event-agenda')
export class EventAgendaController {
    constructor(private readonly eventAgendaService: EventAgendaService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة نشاط جديد للفعالية' })
    @ApiResponse({ status: 201, description: 'تم إضافة النشاط بنجاح' })
    create(@Body() createEventAgendaDto: CreateEventAgendaDto) {
        return this.eventAgendaService.create(createEventAgendaDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع أنشطة الفعاليات' })
    @ApiResponse({ status: 200, description: 'تم استرجاع أنشطة الفعاليات بنجاح' })
    findAll(@Query() query: PaginationDto) {
        return this.eventAgendaService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل نشاط محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع تفاصيل النشاط بنجاح' })
    getEventAgendaProfile(@Param('id') id: string) {
        return this.eventAgendaService.getEventAgendaProfile(+id);
    }

    @Get('event/:eventId')
    @ApiOperation({ summary: 'الحصول على جدول فعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع جدول الفعالية بنجاح' })
    getEventAgenda(@Param('eventId') eventId: string) {
        return this.eventAgendaService.getEventAgenda(+eventId);
    }

    @Get('event/:eventId/upcoming')
    @ApiOperation({ summary: 'الحصول على الأنشطة القادمة لفعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الأنشطة القادمة بنجاح' })
    getUpcomingAgenda(@Param('eventId') eventId: string) {
        return this.eventAgendaService.getUpcomingAgenda(+eventId);
    }

    @Get('event/:eventId/current')
    @ApiOperation({ summary: 'الحصول على النشاط الحالي لفعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع النشاط الحالي بنجاح' })
    getCurrentAgenda(@Param('eventId') eventId: string) {
        return this.eventAgendaService.getCurrentAgenda(+eventId);
    }

    @Get('event/:eventId/past')
    @ApiOperation({ summary: 'الحصول على الأنشطة السابقة لفعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الأنشطة السابقة بنجاح' })
    getPastAgenda(@Param('eventId') eventId: string) {
        return this.eventAgendaService.getPastAgenda(+eventId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث نشاط فعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث النشاط بنجاح' })
    update(@Param('id') id: string, @Body() updateEventAgendaDto: UpdateEventAgendaDto) {
        return this.eventAgendaService.update(+id, updateEventAgendaDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف نشاط فعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف النشاط بنجاح' })
    remove(@Param('id') id: string) {
        return this.eventAgendaService.remove(+id);
    }
} 