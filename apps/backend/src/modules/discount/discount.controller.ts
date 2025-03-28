import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@ApiTags('الخصومات')
@Controller('discount')
export class DiscountController {
    constructor(private readonly discountService: DiscountService) { }

    @Post()
    @ApiOperation({ summary: 'إضافة خصم جديد' })
    @ApiResponse({ status: 201, description: 'تم إضافة الخصم بنجاح' })
    create(@Body() createDiscountDto: CreateDiscountDto) {
        return this.discountService.create(createDiscountDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع الخصومات' })
    @ApiResponse({ status: 200, description: 'تم جلب الخصومات بنجاح' })
    findAll() {
        return this.discountService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على تفاصيل خصم معين' })
    @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الخصم بنجاح' })
    findOne(@Param('id') id: string) {
        return this.discountService.getDiscountProfile(+id);
    }

    @Get('product/:productId')
    @ApiOperation({ summary: 'الحصول على خصم منتج معين' })
    @ApiResponse({ status: 200, description: 'تم جلب خصم المنتج بنجاح' })
    getProductDiscount(@Param('productId') productId: string) {
        return this.discountService.getProductDiscount(+productId);
    }

    @Get('active')
    @ApiOperation({ summary: 'الحصول على الخصومات النشطة' })
    @ApiResponse({ status: 200, description: 'تم جلب الخصومات النشطة بنجاح' })
    getActiveDiscounts() {
        return this.discountService.getActiveDiscounts();
    }

    @Get('upcoming')
    @ApiOperation({ summary: 'الحصول على الخصومات القادمة' })
    @ApiResponse({ status: 200, description: 'تم جلب الخصومات القادمة بنجاح' })
    getUpcomingDiscounts() {
        return this.discountService.getUpcomingDiscounts();
    }

    @Get('expired')
    @ApiOperation({ summary: 'الحصول على الخصومات المنتهية' })
    @ApiResponse({ status: 200, description: 'تم جلب الخصومات المنتهية بنجاح' })
    getExpiredDiscounts() {
        return this.discountService.getExpiredDiscounts();
    }

    @Patch(':id/activate')
    @ApiOperation({ summary: 'تفعيل خصم معين' })
    @ApiResponse({ status: 200, description: 'تم تفعيل الخصم بنجاح' })
    activateDiscount(@Param('id') id: string) {
        return this.discountService.activateDiscount(+id);
    }

    @Patch(':id/deactivate')
    @ApiOperation({ summary: 'تعطيل خصم معين' })
    @ApiResponse({ status: 200, description: 'تم تعطيل الخصم بنجاح' })
    deactivateDiscount(@Param('id') id: string) {
        return this.discountService.deactivateDiscount(+id);
    }

    @Patch(':id/extend')
    @ApiOperation({ summary: 'تمديد مدة خصم معين' })
    @ApiResponse({ status: 200, description: 'تم تمديد مدة الخصم بنجاح' })
    extendDiscount(
        @Param('id') id: string,
        @Body('endDate') endDate: Date,
    ) {
        return this.discountService.extendDiscount(+id, endDate);
    }

    @Patch(':id/percentage')
    @ApiOperation({ summary: 'تحديث نسبة خصم معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث نسبة الخصم بنجاح' })
    updateDiscountPercentage(
        @Param('id') id: string,
        @Body('percentage') percentage: number,
    ) {
        return this.discountService.updateDiscountPercentage(+id, percentage);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث بيانات خصم معين' })
    @ApiResponse({ status: 200, description: 'تم تحديث بيانات الخصم بنجاح' })
    update(
        @Param('id') id: string,
        @Body() updateDiscountDto: UpdateDiscountDto,
    ) {
        return this.discountService.update(+id, updateDiscountDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف خصم معين' })
    @ApiResponse({ status: 200, description: 'تم حذف الخصم بنجاح' })
    remove(@Param('id') id: string) {
        return this.discountService.remove(+id);
    }
} 