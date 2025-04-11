import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { Message } from '@shared/prisma';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateMessageDto } from '@/dtos/Message.create.dto';
import { UpdateMessageDto } from '@/dtos/Message.update.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('messages')
@Controller('messages')
export class MessagesController extends BaseController<Message> {
    constructor(private readonly messagesService: MessagesService) {
        super(messagesService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء رسالة جديدة', 'create', CreateMessageDto, null, "الرسائل")
    async create(@Body() createMessageDto: CreateMessageDto) {
        return this.messagesService.create(createMessageDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث رسالة محددة', 'update', UpdateMessageDto, null, "الرسائل")
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.messagesService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الرسائل', 'none', null, null, "الرسائل")
    async findAll(@Query() query: PaginationDto) {
        return this.messagesService.findAll(query);
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل الرسالة محددة', 'none', null, null, "الرسائل")
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.messagesService.findOne(id);
    }
    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل الرسالة مع جميع العلاقات', 'none', null, null, "الرسائل")
    async getMessageProfile(@Param('id', ParseIntPipe) id: number) {
        return this.messagesService.getMessageProfile(id);
    }

    @Get('sent/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الرسائل المرسلة من قبل مستخدم محدد', 'none', null, null, "الرسائل")
    async getUserSentMessages(@Param('userId', ParseIntPipe) userId: number) {
        return this.messagesService.getUserSentMessages(userId);
    }

    @Get('received/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الرسائل المستلمة من قبل مستخدم محدد', 'none', null, null, "الرسائل")
    async getUserReceivedMessages(@Param('userId', ParseIntPipe) userId: number) {
        return this.messagesService.getUserReceivedMessages(userId);
    }

    @Get('room/:roomId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الرسائل في غرفة محددة', 'none', null, null, "الرسائل")
    async getRoomMessages(@Param('roomId', ParseIntPipe) roomId: number) {
        return this.messagesService.getRoomMessages(roomId);
    }

    @Put(':id/read')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث حالة الرسالة كمقروءة', 'update', UpdateMessageDto, null, "الرسائل")
    async markAsRead(@Param('id', ParseIntPipe) id: number) {
        return this.messagesService.markAsRead(id);
    }
} 