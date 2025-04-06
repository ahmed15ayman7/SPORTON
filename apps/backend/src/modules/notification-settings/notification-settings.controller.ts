import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationSettingsService } from './notification-settings.service';
import { CreateNotificationSettingsDto } from './dto/create-notification-settings.dto';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings.dto';
import { NotificationSettings } from '@shared/prisma';
@ApiTags('إعدادات الإشعارات')
@Controller('notification-settings')
export class NotificationSettingsController {
    constructor(private readonly notificationSettingsService: NotificationSettingsService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء إعدادات إشعارات جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء إعدادات الإشعارات بنجاح' })
    async create(@Body() createNotificationSettingsDto: CreateNotificationSettingsDto): Promise<NotificationSettings> {
        return this.notificationSettingsService.create(createNotificationSettingsDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع إعدادات الإشعارات' })
    @ApiResponse({ status: 200, description: 'تم جلب إعدادات الإشعارات بنجاح' })
    async findAll(): Promise<NotificationSettings[]> {
        return this.notificationSettingsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على إعدادات إشعارات محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب إعدادات الإشعارات بنجاح' })
    async findOne(@Param('id') id: string): Promise<NotificationSettings> {
        return this.notificationSettingsService.findOne(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على إعدادات إشعارات مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب إعدادات الإشعارات بنجاح' })
    async findByUser(@Param('userId') userId: string): Promise<NotificationSettings> {
        return this.notificationSettingsService.findByUser(+userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث إعدادات إشعارات محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث إعدادات الإشعارات بنجاح' })
    async update(
        @Param('id') id: string,
        @Body() updateNotificationSettingsDto: UpdateNotificationSettingsDto,
    ): Promise<NotificationSettings> {
        return this.notificationSettingsService.update(+id, updateNotificationSettingsDto);
    }

    @Patch('user/:userId')
    @ApiOperation({ summary: 'تحديث إعدادات إشعارات مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث إعدادات الإشعارات بنجاح' })
    async updateByUser(
        @Param('userId') userId: string,
        @Body() updateNotificationSettingsDto: UpdateNotificationSettingsDto,
    ): Promise<NotificationSettings> {
        return this.notificationSettingsService.updateByUser(+userId, updateNotificationSettingsDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف إعدادات إشعارات محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف إعدادات الإشعارات بنجاح' })
    async remove(@Param('id') id: string): Promise<NotificationSettings> {
        return this.notificationSettingsService.remove(+id);
    }
} 