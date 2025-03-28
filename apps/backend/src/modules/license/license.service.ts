import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';

@Injectable()
export class LicenseService {
    constructor(private prisma: PrismaService) { }

    async create(createLicenseDto: CreateLicenseDto) {
        return this.prisma.license.create({
            data: {
                userId: createLicenseDto.userId,
                type: createLicenseDto.type,
                number: createLicenseDto.number,
                issueDate: createLicenseDto.issueDate,
                expiryDate: createLicenseDto.expiryDate,
                issuingAuthority: createLicenseDto.issuingAuthority,
                notes: createLicenseDto.notes
            },
            include: {
                user: true
            }
        });
    }

    async findAll() {
        return this.prisma.license.findMany({
            include: {
                user: true
            }
        });
    }

    async findOne(id: number) {
        const license = await this.prisma.license.findUnique({
            where: { id },
            include: {
                user: true
            }
        });

        if (!license) {
            throw new NotFoundException(`الترخيص رقم ${id} غير موجود`);
        }

        return license;
    }

    async findByUser(userId: number) {
        return this.prisma.license.findMany({
            where: { userId },
            include: {
                user: true
            }
        });
    }

    async findByType(type: string) {
        return this.prisma.license.findMany({
            where: { type },
            include: {
                user: true
            }
        });
    }

    async update(id: number, updateLicenseDto: UpdateLicenseDto) {
        try {
            return await this.prisma.license.update({
                where: { id },
                data: {
                    type: updateLicenseDto.type,
                    number: updateLicenseDto.number,
                    issueDate: updateLicenseDto.issueDate,
                    expiryDate: updateLicenseDto.expiryDate,
                    issuingAuthority: updateLicenseDto.issuingAuthority,
                    notes: updateLicenseDto.notes
                },
                include: {
                    user: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`الترخيص رقم ${id} غير موجود`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.license.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`الترخيص رقم ${id} غير موجود`);
        }
    }
} 