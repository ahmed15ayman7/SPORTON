import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSocialMediaDto } from '@/dtos/SocialMedia.create.dto';
import { UpdateSocialMediaDto } from '@/dtos/SocialMedia.update.dto';
import { BaseService } from '../../common/services/base.service';
import { SocialMedia, Prisma } from '@shared/prisma';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { PaginationDto } from '@/common/dto/pagination.dto';

@Injectable()
export class SocialMediaService extends BaseService<SocialMedia> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'socialMedia');
    }

    async create(createSocialMediaDto: CreateSocialMediaDto) {
        return this.prisma.socialMedia.create({
            data: createSocialMediaDto,
        });
    }

    async findAll(params: PaginationDto): Promise<PaginatedResponse<SocialMedia>> {
        const { take, skip, search } = params;
        const where: Prisma.SocialMediaWhereInput = search ? {
            OR: [
                { platform: { contains: search, mode: 'insensitive' } },
                { url: { contains: search, mode: 'insensitive' } },
            ],
        } : {};
        const [data, total] = await this.prisma.$transaction([
            this.prisma.socialMedia.findMany({
                where,
                skip,
                take,
            }),
            this.prisma.socialMedia.count({ where }),
        ]);
        return {
            data,
            meta: { total: total || 0, skip: skip || 0, take: take || 10, hasMore: total > (skip || 0) + (take || 10) },
        };
    }

    async findOne(id: number) {
        const socialMedia = await this.prisma.socialMedia.findUnique({
            where: { id },
        });
        if (!socialMedia) {
            throw new NotFoundException(`حساب التواصل الاجتماعي رقم ${id} غير موجود`);
        }
        return socialMedia;
    }

    async findByUser(userId: number) {
        return this.prisma.socialMedia.findMany({
            where: { userId },
        });
    }

    async update(id: number, updateSocialMediaDto: UpdateSocialMediaDto) {
        try {
            return await this.prisma.socialMedia.update({
                where: { id },
                data: updateSocialMediaDto,
            });
        } catch (error) {
            throw new NotFoundException(`حساب التواصل الاجتماعي رقم ${id} غير موجود`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.socialMedia.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`حساب التواصل الاجتماعي رقم ${id} غير موجود`);
        }
    }
} 