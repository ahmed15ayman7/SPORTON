import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationActionService } from './notification-action.service';
import { CreateNotificationActionDto } from './dto/create-notification-action.dto';
import { UpdateNotificationActionDto } from './dto/update-notification-action.dto';
import { NotificationAction } from '@shared/prisma';
@ApiTags('إجراءات الإشعارات')
@Controller('notification-actions')
export class NotificationActionController {
    constructor(private readonly notificationActionService: NotificationActionService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء إجراء إشعار جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء إجراء الإشعار بنجاح' })
    async create(@Body() createNotificationActionDto: CreateNotificationActionDto): Promise<NotificationAction> {
        return this.notificationActionService.create(createNotificationActionDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع إجراءات الإشعارات' })
    @ApiResponse({ status: 200, description: 'تم جلب إجراءات الإشعارات بنجاح' })
    async findAll(): Promise<NotificationAction[]> {
        return this.notificationActionService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على إجراء إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب إجراء الإشعار بنجاح' })
    async findOne(@Param('id') id: string): Promise<NotificationAction> {
        return this.notificationActionService.findOne(+id);
    }

    @Get('notification/:notificationId')
    @ApiOperation({ summary: 'الحصول على إجراء إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب إجراء الإشعار بنجاح' })
    async findByNotification(@Param('notificationId') notificationId: string): Promise<NotificationAction> {
        return this.notificationActionService.findByNotification(+notificationId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث إجراء إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث إجراء الإشعار بنجاح' })
    async update(
        @Param('id') id: string,
        @Body() updateNotificationActionDto: UpdateNotificationActionDto,
    ): Promise<NotificationAction> {
        return this.notificationActionService.update(+id, updateNotificationActionDto);
    }

    @Patch(':id/complete')
    @ApiOperation({ summary: 'إكمال إجراء إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم إكمال إجراء الإشعار بنجاح' })
    async complete(@Param('id') id: string): Promise<NotificationAction> {
        return this.notificationActionService.complete(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف إجراء إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف إجراء الإشعار بنجاح' })
    async remove(@Param('id') id: string): Promise<NotificationAction> {
        return this.notificationActionService.remove(+id);
    }
} 