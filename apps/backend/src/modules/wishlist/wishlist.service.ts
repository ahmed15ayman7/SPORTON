// import { Injectable, NotFoundException } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';
// import { CreateWishlistDto } from './dto/create-wishlist.dto';
// import { UpdateWishlistDto } from './dto/update-wishlist.dto';
// import { BaseService } from '@/common/services/base.service';
// import { User } from '@prisma/client';

// @Injectable()
// export class WishlistService extends BaseService<Wishlist> {
//     constructor(protected prisma: PrismaService) {
//         super(prisma, 'wishlist');
//     }







//     async findByUser(userId: number) {
//         const user = await this.prisma.user.findUnique({
//             where: { id: userId },
//             include: {
//                 products: true
//             }
//         });

//         if (!user) {
//             throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
//         }

//         return user.products;
//     }

//     async addProduct(userId: number, productId: number) {
//         try {
//             return await this.prisma.user.update({
//                 where: { id: userId },
//                 data: {
//                     products: {
//                         connect: { id: productId }
//                     }
//                 },
//                 include: {
//                     products: true
//                 }
//             });
//         } catch (error) {
//             throw new NotFoundException(`المستخدم رقم ${userId} أو المنتج رقم ${productId} غير موجود`);
//         }
//     }

//     async removeProduct(userId: number, productId: number) {
//         try {
//             return await this.prisma.user.update({
//                 where: { id: userId },
//                 data: {
//                     products: {
//                         disconnect: { id: productId }
//                     }
//                 },
//                 include: {
//                     products: true
//                 }
//             });
//         } catch (error) {
//             throw new NotFoundException(`المستخدم رقم ${userId} أو المنتج رقم ${productId} غير موجود`);
//         }
//     }

//     async hasProduct(userId: number, productId: number) {
//         const user = await this.prisma.user.findUnique({
//             where: { id: userId },
//             include: {
//                 products: {
//                     where: { id: productId }
//                 }
//             }
//         });

//         if (!user) {
//             throw new NotFoundException(`المستخدم رقم ${userId} غير موجود`);
//         }

//         return user.products.length > 0;
//     }

// } 