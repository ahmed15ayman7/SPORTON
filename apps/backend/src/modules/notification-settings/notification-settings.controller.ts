import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationSettingsService } from './notification-settings.service';
import { CreateNotificationSettingsDto } from './dto/create-notification-settings.dto';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings.dto';

@ApiTags('إعدادات الإشعارات')
@Controller('notification-settings')
export class NotificationSettingsController {
    constructor(private readonly notificationSettingsService: NotificationSettingsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء إعدادات إشعارات جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء إعدادات الإشعارات بنجاح' })
    create(@Body() createNotificationSettingsDto: CreateNotificationSettingsDto) {
        return this.notificationSettingsService.create(createNotificationSettingsDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع إعدادات الإشعارات' })
    @ApiResponse({ status: 200, description: 'تم جلب إعدادات الإشعارات بنجاح' })
    findAll() {
        return this.notificationSettingsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على إعدادات إشعارات محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب إعدادات الإشعارات بنجاح' })
    findOne(@Param('id') id: string) {
        return this.notificationSettingsService.findOne(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على إعدادات إشعارات مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب إعدادات الإشعارات بنجاح' })
    findByUser(@Param('userId') userId: string) {
        return this.notificationSettingsService.findByUser(+userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث إعدادات إشعارات محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث إعدادات الإشعارات بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateNotificationSettingsDto: UpdateNotificationSettingsDto,
    ) {
        return this.notificationSettingsService.update(+id, updateNotificationSettingsDto);
    }

    @Patch('user/:userId')
    @ApiOperation({ summary: 'تحديث إعدادات إشعارات مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث إعدادات الإشعارات بنجاح' })
    updateByUser(
        @Param('userId') userId: string,
        @Body() updateNotificationSettingsDto: UpdateNotificationSettingsDto,
    ) {
        return this.notificationSettingsService.updateByUser(+userId, updateNotificationSettingsDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف إعدادات إشعارات محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف إعدادات الإشعارات بنجاح' })
    remove(@Param('id') id: string) {
        return this.notificationSettingsService.remove(+id);
    }
} 