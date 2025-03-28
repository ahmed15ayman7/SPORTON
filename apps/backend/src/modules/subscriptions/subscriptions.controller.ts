import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@ApiTags('الاشتراكات')
@Controller('subscriptions')
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة اشتراك جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة الاشتراك بنجاح' })
    create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
        return this.subscriptionsService.create(createSubscriptionDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الاشتراكات' })
    @ApiResponse({ status: 200, description: 'تم جلب الاشتراكات بنجاح' })
    findAll(@Query('search') search?: string) {
        return this.subscriptionsService.findAll(search);
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل اشتراك معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الاشتراك بنجاح' })
    findOne(@Param('id') id: string) {
        return this.subscriptionsService.getSubscriptionProfile(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على جميع اشتراكات مستخدم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب اشتراكات المستخدم بنجاح' })
    getUserSubscriptions(@Param('userId') userId: string) {
        return this.subscriptionsService.getUserSubscriptions(+userId);
    }

    @Get('active')
    @ApiOperation({ summary: 'الحصول على جميع الاشتراكات النشطة' })
    @ApiResponse({ status: 200, description: 'تم جلب الاشتراكات النشطة بنجاح' })
    getActiveSubscriptions() {
        return this.subscriptionsService.getActiveSubscriptions();
    }

    @Get('expired')
    @ApiOperation({ summary: 'الحصول على جميع الاشتراكات المنتهية' })
    @ApiResponse({ status: 200, description: 'تم جلب الاشتراكات المنتهية بنجاح' })
    getExpiredSubscriptions() {
        return this.subscriptionsService.getExpiredSubscriptions();
    }

    @Get('plan/:plan')
    @ApiOperation({ summary: 'الحصول على جميع الاشتراكات حسب نوع الخطة' })
    @ApiResponse({ status: 200, description: 'تم جلب الاشتراكات بنجاح' })
    getSubscriptionsByPlan(@Param('plan') plan: string) {
        return this.subscriptionsService.getSubscriptionsByPlan(plan);
    }

    @Get('status/:status')
    @ApiOperation({ summary: 'الحصول على جميع الاشتراكات حسب الحالة' })
    @ApiResponse({ status: 200, description: 'تم جلب الاشتراكات بنجاح' })
    getSubscriptionsByStatus(@Param('status') status: string) {
        return this.subscriptionsService.getSubscriptionsByStatus(status);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'تحديث حالة اشتراك معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث حالة الاشتراك بنجاح' })
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.subscriptionsService.updateSubscriptionStatus(+id, status);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات اشتراك معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات الاشتراك بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateSubscriptionDto: UpdateSubscriptionDto,
    ) {
        return this.subscriptionsService.update(+id, updateSubscriptionDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف اشتراك معين' })
    @ApiResponse({ status: 200, description: 'تم حذف الاشتراك بنجاح' })
    remove(@Param('id') id: string) {
        return this.subscriptionsService.remove(+id);
    }
} 