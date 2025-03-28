import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@Injectable()
export class FacilityService {
    constructor(private prisma: PrismaService) { }

    async create(createFacilityDto: CreateFacilityDto) {
        return this.prisma.facility.create({
            data: {
                name: createFacilityDto.name,
                type: createFacilityDto.type,
                address: createFacilityDto.address,
                capacity: createFacilityDto.capacity,
                amenities: createFacilityDto.amenities,
                operatingHours: createFacilityDto.operatingHours,
                contactInfo: createFacilityDto.contactInfo,
                notes: createFacilityDto.notes
            }
        });
    }

    async findAll() {
        return this.prisma.facility.findMany();
    }

    async findOne(id: number) {
        const facility = await this.prisma.facility.findUnique({
            where: { id }
        });

        if (!facility) {
            throw new NotFoundException(`المنشأة رقم ${id} غير موجودة`);
        }

        return facility;
    }

    async findByType(type: string) {
        return this.prisma.facility.findMany({
            where: { type }
        });
    }

    async update(id: number, updateFacilityDto: UpdateFacilityDto) {
        try {
            return await this.prisma.facility.update({
                where: { id },
                data: {
                    name: updateFacilityDto.name,
                    type: updateFacilityDto.type,
                    address: updateFacilityDto.address,
                    capacity: updateFacilityDto.capacity,
                    amenities: updateFacilityDto.amenities,
                    operatingHours: updateFacilityDto.operatingHours,
                    contactInfo: updateFacilityDto.contactInfo,
                    notes: updateFacilityDto.notes
                }
            });
        } catch (error) {
            throw new NotFoundException(`المنشأة رقم ${id} غير موجودة`);
        }
    }

    async remove(id: number) {
        try {
            return await this.prisma.facility.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`المنشأة رقم ${id} غير موجودة`);
        }
    }
} 