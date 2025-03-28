import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationLogService } from './notification-log.service';
import { CreateNotificationLogDto } from './dto/create-notification-log.dto';
import { UpdateNotificationLogDto } from './dto/update-notification-log.dto';

@ApiTags('سجلات الإشعارات')
@Controller('notification-logs')
export class NotificationLogController {
    constructor(private readonly notificationLogService: NotificationLogService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء سجل إشعارات جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء سجل الإشعارات بنجاح' })
    create(@Body() createNotificationLogDto: CreateNotificationLogDto) {
        return this.notificationLogService.create(createNotificationLogDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع سجلات الإشعارات' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات الإشعارات بنجاح' })
    findAll() {
        return this.notificationLogService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على سجل إشعارات محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب سجل الإشعارات بنجاح' })
    findOne(@Param('id') id: string) {
        return this.notificationLogService.findOne(+id);
    }

    @Get('notification/:notificationId')
    @ApiOperation({ summary: 'الحصول على سجلات إشعار محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات الإشعار بنجاح' })
    findByNotification(@Param('notificationId') notificationId: string) {
        return this.notificationLogService.findByNotification(+notificationId);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على سجلات إشعارات بحالة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات الإشعارات بنجاح' })
    findByStatus(@Param('status') status: string) {
        return this.notificationLogService.findByStatus(status);
    }

    @Get('channel/:channel')
    @ApiOperation({ summary: 'الحصول على سجلات إشعارات بقناة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب سجلات الإشعارات بنجاح' })
    findByChannel(@Param('channel') channel: string) {
        return this.notificationLogService.findByChannel(channel);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث سجل إشعارات محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث سجل الإشعارات بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateNotificationLogDto: UpdateNotificationLogDto,
    ) {
        return this.notificationLogService.update(+id, updateNotificationLogDto);
    }

    @Patch(':id/increment-attempts')
    @ApiOperation({ summary: 'زيادة عدد محاولات إرسال سجل إشعارات محدد' })
    @ApiResponse({ status: 200, description: 'تم زيادة عدد المحاولات بنجاح' })
    incrementAttempts(@Param('id') id: string) {
        return this.notificationLogService.incrementAttempts(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف سجل إشعارات محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف سجل الإشعارات بنجاح' })
    remove(@Param('id') id: string) {
        return this.notificationLogService.remove(+id);
    }
} 