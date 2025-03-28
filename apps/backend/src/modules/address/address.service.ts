import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
    constructor(private prisma: PrismaService) { }

    async create(createAddressDto: CreateAddressDto) {
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

    async findAll() {
        return this.prisma.address.findMany({
            include: {
                user: true
            }
        });
    }

    async findOne(id: number) {
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

    async findByUser(userId: number) {
        return this.prisma.address.findMany({
            where: { userId },
            include: {
                user: true
            }
        });
    }

    async update(id: number, updateAddressDto: UpdateAddressDto) {
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

    async remove(id: number) {
        try {
            return await this.prisma.address.delete({
                where: { id }
            });
        } catch (error) {
            throw new NotFoundException(`العنوان رقم ${id} غير موجود`);
        }
    }

    async setDefault(id: number) {
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