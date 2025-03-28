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
import { EventSponsorsService } from './event-sponsors.service';
import { CreateEventSponsorDto } from './dto/create-event-sponsor.dto';
import { UpdateEventSponsorDto } from './dto/update-event-sponsor.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('رعاة الفعاليات')
@Controller('event-sponsors')
export class EventSponsorsController {
    constructor(private readonly eventSponsorsService: EventSponsorsService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة راعي جديد للفعالية' })
    @ApiResponse({ status: 201, description: 'تم إضافة الراعي بنجاح' })
    create(@Body() createEventSponsorDto: CreateEventSponsorDto) {
        return this.eventSponsorsService.create(createEventSponsorDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع رعاة الفعاليات' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الرعاة بنجاح' })
    findAll(@Query() query: PaginationDto) {
        return this.eventSponsorsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل راعي محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع تفاصيل الراعي بنجاح' })
    getEventSponsorProfile(@Param('id') id: string) {
        return this.eventSponsorsService.getEventSponsorProfile(+id);
    }

    @Get('event/:eventId')
    @ApiOperation({ summary: 'الحصول على رعاة فعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الرعاة بنجاح' })
    getEventSponsors(@Param('eventId') eventId: string) {
        return this.eventSponsorsService.getEventSponsors(+eventId);
    }

    @Get('sponsor/:sponsorId')
    @ApiOperation({ summary: 'الحصول على فعاليات راعي محدد' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الفعاليات بنجاح' })
    getSponsorEvents(@Param('sponsorId') sponsorId: string) {
        return this.eventSponsorsService.getSponsorEvents(+sponsorId);
    }

    @Get('event/:eventId/type/:sponsorshipType')
    @ApiOperation({ summary: 'الحصول على رعاة حسب نوع الرعاية لفعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الرعاة بنجاح' })
    getSponsorsByType(
        @Param('eventId') eventId: string,
        @Param('sponsorshipType') sponsorshipType: string,
    ) {
        return this.eventSponsorsService.getSponsorsByType(+eventId, sponsorshipType);
    }

    @Get('event/:eventId/total')
    @ApiOperation({ summary: 'الحصول على إجمالي قيمة الرعايات لفعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الإجمالي بنجاح' })
    getTotalSponsorshipAmount(@Param('eventId') eventId: string) {
        return this.eventSponsorsService.getTotalSponsorshipAmount(+eventId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث راعي محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث الراعي بنجاح' })
    update(@Param('id') id: string, @Body() updateEventSponsorDto: UpdateEventSponsorDto) {
        return this.eventSponsorsService.update(+id, updateEventSponsorDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف راعي محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف الراعي بنجاح' })
    remove(@Param('id') id: string) {
        return this.eventSponsorsService.remove(+id);
    }
} 