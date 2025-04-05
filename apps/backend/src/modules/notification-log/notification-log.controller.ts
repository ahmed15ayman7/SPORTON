import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationLogService } from './notification-log.service';
import { CreateNotificationLogDto } from './dto/create-notification-log.dto';
import { UpdateNotificationLogDto } from './dto/update-notification-log.dto';
import { NotificationLog } from '@prisma/client';

@ApiTags('سجلات الإشعارات')
@Controller('notification-logs')
export class NotificationLogController {
    constructor(private readonly notificationLogService: NotificationLogService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء سجل إشعارات جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء سجل الإشعارات بنجاح' })
    async create(@Body() createNotificationLogDto: CreateNotificationLogDto): Promise<NotificationLog> {
        return this.notificationLogService.create(createNotificationLogDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع سجلات الإشعارات' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات الإشعارات بنجاح' })
    async findAll(): Promise<NotificationLog[]> {
        return this.notificationLogService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على سجل إشعارات محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب سجل الإشعارات بنجاح' })
    async findOne(@Param('id') id: string): Promise<NotificationLog> {
        return this.notificationLogService.findOne(+id);
    }

    @Get('notification/:notificationId')
    @ApiOperation({ summary: 'الحصول على سجلات إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات الإشعار بنجاح' })
    async findByNotification(@Param('notificationId') notificationId: string): Promise<NotificationLog[]> {
        return this.notificationLogService.findByNotification(+notificationId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على سجلات إشعارات بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات الإشعارات بنجاح' })
    async findByStatus(@Param('status') status: string): Promise<NotificationLog[]> {
        return this.notificationLogService.findByStatus(status);
    }

    @Get('channel/:channel')
    @ApiOperation({ summary: 'الحصول على سجلات إشعارات بقناة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات الإشعارات بنجاح' })
    async findByChannel(@Param('channel') channel: string): Promise<NotificationLog[]> {
        return this.notificationLogService.findByChannel(channel);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث سجل إشعارات محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث سجل الإشعارات بنجاح' })
    async update(
        @Param('id') id: string,
        @Body() updateNotificationLogDto: UpdateNotificationLogDto,
    ): Promise<NotificationLog> {
        return this.notificationLogService.update(+id, updateNotificationLogDto);
    }

    @Patch(':id/increment-attempts')
    @ApiOperation({ summary: 'زيادة عدد محاولات إرسال سجل إشعارات محدد' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد المحاولات بنجاح' })
    async incrementAttempts(@Param('id') id: string): Promise<NotificationLog> {
        return this.notificationLogService.incrementAttempts(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف سجل إشعارات محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف سجل الإشعارات بنجاح' })
    async remove(@Param('id') id: string): Promise<NotificationLog> {
        return this.notificationLogService.remove(+id);
    }
} 