import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserSegmentService } from './user-segment.service';
import { CreateUserSegmentDto } from './dto/create-user-segment.dto';
import { UpdateUserSegmentDto } from './dto/update-user-segment.dto';

@ApiTags('فئة المستخدم')
@Controller('user-segment')
export class UserSegmentController {
    constructor(private readonly userSegmentService: UserSegmentService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة فئة مستخدم جديدة' })
    @ApiResponse({ status: 201, description: 'تم إضافة فئة المستخدم بنجاح' })
    create(@Body() createUserSegmentDto: CreateUserSegmentDto) {
        return this.userSegmentService.create(createUserSegmentDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع فئات المستخدم' })
    @ApiResponse({ status: 200, description: 'تم جلب فئات المستخدم بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.userSegmentService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل فئة مستخدم معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل فئة المستخدم بنجاح' })
    findOne(@Param('id') id: string) {
        return this.userSegmentService.getSegmentProfile(+id);
    }

    @Get(':id/users')
    @ApiOperation({ summary: 'الحصول على جميع المستخدمين في فئة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب المستخدمين بنجاح' })
    getSegmentUsers(@Param('id') id: string) {
        return this.userSegmentService.getSegmentUsers(+id);
    }

    @Get(':id/targeting')
    @ApiOperation({ summary: 'الحصول على جميع استهدافات الإعلانات لفئة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب استهدافات الإعلانات بنجاح' })
    getSegmentTargeting(@Param('id') id: string) {
        return this.userSegmentService.getSegmentTargeting(+id);
    }

    @Get(':id/performance')
    @ApiOperation({ summary: 'الحصول على جميع أداء الاستهداف لفئة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب أداء الاستهداف بنجاح' })
    getSegmentPerformance(@Param('id') id: string) {
        return this.userSegmentService.getSegmentPerformance(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات فئة مستخدم معينة' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات فئة المستخدم بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateUserSegmentDto: UpdateUserSegmentDto,
    ) {
        return this.userSegmentService.update(+id, updateUserSegmentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف فئة مستخدم معينة' })
    @ApiResponse({ status: 200, description: 'تم حذف فئة المستخدم بنجاح' })
    remove(@Param('id') id: string) {
        return this.userSegmentService.remove(+id);
    }
} 