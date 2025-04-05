import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResponse } from '../interfaces/paginated-response.interface';
import { PaginationDto } from '../dto/pagination.dto';
import { BadRequestException } from '@nestjs/common';

export class BaseService<T> {
    constructor(
        protected readonly prisma: PrismaService,
        private readonly modelName: string,
    ) { }

    async findAll(params: PaginationDto): Promise<PaginatedResponse<T>> {
        try {
            const { skip = 0, take = 10, orderBy, search, filters } = params;

            // Parse filters if provided
            const whereClause = filters ? JSON.parse(filters) : {};

            // Add search functionality if provided
            if (search) {
                whereClause.OR = this.getSearchFields().map((field) => ({
                    [field]: { contains: search, mode: 'insensitive' },
                }));
            }

            // Parse orderBy if provided
            const orderByClause = orderBy ? JSON.parse(orderBy) : { id: 'desc' };

            // Get total count
            const total = await this.prisma[this.modelName].count({
                where: whereClause,
            });

            // Get data
            const data = await this.prisma[this.modelName].findMany({
                skip,
                take,
                where: whereClause,
                orderBy: orderByClause,
                include: this.getIncludeFields(),
            });

            return {
                data,
                meta: {
                    total,
                    skip,
                    take,
                    hasMore: skip + take < total,
                },
            };
        } catch (error) {
            if (error instanceof SyntaxError) {
                throw new BadRequestException('Invalid JSON format in filters or orderBy');
            }
            throw error;
        }
    }

    async findOne(id: number): Promise<T> {
        return this.prisma[this.modelName].findUnique({
            where: { id },
            include: this.getIncludeFields(),
        });
    }

    async create(data: any): Promise<T> {
        return this.prisma[this.modelName].create({
            data,
            include: this.getIncludeFields(),
        });
    }

    async update(id: number, data: any): Promise<T> {
        return this.prisma[this.modelName].update({
            where: { id },
            data,
            include: this.getIncludeFields(),
        });
    }

    async delete(id: number): Promise<T> {
        return this.prisma[this.modelName].delete({
            where: { id },
        });
    }
    async remove(id: number) {
        return this.prisma[this.modelName].delete({
            where: { id },
        });
    }

    protected getSearchFields(): string[] {
        return ['name', 'description']; // Default searchable fields
    }

    protected getIncludeFields(): object {
        return {}; // Override in specific services to include relations
    }
} 