import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from '../../common/services/base.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Category } from '@shared/prisma';

@Injectable()
export class CategoriesService extends BaseService<Category> {
    constructor(prisma: PrismaService) {
        super(prisma, 'category');
    }

    protected getSearchFields(): string[] {
        return ['name', 'description'];
    }

    protected getIncludeFields(): object {
        return {
            articles: true,
        };
    }
    async getCategoryProfile(id: number): Promise<Category> {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!category) {
            throw new NotFoundException('الفئة غير موجودة');
        }
        return category;
    }

    async getActiveCategories(): Promise<Category[]> {
        return this.prisma.category.findMany({
            include: this.getIncludeFields(),
        });
    }

    async getCategoryArticles(id: number) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
        if (!category) {
            throw new NotFoundException('الفئة غير موجودة');
        }
        return category;
    }

    async updateCategory(id: number, name: string): Promise<Category> {
        const category = await this.prisma.category.update({
            where: { id },
            data: {
                name: name,
            },
            include: this.getIncludeFields(),
        });
        return category;
    }
} 