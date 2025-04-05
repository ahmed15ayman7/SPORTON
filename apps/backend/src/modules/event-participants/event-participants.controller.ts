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
import { EventParticipantsService } from './event-participants.service';
import { CreateEventParticipantDto } from './dto/create-event-participant.dto';
import { UpdateEventParticipantDto } from './dto/update-event-participant.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { EventParticipant } from '@prisma/client';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
@ApiTags('مشاركي الفعاليات')
@Controller('event-participants')
export class EventParticipantsController {
    constructor(private readonly eventParticipantsService: EventParticipantsService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة مشارك جديد للفعالية' })
    @ApiResponse({ status: 201, description: 'تم إضافة المشارك بنجاح' })
    create(@Body() createEventParticipantDto: CreateEventParticipantDto): Promise<EventParticipant> {
        return this.eventParticipantsService.create(createEventParticipantDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع المشاركين في الفعاليات' })
    @ApiResponse({ status: 200, description: 'تم استرجاع المشاركين بنجاح' })
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<EventParticipant>> {
        return this.eventParticipantsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل مشارك محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع تفاصيل المشارك بنجاح' })
    getEventParticipantProfile(@Param('id') id: string): Promise<EventParticipant> {
        return this.eventParticipantsService.getEventParticipantProfile(+id);
    }

    @Get('event/:eventId')
    @ApiOperation({ summary: 'الحصول على المشاركين في فعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع المشاركين بنجاح' })
    getEventParticipants(@Param('eventId') eventId: string): Promise<EventParticipant[]> {
        return this.eventParticipantsService.getEventParticipants(+eventId);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على مشاركات مستخدم محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع المشاركات بنجاح' })
    getUserParticipations(@Param('userId') userId: string): Promise<EventParticipant[]> {
        return this.eventParticipantsService.getUserParticipations(+userId);
    }

    @Get('event/:eventId/status/:status')
    @ApiOperation({ summary: 'الحصول على المشاركين حسب الحالة لفعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع المشاركين بنجاح' })
    getParticipantsByStatus(
        @Param('eventId') eventId: string,
        @Param('status') status: string,
    ): Promise<EventParticipant[]> {
        return this.eventParticipantsService.getParticipantsByStatus(+eventId, status);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة مشاركة محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث الحالة بنجاح' })
    updateParticipationStatus(
        @Param('id') id: string,
        @Body('status') status: string,
    ): Promise<EventParticipant> {
        return this.eventParticipantsService.updateParticipationStatus(+id, status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث مشارك محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث المشارك بنجاح' })
    update(@Param('id') id: string, @Body() updateEventParticipantDto: UpdateEventParticipantDto): Promise<EventParticipant> {
        return this.eventParticipantsService.update(+id, updateEventParticipantDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف مشارك محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف المشارك بنجاح' })
    remove(@Param('id') id: string): Promise<EventParticipant> {
        return this.eventParticipantsService.remove(+id);
    }
} 