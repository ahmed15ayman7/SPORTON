import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationLogService } from './notification-log.service';
import { CreateNotificationLogDto } from '@/dtos/NotificationLog.create.dto';
import { UpdateNotificationLogDto } from '@/dtos/NotificationLog.update.dto';
import { NotificationLog } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@ApiTags('سجلات الإشعارات')
@Controller('notification-logs')
export class NotificationLogController extends BaseController<NotificationLog> {
    constructor(private readonly notificationLogService: NotificationLogService) {
        super(notificationLogService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء سجل إشعارات جديد', 'create', CreateNotificationLogDto, null, "سجلات الإشعارات")
    async create(@Body() createNotificationLogDto: CreateNotificationLogDto): Promise<NotificationLog> {
        return this.notificationLogService.create(createNotificationLogDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث سجل إشعارات محدد', 'update', UpdateNotificationLogDto, null, "سجلات الإشعارات")
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Promise<NotificationLog> {
        return this.notificationLogService.update(id, data);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع سجلات الإشعارات', 'none', null, null, "سجلات الإشعارات")
    async findAll(params: PaginationDto): Promise<PaginatedResponse<NotificationLog>> {
        return this.notificationLogService.findAll(params);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على سجل إشعارات محدد', 'none', null, null, "سجلات الإشعارات")
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<NotificationLog> {
        return this.notificationLogService.findOne(id);
    }

    @Get('notification/:notificationId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على سجلات إشعار محدد', 'none', null, null, "سجلات الإشعارات")
    async findByNotification(@Param('notificationId') notificationId: string): Promise<NotificationLog[]> {
        return this.notificationLogService.findByNotification(+notificationId);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على سجلات إشعارات بحالة محددة', 'none', null, null, "سجلات الإشعارات")
    async findByStatus(@Param('status') status: string): Promise<NotificationLog[]> {
        return this.notificationLogService.findByStatus(status);
    }

    @Get('channel/:channel')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على سجلات إشعارات بقناة محددة', 'none', null, null, "سجلات الإشعارات")
    async findByChannel(@Param('channel') channel: string): Promise<NotificationLog[]> {
        return this.notificationLogService.findByChannel(channel);
    }


    @Patch(':id/increment-attempts')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('زيادة عدد محاولات إرسال سجل إشعارات محدد', 'update', UpdateNotificationLogDto, null, "سجلات الإشعارات")
    async incrementAttempts(@Param('id') id: string): Promise<NotificationLog> {
        return this.notificationLogService.incrementAttempts(+id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف سجل إشعارات محدد', 'none', null, null, "سجلات الإشعارات")
    async remove(@Param('id') id: string): Promise<NotificationLog> {
        return this.notificationLogService.remove(+id);
    }
} 