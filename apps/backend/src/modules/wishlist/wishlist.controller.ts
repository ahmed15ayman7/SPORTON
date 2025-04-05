// import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { WishlistService } from './wishlist.service';
// import { CreateWishlistDto } from './dto/create-wishlist.dto';
// import { UpdateWishlistDto } from './dto/update-wishlist.dto';
// import { BaseController } from '@/common/controllers/base.controller';
// import { Wishlist } from '@prisma/client';

// @ApiTags('قوائم الرغبات')
// @Controller('wishlists')
// export class WishlistController extends BaseController<Wishlist> {
//     constructor(private readonly wishlistService: WishlistService) {
//         super(wishlistService);
//     }



//     @Get('user/:userId')
//     @ApiOperation({ summary: 'الحصول على قائمة رغبات مستخدم محدد' })
//     @ApiResponse({ status: 200, description: 'تم جلب قائمة الرغبات بنجاح' })
//     findByUser(@Param('userId') userId: string) {
//         return this.wishlistService.findByUser(+userId);
//     }

//     @Post('user/:userId/product/:productId')
//     @ApiOperation({ summary: 'إضافة منتج إلى قائمة الرغبات' })
//     @ApiResponse({ status: 200, description: 'تمت إضافة المنتج بنجاح' })
//     addProduct(
//         @Param('userId') userId: string,
//         @Param('productId') productId: string,
//     ) {
//         return this.wishlistService.addProduct(+userId, +productId);
//     }

//     @Delete('user/:userId/product/:productId')
//     @ApiOperation({ summary: 'إزالة منتج من قائمة الرغبات' })
//     @ApiResponse({ status: 200, description: 'تمت إزالة المنتج بنجاح' })
//     removeProduct(
//         @Param('userId') userId: string,
//         @Param('productId') productId: string,
//     ) {
//         return this.wishlistService.removeProduct(+userId, +productId);
//     }

//     @Get('user/:userId/product/:productId')
//     @ApiOperation({ summary: 'التحقق من وجود منتج في قائمة الرغبات' })
//     @ApiResponse({ status: 200, description: 'تم التحقق بنجاح' })
//     hasProduct(
//         @Param('userId') userId: string,
//         @Param('productId') productId: string,
//     ) {
//         return this.wishlistService.hasProduct(+userId, +productId);
//     }

//     @Patch('user/:userId')
//     @ApiOperation({ summary: 'تحديث قائمة رغبات مستخدم محدد' })
//     @ApiResponse({ status: 200, description: 'تم تحديث قائمة الرغبات بنجاح' })
//     update(
//         @Param('userId') userId: string,
//         @Body() updateWishlistDto: UpdateWishlistDto,
//     ) {
//         return this.wishlistService.update(+userId, updateWishlistDto);
//     }
// } 