import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserSegmentService } from './user-segment.service';
import { CreateUserSegmentDto } from './dto/create-user-segment.dto';
import { UpdateUserSegmentDto } from './dto/update-user-segment.dto';
import { BaseController } from '@/common/controllers/base.controller';
import { UserSegment, User, AdTargeting, TargetingPerformance } from '@shared/prisma';

@ApiTags('فئة المستخدم')
@Controller('user-segment')
export class UserSegmentController extends BaseController<UserSegment> {
    constructor(private readonly userSegmentService: UserSegmentService) {
        super(userSegmentService);
    }


    @Get(':id/users')
    @ApiOperation({ summary: 'الحصول على جميع المستخدمين في فئة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب المستخدمين بنجاح' })
    getSegmentUsers(@Param('id') id: string): Promise<User[]> {
        return this.userSegmentService.getSegmentUsers(+id);
    }

    @Get(':id/targeting')
    @ApiOperation({ summary: 'الحصول على جميع استهدافات الإعلانات لفئة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب استهدافات الإعلانات بنجاح' })
    getSegmentTargeting(@Param('id') id: string): Promise<AdTargeting[]> {
        return this.userSegmentService.getSegmentTargeting(+id);
    }

    @Get(':id/performance')
    @ApiOperation({ summary: 'الحصول على جميع أداء الاستهداف لفئة معينة' })
    @ApiResponse({ status: 200, description: 'تم جلب أداء الاستهداف بنجاح' })
    getSegmentPerformance(@Param('id') id: string): Promise<TargetingPerformance[]> {
        return this.userSegmentService.getSegmentPerformance(+id);
    }

} 