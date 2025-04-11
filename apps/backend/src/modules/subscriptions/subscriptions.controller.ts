import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from '@/dtos/Subscription.create.dto';
import { UpdateSubscriptionDto } from '@/dtos/Subscription.update.dto';
import { Subscription, SubscriptionStatus } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { BaseController, CustomApiDocs } from '../../common/controllers/base.controller';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
@ApiTags('الاشتراكات')
@Controller('subscriptions')
export class SubscriptionsController extends BaseController<Subscription> {
    constructor(private readonly subscriptionsService: SubscriptionsService) {
        super(subscriptionsService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة اشتراك جديد', 'none', null, CreateSubscriptionDto, 'الاشتراكات')
    create(@Body() createSubscriptionDto: Subscription): Promise<Subscription> {
        return this.subscriptionsService.create(createSubscriptionDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث اشتراك محدد', 'none', UpdateSubscriptionDto, null, 'الاشتراكات')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSubscriptionDto: UpdateSubscriptionDto): Promise<Subscription> {
        return this.subscriptionsService.update(id, updateSubscriptionDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الاشتراكات', 'none', null, null, 'الاشتراكات')
    @ApiQuery({ type: PaginationDto })
    findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Subscription>> {
        return this.subscriptionsService.findAll(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل اشتراك معين', 'none', null, null, 'الاشتراكات')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Subscription> {
        return this.subscriptionsService.getSubscriptionProfile(id);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع اشتراكات مستخدم معين', 'none', null, null, 'الاشتراكات')
    getUserSubscriptions(@Param('userId', ParseIntPipe) userId: number): Promise<Subscription[]> {
        return this.subscriptionsService.getUserSubscriptions(userId);
    }

    @Get('active')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الاشتراكات النشطة', 'none', null, null, 'الاشتراكات')
    getActiveSubscriptions(): Promise<Subscription[]> {
        return this.subscriptionsService.getActiveSubscriptions();
    }

    @Get('expired')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الاشتراكات المنتهية', 'none', null, null, 'الاشتراكات')
    getExpiredSubscriptions(): Promise<Subscription[]> {
        return this.subscriptionsService.getExpiredSubscriptions();
    }

    @Get('plan/:plan')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الاشتراكات حسب نوع الخطة', 'none', null, null, 'الاشتراكات')
    getSubscriptionsByPlan(@Param('plan') plan: string): Promise<Subscription[]> {
        return this.subscriptionsService.getSubscriptionsByPlan(plan);
    }

    @Get('status/:status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الاشتراكات حسب الحالة', 'none', null, null, 'الاشتراكات')
    getSubscriptionsByStatus(@Param('status') status: SubscriptionStatus): Promise<Subscription[]> {
        return this.subscriptionsService.getSubscriptionsByStatus(status);
    }

    @Patch(':id/status')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث حالة اشتراك معين', 'none', null, null, 'الاشتراكات')
    updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: SubscriptionStatus): Promise<Subscription> {
        return this.subscriptionsService.updateSubscriptionStatus(id, status);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('حذف اشتراك معين', 'none', null, null, 'الاشتراكات')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.subscriptionsService.remove(id);
    }
}