import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationActionService } from './notification-action.service';
import { CreateNotificationActionDto } from '@/dtos/NotificationAction.create.dto';
import { UpdateNotificationActionDto } from '@/dtos/NotificationAction.update.dto';
import { NotificationAction } from '@shared/prisma';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('إجراءات الإشعارات')
@Controller('notification-actions')
export class NotificationActionController extends BaseController<NotificationAction> {
    constructor(private readonly notificationActionService: NotificationActionService) {
        super(notificationActionService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء إجراء إشعار جديد', 'create', CreateNotificationActionDto, null, "إجراءات الإشعارات")
    async create(@Body() createNotificationActionDto: CreateNotificationActionDto): Promise<NotificationAction> {
        return this.notificationActionService.create(createNotificationActionDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث إجراء إشعار محدد', 'update', UpdateNotificationActionDto, null, "إجراءات الإشعارات")
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<NotificationAction> {
        return this.notificationActionService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع إجراءات الإشعارات', 'none', null, null, "إجراءات الإشعارات")
    async findAll(@Query() params: PaginationDto): Promise<PaginatedResponse<NotificationAction>> {
        return this.notificationActionService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إجراء إشعار محدد', 'none', null, null, "إجراءات الإشعارات")
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<NotificationAction> {
        return this.notificationActionService.findOne(id);
    }

    @Get('notification/:notificationId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على إجراء إشعار محدد', 'none', null, null, "إجراءات الإشعارات")
    async findByNotification(@Param('notificationId') notificationId: string): Promise<NotificationAction> {
        return this.notificationActionService.findByNotification(+notificationId);
    }


    @Patch(':id/complete')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إكمال إجراء إشعار محدد', 'update', UpdateNotificationActionDto, null, "إجراءات الإشعارات")
    async complete(@Param('id') id: string): Promise<NotificationAction> {
        return this.notificationActionService.complete(+id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف إجراء إشعار محدد', 'none', null, null, "إجراءات الإشعارات")
    async remove(@Param('id') id: string): Promise<NotificationAction> {
        return this.notificationActionService.remove(+id);
    }
} 