import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../../common/controllers/base.controller';
import { MessagesService } from './messages.service';
import { Message } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@ApiTags('messages')
@Controller('messages')
export class MessagesController extends BaseController<Message> {
    constructor(private readonly messagesService: MessagesService) {
        super(messagesService);
    }

    @Get('profile/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get message profile with all relations' })
    @ApiResponse({ status: 200, description: 'Return message profile.' })
    async getMessageProfile(@Param('id', ParseIntPipe) id: number) {
        return this.messagesService.getMessageProfile(id);
    }

    @Get('sent/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user sent messages' })
    @ApiResponse({ status: 200, description: 'Return user sent messages.' })
    async getUserSentMessages(@Param('userId', ParseIntPipe) userId: number) {
        return this.messagesService.getUserSentMessages(userId);
    }

    @Get('received/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user received messages' })
    @ApiResponse({ status: 200, description: 'Return user received messages.' })
    async getUserReceivedMessages(@Param('userId', ParseIntPipe) userId: number) {
        return this.messagesService.getUserReceivedMessages(userId);
    }

    @Get('room/:roomId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get room messages' })
    @ApiResponse({ status: 200, description: 'Return room messages.' })
    async getRoomMessages(@Param('roomId', ParseIntPipe) roomId: number) {
        return this.messagesService.getRoomMessages(roomId);
    }

    @Put(':id/read')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Mark message as read' })
    @ApiResponse({ status: 200, description: 'Message has been marked as read.' })
    async markAsRead(@Param('id', ParseIntPipe) id: number) {
        return this.messagesService.markAsRead(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new message' })
    @ApiResponse({ status: 201, description: 'The message has been successfully created.' })
    async create(@Body() createMessageDto: CreateMessageDto) {
        return this.messagesService.create(createMessageDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a message' })
    @ApiResponse({ status: 200, description: 'The message has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMessageDto: UpdateMessageDto,
    ) {
        return this.messagesService.update(id, updateMessageDto);
    }
} 