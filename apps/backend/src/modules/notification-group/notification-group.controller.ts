import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationGroupService } from './notification-group.service';
import { CreateNotificationGroupDto } from './dto/create-notification-group.dto';
import { UpdateNotificationGroupDto } from './dto/update-notification-group.dto';

@ApiTags('مجموعات الإشعارات')
@Controller('notification-groups')
export class NotificationGroupController {
    constructor(private readonly notificationGroupService: NotificationGroupService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء مجموعة إشعارات جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء مجموعة الإشعارات بنجاح' })
    create(@Body() createNotificationGroupDto: CreateNotificationGroupDto) {
        return this.notificationGroupService.create(createNotificationGroupDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع مجموعات الإشعارات' })
    @ApiResponse({ status: 200, description: 'تم جلب مجموعات الإشعارات بنجاح' })
    findAll() {
        return this.notificationGroupService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على مجموعة إشعارات محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب مجموعة الإشعارات بنجاح' })
    findOne(@Param('id') id: string) {
        return this.notificationGroupService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث مجموعة إشعارات محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث مجموعة الإشعارات بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateNotificationGroupDto: UpdateNotificationGroupDto,
    ) {
        return this.notificationGroupService.update(+id, updateNotificationGroupDto);
    }

    @Patch(':id/notifications/:notificationId')
    @ApiOperation({ summary: 'إضافة إشعار إلى مجموعة إشعارات محددة' })
    @ApiResponse({ status: 200, description: 'تم إضافة الإشعار إلى المجموعة بنجاح' })
    addNotification(
        @Param('id') id: string,
        @Param('notificationId') notificationId: string,
    ) {
        return this.notificationGroupService.addNotification(+id, +notificationId);
    }

    @Delete(':id/notifications/:notificationId')
    @ApiOperation({ summary: 'إزالة إشعار من مجموعة إشعارات محددة' })
    @ApiResponse({ status: 200, description: 'تم إزالة الإشعار من المجموعة بنجاح' })
    removeNotification(
        @Param('id') id: string,
        @Param('notificationId') notificationId: string,
    ) {
        return this.notificationGroupService.removeNotification(+id, +notificationId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف مجموعة إشعارات محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف مجموعة الإشعارات بنجاح' })
    remove(@Param('id') id: string) {
        return this.notificationGroupService.remove(+id);
    }
} 