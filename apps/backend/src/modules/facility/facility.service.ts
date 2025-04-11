import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFacilityDto } from '@/dtos/Facility.create.dto';
import { UpdateFacilityDto } from '@/dtos/Facility.update.dto';
import { Facility, FacilityType } from '@shared/prisma';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
import { BaseService } from '@/common/services/base.service';
@Injectable()
export class FacilityService extends BaseService<Facility> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'facility');
    }

    async create(createFacilityDto: CreateFacilityDto): Promise<Facility> {
        return this.prisma.facility.create({
            data: {
                clubId: createFacilityDto.clubId,
                name: createFacilityDto.name,
                type: createFacilityDto.type,
                location: createFacilityDto.location,
                capacity: createFacilityDto.capacity,
                description: createFacilityDto.description,
                images: createFacilityDto.images,
                status: createFacilityDto.status,
                icon: createFacilityDto.icon,
            }
        });
    }

    async findAll(query: PaginationDto): Promise<PaginatedResponse<Facility>> {
        const { take = 10, skip = 0 } = query;
        const facilities = await this.prisma.facility.findMany({
            skip: skip,
            take: take
        });
        return {
            data: facilities,
            meta: {
                total: facilities.length,
                skip: skip || 0,
                take: take || 10,
                hasMore: facilities.length === take
            }
        };
    }

    async findOne(id: number): Promise<Facility> {
        const facility = await this.prisma.facility.findUnique({
            where: { id }
        });

        if (!facility) {
            throw new NotFoundException(`المنشأة رقم ${id} غير موجودة`);
        }

        return facility;
    }

    async findByType(type: FacilityType): Promise<Facility[]> {
        return this.prisma.facility.findMany({
            where: { type }
        });
    }

    async update(id: number, updateFacilityDto: UpdateFacilityDto): Promise<Facility> {
        try {
            return await this.prisma.facility.update({
                where: { id },
                data: {
                    name: updateFacilityDto.name,
                    type: updateFacilityDto.type,
                    location: updateFacilityDto.location,
                    capacity: updateFacilityDto.capacity,
                    description: updateFacilityDto.description,
                    images: updateFacilityDto.images,
                    status: updateFacilityDto.status,
                    icon: updateFacilityDto.icon,
                }
            });
        } catch (error) {
            throw new NotFoundException(`المنشأة رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number): Promise<Facility> {
        try {
            return await this.prisma.facility.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`المنشأة رقم ${id} غير موجودة`);
        }
    }
} 