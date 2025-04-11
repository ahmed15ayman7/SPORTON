import { Controller, Get, Param, Post, Body, UseGuards, Put, Query } from '@nestjs/common';
import { EventCategoriesService } from './event-categories.service';
import { EventCategory, Event } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateEventCategoryDto } from '@/dtos/EventCategory.create.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { UpdateEventCategoryDto } from '@/dtos/EventCategory.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@Controller('event-categories')
export class EventCategoriesController extends BaseController<EventCategory> {
    constructor(private readonly eventCategoriesService: EventCategoriesService) {
        super(eventCategoriesService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة تصنيف فعالية جديد', 'create', CreateEventCategoryDto, null, "تصنيفات الفعاليات")
    create(@Body() createEventCategoryDto: CreateEventCategoryDto) {
        return this.eventCategoriesService.create(createEventCategoryDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث تصنيف فعالية', 'update', UpdateEventCategoryDto, null, "تصنيفات الفعاليات")
    update(@Param('id') id: number, @Body() data: any) {
        return this.eventCategoriesService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع تصنيفات الفعاليات', 'none', null, null, "تصنيفات الفعاليات")
    async findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<EventCategory>> {
        return this.eventCategoriesService.findAll(query);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تصنيف فعالية محدد', 'none', null, null, "تصنيفات الفعاليات")
    async findOne(@Param('id') id: number): Promise<EventCategory> {
        return this.eventCategoriesService.findOne(id);
    }

    @Get(':id/events')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الفعاليات التي تنتمي إلى تصنيف معين', 'none', null, null, "تصنيفات الفعاليات")
    async getCategoryEvents(@Param('id') id: number): Promise<Event[]> {
        return this.eventCategoriesService.getCategoryEvents(id);
    }

    @Get(':name')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تصنيف فعالية محدد بالاسم', 'none', null, null, "تصنيفات الفعاليات")
    async getEvent(@Param('name') name: string): Promise<EventCategory> {
        return this.eventCategoriesService.getCategoryByName(name);
    }
}
