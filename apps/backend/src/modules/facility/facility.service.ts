import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { Facility, FacilityType } from '@shared/prisma';
@Injectable()
export class FacilityService {
    constructor(private prisma: PrismaService) { }

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

    async findAll(): Promise<Facility[]> {
        return this.prisma.facility.findMany();
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