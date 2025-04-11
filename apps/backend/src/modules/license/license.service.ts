import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLicenseDto } from '@/dtos/License.create.dto';
import { UpdateLicenseDto } from '@/dtos/License.update.dto';
import { BaseService } from '@/common/services/base.service';
import { License } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@Injectable()
export class LicenseService extends BaseService<License> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'license');
    }

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

    async findAll(params: PaginationDto): Promise<PaginatedResponse<License>> {
        const { take, skip } = params;
        const total = await this.prisma.license.count();
        const licenses = await this.prisma.license.findMany({
            skip,
            take,
            include: {
                coach: true
            }
        });
        return {
            data: licenses,
            meta: {
                total,
                skip: skip || 0,
                take: take || 10,
                hasMore: (skip || 0) + (take || 10) < total
            }
        };
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