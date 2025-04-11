import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { StreamingInfoService } from './streaming-info.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateStreamingInfoDto } from '@/dtos/StreamingInfo.update.dto';
import { StreamingInfo } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateStreamingInfoDto } from '@/dtos/StreamingInfo.create.dto';
@ApiTags('معلومات البث')
@Controller('streaming-info')
export class StreamingInfoController extends BaseController<StreamingInfo> {
    constructor(private readonly streamingInfoService: StreamingInfoService) {
        super(streamingInfoService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء معلومات بث جديدة', 'none', null, CreateStreamingInfoDto, 'معلومات البث')
    create(@Body() createStreamingInfoDto: StreamingInfo) {
        return this.streamingInfoService.create(createStreamingInfoDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث معلومات بث محددة', 'none', UpdateStreamingInfoDto, null, 'معلومات البث')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateStreamingInfoDto: UpdateStreamingInfoDto) {
        return this.streamingInfoService.update(id, updateStreamingInfoDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع معلومات البث', 'none', null, null, 'معلومات البث')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() paginationDto: PaginationDto) {
        return this.streamingInfoService.findAll(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على معلومات بث محددة', 'none', null, null, 'معلومات البث')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.streamingInfoService.findOne(id);
    }

    @Get('event/:eventId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على معلومات بث فعالية محددة', 'none', null, null, 'معلومات البث')
    findByEvent(@Param('eventId') eventId: string) {
        return this.streamingInfoService.findByEvent(+eventId);
    }

    @Patch(':id/toggle-live')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تبديل حالة البث المباشر', 'none', null, null, 'معلومات البث')
    toggleLive(@Param('id', ParseIntPipe) id: number) {
        return this.streamingInfoService.toggleLive(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف معلومات بث محددة', 'none', null, null, 'معلومات البث')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.streamingInfoService.remove(id);
    }
} 