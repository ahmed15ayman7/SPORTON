import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationActionService } from './notification-action.service';
import { CreateNotificationActionDto } from './dto/create-notification-action.dto';
import { UpdateNotificationActionDto } from './dto/update-notification-action.dto';

@ApiTags('إجراءات الإشعارات')
@Controller('notification-actions')
export class NotificationActionController {
    constructor(private readonly notificationActionService: NotificationActionService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء إجراء إشعار جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء إجراء الإشعار بنجاح' })
    create(@Body() createNotificationActionDto: CreateNotificationActionDto) {
        return this.notificationActionService.create(createNotificationActionDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع إجراءات الإشعارات' })
    @ApiResponse({ status: 200, description: 'تم جلب إجراءات الإشعارات بنجاح' })
    findAll() {
        return this.notificationActionService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على إجراء إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب إجراء الإشعار بنجاح' })
    findOne(@Param('id') id: string) {
        return this.notificationActionService.findOne(+id);
    }

    @Get('notification/:notificationId')
    @ApiOperation({ summary: 'الحصول على إجراء إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب إجراء الإشعار بنجاح' })
    findByNotification(@Param('notificationId') notificationId: string) {
        return this.notificationActionService.findByNotification(+notificationId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث إجراء إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث إجراء الإشعار بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateNotificationActionDto: UpdateNotificationActionDto,
    ) {
        return this.notificationActionService.update(+id, updateNotificationActionDto);
    }

    @Patch(':id/complete')
    @ApiOperation({ summary: 'إكمال إجراء إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم إكمال إجراء الإشعار بنجاح' })
    complete(@Param('id') id: string) {
        return this.notificationActionService.complete(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف إجراء إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف إجراء الإشعار بنجاح' })
    remove(@Param('id') id: string) {
        return this.notificationActionService.remove(+id);
    }
} 