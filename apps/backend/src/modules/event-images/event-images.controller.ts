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
import { EventImagesService } from './event-images.service';
import { CreateEventImageDto } from '@/dtos/EventImage.create.dto';
import { UpdateEventImageDto } from '@/dtos/EventImage.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { EventImage } from '@shared/prisma';

@ApiTags('صور الفعاليات')
@Controller('event-images')
export class EventImagesController extends BaseController<EventImage> {
    constructor(private readonly eventImagesService: EventImagesService) {
        super(eventImagesService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة صورة جديدة للفعالية', 'create', CreateEventImageDto, null, "صور الفعاليات")
    create(@Body() createEventImageDto: CreateEventImageDto) {
        return this.eventImagesService.create(createEventImageDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث صورة فعالية محددة', 'update', UpdateEventImageDto, null, "صور الفعاليات")
    update(@Param('id') id: number, @Body() data: any) {
        return this.eventImagesService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع صور الفعاليات', 'none', null, null, "صور الفعاليات")
    findAll(@Query() query: PaginationDto) {
        return this.eventImagesService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل صورة محددة', 'none', null, null, "صور الفعاليات")
    getEventImageProfile(@Param('id') id: string) {
        return this.eventImagesService.getEventImageProfile(+id);
    }

    @Get('event/:eventId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على صور فعالية محددة', 'none', null, null, "صور الفعاليات")
    getEventImages(@Param('eventId') eventId: string) {
        return this.eventImagesService.getEventImages(+eventId);
    }

    @Get('event/:eventId/main')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الصورة الرئيسية لفعالية محددة', 'none', null, null, "صور الفعاليات")
    getMainEventImage(@Param('eventId') eventId: string) {
        return this.eventImagesService.getMainEventImage(+eventId);
    }

    @Patch(':id/set-main')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تعيين صورة كصورة رئيسية للفعالية', 'none', null, null, "صور الفعاليات")
    setMainImage(
        @Param('id') id: string,
        @Body('eventId') eventId: number,
    ) {
        return this.eventImagesService.setMainImage(eventId, +id);
    }

} 