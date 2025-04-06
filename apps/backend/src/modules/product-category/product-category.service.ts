import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '@/common/services/base.service';
import { ProductCategory } from '@shared/prisma';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class ProductCategoryService extends BaseService<ProductCategory> {
    constructor(prisma: PrismaService) {
        super(prisma, 'productCategory');
    }

    async getRootCategories(): Promise<ProductCategory[]> {
        return this.prisma.productCategory.findMany({
            where: { parentId: null },
        });
    }
    async getSubCategories(parentId: number): Promise<ProductCategory[]> {
        return this.prisma.productCategory.findMany({
            where: { parentId },
        });
    }
    async getCategoryWithProducts(id: number): Promise<ProductCategory> {
        const category = await this.prisma.productCategory.findUnique({
            where: { id },
            include: { products: true },
        });
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }
    async getCategoryHierarchy(id: number): Promise<ProductCategory[]> {
        return this.prisma.productCategory.findMany({
            where: { parentId: id },
        });
    }
    async getCategoryProfile(id: number): Promise<ProductCategory> {
        const category = await this.prisma.productCategory.findUnique({
            where: { id },
        });
        if (!category) {
            throw new NotFoundException('Category not found');
        }
        return category;
    }


}
