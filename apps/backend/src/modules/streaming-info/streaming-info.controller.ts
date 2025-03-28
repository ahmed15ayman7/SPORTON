import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StreamingInfoService } from './streaming-info.service';
import { CreateStreamingInfoDto } from './dto/create-streaming-info.dto';
import { UpdateStreamingInfoDto } from './dto/update-streaming-info.dto';

@ApiTags('معلومات البث')
@Controller('streaming-info')
export class StreamingInfoController {
    constructor(private readonly streamingInfoService: StreamingInfoService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء معلومات بث جديدة' })
    @ApiResponse({ status: 201, description: 'تم إنشاء معلومات البث بنجاح' })
    create(@Body() createStreamingInfoDto: CreateStreamingInfoDto) {
        return this.streamingInfoService.create(createStreamingInfoDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع معلومات البث' })
    @ApiResponse({ status: 200, description: 'تم جلب معلومات البث بنجاح' })
    findAll() {
        return this.streamingInfoService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على معلومات بث محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب معلومات البث بنجاح' })
    findOne(@Param('id') id: string) {
        return this.streamingInfoService.findOne(+id);
    }

    @Get('event/:eventId')
    @ApiOperation({ summary: 'الحصول على معلومات بث فعالية محددة' })
    @ApiResponse({ status: 200, description: 'تم جلب معلومات البث بنجاح' })
    findByEvent(@Param('eventId') eventId: string) {
        return this.streamingInfoService.findByEvent(+eventId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث معلومات بث محددة' })
    @ApiResponse({ status: 200, description: 'تم تحديث معلومات البث بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateStreamingInfoDto: UpdateStreamingInfoDto,
    ) {
        return this.streamingInfoService.update(+id, updateStreamingInfoDto);
    }

    @Patch(':id/toggle-live')
    @ApiOperation({ summary: 'تبديل حالة البث المباشر' })
    @ApiResponse({ status: 200, description: 'تم تبديل حالة البث المباشر بنجاح' })
    toggleLive(@Param('id') id: string) {
        return this.streamingInfoService.toggleLive(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف معلومات بث محددة' })
    @ApiResponse({ status: 200, description: 'تم حذف معلومات البث بنجاح' })
    remove(@Param('id') id: string) {
        return this.streamingInfoService.remove(+id);
    }
} 