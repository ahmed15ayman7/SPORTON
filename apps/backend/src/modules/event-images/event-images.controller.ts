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
import { EventImagesService } from './event-images.service';
import { CreateEventImageDto } from './dto/create-event-image.dto';
import { UpdateEventImageDto } from './dto/update-event-image.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('صور الفعاليات')
@Controller('event-images')
export class EventImagesController {
    constructor(private readonly eventImagesService: EventImagesService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة صورة جديدة للفعالية' })
    @ApiResponse({ status: 201, description: 'تم إضافة الصورة بنجاح' })
    create(@Body() createEventImageDto: CreateEventImageDto) {
        return this.eventImagesService.create(createEventImageDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع صور الفعاليات' })
    @ApiResponse({ status: 200, description: 'تم استرجاع صور الفعاليات بنجاح' })
    findAll(@Query() query: PaginationDto) {
        return this.eventImagesService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل صورة محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع تفاصيل الصورة بنجاح' })
    getEventImageProfile(@Param('id') id: string) {
        return this.eventImagesService.getEventImageProfile(+id);
    }

    @Get('event/:eventId')
    @ApiOperation({ summary: 'الحصول على صور فعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع صور الفعالية بنجاح' })
    getEventImages(@Param('eventId') eventId: string) {
        return this.eventImagesService.getEventImages(+eventId);
    }

    @Get('event/:eventId/main')
    @ApiOperation({ summary: 'الحصول على الصورة الرئيسية لفعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الصورة الرئيسية بنجاح' })
    getMainEventImage(@Param('eventId') eventId: string) {
        return this.eventImagesService.getMainEventImage(+eventId);
    }

    @Patch(':id/set-main')
    @ApiOperation({ summary: 'تعيين صورة كصورة رئيسية للفعالية' })
    @ApiResponse({ status: 200, description: 'تم تعيين الصورة كصورة رئيسية بنجاح' })
    setMainImage(
        @Param('id') id: string,
        @Body('eventId') eventId: number,
    ) {
        return this.eventImagesService.setMainImage(eventId, +id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث صورة فعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث الصورة بنجاح' })
    update(@Param('id') id: string, @Body() updateEventImageDto: UpdateEventImageDto) {
        return this.eventImagesService.update(+id, updateEventImageDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف صورة فعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف الصورة بنجاح' })
    remove(@Param('id') id: string) {
        return this.eventImagesService.remove(+id);
    }
} 