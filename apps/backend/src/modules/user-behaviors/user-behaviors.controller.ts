import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UserBehaviorsService } from './user-behaviors.service';
import { UserBehavior } from '@shared/prisma';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { CreateUserBehaviorDto } from '@/dtos/UserBehavior.create.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UpdateUserBehaviorDto } from '@/dtos/UserBehavior.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
@ApiTags('سلوك المستخدم')
@Controller('user-behaviors')
export class UserBehaviorsController extends BaseController<UserBehavior> {
    constructor(private readonly userBehaviorsService: UserBehaviorsService) {
        super(userBehaviorsService);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إنشاء سلوك مستخدم جديد', 'none', CreateUserBehaviorDto, null, 'سلوك المستخدم')
    create(@Body() createUserBehaviorDto: CreateUserBehaviorDto) {
        return this.userBehaviorsService.create(createUserBehaviorDto as UserBehavior);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث سلوك مستخدم محدد', 'none', UpdateUserBehaviorDto, null, 'سلوك المستخدم')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.userBehaviorsService.update(id, data);
    }
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع سلوكيات المستخدم', 'none', null, null, 'سلوك المستخدم')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() query: PaginationDto) {
        return this.userBehaviorsService.findAll(query);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على سلوك مستخدم محدد', 'none', null, null, 'سلوك المستخدم')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userBehaviorsService.findOne(id);
    }
    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع سلوكيات مستخدم معين', 'none', null, null, 'سلوك المستخدم')
    getUserBehaviors(@Param('userId') userId: string): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getUserBehaviors(+userId);
    }

    @Get('type/:interactionType')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع السلوكيات حسب نوع التفاعل', 'none', null, null, 'سلوك المستخدم')
    getBehaviorsByType(@Param('interactionType') interactionType: string): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getBehaviorsByType(interactionType);
    }

    @Get('content-type/:contentType')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع السلوكيات حسب نوع المحتوى', 'none', null, null, 'سلوك المستخدم')
    getBehaviorsByContentType(@Param('contentType') contentType: string): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getBehaviorsByContentType(contentType);
    }

    @Get('date-range')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع السلوكيات في نطاق تاريخ معين', 'none', null, null, 'سلوك المستخدم')
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
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع السلوكيات في يوم معين من الأسبوع', 'none', null, null, 'سلوك المستخدم')
    getBehaviorsByDayOfWeek(@Param('dayOfWeek') dayOfWeek: string): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getBehaviorsByDayOfWeek(+dayOfWeek);
    }

    @Get('user/:userId/positive')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع السلوكيات الإيجابية لمستخدم معين', 'none', null, null, 'سلوك المستخدم')
    getPositiveBehaviors(@Param('userId') userId: string): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getPositiveBehaviors(+userId);
    }

    @Get('user/:userId/negative')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع السلوكيات السلبية لمستخدم معين', 'none', null, null, 'سلوك المستخدم')
    getNegativeBehaviors(@Param('userId') userId: string): Promise<UserBehavior[]> {
        return this.userBehaviorsService.getNegativeBehaviors(+userId);
    }

    @Get('user/:userId/analytics')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تحليلات سلوك مستخدم معين', 'none', null, null, 'سلوك المستخدم')
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
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف سلوك مستخدم محدد', 'none', null, null, 'سلوك المستخدم')
    remove(@Param('id') id: string) {
        return this.userBehaviorsService.remove(+id);
    }
} 