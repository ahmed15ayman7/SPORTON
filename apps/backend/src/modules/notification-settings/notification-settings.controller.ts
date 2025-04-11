import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationSettingsService } from './notification-settings.service';
import { CreateNotificationSettingsDto } from '@/dtos/NotificationSettings.create.dto';
import { UpdateNotificationSettingsDto } from '@/dtos/NotificationSettings.update.dto';
import { NotificationSettings } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('إعدادات الإشعارات')
@Controller('notification-settings')
export class NotificationSettingsController extends BaseController<NotificationSettings> {
    constructor(private readonly notificationSettingsService: NotificationSettingsService) {
        super(notificationSettingsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء إعدادات إشعارات جديدة', 'create', CreateNotificationSettingsDto, null, "إعدادات الإشعارات")
    create(@Body() createNotificationSettingsDto: CreateNotificationSettingsDto): Promise<NotificationSettings> {
        return this.notificationSettingsService.create(createNotificationSettingsDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث إعدادات إشعارات محددة', 'update', UpdateNotificationSettingsDto, null, "إعدادات الإشعارات")
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<NotificationSettings> {
        return this.notificationSettingsService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع إعدادات الإشعارات', 'none', null, null, "إعدادات الإشعارات")
    async findAll(params: PaginationDto): Promise<PaginatedResponse<NotificationSettings>> {
        return this.notificationSettingsService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إعدادات إشعارات محددة', 'none', null, null, "إعدادات الإشعارات")
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<NotificationSettings> {
        return this.notificationSettingsService.findOne(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إعدادات إشعارات مستخدم محدد', 'none', null, null, "إعدادات الإشعارات")
    async findByUser(@Param('userId') userId: string): Promise<NotificationSettings> {
        return this.notificationSettingsService.findByUser(+userId);
    }


    @Patch('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث إعدادات إشعارات مستخدم محدد', 'update', UpdateNotificationSettingsDto, null, "إعدادات الإشعارات")
    async updateByUser(
        @Param('userId') userId: string,
        @Body() updateNotificationSettingsDto: UpdateNotificationSettingsDto,
    ): Promise<NotificationSettings> {
        return this.notificationSettingsService.updateByUser(+userId, updateNotificationSettingsDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف إعدادات إشعارات محددة', 'none', null, null, "إعدادات الإشعارات")
    async remove(@Param('id') id: string): Promise<NotificationSettings> {
        return this.notificationSettingsService.remove(+id);
    }
} 