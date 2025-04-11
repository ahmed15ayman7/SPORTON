import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from '@/dtos/Discount.create.dto';
import { UpdateDiscountDto } from '@/dtos/Discount.update.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { BaseController, CustomApiDocs } from '@/common/controllers/base.controller';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Discount } from '@shared/prisma';

@ApiTags('الخصومات')
@Controller('discount')
export class DiscountController extends BaseController<Discount> {
    constructor(private readonly discountService: DiscountService) {
        super(discountService);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('إضافة خصم جديد', 'create', CreateDiscountDto, null, "الخصومات")
    create(@Body() createDiscountDto: CreateDiscountDto) {
        return this.discountService.create(createDiscountDto);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث خصم معين', 'update', UpdateDiscountDto, null, "الخصومات")
    update(@Param('id') id: number, @Body() updateDiscountDto: UpdateDiscountDto) {
        return this.discountService.update(+id, updateDiscountDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على جميع الخصومات', 'none', null, null, "الخصومات")
    findAll(@Query() paginationDto: PaginationDto) {
        return this.discountService.findAll(paginationDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على تفاصيل خصم معين', 'none', null, null, "الخصومات")
    findOne(@Param('id') id: number) {
        return this.discountService.getDiscountProfile(+id);
    }

    @Get('product/:productId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على خصم منتج معين', 'none', null, null, "الخصومات")
    getProductDiscount(@Param('productId') productId: string) {
        return this.discountService.getProductDiscount(+productId);
    }

    @Get('active')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الخصومات النشطة', 'none', null, null, "الخصومات")
    getActiveDiscounts() {
        return this.discountService.getActiveDiscounts();
    }

    @Get('upcoming')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الخصومات القادمة', 'none', null, null, "الخصومات")
    getUpcomingDiscounts() {
        return this.discountService.getUpcomingDiscounts();
    }

    @Get('expired')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('الحصول على الخصومات المنتهية', 'none', null, null, "الخصومات")
    getExpiredDiscounts() {
        return this.discountService.getExpiredDiscounts();
    }

    @Patch(':id/activate')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تفعيل خصم معين', 'none', null, null, "الخصومات")
    activateDiscount(@Param('id') id: string) {
        return this.discountService.activateDiscount(+id);
    }

    @Patch(':id/deactivate')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تعطيل خصم معين', 'none', null, null, "الخصومات")
    deactivateDiscount(@Param('id') id: string) {
        return this.discountService.deactivateDiscount(+id);
    }

    @Patch(':id/extend')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تمديد مدة خصم معين', 'none', null, null, "الخصومات")
    extendDiscount(
        @Param('id') id: string,
        @Body('endDate') endDate: Date,
    ) {
        return this.discountService.extendDiscount(+id, endDate);
    }

    @Patch(':id/percentage')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @CustomApiDocs('تحديث نسبة خصم معين', 'none', null, null, "الخصومات")
    updateDiscountPercentage(
        @Param('id') id: string,
        @Body('percentage') percentage: number,
    ) {
        return this.discountService.updateDiscountPercentage(+id, percentage);
    }

} 