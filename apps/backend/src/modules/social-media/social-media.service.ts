import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';

@Injectable()
export class SocialMediaService {
    constructor(private prisma: PrismaService) { }

    async create(createSocialMediaDto: CreateSocialMediaDto) {
        return this.prisma.socialMedia.create({
            data: createSocialMediaDto,
        });
    }

    async findAll() {
        return this.prisma.socialMedia.findMany();
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