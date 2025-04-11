import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationGroupService } from './notification-group.service';
import { CreateNotificationGroupDto } from '@/dtos/NotificationGroup.create.dto';
import { UpdateNotificationGroupDto } from '@/dtos/NotificationGroup.update.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { NotificationGroup } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('مجموعات الإشعارات')
@Controller('notification-groups')
export class NotificationGroupController extends BaseController<NotificationGroup> {
    constructor(private readonly notificationGroupService: NotificationGroupService) {
        super(notificationGroupService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء مجموعة إشعارات جديدة', 'create', CreateNotificationGroupDto, null, "مجموعات الإشعارات")
    create(@Body() createNotificationGroupDto: CreateNotificationGroupDto & { notifications: number[] }) {
        return this.notificationGroupService.create(createNotificationGroupDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث مجموعة إشعارات محددة', 'update', UpdateNotificationGroupDto, null, "مجموعات الإشعارات")
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.notificationGroupService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع مجموعات الإشعارات', 'none', null, null, "مجموعات الإشعارات")
    findAll(@Query() query: PaginationDto): Promise<PaginatedResponse<NotificationGroup>> {
        return this.notificationGroupService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على مجموعة إشعارات محددة', 'none', null, null, "مجموعات الإشعارات")
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.notificationGroupService.findOne(+id);
    }


    @Patch(':id/notifications/:notificationId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة إشعار إلى مجموعة إشعارات محددة', 'update', UpdateNotificationGroupDto, null, "مجموعات الإشعارات")
    addNotification(
        @Param('id') id: string,
        @Param('notificationId') notificationId: string,
    ) {
        return this.notificationGroupService.addNotification(+id, +notificationId);
    }

    @Delete(':id/notifications/:notificationId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إزالة إشعار من مجموعة إشعارات محددة', 'none', null, null, "مجموعات الإشعارات")
    removeNotification(
        @Param('id') id: string,
        @Param('notificationId') notificationId: string,
    ) {
        return this.notificationGroupService.removeNotification(+id, +notificationId);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف مجموعة إشعارات محددة', 'none', null, null, "مجموعات الإشعارات")
    remove(@Param('id') id: string) {
        return this.notificationGroupService.remove(+id);
    }
} 