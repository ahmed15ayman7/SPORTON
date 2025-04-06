import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription, SubscriptionStatus } from '@shared/prisma';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { BaseController } from '../../common/controllers/base.controller';
import { PaginatedResponse } from '../../common/interfaces/paginated-response.interface';
@ApiTags('الاشتراكات')
@Controller('subscriptions')
export class SubscriptionsController extends BaseController<Subscription> {
    constructor(private readonly subscriptionsService: SubscriptionsService) {
        super(subscriptionsService);
    }

    @Post()
    @ApiOperation({ summary: 'إضافة اشتراك جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة الاشتراك بنجاح' })
    create(@Body() createSubscriptionDto: Subscription): Promise<Subscription> {
        return this.subscriptionsService.create(createSubscriptionDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الاشتراكات' })
    @ApiResponse({ status: 200, description: 'تم جلب الاشتراكات بنجاح' })
    findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedResponse<Subscription>> {
        return this.subscriptionsService.findAll(paginationDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل اشتراك معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الاشتراك بنجاح' })
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Subscription> {
        return this.subscriptionsService.getSubscriptionProfile(id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على جميع اشتراكات مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب اشتراكات المستخدم بنجاح' })
    getUserSubscriptions(@Param('userId', ParseIntPipe) userId: number): Promise<Subscription[]> {
        return this.subscriptionsService.getUserSubscriptions(userId);
    }

    @Get('active')
    @ApiOperation({ summary: 'الحصول على جميع الاشتراكات النشطة' })
    @ApiResponse({ status: 200, description: 'تم جلب الاشتراكات النشطة بنجاح' })
    getActiveSubscriptions(): Promise<Subscription[]> {
        return this.subscriptionsService.getActiveSubscriptions();
    }

    @Get('expired')
    @ApiOperation({ summary: 'الحصول على جميع الاشتراكات المنتهية' })
    @ApiResponse({ status: 200, description: 'تم جلب الاشتراكات المنتهية بنجاح' })
    getExpiredSubscriptions(): Promise<Subscription[]> {
        return this.subscriptionsService.getExpiredSubscriptions();
    }

    @Get('plan/:plan')
    @ApiOperation({ summary: 'الحصول على جميع الاشتراكات حسب نوع الخطة' })
    @ApiResponse({ status: 200, description: 'تم جلب الاشتراكات بنجاح' })
    getSubscriptionsByPlan(@Param('plan') plan: string): Promise<Subscription[]> {
        return this.subscriptionsService.getSubscriptionsByPlan(plan);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على جميع الاشتراكات حسب الحالة' })
    @ApiResponse({ status: 200, description: 'تم جلب الاشتراكات بنجاح' })
    getSubscriptionsByStatus(@Param('status') status: SubscriptionStatus): Promise<Subscription[]> {
        return this.subscriptionsService.getSubscriptionsByStatus(status);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة اشتراك معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة الاشتراك بنجاح' })
    updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: SubscriptionStatus): Promise<Subscription> {
        return this.subscriptionsService.updateSubscriptionStatus(id, status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات اشتراك معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات الاشتراك بنجاح' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSubscriptionDto: Subscription,
    ): Promise<Subscription> {
        return this.subscriptionsService.update(id, updateSubscriptionDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف اشتراك معين' })
    @ApiResponse({ status: 200, description: 'تم حذف الاشتراك بنجاح' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.subscriptionsService.remove(id);
    }
}