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
import { EventParticipantsService } from './event-participants.service';
import { CreateEventParticipantDto } from '@/dtos/EventParticipant.create.dto';
import { UpdateEventParticipantDto } from '@/dtos/EventParticipant.update.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { EventParticipant } from '@shared/prisma';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
@ApiTags('مشاركي الفعاليات')
@Controller('event-participants')
export class EventParticipantsController extends BaseController<EventParticipant> {
    constructor(private readonly eventParticipantsService: EventParticipantsService) {
        super(eventParticipantsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة مشارك جديد للفعالية', 'create', CreateEventParticipantDto, null, "مشاركي الفعاليات")
    @ApiOperation({ summary: 'إضافة مشارك جديد للفعالية' })
    @ApiResponse({ status: 201, description: 'تم إضافة المشارك بنجاح' })
    create(@Body() createEventParticipantDto: CreateEventParticipantDto): Promise<EventParticipant> {
        return this.eventParticipantsService.create(createEventParticipantDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث مشارك محدد', 'update', UpdateEventParticipantDto, null, "مشاركي الفعاليات")
    update(@Param('id') id: number, @Body() data: any): Promise<EventParticipant> {
        return this.eventParticipantsService.update(+id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع المشاركين في الفعاليات', 'none', null, null, "مشاركي الفعاليات")
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<EventParticipant>> {
        return this.eventParticipantsService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل مشارك محددة', 'none', null, null, "مشاركي الفعاليات")
    getEventParticipantProfile(@Param('id') id: string): Promise<EventParticipant> {
        return this.eventParticipantsService.getEventParticipantProfile(+id);
    }

    @Get('event/:eventId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على المشاركين في فعالية محددة', 'none', null, null, "مشاركي الفعاليات")
    getEventParticipants(@Param('eventId') eventId: string): Promise<EventParticipant[]> {
        return this.eventParticipantsService.getEventParticipants(+eventId);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على مشاركات مستخدم محددة', 'none', null, null, "مشاركي الفعاليات")
    getUserParticipations(@Param('userId') userId: string): Promise<EventParticipant[]> {
        return this.eventParticipantsService.getUserParticipations(+userId);
    }

    @Get('event/:eventId/status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على المشاركين حسب الحالة لفعالية محددة', 'none', null, null, "مشاركي الفعاليات")
    getParticipantsByStatus(
        @Param('eventId') eventId: string,
        @Param('status') status: string,
    ): Promise<EventParticipant[]> {
        return this.eventParticipantsService.getParticipantsByStatus(+eventId, status);
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث حالة مشاركة محددة', 'none', null, null, "مشاركي الفعاليات")
    updateParticipationStatus(
        @Param('id') id: string,
        @Body('status') status: string,
    ): Promise<EventParticipant> {
        return this.eventParticipantsService.updateParticipationStatus(+id, status);
    }

} 