import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserBehaviorsService } from './user-behaviors.service';
import { UserBehavior } from '@prisma/client';
import { BaseController } from '@/common/controllers/base.controller';
@ApiTags('سلوك المستخدم')
@Controller('user-behaviors')
export class UserBehaviorsController extends BaseController<UserBehavior> {
    constructor(private readonly userBehaviorsService: UserBehaviorsService) {
        super(userBehaviorsService);
    }


    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على جميع سلوكيات مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب سلوكيات المستخدم بنجاح' })
    getUserBehaviors(@Param('userId') userId: string): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getUserBehaviors(+userId);
    }

    @Get('type/:interactionType')
    @ApiOperation({ summary: 'الحصول على جميع السلوكيات حسب نوع التفاعل' })
    @ApiResponse({ status: 200, description: 'تم جلب السلوكيات بنجاح' })
    getBehaviorsByType(@Param('interactionType') interactionType: string): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getBehaviorsByType(interactionType);
    }

    @Get('content-type/:contentType')
    @ApiOperation({ summary: 'الحصول على جميع السلوكيات حسب نوع المحتوى' })
    @ApiResponse({ status: 200, description: 'تم جلب السلوكيات بنجاح' })
    getBehaviorsByContentType(@Param('contentType') contentType: string): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getBehaviorsByContentType(contentType);
    }

    @Get('date-range')
    @ApiOperation({ summary: 'الحصول على جميع السلوكيات في نطاق تاريخ معين' })
    @ApiResponse({ status: 200, description: 'تم جلب السلوكيات بنجاح' })
    getBehaviorsByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getBehaviorsByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get('day-of-week/:dayOfWeek')
    @ApiOperation({ summary: 'الحصول على جميع السلوكيات في يوم معين من الأسبوع' })
    @ApiResponse({ status: 200, description: 'تم جلب السلوكيات بنجاح' })
    getBehaviorsByDayOfWeek(@Param('dayOfWeek') dayOfWeek: string): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getBehaviorsByDayOfWeek(+dayOfWeek);
    }

    @Get('user/:userId/positive')
    @ApiOperation({ summary: 'الحصول على جميع السلوكيات الإيجابية لمستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب السلوكيات الإيجابية بنجاح' })
    getPositiveBehaviors(@Param('userId') userId: string): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getPositiveBehaviors(+userId);
    }

    @Get('user/:userId/negative')
    @ApiOperation({ summary: 'الحصول على جميع السلوكيات السلبية لمستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب السلوكيات السلبية بنجاح' })
    getNegativeBehaviors(@Param('userId') userId: string): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getNegativeBehaviors(+userId);
    }

    @Get('user/:userId/analytics')
    @ApiOperation({ summary: 'الحصول على تحليلات سلوك مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب التحليلات بنجاح' })
    getUserBehaviorAnalytics(@Param('userId') userId: string): Promise<{
        totalInteractions: number;
        averageTimeSpent: number;
        averageScore: number;
        averageSessionDuration: number;
        positiveInteractions: number;
        negativeInteractions: number;
        interactionTypes: {};
        contentTypes: {};
        dayOfWeekDistribution: {};
    }> {
        return this.userBehaviorsService.getUserBehaviorAnalytics(+userId);
    }
} 