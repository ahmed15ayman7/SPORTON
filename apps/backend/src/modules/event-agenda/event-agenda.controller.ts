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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventAgendaService } from './event-agenda.service';
import { CreateEventAgendaDto } from '@/dtos/EventAgenda.create.dto';
import { UpdateEventAgendaDto } from '@/dtos/EventAgenda.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('جدول الفعاليات')
@Controller('event-agenda')
export class EventAgendaController {
    constructor(private readonly eventAgendaService: EventAgendaService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة نشاط جديد للفعالية', 'create', CreateEventAgendaDto, null, "جدول الفعاليات")
    create(@Body() createEventAgendaDto: CreateEventAgendaDto) {
        return this.eventAgendaService.create(createEventAgendaDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث نشاط فعالية محددة', 'update', UpdateEventAgendaDto, null, "جدول الفعاليات")
    update(@Param('id') id: string, @Body() updateEventAgendaDto: UpdateEventAgendaDto) {
        return this.eventAgendaService.update(+id, updateEventAgendaDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع أنشطة الفعاليات', 'none', null, null, "جدول الفعاليات")
    findAll(@Query() query: PaginationDto) {
        return this.eventAgendaService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل نشاط محددة', 'none', null, null, "جدول الفعاليات")
    getEventAgendaProfile(@Param('id') id: string) {
        return this.eventAgendaService.getEventAgendaProfile(+id);
    }

    @Get('event/:eventId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جدول فعالية محددة', 'none', null, null, "جدول الفعاليات")
    getEventAgenda(@Param('eventId') eventId: string) {
        return this.eventAgendaService.getEventAgenda(+eventId);
    }

    @Get('event/:eventId/upcoming')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الأنشطة القادمة لفعالية محددة', 'none', null, null, "جدول الفعاليات")
    getUpcomingAgenda(@Param('eventId') eventId: string) {
        return this.eventAgendaService.getUpcomingAgenda(+eventId);
    }

    @Get('event/:eventId/current')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على النشاط الحالي لفعالية محددة', 'none', null, null, "جدول الفعاليات")
    getCurrentAgenda(@Param('eventId') eventId: string) {
        return this.eventAgendaService.getCurrentAgenda(+eventId);
    }

    @Get('event/:eventId/past')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الأنشطة السابقة لفعالية محددة', 'none', null, null, "جدول الفعاليات")
    getPastAgenda(@Param('eventId') eventId: string) {
        return this.eventAgendaService.getPastAgenda(+eventId);
    }

} 