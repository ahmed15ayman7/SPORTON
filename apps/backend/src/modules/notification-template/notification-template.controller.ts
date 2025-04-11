import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationTemplateService } from './notification-template.service';
import { CreateNotificationTemplateDto } from '@/dtos/NotificationTemplate.create.dto';
import { UpdateNotificationTemplateDto } from '@/dtos/NotificationTemplate.update.dto';
import { NotificationTemplate, NotificationType } from '@shared/prisma';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('قوالب الإشعارات')
@Controller('notification-templates')
export class NotificationTemplateController extends BaseController<NotificationTemplate> {
    constructor(private readonly notificationTemplateService: NotificationTemplateService) {
        super(notificationTemplateService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء قالب إشعارات جديد', 'create', CreateNotificationTemplateDto, null, "قوالب الإشعارات")
    create(@Body() createNotificationTemplateDto: CreateNotificationTemplateDto): Promise<NotificationTemplate> {
        return this.notificationTemplateService.create(createNotificationTemplateDto as NotificationTemplate);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث قالب إشعارات محدد', 'update', UpdateNotificationTemplateDto, null, "قوالب الإشعارات")
    update(@Param('id') id: number, @Body() updateNotificationTemplateDto: UpdateNotificationTemplateDto): Promise<NotificationTemplate> {
        return this.notificationTemplateService.update(id, updateNotificationTemplateDto as NotificationTemplate);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع قوالب الإشعارات', 'none', null, null, "قوالب الإشعارات")
    findAll(): Promise<PaginatedResponse<NotificationTemplate>> {
        return this.notificationTemplateService.findAll();
    }

    @Get('active')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على قوالب الإشعارات النشطة', 'none', null, null, "قوالب الإشعارات")
    findActive(): Promise<NotificationTemplate[]> {
        return this.notificationTemplateService.findActive();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على قالب إشعارات محدد', 'none', null, null, "قوالب الإشعارات")
    findOne(@Param('id') id: number): Promise<NotificationTemplate> {
        return this.notificationTemplateService.findOne(id);
    }

    @Get('type/:type')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على قوالب إشعارات بنوع محدد', 'none', null, null, "قوالب الإشعارات")
    findByType(@Param('type') type: string): Promise<NotificationTemplate[]> {
        return this.notificationTemplateService.findByType(type as NotificationType);
    }

    @Get('language/:language')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على قوالب إشعارات بلغة محددة', 'none', null, null, "قوالب الإشعارات")
    findByLanguage(@Param('language') language: string): Promise<NotificationTemplate[]> {
        return this.notificationTemplateService.findByLanguage(language);
    }

    @Patch(':id/toggle-active')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تفعيل/تعطيل قالب إشعارات محدد', 'update', UpdateNotificationTemplateDto, null, "قوالب الإشعارات")
    toggleActive(@Param('id') id: number): Promise<NotificationTemplate> {
        return this.notificationTemplateService.toggleActive(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف قالب إشعارات محدد', 'none', null, null, "قوالب الإشعارات")
    remove(@Param('id') id: number): Promise<NotificationTemplate> {
        return this.notificationTemplateService.remove(id);
    }
} 