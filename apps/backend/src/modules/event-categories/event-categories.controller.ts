import { Controller, Get, Param } from '@nestjs/common';
import { EventCategoriesService } from './event-categories.service';
import { EventCategory, Event } from '@prisma/client';
import { BaseController } from '../../common/controllers/base.controller';
@Controller('event-categories')
export class EventCategoriesController extends BaseController<EventCategory> {
    constructor(private readonly eventCategoriesService: EventCategoriesService) {
        super(eventCategoriesService);
    }

    @Get(':id/events')
    async getCategoryEvents(@Param('id') id: number): Promise<Event[]> {
        return this.eventCategoriesService.getCategoryEvents(id);
    }

    @Get(':id')
    async getCategoryProfile(@Param('id') id: number): Promise<EventCategory> {
        return this.eventCategoriesService.getEventCategoryProfile(id);
    }
    @Get(':name')
    async getEvent(@Param('name') name: string): Promise<EventCategory> {
        return this.eventCategoriesService.getCategoryByName(name);
    }
}
