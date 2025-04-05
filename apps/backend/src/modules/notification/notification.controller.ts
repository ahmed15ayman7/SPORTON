import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from '@prisma/client';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';

@ApiTags('الإشعارات')
@Controller('notifications')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء إشعار جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء الإشعار بنجاح' })
    create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
        return this.notificationService.create(createNotificationDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الإشعارات' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الإشعارات بنجاح' })
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Notification>> {
        return this.notificationService.findAll(params);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم استرجاع تفاصيل الإشعار بنجاح' })
    findOne(@Param('id') id: string): Promise<Notification> {
        return this.notificationService.findOne(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على إشعارات مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم استرجاع إشعارات المستخدم بنجاح' })
    getUserNotifications(@Param('userId') userId: string): Promise<Notification[]> {
        return this.notificationService.getUserNotifications(+userId);
    }

    @Get('user/:userId/unread')
    @ApiOperation({ summary: 'الحصول على الإشعارات غير المقروءة لمستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الإشعارات غير المقروءة بنجاح' })
    getUnreadNotifications(@Param('userId') userId: string): Promise<Notification[]> {
        return this.notificationService.getUnreadNotifications(+userId);
    }

    @Get('user/:userId/read')
    @ApiOperation({ summary: 'الحصول على الإشعارات المقروءة لمستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الإشعارات المقروءة بنجاح' })
    getReadNotifications(@Param('userId') userId: string): Promise<Notification[]> {
        return this.notificationService.getReadNotifications(+userId);
    }

    @Patch(':id/read')
    @ApiOperation({ summary: 'تحديد إشعار كمقروء' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة الإشعار بنجاح' })
    markAsRead(@Param('id') id: string): Promise<Notification> {
        return this.notificationService.markAsRead(+id);
    }

    @Patch('user/:userId/read-all')
    @ApiOperation({ summary: 'تحديد جميع إشعارات المستخدم كمقروءة' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة جميع الإشعارات بنجاح' })
    markAllAsRead(@Param('userId') userId: string): Promise<Notification[]> {
        return this.notificationService.markAllAsRead(+userId);
    }

    @Get('user/:userId/type/:type')
    @ApiOperation({ summary: 'الحصول على إشعارات مستخدم محدد حسب النوع' })
    @ApiResponse({ status: 200, description: 'تم استرجاع الإشعارات حسب النوع بنجاح' })
    getNotificationsByType(
        @Param('userId') userId: string,
        @Param('type') type: string,
    ): Promise<Notification[]> {
        return this.notificationService.getNotificationsByType(+userId, type);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث الإشعار بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateNotificationDto: UpdateNotificationDto,
    ): Promise<Notification> {
        return this.notificationService.update(+id, updateNotificationDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف الإشعار بنجاح' })
    remove(@Param('id') id: string): Promise<Notification> {
        return this.notificationService.deleteNotification(+id);
    }

    @Delete('user/:userId')
    @ApiOperation({ summary: 'حذف جميع إشعارات مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف جميع إشعارات المستخدم بنجاح' })
    removeAll(@Param('userId') userId: string): Promise<Notification[]> {
        return this.notificationService.deleteAllNotifications(+userId);
    }
} 