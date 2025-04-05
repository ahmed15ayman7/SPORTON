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
                coachId: createLicenseDto.coachId,
                name: createLicenseDto.name,
                issuedBy: createLicenseDto.issuedBy,
                issueDate: createLicenseDto.issueDate,
                expiryDate: createLicenseDto.expiryDate,
                level: createLicenseDto.level,
                certificate: createLicenseDto.certificate,
                verified: createLicenseDto.verified
            },
            include: {
                coach: true
            }
        });
    }

    async findAll() {
        return this.prisma.license.findMany({
            include: {
                coach: true
            }
        });
    }

    async findOne(id: number) {
        const license = await this.prisma.license.findUnique({
            where: { id },
            include: {
                coach: true
            }
        });

        if (!license) {
            throw new NotFoundException(`الترخيص رقم ${id} غير موجود`);
        }

        return license;
    }

    async findByCoach(coachId: number) {
        return this.prisma.license.findMany({
            where: { coachId },
            include: {
                coach: true
            }
        });
    }

    async findByName(name: string) {
        return this.prisma.license.findMany({
            where: { name },
            include: {
                coach: true
            }
        });
    }

    async update(id: number, updateLicenseDto: UpdateLicenseDto) {
        try {
            return await this.prisma.license.update({
                where: { id },
                data: {
                    name: updateLicenseDto.name,
                    issuedBy: updateLicenseDto.issuedBy,
                    issueDate: updateLicenseDto.issueDate,
                    expiryDate: updateLicenseDto.expiryDate,
                    level: updateLicenseDto.level,
                    certificate: updateLicenseDto.certificate,
                    verified: updateLicenseDto.verified
                },
                include: {
                    coach: true
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