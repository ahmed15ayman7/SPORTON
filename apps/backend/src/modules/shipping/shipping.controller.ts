// import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { ShippingService } from './shipping.service';
// import { CreateShippingDto } from './dto/create-shipping.dto';
// import { UpdateShippingDto } from './dto/update-shipping.dto';
// import { PaginationDto } from '../../common/dto/pagination.dto';
// import { Shipping, ShippingStatus } from '@prisma/client';

// @ApiTags('الشحن')
// @Controller('shipping')
// export class ShippingController {
//     constructor(private readonly shippingService: ShippingService) { }

//     @Post()
//     @ApiOperation({ summary: 'إنشاء شحن جديد' })
//     @ApiResponse({ status: 201, description: 'تم إنشاء الشحن بنجاح' })
//     create(@Body() createShippingDto: CreateShippingDto): Promise<Shipping> {
//         return this.shippingService.create(createShippingDto);
//     }

//     @Get()
//     @ApiOperation({ summary: 'الحصول على جميع الشحنات' })
//     @ApiResponse({ status: 200, description: 'تم جلب الشحنات بنجاح' })
//     findAll(@Query() paginationDto: PaginationDto): Promise<Shipping[]> {
//         return this.shippingService.findAll(paginationDto);
//     }

//     @Get(':id')
//     @ApiOperation({ summary: 'الحصول على تفاصيل شحن معين' })
//     @ApiResponse({ status: 200, description: 'تم جلب تفاصيل الشحن بنجاح' })
//     findOne(@Param('id') id: string): Promise<Shipping> {
//         return this.shippingService.getShippingProfile(+id);
//     }

//     @Get('order/:orderId')
//     @ApiOperation({ summary: 'الحصول على شحن طلب معين' })
//     @ApiResponse({ status: 200, description: 'تم جلب شحن الطلب بنجاح' })
//     getOrderShipping(@Param('orderId') orderId: string): Promise<Shipping> {
//         return this.shippingService.getOrderShipping(+orderId);
//     }

//     @Get('status/:status')
//     @ApiOperation({ summary: 'الحصول على الشحنات حسب الحالة' })
//     @ApiResponse({ status: 200, description: 'تم جلب الشحنات بنجاح' })
//     getShippingsByStatus(@Param('status') status: ShippingStatus): Promise<Shipping[]> {
//         return this.shippingService.getShippingsByStatus(status);
//     }

//     @Get('pending')
//     @ApiOperation({ summary: 'الحصول على الشحنات المعلقة' })
//     @ApiResponse({ status: 200, description: 'تم جلب الشحنات المعلقة بنجاح' })
//     getPendingShippings(): Promise<Shipping[]> {
//         return this.shippingService.getPendingShippings();
//     }

//     @Get('processing')
//     @ApiOperation({ summary: 'الحصول على الشحنات قيد المعالجة' })
//     @ApiResponse({ status: 200, description: 'تم جلب الشحنات قيد المعالجة بنجاح' })
//     getProcessingShippings(): Promise<Shipping[]> {
//         return this.shippingService.getProcessingShippings();
//     }

//     @Get('shipped')
//     @ApiOperation({ summary: 'الحصول على الشحنات المشحونة' })
//     @ApiResponse({ status: 200, description: 'تم جلب الشحنات المشحونة بنجاح' })
//     getShippedShippings(): Promise<Shipping[]> {
//         return this.shippingService.getShippedShippings();
//     }

//     @Get('delivered')
//     @ApiOperation({ summary: 'الحصول على الشحنات المستلمة' })
//     @ApiResponse({ status: 200, description: 'تم جلب الشحنات المستلمة بنجاح' })
//     getDeliveredShippings(): Promise<Shipping[]> {
//         return this.shippingService.getDeliveredShippings();
//     }

//     @Get('cancelled')
//     @ApiOperation({ summary: 'الحصول على الشحنات الملغية' })
//     @ApiResponse({ status: 200, description: 'تم جلب الشحنات الملغية بنجاح' })
//     getCancelledShippings(): Promise<Shipping[]> {
//         return this.shippingService.getCancelledShippings();
//     }

//     @Get('method/:method')
//     @ApiOperation({ summary: 'الحصول على الشحنات حسب طريقة الشحن' })
//     @ApiResponse({ status: 200, description: 'تم جلب الشحنات بنجاح' })
//     getShippingsByMethod(@Param('method') method: string): Promise<Shipping[]> {
//         return this.shippingService.getShippingsByMethod(method);
//     }

//     @Patch(':id/status')
//     @ApiOperation({ summary: 'تحديث حالة شحن معين' })
//     @ApiResponse({ status: 200, description: 'تم تحديث حالة الشحن بنجاح' })
//     updateShippingStatus(
//         @Param('id') id: string,
//         @Body('status') status: ShippingStatus,
//     ): Promise<Shipping> {
//         return this.shippingService.updateShippingStatus(+id, status);
//     }

//     @Patch(':id/tracking')
//     @ApiOperation({ summary: 'تحديث رقم التتبع لشحن معين' })
//     @ApiResponse({ status: 200, description: 'تم تحديث رقم التتبع بنجاح' })
//     updateTrackingNumber(
//         @Param('id') id: string,
//         @Body('trackingNumber') trackingNumber: string,
//     ): Promise<Shipping> {
//         return this.shippingService.updateTrackingNumber(+id, trackingNumber);
//     }

//     @Patch(':id/delivery-date')
//     @ApiOperation({ summary: 'تحديث تاريخ التسليم المتوقع لشحن معين' })
//     @ApiResponse({ status: 200, description: 'تم تحديث تاريخ التسليم المتوقع بنجاح' })
//     updateEstimatedDeliveryDate(
//         @Param('id') id: string,
//         @Body('estimatedDeliveryDate') estimatedDeliveryDate: string,
//     ): Promise<Shipping> {
//         return this.shippingService.updateEstimatedDeliveryDate(+id, estimatedDeliveryDate);
//     }

//     @Patch(':id')
//     @ApiOperation({ summary: 'تحديث بيانات شحن معين' })
//     @ApiResponse({ status: 200, description: 'تم تحديث بيانات الشحن بنجاح' })
//     update(
//         @Param('id') id: string,
//         @Body() updateShippingDto: UpdateShippingDto,
//     ): Promise<Shipping> {
//         return this.shippingService.update(+id, updateShippingDto);
//     }

//     @Delete(':id')
//     @ApiOperation({ summary: 'حذف شحن معين' })
//     @ApiResponse({ status: 200, description: 'تم حذف الشحن بنجاح' })
//     remove(@Param('id') id: string): Promise<Shipping> {
//         return this.shippingService.remove(+id);
//     }
// } 