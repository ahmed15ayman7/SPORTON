import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserBehaviorsService } from './user-behaviors.service';
import { CreateUserBehaviorDto } from './dto/create-user-behavior.dto';
import { UpdateUserBehaviorDto } from './dto/update-user-behavior.dto';

@ApiTags('سلوك المستخدم')
@Controller('user-behaviors')
export class UserBehaviorsController {
    constructor(private readonly userBehaviorsService: UserBehaviorsService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة سلوك مستخدم جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة سلوك المستخدم بنجاح' })
    create(@Body() createUserBehaviorDto: CreateUserBehaviorDto) {
        return this.userBehaviorsService.create(createUserBehaviorDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع سلوكيات المستخدمين' })
    @ApiResponse({ status: 200, description: 'تم جلب سلوكيات المستخدمين بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.userBehaviorsService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل سلوك مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل سلوك المستخدم بنجاح' })
    findOne(@Param('id') id: string) {
        return this.userBehaviorsService.getUserBehaviorProfile(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على جميع سلوكيات مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب سلوكيات المستخدم بنجاح' })
    getUserBehaviors(@Param('userId') userId: string) {
        return this.userBehaviorsService.getUserBehaviors(+userId);
    }

    @Get('type/:interactionType')
    @ApiOperation({ summary: 'الحصول على جميع السلوكيات حسب نوع التفاعل' })
    @ApiResponse({ status: 200, description: 'تم جلب السلوكيات بنجاح' })
    getBehaviorsByType(@Param('interactionType') interactionType: string) {
        return this.userBehaviorsService.getBehaviorsByType(interactionType);
    }

    @Get('content-type/:contentType')
    @ApiOperation({ summary: 'الحصول على جميع السلوكيات حسب نوع المحتوى' })
    @ApiResponse({ status: 200, description: 'تم جلب السلوكيات بنجاح' })
    getBehaviorsByContentType(@Param('contentType') contentType: string) {
        return this.userBehaviorsService.getBehaviorsByContentType(contentType);
    }

    @Get('date-range')
    @ApiOperation({ summary: 'الحصول على جميع السلوكيات في نطاق تاريخ معين' })
    @ApiResponse({ status: 200, description: 'تم جلب السلوكيات بنجاح' })
    getBehaviorsByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.userBehaviorsService.getBehaviorsByDateRange(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get('day-of-week/:dayOfWeek')
    @ApiOperation({ summary: 'الحصول على جميع السلوكيات في يوم معين من الأسبوع' })
    @ApiResponse({ status: 200, description: 'تم جلب السلوكيات بنجاح' })
    getBehaviorsByDayOfWeek(@Param('dayOfWeek') dayOfWeek: string) {
        return this.userBehaviorsService.getBehaviorsByDayOfWeek(+dayOfWeek);
    }

    @Get('user/:userId/positive')
    @ApiOperation({ summary: 'الحصول على جميع السلوكيات الإيجابية لمستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب السلوكيات الإيجابية بنجاح' })
    getPositiveBehaviors(@Param('userId') userId: string) {
        return this.userBehaviorsService.getPositiveBehaviors(+userId);
    }

    @Get('user/:userId/negative')
    @ApiOperation({ summary: 'الحصول على جميع السلوكيات السلبية لمستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب السلوكيات السلبية بنجاح' })
    getNegativeBehaviors(@Param('userId') userId: string) {
        return this.userBehaviorsService.getNegativeBehaviors(+userId);
    }

    @Get('user/:userId/analytics')
    @ApiOperation({ summary: 'الحصول على تحليلات سلوك مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب التحليلات بنجاح' })
    getUserBehaviorAnalytics(@Param('userId') userId: string) {
        return this.userBehaviorsService.getUserBehaviorAnalytics(+userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات سلوك مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات سلوك المستخدم بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateUserBehaviorDto: UpdateUserBehaviorDto,
    ) {
        return this.userBehaviorsService.update(+id, updateUserBehaviorDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف سلوك مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم حذف سلوك المستخدم بنجاح' })
    remove(@Param('id') id: string) {
        return this.userBehaviorsService.remove(+id);
    }
} 