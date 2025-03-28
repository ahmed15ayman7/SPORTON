import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationTemplateService } from './notification-template.service';
import { CreateNotificationTemplateDto } from './dto/create-notification-template.dto';
import { UpdateNotificationTemplateDto } from './dto/update-notification-template.dto';

@ApiTags('قوالب الإشعارات')
@Controller('notification-templates')
export class NotificationTemplateController {
    constructor(private readonly notificationTemplateService: NotificationTemplateService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء قالب إشعارات جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء قالب الإشعارات بنجاح' })
    create(@Body() createNotificationTemplateDto: CreateNotificationTemplateDto) {
        return this.notificationTemplateService.create(createNotificationTemplateDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع قوالب الإشعارات' })
    @ApiResponse({ status: 200, description: 'تم جلب قوالب الإشعارات بنجاح' })
    findAll() {
        return this.notificationTemplateService.findAll();
    }

    @Get('active')
    @ApiOperation({ summary: 'الحصول على قوالب الإشعارات النشطة' })
    @ApiResponse({ status: 200, description: 'تم جلب قوالب الإشعارات النشطة بنجاح' })
    findActive() {
        return this.notificationTemplateService.findActive();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على قالب إشعارات محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب قالب الإشعارات بنجاح' })
    findOne(@Param('id') id: string) {
        return this.notificationTemplateService.findOne(+id);
    }

    @Get('type/:type')
    @ApiOperation({ summary: 'الحصول على قوالب إشعارات بنوع محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب قوالب الإشعارات بنجاح' })
    findByType(@Param('type') type: string) {
        return this.notificationTemplateService.findByType(type);
    }

    @Get('language/:language')
    @ApiOperation({ summary: 'الحصول على قوالب إشعارات بلغة محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب قوالب الإشعارات بنجاح' })
    findByLanguage(@Param('language') language: string) {
        return this.notificationTemplateService.findByLanguage(language);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث قالب إشعارات محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث قالب الإشعارات بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateNotificationTemplateDto: UpdateNotificationTemplateDto,
    ) {
        return this.notificationTemplateService.update(+id, updateNotificationTemplateDto);
    }

    @Patch(':id/toggle-active')
    @ApiOperation({ summary: 'تفعيل/تعطيل قالب إشعارات محدد' })
    @ApiResponse({ status: 200, description: 'تم تغيير حالة قالب الإشعارات بنجاح' })
    toggleActive(@Param('id') id: string) {
        return this.notificationTemplateService.toggleActive(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف قالب إشعارات محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف قالب الإشعارات بنجاح' })
    remove(@Param('id') id: string) {
        return this.notificationTemplateService.remove(+id);
    }
} 