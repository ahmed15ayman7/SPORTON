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
import { EventSponsorsService } from './event-sponsors.service';
import { CreateEventSponsorDto } from '@/dtos/EventSponsor.create.dto';
import { UpdateEventSponsorDto } from '@/dtos/EventSponsor.update.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EventSponsor } from '@shared/prisma';

@ApiTags('رعاة الفعاليات')
@Controller('event-sponsors')
export class EventSponsorsController extends BaseController<EventSponsor> {
    constructor(private readonly eventSponsorsService: EventSponsorsService) {
        super(eventSponsorsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة راعي جديد للفعالية', 'create', CreateEventSponsorDto, null, "رعاة الفعاليات")
    create(@Body() createEventSponsorDto: CreateEventSponsorDto) {
        return this.eventSponsorsService.create(createEventSponsorDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث راعي محددة', 'update', UpdateEventSponsorDto, null, "رعاة الفعاليات")
    update(@Param('id') id: number, @Body() data: any) {
        return this.eventSponsorsService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع رعاة الفعاليات', 'none', null, null, "رعاة الفعاليات")
    findAll(@Query() query: PaginationDto) {
        return this.eventSponsorsService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل راعي محددة', 'none', null, null, "رعاة الفعاليات")
    getEventSponsorProfile(@Param('id') id: string) {
        return this.eventSponsorsService.getEventSponsorProfile(+id);
    }

    @Get('event/:eventId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على رعاة فعالية محددة', 'none', null, null, "رعاة الفعاليات")
    getEventSponsors(@Param('eventId') eventId: string) {
        return this.eventSponsorsService.getEventSponsors(+eventId);
    }

    @Get('sponsor/:sponsorId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على فعاليات راعي محدد', 'none', null, null, "رعاة الفعاليات")
    getSponsorEvents(@Param('sponsorId') sponsorId: string) {
        return this.eventSponsorsService.getSponsorEvents(+sponsorId);
    }

    @Get('event/:eventId/type/:sponsorshipType')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على رعاة حسب نوع الرعاية لفعالية محددة', 'none', null, null, "رعاة الفعاليات")
    getSponsorsByType(
        @Param('eventId') eventId: string,
        @Param('sponsorshipType') sponsorshipType: string,
    ) {
        return this.eventSponsorsService.getSponsorsByType(+eventId, sponsorshipType);
    }

    @Get('event/:eventId/total')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إجمالي قيمة الرعايات لفعالية محددة', 'none', null, null, "رعاة الفعاليات")
    getTotalSponsorshipAmount(@Param('eventId') eventId: string) {
        return this.eventSponsorsService.getTotalSponsorshipAmount(+eventId);
    }

} 