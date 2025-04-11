import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from '../../dtos/Address.create.dto';
import { UpdateAddressDto } from '../../dtos/Address.update.dto';
import { Address, Prisma } from '@shared/prisma';
import { BaseService } from '@/common/services/base.service';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PaginatedResponse } from '@/common/interfaces/paginated-response.interface';
@Injectable()
export class AddressService extends BaseService<Address> {
    constructor(protected prisma: PrismaService) {
        super(prisma, 'address');
    }

    async create(createAddressDto: CreateAddressDto): Promise<Address> {
        return this.prisma.address.create({
            data: {
                userId: createAddressDto.userId,
                name: createAddressDto.name,
                street: createAddressDto.street,
                city: createAddressDto.city,
                state: createAddressDto.state,
                country: createAddressDto.country,
                zipCode: createAddressDto.zipCode,
                phone: createAddressDto.phone,
                isDefault: createAddressDto.isDefault
            },
            include: {
                user: true
            }
        });
    }

    async findAll(params: PaginationDto): Promise<PaginatedResponse<Address>> {
        const { skip, take, search } = params;
        const where = search ? {
            OR: [
                { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
                { street: { contains: search, mode: Prisma.QueryMode.insensitive } },
                { city: { contains: search, mode: Prisma.QueryMode.insensitive } },
                { country: { contains: search, mode: Prisma.QueryMode.insensitive } },
            ]
        } : {};

        const [total, data] = await this.prisma.$transaction([
            this.prisma.address.count({ where }),
            this.prisma.address.findMany({
                where,
                skip,
                take,
                include: {
                    user: true
                }
            })
        ]);
        return {
            data,
            meta: {
                total,
                skip: skip || 0,
                take: take || 10,
                hasMore: (skip || 0) + (take || 10) < total
            }
        };
    }

    async findOne(id: number): Promise<Address> {
        const address = await this.prisma.address.findUnique({
            where: { id },
            include: {
                user: true
            }
        });

        if (!address) {
            throw new NotFoundException(`العنوان رقم ${id} غير موجود`);
        }

        return address;
    }

    async findByUser(userId: number): Promise<Address[]> {
        return this.prisma.address.findMany({
            where: { userId },
            include: {
                user: true
            }
        });
    }

    async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
        try {
            return await this.prisma.address.update({
                where: { id },
                data: {
                    name: updateAddressDto.name,
                    street: updateAddressDto.street,
                    city: updateAddressDto.city,
                    state: updateAddressDto.state,
                    country: updateAddressDto.country,
                    zipCode: updateAddressDto.zipCode,
                    phone: updateAddressDto.phone,
                    isDefault: updateAddressDto.isDefault
                },
                include: {
                    user: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`العنوان رقم ${id} غير موجود`);
        }
    }

    async remove(id: number): Promise<Address> {
        try {
            return await this.prisma.address.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`العنوان رقم ${id} غير موجود`);
        }
    }

    async setDefault(id: number): Promise<Address> {
        try {
            const address = await this.prisma.address.findUnique({
                where: { id }
            });

            if (!address) {
                throw new NotFoundException(`العنوان رقم ${id} غير موجود`);
            }

            // إلغاء تعيين العنوان الافتراضي السابق
            await this.prisma.address.updateMany({
                where: {
                    userId: address.userId,
                    isDefault: true
                },
                data: {
                    isDefault: false
                }
            });

            // تعيين العنوان الجديد كافتراضي
            return await this.prisma.address.update({
                where: { id },
                data: {
                    isDefault: true
                },
                include: {
                    user: true
                }
            });
        } catch (error) {
            throw new NotFoundException(`العنوان رقم ${id} غير موجود`);
        }
    }
} 