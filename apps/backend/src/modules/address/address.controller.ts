import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from '@prisma/client';
@ApiTags('العناوين')
@Controller('addresses')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @Post()
    @ApiOperation({ summary: 'إنشاء عنوان جديد' })
    @ApiResponse({ status: 201, description: 'تم إنشاء العنوان بنجاح' })
    async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
        return this.addressService.create(createAddressDto);
    }

    @Get()
    @ApiOperation({ summary: 'الحصول على جميع العناوين' })
    @ApiResponse({ status: 200, description: 'تم جلب العناوين بنجاح' })
    async findAll(): Promise<Address[]> {
        return this.addressService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'الحصول على عنوان محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب العنوان بنجاح' })
    async findOne(@Param('id') id: string): Promise<Address> {
        return this.addressService.findOne(+id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'الحصول على عناوين مستخدم محدد' })
    @ApiResponse({ status: 200, description: 'تم جلب عناوين المستخدم بنجاح' })
    async findByUser(@Param('userId') userId: string): Promise<Address[]> {
        return this.addressService.findByUser(+userId);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'تحديث عنوان محدد' })
    @ApiResponse({ status: 200, description: 'تم تحديث العنوان بنجاح' })
    async update(
        @Param('id') id: string,
        @Body() updateAddressDto: UpdateAddressDto,
    ): Promise<Address> {
        return this.addressService.update(+id, updateAddressDto);
    }

    @Patch(':id/set-default')
    @ApiOperation({ summary: 'تعيين عنوان كافتراضي' })
    @ApiResponse({ status: 200, description: 'تم تعيين العنوان كافتراضي بنجاح' })
    async setDefault(@Param('id') id: string): Promise<Address> {
        return this.addressService.setDefault(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف عنوان محدد' })
    @ApiResponse({ status: 200, description: 'تم حذف العنوان بنجاح' })
    async remove(@Param('id') id: string): Promise<Address> {
        return this.addressService.remove(+id);
    }
} 