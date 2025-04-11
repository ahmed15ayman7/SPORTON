import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from '@/dtos/Notification.create.dto';
import { UpdateNotificationDto } from '@/dtos/Notification.update.dto';
import { Notification } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('الإشعارات')
@Controller('notifications')
export class NotificationController extends BaseController<Notification> {
    constructor(private readonly notificationService: NotificationService) {
        super(notificationService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء إشعار جديد', 'create', CreateNotificationDto, null, "الإشعارات")
    create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
        return this.notificationService.create(createNotificationDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث إشعار محدد', 'update', UpdateNotificationDto, null, "الإشعارات")
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<Notification> {
        return this.notificationService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الإشعارات', 'none', null, null, "الإشعارات")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<Notification>> {
        return this.notificationService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل إشعار محدد', 'none', null, null, "الإشعارات")
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Notification> {
        return this.notificationService.findOne(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إشعارات مستخدم محدد', 'none', null, null, "الإشعارات")
    getUserNotifications(@Param('userId') userId: string): Promise<Notification[]> {
        return this.notificationService.getUserNotifications(+userId);
    }

    @Get('user/:userId/unread')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الإشعارات غير المقروءة لمستخدم محدد', 'none', null, null, "الإشعارات")
    getUnreadNotifications(@Param('userId') userId: string): Promise<Notification[]> {
        return this.notificationService.getUnreadNotifications(+userId);
    }

    @Get('user/:userId/read')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الإشعارات المقروءة لمستخدم محدد', 'none', null, null, "الإشعارات")
    getReadNotifications(@Param('userId') userId: string): Promise<Notification[]> {
        return this.notificationService.getReadNotifications(+userId);
    }

    @Patch(':id/read')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديد إشعار كمقروء', 'update', UpdateNotificationDto, null, "الإشعارات")
    markAsRead(@Param('id') id: string): Promise<Notification> {
        return this.notificationService.markAsRead(+id);
    }

    @Patch('user/:userId/read-all')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديد جميع إشعارات المستخدم كمقروءة', 'update', UpdateNotificationDto, null, "الإشعارات")
    markAllAsRead(@Param('userId') userId: string): Promise<Notification[]> {
        return this.notificationService.markAllAsRead(+userId);
    }

    @Get('user/:userId/type/:type')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إشعارات مستخدم محدد حسب النوع', 'none', null, null, "الإشعارات")
    getNotificationsByType(
        @Param('userId') userId: string,
        @Param('type') type: string,
    ): Promise<Notification[]> {
        return this.notificationService.getNotificationsByType(+userId, type);
    }



    @Delete('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف جميع إشعارات مستخدم محدد', 'none', null, null, "الإشعارات")
    removeAll(@Param('userId') userId: string): Promise<Notification[]> {
        return this.notificationService.deleteAllNotifications(+userId);
    }
} 